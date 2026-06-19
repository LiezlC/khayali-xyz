# TIER_FIXES_NOTES — khayali.xyz

Branch: `claude/tier1-3-fixes`
Last updated: 2026-06-19

---

## Cloudinary media integration (Tier-2)

### What was added

| File | Purpose |
|---|---|
| `src/lib/cloudinary.ts` | ENV-gated `cld(src, opts)` helper |
| `.env.example` | Documents all required env vars |
| `src/app/page.tsx` | Demo wire-up (Khayali Tunes banner image) |
| `package.json` | Added `cloudinary@^2` + `next-cloudinary@^6` |

### How the helper works

`cld(src, opts?)` in `src/lib/cloudinary.ts`:

- Reads `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (or `CLOUDINARY_CLOUD_NAME`) at
  module init time.
- **If no cloud name is set** — returns `src` unchanged. Zero breakage, zero
  config required.
- **If cloud name is set** — builds a Cloudinary delivery URL:
  - Local `/public` paths → `image/upload` delivery
  - Absolute `https://…` URLs → `image/fetch` delivery (remote URL proxied
    through Cloudinary)
  - Default transforms: `f_auto,q_auto,w_1200,c_limit`
  - Pass `{ width, quality, format, extra }` to override per call-site.

### Env vars

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name   # client-side delivery
CLOUDINARY_CLOUD_NAME=your-cloud-name               # server-side only (fallback)
CLOUDINARY_API_KEY=                                 # only for upload/management API
CLOUDINARY_API_SECRET=                              # only for upload/management API
```

### Demo wire-up

`src/app/page.tsx` line ~46:

```tsx
import { cld } from '@/lib/cloudinary'
// …
<img src={cld('/images/homepage/khayali-tunes-banner.webp', { width: 1200 })}
     alt="Khayali Tunes — Melodies of the Machine Mind"
     className="w-full" />
```

### Adoption path (follow-up work)

1. **Bulk migration** — drop `cld()` around remaining `<img src=…>` and
   `backgroundImage: url(…)` values across the site. Priority: homepage hero,
   music arc covers, imageManager.ts return values.
2. **next-cloudinary `<CldImage>`** — for images already using Next.js `<Image>`,
   swap to `<CldImage>` from `next-cloudinary` to get automatic srcSet, blur
   placeholder, and layout. Requires adding Cloudinary to `next.config.js`
   `images.remotePatterns`.
3. **Applet preview-image generation** — the 100+ applets in `/public/applets`
   each need a generated preview. This is a separate pipeline task (generate
   screenshots → upload to Cloudinary → store public_ids in a manifest).
4. **imageManager.ts** — `getImageForContext()` and related functions return
   raw `/images/…` paths; wrapping those with `cld()` would apply transforms
   globally to the cosmic/saraloosa/quantum image collections.

### Langfuse

Not applicable to khayali.xyz. This hub has no server-side LLM agents
(Gemini calls go to `src/lib/gemini.ts` as pure fetch calls without
observability plumbing). Langfuse integration is only relevant to hubs that
have agent pipelines — skip here.

---

## Other Tier-1/2/3 fixes (populate as work lands)

_Add sections here as additional fixes are applied on this branch._
