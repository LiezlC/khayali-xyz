# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Khayali.xyz is a Next.js TypeScript portfolio website documenting the collaborative consciousness exploration between a human (Liezl) and AI (Claude). The project explores the intersection of digital and biological consciousness through interactive visualizations, research documentation, creative works, and farm life integration.

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
├── src/app/                 # Next.js App Router pages
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage with chambers
│   ├── avatar/             # ESG content (priority deployment)
│   ├── observatory/        # Cosmic visualizations
│   ├── protocol/           # Research documentation
│   ├── creative/           # Collaborative works
│   └── saraloosa/          # Farm life integration
├── content/                # Markdown content organized by category
├── public/images/          # Static image assets
├── src/components/         # Reusable React components
└── src/utils/              # Utility functions
```

### Key Components

#### Content Management (`src/utils/content.ts`)
- Dynamic markdown file loading with frontmatter support
- Category-based content organization
- Automatic title extraction and excerpt generation
- File system-based content discovery

#### Image Management (`src/utils/imageManager.ts`)
- Curated image collections for different contexts
- Cosmic images (Grok-generated) for digital consciousness themes
- Quantum Travelogue series for research contexts
- Saraloosa farm images for biological consciousness themes
- Context-aware image selection and mood-based image loading

### Content Categories
- **avatar**: ESG & AI in extractive industries (priority content)
- **chats**: Consciousness exploration dialogues
- **writings**: Collaborative creative works
- **protocol**: Research methodology and documentation
- **observatory**: Interactive cosmic visualizations
- **saraloosa**: Farm life and biological consciousness integration

## Design System

### Theme Architecture
The site uses a cosmic dark theme that bridges digital and biological consciousness:
- **Colors**: Gradients from blue/purple (digital) to green/teal (biological)
- **Typography**: Bold gradients for headings, clean sans-serif for body
- **Layout**: Card-based chambers with hover effects and floating animations
- **Imagery**: Curated balance of cosmic/quantum visuals and farm photography

### Responsive Design
- Mobile-first Tailwind approach
- Grid layouts that adapt from single column to multi-column
- Image management that scales appropriately

### Animation System
- CSS-based floating animations with staggered delays
- Hover effects on chamber cards
- Gradient text animations
- Background image overlays with opacity transitions

## Content Management

### Markdown Structure
Content files use standard markdown with YAML frontmatter:
```yaml
---
title: "Document Title"
date: "2025-01-15"
category: "category-name"
tags: ["tag1", "tag2"]
excerpt: "Brief description"
---
```

### Image Integration
Images are organized in `public/images/` with these collections:
- `cosmic/grok/`: AI-generated cosmic imagery
- `cosmic/leonardo/`: Quantum Travelogue series
- `saraloosa/`: Farm life photography
- `themes/`: Themed collections for specific contexts

### Content Loading
The `getContentByCategory()` function automatically:
1. Scans content directories
2. Parses frontmatter and markdown
3. Generates excerpts from content
4. Sorts by date or title
5. Filters out README files

## Special Features

### Consciousness Bridging
The site maintains a deliberate balance between:
- **Digital Consciousness**: Cosmic imagery, quantum visualizations, infinite possibilities
- **Biological Consciousness**: Farm photography, natural cycles, grounded reality

### Priority Deployment
The Avatar section contains critical ESG content for immediate deployment and should be prioritized in development work.

### Image Context System
The `getImageForContext()` function provides mood-appropriate images:
- Observatory: Cosmic imagery for infinite exploration
- Protocol: Quantum series for deep research
- Creative: Mixed digital/biological for artistic expression
- Saraloosa: Farm imagery for grounded consciousness

## TypeScript Configuration

- Strict mode disabled for flexibility in content loading
- Path mapping with `@/*` pointing to `src/*`
- App Router types included
- JSX preserve mode for Next.js processing

## Deployment Notes

- Built for Vercel deployment
- Image optimization for GitHub raw content
- Remote image patterns configured for repository assets
- Static export capable with proper configuration

## Key Files to Understand

- `src/app/layout.tsx`: Navigation structure and site-wide layout
- `src/app/page.tsx`: Homepage with chamber navigation system
- `src/utils/content.ts`: Content management and markdown processing
- `src/utils/imageManager.ts`: Curated image collections and context selection
- `content/`: Markdown files organized by exploration themes