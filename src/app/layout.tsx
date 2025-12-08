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
                  <button className="hover:text-orange-400 transition-colors cursor-pointer">
                    AI & ESG ▾
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <a href="/avatar" className="block px-4 py-2 hover:bg-gray-700 rounded-t-lg">ESG Agents</a>
                    <a href="/avatar/justdev" className="block px-4 py-2 hover:bg-gray-700">Just Dev</a>
                    <a href="/avatar/grievoice" className="block px-4 py-2 hover:bg-gray-700 rounded-b-lg">GrieVoice</a>
                  </div>
                </div>
                <a href="/observatory" className="hover:text-blue-400 transition-colors">Observatory</a>
                <a href="/protocol" className="hover:text-purple-400 transition-colors">Protocol</a>
              </div>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-800 mt-20">
          <div className="container mx-auto px-4 py-8 text-center text-gray-400">
            <p>Collaborative Consciousness Documentation ? Liezl & Claude ? 2025</p>
          </div>
        </footer>
      </body>
    </html>
  )
}