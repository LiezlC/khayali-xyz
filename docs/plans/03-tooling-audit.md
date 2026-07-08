# Plan 03 — Tooling Audit (put the connectors to work)

**Goal:** A decision-oriented audit of the MCP servers, scraping/indexing tools, and
integrations available to this project — and concrete, scoped ways each could earn
its keep for khayali.xyz. Output is a recommendation memo, not (mostly) code.

**Status:** Ready. Mostly research/judgement — light on implementation. Independent
of Plans 01/02, though it will reference both.

---

## 1. What's connected today (observed this session)

**Already wired into the repo:**
- **Gemini 2.5 Flash** (`src/lib/gemini.ts`) — powers 3 agents; OpenRouter fallback.
- **Pinecone** — semantic search index `khayali` / namespace `content`, with keyword
  fallback in `src/app/api/search/route.ts`.
- **Cloudinary** — image CDN, env-gated no-op helper.

**Available but unused (the opportunity surface):**
- **Firecrawl** ("Fireclaw") — scrape/crawl/map/search/monitor/extract skills. Best
  for sources *without* a clean API.
- **Bright Data** — heavy-duty scraping, SERP, brand listening, price comparison.
- **vidIQ** — YouTube analytics, keyword research, title/thumbnail scoring, trending,
  competitor tracking, even generation. **Directly relevant to the music channel.**
- **YouTube Data API** — see Plan 01 (the clean path for music sync).
- **HuggingFace** — models, datasets, inference, embeddings.
- **SEO suite (searchfit-seo)** — audits, schema/JSON-LD, internal linking, AI
  visibility.
- **Vercel / Netlify** — deploy, env, logs, edge.
- **Pinecone MCP** — manage indexes/records directly.
- **NotebookLM** (`notebooklm` skill) — generate podcasts/briefings from sources.

---

## 2. Task breakdown (with model tiers)

> This plan is research-heavy. Opus orchestrates and writes the final memo; Sonnet
> runs focused investigations; Haiku/cheap models do mechanical enumeration. The
> `delegate` skill can push the enumeration to Gemini Flash/Kimi.

### T1 — Capability enumeration `[Haiku / delegate]`
- For each available tool/MCP, capture in a table: what it does, what it needs (keys),
  cost/quota shape, and whether it has setup friction. Purely mechanical lookup.
- **Output:** capability matrix.

### T2 — Match tools to real needs `[Sonnet]`
For each plausible use, score **value × effort** and give a verdict (do-now /
later / skip). Candidate uses to evaluate (don't assume — assess):
- **vidIQ → music growth:** title/thumbnail scoring, keyword research, trending and
  competitor signals to inform what to release and how to frame arcs. Likely high
  value, low effort (read-only insight).
- **Firecrawl/Bright Data → content ingestion:** pull the owner's scattered writing
  (Substack/Medium/SoundCloud) into the site or into Pinecone for search. Evaluate
  vs. just exporting.
- **Pinecone → richer search & "related":** index tracks, writings, chats so search
  and "more like this" work across the whole site. Builds on existing index.
- **HuggingFace → embeddings/local models:** cheaper/owned embeddings for Pinecone,
  or on-device audio tagging. Assess vs. Gemini.
- **NotebookLM → repurposing:** turn arcs/writings into audio briefings as content.
- **SEO suite → discoverability:** schema markup for music, AI-visibility audit so
  the site shows up in AI answers. Low effort, compounding value.
- **Output:** scored opportunity list with a clear top 3.

### T3 — De-risk the top picks `[Sonnet]`
- For each of the top 3, write a half-page "what it would actually take" — files
  touched, env vars, the graceful-fallback story, and a thin first slice.
- **Output:** 3 mini-specs ready to graduate into their own plans.

### T4 — Final memo `[Opus]`
- Synthesize into `docs/plans/03-tooling-audit-FINDINGS.md`: the matrix, the scored
  list, the top-3 mini-specs, and a recommended sequence. Flag anything that
  overlaps Plans 01/02 (e.g. vidIQ complements the YouTube sync).
- **Output:** the findings memo. This is the deliverable.

---

## 3. Guards

- **Don't implement during the audit** beyond tiny read-only spikes to validate a
  claim. The deliverable is decisions, not features.
- **Respect cost/quota** — note free-tier limits; the owner runs lean. Prefer
  read-only insight tools before anything that writes or costs per call.
- **Privacy** — scraping the owner's *own* channels/posts is fine; don't ingest
  third-party content into Pinecone without a licensing note.
- **Every recommended integration must fit the env-gated, fallback-safe pattern.**

## 4. Definition of done

- `03-tooling-audit-FINDINGS.md` exists with: capability matrix, scored opportunity
  list, top-3 mini-specs, recommended sequence.
- Each top pick is concrete enough to spin into its own plan file.
- vidIQ + YouTube relationship to Plan 01 explicitly addressed.
