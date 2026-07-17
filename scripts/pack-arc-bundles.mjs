// Assembles Ko-fi shop arc bundles from the manifest:
// per arc, a folder with WAVs + matching art (same basename .png/.jpg if
// present) + LINER_NOTES.md, then zips it with PowerShell Compress-Archive.
// Run: node scripts/pack-arc-bundles.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { join, basename, extname } from 'path';

const manifest = JSON.parse(readFileSync(join(process.cwd(), '_internal', 'kofi-shop', 'arc-pack-manifest.json'), 'utf8'));
const linerDir = join(process.cwd(), '_internal', 'kofi-shop', 'liner-notes');
mkdirSync(manifest.out_dir, { recursive: true });

const artFiles = readdirSync(manifest.art_dir).filter(f => /\.(png|jpe?g|webp)$/i.test(f));

for (const [slug, arc] of Object.entries(manifest.arcs)) {
  if (slug === 'unsorted') continue;
  const dir = join(manifest.out_dir, slug);
  mkdirSync(dir, { recursive: true });
  let copied = 0;
  for (const wav of arc.tracks) {
    const src = join(manifest.wav_dir, wav);
    if (!existsSync(src)) { console.error(`MISSING ${slug}: ${wav}`); continue; }
    copyFileSync(src, join(dir, wav));
    copied++;
    // Pull in art whose basename loosely matches the track name.
    const stem = basename(wav, extname(wav)).toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const art of artFiles) {
      const artStem = basename(art, extname(art)).toLowerCase().replace(/[^a-z0-9]/g, '');
      if (artStem && (stem.includes(artStem) || artStem.includes(stem))) copyFileSync(join(manifest.art_dir, art), join(dir, art));
    }
  }
  const liner = join(linerDir, `${slug}.md`);
  if (existsSync(liner)) copyFileSync(liner, join(dir, 'LINER_NOTES.md'));
  const zip = join(manifest.out_dir, `${slug}.zip`);
  execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${dir}\\*' -DestinationPath '${zip}' -Force"`);
  console.log(`${slug}: ${copied} tracks → ${zip}`);
}
