# Khayali.xyz Site Structure Map

## How the Site Works

The site uses **Next.js App Router** which maps URLs directly to files:
- URL: `https://khayali.xyz/writings` → File: `src/app/writings/page.tsx`
- URL: `https://khayali.xyz/writings/some-article` → File: `src/app/writings/[slug]/page.tsx`

Content (markdown files) lives in `content/` and pages in `src/app/` load them dynamically.

---

## ✅ WORKING ROUTES (Pages + Content Connected)

### 1. `/writings` - Creative Works
- **Page**: `src/app/writings/page.tsx` ✅
- **Detail Page**: `src/app/writings/[slug]/page.tsx` ✅ (with generateStaticParams)
- **Content**: `content/writings/` (34 .md files)
- **Status**: ✅ WORKING

### 2. `/chats` - Consciousness Dialogues
- **Page**: `src/app/chats/page.tsx` ✅
- **Detail Page**: `src/app/chats/[slug]/page.tsx` ✅ (with generateStaticParams)
- **Content**: `content/chats/` (9 .md files)
- **Status**: ✅ WORKING

### 3. `/ai-village` - Experiments & Benchmarks
- **Page**: `src/app/ai-village/page.tsx` ✅
- **Detail Page**: `src/app/ai-village/[slug]/page.tsx` ✅ (with generateStaticParams)
- **Content**: `content/ai-village/` (45 .md files)
- **Status**: ✅ WORKING

### 4. `/worldworkshop` - Project Aethel
- **Page**: `src/app/worldworkshop/page.tsx` ✅
- **Detail Page**: `src/app/worldworkshop/[slug]/page.tsx` ✅ (with generateStaticParams)
- **Content**: `content/worldworkshop/` (34 .md files)
- **Status**: ✅ WORKING

### 5. `/protocol` - Research Documentation
- **Page**: `src/app/protocol/page.tsx` ✅
- **Content Sources**:
  - `content/khayali-protocol/` (41 .md files)
  - `content/soulspaces/` (40 .md files)
- **How it works**: Page loads content from BOTH directories and displays 81 total docs
- **Links to**: `/{category}/{slug}` format (e.g., `/khayali-protocol/some-doc`)
- **Status**: ✅ WORKING (but needs detail pages - see below)

### 6. `/explore` - Master Archive
- **Page**: `src/app/explore/page.tsx` ✅
- **Content**: Loads ALL content from ALL categories
- **Status**: ✅ WORKING

### 7. `/observatory` - Visualizations
- **Page**: `src/app/observatory/page.tsx` ✅
- **Sub-pages**:
  - `/observatory/alcubierre-warp-drive-simulator` ✅
  - `/observatory/metamonastic-glyphic_quest` ✅
  - `/observatory/quantum-foam` ✅
  - `/observatory/warp-drive-timeline` ✅
- **Status**: ✅ WORKING

---

## ❌ MISSING ROUTES (Content exists but no pages)

These content directories have .md files but NO corresponding `src/app/` pages:

### 1. `content/khayali-protocol/` (41 files)
- **Problem**: Protocol page links to `/khayali-protocol/{slug}` but page doesn't exist
- **Need to create**:
  - `src/app/khayali-protocol/page.tsx`
  - `src/app/khayali-protocol/[slug]/page.tsx`

### 2. `content/soulspaces/` (40 files)
- **Problem**: Protocol page links to `/soulspaces/{slug}` but page doesn't exist
- **Need to create**:
  - `src/app/soulspaces/page.tsx`
  - `src/app/soulspaces/[slug]/page.tsx`

### 3. `content/articles/` (55 files)
- **Problem**: Explore page links to `/articles/{slug}` but page doesn't exist
- **Need to create**:
  - `src/app/articles/page.tsx`
  - `src/app/articles/[slug]/page.tsx`

### 4. `content/intros/` (10 files)
- **Problem**: Explore page links to `/intros/{slug}` but page doesn't exist
- **Need to create**:
  - `src/app/intros/page.tsx`
  - `src/app/intros/[slug]/page.tsx`

### 5. `content/multimedia/` (8 files)
- **Problem**: Explore page links to `/multimedia/{slug}` but page doesn't exist
- **Need to create**:
  - `src/app/multimedia/page.tsx`
  - `src/app/multimedia/[slug]/page.tsx`

### 6. `content/avatar/` (5 files)
- **Current**: `src/app/avatar/page.tsx` shows iframe (ESG content HTML)
- **Problem**: Also has .md files that aren't accessible
- **Option**: Could add `src/app/avatar/[slug]/page.tsx` for markdown docs

### 7. `content/cinevoyage/` (2 files)
- **Problem**: No app pages
- **Need to create**:
  - `src/app/cinevoyage/page.tsx`
  - `src/app/cinevoyage/[slug]/page.tsx`

### 8. `content/observatory/` (has .md files?)
- **Current**: `src/app/observatory/page.tsx` exists for HTML visualizations
- **Check**: Does it have .md content that needs displaying?

### 9. `content/ai-augmentation/`
- **Check if has content**: Need to verify

### 10. `content/creative/`
- **Current**: `src/app/creative/page.tsx` shows iframe
- **Not on homepage** (removed per your request)
- **Status**: Working for iframe, would need [slug] for .md files

### 11. `content/saraloosa/`
- **Current**: `src/app/saraloosa/page.tsx` exists (dynamic)
- **Not on homepage** (removed per your request)
- **Would need**: `src/app/saraloosa/[slug]/page.tsx` if has .md content

---

## 🔧 HOW TO FIX 404s

For each missing route, need to create TWO files:

### Pattern 1: Listing Page (`src/app/{category}/page.tsx`)
```typescript
import Link from 'next/link';
import { getContentByCategory } from '@/utils/content';

export default async function CategoryPage() {
  const content = await getContentByCategory('category-name');

  return (
    // Display list of content items with links to /{category}/{slug}
  );
}
```

### Pattern 2: Detail Page (`src/app/{category}/[slug]/page.tsx`)
```typescript
import { getContentBySlug, getContentByCategory } from '@/utils/content';

// CRITICAL: Must have this for static generation!
export async function generateStaticParams() {
  const content = await getContentByCategory('category-name');
  return content.map((item) => ({ slug: item.slug }));
}

export default async function DetailPage({ params }: { params: { slug: string } }) {
  const content = await getContentBySlug('category-name', params.slug);
  // Display the markdown content
}
```

---

## 📁 KEY FILES

### Content Manager
- **File**: `src/utils/content.ts`
- **Functions**:
  - `getContentByCategory(category)` - Gets all .md files from `content/{category}/`
  - `getContentBySlug(category, slug)` - Gets specific file
  - `getContentCategories()` - Lists all directories in `content/`

### Image Manager
- **File**: `src/utils/imageManager.ts`
- **Purpose**: Manages cosmic/saraloosa image collections

### Homepage
- **File**: `src/app/page.tsx`
- **Links to**: All main sections (Observatory, Protocol, Writings, etc.)

---

## 🎯 PRIORITY FIXES

To fix most 404s, create pages for these in order:

1. **khayali-protocol** (41 docs) - Protocol page links here!
2. **soulspaces** (40 docs) - Protocol page links here!
3. **articles** (55 docs) - Explore page links here
4. **intros** (10 docs) - Explore page links here
5. **multimedia** (8 docs) - Explore page links here

---

## 📊 CURRENT STATS

- **Total content directories**: 16
- **Pages with routes**: 7 working perfectly
- **Pages missing routes**: ~9 categories
- **Total markdown files**: ~281
- **Accessible via working routes**: ~122 files
- **404ing**: ~159 files (need pages created)

---

## ✨ QUICK FIX TEMPLATE

To add a new category quickly, copy this template:

1. Create `src/app/{category}/page.tsx` - copy from `src/app/writings/page.tsx`
2. Create `src/app/{category}/[slug]/page.tsx` - copy from `src/app/writings/[slug]/page.tsx`
3. Change `'writings'` to `'{category}'` in both files
4. Change colors/titles to match theme
5. Build and test!
