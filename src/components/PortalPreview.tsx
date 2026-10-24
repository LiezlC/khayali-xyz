'use client'

import { useEffect, useRef, useState } from 'react'
import { useImmersion } from './Immersion'

export default function PortalPreview() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [foreground, setForeground] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const { paused, reduced } = useImmersion()
  const active = open && visible && foreground && !paused
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '0px' })
    if (ref.current) observer.observe(ref.current)
    const sync = () => setForeground(!document.hidden)
    sync(); document.addEventListener('visibilitychange', sync)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [])
  useEffect(() => {
    const ready = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow || event.data?.type !== 'omni-hello') return
      frame.current.contentWindow?.postMessage({ type: 'omni-set', id: 'particles', value: 500 }, window.location.origin)
      frame.current.contentWindow?.postMessage({ type: 'omni-color', color: '#78d9c9' }, window.location.origin)
    }
    window.addEventListener('message', ready)
    return () => window.removeEventListener('message', ready)
  }, [])
  return <div ref={ref} className="portal-preview">
    <img src="/images/playspace/omnicanvas-portal.webp" alt="An illuminated portal opening into the visual artspace" loading="lazy" />
    {active && <iframe ref={frame} title="Interactive Neon Neural Flow preview" src="/applets/omnicanvas/applets/neon-neural-flow/index.html" className="portal-live" />}
    <div className="portal-preview-caption"><div><h3>OmniCanvas</h3><p>Many visual engines, one unruly canvas.</p></div><div className="portal-preview-actions"><button type="button" disabled={reduced || paused} onClick={() => setOpen(!open)} aria-pressed={open}>{reduced || paused ? 'Motion paused' : open ? 'Close preview' : 'Try a live preview'}</button><a href="/applets/omnicanvas/index.html">Enter OmniCanvas <svg width="20" height="16" viewBox="0 0 24 18" fill="none" aria-hidden="true"><path d="M2 9h19m-7-7 7 7-7 7" stroke="currentColor"/></svg></a></div></div>
  </div>
}
