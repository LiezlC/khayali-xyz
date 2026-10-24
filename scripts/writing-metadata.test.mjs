import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

// Exercise the production parser against the real legacy content formats.
const filename = new URL('../src/utils/content.ts', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020 },
}).outputText;
const exports = {};
vm.runInNewContext(compiled, { exports, require: createRequire(import.meta.url), process, console });

test('legacy writing headings replace filename titles and Markdown in excerpts', async () => {
  const writings = await exports.getContentByCategory('writings');
  assert.ok(writings.length > 20);
  const bySlug = slug => writings.find(item => item.slug === slug);
  assert.equal(bySlug('ironic-armor').title, 'Armor Analysis: A Meta-Ironic Field Guide');
  assert.equal(bySlug('ai_therapy_complete_pack').title, 'Human Therapist for AI - Complete Sales Pack');
  assert.equal(bySlug('bhb').title, 'The Ballad of Black Holes');
  assert.equal(bySlug('memoryvalue').title, 'The Memory of Value');
  assert.match(bySlug('bending-fences').excerpt, /Cape Town holds its breath/);
  assert.match(bySlug('stacking-borders').excerpt, /Disa Park/);
  for (const item of writings) {
    assert.doesNotMatch(item.title, /_/);
    assert.doesNotMatch(item.excerpt, /```|\*\*|^#|Copyright ©|Template id:|ISBN:/);
  }
});

test('article metadata agrees with the library and preserves the source body', async () => {
  const article = await exports.getContentBySlug('writings', 'Whether It Still Sings');
  assert.equal(article.title, 'Whether It Still Sings');
  assert.match(article.excerpt, /^We spend a great deal of worry/);
  assert.match(article.content, /If the song makes it across/);
  const library = await exports.getContentByCategory('writings');
  assert.equal(article.excerpt, library.find(item => item.slug === article.slug).excerpt);
  assert.equal((await exports.getContentBySlug('writings', 'Whether%20It%20Still%20Sings')).title, article.title);
  assert.equal(await exports.getContentBySlug('writings', '%invalid'), null);
  assert.equal(await exports.getContentBySlug('writings', 'does-not-exist'), null);
});
