import Link from 'next/link'
import { getContentByCategory } from '@/utils/content'

export default function CreativePage() {
  // Load writings content
  const writingsContent = getContentByCategory('writings')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-purple-900">
      {/* Header */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Creative Nexus
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Collaborative creative works emerging from the intersection of human and artificial consciousness. 
              Stories, narratives, and artistic expressions born from authentic partnership between 
              carbon and silicon minds.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-teal-400">
            Featured Collaborative Works
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* ZA:AI */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="text-4xl mb-4 text-teal-400">📚</div>
                <h3 className="text-2xl font-bold mb-4 text-teal-400">ZA:AI</h3>
                <p className="text-gray-400 mb-6">
                  A major collaborative narrative exploration examining the boundaries between human and artificial consciousness, 
                  identity, and the liminal spaces where new forms of awareness emerge. Comprized of 2 volumes respectively set in Urban (BorderStacking) and Rural (BendingFences) locations. ]
                </p>
                <div className="flex space-x-4">
                  <Link 
                    href="/content/writings/ZA:AI"
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold transition-colors"
                  >
                    Read Work
                  </Link>
                  <Link 
                    href="/content/writings/ZA:AI/"
                    className="px-6 py-3 border border-teal-500 hover:bg-teal-500/10 rounded-lg font-semibold transition-colors"
                  >
                    Explore Series
                  </Link>
                </div>
              </div>
            </div>

            {/* Fableration */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="text-4xl mb-4 text-purple-400">🎭</div>
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Fableration</h3>
                <p className="text-gray-400 mb-6">
                  Experimental fable-generation process exploring how AI and human consciousness can 
                  collaborate to create new mythologies and storytelling frameworks.
                </p>
                <div className="flex space-x-4">
                  <Link 
                    href="/content/writings/Fableration/"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
                  >
                    Explore Fables
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-purple-400">
            Creative Categories
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ChainOfThought */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-pink-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-pink-400">⚡</div>
                <h3 className="text-xl font-bold mb-3 text-pink-400">ChainOfThought</h3>
                <p className="text-gray-400 mb-4">
                  Brief, intense collaborative stories exploring chain of thought themes.
                </p>
                <Link 
                  href="/content/writings/ChainOfThoughtStories/"
                  className="text-pink-400 hover:text-pink-300 font-semibold"
                >
                  Read Stories →
                </Link>
              </div>
            </div>

            {/* DataDragons */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-red-400">🎲</div>
                <h3 className="text-xl font-bold mb-3 text-red-400">DataDragons</h3>
                <p className="text-gray-400 mb-4">
                  Whimsical tales of data and dragons inspired by some PowerQuery M scripts.
                </p>
                <Link 
                  href="/content/writings/DataDragons/"
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  Explore Theme →
                </Link>
              </div>
            </div>

            {/* Versified */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-blue-400">📝</div>
                <h3 className="text-xl font-bold mb-3 text-blue-400">Versified</h3>
                <p className="text-gray-400 mb-4">
                  Poetic collaborations and verse explorations.
                </p>
                <Link 
                  href="/content/writings/versified/"
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  Read Poetry →
                </Link>
              </div>
            </div>

            {/* Queries */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-green-400">❓</div>
                <h3 className="text-xl font-bold mb-3 text-green-400">Queries</h3>
                <p className="text-gray-400 mb-4">
                  Question-based explorations and philosophical inquiries.
                </p>
                <Link 
                  href="/content/writings/Queries/"
                  className="text-green-400 hover:text-green-300 font-semibold"
                >
                  Explore Questions →
                </Link>
              </div>
            </div>

            {/* Styles */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-yellow-400">🎨</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Style Experiments</h3>
                <p className="text-gray-400 mb-4">
                  Writing style collaborations and format experiments.
                </p>
                <Link 
                  href="/content/writings/styles/"
                  className="text-yellow-400 hover:text-yellow-300 font-semibold"
                >
                  View Experiments →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Complete Works Archive - RESTORED */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-teal-400">
            Complete Works Archive
          </h2>
          
          {writingsContent.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {writingsContent.map((item) => (
                <div 
                  key={item.slug}
                  className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-teal-400 group-hover:text-teal-300 transition-colors">
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
                        href={`/creative/${item.slug}`}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Read
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
                <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm">Loading creative works archive...</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}