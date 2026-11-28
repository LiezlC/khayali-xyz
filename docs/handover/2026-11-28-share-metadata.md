# Khayali share metadata, 2026-11-28

The Observatory inherited the homepage canonical and Open Graph URL. PR #12 fixes the main Next routes and adds https://www.khayali.xyz/observatory/three-body with its own image. Production HTML for that route, /observatory and /music was verified after deployment.

The follow-up repairs metadata on 114 deployed standalone HTML documents. Deployment-excluded applets, private draft pages and HTML fragments are excluded. Scripts and styles in all 114 documents were compared with Git and remain unchanged. Other local PDF, UtopAI and manuscript changes are unrelated and excluded from these commits.

The remaining eight Observatory instruments have named share routes under /observatory/[instrument]. The allowlist comes from src/data/observatory.ts; unknown instruments return 404. Existing /observatory#three-body links still open the studio. Fragments do not reach the server, so instrument-specific cards require named routes. The Playspace studio link now uses the named address. All nine instrument routes appear in the sitemap.

Dynamic archive metadata uses the decoded content slug before URL encoding, avoiding double-encoded spaces. The Three-Body social image uses a JPEG derivative for compatibility; the WebP original remains available.

Validation: production build passed. python scripts/check-share-metadata.py checked 251 rendered or standalone pages with zero failures. Add --base-url https://www.khayali.xyz for a live LinkedInBot sweep. Browser checks verified both Three-Body entry links and the pause control. A MutationObserver console error appeared in the in-app browser without any corresponding application source; the studio rendered and responded normally.

LinkedIn Post Inspector requires a signed-in session. Its cache was not refreshed. Existing published LinkedIn cards can retain old metadata; use the named route for new shares.
