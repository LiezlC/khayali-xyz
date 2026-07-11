'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

/**
 * Site navigation.
 *
 * Desktop (md+): the original inline link row, unchanged.
 * Mobile (<md): a hamburger button that opens a full-height drawer listing
 * every room — so the long tail (Chats, Creative, World Workshop, Soulspaces)
 * that never fit in the desktop bar is reachable in two taps on a phone.
 *
 * Lives as a client component so the root layout can stay server-rendered;
 * only this interactive sliver ships JS.
 */

// Primary links — the ones that show in the desktop bar.
const primaryLinks = [
  { href: '/music', label: 'Tunes', hover: 'hover:text-pink-400', bold: true },
  { href: '/wander', label: 'Wander', hover: 'hover:text-amber-300', bold: true },
  { href: '/song-excavation', label: 'Song Excavation', hover: 'hover:text-pink-400', bold: true },
  { href: '/playspace', label: 'Playspace', hover: 'hover:text-amber-300', bold: true },
  { href: '/writings', label: 'Writings', hover: 'hover:text-purple-400' },
  { href: '/observatory', label: 'Observatory', hover: 'hover:text-blue-400' },
  { href: '/labs', label: 'Labs', hover: 'hover:text-amber-300' },
  { href: '/search', label: 'Search', hover: 'hover:text-purple-400' },
]

// The extra rooms — desktop has no space for these, but the mobile drawer does.
const moreRooms = [
  { href: '/chats', label: 'Consciousness Banter', hover: 'hover:text-purple-400' },
  { href: '/creative', label: 'Creative Nexus', hover: 'hover:text-amber-400' },
  { href: '/worldworkshop', label: 'World Workshop', hover: 'hover:text-teal-400' },
  { href: '/soulspaces', label: 'Soulspaces', hover: 'hover:text-indigo-400' },
]

export default function SiteNav() {
  const [open, setOpen] = useState(false)

  // Lock body scroll while the drawer is open, and close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="border-b border-gray-800 relative z-40">
      <nav className="container py-6" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold lowercase tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent"
            aria-label="khayali — home"
          >
            khayali
          </a>

          {/* Desktop links — unchanged from before, just hidden on small screens */}
          <div className="hidden md:flex items-center space-x-6">
            {primaryLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`${l.hover} transition-colors ${l.bold ? 'font-semibold' : ''}`}
              >
                {l.label}
              </a>
            ))}
            <a href="https://ko-fi.com/khayali" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 transition-colors">Support</a>
            <a
              href="https://sociable.systems"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-teal-400 transition-colors"
              aria-label="Sociable Systems (opens in new tab)"
            >
              Sociable Systems ↗
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden p-2 -mr-2 text-gray-200 hover:text-pink-400 transition-colors"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer + backdrop */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute right-0 top-0 h-full w-[82%] max-w-xs bg-gray-900 border-l border-gray-800 shadow-2xl flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between px-5 py-6 border-b border-gray-800">
              <span className="text-xl font-bold lowercase bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                khayali
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-gray-300 hover:text-pink-400 transition-colors"
                aria-label="Close menu"
              >
                <X size={26} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col px-2 py-4" aria-label="Mobile navigation">
              {primaryLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg text-lg ${l.hover} hover:bg-gray-800/60 transition-colors ${l.bold ? 'font-semibold' : ''}`}
                >
                  {l.label}
                </a>
              ))}

              <div className="mt-4 mb-1 px-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                More rooms
              </div>
              {moreRooms.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg text-lg ${l.hover} hover:bg-gray-800/60 transition-colors`}
                >
                  {l.label}
                </a>
              ))}

              <a href="https://ko-fi.com/khayali" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="mt-4 mx-2 px-4 py-3 rounded-lg text-base font-semibold text-pink-200 bg-pink-600/15 border border-pink-500/30 hover:bg-pink-600/25 transition-colors">Support Khayali on Ko-fi</a>

              <a
                href="https://sociable.systems"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4 mx-2 px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-teal-400 border border-gray-800 hover:border-teal-500/40 transition-colors"
                aria-label="Sociable Systems (opens in new tab)"
              >
                Sociable Systems ↗
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
