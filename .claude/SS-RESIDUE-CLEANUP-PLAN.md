# SS-Residue Cleanup + Sonic Cycles Migration — Plan

> Read-only map. Nothing here is executed yet. Run it when fresh, in the order below, with a build check between steps.

## Goal
1. **khayali-xyz** becomes the main home for **Sonic Cycles**, with room to **expand** it. The creative side was backgrounded into `labs`-obscurity when SS became the sensible direction; this brings it forward, aligned with khayali's other scattered creative goodies.
2. **Remove the sociable-systems governance residue** from khayali so it keeps its own identity (roughly 139 files matched on "sociable systems").
3. **sociable.systems: leave Sonic Cycles untouched this pass.** Demotion is deferred (Liezl's call, not yet). The focus here is the khayali side.

## Good news on stack
khayali-xyz is a full Next.js app (`src/app` router), the same stack as sociable.systems. So Sonic Cycles ports across in-framework rather than needing a rebuild.

## Decisions needed from Liezl before execution
- **AI-ESG curriculum** (`public/curriculum/*`): your own product to KEEP, or SS-flavoured residue to remove? (Grey zone.)
- **Music-for-SS-interlude prompts** (`tunes/.../socsys-interludes.md`, `tunes/.../ss_interludes_playlist.md`): keep as music, or retire with the governance content? (Grey zone.)

---

## Part A — Remove SS residue from khayali

### A1. Delete outright (pure content, no build wiring, safe)
- `sociablesystems/` entire tree: the `articles/` episode archive, `Arc-Consolidation-Substack/`, `SSvoice_SKILL.md`, `.skills/sociable-systems-voice/`, `ecosystem_map.*`, `COMPUTE_CREDITS.html`, `loomdemo.html`, `LoomArc.txt`, `EvidenceDraft.md`, `ConsciousnessLoopDrafts.md`, `GemSynthPrepDraft.md`, `track_url_map.md`, `extras/`, `substack_import.xml`, `tmpclaude-384b-cwd` (temp junk).
- `public/sociablesystems/sociable_systems_dashboard.html`.
- `.claude/sociable_systems_dashboard.html`, `.claude/SkynetArticle.md`, `.claude/curriculumupdate.md` (working scraps; confirm none are wanted).
- The cruft "filenames" that are actually botched shell commands (the `public/curriculum && cp ...` entries). Bin on sight.

### A2. Delete routes, then repair references (build wiring, careful)
- Remove the route folder `src/app/sociablesystems/` (`page.tsx`, `[slug]/page.tsx`, `tracking-framework/page.tsx`).
- Then repair every file that links to it so `next build` stays green:
  - `src/app/layout.tsx` (nav)
  - `src/app/page.tsx` (home)
  - `src/app/feed/route.ts` (drop SS items from the feed)
  - scan `src/app/research/*`, `methods`, `labs`, `content-sprints`, `music` pages for SS links
  - text references in `CLAUDE.md`, `REPOSITORY_INVENTORY.md`, `IMAGE_PROMPTS.md`

### A3. Grey zone (hold for the decisions above)
- `public/curriculum/*` (AI-ESG)
- `tunes/` SS-interlude playlists

---

## Part B — Make khayali the Sonic Cycles home, and expand it
Sonic Cycles' growth fits khayali's scatter of small creative experiments, several of which got relegated to `labs` for obscurity when SS took priority. This pass gives it a proper, expandable home there rather than leaving the creative side backgrounded.
- Port SS `src/app/sonic-cycles/` (the `page` plus `cycles/[cycle]`) into khayali `src/app/`, as a front-facing section rather than a labs footnote.
- Locate the cycles data/content in SS (under `src/data`) and bring it across. This is where the song-track archive lands: the prompts and lyrics live here.
- Wire it into khayali nav (`layout.tsx`) and home, with headroom to grow.
- Fold the existing khayali `src/app/music` page and the `tunes/TunAI` material under the Sonic Cycles home, so the music story sits in one place. Surface any related goodies currently parked in `labs` alongside it.

## Part C — Demote Sonic Cycles in sociable.systems — DEFERRED
Not this pass. Hold the SS-side demotion for later; SS stays as-is on the prominence front. Kept here for when it is wanted: reduce its main-nav and home prominence in SS while keeping the route reachable, optionally pointing to khayali as the main home.

---

## Safe execution order (for later)
1. Branch both repos (only khayali changes this pass; SS branch optional).
2. **B first**: stand Sonic Cycles up on khayali and bring it forward, so the new home exists.
3. **A2**: route removal plus reference repair on khayali. Run `next build`, confirm no dead `/sociablesystems` links.
4. **A1**: content deletion on khayali, after confirming nothing in B depends on it.
5. Resolve **A3** grey zones per the decisions.
6. Commit khayali, then push. (Part C / SS demotion deferred to a later pass.)

## Verification
- khayali: `next build` passes, no live links to `/sociablesystems`, Sonic Cycles route reachable and surfaced (out of labs), nav clean.
- SS: unchanged this pass (demotion deferred).

## Risk note
The real risk is A2 (live route references). The B-before-A ordering plus a build check after every step contains it. Two separate git repos: commit independently, keep the histories clean.
