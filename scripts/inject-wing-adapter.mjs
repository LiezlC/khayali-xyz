// Injects <script src="/applets/wing-adapter.js" defer></script> into every
// applet index.html listed in public/applets/wing-manifest.json. Idempotent.
// Run: node scripts/build-wing-manifest.mjs && node scripts/inject-wing-adapter.mjs
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const TAG = '<script src="/applets/wing-adapter.js" defer></script>';
const manifest = JSON.parse(readFileSync(join(process.cwd(), 'public', 'applets', 'wing-manifest.json'), 'utf8'));

let injected = 0, skipped = 0, failed = 0;
for (const wing of Object.values(manifest.wings)) {
  for (const app of wing.apps) {
    const file = join(process.cwd(), 'public', app.path.replace(/^\/+/, '').replace(/\//g, '\\'));
    try {
      let html = readFileSync(file, 'utf8');
      if (html.includes('wing-adapter.js')) { skipped++; continue; }
      if (/<\/body>/i.test(html)) {
        html = html.replace(/<\/body>/i, `${TAG}\n</body>`);
      } else {
        html += `\n${TAG}\n`;
      }
      writeFileSync(file, html);
      injected++;
    } catch (e) {
      console.error(`FAILED ${app.path}: ${e.message}`);
      failed++;
    }
  }
}
console.log(`injected: ${injected}, already present: ${skipped}, failed: ${failed}`);
