# Plan 01 — YouTube → Music Section Auto-Sync

**Goal:** Stop hand-wiring tracks. The music section should pull from the YouTube
channel (and reconcile with the local catalog) so new uploads surface on the site
without a human editing `arcs.ts` by hand each time.

**Status:** Ready to implement. Independent of Plans 02/03.

---

## 1. Current state (read this first)

- `/music` page ([src/app/music/page.tsx](../../src/app/music/page.tsx)) renders **7 hardcoded arcs**
  from [src/data/arcs.ts](../../src/data/arcs.ts). Each arc has a title, description, "argument,"
  a YouTube *playlist* URL, an optional DistroKid link, and Tailwind styling.
- Individual tracks are **not rendered anywhere on the site.** The catalog
  [tunes/TunAI/dk_tracks.json](../../tunes/TunAI/dk_tracks.json) (~23 tracks) is only a DistroKid upload
  manifest — track name, .wav/.webp filenames, genre codes, status. No YouTube
  links, no arc assignment.
- `.env.example` already contains **stubbed** `YOUTUBE_DATA_API_KEY` and
  `YOUTUBE_CHANNEL_ID` marked "planned future: music arc sync." This plan delivers it.
- Pattern to follow for graceful degradation: `src/lib/cloudinary.ts` (no-op when
  unset) and `src/app/api/search/route.ts` (dynamic import + keyword fallback).

**The decided source-of-truth strategy:** YouTube Data API for structure (playlists =
arcs, videos = tracks, thumbnails, video IDs) **blended with** `dk_tracks.json` for
canonical track metadata where it overlaps. YouTube is authoritative for "what's
live and where to watch it."

---

## 2. Architecture

```
YouTube Data API ──┐
                   ├─► [sync step] ─► src/data/tracks.generated.json ─► /music renders
dk_tracks.json ────┘                         (committed cache)
```

Two viable execution modes — **the executing session should pick based on owner
preference, default to B:**

- **A) Build-time / on-demand fetch** — a script (`scripts/sync-youtube.ts`) calls the
  API, writes `src/data/tracks.generated.json`, which the page imports statically.
  Re-run manually or in CI. Zero runtime API cost, fully static, can't go stale
  silently. **Recommended default.**
- **B) Runtime route with cache** — `/api/music-sync` fetches live with a revalidate
  window (Next.js ISR / `revalidate`). Fresher, but adds runtime dependency and
  quota exposure.

**Recommendation: A** (a committed generated file + a cron to refresh it) gives the
"keep it updated" outcome without runtime fragility. A scheduled cloud agent (the
`schedule` skill / CronCreate) can run the sync weekly and open a PR.

---

## 3. Task breakdown (with model tiers)

> Each task lists tier, inputs, outputs, and acceptance. Opus stays in command and
> reviews each handoff before the next starts.

### T1 — API spike & key setup `[Opus decides, owner provides key]`
- Confirm the channel ID and which playlists map to which of the 7 arcs (this is a
  judgement call — playlist titles may not match arc IDs cleanly). Produce a
  **mapping table** `playlistId → arcId` as the contract for later tasks.
- Document how to get `YOUTUBE_DATA_API_KEY` (Google Cloud console, enable YouTube
  Data API v3, restrict key) in the plan's appendix and in `.env.example` comments.
- **Output:** mapping table + confirmed env var names. **Accept:** a `curl` against
  `playlistItems` returns real video data for at least one arc.

### T2 — Sync library `[Sonnet]`
- Write `src/lib/youtube.ts`: typed functions `fetchPlaylist(playlistId)` →
  `{videoId, title, thumbnail, publishedAt, url}[]`. Pure fetch, no SDK (match the
  REST style of `src/lib/gemini.ts`). Must throw a clean typed error on missing key
  so callers can fall back.
- **Accept:** unit-callable, returns shaped data; returns `null`/throws-typed when
  `YOUTUBE_DATA_API_KEY` unset.

### T3 — Reconcile + generate `[Sonnet]`
- Write `scripts/sync-youtube.ts`: for each arc's playlist (per T1 mapping), fetch
  videos, match against `dk_tracks.json` by normalized title (fuzzy — strip
  punctuation/case), merge metadata, write `src/data/tracks.generated.json` with a
  stable shape: `{ arcId, tracks: [{title, videoId, url, thumbnail, dkStatus?}] }`.
- Log unmatched tracks (in JSON but not on YouTube, or vice-versa) to stdout so the
  owner sees gaps. **No silent drops.**
- **Accept:** running the script produces a committed JSON the page can import;
  unmatched items are reported, not hidden.

### T4 — Render tracks on `/music` `[Sonnet designs, Haiku wires]`
- **Sonnet:** design a `TrackList` component (per-arc expandable list or grid of
  track cards with thumbnail + play link). Decide the interaction (inline embed vs.
  link-out — recommend link-out to keep page light; thumbnails via Cloudinary
  helper if available).
- **Haiku:** scaffold the component file from Sonnet's spec, wire it into
  `src/app/music/page.tsx` under each arc, pull data from `tracks.generated.json`.
- **Accept:** `/music` shows real tracks under each arc; verified with `preview_*`
  tools on desktop and mobile widths.

### T5 — Scheduled refresh `[Opus]`
- Set up a weekly scheduled agent (use the `schedule` skill) that runs the sync and
  opens a PR if `tracks.generated.json` changed. Document the manual fallback
  (`npm run sync:youtube`). Add the script to `package.json`.
- **Accept:** one successful scheduled (or dry-run) execution that produces a diff.

---

## 4. Risks & guards

- **Quota:** YouTube Data API has a daily quota. `playlistItems.list` is cheap
  (1 unit/call). Weekly sync is negligible. Don't poll at runtime per request.
- **Title matching is fuzzy** — never auto-delete a track from the site because it
  didn't match. Additive only; report mismatches.
- **Arc mapping may not be 1:1** — some videos may not belong to a playlist. Decide
  in T1 whether to show an "unsorted/latest" bucket.
- **Build must pass with no key set** — `tracks.generated.json` is committed, so the
  page renders from cache even when the API key is absent in the build env.

## 5. Definition of done

- New tracks appear on `/music` after a sync run, no hand-editing of `arcs.ts`.
- Site builds and renders with zero new env vars.
- Owner has a one-command (`npm run sync:youtube`) and an automated weekly path.
- `arcs.ts` remains the source of truth for arc *framing*; tracks come from sync.
