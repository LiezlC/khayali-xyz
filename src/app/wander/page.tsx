import type { Metadata } from 'next'
import RandomDoor from '@/components/RandomDoor'
import InteractiveAtlasMap from '@/components/InteractiveAtlasMap'
import { atlasDoors, atlasTrails } from '@/data/atlas'

export const metadata: Metadata = {
  title: 'The Khayali Atlas',
  description: 'A map for wandering through Khayali: memory rooms, machine gardens, field signals, midnight workshops, beautiful failures, and quiet places.',
}

const colourStyles: Record<string, { border: string; text: string; glow: string }> = {
  amber: { border: 'border-amber-400/35 hover:border-amber-300/80', text: 'text-amber-300', glow: 'group-hover:shadow-amber-950/60' },
  emerald: { border: 'border-emerald-400/35 hover:border-emerald-300/80', text: 'text-emerald-300', glow: 'group-hover:shadow-emerald-950/60' },
  yellow: { border: 'border-yellow-400/35 hover:border-yellow-300/80', text: 'text-yellow-300', glow: 'group-hover:shadow-yellow-950/60' },
  purple: { border: 'border-purple-400/35 hover:border-purple-300/80', text: 'text-purple-300', glow: 'group-hover:shadow-purple-950/60' },
  pink: { border: 'border-pink-400/35 hover:border-pink-300/80', text: 'text-pink-300', glow: 'group-hover:shadow-pink-950/60' },
  blue: { border: 'border-blue-400/35 hover:border-blue-300/80', text: 'text-blue-300', glow: 'group-hover:shadow-blue-950/60' },
}
const trailText = ['text-pink-300', 'text-purple-300', 'text-amber-300']

export default function WanderPage() {
  return <div className="min-h-screen bg-[#070b18] text-white overflow-hidden">
    <section className="relative min-h-[78vh] flex items-center border-b border-purple-500/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(126,34,206,0.16),transparent_45%)]" />
      <div className="container mx-auto px-4 py-20 grid lg:grid-cols-[0.72fr_1.28fr] items-center gap-8 relative">
        <div className="relative z-10 lg:-mr-20">
          <h1 className="font-serif text-6xl md:text-8xl leading-[0.92] tracking-tight text-[#f0e5d2] mb-8">The Khayali<br />Atlas</h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-lg leading-relaxed mb-10">Not everything here is looking to be found in a straight line.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#doorways" className="px-7 py-4 border border-pink-400/60 bg-pink-500/10 hover:bg-pink-500/20 text-pink-100 rounded-sm transition-colors">Choose a doorway <span aria-hidden="true">→</span></a>
            <RandomDoor className="px-7 py-4 text-amber-300 hover:text-amber-200 underline decoration-amber-500/40 underline-offset-8 transition-colors" />
          </div>
        </div>
        <div className="relative lg:translate-x-10 lg:min-w-[760px]">
          <InteractiveAtlasMap doors={atlasDoors} />
        </div>
      </div>
    </section>

    <section id="doorways" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12),transparent_55%)]" />
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-[0.55fr_1.45fr] gap-12 mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-[#e8dcc8]">Six places.<br />Infinite entries.</h2>
          <p className="text-xl text-gray-400 max-w-xl md:pt-4">Each doorway is a way of seeing. Step through the one that calls to you. There is no wrong door—only different paths.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-7">
          {atlasDoors.map((door, index) => {
            const style = colourStyles[door.colour]
            return <a key={door.title} href={door.href} className={`group relative flex gap-5 items-start py-7 border-t ${style.border} transition-all hover:translate-x-1 hover:shadow-2xl ${style.glow}`}>
              <span className={`font-mono text-sm ${style.text}`}>{String(index + 1).padStart(2, '0')}</span>
              <div className="flex-1"><h3 className="font-serif text-2xl md:text-3xl text-gray-100 mb-2 group-hover:text-white">{door.title}</h3><p className="text-gray-400 leading-relaxed mb-3">{door.description}</p><span className={`text-xs uppercase tracking-[0.22em] ${style.text}`}>{door.kind}</span></div>
              <span className={`${style.text} text-xl`} aria-hidden="true">↗</span>
            </a>
          })}
        </div>
      </div>
    </section>

    <section className="py-24 bg-[#0a0f20] border-y border-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl text-[#e8dcc8] mb-4">Wander through connected oddments.</h2>
        <p className="text-gray-500 mb-14">Three trails. Nine stops. No obligation to arrive anywhere sensible.</p>
        <div className="space-y-6">
          {atlasTrails.map((trail, trailIndex) => <div key={trail.title} className="grid lg:grid-cols-[0.65fr_1.35fr] gap-7 py-8 border-t border-gray-700/70">
            <div className="flex gap-5"><span className="font-mono text-gray-600">0{trailIndex + 1}</span><div><h3 className={`font-serif text-3xl ${trailText[trailIndex]} mb-2`}>{trail.title}</h3><p className="text-gray-500 max-w-xs">{trail.intro}</p></div></div>
            <div className="grid sm:grid-cols-3 gap-3">
              {trail.stops.map((stop, stopIndex) => <a key={stop.title} href={stop.href} className="group px-5 py-4 border-l border-gray-700 hover:border-pink-400 transition-colors"><span className="text-xs font-mono text-gray-600">0{stopIndex + 1}</span><h4 className="text-lg text-gray-200 mt-2 group-hover:text-pink-200">{stop.title}</h4><p className="text-sm text-gray-500 mt-2">{stop.note}</p></a>)}
            </div>
          </div>)}
        </div>
      </div>
    </section>

    <section className="py-24"><div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <a href="/applets/art-mindfulness/memory-pattern-games/the-memory-loom/index.html" className="block overflow-hidden border border-amber-500/30 shadow-2xl shadow-purple-950/40 group"><img src="/applets/art-mindfulness/memory-pattern-games/the-memory-loom/source.jpg" alt="" className="aspect-[4/3] w-full object-cover group-hover:scale-[1.02] transition-transform duration-500" /></a>
      <div><p className="text-sm uppercase tracking-[0.25em] text-amber-400 mb-4">Currently glowing</p><h2 className="font-serif text-5xl md:text-6xl text-[#e8dcc8] mb-6">The Memory Loom</h2><p className="text-lg text-gray-400 leading-relaxed mb-8">A loom for the fragments we leave behind: memories, signals, half-heard patterns, and the things time keeps translating after we have stopped speaking.</p><a href="/applets/art-mindfulness/memory-pattern-games/the-memory-loom/index.html" className="inline-block px-7 py-4 border border-amber-400/60 text-amber-200 hover:bg-amber-500/10 transition-colors">Enter the loom <span aria-hidden="true">→</span></a></div>
    </div></section>

    <section className="py-24 text-center border-t border-purple-500/20 bg-[radial-gradient(circle_at_center,rgba(219,39,119,0.10),transparent_55%)]"><div className="container mx-auto px-4"><h2 className="font-serif text-5xl text-pink-200 mb-3">Still undecided?</h2><p className="text-xl text-gray-400 mb-8">Let the house choose.</p><RandomDoor className="px-8 py-4 border border-pink-400/60 text-pink-100 hover:bg-pink-500/15 transition-colors" /></div></section>
  </div>
}
