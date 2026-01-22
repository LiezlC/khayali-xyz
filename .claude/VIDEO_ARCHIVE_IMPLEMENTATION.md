# Video Archive Implementation Guide

## What Was Built

A complete video archive structure at `/research/video-archive` that transforms your Accidental AInthropologist YouTube content into a thematic knowledge base.

### Structure Created

```
/research/video-archive/
├── page.tsx                                    # Main hub with 4 pillars
├── sociology-synthetic-minds/
│   ├── page.tsx                               # Pillar page (COMPLETE EXAMPLE)
│   └── [slug]/page.tsx                        # Individual video template
├── ethics-coexistence/                        # TODO
├── post-labor-economy/                        # TODO
└── nature-intelligence/                       # TODO

content/videos/
├── README.md                                  # How to add videos
├── sociology-synthetic-minds/
│   └── ai-village-digital-frustration.md     # Example video
└── [other pillars]/                           # TODO
```

## The Four Pillars (Based on Gemini's Synthesis)

### 1. Sociology of Synthetic Minds (BUILT)
- Multi-agent systems
- AI psychology (frustration, anxiety)
- Digital personalities
- Emergent behaviors

### 2. Ethics of Co-Existence (TODO)
- Algorithmic authority
- Moral frameworks
- Alignment crisis
- Ethical encoding

### 3. Post-Labor Economy (TODO)
- Future of work
- Skill amplification
- Economic transformation
- Labor transitions

### 4. Nature of Intelligence & Reality (TODO)
- Digital consciousness
- AI creativity
- Philosophy of mind
- Synthetic cognition

## How to Add a Video

1. **Create markdown file** in appropriate pillar directory:
   ```
   content/videos/sociology-synthetic-minds/my-video-slug.md
   ```

2. **Add frontmatter**:
   ```yaml
   ---
   title: "Video Title"
   date: "YYYY-MM-DD"
   youtubeId: "VIDEO_ID_HERE"
   duration: "MM:SS"
   tags:
     - "Tag 1"
     - "Tag 2"
   featured: false  # true for featured videos
   excerpt: "Brief description"
   relatedEpisodes:  # Optional
     - "episode-1"
   relatedResearch:  # Optional
     - "ai-accountability"
   ---
   ```

3. **Write content** in markdown below the frontmatter:
   - Summary
   - Key insights
   - Connections to your research
   - Quotes from the video

4. **Video appears automatically** on pillar page

## Getting YouTube Video ID

From URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
Video ID: `dQw4w9WgXcQ`

## Next Steps to Complete

### Immediate (To Launch)
1. **Create video markdown files** for your actual videos
   - Start with 3-5 "featured" videos per pillar
   - Add more over time

2. **Copy pillar structure** for remaining 3 pillars:
   ```bash
   # Copy sociology-synthetic-minds structure
   cp -r sociology-synthetic-minds ethics-coexistence
   cp -r sociology-synthetic-minds post-labor-economy
   cp -r sociology-synthetic-minds nature-intelligence
   ```

3. **Update pillar page content**:
   - Change colors (gradients)
   - Update icon
   - Update theme descriptions

### Future Refinements (Based on Your Mindmap)

Your mindmap shows much more granular organization:
- **AI Systems & Society**
  - Labor & Economics
  - Ethics & Values
  - Governance
- **Technical Deep Dives**
  - Model Analysis
  - Architecture
- **Philosophy & Consciousness**
- **Practical Applications**
- **Multi-Agent Dynamics**

**Options for incorporating:**
1. **Add filtering/tags** - Use your mindmap categories as tags for better navigation
2. **Sub-pillars** - Create sub-sections within each pillar
3. **Hybrid structure** - Keep 4 pillars for browsing, add detailed tags from mindmap

## Integration Points

The video archive is now:
- ✅ Linked from `/research` page
- ✅ Cross-linked with newsletter episodes (via `relatedEpisodes`)
- ✅ Cross-linked with research domains (via `relatedResearch`)
- ✅ References Methods page (two-track methodology)

## Technical Notes

- **Static generation** - Videos are pre-built at build time
- **No YouTube API** - Uses direct YouTube embed URLs
- **Markdown-based** - Easy to add/edit without code
- **Featured videos** - Highlighted on pillar pages
- **Responsive** - Works on mobile/desktop
- **Professional styling** - Matches your site theme

## Key Files

- `src/app/research/video-archive/page.tsx` - Main hub
- `src/app/research/video-archive/sociology-synthetic-minds/page.tsx` - Pillar example
- `src/app/research/video-archive/sociology-synthetic-minds/[slug]/page.tsx` - Video template
- `content/videos/README.md` - Instructions
- `content/videos/sociology-synthetic-minds/ai-village-digital-frustration.md` - Example

## Build Status

✅ Build succeeds
✅ Example video page renders
✅ Integration with research page complete
✅ Ready for content population
