# Plan 02 — Navigation & Stickiness ("a place people want to hang out")

**Goal:** Turn khayali.xyz from a set of rooms into a place visitors *stay in and
return to*. Clearer wayfinding, a landing that invites wandering, and a few sticky
hooks that reward exploration — without losing the bohemian, hand-made character.

**Status:** Ready. Benefits from Plan 01 being done first (real track data makes the
landing richer), but can start independently on nav/IA.

---

## 1. Current state (read this first)

- Nav ([src/app/layout.tsx](../../src/app/layout.tsx)) order: `khayali` · Tunes · Playspace ·
  Writings · Observatory · Labs · Search · [Sociable Systems ↗].
- There are **~20 top-level routes** under `src/app/` — including `/music`,
  `/playspace`, `/writings`, `/observatory`, `/chats`, `/creative`, `/worldworkshop`,
  `/soulspaces`, `/labs`, `/search`, plus a long tail (`/ai-village`, `/blogs`,
  `/data-dragons`, `/explore`, `/khayali-protocol`, `/protocol`, `/saraloosa`). Many
  are not in the nav — discoverability is poor.
- Homepage ([src/app/page.tsx](../../src/app/page.tsx)) is music-forward with a "Rooms to Wander"
  section. Good bones; under-leveraged.
- An **identity reclaim is in progress** (`.claude/KHAYALI-RECLAIM-STATUS.md`) and
  **SS-residue cleanup is pending** (`.claude/SS-RESIDUE-CLEANUP-PLAN.md`). This plan
  must coordinate with those, not fight them. Read both before touching routes.
- Three working Gemini agents already exist (Frequency Finder, Track Brief, Data
  Dragons) — these are *interactive toys*, the raw material of stickiness.

---

## 2. The stickiness thesis

People stay when (a) they can find their way, (b) something responds to them, and
(c) there's a reason to come back. The site already has (b) in seed form. This plan
strengthens all three:

1. **Wayfinding** — a coherent information architecture so the 20 routes feel like
   wings of one house, not orphans.
2. **Interactivity surfaced** — make the agents/toys the *front door* of each room,
   not buried features.
3. **Return hooks** — something that changes (latest tracks from Plan 01, a "what's
   new," a trail/breadcrumb of where you've wandered).

---

## 3. Task breakdown (with model tiers)

### T1 — IA audit & route map `[Sonnet]`
- Catalogue all ~20 routes, classify each: **keep-in-nav / keep-but-secondary /
  merge / archive / pending-SS-cleanup**. Cross-check against the two status docs so
  nothing slated for deletion gets promoted.
- Produce a proposed nav + footer structure and a sitemap. This is judgement work.
- **Output:** a route-disposition table + proposed IA. **Opus reviews and approves
  before any route changes.**

### T2 — Navigation component `[Sonnet designs, Haiku implements]`
- **Sonnet:** design the nav per approved IA — likely a primary nav (Tunes,
  Playspace, Writings, Observatory) + a "more rooms" disclosure for the long tail,
  plus mobile drawer behaviour. Keep the hand-made aesthetic.
- **Haiku:** implement the markup/Tailwind in `layout.tsx`, wire active states,
  build the mobile drawer from the spec.
- **Accept:** every kept route reachable in ≤2 taps on mobile; verified with
  `preview_resize` at mobile + desktop.

### T3 — Landing page as invitation `[Sonnet]`
- Rework `src/app/page.tsx` into a true hub: hero (music-forward), a live "latest
  tracks" strip (from Plan 01's `tracks.generated.json` if available, else the arcs),
  "Rooms to Wander" cards with one evocative line each, and one featured interactive
  agent above the fold.
- Graceful when Plan 01 isn't done: fall back to the 7 arcs.
- **Accept:** a first-time visitor understands what this place is and has 3 clear
  things to click within 5 seconds.

### T4 — Surface the interactivity `[Haiku, from Sonnet spec]`
- Make sure each agent (Frequency Finder, Track Brief, Data Dragons) has a clear
  entry point from the landing/room headers, not just mid-page. Consistent card
  styling. Mechanical once the pattern is set.
- **Accept:** all three agents reachable from a room header.

### T5 — One return hook `[Opus decides scope, Sonnet builds]`
- Pick ONE, ship it (YAGNI on the rest): a "What's new" line driven by latest track
  publishedAt, OR a lightweight client-side "rooms you've visited" trail. Recommend
  **What's new** — it rides on Plan 01 data and needs no persistence.
- **Accept:** something on the page demonstrably reflects recency/change.

### T6 — Polish & a11y pass `[Haiku/Sonnet]`
- Contrast, focus states, tap targets, keyboard nav, reduced-motion. Use the
  `chrome-devtools-mcp:a11y-debugging` skill. Verify with preview tools.
- **Accept:** no obvious a11y regressions; mobile tap targets ≥44px.

---

## 4. Constraints & guards

- **Do not disturb the reclaim/cleanup work.** Coordinate route changes with the two
  `.claude/` status docs. When in doubt, archive (move to a secondary nav) rather
  than delete.
- **Keep the character.** This is a bohemian, imaginative space — not a SaaS landing.
  Don't sand off the personality in the name of "conversion."
- **No new heavy deps.** Tailwind + Framer Motion (already present) are enough.
- **Mobile is first-class** ("deploy to the cell") — every change verified at mobile
  width.

## 5. Definition of done

- Coherent nav; all kept rooms discoverable on mobile in ≤2 taps.
- Landing invites wandering and surfaces at least one interactive agent + latest music.
- One working return hook.
- a11y and mobile verified with preview tooling. No route slated for cleanup promoted.
