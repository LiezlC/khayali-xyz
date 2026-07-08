# khayali.xyz — Improvement Plans (delegation set)

Drafted 2026-06-19 from a scoping/brainstorm session. These are **handoff plans for
other sessions to execute**, one project per file. Each is written to be picked up
cold — no memory of the brainstorm required.

## The three projects

| # | Plan | One-line goal | Pain level |
|---|------|---------------|------------|
| 1 | [01-youtube-music-sync.md](01-youtube-music-sync.md) | Auto-keep the music section current from the YouTube channel instead of hand-wiring tracks | **High** — the original ask |
| 2 | [02-navigation-and-stickiness.md](02-navigation-and-stickiness.md) | Make the site a place people *stay* — clearer nav, a real landing, sticky hooks | Medium |
| 3 | [03-tooling-audit.md](03-tooling-audit.md) | Audit of the connected MCP/scraping/indexing tools and concrete ways to put them to use | Low (research/decision) |

Recommended order: **1 → 2 → 3**, but 1 and 3 are independent and can run in
parallel sessions. 2 benefits from 1 being done first (the music data feeds the
landing).

## Delegation model (applies to all three)

This repo's owner runs a tiered-model workflow. Each plan tags its tasks with a
suggested tier. Honour the discrimination — don't burn Opus on mechanical edits,
don't hand architectural judgement to Haiku.

- **Opus (orchestrator)** — holds the plan, owns architecture decisions, reviews
  sub-agent output, makes the trade-off calls, does the multi-file reasoning.
  Stays in command for the whole project.
- **Sonnet (lieutenant)** — higher-level delegation that still needs judgement:
  designing a component's API, writing a non-trivial route, reconciling two data
  sources, reviewing Haiku's work. Sonnet decides *how*, then may sub-delegate.
- **Haiku (grunt)** — mechanical, well-specified work: find-and-replace, scaffolding
  a file from a clear template, renaming, wiring an already-designed component into
  a page, writing fixtures. Given an exact spec, returns it ~done.

The local Accid AInthro agent runner (`delegate` skill) can route to even cheaper
models (Gemini Flash, Kimi, Qwen) for the most mechanical scanning/scaffolding —
see the `delegate` skill. Use it for vault scans and bulk transforms.

## Ground rules for every executing session

1. **Branch first.** Never work on `main`. Use a worktree per project.
2. **Env-gated, fallback-safe.** Every new integration must no-op gracefully when
   its API key is absent (this is the established repo pattern — see
   `src/lib/cloudinary.ts` and `src/app/api/search/route.ts`). The site must still
   build and render with zero new env vars set.
3. **Follow existing patterns.** Gemini calls go through `src/lib/gemini.ts`. Data
   lives in `src/data/*.ts`. Don't introduce a new state library or CMS.
4. **Verify before claiming done.** Use the `preview_*` tools to actually load the
   page and confirm. Don't report success from a successful build alone.
5. **Read `CLAUDE.md` and the two status docs** (`.claude/KHAYALI-RECLAIM-STATUS.md`,
   `.claude/SS-RESIDUE-CLEANUP-PLAN.md`) before touching routes — there's an
   in-progress identity reclaim and SS-residue cleanup that must not be disturbed.
