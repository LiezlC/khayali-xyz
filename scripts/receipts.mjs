#!/usr/bin/env node
/**
 * Action receipts: record what an action was meant to do, then probe whether it did.
 *
 * Each receipt is two JSONL lines in an append-only ledger, keyed by id:
 *   {type:"open",  id, intent, probes, env, opened_at}
 *   {type:"close", id, transport, observed:{status, results}, evidence_level, closed_at}
 *
 * Transport (did the command exit cleanly) is kept apart from effect (did the
 * postcondition hold). Only probe results count as observed evidence.
 *
 * Usage:
 *   node scripts/receipts.mjs open --intent "..." --probe '{"kind":"file","path":"x","contains":"y"}'
 *   node scripts/receipts.mjs check <id>
 *   node scripts/receipts.mjs run --intent "..." --probe '<json>' -- <command...>
 *   node scripts/receipts.mjs publish --url https://khayali.xyz/music --sentinel "Khayali Tunes"
 *   node scripts/receipts.mjs status        # open, partial, failed and unknown receipts
 *   node scripts/receipts.mjs selftest
 *
 * Ledger: $RECEIPTS_LEDGER, else ~/.agents/receipts/ledger.jsonl
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ledgerPath = () =>
  process.env.RECEIPTS_LEDGER || path.join(os.homedir(), '.agents', 'receipts', 'ledger.jsonl');

// ---------------------------------------------------------------- ledger

function append(record) {
  const p = ledgerPath();
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const fd = fs.openSync(p, 'a');
  try { fs.writeSync(fd, JSON.stringify(record) + '\n'); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
}

function readLedger() {
  const p = ledgerPath();
  if (!fs.existsSync(p)) return { records: [], malformed: [], invalid: [] };
  const records = [];
  const malformed = [];
  const invalid = [];
  fs.readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
    if (!line.trim()) return;
    let r;
    try { r = JSON.parse(line); } catch { malformed.push(i + 1); return; }
    const valid = r && typeof r === 'object' && typeof r.id === 'string' && r.id && (
      r.type === 'open' && typeof r.intent === 'string' && Array.isArray(r.probes) && r.probes.length && r.probes.every(p => p && typeof p.kind === 'string') ||
      r.type === 'close' && r.observed && ['complete', 'partial', 'failed', 'unknown'].includes(r.observed.status) && Array.isArray(r.observed.results)
    );
    if (valid) records.push(r); else invalid.push(i + 1);
  });
  return { records, malformed, invalid };
}

function receipts() {
  const { records, malformed, invalid } = readLedger();
  const byId = new Map();
  for (const r of records) {
    const cur = byId.get(r.id) || {};
    // The latest close wins, so a receipt can be re-checked after a lag.
    byId.set(r.id, r.type === 'open' ? { ...cur, open: r } : { ...cur, close: r });
  }
  return { byId, malformed, invalid };
}

function newId() {
  const d = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  return `act_${d}_${crypto.randomBytes(3).toString('hex')}`;
}

function gitVersion() {
  try { return execFileSync('git', ['--version'], { encoding: 'utf8' }).trim(); } catch { return null; }
}

function envFingerprint() {
  return {
    harness: process.env.CLAUDECODE ? 'claude-code' : process.env.RECEIPTS_HARNESS || 'unknown',
    node: process.version,
    git: gitVersion(),
    host: `${os.platform()}-${os.release()}`,
  };
}

// ---------------------------------------------------------------- probes
// Each probe returns {status: complete|partial|failed|unknown, evidence, level: observed|unknown}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

function probeFile({ path: p, sha256: want, contains }) {
  if (!fs.existsSync(p)) return { status: 'failed', evidence: `missing: ${p}`, level: 'observed' };
  if (!fs.statSync(p).isFile()) return { status: 'failed', evidence: 'target is not a regular file', level: 'observed' };
  const buf = fs.readFileSync(p);
  const got = sha256(buf);
  if (want && got !== want) {
    return { status: 'partial', evidence: `exists, sha256 ${got.slice(0, 12)} != ${want.slice(0, 12)}`, level: 'observed' };
  }
  if (contains && !buf.toString('utf8').includes(contains)) {
    return { status: 'partial', evidence: `exists, sentinel not found`, level: 'observed' };
  }
  return { status: 'complete', evidence: `sha256 ${got}, ${buf.length} bytes`, level: 'observed' };
}

function probeGitRemote({ remote = 'origin', branch, sha, cwd }) {
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', timeout: 30000, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  let want;
  let ref;
  try {
    if (!branch || !sha || !cwd) return { status: 'unknown', evidence: 'legacy probe lacks a frozen target; open a new receipt', level: 'unknown' };
    ref = branch;
    want = sha;
  } catch (e) {
    return { status: 'unknown', evidence: `local git: ${e.message.split('\n')[0]}`, level: 'unknown' };
  }
  let out;
  try {
    out = git('ls-remote', remote, `refs/heads/${ref}`);
  } catch (e) {
    return { status: 'unknown', evidence: `ls-remote failed: ${e.message.split('\n')[0]}`, level: 'unknown' };
  }
  const got = out.split(/\s+/)[0] || null;
  if (!got) return { status: 'failed', evidence: `${remote}/${ref} does not exist`, level: 'observed' };
  if (got !== want) {
    return { status: 'failed', evidence: `${ref} revision differs`, expected_sha: want, observed_sha: got, level: 'observed' };
  }
  return { status: 'complete', evidence: `${ref} revision matches`, expected_sha: want, observed_sha: got, level: 'observed' };
}

// Deploys lag, so retry with backoff before deciding. A 200 without the sentinel
// usually means the old build is still live: partial, not failed.
async function probeHttp({ url, sentinel, build_sha, status: wantStatus = 200, retries = 6, backoff_s = 5, timeout_s = 10 }) {
  if (![retries, backoff_s, timeout_s].every(Number.isFinite) || !Number.isInteger(retries) || retries < 0 || retries > 10 || backoff_s < 0 || backoff_s > 10 || timeout_s <= 0 || timeout_s > 30) throw new Error('invalid HTTP retry settings');
  const observations = [];
  let last = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt) await sleep(backoff_s * 1000 * attempt);
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeout_s * 1000);
    try {
      // Request fresh evidence; the build marker still has to identify the revision.
      const u = new URL(url);
      u.searchParams.set('_receipt', Date.now().toString(36));
      const res = await fetch(u, { signal: ctrl.signal, headers: { 'cache-control': 'no-cache' } });
      const body = await res.text();

      const details = { url: res.url, http_status: res.status, body_sha256: sha256(body), checked_at: new Date().toISOString() };
      const tries = `after ${attempt + 1} tr${attempt ? 'ies' : 'y'}`;
      if (res.status !== wantStatus) {
        last = { status: 'failed', evidence: `HTTP ${res.status} ${tries}`, level: 'observed', ...details };
      } else if (build_sha) {
        let marker;
        try { marker = JSON.parse(body); } catch {}
        last = { status: marker?.revision === build_sha ? 'complete' : 'partial', evidence: marker?.revision === build_sha ? 'build identity matches' : 'build identity missing or different', level: 'observed', expected_sha: build_sha, observed_sha: marker?.revision ?? null, ...details };
        if (last.status === 'complete') return { ...last, observations: [...observations, last] };
      } else if (sentinel && !body.includes(sentinel)) {
        last = { status: 'partial', evidence: `HTTP ${res.status}, sentinel not found ${tries}`, level: 'observed', ...details };
      } else {
        const success = { status: 'complete', evidence: `HTTP ${res.status}${sentinel ? ', sentinel found' : ', availability only'} ${tries}`, level: 'observed', ...details };
        return { ...success, observations: [...observations, success] };
      }
    } catch (e) {
      last = { status: 'unknown', evidence: `request error: ${e.name === 'AbortError' ? 'timeout' : e.message}`, level: 'unknown' };
    } finally { clearTimeout(t); }
    observations.push(last);
  }
  return { ...last, observations };
}

async function runProbe(spec) {
  try {
  switch (spec.kind) {
    case 'file': return probeFile(spec);
    case 'git_remote': return probeGitRemote(spec);
    case 'http': return await probeHttp(spec);
    default: return { status: 'unknown', evidence: `no probe for kind "${spec.kind}"`, level: 'unknown' };
  }
  } catch (e) { return { status: 'unknown', evidence: `probe error: ${e.code || e.message}`, level: 'unknown' }; }
}

function combine(results) {
  const s = results.map((r) => r.status);
  let status;
  if (!s.length) status = 'unknown';
  else if (s.every((x) => x === 'complete')) status = 'complete';
  else if (s.some((x) => x === 'failed')) status = 'failed';
  else if (s.some((x) => x === 'unknown') && !s.some((x) => x === 'failed')) status = 'unknown';
  else status = 'partial';
  const level = results.length && results.every((r) => r.level === 'observed') ? 'observed' : 'unknown';
  return { status, level };
}

// ---------------------------------------------------------------- receipt lifecycle

function freezeProbe(spec) {
  if (!spec || typeof spec !== 'object') throw new Error('probe must be an object');
  if (spec.kind === 'file') {
    if (!spec.path) throw new Error('file probe needs a path');
    if (spec.sha256 && !/^[a-f0-9]{64}$/i.test(spec.sha256)) throw new Error('expected full SHA256');
    if (spec.contains !== undefined && (typeof spec.contains !== 'string' || !spec.contains)) throw new Error('contains must be nonempty');
    return { ...spec, path: path.resolve(spec.path) };
  }
  if (spec.kind === 'git_remote') {
    const git = (...args) => execFileSync('git', args, { cwd: spec.cwd || process.cwd(), encoding: 'utf8', timeout: 30000, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    const cwd = git('rev-parse', '--show-toplevel');
    const branch = spec.branch || git('branch', '--show-current');
    if (!branch || branch.startsWith('-')) throw new Error('branch required');
    git('check-ref-format', `refs/heads/${branch}`);
    const sha = git('rev-parse', '--verify', `${spec.sha || 'HEAD'}^{commit}`);
    let remote = spec.remote || 'origin';
    try { remote = git('remote', 'get-url', '--push', remote); } catch {}
    if (remote.startsWith('-')) throw new Error('invalid remote');
    return { ...spec, cwd, branch, sha, remote };
  }
  if (spec.kind === 'http') {
    const u = new URL(spec.url);
    if (!['http:', 'https:'].includes(u.protocol) || u.username || u.password) throw new Error('HTTP(S) URL without credentials required');
    if (spec.sentinel !== undefined && (typeof spec.sentinel !== 'string' || !spec.sentinel)) throw new Error('sentinel must be nonempty');
    if (spec.build_sha !== undefined && !/^[a-f0-9]{40,64}$/i.test(spec.build_sha)) throw new Error('full build revision required');
    return { ...spec, url: u.href };
  }
  throw new Error(`unsupported probe kind: ${spec.kind}`);
}

function open({ intent, probes }) {
  if (typeof intent !== 'string' || !intent.trim()) throw new Error('--intent is required');
  if (!Array.isArray(probes) || !probes.length) throw new Error('at least one --probe is required: state what "done" looks like before acting');
  probes = probes.map(freezeProbe);
  const baseline = probes.map(spec => { try { return spec.kind === 'file' ? probeFile(spec) : { status: 'unknown', level: 'unknown' }; } catch { return { status: 'unknown', level: 'unknown' }; } });
  const rec = { type: 'open', schema_version: 2, baseline, id: newId(), intent, probes, env: envFingerprint(), opened_at: new Date().toISOString() };
  append(rec);
  return rec;
}

async function check(id, transport = null) {
  const r = receipts().byId.get(id);
  if (!r?.open) throw new Error(`no open receipt with id ${id}`);
  const results = [];
  for (const spec of r.open.probes) results.push({ kind: spec.kind, ...(await runProbe(spec)) });
  const { status, level } = combine(results);
  const rec = {
    type: 'close', id,
    transport: transport ?? r.close?.transport ?? { status: 'not_recorded' },
    observed: { status, results },
    evidence_level: level,
    postcondition_preexisted: r.open.baseline && !r.open.baseline.some(x => x.status === 'unknown') ? r.open.baseline.every(x => x.status === 'complete') : null,
    causation: 'not_established',
    closed_at: new Date().toISOString(),
  };
  append(rec);
  return rec;
}

async function run({ intent, probes, command }) {
  if (!command.length) throw new Error('run needs a command after --');
  if (/\.(cmd|bat)$/i.test(command[0]) || process.platform === 'win32' && /^(npm|npx|vercel)$/i.test(command[0])) throw new Error('Windows command shim: invoke its JavaScript entry point with node');
  const rec = open({ intent, probes });
  const t0 = Date.now();
  const res = spawnSync(command[0], command.slice(1), { stdio: 'inherit', shell: false, windowsHide: true, timeout: 120000 });
  const transport = {
    status: res.error ? 'error' : res.status === 0 ? 'ok' : 'nonzero_exit',
    exit_code: res.status,
    signal: res.signal,
    error_code: res.error?.code ?? null,
    wall_s: Math.round((Date.now() - t0) / 100) / 10,
  };
  // Probe even after a failed exit: the effect may have landed anyway.
  return check(rec.id, transport);
}

function status() {
  const { byId, malformed, invalid } = receipts();
  const pending = [];
  for (const [id, r] of byId) {
    const s = r.close?.observed?.status ?? 'open';
    if (!r.open || s !== 'complete') pending.push({ id, intent: r.open?.intent ?? '(close without open)', status: s, opened_at: r.open?.opened_at });
  }
  return { ledger: ledgerPath(), total: byId.size, unresolved: pending, malformed_lines: malformed, invalid_events: invalid };
}

// ---------------------------------------------------------------- CLI

function parseArgs(argv) {
  const out = { _: [], probe: [], command: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--') { out.command = argv.slice(i + 1); break; }
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const v = argv[++i];
      if (v === undefined) throw new Error(`missing value for --${k}`);
      if (k === 'probe') out.probe.push(JSON.parse(v));
      else out[k] = v;
    } else out._.push(a);
  }
  return out;
}

function print(rec) {
  console.log(JSON.stringify(rec, null, 2));
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const a = parseArgs(rest);
  switch (cmd) {
    case 'open': print(open({ intent: a.intent, probes: a.probe })); break;
    case 'check': {
      const rec = await check(a._[0]);
      print(rec);
      process.exitCode = rec.observed.status === 'complete' ? 0 : 1;
      break;
    }
    case 'run': {
      const rec = await run({ intent: a.intent, probes: a.probe, command: a.command });
      print(rec);
      process.exitCode = rec.observed.status === 'complete' ? 0 : 1;
      break;
    }
    case 'publish': {
      const rec = await publish({ ...a, retries: Number(a.retries ?? 6), backoff_s: Number(a.backoff ?? 5) });
      print(rec);
      process.exitCode = rec.observed.status === 'complete' ? 0 : 1;
      break;
    }
    case 'status': print(status()); break;
    case 'selftest': {
      const test = spawnSync(process.execPath, ['--test', path.join(path.dirname(fileURLToPath(import.meta.url)), 'receipts.test.mjs')], { stdio: 'inherit', shell: false, windowsHide: true });
      process.exitCode = test.status ?? 1; break;
    }
    default:
      throw new Error('commands: open | check <id> | run -- <cmd> | publish --url U --sentinel S | status | selftest');
  }
}

// Publishing always checks immutable build identity as well as page content.
export async function publish({ url, sentinel, remote = 'origin', branch = 'main', sha = 'HEAD', cwd = process.cwd(), retries = 6, backoff_s = 5, command = [] }) {
  if (!url || typeof sentinel !== 'string' || !sentinel.trim()) throw new Error('publish requires --url and a nonempty --sentinel');
  const target = freezeProbe({ kind: 'git_remote', remote, branch, sha, cwd });
  const probes = [target,
    { kind: 'http', url: new URL('/api/build-info', url).href, build_sha: target.sha, retries, backoff_s },
    { kind: 'http', url, sentinel, retries, backoff_s }];
  const intent = `publish ${target.sha} to ${url}`;
  return command.length ? run({ intent, probes, command }) : check(open({ intent, probes }).id);
}

export { open, check, run, status, runProbe, freezeProbe, probeFile, probeGitRemote, probeHttp };
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch((e) => { console.error(e.message); process.exitCode = 2; });
