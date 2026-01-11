export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Professional Focus */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/cosmic/grok/00e09f3f-a612-4214-915b-45b23c05c2f9.jpg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/40 to-gray-900" />

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sociable Systems
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-gray-300 font-light">
            AI Accountability in High-Stakes Operations
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Research and analysis at the intersection of AI governance, ESG frameworks, and operational reality.
            Where systems theory meets extractive industries, development finance, and the humans who hold the liability.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a href="/sociablesystems" className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-colors shadow-lg">
              Read the Newsletter
            </a>
            <a href="/research" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              Applied Research
            </a>
            <a href="/methods" className="px-8 py-4 border border-blue-500 hover:bg-blue-500/10 rounded-lg font-semibold transition-colors">
              Our Methods
            </a>
          </div>
        </div>
      </section>

      {/* Featured Newsletter Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-200">
            Sociable Systems Newsletter
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Weekly analysis on AI accountability gaps, liability architecture, and governance failures in real-world operations.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Episode Highlight 1 */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all p-6">
              <div className="text-sm text-teal-400 font-semibold mb-2">EPISODE 1</div>
              <h3 className="text-xl font-bold mb-3 text-gray-200">We Didn't Outgrow Asimov</h3>
              <p className="text-gray-400 mb-4">
                Why are billion-dollar institutions rediscovering conclusions from a 1942 science fiction story?
                Pre-action constraints vs. governance theater.
              </p>
              <a href="/sociablesystems/episode-1" className="text-teal-400 hover:text-teal-300 font-semibold">
                Read Episode →
              </a>
            </div>

            {/* Episode Highlight 2 */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all p-6">
              <div className="text-sm text-teal-400 font-semibold mb-2">EPISODE 2</div>
              <h3 className="text-xl font-bold mb-3 text-gray-200">The Liability Sponge</h3>
              <p className="text-gray-400 mb-4">
                Why "Human in the Loop" is actually a trap. When safety systems require superhuman vigilance,
                someone gets hurt. Then we call it "operator error."
              </p>
              <a href="/sociablesystems/episode-2" className="text-teal-400 hover:text-teal-300 font-semibold">
                Read Episode →
              </a>
            </div>

            {/* Episode Highlight 3 */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all p-6">
              <div className="text-sm text-teal-400 font-semibold mb-2">EPISODE 3</div>
              <h3 className="text-xl font-bold mb-3 text-gray-200">The Accountability Gap</h3>
              <p className="text-gray-400 mb-4">
                What 21 AI models revealed when asked to design accountability failures. They produced bureaucracy.
                Middle management. And impeccable corporate scapegoating.
              </p>
              <a href="/sociablesystems/episode-3" className="text-teal-400 hover:text-teal-300 font-semibold">
                Read Episode →
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/sociablesystems" className="inline-block px-8 py-4 border border-teal-500 hover:bg-teal-500/10 rounded-lg font-semibold transition-colors text-gray-200">
              View All Episodes →
            </a>
          </div>
        </div>
      </section>

      {/* Primary Work Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-200">
            Research & Practice
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* ESG & AI Governance */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold mb-3 text-teal-400">ESG & AI Governance</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                AI applications in environmental, social, and governance frameworks for extractive industries.
                Where compliance meets operational reality.
              </p>
              <a href="/research/esg" className="text-teal-400 hover:text-teal-300 font-semibold">
                Explore ESG Work →
              </a>
            </div>

            {/* Grievance Mechanisms */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="text-2xl font-bold mb-3 text-blue-400">Grievance Systems</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Operational grievance mechanisms, community voice technology, and the gap between processing
                complaints and actually listening.
              </p>
              <a href="/research/grievance" className="text-blue-400 hover:text-blue-300 font-semibold">
                View Grievance Research →
              </a>
            </div>

            {/* Development Rights & Resettlement */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <div className="text-4xl mb-4">🏘️</div>
              <h3 className="text-2xl font-bold mb-3 text-purple-400">Development Rights</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Resettlement frameworks, land acquisition, livelihood restoration, and the humans behind the KPIs.
              </p>
              <a href="/research/development-rights" className="text-purple-400 hover:text-purple-300 font-semibold">
                Explore Development Work →
              </a>
            </div>

            {/* AI Safety & Accountability */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-3 text-cyan-400">AI Accountability</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Pre-action constraints, liability architecture, and designing systems that can refuse.
                Beyond governance theater.
              </p>
              <a href="/research/ai-accountability" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Read Accountability Research →
              </a>
            </div>

            {/* Worker Voice & Labor */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300">
              <div className="text-4xl mb-4">👷</div>
              <h3 className="text-2xl font-bold mb-3 text-orange-400">Worker Voice Technology</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Labor management systems, collective refusal architecture, and why AI can't imagine workers
                organizing.
              </p>
              <a href="/research/worker-voice" className="text-orange-400 hover:text-orange-300 font-semibold">
                Explore Worker Voice →
              </a>
            </div>

            {/* Systems Analysis */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-pink-500 transition-all duration-300">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-3 text-pink-400">Systems Analysis</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                How complex systems behave under pressure. Speed mismatches, liability diodes, and accountability gaps.
              </p>
              <a href="/research/systems-analysis" className="text-pink-400 hover:text-pink-300 font-semibold">
                View Systems Work →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-200">
            Research Methodology
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto text-lg">
            We combine traditional research methods with experimental approaches to human-AI collaboration.
            Every analysis draws from both field experience and systematic exploration with multiple AI models.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Traditional Research */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-200">Field Research & Analysis</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">→</span>
                  <span>20+ years in extractive industries, ESG, and development operations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">→</span>
                  <span>Hands-on experience with grievance mechanisms, resettlement frameworks, and operational reality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">→</span>
                  <span>Documentation of governance failures and accountability gaps in real projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">→</span>
                  <span>Pattern recognition across industries, geographies, and institutional contexts</span>
                </li>
              </ul>
            </div>

            {/* AI-Augmented Methods */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-200">AI-Augmented Research</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">→</span>
                  <span>Multi-model analysis: testing concepts across 20+ AI systems simultaneously</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">→</span>
                  <span>Structured dialogues to surface patterns in training data and institutional assumptions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">→</span>
                  <span>Experimental methods in consciousness collaboration and emergent research protocols</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">→</span>
                  <span>Using AI as a mirror to reflect back the structures we've already built</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/methods" className="inline-block px-8 py-4 border border-purple-500 hover:bg-purple-500/10 rounded-lg font-semibold transition-colors text-gray-200">
              Learn About Our Methods →
            </a>
          </div>
        </div>
      </section>

      {/* Experimental Lab Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-200">
            Research Labs & Experiments
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Exploring consciousness, collaboration, and creative methods at the edge of what's possible
            with human-AI partnership.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Observatory */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all p-6">
              <div className="text-3xl mb-3">🌌</div>
              <h3 className="text-lg font-bold mb-2 text-blue-400">The Observatory</h3>
              <p className="text-gray-400 text-sm mb-3">
                Interactive cosmic visualizations and consciousness mapping experiments.
              </p>
              <a href="/observatory" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                Explore →
              </a>
            </div>

            {/* Protocol Archive */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all p-6">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-bold mb-2 text-purple-400">Protocol Archive</h3>
              <p className="text-gray-400 text-sm mb-3">
                Documentation of experimental collaboration methods.
              </p>
              <a href="/protocol" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
                Investigate →
              </a>
            </div>

            {/* AI Arena */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-orange-500 transition-all p-6">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="text-lg font-bold mb-2 text-orange-400">AI Arena</h3>
              <p className="text-gray-400 text-sm mb-3">
                Multi-model roundtables on complex questions.
              </p>
              <a href="/ai-arena" className="text-orange-400 hover:text-orange-300 text-sm font-semibold">
                View Dialogues →
              </a>
            </div>

            {/* Creative Works */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-pink-500 transition-all p-6">
              <div className="text-3xl mb-3">✍️</div>
              <h3 className="text-lg font-bold mb-2 text-pink-400">Creative Works</h3>
              <p className="text-gray-400 text-sm mb-3">
                Collaborative writing and consciousness exploration.
              </p>
              <a href="/writings" className="text-pink-400 hover:text-pink-300 text-sm font-semibold">
                Read →
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/labs" className="inline-block px-8 py-4 border border-gray-600 hover:border-gray-500 hover:bg-gray-800/30 rounded-lg font-semibold transition-colors text-gray-400">
              Explore All Experimental Work →
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-200">
            Accidental AInthropologist
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-6">
            Because every database needs a philosopher, and every algorithm needs an anthropologist.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed mb-8">
            Two decades working at the intersection of extractive industries, development finance, and ESG frameworks.
            Now exploring what happens when AI systems meet operational reality, and the humans who end up holding the bag.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/about" className="px-8 py-3 border border-gray-600 hover:border-gray-500 hover:bg-gray-800/30 rounded-lg font-semibold transition-colors text-gray-300">
              About This Work
            </a>
            <a href="/contact" className="px-8 py-3 border border-teal-600 hover:bg-teal-600/10 rounded-lg font-semibold transition-colors text-teal-400">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
