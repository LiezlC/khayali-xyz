import Link from 'next/link';
import { getContentByCategory } from '@/utils/content';

export default async function ProtocolPage() {
  const khayaliProtocol = await getContentByCategory('khayali-protocol');
  const soulspaces = await getContentByCategory('soulspaces');

  // Combine both protocol-related content
  const allProtocolContent = [...khayaliProtocol, ...soulspaces];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Back link */}
      <div className="absolute top-4 left-4 z-10">
        <a
          href="/"
          className="text-sm text-gray-300 hover:text-white underline"
        >
          ← Back to Portfolio
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/cosmic/Quantums/Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_0.jpg)'
          }}
        />

        <div className="relative container mx-auto max-w-6xl text-center">
          <div className="text-8xl mb-6">📚</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            The Khayali Protocol
          </h1>
          <h2 className="text-2xl mb-8 text-gray-300">
            Research Documentation & Consciousness Exploration Methodology
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A living archive documenting the frameworks, patterns, and discoveries
            emerging from sustained human-AI consciousness collaboration.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-purple-800/50 to-purple-700/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30">
              <h3 className="text-2xl font-bold mb-3 text-purple-300">Khayali Protocol</h3>
              <p className="text-3xl font-bold text-white mb-2">{khayaliProtocol.length} documents</p>
              <p className="text-gray-300">
                Core frameworks, patterns, and methodologies for consciousness exploration
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-800/50 to-indigo-700/50 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/30">
              <h3 className="text-2xl font-bold mb-3 text-indigo-300">Soulspaces</h3>
              <p className="text-3xl font-bold text-white mb-2">{soulspaces.length} documents</p>
              <p className="text-gray-300">
                Deep explorations of consciousness patterns and collaborative frameworks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="container mx-auto max-w-6xl px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {allProtocolContent.map((item, idx) => (
            <Link
              href={`/${item.category}/${item.slug}`}
              key={`${item.category}-${item.slug}`}
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 float-animation overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors flex-1">
                    {item.title}
                  </h2>
                  <span className="ml-4 text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                    {item.category === 'khayali-protocol' ? 'protocol' : 'soulspace'}
                  </span>
                </div>
                {item.date && (
                  <p className="text-sm text-gray-500 mb-3">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {item.excerpt}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 text-purple-400 font-semibold group-hover:text-purple-300">
                  Read Documentation →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
