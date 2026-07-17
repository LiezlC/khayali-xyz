// Builds public/applets/wing-manifest.json by walking the applet folders.
// Run: node scripts/build-wing-manifest.mjs
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(process.cwd(), 'public', 'applets');

const WINGS = [
  { key: 'futures', label: 'AI Futures', dir: 'speculative-ai-futures' },
  { key: 'mind', label: 'Mindfulness & Sound', dir: 'art-mindfulness/mindfulness-sound' },
  { key: 'art', label: 'Visual Art', dir: 'art-mindfulness/visual-art' },
  { key: 'farm', label: 'Farming Sims', dir: 'art-mindfulness/farming-sim' },
  { key: 'memory', label: 'Memory & Pattern', dir: 'art-mindfulness/memory-pattern-games' },
  { key: 'curios', label: 'Curios', dir: 'art-mindfulness/misc-toys' },
];

function titleOf(htmlPath, fallback) {
  try {
    const html = readFileSync(htmlPath, 'utf8');
    const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (m) return m[1].trim();
  } catch {}
  return fallback;
}

const manifest = { generated: new Date().toISOString(), wings: {} };
for (const wing of WINGS) {
  const dir = join(ROOT, ...wing.dir.split('/'));
  if (!existsSync(dir)) continue;
  const apps = [];
  for (const slug of readdirSync(dir, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const idx = join(dir, slug.name, 'index.html');
    if (!existsSync(idx)) continue;
    apps.push({
      slug: slug.name,
      title: titleOf(idx, slug.name.replace(/-/g, ' ')),
      path: `/applets/${wing.dir}/${slug.name}/index.html`,
    });
  }
  manifest.wings[wing.key] = { label: wing.label, dir: `/applets/${wing.dir}/`, apps };
}

writeFileSync(join(ROOT, 'wing-manifest.json'), JSON.stringify(manifest, null, 1));
const total = Object.values(manifest.wings).reduce((n, w) => n + w.apps.length, 0);
console.log(`wing-manifest.json written: ${total} applets across ${Object.keys(manifest.wings).length} wings`);
