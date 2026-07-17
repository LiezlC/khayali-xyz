// Generates screenshot thumbnails for every applet in wing-manifest.json.
// Serves public/ on a throwaway port, screenshots each applet with Playwright
// Chromium, writes 640x400 JPEGs to public/applets/_thumbs/<wing>--<slug>.jpg.
// Run: node scripts/generate-applet-thumbs.mjs [--only <wingKey>]
import { readFileSync, mkdirSync, existsSync, createReadStream, statSync } from 'fs';
import { createServer } from 'http';
import { join, extname } from 'path';
import { chromium } from 'playwright';

const PUB = join(process.cwd(), 'public');
const OUT = join(PUB, 'applets', '_thumbs');
mkdirSync(OUT, { recursive: true });

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.wav': 'audio/wav' };

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const file = join(PUB, urlPath.replace(/^\/+/, '').replace(/\//g, '\\'));
  try {
    if (statSync(file).isFile()) {
      res.setHeader('Content-Type', MIME[extname(file).toLowerCase()] || 'application/octet-stream');
      createReadStream(file).pipe(res);
      return;
    }
  } catch {}
  res.statusCode = 404;
  res.end('not found');
});

const onlyIdx = process.argv.indexOf('--only');
const only = onlyIdx > -1 ? process.argv[onlyIdx + 1] : null;

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const manifest = JSON.parse(readFileSync(join(PUB, 'applets', 'wing-manifest.json'), 'utf8'));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
let done = 0, failed = 0, skipped = 0;

for (const [key, wing] of Object.entries(manifest.wings)) {
  if (only && key !== only) continue;
  for (const app of wing.apps) {
    const out = join(OUT, `${key}--${app.slug}.jpg`);
    if (existsSync(out)) { skipped++; continue; }
    const page = await ctx.newPage();
    try {
      await page.goto(`http://127.0.0.1:${port}${app.path}`, { waitUntil: 'load', timeout: 20000 });
      // Dismiss the game-help intro card if present, hide the wing dock.
      await page.waitForTimeout(3500);
      await page.evaluate(() => {
        document.getElementById('kh-game-play')?.click();
        const dock = document.getElementById('kh-wing-dock');
        if (dock) dock.style.display = 'none';
      });
      await page.waitForTimeout(1200);
      await page.screenshot({ path: out, type: 'jpeg', quality: 70, clip: { x: 0, y: 0, width: 1280, height: 800 } });
      done++;
      console.log(`ok  ${key}/${app.slug}`);
    } catch (e) {
      failed++;
      console.error(`ERR ${key}/${app.slug}: ${e.message.split('\n')[0]}`);
    } finally {
      await page.close();
    }
  }
}

await browser.close();
server.close();
console.log(`thumbs done: ${done}, skipped(existing): ${skipped}, failed: ${failed}`);
