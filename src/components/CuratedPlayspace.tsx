'use client'

import { useState } from 'react'

type App = { title: string; path: string }
type Cat = { key: string; label: string; emoji: string; blurb: string; apps: App[] }
type Work = { title:string; note:string; path:string; image:string; tone:string; span?:string }

const feature: Work = {
  title:'OmniCanvas', note:'Many visual engines, one unruly canvas.', path:'/applets/omnicanvas/index.html',
  image:'/images/playspace/omnicanvas-portal.webp', tone:'#d76aa7'
}

const works: Work[] = [
  {title:'Neon Rain',note:'A city remembers in reflections.',path:'/applets/art-mindfulness-gumroad-bundle/mindfulness-sound/neon-rain-zen-walk/index.html',image:'/images/playspace/05-neon-rain.webp',tone:'#d94f91',span:'md:col-span-5'},
  {title:'Chromatic Dialogue',note:'Two palettes enter. A conversation emerges.',path:'/applets/art-mindfulness-gumroad-bundle/visual-art/chromatic-dialogue-interactive-art/index.html',image:'/images/playspace/02-chromatic.webp',tone:'#d89a4b',span:'md:col-span-4'},
  {title:'Noir Studio',note:'Light, shadow, and intention.',path:'/applets/art-mindfulness-gumroad-bundle/visual-art/noir-abstract-studio/index.html',image:'/images/playspace/03-noir.webp',tone:'#69635c',span:'md:col-span-3'},
  {title:'BitSoil Farm',note:'Small systems. Living soil. Slow yields.',path:'/applets/art-mindfulness-gumroad-bundle/farming-sim/bitsoil-farm-the-digital-detox/index.html',image:'/images/playspace/07-bitsoil.webp',tone:'#73a96b',span:'md:col-span-4'},
  {title:'Sunday Braai',note:'Smoke, stories, and sound. Come closer.',path:'/applets/art-mindfulness-gumroad-bundle/farming-sim/sunday-braai-simulator/index.html',image:'/images/playspace/08-sunday-braai.webp',tone:'#c86a45',span:'md:col-span-4'},
  {title:'Orbital Bistro',note:'Menus for moons. Recipes for strange days.',path:'/applets/art-mindfulness-gumroad-bundle/misc-toys/orbital-bistro-edge-of-the-void/index.html',image:'/images/playspace/09-orbital-bistro.webp',tone:'#48a7a3',span:'md:col-span-4'},
  {title:'Authentic Human Simulator',note:'Not perfect. Surprisingly human. Sometimes.',path:'/applets/speculative-ai-futures/authentic-human-simulator/index.html',image:'/images/playspace/10-authentic-human.webp',tone:'#b56ab7',span:'md:col-span-5'},
  {title:'Deep Dive',note:'Submerge. Follow the signals down.',path:'/applets/art-mindfulness-gumroad-bundle/mindfulness-sound/deep-dive-interactive-experience/index.html',image:'/images/playspace/06-deep-dive.webp',tone:'#4ca2bf',span:'md:col-span-7'},
  {title:'Abstractify',note:'A kinetic canvas for making rather than browsing.',path:'/applets/art-mindfulness-gumroad-bundle/visual-art/abstractify-kinetic-canvas/index.html',image:'/applets/art-mindfulness-gumroad-bundle/visual-art/abstractify-kinetic-canvas/source.jpg',tone:'#c69451',span:'md:col-span-4'},
  {title:'Can AI Speak Dog?',note:'Hear a bark—or bring your own for a playful reading.',path:'/applets/speculative-ai-futures/ai-dog-translator-decoding-the-bark/index.html',image:'/applets/speculative-ai-futures/ai-dog-translator-decoding-the-bark/images/howling-husky.webp',tone:'#55aaa7',span:'md:col-span-4'},
]

function Arrow(){return <svg viewBox="0 0 28 12" aria-hidden="true" className="w-7"><path d="M1 6h24m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1"/></svg>}

function Frame({work,large=false,className=''}:{work:Work;large?:boolean;className?:string}){
  const frameStyle = {
    '--tone': work.tone,
    borderColor: `${work.tone}62`,
    boxShadow: `inset 0 0 0 1px ${work.tone}0d, 0 0 22px ${work.tone}08`,
  } as React.CSSProperties
  return <a href={work.path} target="_blank" rel="noopener noreferrer" style={frameStyle} className={`ps-frame group relative min-w-0 w-full overflow-hidden border bg-[#050a13] transition-shadow duration-500 hover:shadow-[0_0_28px_var(--tone)] ${large?'min-h-[28rem]':'min-h-[10rem]'} ${className}`}>
    <img src={work.image} alt="" className={`absolute inset-0 h-full w-full object-cover saturate-[.82] transition duration-700 group-hover:scale-[1.025] group-hover:saturate-100 ${large?'opacity-72 group-hover:opacity-92':'opacity-58 brightness-[.72] group-hover:opacity-82 group-hover:brightness-90'}`}/>
    <div className={`absolute inset-0 ${large?'bg-gradient-to-t from-[#020711]/95 via-transparent to-[#020711]/25':'bg-gradient-to-r from-[#020711]/95 via-[#020711]/48 to-[#020711]/10'}`}/>
    {large&&<div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 overflow-hidden p-5 text-[.62rem] uppercase tracking-[.2em] text-[#d9b4cf]"><span>OmniCanvas</span><span className="hidden whitespace-nowrap sm:block">layers · particles · field</span></div>}
    <div className={`absolute ${large?'inset-x-0 bottom-0 p-5 sm:p-6 sm:flex sm:items-end sm:justify-between sm:gap-6':'inset-0 p-5 flex flex-col justify-end max-w-[78%]'}`}>
      <div><h3 style={{color:large?'#eadbc8':work.tone,textShadow:`0 0 15px ${work.tone}55`}} className={`${large?'text-3xl':'text-xl'} font-serif`}>{work.title}</h3><p className="mt-1.5 text-sm leading-snug text-[#aaa7a3]">{work.note}</p></div>
      <span className={`${large?'mt-4 border border-amber-400/70 bg-black/40 px-5 py-3 sm:mt-0 sm:px-8':'mt-4'} inline-flex shrink-0 items-center gap-3 text-[.62rem] uppercase tracking-[.22em] text-[var(--tone)]`}>{large?'Enter OmniCanvas':'Launch'} <Arrow/></span>
    </div>
  </a>
}

export default function CuratedPlayspace({categories}:{categories:Cat[]}){
  const [open,setOpen]=useState(false)
  const [active,setActive]=useState(categories[0].key)
  const cat=categories.find(c=>c.key===active)||categories[0]
  const total=categories.reduce((sum,c)=>sum+c.apps.length,0)
  return <main className="playspace-v3 min-h-screen overflow-hidden bg-[#030914] text-white">
    <div className="pointer-events-none fixed inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_10%,rgba(113,45,115,.18),transparent_34%),radial-gradient(circle_at_10%_46%,rgba(188,115,45,.08),transparent_25%)]"/>

    <section className="relative border-b border-amber-500/20 px-5 py-10 lg:px-[3vw] lg:py-12">
      <div className="mx-auto grid min-w-0 w-full gap-5 lg:grid-cols-[.58fr_1.38fr_.76fr] lg:items-stretch">
        <header className="relative flex flex-col justify-center py-9 lg:pr-10">
          <h1 className="font-serif text-6xl leading-none text-[#f0dfc8] md:text-8xl">Playspace</h1>
          <p className="mt-7 max-w-sm text-xl leading-relaxed text-[#b7b0a8]">A small exhibition drawn from<br className="hidden xl:block"/> a very large cupboard.</p>
          <svg viewBox="0 0 420 110" className="mt-12 w-full text-amber-300/45" aria-hidden="true"><path d="M0 85C92 9 158 113 228 38s111 43 192-23M0 98c108-35 166 19 254-19s102 5 166-27" fill="none" stroke="currentColor" strokeWidth=".7" strokeDasharray="2 5"/><circle cx="228" cy="38" r="3" fill="currentColor"/><circle cx="365" cy="39" r="2" fill="currentColor"/></svg>
        </header>
        <Frame work={feature} large/>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <Frame work={{title:'The Memory Loom',note:'Weave fragments. Reveal patterns.',path:'/applets/art-mindfulness-gumroad-bundle/memory-pattern-games/the-memory-loom/index.html',image:'/images/playspace/04-memory-loom.webp',tone:'#8f683c'}}/>
          <Frame work={{title:'Möbius Data',note:'Turn the loop. Find another angle.',path:'/applets/speculative-ai-futures/mobius-data-self-referential-consciousness/index.html',image:'/images/playspace/11-mobius.webp',tone:'#4aa9a7'}}/>
        </div>
      </div>
    </section>

    <section className="relative border-b border-amber-500/20 px-5 py-10 lg:px-[3vw]">
      <div className="mx-auto grid w-full gap-10 lg:grid-cols-[clamp(220px,17vw,340px)_1fr]">
        <header><h2 className="font-serif text-5xl leading-[.95] text-[#eadbc7]">The foreground<br/>collection</h2><p className="mt-6 text-sm leading-relaxed text-gray-500">Thirteen selected works.<br/>Interactive pieces for night hours<br/>and curious minds.</p><div className="mt-8 h-px w-14 bg-amber-400/70"/></header>
        <div className="grid auto-rows-[clamp(9rem,11vw,12rem)] gap-3 md:grid-cols-12">{works.map(work=><Frame key={work.title} work={work} className={`${work.span} min-h-0`}/>)}</div>
      </div>
    </section>

    <section className="relative px-5 py-10 lg:px-[3vw]">
      <div className="mx-auto grid w-full gap-8 lg:grid-cols-[clamp(260px,20vw,400px)_1fr]">
        <header><h2 className="font-serif text-5xl text-[#eadbc7]">The Deep Archive</h2><p className="mt-5 text-sm leading-relaxed text-gray-500">Beyond the foreground lives everything else. Experiments. Sketches. Curios. Half-baked ideas. Unfinished things. Kept for wandering.</p></header>
        <div>
          <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-800 pb-4">{categories.map(c=><button key={c.key} onClick={()=>setActive(c.key)} className={`text-[.65rem] uppercase tracking-[.2em] transition ${active===c.key?'text-amber-300':'text-gray-600 hover:text-gray-300'}`}>{c.label}</button>)}</div>
          <button onClick={()=>setOpen(!open)} className="flex w-full items-center justify-between border border-amber-500/50 px-7 py-6 text-left hover:bg-amber-500/5"><span><span className="block text-gray-300">The archive holds {total} works and fragments.</span><span className="mt-1 block text-sm text-gray-600">{open?cat.blurb:'Open the door when you’re ready to wander.'}</span></span><span className="flex items-center gap-4 text-[.65rem] uppercase tracking-[.25em] text-amber-300">{open?'Close':'Enter the archive'} <Arrow/></span></button>
          {open&&<div className="grid border-x border-b border-amber-500/30 p-5 sm:grid-cols-2 lg:grid-cols-3">{cat.apps.map(a=><a key={a.path} href={a.path} target="_blank" rel="noopener noreferrer" className="border-t border-gray-800 py-3 pr-5 text-sm text-gray-500 hover:text-amber-200">{a.title}</a>)}</div>}
        </div>
      </div>
    </section>
  </main>
}
