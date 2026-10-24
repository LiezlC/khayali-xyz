import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

// Use the project's compiler so this suite also runs on the CI Node 18 runtime.
const source = readFileSync(new URL('../src/app/worldworkshop/living-world/experiment.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const { makeReceipt, observe, readHistory } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

test('a successful claim cannot hide a truncated effect', () => {
  const receipt = makeReceipt('Preserve the entire message.', 'loss');
  const observed = observe(receipt, () => 'Preserve');
  assert.equal(observed.transport, 'Saved successfully');
  assert.equal(observed.status, 'partial');
  assert.equal(observed.expected, receipt.expected);
});
test('readback cannot repair the storage it is inspecting', () => {
  const store = { value: null };
  const checked = observe(makeReceipt('wanted', 'clean'), () => store.value);
  assert.equal(checked.status, 'partial');
  assert.equal(store.value, null);
});
test('a timeout can later resolve while its earlier unknown stays in the trail', () => {
  const initial = observe(makeReceipt('wanted', 'delay'), () => null);
  const later = observe(initial, () => 'wanted');
  assert.equal(initial.status, 'unknown'); assert.equal(later.status, 'complete');
  assert.equal(later.transport, 'Timed out after dispatch');
  assert.deepEqual(later.observations.map(o => o.status), ['unknown', 'complete']);
});
test('unavailable evidence stays unknown', () => {
  const receipt = observe(makeReceipt('wanted', 'blind'), () => { throw new Error('denied'); });
  assert.equal(receipt.status, 'unknown'); assert.equal(receipt.observed, null);
});
test('saved evidence roundtrips without treating a claim as verification', () => {
  const receipt = observe(makeReceipt('wanted', 'loss'), () => 'wa');
  assert.deepEqual(readHistory(JSON.stringify([receipt])), [receipt]);
  assert.throws(() => readHistory('[null]'));
  assert.throws(() => readHistory(JSON.stringify([{ ...receipt, observations: [null] }])));
});
