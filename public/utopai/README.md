# UtopAI

Live entry: https://www.khayali.xyz/utopai

Standalone public interface on the existing Khayali deployment, with a Next.js endpoint at `/api/utopai`. No extra database or account service is required. The endpoint reuses the server-only Gemini/OpenRouter configuration already used by Khayali's content agents. No key is sent to the browser.

## Features

- Search and purpose/type filters over ten sourced records, with evidence and transfer limits.
- Record dialogs, individual share links, bookmarks and a connection atlas.
- Up to three selected records can seed a combination hypothesis in the studio without replacing the visitor’s existing goal.
- Four explicit Atlas proposals explain their paired records, missing step and small test. Each proposal has its own two-card row, with the numbered connector in the gap between them. On phones the pair stacks vertically. Filtering removes pairs with hidden endpoints.
- Goal and context intake, within-reach/further-out horizons, structured AI drafting.
- Editable imagined scenes, local passport saving, Markdown download, print and portable assistant brief.
- Explicit worked example and labeled local worksheet if generation is unavailable.
- Homepage example goals and a complete interview-archive passport at `#example`.
- Task-based record suggestions in the outage flow. Visitors confirm evidence before a local worksheet is assembled; unmatched goals remain unmatched.
- Editable experiments, practical-limit fields and export of those limits with provenance.
- Card-level access, benefit-reach and review labels, with fuller distinctions in record details.
- Privacy and method disclosures, corrections via email draft, downloadable record JSON.

## Data and claims

Sources were located with AI assistance on October 13, 2026. None is claimed to have independently verified beneficiaries or long-term impact. Descriptions separate research results and technical capabilities from achieved human outcomes. Candidate claims in the original model drafts were not imported as verified facts.

`records.json` is the single seed store used by the client and server. Add or revise a record there. `connections.json` stores editorial hypotheses rather than observed combined outcomes. Add a connection only with valid endpoint IDs, its untested step and a bounded experiment. The server restricts precedent IDs to real records and validates all generated fields. The frontend escapes dynamic text. Original SVG thumbnails are symbolic, not source photographs; the glass-tree hero is AI-generated.

The local fallback uses task-specific signals and explicit visitor selection. Generic terms such as “community” do not make a flood record relevant to an interview archive. A goal without a suitable match receives no precedent. The worksheet keeps the chosen record’s opening suggestion separate from the visitor’s editable experiment. Studio entry preserves the goal and focuses its field after the view becomes visible. Obvious budget and connectivity limits in the goal are copied into editable fields for review; other limits can be entered there directly. The server marks AI drafts with missed practical limits as incomplete and names those limits in unresolved questions.

`access`, `reviewInfo`, `evidenceInfo`, and `reachLabel` in `records.json` are editorial fields. Preserve unknown access and costs as unknown; source review and evidence strength are separate. Recheck time-sensitive claims against the linked source before changing them. The floating Ko-fi embed was removed from this route; the footer support link remains.

## Boundaries

Saved items live in browser local storage. User inputs go to the configured model service on deliberate generation. They are not written to an application database, but provider and hosting logs may retain operational data. No automated daily harvest, shared cloud account, subscription service, payment flow or MCP server is claimed.

The shared per-IP rate limiter is instance-local, not a durable global quota. For a high-traffic launch, add durable budgeting/rate limiting. Generation has a bounded output and timeout. The site provides exploratory plans rather than medical, legal or selection decisions.

## Design

Concepts generated with the built-in image tool: chocolate/teal editorial primary screen, matching passport workspace, standalone glass-tree metaphor. Code-native text and controls remain selectable and accessible. The hero asset is a compressed local WebP. The record uses a small curated set, rather than invented totals.

## Local verification

Run the repository production build and start server, then open `/utopai`. Static assets must use `/utopai/` paths because Next.js removes the directory slash. A generic Python server on Windows may serve `.mjs` as text/plain; use Next.js for an accurate preview.
