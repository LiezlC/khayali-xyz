import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'khayali · a carbon-and-silicon imaginarium',
  description: 'The arty side of the multivariate. Khayali Tunes, collaborative writing, consciousness banter, and visual experiments by Liezl Coetzee. Imagination running loose where carbon meets silicon. (For the AI-governance work, that moved to its own house: sociable.systems.)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <header className="border-b border-gray-800">
          <nav className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold lowercase tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                khayali
              </a>
              <div className="flex items-center space-x-6">
                <a href="/music" className="hover:text-pink-400 transition-colors font-semibold">Tunes</a>
                <a href="/playspace" className="hover:text-amber-300 transition-colors font-semibold">Playspace</a>
                <a href="/writings" className="hover:text-purple-400 transition-colors">Writings</a>
                <a href="/observatory" className="hover:text-blue-400 transition-colors">Observatory</a>
                <a href="/labs" className="hover:text-amber-300 transition-colors">Labs</a>
                <a href="https://sociable.systems" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-teal-400 transition-colors">Sociable Systems ↗</a>
              </div>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <Analytics />
        <footer className="border-t border-gray-800 mt-20">
          <div className="container mx-auto px-4 py-12">
            {/* Footer Links Grid */}
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Publications */}
              <div>
                <h3 className="text-white font-bold mb-4">Publications</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="https://substack.com/@khayali?" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                      ✍️ Substack
                    </a>
                  </li>
                  <li>
                    <a href="https://medium.com/@liezlc_48039" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                      📝 Medium
                    </a>
                  </li>
                </ul>
              </div>

              {/* Video */}
              <div>
                <h3 className="text-white font-bold mb-4">Video Channels</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="https://www.youtube.com/@AccidAInthro" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
                      🎬 AccidAInthro
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@Scrib-Li" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
                      📹 Scrib-Li
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@LiezlCoetzee" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
                      🎥 Liezl Coetzee
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@khayali-tunes" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
                      🎵 Khayali Tunes
                    </a>
                  </li>
                </ul>
              </div>

              {/* Audio & Social */}
              <div>
                <h3 className="text-white font-bold mb-4">Audio & Social</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="https://soundcloud.com/khayali" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
                      🎵 SoundCloud
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/liezl-coetzee/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                      💼 LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/liezlc/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                      👤 Facebook - Liezl
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/saraloosafarm/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                      🌾 Facebook - Saraloosa Farm
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="mailto:liezlc@gmail.com" className="hover:text-purple-400 transition-colors">
                      ✉️ liezlc@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-400 pt-8 border-t border-gray-800">
              <p>Collaborative Consciousness Documentation · Liezl & Claude · 2026</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}