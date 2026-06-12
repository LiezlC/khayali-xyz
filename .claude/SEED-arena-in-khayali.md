# Seed Prompt: Bring the Arena (council) into khayali

> Scope-and-seed note for a future session tasked with khayali work. NOT yet built.
> Captured 2026-06-04 so the idea doesn't slip again.

## The idea (Liezl's ask)
Build elements of **agent-command-center** ("Accid AInthro Agentics") into khayali — **at minimum the Arena concept** — framed to fit khayali's whole.

## What the Arena is (source)
- File: `C:\Users\Liezl\Documents\Github\agent-command-center\agent_command_center\arena_engine.py`
- A **multi-voice council**: a question/artifact is sent to many archetypal **roles** (~37: skeptic, cynic, philosopher, artist, farmer, tycoon, sailor, politician, activist, poet, elder, stoic, hedonist, beginner, anthropologist, historian, medic, psychologist, theologian, hard-materialist, etc.). Each role is backed by a (mostly free/cheap) model via OpenRouter (`LIVE_AGENT_BY_ROLE` map). A **synthesizer** role turns the room into a structured memo and **preserves disagreement** ("Do not force consensus where differences are irreconcilable").
- Runs **locally**: CLI + local dashboard (`http://127.0.0.1:8765`), `live_agents` vs `template` mode, needs OpenRouter API keys, writes runs to the vault/workspace.

## Why it fits khayali
- khayali = the arty / consciousness / bohemian side. A council of archetypal voices deliberating a question IS "consciousness banter" made structural — the spiritual successor to the old `/ai-arena` route (removed in the SS sweep as governance-flavoured), reframed as **creative/contemplative play**, not IFC governance.
- The disagreement-preserving synthesizer **echoes the Sociable Systems "disagreement-as-signal / synthetic consensus" thesis** — a nice cross-property resonance (khayali *plays* with the idea; sociable.systems *theorises* it).
- Pairs naturally with Playspace (interactive) and the chats/consciousness rooms.

## The architectural crux (read before building)
- **agent-command-center is a LOCAL Python tool** (server runtime + API keys + vault writes). **khayali.xyz is a static-ish Next.js site on Vercel** with no secrets/backend by default. The live engine cannot just "drop in."
- Three integration paths:
  1. **Static showcase gallery — RECOMMENDED FIRST.** Curate/export selected Arena runs (the council memos) from agent-command-center, publish as a `/arena` (or `/council`) gallery on khayali. Safe, free, no keys, ships fast. khayali surfaces the *output + the idea*; the engine stays local.
  2. **Serverless interactive (later).** A Next API route calling OpenRouter with a server key — but cost/abuse exposure, rate limits, needs caps/auth. Only with guardrails + appetite.
  3. **Bring-your-own-key client demo.** Visitor pastes their own OpenRouter key, runs a small council client-side. No cost to Liezl, but fiddly UX + key-handling caution.
- **Phasing (per Liezl, 2026-06-04):** (1) is a fine quick first artifact, BUT the real near-term target is **(3) the bring-your-own-key client demo — sooner than later, to get the basic interactive plumbing in place.** Don't over-invest in a static-only gallery; treat (1) as scaffolding the page/route, then wire (3) into it. (2) serverless stays a later "if it earns its keep" option.

## Option 3 (BYO-key client demo) — plumbing notes for future-you
This is the priority build. Goal: a visitor pastes their own **OpenRouter** key and runs a small live council, entirely client-side. No khayali backend, no Liezl-side cost.
- **Where the key lives:** the user's browser only (`localStorage`/in-memory). NEVER POST it to khayali/Vercel. Show a plain-language note: "your key stays in your browser, calls go straight to OpenRouter." Add a clear/forget button.
- **The calls:** client-side `fetch` to OpenRouter's OpenAI-compatible chat endpoint with the user's key. OpenRouter supports browser calls. Keep the council **small** (curated 4–6 roles, not all ~37) so it's fast and cheap; let the user pick roles.
- **Reuse from `arena_engine.py`:** the `ARENA_ROLES` prompt text (role → instruction) and `LIVE_AGENT_BY_ROLE` (role → model id) can be lifted directly. Default to the free/cheap models already mapped there.
- **Flow:** question in → fire N role calls (parallel, with per-role progress/streaming) → feed all takes to one **synthesizer** call using arena_engine's disagreement-preserving synth prompt ("do not force consensus") → render roles' takes + the synthesis memo.
- **Failure handling:** mirror the engine's "keep going if one role fails / fall back once" behaviour; show which model answered each role.
- **Build (1) and (3) on the same `/arena` route:** static curated runs render the same memo component the live demo produces, so the gallery and the interactive share one renderer.

## Where it lives on khayali
- New route `src/app/arena/` (or `/council`), khayali dark-bohemian styling. Each run = a card → memo view (roles + their takes + the disagreement-preserving synthesis). Generator-driven like the Playspace catalog (`Khayali/_incoming-from-xyz/_gen_playspace.py`) so adding runs = drop a file + rerun. Link from nav and/or Playspace/Observatory; optionally a "featured council" on the homepage.

## First bounded step
1. In agent-command-center, run 2-3 Arena councils on khayali-flavoured prompts (a creative/consciousness question) in `live_agents` mode; export run JSON/markdown.
2. In khayali, build a static `/arena` route rendering those runs (roles, takes, synthesis), generator-driven.
3. Write a short "What the council is" intro; link from nav.

## Open decisions
- Name: "Arena" / "The Council" / "Roundtable"? (Distinguish from the retired governance ai-arena.)
- Curated-only vs interactive (cost appetite).
- Featured role-set: full ~37, or a khayali-curated subset (artist, poet, philosopher, elder, hedonist, beginner, anthropologist, historian…)?
- **Privacy:** agent-command-center runs may contain private vault content — only publish hand-picked, scrubbed runs.

## Paths
- Engine/roles + model map: `…\agent-command-center\agent_command_center\arena_engine.py`; dashboard `…\dashboard\`; CLI `py -m agent_command_center.cli`.
- Target: `…\khayali-xyz\src\app\arena\`
- Related khayali docs: `.claude/KHAYALI-RECLAIM-STATUS.md`, `.claude/SS-RESIDUE-CLEANUP-PLAN.md`.
