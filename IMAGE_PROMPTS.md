# Visual Enhancement Image Prompts

Strategic image prompts organized by priority and location. Generate these images and place them in the specified directories.

---

## **PRIORITY 1: Homepage Hero Images**
*Location: `/public/images/homepage/`*

### 1. Homepage Hero Background
**Filename**: `hero-ai-accountability.jpg` or `.png`
**Prompt**:
```
A dark, professional abstract visualization of AI governance and accountability. Deep blue and teal gradients with subtle geometric patterns suggesting infrastructure and systems. Circuit-like lines connecting nodes representing decision points. Sophisticated, serious tone. Professional photography style, wide aspect ratio. Dark theme with glowing highlights in blue/teal/purple.
```
**Purpose**: Replace or enhance current homepage hero background
**Dimensions**: 1920x1080 minimum

### 2. AI Safety Dashboard Hero
**Filename**: `dashboard-hero.jpg`
**Prompt**:
```
Abstract data visualization showing tracking and monitoring systems. Dark background with purple and pink gradient accents. Floating transparent panels with graphs and metrics. Holographic UI elements. Professional tech aesthetic. Wide screen format. Emphasis on pattern detection and analysis.
```
**Purpose**: Featured section background for Sociable Systems Dashboard
**Dimensions**: 1600x900

---

## **PRIORITY 2: Domain Page Headers**
*Location: `/public/images/domains/`*

### 3. ESG & Safeguards
**Filename**: `esg-header.jpg`
**Prompt**:
```
Industrial site with AI monitoring overlay. Mining or construction environment with digital safety systems visualization. Green/blue sustainability tones mixed with industrial reality. Aerial perspective. Photorealistic industrial scene with subtle tech overlay showing environmental monitoring points.
```

### 4. Grievance Systems
**Filename**: `grievance-header.jpg`
**Prompt**:
```
Workers in an industrial or manufacturing setting, depicted respectfully and professionally. Multi-ethnic workers, focus on human dignity and voice. Subtle overlay of communication channels and reporting systems. Warm human tones contrasted with professional blue/teal digital elements. Photorealistic, editorial style.
```

### 5. Development Rights (Resettlement)
**Filename**: `development-rights-header.jpg`
**Prompt**:
```
Community landscape showing infrastructure development context. Balance between development and human impact. Aerial or elevated view showing land, settlements, and development projects. Warm earth tones with blue/grey infrastructure. Documentary photography style, respectful depiction of affected communities.
```

---

## **PRIORITY 3: Sociable Systems Newsletter Visuals**
*Location: `/public/images/sociablesystems/`*

### 6. Pre-Action Constraints Concept
**Filename**: `pre-action-constraints.jpg`
**Prompt**:
```
Abstract mechanical safety interlock system. Industrial emergency stop mechanism meets digital circuit design. Red stop/hold elements contrasted with blue system-running elements. Close-up mechanical detail showing physical constraint mechanisms. Professional industrial photography meets abstract tech visualization.
```
**Use**: Episode 1 header, Calvin Convention content

### 7. Liability Architecture
**Filename**: `liability-architecture.jpg`
**Prompt**:
```
Multi-layered organizational structure with human figure in center/bottom holding weight. Corporate hierarchy visualization with accountability flowing downward. Dark professional tones with highlighted pressure points. Abstract/conceptual business illustration. Person depicted as silhouette carrying organizational burden.
```
**Use**: Episode 2 header, HITL content

### 8. Watchdog Paradox
**Filename**: `watchdog-paradox.jpg`
**Prompt**:
```
Circular or recursive system visualization. Oversight mechanism that curves back on itself. Möbius strip aesthetic. Teal and grey tones. Abstract representation of regulatory capture or circular accountability. Professional infographic style with 3D elements.
```
**Use**: Episode 4 content

### 9. Youth Mental Health Data Viz
**Filename**: `youth-data-viz.jpg`
**Prompt**:
```
Abstract data visualization showing diverging trend lines and intervention points. Graph-like elements showing youth statistics with intervention markers. Dark background, teal/blue data lines, orange/red alert markers. Professional data journalism aesthetic. No identifiable people, focus on abstract data representation.
```
**Use**: Tracking Framework dashboard support

---

## **PRIORITY 4: Concept Illustrations**
*Location: `/public/images/concepts/`*

### 10. AI Governance Gap
**Filename**: `governance-gap.jpg`
**Prompt**:
```
Visual metaphor for disconnect between AI development speed and governance capacity. Two layers or timelines moving at different velocities. Fast-moving tech layer (blues, circuits, rapid motion blur) above slow-moving institutional layer (greys, traditional architecture, static). Side-by-side or layered comparison.
```

### 11. Algorithmic Opacity
**Filename**: `algorithmic-opacity.jpg`
**Prompt**:
```
Black box with complex internal mechanisms barely visible. Translucent or x-ray view showing impossible-to-understand complexity inside. Clarke's Law aesthetic - sufficiently advanced technology looking like magic. Dark mysterious tones with glowing internals. Professional tech illustration.
```

### 12. Industrial Safety Parallel
**Filename**: `industrial-safety.jpg`
**Prompt**:
```
Split image showing traditional industrial safety system (physical emergency stop, safety rails, warning signs) paralleled with digital/AI system safety architecture. Left side: tangible industrial safety. Right side: digital equivalent. Color coding showing matching safety principles across domains.
```

---

## **PRIORITY 5: Background Textures & Patterns**
*Location: `/public/images/patterns/`*

### 13. Subtle Tech Grid
**Filename**: `tech-grid-subtle.png`
**Prompt**:
```
Subtle repeating pattern of circuit board traces, very low opacity. Dark navy/black background with faint blue-grey lines. Tileable pattern. Abstract tech aesthetic suitable for page backgrounds. Minimal, professional, not distracting.
```
**Format**: PNG with transparency

### 14. Data Flow Pattern
**Filename**: `data-flow-pattern.png`
**Prompt**:
```
Abstract flowing data streams, particle-like dots moving in coordinated patterns. Dark background, teal/blue glowing particles. Suggests information flow and analysis. Subtle enough for background use. Tileable or very wide format.
```
**Format**: PNG with transparency

---

## **PRIORITY 6: Section Dividers & Accents**
*Location: `/public/images/accents/`*

### 15. Section Break - Accountability
**Filename**: `divider-accountability.svg` or `.png`
**Prompt**:
```
Horizontal divider graphic with accountability theme. Geometric shapes suggesting balance scales or decision points. Teal/blue color scheme. Clean, modern, professional. SVG-style flat design. Width: 1200px, Height: 80px.
```

### 16. Icon Set - Domains (5 icons)
**Filenames**: `icon-esg.svg`, `icon-grievance.svg`, `icon-development.svg`, `icon-worker.svg`, `icon-accountability.svg`
**Prompt** (adapt for each):
```
Minimal line-art icon representing [DOMAIN]. Single color (teal/blue), transparent background. Clean geometric style. Professional, not playful. 256x256px. SVG-style vector aesthetic.
```

---

## **Implementation Notes**

### Where to Place Generated Images:
```
public/
├── images/
    ├── homepage/          # Priority 1 images
    ├── domains/           # Priority 2 images
    ├── sociablesystems/   # Priority 3 images
    ├── concepts/          # Priority 4 images
    ├── patterns/          # Priority 5 images
    └── accents/           # Priority 6 images
```

### File Format Recommendations:
- **Photos/Complex Images**: JPG (optimized, ~200KB)
- **Graphics with Transparency**: PNG
- **Icons/Simple Graphics**: SVG preferred, PNG acceptable
- **Background Patterns**: PNG with transparency

### Dimensions Guide:
- **Hero backgrounds**: 1920x1080 or wider
- **Section headers**: 1600x900
- **Cards/Thumbnails**: 800x600
- **Icons**: 256x256 or 512x512
- **Patterns**: Tileable or 2400x1600

### Style Consistency:
- **Color Palette**: Dark backgrounds, teal/blue/purple accents
- **Tone**: Professional, serious, documentary-style
- **Avoid**: Overly corporate stock photos, cartoon styles, bright colors
- **Prefer**: Abstract concepts, industrial reality, respectful human depiction

---

## **Quick Start Priority**

Start with these 5 images for maximum visual impact:

1. **Homepage Hero Background** (`homepage/hero-ai-accountability.jpg`)
2. **Dashboard Hero** (`homepage/dashboard-hero.jpg`)
3. **Pre-Action Constraints** (`sociablesystems/pre-action-constraints.jpg`)
4. **Liability Architecture** (`sociablesystems/liability-architecture.jpg`)
5. **Subtle Tech Grid Pattern** (`patterns/tech-grid-subtle.png`)

These will transform the most visible pages immediately. Remaining images can be added progressively.

---

## **After Generating Images**

Once you have images in the directories, I'll:
1. Update homepage hero section with new background
2. Add headers to domain pages
3. Integrate newsletter episode images
4. Add background patterns throughout
5. Optimize image loading and responsive sizing
