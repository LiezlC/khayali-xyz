#!/usr/bin/env node
// Push a fixed commit and verify both the remote ref and the live build/content.
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { publish } from './receipts.mjs';

const cwd = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
function option(name) { const i = args.indexOf(name); return i < 0 ? undefined : args[i + 1]; }
try {
  const url = option('--url'), sentinel = option('--sentinel');
  if (!url || !sentinel) throw new Error('usage: npm run publish:verified -- --url https://www.khayali.xyz/PATH --sentinel "Expected content"');
  const sha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd, encoding: 'utf8' }).trim();
  // This command publishes committed state only. It never stages or commits local edits.
  const rec = await publish({ cwd, url, sentinel, branch: 'main', sha, command: ['git', '-C', cwd, 'push', 'origin', `${sha}:refs/heads/main`] });
  console.log(JSON.stringify(rec, null, 2));
  process.exitCode = rec.observed.status === 'complete' ? 0 : 1;
} catch (e) { console.error(e.message); process.exitCode = 2; }
