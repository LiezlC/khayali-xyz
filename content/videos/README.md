# Video Archive Content

This directory contains markdown files for video content from the Accidental AInthropologist YouTube channel.

## Structure

```
content/videos/
├── sociology-synthetic-minds/     # Pillar 1: Multi-agent systems, AI psychology
├── ethics-coexistence/            # Pillar 2: Human values vs algorithmic decisions
├── post-labor-economy/            # Pillar 3: Future of work
└── nature-intelligence/           # Pillar 4: Philosophy and consciousness
```

## Adding a New Video

1. Create a new `.md` file in the appropriate pillar directory
2. Use the slug as the filename (e.g., `my-video-title.md`)
3. Add frontmatter with required fields:

```yaml
---
title: "Video Title"
date: "YYYY-MM-DD"
youtubeId: "YouTube_Video_ID"
duration: "MM:SS"
tags:
  - "Tag 1"
  - "Tag 2"
featured: false  # Set to true for featured content
excerpt: "Brief description (1-2 sentences)"
relatedEpisodes:  # Optional: link to newsletter episodes
  - "episode-1"
  - "episode-5"
relatedResearch:  # Optional: link to research domains
  - "ai-accountability"
  - "esg"
---

## Video content goes here

Write your summary, key insights, and analysis in markdown format.
```

## Finding Your YouTube Video ID

The video ID is the part after `v=` in the YouTube URL:
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ`

## Tips

- **Featured videos** appear in a special section on the pillar page
- **Tags** should match the themes described on each pillar page
- **Related content** creates cross-links to newsletter episodes and research domains
- Keep excerpts concise—they appear on card previews
- Use markdown headings (##, ###) to structure your content
- Add blockquotes for key quotes from the video
- Include timestamps in your content when referencing specific moments

## Example

See `sociology-synthetic-minds/ai-village-digital-frustration.md` for a complete example.
