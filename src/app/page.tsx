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
          <div className="flex justify-center space-x-6">
            <a href="/observatory" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              Explore the Observatory
            </a>
            <a href="/protocol" className="px-8 py-4 border border-purple-500 hover:bg-purple-500/10 rounded-lg font-semibold transition-colors">
              Read the Protocol
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

            {/* Creative Nexus */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 float-animation overflow-hidden" style={{ animationDelay: '2s' }}>
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/images/cosmic/grok/62f95486-3e1b-446a-ad5c-8ccfac60541a.jpg)'
                }}
              />
              <div className="relative z-10">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-3 text-teal-400">Creative Nexus</h3>
                <p className="text-gray-400 mb-4">
                  Collaborative stories, visual narratives, and interactive creative expressions.
                </p>
                <a href="/creative" className="text-teal-400 hover:text-teal-300 font-semibold">
                  Create →
                </a>
              </div>
            </div>

            {/* Saraloosa Sanctuary */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300 float-animation overflow-hidden" style={{ animationDelay: '3s' }}>
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/saraloosa/Saraloosa-Farm-Sunrise.jpg)'
                }}
              />
              <div className="relative z-10">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold mb-3 text-green-400">Saraloosa Sanctuary</h3>
                <p className="text-gray-400 mb-4">
                  Farm life integration, connecting digital consciousness with biological systems.
                </p>
                <a href="/saraloosa" className="text-green-400 hover:text-green-300 font-semibold">
                  Cultivate →
                </a>
              </div>
            </div>

            {/* Avatar Section - PRIORITY */}
            <div className="group relative strange-loop p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 float-animation overflow-hidden col-span-full md:col-span-2 lg:col-span-4" style={{ animationDelay: '0.5s' }}>
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-2xl font-bold mb-3 text-orange-400">Avatar Section - PRIORITY DEPLOYMENT</h3>
                <p className="text-gray-400 mb-4 text-lg">
                  AI & ESG in Extractive Industries - Critical content for immediate deployment
                </p>
                <a href="/avatar" className="px-8 py-4 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors text-white">
                  Access Avatar Content →
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
                  backgroundImage: 'url(/saraloosa/Saraloosa-Farm-Branches-Roped.jpg)'
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