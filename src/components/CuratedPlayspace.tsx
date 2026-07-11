'use client'

import { useState } from 'react'
type App = { title: string; path: string }
type Cat = { key: string; label: string; emoji: string; blurb: string; apps: App[] }

const works = [
  ['OmniCanvas','Many visual engines, one unruly canvas.','/applets/omnicanvas/index.html','/images/playspace/01-omnicanvas.webp','pink'],
  ['The Memory Loom','Weave fragments. Reveal patterns.','/applets/art-mindfulness-gumroad-bundle/memory-pattern-games/the-memory-loom/index.html','/images/playspace/04-memory-loom.webp','amber'],
  ['MÖBIUS DATA','Turn the loop. Find another angle.','/applets/speculative-ai-futures/mobius-data-self-referential-consciousness/index.html','/images/playspace/11-mobius.webp','teal'],
  ['Neon Rain','A city remembers in reflections.','/applets/art-mindfulness-gumroad-bundle/mindfulness-sound/neon-rain-zen-walk/index.html','/images/playspace/05-neon-rain.webp','pink'],
  ['Chromatic Dialogue','Two palettes enter. A conversation emerges.','/applets/art-mindfulness-gumroad-bundle/visual-art/chromatic-dialogue-interactive-art/index.html','/images/playspace/02-chromatic.webp','amber'],
  ['Noir Studio','Light, shadow, and intention.','/applets/art-mindfulness-gumroad-bundle/visual-art/noir-abstract-studio/index.html','/images/playspace/03-noir.webp','gray'],
  ['BitSoil Farm','Turn digital noise into fertile soil.','/applets/art-mindfulness-gumroad-bundle/farming-sim/bitsoil-farm-the-digital-detox/index.html','/images/playspace/07-bitsoil.webp','green'],
  ['Sunday Braai','Clean the yard. Light the fire. Keep lunch alive.','/applets/art-mindfulness-gumroad-bundle/farming-sim/sunday-braai-simulator/index.html','/images/playspace/08-sunday-braai.webp','orange'],
  ['Orbital Bistro','Menus for moons. Recipes for strange days.','/applets/art-mindfulness-gumroad-bundle/misc-toys/orbital-bistro-edge-of-the-void/index.html','/images/playspace/09-orbital-bistro.webp','teal'],
  ['Authentic Human Simulator','Not perfect. Surprisingly human. Sometimes.','/applets/speculative-ai-futures/authentic-human-simulator/index.html','/images/playspace/10-authentic-human.webp','purple'],
  ['Deep Dive','Submerge. Follow the signals down.','/applets/art-mindfulness-gumroad-bundle/mindfulness-sound/deep-dive-interactive-experience/index.html','/images/playspace/06-deep-dive.webp','blue'],
  ['Abstractify','A kinetic canvas for making rather than browsing.','/applets/art-mindfulness-gumroad-bundle/visual-art/abstractify-kinetic-canvas/index.html','/applets/art-mindfulness-gumroad-bundle/visual-art/abstractify-kinetic-canvas/source.jpg','amber'],
  ['Can AI Speak Dog?','Hear three model barks—or bring one of your own for a playful reading.','/applets/speculative-ai-futures/ai-dog-translator-decoding-the-bark/index.html','/applets/speculative-ai-futures/ai-dog-translator-decoding-the-bark/images/howling-husky.webp','teal'],
] as const

const tones: Record<string,string> = {
  pink:'border-pink-500/40 hover:border-pink-300 text-pink-300', amber:'border-amber-500/40 hover:border-amber-300 text-amber-300', teal:'border-teal-500/40 hover:border-teal-300 text-teal-300', gray:'border-gray-500/50 hover:border-gray-300 text-gray-300', green:'border-green-500/40 hover:border-green-300 text-green-300', orange:'border-orange-500/40 hover:border-orange-300 text-orange-300', purple:'border-purple-500/40 hover:border-purple-300 text-purple-300', blue:'border-blue-500/40 hover:border-blue-300 text-blue-300',
}

function Work({ work, className='' }: { work: typeof works[number]; className?: string }) {
  const [title,note,path,image,tone] = work
  return <a href={path} target="_blank" rel="noopener noreferrer" className={`group relative overflow-hidden min-h-[13rem] border ${tones[tone]} ${className}`}><img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-65 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-500"/><div className="absolute inset-0 bg-gradient-to-r from-[#070b18]/95 via-[#070b18]/30 to-transparent"/><div className="absolute inset-y-0 left-0 p-5 flex flex-col justify-end max-w-sm"><h3 className="font-serif text-2xl text-white">{title}</h3><p className="text-sm text-gray-400 mt-2">{note}</p><span className="mt-4 text-xs uppercase tracking-[.2em]">Launch →</span></div></a>
}

export default function CuratedPlayspace({categories}:{categories:Cat[]}) {
  const [active,setActive] = useState(categories[0].key)
  const cat = categories.find(c=>c.key===active) || categories[0]
  const total = categories.reduce((sum,c)=>sum+c.apps.length,0)
  return <div className="min-h-screen bg-[#070b18] text-white">
    <section className="py-20 md:py-24 border-b border-purple-500/20 bg-[radial-gradient(circle_at_60%_20%,rgba(126,34,206,0.14),transparent_50%)]"><div className="container mx-auto px-4 max-w-7xl grid lg:grid-cols-[.52fr_1.48fr] gap-10 items-center"><div><h1 className="font-serif text-6xl md:text-8xl text-[#efe2cd] mb-6">Playspace</h1><p className="text-xl md:text-2xl text-gray-400 leading-relaxed">A small exhibition drawn from a very large cupboard.</p></div><div className="grid md:grid-cols-[1.45fr_.75fr] gap-4"><Work work={works[0]} className="md:row-span-2 min-h-[25rem]"/><div className="grid gap-4"><Work work={works[1]}/><Work work={works[2]}/></div></div></div></section>

    <section className="py-24"><div className="container mx-auto px-4 max-w-7xl grid md:grid-cols-[.45fr_1.55fr] gap-10"><div><h2 className="font-serif text-5xl text-[#efe2cd] mb-5">The foreground collection</h2><p className="text-gray-500 leading-relaxed">Thirteen selected works. Interactive pieces for night hours, curious minds, and no obvious productive purpose.</p></div><div className="grid md:grid-cols-6 gap-4">{works.slice(3).map((work,index)=><Work key={work[0]} work={work} className={index===0||index===5||index===7||index===9?'md:col-span-4':'md:col-span-2'}/>)}</div></div></section>

    <section className="py-20 border-y border-gray-800 bg-[#0a0f20]"><div className="container mx-auto px-4 max-w-7xl grid md:grid-cols-[.55fr_1.45fr] gap-10"><div><h2 className="font-serif text-5xl text-[#efe2cd] mb-5">The Deep Archive</h2><p className="text-gray-500 leading-relaxed">Beyond the foreground lives everything else: experiments, sketches, curios, false starts, half-baked ideas, and unfinished things. Kept for wandering, not presented as equals.</p></div><details className="group border border-amber-500/30 bg-gray-950/40"><summary className="cursor-pointer list-none p-6 flex items-center justify-between hover:bg-amber-500/5"><div><p className="text-gray-300">The archive holds {total} works and fragments.</p><p className="text-sm text-gray-600 mt-1">Open the cupboard when you are ready to drift.</p></div><span className="text-amber-300 group-open:rotate-90 transition-transform">→</span></summary><div className="p-6 border-t border-gray-800"><div className="flex flex-wrap gap-2 mb-8">{categories.map(c=><button key={c.key} onClick={()=>setActive(c.key)} className={`px-4 py-2 text-sm border transition-colors ${active===c.key?'border-amber-400 text-amber-200 bg-amber-500/10':'border-gray-700 text-gray-500 hover:text-gray-200'}`}>{c.label} <span className="opacity-50">{c.apps.length}</span></button>)}</div><p className="text-gray-500 mb-6">{cat.blurb}</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8">{cat.apps.map(a=><a key={a.path} href={a.path} target="_blank" rel="noopener noreferrer" className="py-3 border-t border-gray-800 text-sm text-gray-400 hover:text-amber-200 flex justify-between gap-3"><span>{a.title}</span><span>↗</span></a>)}</div></div></details></div></section>
    <section className="py-16 text-center"><a href="/wander" className="text-amber-300 hover:text-amber-200">Return to the Khayali Atlas →</a></section>
  </div>
}
