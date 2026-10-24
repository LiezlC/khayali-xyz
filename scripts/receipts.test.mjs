import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { open, check, run, status, publish, runProbe } from './receipts.mjs';

test('receipts reject misleading outcomes and preserve evidence', async t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'receipts-tests-'));
  const previous = process.env.RECEIPTS_LEDGER;
  process.env.RECEIPTS_LEDGER = path.join(dir, 'ledger.jsonl');
  t.after(() => {
    if (previous === undefined) delete process.env.RECEIPTS_LEDGER; else process.env.RECEIPTS_LEDGER = previous;
    if (path.dirname(path.resolve(dir)) === path.resolve(os.tmpdir()) && path.basename(dir).startsWith('receipts-tests-')) fs.rmSync(dir, { recursive: true, force: true });
  });
  const file = path.join(dir, 'file with spaces.txt');
  const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const bare = path.join(dir, 'remote.git'), work = path.join(dir, 'work');
  git(dir, 'init', '-q', '--bare', bare); git(dir, 'init', '-q', '-b', 'main', work);
  const commit = text => git(work, '-c', 'user.name=receipt-test', '-c', 'user.email=test@example.invalid', 'commit', '-q', '--allow-empty', '-m', text);
  commit('one'); git(work, 'remote', 'add', 'origin', bare); git(work, 'push', '-q', 'origin', 'main');
  const original = git(work, 'rev-parse', 'HEAD');
  let mode = 'old', hits = 0;
  const server = http.createServer((req, res) => {
    hits++;
    if (mode === 'unavailable') { res.writeHead(503); res.end('unavailable'); return; }
    res.writeHead(200);
    if (mode === 'login') { res.end('<html>Sign in</html>'); return; }
    if (req.url.startsWith('/api/build-info')) res.end(JSON.stringify({ revision: mode === 'old' ? '0'.repeat(40) : original }));
    else res.end(mode === 'missing-content' ? '<html>Wrong page</html>' : '<html>EXPECTED PAGE</html>');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => { server.closeAllConnections(); server.close(); });
  const url = `http://127.0.0.1:${server.address().port}/page`;
  const publishOptions = { cwd: work, url, sentinel: 'EXPECTED PAGE', sha: original, retries: 0, backoff_s: 0 };

  await t.test('no receipt without postconditions', () => assert.throws(() => open({ intent: 'x', probes: [] })));
  await t.test('no publish without content assertion', async () => assert.rejects(publish({ url, cwd: work }), /sentinel/));
  await t.test('unknown receipt is rejected', async () => assert.rejects(check('nonexistent')));
  await t.test('Windows executable, spaces, quotes and shell symbols roundtrip literally', async () => {
    const script = path.join(dir, 'child with spaces.cjs');
    fs.writeFileSync(script, 'require("node:fs").writeFileSync(process.argv[2],JSON.stringify(process.argv.slice(3)))');
    const argv = ['alpha beta', 'literal&value', 'a"quote', 'x|y', '%PATH%', ''];
    const rec = await run({ intent: 'literal argv', probes: [{ kind: 'file', path: file }], command: [process.execPath, script, file, ...argv] });
    assert.equal(rec.transport.status, 'ok'); assert.deepEqual(JSON.parse(fs.readFileSync(file, 'utf8')), argv);
  });
  await t.test('successful exit without intended write is failed', async () => {
    const rec = await run({ intent: 'write missing file', probes: [{ kind: 'file', path: path.join(dir, 'missing') }], command: [process.execPath, '-e', '0'] });
    assert.equal(rec.transport.status, 'ok'); assert.equal(rec.observed.status, 'failed');
  });
  await t.test('failed transport can still have confirmed effect', async () => {
    const script = path.join(dir, 'write-then-fail.cjs'), target = path.join(dir, 'late');
    fs.writeFileSync(script, 'require("node:fs").writeFileSync(process.argv[2],"desired");process.exit(3)');
    const rec = await run({ intent: 'write despite error', probes: [{ kind: 'file', path: target, contains: 'desired' }], command: [process.execPath, script, target] });
    assert.equal(rec.transport.exit_code, 3); assert.equal(rec.observed.status, 'complete'); assert.equal(rec.postcondition_preexisted, false);
  });
  await t.test('preexisting state does not claim action causation', async () => {
    const rec = await run({ intent: 'state already present', probes: [{ kind: 'file', path: file }], command: [process.execPath, '-e', 'process.exit(3)'] });
    assert.equal(rec.postcondition_preexisted, true); assert.equal(rec.causation, 'not_established');
  });
  await t.test('partial file content is not complete', async () => {
    const rec = await check(open({ intent: 'whole content', probes: [{ kind: 'file', path: file, contains: 'never written' }] }).id);
    assert.equal(rec.observed.status, 'partial');
  });
  await t.test('directory probe records failure rather than throwing', async () => {
    const rec = await check(open({ intent: 'regular file', probes: [{ kind: 'file', path: dir }] }).id);
    assert.equal(rec.observed.status, 'failed');
  });
  await t.test('missing executable retains error and probe results', async () => {
    const rec = await run({ intent: 'spawn failure', probes: [{ kind: 'file', path: path.join(dir, 'absent') }], command: [path.join(dir, 'missing.exe')] });
    assert.equal(rec.transport.status, 'error'); assert.equal(rec.transport.error_code, 'ENOENT'); assert.equal(rec.observed.status, 'failed');
  });
  await t.test('old build with correct page phrase fails publishing identity', async () => {
    mode = 'old'; const rec = await publish(publishOptions); assert.equal(rec.observed.status, 'partial');
    assert.equal(rec.observed.results[1].observed_sha, '0'.repeat(40));
  });
  await t.test('200 login page cannot masquerade as deployment', async () => {
    mode = 'login'; assert.notEqual((await publish(publishOptions)).observed.status, 'complete');
  });
  await t.test('correct build with wrong content is partial', async () => {
    mode = 'missing-content'; assert.equal((await publish(publishOptions)).observed.status, 'partial');
  });
  await t.test('remote revision plus matching live build and content completes', async () => {
    mode = 'new'; const rec = await publish(publishOptions); assert.equal(rec.observed.status, 'complete');
    assert.equal(rec.observed.results[1].expected_sha, original); assert.ok(rec.observed.results[1].body_sha256);
  });
  await t.test('HTTP outage is not complete', async () => {
    mode = 'unavailable'; assert.equal((await publish(publishOptions)).observed.status, 'failed');
  });
  await t.test('network uncertainty stays unknown and is recorded', async () => {
    const rec = await check(open({ intent: 'unknown network', probes: [{ kind: 'http', url: 'http://127.0.0.1:1', retries: 0 }] }).id);
    assert.equal(rec.observed.status, 'unknown'); assert.equal(rec.evidence_level, 'unknown');
  });
  await t.test('deploy lag retries real observations', async () => {
    let n = 0;
    const lag = http.createServer((_req, res) => { res.end(++n === 1 ? 'OLD' : 'NEW'); });
    await new Promise(resolve => lag.listen(0, '127.0.0.1', resolve));
    try {
      const r = await runProbe({ kind: 'http', url: `http://127.0.0.1:${lag.address().port}`, sentinel: 'NEW', retries: 1, backoff_s: 0 });
      assert.equal(r.status, 'complete'); assert.equal(n, 2); assert.equal(r.observations[0].status, 'partial');
    } finally { lag.closeAllConnections(); lag.close(); }
  });
  await t.test('opened git target stays fixed after new commit, push and cwd change', async () => {
    const opened = open({ intent: 'publish first commit', probes: [{ kind: 'git_remote', cwd: work }] });
    commit('two'); git(work, 'push', '-q', 'origin', 'main');
    const cwd = process.cwd(); process.chdir(dir);
    try { const rec = await check(opened.id); assert.equal(rec.observed.status, 'failed'); assert.equal(opened.probes[0].sha, original); }
    finally { process.chdir(cwd); }
  });
  await t.test('relative file path remains fixed across cwd change', async () => {
    const cwd = process.cwd(); process.chdir(dir);
    const opened = open({ intent: 'fixed relative path', probes: [{ kind: 'file', path: path.basename(file) }] });
    process.chdir(cwd); assert.equal((await check(opened.id)).observed.status, 'complete');
  });
  await t.test('HTTP probe exception becomes unknown', async () => {
    assert.equal((await runProbe({ kind: 'http', url, retries: -1 })).status, 'unknown');
  });
  await t.test('corrupt JSON and invalid event schemas are reported, not fatal', () => {
    fs.appendFileSync(process.env.RECEIPTS_LEDGER, '{broken\nnull\n{"id":"x","type":"open","probes":[null]}\n');
    const report = status(); assert.equal(report.malformed_lines.length, 1); assert.equal(report.invalid_events.length, 2); assert.ok(report.unresolved.length);
  });
});
