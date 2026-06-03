# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**khayali** (khayali.xyz) is a Next.js TypeScript site: the creative, bohemian home of Liezl Coetzee's work. *Khayali* means "of the imagination." It centres on **Khayali Tunes** (AI-built music, each arc carrying its own argument), collaborative writing, long consciousness dialogues with the machines, and interactive visual experiments. The arty side of the multivariate.

The professional AI-governance practice (the **Sociable Systems** newsletter, ESG and accountability research) grew up here and then moved to its own home at **sociable.systems** (a separate repo). khayali links out to it but no longer hosts it. Remaining SS residue here is being removed; see `.claude/SS-RESIDUE-CLEANUP-PLAN.md` and `.claude/KHAYALI-RECLAIM-STATUS.md`.

**Content focus**:
1. **Primary**: Khayali Tunes / music (`/music`, `tunes/`) — the rising centre.
2. **Creative**: writings, creative works, world workshop, soulspaces.
3. **Consciousness play**: chats and dialogues, the Observatory's visualisations, experimental labs.

## Development Commands

- `npm run dev` - Start Next.js development server on http://localhost:3000
- `npm run build` - Create production build (includes TypeScript compilation)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm install` - Install dependencies

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with React 18
- **Styling**: Tailwind CSS with custom animations
- **Content**: Markdown files with gray-matter frontmatter parsing
- **Animation**: Framer Motion for interactive elements
- **Icons**: Lucide React

### Project Structure
```
khayali-xyz/
├── src/app/                      # Next.js App Router pages
│   ├── layout.tsx               # Root layout with professional navigation
│   ├── page.tsx                 # Homepage - Sociable Systems focus
│   ├── sociablesystems/         # Newsletter hub and episodes
│   ├── methods/                 # Research methodology page
│   ├── research/                # Applied research projects
│   │   ├── esg/                # ESG & AI governance
│   │   ├── grievance/          # Grievance mechanisms
│   │   ├── development-rights/ # Resettlement & land acquisition
│   │   ├── ai-accountability/  # AI safety & accountability
│   │   └── worker-voice/       # Labor systems
│   ├── labs/                    # Experimental research overview
│   ├── observatory/             # Cosmic visualizations (experimental)
│   ├── protocol/                # Research documentation (experimental)
│   ├── ai-arena/                # Multi-model experiments
│   └── writings/                # Creative works
├── sociablesystems/             # Newsletter content (markdown)
├── content/                     # Other markdown content
├── public/images/               # Static image assets
├── src/components/              # Reusable React components
└── src/utils/                   # Utility functions
```

### Key Components

#### Content Management (`src/utils/content.ts`)
- Dynamic markdown file loading with frontmatter support
- Category-based content organization
- Automatic title extraction and excerpt generation
- File system-based content discovery

#### Image Management (`src/utils/imageManager.ts`)
- Curated image collections for different contexts
- Cosmic images for digital themes (used sparingly now)
- Professional imagery for research content
- Context-aware image selection

### Content Categories

**Professional Content** (Priority):
- **sociablesystems**: Newsletter episodes on AI accountability
- **esg**: ESG & AI governance research
- **grievance**: Operational grievance mechanisms
- **development-rights**: Resettlement and land acquisition
- **ai-accountability**: Pre-action constraints, liability architecture
- **worker-voice**: Labor management systems

**Experimental Content** (Secondary):
- **observatory**: Interactive visualizations
- **protocol**: Research methodology documentation
- **ai-arena**: Multi-model experiments
- **writings**: Creative collaboration

## Design System

### Theme Architecture
Professional dark theme with strategic use of color:
- **Primary Colors**: Teal/blue gradients for professional content
- **Accent Colors**: Purple/pink for experimental content
- **Typography**: Bold gradients for headings, clean sans-serif for body
- **Layout**: Card-based with professional hover effects
- **Imagery**: Minimal, purposeful, context-appropriate

### Responsive Design
- Mobile-first Tailwind approach
- Grid layouts that adapt from single column to multi-column
- Professional, accessible navigation

### Animation System
- Subtle transitions and hover effects
- No floating animations on professional pages
- Gradient text for section headings
- Card hover states

## Content Management

### Newsletter Episodes
Sociable Systems newsletter content lives in `sociablesystems/` directory:
```yaml
---
title: "Episode Title"
date: "2025-01-XX"
episode: X
tags: ["tag1", "tag2"]
excerpt: "Brief description"
---
```

### Research Content
Research projects documented in markdown with clear methodology:
```yaml
---
title: "Research Project Title"
category: "esg" | "grievance" | "development-rights" | etc
date: "2025-01-XX"
status: "active" | "completed" | "ongoing"
---
```

## Special Features

### Two-Track Research Methodology
The site emphasizes a unique research approach:
1. **Field Research**: 20+ years in extractive industries, ESG, development finance
2. **AI-Augmented Analysis**: Multi-model experiments, pattern recognition, structured dialogues

### Content Hierarchy
- **Homepage**: Leads with Sociable Systems newsletter and professional research
- **Newsletter Hub**: Episodic content organized by cycles (Asimov, Clarke, Kubrick, etc)
- **Research Pages**: Deep dives into specific professional domains
- **Methods Page**: Explains the two-track research approach
- **Labs Section**: Houses experimental work as "how we discover new questions"

### Professional Positioning
The consciousness exploration and experimental methods are framed as:
- **Methodology** rather than primary content
- **Differentiator** rather than headline
- **Research tools** that inform professional insights
- **Labs** where breakthrough questions emerge

## Navigation Structure

**Primary Navigation**:
- Home → Professional focus page
- Newsletter → Sociable Systems hub
- Research → Dropdown with all professional research areas
- Methods → Research methodology explanation
- Labs → Experimental work (smaller emphasis)

**Footer**: Publications, video channels, audio/social, contact

## TypeScript Configuration

- Strict mode disabled for flexibility in content loading
- Path mapping with `@/*` pointing to `src/*`
- App Router types included
- JSX preserve mode for Next.js processing

## Deployment Notes

- Built for Vercel deployment
- SEO optimized for professional audience
- Meta tags emphasize AI accountability, ESG, governance
- Image optimization for performance
- Newsletter subscription links to LinkedIn

## Key Files to Understand

- `src/app/layout.tsx`: Professional navigation structure
- `src/app/page.tsx`: Homepage leading with Sociable Systems
- `src/app/sociablesystems/page.tsx`: Newsletter hub
- `src/app/methods/page.tsx`: Research methodology explanation
- `src/app/labs/page.tsx`: Experimental work overview
- `src/utils/content.ts`: Content management and markdown processing
- `sociablesystems/`: Newsletter episode content

## Content Development Priorities

When adding new content or features:

1. **First Priority**: Newsletter episodes, ESG research, grievance systems, accountability frameworks
2. **Second Priority**: Research methodology documentation, multi-model experiments
3. **Third Priority**: Experimental labs, creative works, consciousness exploration

The site serves a professional audience interested in AI governance and operational reality. The experimental methods are valuable as differentiation and methodology, not as entertainment.
