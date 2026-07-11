'use client'

import { useMemo, useState } from 'react'
import type { AtlasDoor } from '@/data/atlas'

const positions = [
  { x: 59, y: 37 },
  { x: 70, y: 45 },
  { x: 84, y: 45 },
  { x: 63, y: 62 },
  { x: 76, y: 63 },
  { x: 88, y: 59 },
]

const colour: Record<string, { ring: string; dot: string; text: string }> = {
  amber: { ring: 'border-amber-300 shadow-amber-300/70', dot: 'bg-amber-300', text: 'text-amber-200' },
  emerald: { ring: 'border-emerald-300 shadow-emerald-300/70', dot: 'bg-emerald-300', text: 'text-emerald-200' },
  yellow: { ring: 'border-yellow-300 shadow-yellow-300/70', dot: 'bg-yellow-300', text: 'text-yellow-200' },
  purple: { ring: 'border-purple-300 shadow-purple-300/70', dot: 'bg-purple-300', text: 'text-purple-200' },
  pink: { ring: 'border-pink-300 shadow-pink-300/70', dot: 'bg-pink-300', text: 'text-pink-200' },
  blue: { ring: 'border-blue-300 shadow-blue-300/70', dot: 'bg-blue-300', text: 'text-blue-200' },
}

export default function InteractiveAtlasMap({ doors, immersive = false }: { doors: AtlasDoor[]; immersive?: boolean }) {
  const [active, setActive] = useState(0)
  const selected = doors[active]
  const selectedPosition = positions[active]
  const route = useMemo(() => positions.map((p) => `${p.x},${p.y}`).join(' '), [])

  return (
    <div className={immersive ? 'relative h-full min-h-[42rem]' : 'relative'}>
      <div className={immersive ? 'relative h-full min-h-[42rem] overflow-hidden' : 'relative aspect-[16/9] overflow-hidden rounded-sm'} aria-label="Interactive map of the Khayali house">
        <img
          src="/images/atlas/khayali-atlas-house.webp"
          alt="An illuminated map-house with many doors and paths"
          className={`absolute inset-0 h-full w-full object-cover mix-blend-screen ${immersive ? 'opacity-90' : 'opacity-95'}`}
        />

        <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={route} fill="none" stroke="rgba(251,191,36,.22)" strokeWidth=".22" strokeDasharray="1.1 1.1" />
          <line x1="48" y1="73" x2={selectedPosition.x} y2={selectedPosition.y} stroke="rgba(244,114,182,.75)" strokeWidth=".35" strokeDasharray="1.2 .8" className="motion-safe:animate-pulse" />
        </svg>

        {doors.map((door, index) => {
          const style = colour[door.colour]
          const position = positions[index]
          const isActive = active === index
          return (
            <button
              key={door.title}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-pressed={isActive}
              aria-label={`Reveal ${door.title}`}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full border ${style.ring} ${isActive ? 'bg-gray-950/85 scale-110 shadow-[0_0_24px_currentColor]' : 'bg-gray-950/55 opacity-80 hover:opacity-100'} transition-all focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-gray-950`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
            >
              <span className={`absolute inset-2.5 md:inset-3.5 rounded-full ${style.dot} ${isActive ? 'motion-safe:animate-pulse' : ''}`} />
              <span className="sr-only">{door.title}</span>
            </button>
          )
        })}

        <div className={`absolute bottom-3 w-[min(88%,22rem)] bg-[#070b18]/90 backdrop-blur-md border border-pink-400/30 p-4 md:p-5 shadow-2xl ${immersive ? 'right-3 md:right-[3vw] md:bottom-7' : 'left-3 md:left-7 md:bottom-7'}`}>
          <p className={`text-[10px] md:text-xs uppercase tracking-[0.22em] ${colour[selected.colour].text} mb-2`}>{String(active + 1).padStart(2, '0')} · {selected.kind}</p>
          <h2 className="font-serif text-xl md:text-3xl text-[#f0e5d2] leading-tight mb-2">{selected.title}</h2>
          <p className="hidden sm:block text-sm text-gray-400 leading-relaxed mb-4">{selected.description}</p>
          <a href={selected.href} className={`inline-flex items-center gap-2 text-sm font-semibold ${colour[selected.colour].text} hover:text-white transition-colors`}>Enter this room <span aria-hidden="true">→</span></a>
        </div>
      </div>

      <div className={`${immersive ? 'hidden' : 'mt-4 grid'} grid-cols-3 md:grid-cols-6 gap-2`} aria-label="Atlas map legend">
        {doors.map((door, index) => <button key={door.title} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`min-h-11 px-2 py-2 text-left border transition-colors ${active === index ? 'border-pink-400/60 bg-pink-500/10 text-white' : 'border-gray-800 text-gray-500 hover:text-gray-200 hover:border-gray-600'}`}><span className="font-mono text-xs mr-2">{String(index + 1).padStart(2, '0')}</span><span className="text-xs leading-tight">{door.title}</span></button>)}
      </div>
    </div>
  )
}
