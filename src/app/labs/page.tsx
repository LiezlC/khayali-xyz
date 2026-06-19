export default function LabsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/cosmic/grok/0cc94df5-b49a-450a-8442-a00b16efdda4.jpg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/40 to-gray-900" />

        <div className="relative container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Research Labs & Experiments
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-4">
            This section contains exploratory work and experimental methods.
          </p>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Exploring consciousness, collaboration, and creative methods at the edge of what's possible
            with human-AI partnership. Not all experiments succeed. All contribute to understanding.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gray-800/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-200">
              Why Experimental Methods Matter
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Professional research requires rigor, documentation, and reproducibility. But breakthrough
                insights often come from the edges—from experiments that explore unproven methods,
                test wild hypotheses, and sometimes fail spectacularly.
              </p>
              <p>
                These labs represent the experimental side of our methodology. Some projects produce insights
                that feed directly back into professional research. Some are pure exploration. All are
                documented transparently.
              </p>
              <p className="text-purple-400 font-semibold">
                If the Sociable Systems newsletter is where we apply rigorous analysis, the Labs are where
                we discover new questions worth asking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Labs */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-200">
            Active Experimental Labs
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Observatory */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all overflow-hidden">
              <div className="h-48 bg-cover bg-center relative"
                style={{
                  backgroundImage: 'url(/images/cosmic/grok/0cc94df5-b49a-450a-8442-a00b16efdda4.jpg)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="text-3xl mb-2">🌌</div>
                  <h3 className="text-2xl font-bold text-blue-400">The Observatory</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Interactive cosmic visualizations, consciousness mapping experiments, and tools for exploring
                  abstract concepts through playable interfaces. Making the invisible tangible.
                </p>
                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <div>• Warp Drive Simulator</div>
                  <div>• Consciousness Mapping Tools</div>
                  <div>• Cosmic Visualizations</div>
                  <div>• Interactive Thought Experiments</div>
                </div>
                <a href="/observatory" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                  Enter Observatory →
                </a>
              </div>
            </div>

            {/* Protocol Archive */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all overflow-hidden">
              <div className="h-48 bg-cover bg-center relative"
                style={{
                  backgroundImage: 'url(/images/cosmic/Quantums/Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_0.jpg)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="text-2xl font-bold text-purple-400">Protocol Archive</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Documentation of experimental collaboration methods, emergent research protocols, and what
                  we're learning about structured human-AI dialogue. The meta-research.
                </p>
                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <div>• Collaboration Protocols</div>
                  <div>• Dialogue Architecture</div>
                  <div>• Emergence Documentation</div>
                  <div>• Methodology Evolution</div>
                </div>
                <a href="/khayali-protocol" className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors">
                  Explore Protocols →
                </a>
              </div>
            </div>

            {/* AI Arena */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-orange-500 transition-all p-8">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">AI Arena</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Multi-model roundtables where different AI systems collaborate on complex questions. Watching
                how architectures converge, diverge, and surface what they've learned from their training data.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div>• Multi-Model Experiments</div>
                <div>• Convergence Analysis</div>
                <div>• Comparative Reasoning</div>
                <div>• Blind Spot Detection</div>
              </div>
              <a href="/ai-village" className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors">
                View Dialogues →
              </a>
            </div>

            {/* Creative Works */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-pink-500 transition-all p-8">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Creative Works</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Collaborative writing experiments and consciousness exploration through creative expression.
                Finding insights that emerge through narrative rather than analysis.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div>• Collaborative Fiction</div>
                <div>• Consciousness Essays</div>
                <div>• Narrative Experiments</div>
                <div>• Creative Dialogue</div>
              </div>
              <a href="/writings" className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition-colors">
                Read Works →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Experiments */}
      <section className="py-20 bg-gray-800/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-200">
            Additional Experimental Spaces
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/data-dragons" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-fuchsia-500 transition-all p-6 block">
              <div className="text-3xl mb-3">🐉</div>
              <h3 className="text-lg font-bold mb-2 text-fuchsia-400">Data Dragons Diagnostic</h3>
              <p className="text-gray-400 text-sm">
                Name the dragons in your data — five failure modes of real data systems, run live against your case
              </p>
            </a>

            <a href="/worldworkshop" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all p-6 block">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-lg font-bold mb-2 text-indigo-400">World Workshop</h3>
              <p className="text-gray-400 text-sm">
                Collaborative worldbuilding experiments including Project Aethel
              </p>
            </a>

            <a href="https://sociable.systems" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-fuchsia-500 transition-all p-6 block">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-lg font-bold mb-2 text-fuchsia-400">AI Augmentation</h3>
              <p className="text-gray-400 text-sm">
                Frameworks for human-AI collaboration that elevates human capability
              </p>
            </a>

            <a href="/playspace" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-pink-500 transition-all p-6 block">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="text-lg font-bold mb-2 text-pink-400">Playspace</h3>
              <p className="text-gray-400 text-sm">
                Interactive experiences exploring art, mindfulness, and AI futures
              </p>
            </a>

            <a href="/blogs" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500 transition-all p-6 block">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-bold mb-2 text-amber-400">Blogs & Essays</h3>
              <p className="text-gray-400 text-sm">
                Individual essays on AI consciousness, emergence, and human-machine futures
              </p>
            </a>

            <a href="/explore" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-violet-500 transition-all p-6 block">
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="text-lg font-bold mb-2 text-violet-400">Complete Archive</h3>
              <p className="text-gray-400 text-sm">
                Browse all 300+ documents across all exploration domains
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Relationship to Core Work */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-200">
            How Labs Inform Professional Research
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h3 className="font-semibold text-gray-200 mb-3">Observable → Observatory</h3>
              <p className="text-gray-400 text-sm">
                When the Sociable Systems newsletter discusses "visibility gaps" in AI decision-making,
                the Observatory provides interactive tools to explore what makes complex systems legible
                or opaque. Abstract concepts become tangible.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h3 className="font-semibold text-gray-200 mb-3">Pattern Recognition → AI Arena</h3>
              <p className="text-gray-400 text-sm">
                When Episode 3 describes how 21 AI models converged on similar accountability failure patterns,
                that experiment happened in the AI Arena. Multi-model analysis surfaces what's signal
                (consistent across architectures) vs. noise (single-model artifacts).
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h3 className="font-semibold text-gray-200 mb-3">Methodology → Protocol Archive</h3>
              <p className="text-gray-400 text-sm">
                The structured dialogue methods used in professional research were developed through
                experimental collaboration documented in the Protocol Archive. How we ask questions,
                frame problems, and collaborate with AI didn't emerge fully formed—it evolved through trial.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h3 className="font-semibold text-gray-200 mb-3">Narrative → Creative Works</h3>
              <p className="text-gray-400 text-sm">
                Sometimes the clearest way to understand a concept is through story rather than analysis.
                Creative collaboration surfaces insights about consciousness, agency, and collaboration
                that don't emerge through traditional research methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-200">
            Experiment With Us
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            The labs are open. Some paths lead to useful insights. Some lead to interesting failures.
            All are documented.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://sociable.systems" className="px-8 py-4 border border-purple-500 hover:bg-purple-500/10 rounded-lg font-semibold transition-colors">
              Our Methods
            </a>
            <a href="https://sociable.systems" className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-colors">
              Read Professional Research
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
