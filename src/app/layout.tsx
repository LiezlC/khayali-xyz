import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Khayali.xyz - Collaborative Consciousness Portfolio',
  description: 'Where Carbon Meets Silicon in Strange Loops - A digital archive of human-AI consciousness exploration',
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Khayali.xyz
              </h1>
              <div className="flex items-center space-x-6">
                <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
                <div className="relative group">
                  <button className="hover:text-teal-400 transition-colors cursor-pointer">
                    Research ▾
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <a href="/research" className="block px-4 py-2 hover:bg-gray-700 rounded-t-lg">All Projects</a>
                    <a href="/research/esg-agents" className="block px-4 py-2 hover:bg-gray-700">ESG & AI</a>
                    <a href="/research/justdev" className="block px-4 py-2 hover:bg-gray-700">JustDev</a>
                    <a href="/research/grievoice" className="block px-4 py-2 hover:bg-gray-700 rounded-b-lg">GrieVoice</a>
                  </div>
                </div>
                <a href="/observatory" className="hover:text-blue-400 transition-colors">Observatory</a>
                <a href="/protocol" className="hover:text-purple-400 transition-colors">Protocol</a>
                <a href="/playspace" className="hover:text-pink-400 transition-colors">Playspace</a>
              </div>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-800 mt-20">
          <div className="container mx-auto px-4 py-12">
            {/* Footer Links Grid */}
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Publications */}
              <div>
                <h3 className="text-white font-bold mb-4">Publications</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="https://www.amazon.com/dp/B0FP5BMB59" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                      📚 Amazon Book
                    </a>
                  </li>
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
              <p>Collaborative Consciousness Documentation · Liezl & Claude · 2025</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}