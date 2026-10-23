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
import http from 'node:http';
import crypto from 'node:crypto';
import { spawnSync, execFileSync } from 'node:child_process';

const ledgerPath = () =>
  process.env.RECEIPTS_LEDGER || path.join(os.homedir(), '.agents', 'receipts', 'ledger.jsonl');

// ---------------------------------------------------------------- ledger

function append(record) {
  const p = ledgerPath();
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.appendFileSync(p, JSON.stringify(record) + '\n');
}

function readLedger() {
  const p = ledgerPath();
  if (!fs.existsSync(p)) return { records: [], malformed: [] };
  const records = [];
  const malformed = [];
  fs.readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
    if (!line.trim()) return;
    try { records.push(JSON.parse(line)); } catch { malformed.push(i + 1); }
  });
  return { records, malformed };
}

function receipts() {
  const { records, malformed } = readLedger();
  const byId = new Map();
  for (const r of records) {
    const cur = byId.get(r.id) || {};
    // The latest close wins, so a receipt can be re-checked after a lag.
    byId.set(r.id, r.type === 'open' ? { ...cur, open: r } : { ...cur, close: r });
  }
  return { byId, malformed };
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
  const buf = fs.readFileSync(p);
  const got = sha256(buf);
  if (want && got !== want) {
    return { status: 'partial', evidence: `exists, sha256 ${got.slice(0, 12)} != ${want.slice(0, 12)}`, level: 'observed' };
  }
  if (contains && !buf.toString('utf8').includes(contains)) {
    return { status: 'partial', evidence: `exists, sentinel not found`, level: 'observed' };
  }
  return { status: 'complete', evidence: `sha256 ${got.slice(0, 12)}, ${buf.length} bytes`, level: 'observed' };
}

function probeGitRemote({ remote = 'origin', branch, sha, cwd }) {
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  let want;
  let ref;
  try {
    ref = branch || git('rev-parse', '--abbrev-ref', 'HEAD');
    want = sha || git('rev-parse', 'HEAD');
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
    return { status: 'failed', evidence: `${remote}/${ref} at ${got.slice(0, 7)}, expected ${want.slice(0, 7)}`, level: 'observed' };
  }
  return { status: 'complete', evidence: `${remote}/${ref} == ${got.slice(0, 7)}`, level: 'observed' };
}

// Deploys lag, so retry with backoff before deciding. A 200 without the sentinel
// usually means the old build is still live: partial, not failed.
async function probeHttp({ url, sentinel, status: wantStatus = 200, retries = 6, backoff_s = 15, timeout_s = 20 }) {
  let last = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt) await sleep(backoff_s * 1000 * attempt);
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), timeout_s * 1000);
      // Cache-bust so a CDN copy of the old page doesn't count as evidence.
      const u = new URL(url);
      u.searchParams.set('_receipt', Date.now().toString(36));
      const res = await fetch(u, { signal: ctrl.signal, headers: { 'cache-control': 'no-cache' } });
      const body = await res.text();
      clearTimeout(t);
      const tries = `after ${attempt + 1} tr${attempt ? 'ies' : 'y'}`;
      if (res.status !== wantStatus) {
        last = { status: 'failed', evidence: `HTTP ${res.status} ${tries}`, level: 'observed' };
      } else if (sentinel && !body.includes(sentinel)) {
        last = { status: 'partial', evidence: `HTTP ${res.status}, sentinel not found ${tries}`, level: 'observed' };
      } else {
        return { status: 'complete', evidence: `HTTP ${res.status}${sentinel ? ', sentinel found' : ''} ${tries}`, level: 'observed' };
      }
    } catch (e) {
      last = { status: 'unknown', evidence: `request error: ${e.name === 'AbortError' ? 'timeout' : e.message}`, level: 'unknown' };
    }
  }
  return last;
}

async function runProbe(spec) {
  switch (spec.kind) {
    case 'file': return probeFile(spec);
    case 'git_remote': return probeGitRemote(spec);
    case 'http': return probeHttp(spec);
    default: return { status: 'unknown', evidence: `no probe for kind "${spec.kind}"`, level: 'unknown' };
  }
}

function combine(results) {
  const s = results.map((r) => r.status);
  let status;
  if (!s.length) status = 'unknown';
  else if (s.every((x) => x === 'complete')) status = 'complete';
  else if (s.every((x) => x === 'failed')) status = 'failed';
  else if (s.some((x) => x === 'unknown') && !s.some((x) => x === 'failed')) status = 'unknown';
  else status = 'partial';
  const level = results.length && results.every((r) => r.level === 'observed') ? 'observed' : 'unknown';
  return { status, level };
}

// ---------------------------------------------------------------- receipt lifecycle

function open({ intent, probes }) {
  if (!intent) throw new Error('--intent is required');
  if (!probes.length) throw new Error('at least one --probe is required: state what "done" looks like before acting');
  const rec = { type: 'open', id: newId(), intent, probes, env: envFingerprint(), opened_at: new Date().toISOString() };
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
    closed_at: new Date().toISOString(),
  };
  append(rec);
  return rec;
}

async function run({ intent, probes, command }) {
  if (!command.length) throw new Error('run needs a command after --');
  const rec = open({ intent, probes });
  const t0 = Date.now();
  // Windows needs a shell to find .cmd shims (npm, vercel); pass one string so nothing is re-split.
  const res = process.platform === 'win32'
    ? spawnSync(command.join(' '), { stdio: 'inherit', shell: true })
    : spawnSync(command[0], command.slice(1), { stdio: 'inherit' });
  const transport = {
    status: res.error ? 'error' : res.status === 0 ? 'ok' : 'nonzero_exit',
    exit_code: res.status,
    wall_s: Math.round((Date.now() - t0) / 100) / 10,
  };
  // Probe even after a failed exit: the effect may have landed anyway.
  return check(rec.id, transport);
}

function status() {
  const { byId, malformed } = receipts();
  const pending = [];
  for (const [id, r] of byId) {
    const s = r.close?.observed?.status ?? 'open';
    if (s !== 'complete') pending.push({ id, intent: r.open?.intent ?? '(close without open)', status: s, opened_at: r.open?.opened_at });
  }
  return { ledger: ledgerPath(), total: byId.size, unresolved: pending, malformed_lines: malformed };
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
    case 'check': print(await check(a._[0])); break;
    case 'run': {
      const rec = await run({ intent: a.intent, probes: a.probe, command: a.command });
      print(rec);
      process.exitCode = rec.observed.status === 'complete' ? 0 : 1;
      break;
    }
    case 'publish': {
      // The site-publishing receipt: the pushed commit is on the remote and the live page serves it.
      if (!a.url) throw new Error('publish needs --url');
      const probes = [
        { kind: 'git_remote', remote: a.remote || 'origin', branch: a.branch || 'main', sha: a.sha },
        { kind: 'http', url: a.url, sentinel: a.sentinel, retries: Number(a.retries ?? 6), backoff_s: Number(a.backoff ?? 15) },
      ];
      const intent = a.intent || `publish ${a.url}`;
      const rec = a.command.length ? await run({ intent, probes, command: a.command }) : await check(open({ intent, probes }).id);
      print(rec);
      process.exitCode = rec.observed.status === 'complete' ? 0 : 1;
      break;
    }
    case 'status': print(status()); break;
    case 'selftest': await selftest(); break;
    default:
      console.log('commands: open | check <id> | run -- <cmd> | publish --url U [--sentinel S] | status | selftest');
  }
}

// ---------------------------------------------------------------- selftest

async function selftest() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'receipts-'));
  process.env.RECEIPTS_LEDGER = path.join(dir, 'ledger.jsonl');
  let pass = 0;
  let fail = 0;
  const ok = (cond, name) => { cond ? pass++ : fail++; console.log(`${cond ? 'PASS' : 'FAIL'} ${name}`); };

  // file
  const f = path.join(dir, 'page.md');
  fs.writeFileSync(f, 'hello sentinel');
  ok(probeFile({ path: f, contains: 'sentinel' }).status === 'complete', 'file: sentinel present -> complete');
  ok(probeFile({ path: f, sha256: sha256('other') }).status === 'partial', 'file: hash mismatch -> partial');
  ok(probeFile({ path: path.join(dir, 'nope') }).status === 'failed', 'file: missing -> failed');

  // git: a local bare remote stands in for GitHub
  const g = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8' });
  const bare = path.join(dir, 'remote.git');
  const work = path.join(dir, 'work');
  g(dir, 'init', '-q', '--bare', bare);
  g(dir, 'init', '-q', '-b', 'main', work);
  g(work, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '--allow-empty', '-m', 'one');
  g(work, 'remote', 'add', 'origin', bare);
  ok(probeGitRemote({ cwd: work, branch: 'main' }).status === 'failed', 'git: unpushed branch -> failed');
  g(work, 'push', '-q', 'origin', 'main');
  ok(probeGitRemote({ cwd: work, branch: 'main' }).status === 'complete', 'git: pushed -> complete');
  g(work, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '--allow-empty', '-m', 'two');
  ok(probeGitRemote({ cwd: work, branch: 'main' }).status === 'failed', 'git: local ahead of remote -> failed');
  ok(probeGitRemote({ cwd: work, remote: 'nowhere', branch: 'main' }).level === 'unknown', 'git: unreachable remote -> unknown, not failed');

  // http: a local server that serves the old page, then the new one (deploy lag)
  let hits = 0;
  const srv = http.createServer((req, res) => {
    if (req.url.startsWith('/missing')) { res.writeHead(404); return res.end(); }
    hits++;
    res.writeHead(200);
    res.end(hits < 3 ? 'old build' : 'new build NEWTITLE');
  }).listen(0);
  const base = `http://127.0.0.1:${srv.address().port}`;
  const lag = await probeHttp({ url: `${base}/page`, sentinel: 'NEWTITLE', retries: 4, backoff_s: 0.05 });
  ok(lag.status === 'complete' && hits === 3, 'http: deploy lag resolves within retries -> complete');
  hits = 0;
  ok((await probeHttp({ url: `${base}/page`, sentinel: 'NEWTITLE', retries: 0 })).status === 'partial', 'http: old build live -> partial');
  ok((await probeHttp({ url: `${base}/missing`, retries: 0 })).status === 'failed', 'http: 404 -> failed');
  ok((await probeHttp({ url: 'http://127.0.0.1:1/x', retries: 0, timeout_s: 2 })).level === 'unknown', 'http: connection refused -> unknown');
  srv.close();

  // lifecycle: transport and effect stay separate
  const r1 = await run({ intent: 'write page', probes: [{ kind: 'file', path: f, contains: 'sentinel' }], command: ['node', '-e', 'process.exit(3)'] });
  ok(r1.transport.status === 'nonzero_exit' && r1.observed.status === 'complete', 'run: failed exit but effect landed -> transport and effect recorded separately');
  const r2 = await run({ intent: 'write page', probes: [{ kind: 'file', path: path.join(dir, 'never') }], command: ['node', '-e', '0'] });
  ok(r2.transport.status === 'ok' && r2.observed.status === 'failed', 'run: clean exit but no effect -> failed (false completion caught)');
  ok(combine([{ status: 'complete', level: 'observed' }, { status: 'unknown', level: 'unknown' }]).level === 'unknown', 'combine: any unknown probe -> evidence_level unknown');

  let threw = false;
  try { open({ intent: 'x', probes: [] }); } catch { threw = true; }
  ok(threw, 'open: refuses a receipt with no postcondition');
  threw = false;
  try { await check('act_nonexistent'); } catch { threw = true; }
  ok(threw, 'check: refuses an id that was never opened');

  fs.appendFileSync(process.env.RECEIPTS_LEDGER, '{broken\n');
  const st = status();
  ok(st.malformed_lines.length === 1, 'status: reports malformed ledger lines instead of skipping silently');
  ok(st.unresolved.some((u) => u.id === r2.id) && !st.unresolved.some((u) => u.id === r1.id), 'status: lists failed receipt, omits complete one');

  fs.rmSync(dir, { recursive: true, force: true });
  console.log(`\n${pass}/${pass + fail} passed`);
  process.exitCode = fail ? 1 : 0;
}

main().catch((e) => { console.error(e.message); process.exitCode = 2; });
