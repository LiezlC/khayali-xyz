# Khayali: visual immersion review

Reviewed live on October 24, 2026. Following approval, the implementation adds a layered music-led entrance, responsive Atlas room lighting and visit history, music arc environments with an embedded playlist, an on-demand art preview, and a redesigned writing library. The production build and browser interaction checks passed. The original review below records the starting state and longer-term possibilities.

## Recommended direction

Build a living imaginarium around the existing music and illustrated house. Keep Khayali Tunes prominent. Give the visitor an immediate sense of being inside a place with rooms to discover, then carry that place through the site.

The strongest visual language is already present in the Atlas house and the OmniCanvas portal artwork: warm illuminated interiors against deep night, with richly colored details. Use that language across the public sections. Retain the large serif typography. Let teal and turquoise carry more of the light, with amber around doors and selected objects.

Begin with layered illustrations that create depth as the pointer or page moves. Add one carefully scoped 3D scene after the visual system works on phones. A continuous 3D environment would require substantially more asset production and navigation work.

## Evidence from the live review

| Surface | Observed | Implication |
| --- | --- | --- |
| [Homepage](https://www.khayali.xyz/) | Evocative hooded DJ image, warm serif wordmark, static background and substantial centered copy. | Preserve the identity. Give the artwork more space and introduce depth around a stable, readable heading. |
| [Atlas](https://www.khayali.xyz/wander) | The illustrated house has working room selectors. Selecting Machine Garden updated its description and destination. Dark overlays dim the room panel along with the background. | Move interactive information above the decorative scrims. Increase the visibility of the selected room and doorway. |
| Atlas at phone width | House markers share space with the heading and navigation actions. The selected room panel is faint near the bottom of the hero. | Use a dedicated mobile composition with a separate room selector and readable panel below the illustration. |
| [Music](https://www.khayali.xyz/music) | The opening is largely text and platform buttons; Spotify follows below. Track artwork becomes prominent farther down. | Bring an immediate listening action and arc imagery into the opening. |
| [Playspace](https://www.khayali.xyz/playspace) | Strong portal art and an exhibition layout already establish a destination. Several previews use differing visual treatments and heavy darkening. | Make the works easier to see. Introduce a selective animated preview on focus or interaction. |
| [OmniCanvas](https://www.khayali.xyz/applets/omnicanvas/index.html) | A functioning layered visual artspace exposes multiple engines and compositing controls. The source uses seven iframe layers. | Adapt one suitable engine into a lightweight shared visual component. Measure it before putting it on a landing page. |
| [Observatory](https://www.khayali.xyz/observatory) | A constellation interface offers eight instruments, with a cohesive spatial metaphor. | Reuse its sense of discovery and clear return route elsewhere. The review inspected its entrance, not every instrument. |
| [Night Garden](https://www.khayali.xyz/playspace/night-garden) | The interface already presents a journey through 25 soundscapes, a sound control, and a visited-lantern counter. | Extend this existing continuity idea to the broader house. Persistence and audio behavior were not fully tested in this review. |
| [Writings](https://www.khayali.xyz/writings) | A large emoji and saturated gradient introduce a conventional card grid. Visible entries include filename-style titles such as `ai_therapy_complete_pack`, and Markdown syntax in excerpts. | Curate display titles and clean excerpts before animating this section. Bring it into the house visual language. |

## The changes with the best payoff

### 1. Give the entrance depth

Separate the DJ artwork into foreground and background layers. Allow a small pointer-driven change in perspective, with slower movement in distant foliage or lights. Keep the heading and buttons steady. Use a quiet light treatment around the mixing desk, and make the music action immediately available.

This produces a dimensional appearance through layered artwork and CSS transforms. It does not require a fully modeled human or room. New layers would need clean asset separation or a matching image-generation pass; shifting the existing flat image alone cannot reveal hidden geometry.

Effort: medium. Visual payoff: high.

### 2. Make the Atlas house visibly respond

Illuminate a room when it receives keyboard focus, hover, or a tap. Animate its connecting path and bring its description into a high-contrast foreground panel. On entry, briefly expand the selected doorway before navigation. Keep the movement short and let the destination appear promptly.

On phones, place a readable room list below the house image. Selecting a room should highlight its position without requiring visitors to hit a tiny hotspot behind text. Keep direct links available throughout.

Effort: small for the layering and layout repair; medium for room lighting and transitions. Priority: first.

### 3. Turn the music arcs into visual environments

Give each arc a distinctive scene with its own artwork and controlled movement. D.I. could carry rainy Cape Town reflections. DataDragons could reveal a coiling signal form. War Arc could use a restrained tactical-grid treatment.

Selecting an arc changes the environment and exposes its listening action. Larger cover art can tilt slightly in perspective, while the title stays readable. A compact player can stay mounted during supported site navigation when the visitor starts playback.

For genuine beat-reactive visuals, use audio hosted under your control and feed its waveform or frequencies into Web Audio. Keep the platform embeds as separate listening options. Confirm which master files are available before promising synchronized playback.

Effort: medium to large, depending on audio availability. Priority: second, after the entrance and Atlas layout.

### 4. Put a live glimpse of Playspace in the main journey

Offer one short, interactive preview: a chromatic field the visitor can disturb, or a portal whose surface bends toward the pointer. A tap opens the full work. Give selected exhibition entries a consistent preview treatment, with a static poster as the immediate first render.

Do not load the full OmniCanvas compositor as a background. Its seven iframe layers make it a poor default starting point for a landing-page decoration. Extract or rebuild one effect, then measure its actual cost.

Effort: medium. Visual payoff: high when used sparingly.

### 5. Carry the visitor through the house

Extend the Night Garden’s visited-lantern idea to the Atlas. A returning visitor can see previously explored rooms and resume a trail. Keep a small “back to the house” route in immersive works. A consistent doorway transition and retained selection can connect otherwise different applets.

An optional sound control could establish a room’s atmosphere after an explicit click. Provide a clear mute control and prevent overlapping soundtracks when moving between rooms.

Effort: medium. This adds continuity to the experience.

### 6. Give Writings the character of a library

Lead with a curated illustrated work and readable editorial titles. Follow with an open shelf or index layout that shows the range of the collection. A selected cover can lift slightly in perspective; an excerpt can emerge from its associated illustration. Reading pages should settle into calm typography.

Effort: small to medium. Fix the title and excerpt pipeline before adding motion.

## How the available skills fit

| Capability | Best application here |
| --- | --- |
| Frontend App Builder | Create coordinated desktop and phone concepts, then implement the chosen visual system in the existing Next.js project. |
| Image generation | Produce matching foreground cutouts, room lighting layers, and arc artwork. Keep navigation and readable interface text as real HTML. |
| Frontend testing and React performance review | Verify touch interactions, keyboard paths, loading behavior, and animation cost in the rendered site. |
| HyperFrames, if a filmed loop is chosen later | Author a short, deterministic atmospheric loop with a poster fallback. Use live browser graphics for scenes that must respond directly to the visitor. |

The project already includes Framer Motion. Start with the existing motion stack for transforms and state transitions. Current [Motion documentation](https://motion.dev/docs/scroll) describes scroll-linked animation and parallax; check API compatibility with the installed version before implementation.

For a genuinely modeled scene, [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) integrates Three.js with React. Its documentation pairs Fiber 8 with React 18, which is the React major declared by this project. Select compatible versions rather than installing an unqualified latest release.

The [Web Audio visualization guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API) explains extracting frequency and waveform data for real audio response. Spotify exposes an [embed controller API](https://developer.spotify.com/documentation/embeds/references/iframe-api); treat its supported playback integration separately from a custom audio analysis pipeline.

## First implementation scope

1. Establish the visual concept with desktop and mobile views of the entrance and Atlas.
2. Repair Atlas layering and phone navigation, then add room lighting and one doorway transition.
3. Add layered depth to the music-led homepage entrance.
4. Clean Writings titles and excerpts so the visual system has readable content to work with.

Evaluate that complete pass before commissioning a modeled 3D house. The next substantial addition should be the music arc environments.

## Experience constraints

Keep normal scrolling and direct links. Show artwork immediately while heavier scenes load. Respect reduced-motion preferences, provide a motion pause control, and use still images on constrained devices. Pause rendering when a scene is out of view or the tab is hidden. The [Three.js responsive rendering guide](https://threejs.org/manual/pages/responsive.html) explains the GPU cost of render resolution.

Verify desktop and phone compositions with real artwork loaded. Exercise the primary listening action and every redesigned room selector. A silent screenshot proves appearance; it cannot establish audio synchronization or continuous playback.

## Review boundary

This was a visual and interaction review of the listed live entrances, supported by targeted source inspection. It was not a complete route audit, accessibility certification, or performance benchmark. The repository contained pre-existing changes in UtopAI and several assets; those were left untouched.
