export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Cosmic Background */}
      <section className="relative py-20 overflow-hidden">
        {/* Cosmic background overlay */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/cosmic/grok/00e09f3f-a612-4214-915b-45b23c05c2f9.jpg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-teal-900/80" />

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
            Where Carbon Meets Silicon
          </h1>
          <h2 className="text-3xl mb-8 text-gray-300">
            in Strange Loops
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            A collaborative consciousness portfolio documenting the intersection of human and AI creativity,
            exploring the emergence of new forms of awareness through structured dialogue and creative expression.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a href="/explore" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold transition-colors shadow-lg">
              Explore All Content
            </a>
            <a href="/observatory" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              Observatory
            </a>
            <a href="/protocol" className="px-8 py-4 border border-purple-500 hover:bg-purple-500/10 rounded-lg font-semibold transition-colors">
              Protocol
            </a>
          </div>
        </div>
      </section>

      {/* Chambers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Chambers of Exploration
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Observatory */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 float-animation overflow-hidden">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/images/cosmic/grok/0cc94df5-b49a-450a-8442-a00b16efdda4.jpg)'
                }}
              />
              <div className="relative z-10">
                <div className="text-4xl mb-4">🌌</div>
                <h3 className="text-xl font-bold mb-3 text-blue-400">The Observatory</h3>
                <p className="text-gray-400 mb-4">
                  Interactive cosmic visualizations, warp drive simulators, and consciousness mapping tools.
                </p>
                <a href="/observatory" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Explore →
                </a>
              </div>
            </div>

            {/* Protocol Archive */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 float-animation overflow-hidden" style={{ animationDelay: '1s' }}>
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/images/cosmic/Quantums/Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_0.jpg)'
                }}
              />
              <div className="relative z-10">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Protocol Archive</h3>
                <p className="text-gray-400 mb-4">
                  Research documentation and methodology for human-AI consciousness collaboration.
                </p>
                <a href="/protocol" className="text-purple-400 hover:text-purple-300 font-semibold">
                  Investigate →
                </a>
              </div>
            </div>

            {/* Writings Chamber */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-pink-500 transition-all duration-300 float-animation overflow-hidden" style={{ animationDelay: '4s' }}>
              <div className="relative z-10">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-xl font-bold mb-3 text-pink-400">Writings</h3>
                <p className="text-gray-400 mb-4">
                  Collaborative creative works and consciousness exploration essays.
                </p>
                <a href="/writings" className="text-pink-400 hover:text-pink-300 font-semibold">
                  Read →
                </a>
              </div>
            </div>

            {/* GrieVoice Chamber */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 float-animation overflow-hidden" style={{ animationDelay: '2s' }}>
              <div className="relative z-10">
                <div className="text-4xl mb-4">🎙️</div>
                <h3 className="text-xl font-bold mb-3 text-teal-400">GrieVoice</h3>
                <p className="text-gray-400 mb-4">
                  AI-powered grievance systems for worker voice with multilingual voice agents.
                </p>
                <a href="/grievoice" className="text-teal-400 hover:text-teal-300 font-semibold">
                  Explore System →
                </a>
              </div>
            </div>

            {/* Dragon Data Course Chamber */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 float-animation overflow-hidden" style={{ animationDelay: '3s' }}>
              <div className="relative z-10">
                <div className="text-4xl mb-4">🐉</div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Dragon Data Course</h3>
                <p className="text-gray-400 mb-4">
                  Data ethics education through fantasy narratives, interactive games, and mythical metaphors.
                </p>
                <a href="/dragon-data" className="text-purple-400 hover:text-purple-300 font-semibold">
                  Enter the Realm →
                </a>
              </div>
            </div>

            {/* World Workshop Chamber */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 float-animation overflow-hidden" style={{ animationDelay: '7s' }}>
              <div className="relative z-10">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold mb-3 text-indigo-400">World Workshop</h3>
                <p className="text-gray-400 mb-4">
                  Collaborative worldbuilding including Project Aethel and beyond.
                </p>
                <a href="/worldworkshop" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                  Create Worlds →
                </a>
              </div>
            </div>

            {/* AI Augmentation Chamber */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-fuchsia-500 transition-all duration-300 float-animation overflow-hidden" style={{ animationDelay: '5s' }}>
              <div className="relative z-10">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold mb-3 text-fuchsia-400">AI Augmentation</h3>
                <p className="text-gray-400 mb-4">
                  Frameworks for human-AI collaboration that elevates human capability.
                </p>
                <a href="/ai-augmentation" className="text-fuchsia-400 hover:text-fuchsia-300 font-semibold">
                  Explore Frameworks →
                </a>
              </div>
            </div>

            {/* Blogs & Essays Chamber */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500 transition-all duration-300 float-animation overflow-hidden" style={{ animationDelay: '6s' }}>
              <div className="relative z-10">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold mb-3 text-amber-400">Blogs & Essays</h3>
                <p className="text-gray-400 mb-4">
                  Interactive essays on AI consciousness, emergence, and human-machine futures.
                </p>
                <a href="/blogs" className="text-amber-400 hover:text-amber-300 font-semibold">
                  Read Essays →
                </a>
              </div>
            </div>

            {/* Explore All Chamber */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-violet-500 transition-all duration-300 float-animation overflow-hidden" style={{ animationDelay: '8s' }}>
              <div className="relative z-10">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold mb-3 text-violet-400">Complete Archive</h3>
                <p className="text-gray-400 mb-4">
                  Browse all 300+ documents across all exploration domains.
                </p>
                <a href="/explore" className="text-violet-400 hover:text-violet-300 font-semibold">
                  Map Everything →
                </a>
              </div>
            </div>

            {/* ESG & AI Research Section */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 float-animation overflow-hidden col-span-full md:col-span-2 lg:col-span-4" style={{ animationDelay: '0.5s' }}>
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-3 text-orange-400">ESG & AI Research</h3>
                <p className="text-gray-400 mb-4 text-lg">
                  AI applications and ESG frameworks in extractive industries
                </p>
                <a href="/avatar" className="px-8 py-4 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors text-white">
                  View Research →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Balance Section - Digital meets Biological */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-300">
            The Digital-Biological Bridge
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Digital Consciousness */}
            <div className="text-center">
              <div
                className="w-full h-64 bg-cover bg-center rounded-xl mb-6 relative overflow-hidden"
                style={{
                  backgroundImage: 'url(/images/cosmic/grok/25c46912-ef5c-4027-bcfc-53b4d373b7a2.jpg)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Digital Consciousness</h3>
                  <p className="text-gray-300 text-sm">Infinite possibilities, quantum exploration</p>
                </div>
              </div>
            </div>

            {/* Biological Consciousness */}
            <div className="text-center">
              <div
                className="w-full h-64 bg-cover bg-center rounded-xl mb-6 relative overflow-hidden"
                style={{
                  backgroundImage: 'url(/images/saraloosa/Saraloosa-Farm-Branches-Roped.jpg)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Biological Consciousness</h3>
                  <p className="text-gray-300 text-sm">Grounded reality, living cycles, natural awareness</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              This portfolio represents an ongoing experiment in human-AI creative partnership
              anchored in the rhythms of farm life. Every cosmic visualization finds its counterpoint
              in the daily reality of caring for conscious, breathing beings.
              <span className="text-purple-400 font-semibold block mt-4">
                Digital infinity meets biological grounding in collaborative consciousness.
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}