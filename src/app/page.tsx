export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Professional Focus */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/homepage/hero-ai-accountability.webp)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/40 to-gray-900" />

        <div className="relative container mx-auto px-4 text-center max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Accountability in High-Stakes Operations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Research on AI governance, operational reality, and systems designed with refusal authority—where pre-action constraints meet extractive industries, development finance, and the humans who hold the liability.
          </p>
          <div className="flex justify-center flex-wrap gap-4 mb-6">
            <a href="/domains" className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-colors shadow-lg">
              Explore Domains
            </a>
            <a href="/tools" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              Download Tools
            </a>
          </div>
          <div className="flex flex-col items-center gap-3">
            <a href="/sociablesystems" className="text-gray-400 hover:text-teal-400 transition-colors">
              Read Sociable Systems →
            </a>
            <a href="/sociablesystems/tracking-framework" className="text-sm text-gray-500 hover:text-teal-300 transition-colors">
              View the "Experiment Nobody Authorized" Dashboard →
            </a>
          </div>
        </div>
      </section>

      {/* Featured: Sociable Systems Dashboard */}
      <section className="relative py-16 overflow-hidden border-y border-purple-500/30">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/homepage/dashboard-hero.webp)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40" />
        <div className="relative container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm font-semibold mb-4">
              Featured Research
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Safety Counter-Narrative Dashboard
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Tracking AI companion safety interventions against population-level outcomes. A comprehensive analysis framework examining the gap between AI safety theater and operational reality.
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">11 Frameworks</div>
                <div className="text-gray-400 text-sm">Comprehensive tracking categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">Interactive</div>
                <div className="text-gray-400 text-sm">Navigate by framework or timeline</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">Evidence-Based</div>
                <div className="text-gray-400 text-sm">Real interventions, real outcomes</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/sociablesystems/sociable_systems_dashboard.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all text-center shadow-lg hover:shadow-purple-500/50 text-white"
              >
                🎯 Launch Dashboard
              </a>
              <a
                href="/sociablesystems"
                className="px-8 py-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg font-semibold transition-colors text-center border border-gray-600 hover:border-purple-500 text-gray-300"
              >
                Read Newsletter Context
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Start Here - Three Cards */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-200">
            Start Here
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Domains */}
            <a href="/domains" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all p-8 block">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold mb-4 text-teal-400">Domains</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Five operational domains where AI accountability meets high-stakes reality: ESG & Safeguards, Grievance Systems, Development Rights, Worker Voice, and AI Accountability.
              </p>
              <span className="text-teal-400 hover:text-teal-300 font-semibold">
                Explore Domains →
              </span>
            </a>

            {/* Card 2: Tools */}
            <a href="/tools" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all p-8 block">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Tools</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Downloadable frameworks, interrogation scripts, and architectural patterns: Calvin Convention, Architecture of Refusal, Constitutional Engine, vendor evaluation tools, and analysis briefs.
              </p>
              <span className="text-blue-400 hover:text-blue-300 font-semibold">
                Download Tools →
              </span>
            </a>

            {/* Card 3: Sociable Systems */}
            <a href="/sociablesystems" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all p-8 block">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Sociable Systems</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                The newsletter. Daily analysis on AI accountability gaps, liability architecture, and governance failures—applying frameworks from the domains to real-world operations and institutional patterns.
              </p>
              <span className="text-purple-400 hover:text-purple-300 font-semibold">
                Read Newsletter →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* What This Site Contains */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-lg text-gray-400 leading-relaxed">
            This site contains research across five operational <strong className="text-gray-300">Domains</strong>, downloadable <strong className="text-gray-300">Tools</strong> for practitioners, the <strong className="text-gray-300">Sociable Systems</strong> newsletter analyzing accountability gaps in real-time, and experimental <strong className="text-gray-300">Labs</strong> exploring consciousness, collaboration methods, and the edges of human-AI partnership.
          </p>
        </div>
      </section>

      {/* Primary Work Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-200">
            Research Domains
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* ESG & AI Governance */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold mb-3 text-teal-400">ESG & Safeguards</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                AI governance in environmental, social, and governance frameworks for extractive industries and development finance.
              </p>
              <a href="/domains/esg-safeguards" className="text-teal-400 hover:text-teal-300 font-semibold">
                Explore ESG →
              </a>
            </div>

            {/* Grievance Mechanisms */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="text-2xl font-bold mb-3 text-blue-400">Grievance Systems</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Operational grievance mechanisms and accountability in project-affected communities.
              </p>
              <a href="/domains/grievance-systems" className="text-blue-400 hover:text-blue-300 font-semibold">
                View Grievance →
              </a>
            </div>

            {/* Development Rights & Resettlement */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300">
              <div className="text-4xl mb-4">🏘️</div>
              <h3 className="text-2xl font-bold mb-3 text-cyan-400">Development Rights</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Resettlement, land acquisition, and rights-based approaches in development projects.
              </p>
              <a href="/domains/development-rights" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Explore Development →
              </a>
            </div>

            {/* Worker Voice & Labor */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300">
              <div className="text-4xl mb-4">👷</div>
              <h3 className="text-2xl font-bold mb-3 text-emerald-400">Worker Voice</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Labor management systems, worker representation, and industrial relations.
              </p>
              <a href="/domains/worker-voice" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                Explore Worker Voice →
              </a>
            </div>

            {/* AI Safety & Accountability */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-3 text-indigo-400">AI Accountability</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Pre-action constraints, liability architecture, and safety systems for AI in high-stakes operations.
              </p>
              <a href="/domains/ai-accountability" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                Read Accountability →
              </a>
            </div>

            {/* View All Domains */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 flex flex-col justify-center items-center text-center">
              <div className="text-4xl mb-4">→</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-300">View All Domains</h3>
              <a href="/domains" className="text-teal-400 hover:text-teal-300 font-semibold">
                Explore →
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
