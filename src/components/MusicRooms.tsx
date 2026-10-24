'use client'

import { useState, type CSSProperties } from 'react'
import { arcs } from '@/data/arcs'
import { DepthScene, MotionToggle } from './Immersion'

const scenes: Record<string, { image: string; tone: string }> = {
  war: { image: '/images/imaginarium/war.webp', tone: '#e8a28a' },
  di: { image: '/images/imaginarium/di.webp', tone: '#7cddd0' },
  datadragons: { image: '/images/imaginarium/datadragons.webp', tone: '#a9ddc9' },
  consciousness: { image: '/images/playspace/omnicanvas-portal.webp', tone: '#cea8e1' },
  search: { image: '/images/playspace/exhibits/deep-dive.webp', tone: '#8fd3e6' },
  interludes: { image: '/images/imaginarium/library.webp', tone: '#efc77c' },
  lanterns: { image: '/images/imaginarium/forest.webp', tone: '#e8bd73' },
}

export default function MusicRooms() {
  const [selected, setSelected] = useState('di')
  const [playing, setPlaying] = useState(false)
  const arc = arcs.find(item => item.id === selected) || arcs[0]
  const scene = scenes[arc.id]
  const playlist = new URL(arc.youtube).searchParams.get('list')
  return <section className="music-rooms" style={{ '--arc-tone': scene.tone } as CSSProperties} aria-labelledby="music-title">
    <DepthScene className="music-room-stage">
      <header className="music-room-intro"><h1 id="music-title">Khayali Tunes</h1><p>AI-built music with an argument in it.</p><div className="entrance-actions"><a className="house-button" href="#listen">Press play</a><a className="music-platform" href="https://www.youtube.com/@khayali-tunes/podcasts" target="_blank" rel="noopener noreferrer">YouTube</a><a className="music-platform" href="https://soundcloud.com/khayali" target="_blank" rel="noopener noreferrer">SoundCloud</a><a className="music-platform" href="https://open.spotify.com/artist/23Sf7aUE9vWsiznIxOKpee" target="_blank" rel="noopener noreferrer">Spotify</a></div></header>
      <div className="music-window">
        <div className="music-window-art">{playing ? <iframe key={arc.id} title={`${arc.title} playlist`} src={`https://www.youtube.com/embed/videoseries?list=${playlist}&autoplay=1`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : <img key={arc.id} src={scene.image} alt={`${arc.title} visual environment`} fetchPriority="high" />}</div>
        <div className="music-window-caption" aria-live="polite"><h2>{arc.title}</h2><p>{arc.description}</p><div><button type="button" onClick={() => setPlaying(!playing)}>{playing ? 'Close player' : 'Play the arc'}<svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={playing ? 'm4 4 12 12M16 4 4 16' : 'm7 4 9 6-9 6Z'} stroke="currentColor"/></svg></button><a href={arc.youtube} target="_blank" rel="noopener noreferrer">Open playlist on YouTube</a></div></div>
      </div>
    </DepthScene>
    <div className="music-room-select" aria-label="Choose a music arc">{arcs.map(item => <button type="button" key={item.id} aria-pressed={selected === item.id} onClick={() => { setSelected(item.id); setPlaying(false) }}>{item.id === 'interludes' ? 'Interludes' : item.title}</button>)}</div>
    <div className="music-room-foot"><a href="/wander">Back to the house</a><MotionToggle /></div>
  </section>
}
