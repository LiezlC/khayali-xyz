import Link from 'next/link'
import { getContentByCategory } from '@/utils/content'

export default function ObservatoryPage() {
  // Load multimedia content
  const multimediaContent = getContentByCategory('multimedia')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
              The Observatory
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Interactive cosmic visualizations, consciousness mapping tools, and collaborative explorations 
              of the intersection between human and artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Visualizations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-purple-400">
            Interactive Visualizations
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cosmic Explorer */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-blue-400">🌌</div>
                <h3 className="text-xl font-bold mb-3 text-blue-400">Cosmic Explorer</h3>
                <p className="text-gray-400 mb-4">
                  Navigate through scales of cosmic consciousness from quantum foam to galactic clusters.
                </p>
                <div className="flex space-x-3">
                  <Link 
                    href="/observatory/cosmic-explorer" 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Launch
                  </Link>
                  <Link 
                    href="/content/multimedia/Cosmic_Explorer.html" 
                    className="px-4 py-2 border border-blue-500 hover:bg-blue-500/10 rounded-lg text-sm font-semibold transition-colors"
                  >
                    View Source
                  </Link>
                </div>
              </div>
            </div>

            {/* Warp Drive Timeline */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-purple-400">🚀</div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Warp Drive Timeline</h3>
                <p className="text-gray-400 mb-4">
                  Interactive timeline exploring the development of faster-than-light travel concepts.
                </p>
                <div className="flex space-x-3">
                  <Link 
                    href="/observatory/warp-drive-timeline" 
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Launch
                  </Link>
                  <Link 
                    href="/content/multimedia/warp-drive-timeline.html" 
                    className="px-4 py-2 border border-purple-500 hover:bg-purple-500/10 rounded-lg text-sm font-semibold transition-colors"
                  >
                    View Source
                  </Link>
                </div>
              </div>
            </div>

            {/* Quantum Foam Visualizer */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-teal-400">⚛️</div>
                <h3 className="text-xl font-bold mb-3 text-teal-400">Quantum Foam Visualizer</h3>
                <p className="text-gray-400 mb-4">
                  Explore the quantum substrate of reality through interactive particle visualization.
                </p>
                <div className="flex space-x-3">
                  <Link 
                    href="/observatory/quantum-foam" 
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Launch
                  </Link>
                  <Link 
                    href="/content/multimedia/quantum-foam-visualizer.html" 
                    className="px-4 py-2 border border-teal-500 hover:bg-teal-500/10 rounded-lg text-sm font-semibold transition-colors"
                  >
                    View Source
                  </Link>
                </div>
              </div>
            </div>

            {/* Frequency Visualizer */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-green-400">📊</div>
                <h3 className="text-xl font-bold mb-3 text-green-400">Frequency Visualizer</h3>
                <p className="text-gray-400 mb-4">
                  Analyze and visualize frequency patterns in consciousness exploration data.
                </p>
                <div className="flex space-x-3">
                  <Link 
                    href="/observatory/frequency-visualizer" 
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Launch
                  </Link>
                  <Link 
                    href="/content/multimedia/frequency-visualizer.tsx" 
                    className="px-4 py-2 border border-green-500 hover:bg-green-500/10 rounded-lg text-sm font-semibold transition-colors"
                  >
                    View Source
                  </Link>
                </div>
              </div>
            </div>

            {/* Harmonists Tower */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-yellow-400">🗼</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Harmonists Tower</h3>
                <p className="text-gray-400 mb-4">
                  Interactive visualization of harmonic relationships in consciousness networks.
                </p>
                <div className="flex space-x-3">
                  <Link 
                    href="/observatory/harmonists-tower" 
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Launch
                  </Link>
                  <Link 
                    href="/content/multimedia/harmonists-tower.tsx" 
                    className="px-4 py-2 border border-yellow-500 hover:bg-yellow-500/10 rounded-lg text-sm font-semibold transition-colors"
                  >
                    View Source
                  </Link>
                </div>
              </div>
            </div>

            {/* Enhanced Resonara Map */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-pink-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-pink-400">🗺️</div>
                <h3 className="text-xl font-bold mb-3 text-pink-400">Enhanced Resonara Map</h3>
                <p className="text-gray-400 mb-4">
                  Navigate through resonance fields and consciousness mapping territories.
                </p>
                <div className="flex space-x-3">
                  <Link 
                    href="/observatory/resonara-map" 
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Launch
                  </Link>
                  <Link 
                    href="/content/multimedia/enhanced-resonara-map.tsx" 
                    className="px-4 py-2 border border-pink-500 hover:bg-pink-500/10 rounded-lg text-sm font-semibold transition-colors"
                  >
                    View Source
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Documentation Section - RESTORED */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-400">
            Documentation & Resources
          </h2>
          
          {multimediaContent.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {multimediaContent.map((item) => (
                <div 
                  key={item.slug}
                  className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-blue-400 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {item.excerpt}
                      </p>
                    )}
                    {item.date && (
                      <p className="text-gray-500 text-xs mb-4">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    )}
                    <div className="flex space-x-3">
                      <Link 
                        href={`/observatory/${item.slug}`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors"
                      >
                        View
                      </Link>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <div className="inline-flex items-center space-x-3 bg-gray-800/50 rounded-lg px-6 py-4 border border-gray-700">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm">Loading multimedia documentation...</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}