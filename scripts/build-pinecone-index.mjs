/**
 * Khayali Pinecone Ingest Script
 * Enumerates all content markdown files and upserts them into the `khayali`
 * integrated index (namespace: `content`) using llama-text-embed-v2.
 *
 * Usage:
 *   PINECONE_API_KEY=pcsk_xxx npm run index:build
 *
 * Integrated index — no manual embeddings needed; Pinecone handles it via fieldMap.
 */

import { Pinecone } from '@pinecone-database/pinecone';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// ── Config ────────────────────────────────────────────────────────────────────

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const INDEX_NAME = 'khayali';
const NAMESPACE = 'content';
const UPSERT_BATCH = 96; // Pinecone integrated upsert limit per batch

// Top-level content directories to scan (relative to repo root)
const CONTENT_ROOTS = [
  { dir: 'content', section: 'auto' },   // uses subdirectory name as section
];

// ── Validation ────────────────────────────────────────────────────────────────

if (!PINECONE_API_KEY) {
  console.error('ERROR: PINECONE_API_KEY environment variable is not set.');
  console.error('Set it before running: PINECONE_API_KEY=pcsk_xxx npm run index:build');
  process.exit(1);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Minimal gray-matter replacement — parses YAML frontmatter without the npm dep
 * (gray-matter is a runtime dep so it's available, but this script is ESM and
 * gray-matter uses CJS; we'll dynamic-import it instead).
 */
async function parseFrontmatter(fileContents) {
  // Dynamic import works for gray-matter in Node ESM
  const { default: matter } = await import('gray-matter');
  return matter(fileContents);
}

/**
 * Recursively collect all .md files under a directory.
 * Returns array of { filePath, relativePath }.
 */
function collectMarkdown(dir, base = dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMarkdown(full, base));
    } else if (
      entry.name.toLowerCase().endsWith('.md') &&
      entry.name !== 'README.md'
    ) {
      results.push({ filePath: full, relativePath: path.relative(base, full) });
    }
  }
  return results;
}

/**
 * Build a clean excerpt from frontmatter or body text.
 */
function makeExcerpt(data, content) {
  const fromMeta = data.excerpt || data.summary || data.description || '';
  if (fromMeta) return fromMeta.substring(0, 400);
  const firstPara = (content || '').split('\n\n')[0].replace(/[#*_`]/g, '').trim();
  return firstPara.substring(0, 400) + (firstPara.length > 400 ? '...' : '');
}

/**
 * Derive a stable, URL-safe _id from a relative file path.
 * e.g. "ai-village/benchmarks/Day108.md" → "ai-village--benchmarks--day108"
 */
function makeId(relativePath) {
  return relativePath
    .replace(/\.md$/i, '')
    .replace(/[/\\]/g, '--')
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, '-');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Khayali Pinecone Ingest');
  console.log('========================');

  const pc = new Pinecone({ apiKey: PINECONE_API_KEY });

  // 1. Create index if it doesn't already exist (idempotent)
  console.log(`\nChecking for index "${INDEX_NAME}"...`);
  const existingIndexes = await pc.listIndexes();
  const indexExists = existingIndexes.indexes?.some(idx => idx.name === INDEX_NAME);

  if (!indexExists) {
    console.log(`Index not found. Creating "${INDEX_NAME}" with llama-text-embed-v2...`);
    await pc.createIndexForModel({
      name: INDEX_NAME,
      cloud: 'aws',
      region: 'us-east-1',
      embed: {
        model: 'llama-text-embed-v2',
        fieldMap: { text: 'chunk_text' },
      },
      waitUntilReady: true,
    });
    console.log('Index created and ready.');
  } else {
    console.log('Index already exists, skipping creation.');
  }

  // 2. Enumerate all content markdown files
  console.log('\nScanning content directories...');
  const records = [];

  for (const { dir: relDir } of CONTENT_ROOTS) {
    const absDir = path.join(ROOT, relDir);
    const files = collectMarkdown(absDir);

    for (const { filePath, relativePath } of files) {
      try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const { data, content } = await parseFrontmatter(raw);

        // Derive section from first path segment under content/
        const parts = relativePath.split(/[/\\]/);
        const section = parts.length > 1 ? parts[0] : relDir;
        const slug = path.basename(filePath, '.md');
        const title = data.title || slug.replace(/-/g, ' ');
        const excerpt = makeExcerpt(data, content);
        const id = makeId(path.join(relDir, relativePath));

        // chunk_text is the field Pinecone will embed (per fieldMap)
        const chunkText = `${title}. ${excerpt}`;

        records.push({
          _id: id,
          chunk_text: chunkText,
          title,
          section,
          slug,
        });
      } catch (err) {
        console.warn(`  WARN: skipping ${filePath}: ${err.message}`);
      }
    }
  }

  console.log(`Found ${records.length} content items to index.`);

  if (records.length === 0) {
    console.log('Nothing to upsert. Exiting.');
    return;
  }

  // 3. Upsert in batches into namespace `content`
  const ns = pc.index(INDEX_NAME).namespace(NAMESPACE);
  let upserted = 0;

  for (let i = 0; i < records.length; i += UPSERT_BATCH) {
    const batch = records.slice(i, i + UPSERT_BATCH);
    process.stdout.write(
      `  Upserting batch ${Math.floor(i / UPSERT_BATCH) + 1} / ${Math.ceil(records.length / UPSERT_BATCH)} (${batch.length} records)... `
    );
    await ns.upsertRecords({ records: batch, namespace: NAMESPACE });
    upserted += batch.length;
    console.log('done');
  }

  console.log(`\nDone. ${upserted} records upserted into index "${INDEX_NAME}" namespace "${NAMESPACE}".`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
