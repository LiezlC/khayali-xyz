'use client'

import { createContext, useContext, useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'

const MotionContext = createContext({ paused: true, reduced: false, toggle: () => {} })

export function useImmersion() { return useContext(MotionContext) }

export function ImmersionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(true)
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setReduced(media.matches)
      try { setPaused(media.matches || localStorage.getItem('khayali-motion-v1') === 'paused') }
      catch { setPaused(media.matches) }
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
  const toggle = () => {
    if (reduced) return
    setPaused(value => {
      try { localStorage.setItem('khayali-motion-v1', value ? 'playing' : 'paused') } catch {}
      return !value
    })
  }
  return <MotionContext.Provider value={{ paused, reduced, toggle }}><div className="imaginarium" data-motion={paused ? 'paused' : 'playing'}>{children}</div></MotionContext.Provider>
}

export function MotionToggle() {
  const { paused, reduced, toggle } = useContext(MotionContext)
  return <button type="button" className="motion-toggle" onClick={toggle} aria-pressed={paused} disabled={reduced}>
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">{paused ? <path d="m5 3 7 5-7 5Z" stroke="currentColor"/> : <path d="M5 3v10M11 3v10" stroke="currentColor"/>}</svg>
    {reduced ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion'}
  </button>
}

/** Pointer work stays outside React renders and stops when the scene is hidden. */
export function DepthScene({ children, className = '', label }: { children: ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const enabled = useRef(false)
  const frame = useRef(0)
  const { paused } = useContext(MotionContext)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    let visible = true
    const sync = () => {
      enabled.current = !paused && visible && !document.hidden
      node.dataset.active = enabled.current ? 'true' : 'false'
      if (!enabled.current) { node.style.setProperty('--pointer-x', '0'); node.style.setProperty('--pointer-y', '0') }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() })
    observer.observe(node)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); cancelAnimationFrame(frame.current) }
  }, [paused])
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled.current || event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - .5
    const y = (event.clientY - box.top) / box.height - .5
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty('--pointer-x', String(x))
      ref.current?.style.setProperty('--pointer-y', String(y))
    })
  }
  return <div ref={ref} className={`depth-scene ${className}`} aria-label={label} onPointerMove={move} onPointerLeave={() => {
    cancelAnimationFrame(frame.current)
    ref.current?.style.setProperty('--pointer-x', '0'); ref.current?.style.setProperty('--pointer-y', '0')
  }}>{children}</div>
}
