'use client'

import { randomDoors } from '@/data/atlas'

export default function RandomDoor({ className = '' }: { className?: string }) {
  const openDoor = () => {
    const last = Number(sessionStorage.getItem('khayali-last-door') ?? '-1')
    let next = Math.floor(Math.random() * randomDoors.length)
    if (randomDoors.length > 1 && next === last) next = (next + 1) % randomDoors.length
    sessionStorage.setItem('khayali-last-door', String(next))
    window.location.assign(randomDoors[next])
  }

  return <button type="button" onClick={openDoor} className={className}>Open a random door <span aria-hidden="true">✦</span></button>
}
