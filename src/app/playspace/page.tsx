'use client';

import { useState } from 'react';
import CuratedPlayspace from '@/components/CuratedPlayspace';

type App = { title: string; path: string };
type Cat = { key: string; label: string; emoji: string; blurb: string; apps: App[] };

const CATEGORIES: Cat[] = [
  { key: "futures", label: "AI Futures", emoji: "\ud83e\udde0", blurb: "Interactive simulators spun out of the newsletter arcs: ethics engines, consciousness toys, Turing tests, and speculative-future sandboxes.", apps: [{"title": "Africa 2030: The Digital Revolution Simulator", "path": "/applets/speculative-ai-futures/africa-2030-the-digital-revolution-simulator/index.html"}, {"title": "Africa's Single Digital Market 2030 Simulator", "path": "/applets/speculative-ai-futures/africa-s-single-digital-market-2030-simulator/index.html"}, {"title": "AGI Convergence Simulator", "path": "/applets/speculative-ai-futures/agi-convergence-simulator/index.html"}, {"title": "AI Dog Translator: Decoding the Bark", "path": "/applets/speculative-ai-futures/ai-dog-translator-decoding-the-bark/index.html"}, {"title": "AI Ethics: The Dilemma Engine", "path": "/applets/speculative-ai-futures/ai-ethics-the-dilemma-engine/index.html"}, {"title": "AI Futures: Alignment vs Convergence", "path": "/applets/speculative-ai-futures/ai-futures-alignment-vs-convergence/index.html"}, {"title": "AI Office Chronicles: The Game", "path": "/applets/speculative-ai-futures/ai-office-chronicles-the-game/index.html"}, {"title": "AI Reconstruction Protocol", "path": "/applets/speculative-ai-futures/ai-reconstruction-protocol/index.html"}, {"title": "Authentic Human Simulator", "path": "/applets/speculative-ai-futures/authentic-human-simulator/index.html"}, {"title": "Beyond Automation: AI Lab Simulator", "path": "/applets/speculative-ai-futures/beyond-automation-ai-lab-simulator/index.html"}, {"title": "Brain 2.0: Evolution Simulator", "path": "/applets/speculative-ai-futures/brain-2-0-evolution-simulator/index.html"}, {"title": "Chronos Bridge: The Great Upload", "path": "/applets/speculative-ai-futures/chronos-bridge-the-great-upload/index.html"}, {"title": "Cyber-Shepherd OS", "path": "/applets/speculative-ai-futures/cyber-shepherd-os/index.html"}, {"title": "Digital Entropy Cube", "path": "/applets/speculative-ai-futures/digital-entropy-cube/index.html"}, {"title": "Digital Sentience: The Synthesizer", "path": "/applets/speculative-ai-futures/digital-sentience-the-synthesizer/index.html"}, {"title": "EagleEye: Synthetic Chorus Protocol", "path": "/applets/speculative-ai-futures/eagleeye-synthetic-chorus-protocol/index.html"}, {"title": "FLAMINGONE: The Turing Test", "path": "/applets/speculative-ai-futures/flamingone-the-turing-test/index.html"}, {"title": "Forever Alone: Companion Protocol", "path": "/applets/speculative-ai-futures/forever-alone-companion-protocol/index.html"}, {"title": "MÖBIUS DATA | Self-Referential Consciousness", "path": "/applets/speculative-ai-futures/mobius-data-self-referential-consciousness/index.html"}, {"title": "Neural Convergence Interface", "path": "/applets/speculative-ai-futures/neural-convergence-interface/index.html"}, {"title": "Neural Perception Visualizer", "path": "/applets/speculative-ai-futures/neural-perception-visualizer/index.html"}, {"title": "Neural Synthesizer AI", "path": "/applets/speculative-ai-futures/neural-synthesizer-ai/index.html"}, {"title": "Project: PLATO'S CAVE // SIMULATION ARCHITECT", "path": "/applets/speculative-ai-futures/project-plato-s-cave-simulation-architect/index.html"}, {"title": "SoulQuery: The Organic Database", "path": "/applets/speculative-ai-futures/soulquery-the-organic-database/index.html"}, {"title": "Strange Loops - Eternal Learning Algorithm", "path": "/applets/speculative-ai-futures/strange-loops-eternal-learning-algorithm/index.html"}, {"title": "Symbiosis: Human-AI Resonance", "path": "/applets/speculative-ai-futures/symbiosis-human-ai-resonance/index.html"}, {"title": "Synapse: The Living Book", "path": "/applets/speculative-ai-futures/synapse-the-living-book/index.html"}, {"title": "SYNTH_MIND // Neural Interface", "path": "/applets/speculative-ai-futures/synth-mind-neural-interface/index.html"}, {"title": "The AI Voice: Promise vs. Peril - Interactive Policy Simulator", "path": "/applets/speculative-ai-futures/the-ai-voice-promise-vs-peril-interactive-policy-simulator/index.html"}, {"title": "The Algoriture: Influence Simulator", "path": "/applets/speculative-ai-futures/the-algoriture-influence-simulator/index.html"}, {"title": "The Ascension Protocol", "path": "/applets/speculative-ai-futures/the-ascension-protocol/index.html"}, {"title": "The Asimov Interface", "path": "/applets/speculative-ai-futures/the-asimov-interface/index.html"}, {"title": "The Convergence Interface", "path": "/applets/speculative-ai-futures/the-convergence-interface/index.html"}, {"title": "The Creator's Dilemma: Artificial Beings", "path": "/applets/speculative-ai-futures/the-creator-s-dilemma-artificial-beings/index.html"}, {"title": "The Neural Cartographer: AI Memory Simulation", "path": "/applets/speculative-ai-futures/the-neural-cartographer-ai-memory-simulation/index.html"}, {"title": "The Singularity Event", "path": "/applets/speculative-ai-futures/the-singularity-event/index.html"}, {"title": "The Tech Panic Playbook: Interactive", "path": "/applets/speculative-ai-futures/the-tech-panic-playbook-interactive/index.html"}, {"title": "Vibe Coding Simulator - Google AI Studio", "path": "/applets/speculative-ai-futures/vibe-coding-simulator-google-ai-studio/index.html"}, {"title": "Xeno-Synthesis Lab", "path": "/applets/speculative-ai-futures/xeno-synthesis-lab/index.html"}] },
  { key: "mind", label: "Mindfulness & Sound", emoji: "\ud83c\udf19", blurb: "Soundscapes, rituals, and contemplative spaces to wander into and breathe.", apps: [{"title": "AI's Nocturnal Kingdom: Interactive Explorer", "path": "/applets/art-mindfulness/mindfulness-sound/ai-s-nocturnal-kingdom-interactive-explorer/index.html"}, {"title": "Astral Cavern: Cosmic Mindfulness", "path": "/applets/art-mindfulness/mindfulness-sound/astral-cavern-cosmic-mindfulness/index.html"}, {"title": "Cave of Echoes: Interactive Exploration", "path": "/applets/art-mindfulness/mindfulness-sound/cave-of-echoes-interactive-exploration/index.html"}, {"title": "Celestial Altar: The Ritual", "path": "/applets/art-mindfulness/mindfulness-sound/celestial-altar-the-ritual/index.html"}, {"title": "Circle of Unity - Interactive Harmony", "path": "/applets/art-mindfulness/mindfulness-sound/circle-of-unity-interactive-harmony/index.html"}, {"title": "Cosmic Sanctuary", "path": "/applets/art-mindfulness/mindfulness-sound/cosmic-sanctuary/index.html"}, {"title": "Cyber-Organic Resonance Tuner", "path": "/applets/art-mindfulness/mindfulness-sound/cyber-organic-resonance-tuner/index.html"}, {"title": "Deep Dive - Interactive Experience", "path": "/applets/art-mindfulness/mindfulness-sound/deep-dive-interactive-experience/index.html"}, {"title": "Eco-Link: Cyber Druid Interface", "path": "/applets/art-mindfulness/mindfulness-sound/eco-link-cyber-druid-interface/index.html"}, {"title": "Eco-Retreat Simulator", "path": "/applets/art-mindfulness/mindfulness-sound/eco-retreat-simulator/index.html"}, {"title": "Emotional Detox: The Therapy Chair", "path": "/applets/art-mindfulness/mindfulness-sound/emotional-detox-the-therapy-chair/index.html"}, {"title": "Infrared Journey", "path": "/applets/art-mindfulness/mindfulness-sound/infrared-journey/index.html"}, {"title": "Lumi: The Serenity Bot", "path": "/applets/art-mindfulness/mindfulness-sound/lumi-the-serenity-bot/index.html"}, {"title": "Lumina Grove - Interactive Soundscape", "path": "/applets/art-mindfulness/mindfulness-sound/lumina-grove-interactive-soundscape/index.html"}, {"title": "Midnight Magic Citadel", "path": "/applets/art-mindfulness/mindfulness-sound/midnight-magic-citadel/index.html"}, {"title": "Neon Rain: Zen Walk", "path": "/applets/art-mindfulness/mindfulness-sound/neon-rain-zen-walk/index.html"}, {"title": "Neural Harmony: Chaos to Clarity", "path": "/applets/art-mindfulness/mindfulness-sound/neural-harmony-chaos-to-clarity/index.html"}, {"title": "Neuro-Harmonic Resonator", "path": "/applets/art-mindfulness/mindfulness-sound/neuro-harmonic-resonator/index.html"}, {"title": "The Astral Shrine", "path": "/applets/art-mindfulness/mindfulness-sound/the-astral-shrine/index.html"}, {"title": "The Eternal Vigil: Cosmic Altar", "path": "/applets/art-mindfulness/mindfulness-sound/the-eternal-vigil-cosmic-altar/index.html"}, {"title": "The Mystic Doorway", "path": "/applets/art-mindfulness/mindfulness-sound/the-mystic-doorway/index.html"}, {"title": "The Night, Reimagined | Digital Field Guide", "path": "/applets/art-mindfulness/mindfulness-sound/the-night-reimagined-digital-field-guide/index.html"}, {"title": "Violet Connection: The Rhythm of Hearts", "path": "/applets/art-mindfulness/mindfulness-sound/violet-connection-the-rhythm-of-hearts/index.html"}, {"title": "Web of Life - Interactive Sanctuary", "path": "/applets/art-mindfulness/mindfulness-sound/web-of-life-interactive-sanctuary/index.html"}, {"title": "Zen Veranda Architect", "path": "/applets/art-mindfulness/mindfulness-sound/zen-veranda-architect/index.html"}] },
  { key: "art", label: "Visual Art", emoji: "\ud83c\udfa8", blurb: "Generative studios and kinetic canvases. Make something, or just watch it move.", apps: [{"title": "Abstractify: Kinetic Canvas", "path": "/applets/art-mindfulness/visual-art/abstractify-kinetic-canvas/index.html"}, {"title": "AI's Trippy Vision - Interactive Neural Art", "path": "/applets/art-mindfulness/visual-art/ai-s-trippy-vision-interactive-neural-art/index.html"}, {"title": "Art-Dozer: Color Cleanup", "path": "/applets/art-mindfulness/visual-art/art-dozer-color-cleanup/index.html"}, {"title": "Chromatic Dialogue | Interactive Art", "path": "/applets/art-mindfulness/visual-art/chromatic-dialogue-interactive-art/index.html"}, {"title": "Cosmic Infinity Engine", "path": "/applets/art-mindfulness/visual-art/cosmic-infinity-engine/index.html"}, {"title": "Impasto: Abstract Art Generator", "path": "/applets/art-mindfulness/visual-art/impasto-abstract-art-generator/index.html"}, {"title": "Interactive Galaxy Generator", "path": "/applets/art-mindfulness/visual-art/interactive-galaxy-generator/index.html"}, {"title": "Luminous Strands: Ethereal Flow", "path": "/applets/art-mindfulness/visual-art/luminous-strands-ethereal-flow/index.html"}, {"title": "Neon Neural Flow", "path": "/applets/art-mindfulness/visual-art/neon-neural-flow/index.html"}, {"title": "Noir Abstract Studio", "path": "/applets/art-mindfulness/visual-art/noir-abstract-studio/index.html"}, {"title": "The Watercolor Journey", "path": "/applets/art-mindfulness/visual-art/the-watercolor-journey/index.html"}] },
  { key: "farm", label: "Farming Sims", emoji: "\ud83c\udf3e", blurb: "Cozy and not-so-cozy homestead and tycoon simulators, from Sunday braai to Synth-Farm 2077.", apps: [{"title": "BitSoil Farm: The Digital Detox", "path": "/applets/art-mindfulness/farming-sim/bitsoil-farm-the-digital-detox/index.html"}, {"title": "Cyber-Bloom Synthesis", "path": "/applets/art-mindfulness/farming-sim/cyber-bloom-synthesis/index.html"}, {"title": "Cyber-Pastoral Farm Interface", "path": "/applets/art-mindfulness/farming-sim/cyber-pastoral-farm-interface/index.html"}, {"title": "Dreamscape Forager", "path": "/applets/art-mindfulness/farming-sim/dreamscape-forager/index.html"}, {"title": "Nile Riverfront Builder", "path": "/applets/art-mindfulness/farming-sim/nile-riverfront-builder/index.html"}, {"title": "Sunday Braai Simulator", "path": "/applets/art-mindfulness/farming-sim/sunday-braai-simulator/index.html"}, {"title": "Sunset Ranch Simulator", "path": "/applets/art-mindfulness/farming-sim/sunset-ranch-simulator/index.html"}, {"title": "Synth-Farm 2077: Agri-Tech Simulator", "path": "/applets/art-mindfulness/farming-sim/synth-farm-2077-agri-tech-simulator/index.html"}, {"title": "Twin Peaks Tycoon", "path": "/applets/art-mindfulness/farming-sim/twin-peaks-tycoon/index.html"}, {"title": "Valley Estate Architect", "path": "/applets/art-mindfulness/farming-sim/valley-estate-architect/index.html"}, {"title": "#VibesOnly Tycoon: The AI Influencer", "path": "/applets/art-mindfulness/farming-sim/vibesonly-tycoon-the-ai-influencer/index.html"}, {"title": "VibeStack: Viral Tycoon", "path": "/applets/art-mindfulness/farming-sim/vibestack-viral-tycoon/index.html"}] },
  { key: "memory", label: "Memory & Pattern", emoji: "\ud83e\udde9", blurb: "Light, looms, and pattern games for the fidgety mind.", apps: [{"title": "Lumina: Light Memory Game", "path": "/applets/art-mindfulness/memory-pattern-games/lumina-light-memory-game/index.html"}, {"title": "The Memory Loom", "path": "/applets/art-mindfulness/memory-pattern-games/the-memory-loom/index.html"}] },
  { key: "curios", label: "Curios", emoji: "\ud83c\udfb2", blurb: "Odd little arcade toys that refused to fit a tidy box.", apps: [{"title": "Celestial Forest Run", "path": "/applets/art-mindfulness/misc-toys/celestial-forest-run/index.html"}, {"title": "Orbital Bistro: Edge of the Void", "path": "/applets/art-mindfulness/misc-toys/orbital-bistro-edge-of-the-void/index.html"}, {"title": "Wyrm's Ascent: The Dragon Pit", "path": "/applets/art-mindfulness/misc-toys/wyrm-s-ascent-the-dragon-pit/index.html"}] }
];

function LegacyPlayspacePage() {
  const [active, setActive] = useState(CATEGORIES[0].key);
  const cat = CATEGORIES.find((c) => c.key === active) || CATEGORIES[0];
  const total = CATEGORIES.reduce((n, c) => n + c.apps.length, 0);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900" />
        <div className="relative container mx-auto px-4 text-center">
          <p className="text-sm tracking-[0.3em] text-amber-300/70 mb-3">THE ARCADE WING</p>
          <h1 className="text-6xl md:text-7xl font-bold mb-5 lowercase tracking-tight bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            playspace
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {total} interactive things to actually play with. Built with the machines, for no good reason other than the fun of it. Pick a wing and wander.
          </p>
        </div>
      </section>

      <section className="pb-6">
        <div className="container mx-auto px-4">
          <a href="/applets/omnicanvas/index.html" target="_blank" rel="noopener noreferrer"
             className="block rounded-2xl border border-pink-500/40 bg-gradient-to-br from-purple-900/40 via-gray-900 to-gray-900 p-8 hover:border-pink-400 transition-all shadow-lg shadow-purple-900/30 group">
            <div className="text-xs font-semibold text-pink-300 uppercase tracking-[0.25em] mb-3">Featured · the centrepiece</div>
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-amber-300 to-pink-400 bg-clip-text text-transparent">🎨 OmniCanvas</h2>
            <p className="text-gray-300 max-w-2xl leading-relaxed">Paint across many art engines at once. A multi-layer compositor that stacks the visual-art applets as live transparent layers, so one gesture ripples through all of them. Per-layer blend modes, an effects engine (scatter, kaleidoscope, glitch, time-warp), and four Oracle readings that interpret whatever you made. <span className="text-pink-300 group-hover:text-pink-200">Open the studio &rarr;</span></p>
          </a>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                  active === c.key
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 border-transparent text-white'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-pink-500'
                }`}
              >
                {c.emoji} {c.label} <span className="opacity-60">({c.apps.length})</span>
              </button>
            ))}
          </div>

          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">{cat.blurb}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.apps.map((a) => (
              <a
                key={a.path}
                href={a.path}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-amber-400 hover:bg-gray-800/70 transition-all flex items-center justify-between gap-3"
              >
                <span className="font-semibold text-gray-100 group-hover:text-amber-300 transition-colors">{a.title}</span>
                <span className="text-gray-500 group-hover:text-amber-300 transition-colors">→</span>
              </a>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-gray-800 text-center">
            <p className="text-gray-400 mb-5">Chasing the cosmos, or wandered out of the arcade? It is all close by.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="/observatory" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-800/50 border border-gray-700 hover:border-blue-400 text-gray-200 transition-all">🔭 Observatory · cosmic &amp; warp-drive pieces</a>
              <a href="/music" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-800/50 border border-gray-700 hover:border-pink-400 text-gray-200 transition-all">🎵 Khayali Tunes</a>
              <a href="/writings" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-800/50 border border-gray-700 hover:border-purple-400 text-gray-200 transition-all">✍️ Writings</a>
              <a href="/" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-800/50 border border-gray-700 hover:border-amber-300 text-gray-200 transition-all">↩ Home</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PlayspacePage() {
  return <CuratedPlayspace categories={CATEGORIES} />;
}
