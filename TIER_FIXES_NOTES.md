# TIER_FIXES_NOTES.md
## Scaffolding notes — items that need external keys/services before implementation

These are documented here for future sprints. No code has been written for any of these.

---

### (a) Pinecone — Full-text semantic search over site content — DONE (2026-06-19)

**Status**: COMPLETE. Implemented on branch `claude/tier1-3-fixes`. Ingest run live 2026-06-19 — 221 records in Pinecone index `khayali` namespace `content`. Re-run ingest whenever content changes.

**What was built**:
- `scripts/build-pinecone-index.mjs` — Node ESM ingest script. Scans all 228+ markdown files under `content/`, builds `chunk_text = "<title>. <excerpt>"` per record, upserts in batches of 96 into Pinecone integrated index `khayali` (namespace `content`). Integrated index = no manual embeddings; Pinecone handles it via `llama-text-embed-v2` and `fieldMap: { text: 'chunk_text' }`. Idempotent: skips index creation if already exists.
- `src/app/api/search/route.ts` — POST `{ query, topK? }` → semantic search via `ns.searchRecords()`. Graceful fallback to existing `searchContent()` keyword search when key absent or Pinecone throws. Returns `{ results, source: 'pinecone'|'fallback' }`.
- `.env.example` — documents `PINECONE_API_KEY` and the other pending keys.
- `package.json` — added `@pinecone-database/pinecone` dependency + `"index:build"` script.

**How to run ingest** (once you have the key):
```bash
# Locally
PINECONE_API_KEY=pcsk_xxx npm run index:build

# Or in PowerShell
$env:PINECONE_API_KEY="pcsk_xxx"; npm run index:build
```

**To wire up search UI** (next task — Haiku candidate):
- Create `src/app/search/page.tsx` with a text input that POSTs to `/api/search` and renders the returned hits as links.
- Or add a search modal/bar to the site nav.

**Env vars needed** (add to Vercel project settings):
```
PINECONE_API_KEY=pcsk_xxx   # app.pinecone.io → API Keys
```
Index name is hardcoded as `khayali`, namespace `content` — no additional env vars needed.

---

### (b) Cloudinary / Adobe — Applet preview-image generation pipeline

**What**: The 100+ applets in `/public/applets/` are pure HTML. The Playspace catalog at `src/app/playspace/page.tsx` renders them as text cards with no preview thumbnails. A preview-image pipeline would screenshot each applet's `index.html` at build time and store the result in Cloudinary, then display it as an `<Image>` on the card.

**Approach**:
- Use Playwright or Puppeteer to headlessly open each applet's local URL, take a screenshot, and upload to Cloudinary.
- Run this as a one-shot script (not in CI — too slow) or as a scheduled Vercel cron job.
- Store the Cloudinary URL alongside the applet path — either in a generated JSON manifest (`public/applets-manifest.json`) or as a `source.jpg` file already present in each applet directory (many already have these in `Untitled/ArtApps/`).

**Integration points**:
- New script: `scripts/generate-applet-previews.ts` — puppeteer + cloudinary-upload loop over `CATEGORIES` in `src/app/playspace/page.tsx`.
- `src/app/playspace/page.tsx` — add optional `preview?: string` field to the `App` type and render `<Image>` if present.
- Many applet directories already contain a `source.jpg` — these could be bulk-uploaded as a fast shortcut before generating live screenshots.

**Env vars needed**:
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Adobe alternative**: Adobe Express API or Firefly could generate styled preview cards (title card artwork) rather than raw screenshots, for a more polished look.

---

### (c) Syncing hardcoded YouTube / DistroKid music links

**What**: The music playlists in `src/app/music/page.tsx` are fully hardcoded (7 playlist objects with YouTube URLs, DistroKid links, colours, descriptions). When new arcs are released, someone has to manually edit the file. A sync pipeline could fetch the live playlist list from YouTube Data API and keep the page current.

**Approach**:
- At build time (ISR-safe via `revalidate`), call YouTube Data API v3 to fetch all playlists from channel `@khayali-tunes` (`GET /youtube/v3/playlists?channelId=...`).
- Map the returned playlist metadata (title, description, thumbnail) to the existing colour/arc schema — the arc labels and colour assignments would still need manual mapping or a lookup table keyed on playlist ID.
- For DistroKid: no public API exists. Options: (i) maintain a separate JSON config file `content/music-arcs.json` that maps YouTube playlist IDs to DistroKid/streaming URLs and arc colours, and merge at build time; (ii) scrape DistroKid dashboard (fragile) — not recommended.

**Integration points**:
- `src/app/music/page.tsx` — convert from hardcoded `playlists` array to an async server component that fetches from YouTube API (already a Server Component, just needs `fetch`).
- New config file: `content/music-arcs.json` — arc metadata, colours, DistroKid URLs keyed by YouTube playlist ID, so only this file needs updating when new arcs launch.

**Env vars needed**:
```
YOUTUBE_DATA_API_KEY=         # Google Cloud Console → YouTube Data API v3
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxxxx   # @khayali-tunes channel ID
```
