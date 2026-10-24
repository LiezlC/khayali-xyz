'use client'

import HouseArrow from '@/components/HouseArrow'

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { AtlasDoor } from '@/data/atlas'
import RandomDoor from './RandomDoor'
import { DepthScene, MotionToggle } from './Immersion'

const positions = [{ x: 57, y: 36 }, { x: 84, y: 48 }, { x: 51, y: 69 }, { x: 78, y: 32 }, { x: 51, y: 53 }, { x: 66, y: 64 }]
const tones: Record<string, string> = { amber: '#efc77c', emerald: '#71dfc7', yellow: '#e6cf88', purple: '#c1a0f0', pink: '#ed9dc5', blue: '#94bfea' }
const historyKey = 'khayali-atlas-v1'

export default function InteractiveAtlasMap({ doors }: { doors: AtlasDoor[]; immersive?: boolean }) {
  const [active, setActive] = useState(0)
  const [visited, setVisited] = useState<string[]>([])
  const [opening, setOpening] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const router = useRouter()
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(historyKey) || '{}')
      const index = doors.findIndex(door => door.href === saved.selected)
      if (index >= 0) setActive(index)
      if (Array.isArray(saved.visited)) setVisited(saved.visited.filter((href: unknown) => typeof href === 'string' && doors.some(door => door.href === href)))
    } catch {}
    return () => clearTimeout(timer.current)
  }, [doors])
  const select = (index: number) => {
    setActive(index)
    try { localStorage.setItem(historyKey, JSON.stringify({ selected: doors[index].href, visited })) } catch {}
  }
  const enter = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = doors[active].href
    const destination = href.endsWith('.html') ? `${href}?from=atlas` : href
    const next = visited.includes(href) ? visited : [...visited, href]
    setVisited(next)
    try { localStorage.setItem(historyKey, JSON.stringify({ selected: href, visited: next })) } catch {}
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    event.preventDefault()
    if (opening) return
    setOpening(true)
    timer.current = setTimeout(() => router.push(destination), 220)
  }
  const selected = doors[active]
  const tone = tones[selected.colour]
  return <section className={`atlas-entrance ${opening ? 'door-opening' : ''}`} style={{ '--room-tone': tone } as CSSProperties} aria-labelledby="atlas-title">
    <DepthScene className="atlas-stage">
      <div className="atlas-art" aria-label="Interactive map of the Khayali house">
        <img src="/images/atlas/khayali-atlas-house.webp" alt="An illuminated map-house with many doors and paths" fetchPriority="high" />
        <div className="atlas-room-light" style={{ left: `${positions[active].x}%`, top: `${positions[active].y}%` }} />
        <svg className="atlas-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d={`M 41 85 Q 48 65 ${positions[active].x} ${positions[active].y}`} fill="none" stroke="currentColor" strokeWidth=".15" strokeDasharray=".5 .7" /></svg>
        {doors.map((door, index) => <button key={door.href} type="button" className={`atlas-hotspot ${active === index ? 'selected' : ''} ${visited.includes(door.href) ? 'visited' : ''}`} style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%`, '--spot-tone': tones[door.colour] } as CSSProperties} aria-label={`Reveal ${door.title}`} aria-pressed={active === index} onClick={() => select(index)}>
          <span>{String(index + 1).padStart(2, '0')}</span>{visited.includes(door.href) && <span className="sr-only">Visited</span>}
        </button>)}
      </div>
      <div className="atlas-intro"><h1 id="atlas-title">The Khayali<br/> Atlas</h1><p>Not everything here is looking to be found in a straight line.</p><div className="atlas-actions"><a href="#doorways" className="house-button house-button-outline">Choose a doorway <HouseArrow down /></a><RandomDoor className="atlas-random" /></div></div>
      <div className="atlas-selection" aria-live="polite" aria-atomic="true">
        <span className="atlas-selection-number" aria-hidden="true">{String(active + 1).padStart(2, '0')}</span>
        <div><h2>{selected.title}</h2><p>{selected.description}</p></div>
        <a href={selected.href.endsWith('.html') ? `${selected.href}?from=atlas` : selected.href} onClick={enter}>Enter this room <HouseArrow /></a>
      </div>
    </DepthScene>
    <div className="atlas-legend" aria-label="Choose an Atlas room">{doors.map((door, index) => <button key={door.href} type="button" onClick={() => select(index)} aria-pressed={active === index} className={active === index ? 'selected' : ''} style={{ '--spot-tone': tones[door.colour] } as CSSProperties}><span className={`atlas-lantern ${visited.includes(door.href) ? 'lit' : ''}`} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{door.title}{visited.includes(door.href) && <span className="sr-only">, visited</span>}</span></button>)}</div>
    <div className="atlas-status"><span>{visited.length} of {doors.length} rooms visited</span><MotionToggle /></div>
  </section>
}
