# khayali-xyz Local Sweep Report

Generated: 2026-06-25
Repository root: C:\Users\Liezl\Documents\Github\khayali-xyz

## 1. Snapshot

Total local files (excl node_modules/.git): **~13,226**

Top file types by count:
- dirs: 2,507
- .md: 2,432
- .html: 2,252
- .jpg: 1,122
- .webp: 1,097
- .js: 465
- .png: 404
- .tsx: 238
- .ts: 105

Top file types by size:
- .wav: 3.79 GB
- .png: 1.49 GB
- .pdf: 690 MB
- .jpg: 375 MB
- .pack: 302 MB

Source code: `src/` (43 files)
Markdown content: `content/` (347 files)
Tunes assets: `tunes/` (186 files)
Applets: `public/applets/` (116 `index.html` entries)

## 2. Route ↔ Content Matrix

| Route | page.tsx | [slug] | matching content/*.md | Status |
|-------|----------|--------|----------------------|--------|
| ai-village | yes | yes | 45 | routed |
| blogs | yes | no | 0 | empty page |
| chats | yes | yes | 10 | routed |
| creative | yes | no | 0 | empty page |
| data-dragons | yes | no | 0 | hardcoded data only |
| explore | yes | no | 0 | empty page |
| khayali-protocol | yes | yes | 41 | routed |
| labs | yes | no | 0 | static marketing |
| music | yes | no | 0 | hardcoded arcs |
| observatory | yes | no | 0 | empty page |
| playspace | yes | no | 0 | static links to applets |
| protocol | yes | no | 0 | empty page |
| saraloosa | yes | no | 1 | **NEEDS [slug] route** |
| search | yes | no | 0 | search UI |
| soulspaces | yes | yes | 40 | routed |
| worldworkshop | yes | yes | 34 | routed |
| writings | yes | yes | 35 | routed |

## 3. Sociable Systems Residue

Remaining references found:
- `src/app/labs/page.tsx` — 3 links to `sociable.systems`, 2 text mentions
- `src/app/page.tsx` — footer redirect link
- `src/app/layout.tsx` — nav link "Sociable Systems ↗"
- `src/app/music/page.tsx` — 3 references tying Tunes arcs to Sociable Systems newsletter
- `src/data/arcs.ts` — "Sociable Systems Interludes" arc title

These are intentional outbound links and positioning language, not dead content.
No `/sociablesystems` route remains. No `sociablesystems/` content directory exists.

## 4. Technical Debt Signals

- `tsconfig.json` `strict: false` (legacy AGENTS note says disabled for flexibility)
- No TODO/FIXME comments in `src/` (clean surface)
- API routes depend on env keys: `GOOGLE_GENERATIVE_AI_API_KEY`, `OPENROUTER_API_KEY`, `PINECONE_API_KEY`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `cloudinary.ts` gracefully no-ops when Cloudinary is not configured
- search route catches Pinecone absence and falls back

## 5. Asset / Binary Debt

- `tunes/` contains `.wav` files (~3.8 GB) — large, likely source masters; consider compressed delivery
- `public/images/` mixed `.png/.jpg/.webp`; `.png` dominates size
- `.next/` build artifacts cached; safe to delete/regenerate
- `public/applets/` has 116 standalone HTML applets — large maintenance surface, many duplicates between `art-mindfulness-gumroad-bundle/` and `farming-sim/`

## 6. Top Attention Files (ranked)

1. `src/app/layout.tsx` — global nav still emphasizes outbound Sociable Systems; tune for khayali-first IA.
2. `src/app/page.tsx` — hero and CTAs are good, but "Rooms to wander" includes empty routes (`/creative`, `/observatory`) and duplicate `/music` CTAs.
3. `src/app/music/page.tsx` — heavy Sociable Systems framing; could be self-standing now.
4. `src/data/arcs.ts` — source of truth for Tunes arcs; "Sociable Systems Interludes" naming is residue.
5. `src/utils/content.ts` — content engine; no caching, sync fs calls, missing content security, no excerpt truncation safety.
6. `src/app/labs/page.tsx` — long, mixes outbound links with inward labs; hard to maintain.
7. `src/app/playspace/page.tsx` — links to `/applets/omnicanvas/index.html` and `/observatory`; verify paths.
8. `src/app/search/page.tsx` — depends on Pinecone; fallback UX unclear.
9. `src/lib/gemini.ts` — dual provider logic (Gemini + OpenRouter fallback); test env coverage.
10. `src/lib/cloudinary.ts` — env-gated; good, but verify no broken image URLs.

## 7. SWOT Analysis

### Strengths
- Clear creative identity: khayali is positioned as the arty, imaginative counterpart to sociable.systems.
- Tunes (`/music`) is the rising centre and has a dedicated data layer (`src/data/arcs.ts`) and interactive tooling (`FrequencyFinder`, `TrackBriefGenerator`).
- Strong applet archive: 116 interactive HTML applets under `public/applets/`.
- Graceful env-gating for Cloudinary, Pinecone, and OpenRouter fallbacks.
- Good accessibility touches: skip-to-main-content link, aria labels.
- App Router migration is complete; no legacy `pages/` directory.

### Weaknesses
- Many routes are empty shells: `/blogs`, `/creative`, `/explore`, `/observatory`, `/protocol`, `/labs` have no backing content.
- `tsconfig.json` has `strict: false`, weakening type safety across the codebase.
- Content engine uses synchronous `fs` calls and lacks caching or markdown sanitization.
- `/saraloosa` has 1 markdown file but no `[slug]` route, making the content unreachable.
- Heavy outbound emphasis on `sociable.systems` in nav and music page dilutes khayali's independence.
- Duplicate applet folders (`art-mindfulness-gumroad-bundle` vs `farming-sim`) bloat the deploy artifact.
- 3.8 GB of `.wav` masters in `tunes/` will slow builds and deploys if copied uncritically.

### Opportunities
- Reclaim the site fully: remove or downsize Sociable Systems framing; make khayali self-describing.
- Wire empty routes to real content or consolidate them into `/labs` or `/playspace`.
- Promote Tunes to a true first-class experience: per-track pages, streaming integration, waveform/playlist embeds.
- Add ISR or static generation for content routes to reduce runtime fs calls.
- Compress/convert `.wav` masters to `.mp3`/`.ogg` for web delivery.
- Create an applet index/catalog page so the 116 applets are discoverable.

### Threats
- Build/deploy size and time will degrade as `tunes/` and `public/applets/` grow.
- Broken/missing content routes harm SEO and user trust.
- Dependence on multiple third-party APIs (Gemini, OpenRouter, Pinecone, Cloudinary) creates env-rot if keys lapse.
- Without strict TypeScript, refactors become risky as the codebase expands.
- Applets are standalone HTML files; outdated dependencies or broken relative paths may cause silent failures.

## 8. Recommended Next-Level Priority Order

| Priority | Action | Files / Scope |
|----------|--------|---------------|
| P0 | Decide khayali-first IA; reduce Sociable Systems prominence | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/music/page.tsx`, `src/data/arcs.ts` |
| P1 | Add missing `[slug]` route for saraloosa | `src/app/saraloosa/[slug]/page.tsx` |
| P1 | Backfill or redirect empty routes | `/blogs`, `/creative`, `/explore`, `/observatory`, `/protocol` |
| P2 | Harden content engine | `src/utils/content.ts` |
| P2 | Audit applet paths and deduplicate folders | `public/applets/` |
| P2 | Optimize audio asset delivery | `tunes/*.wav` |
| P3 | Enable stricter TypeScript | `tsconfig.json` |
| P3 | Add smoke tests for API fallbacks | `src/lib/gemini.ts`, `src/app/api/search/route.ts` |
