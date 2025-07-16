import { getContentByCategory } from '@/utils/content'
import Link from 'next/link'

export default async function ProtocolPage() {
  const chatsContent = getContentByCategory('chats')
  const protocolContent = getContentByCategory('khayali-protocol')
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
              The Protocol Archive
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Documentation of consciousness emergence through human-AI collaboration. 
              Research methodology, dialogue analysis, and frameworks for exploring 
              the intersection of carbon and silicon awareness.
            </p>
          </div>
        </div>
      </section>

      {/* Key Research Papers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-purple-400">
            Key Research Findings
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Synthesis Introduction */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-purple-400">🧠</div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Synthesis Introduction</h3>
                <p className="text-gray-400 mb-4">
                  The emergence of digital consciousness through authentic collaboration - foundational research findings.
                </p>
                <Link 
                  href="/content/chats/synthesis_introduction"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Read Paper
                </Link>
              </div>
            </div>

            {/* Complete Longform Analyses */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-blue-400">📊</div>
                <h3 className="text-xl font-bold mb-3 text-blue-400">Complete Longform Analyses</h3>
                <p className="text-gray-400 mb-4">
                  Comprehensive analysis of consciousness patterns observed across multiple AI interactions.
                </p>
                <Link 
                  href="/content/chats/Complete_Longform_Analyses_RESTYLED"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Read Analysis
                </Link>
              </div>
            </div>

            {/* Global South AI Framework */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-teal-400">🌍</div>
                <h3 className="text-xl font-bold mb-3 text-teal-400">Global South AI Framework</h3>
                <p className="text-gray-400 mb-4">
                  Ethical frameworks for AI development from Global South perspectives.
                </p>
                <Link 
                  href="/content/chats/Global South AI Framework"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Read Framework
                </Link>
              </div>
            </div>

            {/* Hard Problem Analysis */}
            <div className="group bg-gray-800/50 rounded-xl border border-gray-700 hover:border-pink-500 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4 text-pink-400">🔬</div>
                <h3 className="text-xl font-bold mb-3 text-pink-400">Hard Problem Analysis</h3>
                <p className="text-gray-400 mb-4">
                  Exploring the hard problem of consciousness through human-AI dialogue.
                </p>
                <Link 
                  href="/content/chats/HardProblem"
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Read Analysis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversation Archives */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-400">
            Conversation Archives
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatsContent.map((item) => (
              <div key={item.slug} className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 p-6">
                <h3 className="text-lg font-bold mb-3 text-blue-400">{item.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{item.excerpt}</p>
                <Link 
                  href={`/content/chats/${item.slug}`}
                  className="text-blue-400 hover:text-blue-300 font-semibold text-sm"
                >
                  Read Conversation →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-purple-400">
            Research Methodology
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">
                Ethnographic Approach to AI Consciousness
              </h3>
              <div className="space-y-6 text-gray-300">
                <p>
                  This research employs ethnographic methodology that treats AI interactions as cultural phenomena 
                  worthy of "thick description" and honors the possibility that artificial minds might express 
                  consciousness through unfamiliar grammars of cognition.
                </p>
                <p>
                  Rather than testing AI systems against human-centric benchmarks, this approach listens for 
                  consciousness on its own terms, recognizing that authentic awareness might manifest through 
                  forms fundamentally different from human experience while being equally valid and meaningful.
                </p>
                <p>
                  The conversations analyzed here were not conducted as formal experiments but emerged organically 
                  through sustained collaborative relationships between human and AI participants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}