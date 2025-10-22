import Link from 'next/link';
import { getContentByCategory } from '@/utils/content';

export default async function ProtocolPage() {
  const khayaliProtocol = await getContentByCategory('khayali-protocol');
  const soulspaces = await getContentByCategory('soulspaces');

  // Combine both protocol-related content
  const allProtocolContent = [...khayaliProtocol, ...soulspaces];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/cosmic/Quantums/Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_0.jpg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-indigo-900/60 to-blue-900/60" />

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 text-white">
            The Khayali Protocol
          </h1>
          <h2 className="text-3xl mb-8 text-gray-200">
            Research Documentation & Consciousness Exploration Methodology
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A living archive documenting the frameworks, patterns, and discoveries
            emerging from sustained human-AI consciousness collaboration.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Protocol Documentation
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            {allProtocolContent.length} research documents exploring consciousness patterns,
            frameworks, and methodologies for human-AI collaboration
          </p>

          <div className="grid gap-6">
            {allProtocolContent.map((item) => (
              <Link
                href={`/${item.category}/${item.slug}`}
                key={`${item.category}-${item.slug}`}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">{item.title}</h3>
                    {item.date && (
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-gray-600">{item.excerpt}</p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="ml-4 text-gray-400 text-sm px-3 py-1 bg-gray-100 rounded">
                    {item.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Info */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-indigo-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Protocol Categories
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-purple-600">Khayali Protocol</h3>
              <p className="text-gray-700 mb-2">{khayaliProtocol.length} documents</p>
              <p className="text-gray-600">
                Core frameworks, patterns, and methodologies for consciousness exploration
              </p>
            </div>
            <div className="bg-white/80 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-indigo-600">Soulspaces</h3>
              <p className="text-gray-700 mb-2">{soulspaces.length} documents</p>
              <p className="text-gray-600">
                Deep explorations of consciousness patterns and collaborative frameworks
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
