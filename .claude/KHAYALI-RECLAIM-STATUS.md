# Khayali Reclaim — Status & Next Steps

> Live status of khayali-xyz reclaiming its creative/bohemian identity after Sociable
> Systems migrated to its own repo (`sociable.systems`). Companion to
> `.claude/SS-RESIDUE-CLEANUP-PLAN.md` (the prior session's plan, still valid).

## Branch
All work is on **`khayali/reclaim-identity`**. `main` (the Vercel deploy branch) is
**untouched** — nothing is live until the branch is reviewed and merged.

## Done this pass (safe, build-affecting changes verified)
- **Preserved** the prior session's abandoned-mid-flight work (SS deletions + a conservative
  partial reskin) as the first commit on the branch, so nothing was lost.
- **Reskinned the front door** (the thing that made Google / NotebookLM / Opal read
  khayali.xyz as a governance business):
  - `src/app/layout.tsx` — metadata title/description now khayali/imagination; nav rebrands
    to lowercase **khayali**, links **Tunes · Writings · Observatory · Labs**, and points
    Sociable Systems *out* to `sociable.systems`.
  - `src/app/page.tsx` — fully music-forward homepage: hero, a **Khayali Tunes** feature
    (Kill Chain Karaoke / D.I. Collection / Governance of Ghosts), "Rooms to wander", a warm
    governance-redirect to sociable.systems, bohemian about.
  - `CLAUDE.md` — overview rewritten to the reclaimed identity.
- **Cruft swept**: `Untitled*` (Obsidian scratch), `tmpclaude-*-cwd`, dated `2026-0x-xx.md`,
  `DEPLOYMENT_FORCE.md`, `DEPLOYMENT_STATUS.md`, `test-build.md`.
- **Gitignored** the local `Content 2007-04-01_2026-06-03 khayali/` folder (YouTube CSVs +
  the 277 MB umuntu video) so it never commits.
- **Staging space** created at `../Khayali/_incoming-from-xyz/` (outside this repo).

## Decisions taken (coin-flips where it didn't matter)
- **Music section name: "Khayali Tunes"** (the real channel brand) over "Sonic Cycles".
  Sonic Cycles remains a fine *arc/cycle* concept; the front-facing name is Khayali Tunes.
- **AI-ESG curriculum**: kept on disk, **de-featured** from the front door (it's SS-flavoured
  but it's Liezl's product). Not deleted.
- **SS-interlude playlists in `tunes/`**: kept (they're music, even if SS-themed).

## NOT done — deferred deliberately (needs a build-iterative pass)
These touch live routes; doing them half-way would break `next build`, so they're left clean
rather than broken:
- **Route surgery (plan Part A2)**: remove `src/app/sociablesystems/` and repair every
  reference (`feed/route.ts`, `research/*`, `methods`, `labs`). Build-check after each.
- **saraloosa**: move route + content to `_incoming-from-xyz/` (eventual home: farm site).
- **Sonic Cycles port (plan Part B)**: bring SS's `src/app/sonic-cycles/` + its data into
  khayali as the front-facing music home, folding `/music` + `tunes/TunAI` under it.
- **ai-village / playspace / avatar**: routing still Liezl's call (lean: keep ai-village as
  experiment; avatar → SS/professional; playspace TBD).
- **Content deletion (plan Part A1)**: finish removing migrated SS content (confirm each is
  in sociable.systems first; orphans → staging).

## To preview / deploy
- Preview: `npm run dev` in the main checkout on branch `khayali/reclaim-identity`.
- Deploy: merge `khayali/reclaim-identity` → `main`, push (Vercel auto-deploys). Left for
  Liezl to trigger after a glance.
