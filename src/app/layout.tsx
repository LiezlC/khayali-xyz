import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Khayali - Creative Experiments & Research Archive',
  description: 'Creative experiments, interactive visualizations, music, and research archive exploring consciousness, AI safety, and human-machine collaboration.',
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Khayali
              </h1>
              <div className="flex items-center space-x-6">
                <a href="/" className="hover:text-teal-400 transition-colors">Home</a>
                <a href="/domains" className="hover:text-teal-400 transition-colors">Domains</a>
                <a href="/tools" className="hover:text-teal-400 transition-colors">Tools</a>
                <a href="/curriculum/index.html" className="hover:text-teal-400 transition-colors">Curriculum</a>
                <a href="https://sociable.systems" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors font-semibold">Sociable Systems</a>
                <a href="/music" className="hover:text-purple-400 transition-colors">Music</a>
                <a href="/labs" className="hover:text-blue-400 transition-colors text-sm">Labs</a>
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
              <p className="mb-2">Collaborative Consciousness Documentation · Liezl & Claude · 2025</p>
              <p className="text-sm">The professional practice lives at <a href="https://sociable.systems" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 hover:underline">sociable.systems</a>.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}