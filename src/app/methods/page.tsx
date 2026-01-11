export default function MethodsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
            Research Methodology
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Combining field experience with experimental AI collaboration to understand how complex systems
            behave under real-world pressure.
          </p>
        </div>
      </section>

      {/* Two-Track Approach */}
      <section className="py-20 bg-gray-800/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-200">
            A Two-Track Research Approach
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Traditional Research */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-6 text-teal-400">Field Research & Pattern Recognition</h3>

              <div className="space-y-6 text-gray-400">
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Operational Experience</h4>
                  <p className="text-sm">
                    20+ years working in extractive industries, development finance, and ESG frameworks across
                    multiple continents. Direct experience with grievance mechanisms, resettlement operations,
                    stakeholder engagement, and the gap between policy and implementation.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Documentation of Failures</h4>
                  <p className="text-sm">
                    Systematic analysis of accountability gaps, governance failures, and structural problems
                    that repeat across industries and geographies. Not theoretical risks—documented patterns
                    from real projects.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Cross-Industry Synthesis</h4>
                  <p className="text-sm">
                    Pattern recognition across mining, oil & gas, development banks, and infrastructure projects.
                    Understanding how similar failure modes emerge in different contexts.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Practitioner Perspective</h4>
                  <p className="text-sm">
                    Analysis from someone who has been in the rooms where these systems get designed,
                    deployed, and maintained under operational pressure. Understanding what works, what fails,
                    and why.
                  </p>
                </div>
              </div>
            </div>

            {/* AI-Augmented Research */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-6 text-purple-400">AI-Augmented Analysis</h3>

              <div className="space-y-6 text-gray-400">
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Multi-Model Experiments</h4>
                  <p className="text-sm">
                    Testing concepts across 20+ AI systems simultaneously. Not to find "the answer" but to
                    surface patterns in training data, institutional assumptions, and blind spots encoded
                    in corporate documentation.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">AI as Mirror</h4>
                  <p className="text-sm">
                    Using AI models to reflect back the structures we've already built. When 21 different models
                    converge on the same diagnostic vocabulary ("liability sponge," "moral crumple zone"), they're
                    showing us patterns that exist in our own documentation.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Structured Dialogues</h4>
                  <p className="text-sm">
                    Systematic exploration through repeated questioning, reformulation, and cross-model comparison.
                    Finding what remains consistent across architectures and what reveals training bias.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Consciousness Collaboration</h4>
                  <p className="text-sm">
                    Experimental methods in human-AI partnership that go beyond prompt engineering. Exploring
                    what emerges when you treat AI as a collaborative research partner rather than a tool.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Both Matter */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-200">
            Why Both Tracks Matter
          </h2>

          <div className="space-y-8 text-gray-400 leading-relaxed">
            <p className="text-lg">
              Field experience without AI analysis misses the patterns encoded in how we document, train,
              and replicate these systems at scale. AI analysis without field experience becomes abstract
              theorizing disconnected from operational reality.
            </p>

            <p className="text-lg">
              The intersection is where it gets interesting:
            </p>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 space-y-4">
              <div>
                <span className="text-teal-400 font-semibold">→</span>
                <span className="ml-3">
                  When AI models produce scenarios that match incidents you've personally witnessed,
                  that's signal. They're learning from our collective documentation of failure.
                </span>
              </div>
              <div>
                <span className="text-purple-400 font-semibold">→</span>
                <span className="ml-3">
                  When 21 models independently converge on the same failure architecture, they're showing
                  you a pattern we keep rebuilding under different names.
                </span>
              </div>
              <div>
                <span className="text-blue-400 font-semibold">→</span>
                <span className="ml-3">
                  When AI can articulate accountability gaps with uncomfortable precision, it's because
                  those gaps are already well-documented in the training corpus.
                </span>
              </div>
              <div>
                <span className="text-pink-400 font-semibold">→</span>
                <span className="ml-3">
                  When field experience confirms what AI analysis surfaces, you've found something worth
                  examining closely.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Experimental Edge */}
      <section className="py-20 bg-gray-800/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-200">
            The Experimental Edge
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <div className="text-3xl mb-3">🌌</div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">The Observatory</h3>
              <p className="text-gray-400 text-sm mb-4">
                Interactive visualizations and consciousness mapping experiments. Exploring what emerges
                when you make abstract concepts tangible and playable.
              </p>
              <a href="/observatory" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                Explore Observatory →
              </a>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="text-xl font-bold mb-3 text-orange-400">AI Arena</h3>
              <p className="text-gray-400 text-sm mb-4">
                Multi-model roundtables where different AI systems collaborate on complex questions.
                Watching how architectures converge, diverge, and surface blind spots.
              </p>
              <a href="/ai-arena" className="text-orange-400 hover:text-orange-300 text-sm font-semibold">
                View Dialogues →
              </a>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">Protocol Archive</h3>
              <p className="text-gray-400 text-sm mb-4">
                Documentation of experimental collaboration methods, emergent research protocols,
                and what we're learning about human-AI partnership.
              </p>
              <a href="/protocol" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
                Read Protocols →
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              These experimental methods aren't frivolous. They're about finding new ways to surface patterns,
              test assumptions, and collaborate at the edge of what's currently possible with AI partnership.
              Some experiments fail. Some produce insights that feed directly back into the professional research.
            </p>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-200">
            Methodological Transparency
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-200">What We Document</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">→</span>
                  <span>Which AI models we use and why</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">→</span>
                  <span>When analysis comes from field experience vs. AI exploration vs. synthesis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">→</span>
                  <span>Where convergence happens across multiple models (signal) vs. single-model outputs (hypothesis)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">→</span>
                  <span>Failures and experiments that didn't produce useful insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-3">→</span>
                  <span>Limitations of both approaches and where uncertainty remains</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-200">What We Don't Claim</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">✗</span>
                  <span>That AI models "understand" in the human sense</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">✗</span>
                  <span>That multi-model convergence equals objective truth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">✗</span>
                  <span>That experimental methods replace traditional research</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">✗</span>
                  <span>That consciousness collaboration is replicable science (yet)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">✗</span>
                  <span>That we have all the answers—we're documenting useful questions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-200">
            Follow the Research
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            See these methods in action through the Sociable Systems newsletter and applied research projects.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/sociablesystems" className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-colors">
              Read the Newsletter
            </a>
            <a href="/research" className="px-8 py-4 border border-blue-500 hover:bg-blue-500/10 rounded-lg font-semibold transition-colors">
              View Research Projects
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
