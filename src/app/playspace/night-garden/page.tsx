'use client'

import { useEffect, useRef, useState } from 'react'

// The Night Garden — a composite walk through the Mindfulness & Sound wing.
// One continuous path; each soundscape applet is a clearing along it.
// Lanterns light up as rooms are visited (shared "khayali:visited" trail
// written by wing-adapter.js inside each applet).

type Clearing = { slug: string; title: string; note: string }

const BASE = '/applets/art-mindfulness/mindfulness-sound'

const CLEARINGS: Clearing[] = [
  { slug: 'the-mystic-doorway', title: 'The Mystic Doorway', note: 'Every garden needs a gate. This one asks a question as you pass.' },
  { slug: 'neon-rain-zen-walk', title: 'Neon Rain', note: 'A city remembers in reflections. Walk slowly; the rain keeps time.' },
  { slug: 'lumina-grove-interactive-soundscape', title: 'Lumina Grove', note: 'Trees that hum when you touch them. The grove learns your chord.' },
  { slug: 'astral-cavern-cosmic-mindfulness', title: 'Astral Cavern', note: 'Underground, the sky is closer. Sit with the slow stalactite bells.' },
  { slug: 'cave-of-echoes-interactive-exploration', title: 'Cave of Echoes', note: 'Say something. The cave answers in a voice almost yours.' },
  { slug: 'deep-dive-interactive-experience', title: 'Deep Dive', note: 'The pond at the garden’s centre is deeper than the garden.' },
  { slug: 'cosmic-sanctuary', title: 'Cosmic Sanctuary', note: 'A bench under borrowed stars. Nothing is required of you here.' },
  { slug: 'the-astral-shrine', title: 'The Astral Shrine', note: 'Leave a thought at the shrine. Take a different one away.' },
  { slug: 'celestial-altar-the-ritual', title: 'Celestial Altar', note: 'The ritual is simple: attention, offered twice.' },
  { slug: 'the-eternal-vigil-cosmic-altar', title: 'The Eternal Vigil', note: 'Someone keeps the flame. Tonight it can be you.' },
  { slug: 'circle-of-unity-interactive-harmony', title: 'Circle of Unity', note: 'Voices in a ring. Add yours and hear the circle close.' },
  { slug: 'violet-connection-the-rhythm-of-hearts', title: 'Violet Connection', note: 'Two pulses looking for a shared tempo. They usually find it.' },
  { slug: 'web-of-life-interactive-sanctuary', title: 'Web of Life', note: 'Touch one strand and the whole web shivers politely.' },
  { slug: 'eco-link-cyber-druid-interface', title: 'Eco-Link', note: 'The druid went digital and the moss approves.' },
  { slug: 'eco-retreat-simulator', title: 'Eco-Retreat', note: 'A cabin, a kettle, a horizon. Simulated, but the calm is real.' },
  { slug: 'zen-veranda-architect', title: 'Zen Veranda', note: 'Build the porch you would think best from.' },
  { slug: 'neural-harmony-chaos-to-clarity', title: 'Neural Harmony', note: 'Watch a storm of static agree to become weather.' },
  { slug: 'neuro-harmonic-resonator', title: 'Neuro-Harmonic Resonator', note: 'Tune the instrument that tunes you back.' },
  { slug: 'cyber-organic-resonance-tuner', title: 'Resonance Tuner', note: 'Half circuit, half root system. Both want the same frequency.' },
  { slug: 'emotional-detox-the-therapy-chair', title: 'The Therapy Chair', note: 'Sit. The chair has heard worse. It hums anyway.' },
  { slug: 'lumi-the-serenity-bot', title: 'Lumi', note: 'A small bot whose entire job is your exhale.' },
  { slug: 'infrared-journey', title: 'Infrared Journey', note: 'Past the visible spectrum, the garden is still warm.' },
  { slug: 'midnight-magic-citadel', title: 'Midnight Citadel', note: 'The far wall of the garden turns out to be a castle.' },
  { slug: 'ai-s-nocturnal-kingdom-interactive-explorer', title: 'The Nocturnal Kingdom', note: 'What the machines dream about when the queries stop.' },
  { slug: 'the-night-reimagined-digital-field-guide', title: 'The Night, Reimagined', note: 'A field guide for the way out — read it under the last lantern.' },
]

function useVisited(): Set<string> {
  const [visited, setVisited] = useState<Set<string>>(new Set())
  useEffect(() => {
    try {
      const seen: string[] = JSON.parse(localStorage.getItem('khayali:visited') || '[]')
      setVisited(new Set(seen))
    } catch {}
  }, [])
  return visited
}

function useAmbience(): [boolean, () => void] {
  const [on, setOn] = useState(false)
  const nodes = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null)
  const toggle = () => {
    if (!nodes.current) {
      const ctx = new AudioContext()
      const gain = ctx.createGain()
      gain.gain.value = 0
      gain.connect(ctx.destination)
      // A quiet two-oscillator drone with slow beating, filtered soft.
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 240
      filter.connect(gain)
      ;[55, 55.5, 110.3].forEach(freq => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq
        const g = ctx.createGain()
        g.gain.value = freq > 100 ? 0.12 : 0.3
        osc.connect(g)
        g.connect(filter)
        osc.start()
      })
      nodes.current = { ctx, gain }
    }
    const { ctx, gain } = nodes.current
    ctx.resume()
    const target = on ? 0 : 0.12
    gain.gain.cancelScheduledValues(ctx.currentTime)
    gain.gain.linearRampToValueAtTime(target, ctx.currentTime + 1.8)
    setOn(!on)
  }
  useEffect(() => () => { nodes.current?.ctx.close() }, [])
  return [on, toggle]
}

export default function NightGardenPage() {
  const visited = useVisited()
  const [ambience, toggleAmbience] = useAmbience()
  const lit = CLEARINGS.filter(c => visited.has(`${BASE}/${c.slug}/index.html`)).length

  return (
    <main className="min-h-screen bg-[#04070f] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_0%,rgba(76,45,115,.25),transparent_40%),radial-gradient(circle_at_85%_30%,rgba(45,88,115,.14),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(115,45,96,.12),transparent_40%)]" />

      <section className="relative px-5 pt-20 pb-14 text-center">
        <p className="text-[.65rem] uppercase tracking-[.35em] text-purple-300/60">a composite walk · mindfulness &amp; sound</p>
        <h1 className="mt-4 font-serif text-6xl text-[#e8ddf3] md:text-7xl">The Night Garden</h1>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-[#a9a3b8]">
          Twenty-five soundscapes, planted along one path. Enter each clearing, stay as long as you like,
          and the little dock in the corner will always walk you back or on to the next door.
          Lanterns stay lit where you have already been.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button onClick={toggleAmbience} className={`rounded-full border px-6 py-2.5 text-sm transition ${ambience ? 'border-purple-300 bg-purple-500/20 text-purple-200' : 'border-gray-700 text-gray-400 hover:border-purple-400'}`}>
            {ambience ? '◉ ambience on' : '○ hum the garden'}
          </button>
          <span className="text-xs text-gray-600">{lit} of {CLEARINGS.length} lanterns lit</span>
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-5 pb-28">
        {/* the path */}
        <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-purple-500/0 via-purple-400/30 to-pink-400/0 md:block" />
        <ol className="space-y-14">
          {CLEARINGS.map((c, i) => {
            const path = `${BASE}/${c.slug}/index.html`
            const isLit = visited.has(path)
            const left = i % 2 === 0
            return (
              <li key={c.slug} className={`relative md:flex ${left ? 'md:justify-start' : 'md:justify-end'}`}>
                <span className={`absolute left-1/2 top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full md:block ${isLit ? 'bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,.8)]' : 'bg-gray-700'}`} aria-hidden />
                <a href={path} target="_blank" rel="noopener noreferrer"
                   className={`group block w-full overflow-hidden rounded-xl border bg-[#070b16] transition md:w-[46%] ${isLit ? 'border-amber-400/40' : 'border-gray-800 hover:border-purple-400/60'}`}>
                  <span className="block aspect-[16/9] overflow-hidden">
                    <img src={`/applets/_thumbs/mind--${c.slug}.jpg`} alt="" loading="lazy"
                         onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                         className="h-full w-full object-cover opacity-60 saturate-[.8] transition duration-700 group-hover:scale-[1.03] group-hover:opacity-90 group-hover:saturate-100" />
                  </span>
                  <span className="block p-5">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-xl text-[#e4dced] group-hover:text-purple-200">{isLit ? '🏮 ' : ''}{c.title}</span>
                      <span className="text-[.6rem] uppercase tracking-[.25em] text-purple-300/70">clearing {i + 1}</span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-[#9c95ad]">{c.note}</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ol>

        <div className="mt-20 border-t border-gray-800 pt-10 text-center">
          <p className="text-[#a9a3b8]">
            {lit === CLEARINGS.length
              ? 'Every lantern is lit. The garden keeps no further secrets — but it keeps the light on for you.'
              : 'The garden does not mind how long a walk takes.'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="/playspace" className="rounded-full border border-gray-700 px-5 py-2.5 text-sm text-gray-300 transition hover:border-amber-300">↩ back to the playspace</a>
            <a href="/music" className="rounded-full border border-gray-700 px-5 py-2.5 text-sm text-gray-300 transition hover:border-pink-400">🎵 the garden has a soundtrack</a>
            <a href="https://ko-fi.com/khayali" target="_blank" rel="noopener noreferrer" className="rounded-full border border-gray-700 px-5 py-2.5 text-sm text-gray-300 transition hover:border-purple-400">☕ keep the lanterns lit</a>
          </div>
        </div>
      </section>
    </main>
  )
}
