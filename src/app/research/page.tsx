export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/cosmic/Quantums/Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_0.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/90 to-teal-900/90" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
              Applied Research & Development
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Exploring AI applications at the intersection of ESG, development rights, and worker voice
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Independent research examining how artificial intelligence can be applied to advance environmental,
              social, and governance frameworks in extractive industries, enforce development rights, and amplify
              marginalized voices through multilingual voice technology.
            </p>
          </div>
        </div>
      </section>

      {/* Research Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            Research Projects
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Interactive prototypes and frameworks exploring practical AI applications in development and governance
          </p>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

            {/* ESG & AI in Extractives */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 hover:scale-105">
              <div className="relative z-10">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-4 text-teal-400">
                  AI & ESG in Extractive Industries
                </h3>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Research Focus</h4>
                  <p className="text-gray-300 mb-4">
                    Examining how AI can transform ESG monitoring, reporting, and compliance in mining and extractive sectors through multi-agent systems and advanced analytics.
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Key Components</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• ESG framework mappings (GRI, IFRS, BRSR)</li>
                    <li>• Multi-agent Guardian Network concept</li>
                    <li>• Interactive case studies and visualizations</li>
                    <li>• Comprehensive application taxonomy</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Technologies Explored</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-full text-xs">AI/ML</span>
                    <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-full text-xs">Multi-Agent Systems</span>
                    <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-full text-xs">Federated Learning</span>
                    <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-full text-xs">Blockchain</span>
                    <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-full text-xs">Chart.js</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="/research/esg-agents"
                    className="block w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold transition-colors text-center"
                  >
                    Explore Full Research →
                  </a>
                  <p className="text-xs text-gray-500 text-center">Interactive application with multiple sections and visualizations</p>
                </div>
              </div>
            </div>

            {/* JustDev */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105">
              <div className="relative z-10">
                <div className="text-5xl mb-4">⚖️</div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400">
                  JustDev Framework
                </h3>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Research Focus</h4>
                  <p className="text-gray-300 mb-4">
                    Proof-of-concept exploring AI-powered enforcement mechanisms for Just Development Rights, bridging international frameworks with local implementation.
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Key Components</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Rights-based development framework</li>
                    <li>• AI monitoring and enforcement systems</li>
                    <li>• Participatory governance models</li>
                    <li>• Impact assessment methodologies</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Technologies Explored</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs">AI Policy Systems</span>
                    <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs">Rights Frameworks</span>
                    <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs">Interactive UI</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="/research/justdev"
                    className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors text-center"
                  >
                    Explore Framework →
                  </a>
                  <p className="text-xs text-gray-500 text-center">Interactive framework for rights-based development</p>
                </div>
              </div>
            </div>

            {/* GrieVoice */}
            <div className="group relative p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
              <div className="relative z-10">
                <div className="text-5xl mb-4">🎙️</div>
                <h3 className="text-2xl font-bold mb-4 text-purple-400">
                  GrieVoice System
                </h3>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Research Focus</h4>
                  <p className="text-gray-300 mb-4">
                    Developing accessible AI-powered grievance mechanisms for marginalized workers using multilingual voice agents and low-bandwidth channels (USSD, WhatsApp).
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Key Components</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Multilingual voice-first interface</li>
                    <li>• USSD integration (no smartphone required)</li>
                    <li>• WhatsApp bot integration</li>
                    <li>• Worker-centered grievance processing</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Technologies Explored</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs">Voice AI</span>
                    <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs">NLP</span>
                    <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs">USSD</span>
                    <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs">WhatsApp API</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="/research/grievoice"
                    className="block w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors text-center"
                  >
                    Explore System →
                  </a>
                  <p className="text-xs text-gray-500 text-center">Interactive demo and architecture documentation</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Research Approach Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-200">
              Research Approach
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Methodology</h3>
                <p className="text-gray-300 leading-relaxed">
                  Combining theoretical frameworks with interactive prototypes to explore practical implementations.
                  Focus on human-centered design, ethical AI application, and accessibility for marginalized communities.
                </p>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-3 text-teal-400">Interdisciplinary Lens</h3>
                <p className="text-gray-300 leading-relaxed">
                  Drawing from AI ethics, development studies, governance frameworks, and on-the-ground experience
                  to bridge technical possibilities with real-world constraints and needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-200">
            Interested in Collaborating?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Open to opportunities in AI ethics, ESG technology, development rights, or worker voice systems.
          </p>
          <a
            href="mailto:liezlc@gmail.com"
            className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
