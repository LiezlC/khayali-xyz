export default function AIAccountabilityPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-cyan-900/20 to-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AI Accountability & Safety
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            Pre-action constraints, liability architecture, and designing systems that can refuse.
            Beyond governance theater.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Research Focus</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Core research on AI accountability architecture, exploring the difference between pre-action
              constraints and retrospective governance. Examining why Asimov's 1942 framework keeps getting
              rediscovered by billion-dollar institutions, and what it means to design systems that can
              legitimately refuse.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Topics include liability sponges, the Human-in-the-Loop trap, accountability gaps, speed
              mismatches, and the structural patterns that make governance theater inevitable without
              architectural refusal mechanisms.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 mb-12">
            <h3 className="text-xl font-bold mb-4 text-gray-200">Core Newsletter Episodes</h3>
            <div className="space-y-4">
              <div>
                <a href="/sociablesystems/episode-1" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                  Episode 1: We Didn't Outgrow Asimov →
                </a>
                <p className="text-gray-400 text-sm mt-1">Pre-action constraints vs. governance theater</p>
              </div>
              <div>
                <a href="/sociablesystems/episode-2" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                  Episode 2: The Liability Sponge →
                </a>
                <p className="text-gray-400 text-sm mt-1">Why "Human in the Loop" is actually a trap</p>
              </div>
              <div>
                <a href="/sociablesystems/episode-3" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                  Episode 3: The Accountability Gap →
                </a>
                <p className="text-gray-400 text-sm mt-1">What 21 AI models revealed about who takes the fall</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-8 text-center">
            <p className="text-gray-300 mb-6">
              This research area is actively documented through the Sociable Systems newsletter.
            </p>
            <a href="/sociablesystems" className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold transition-colors">
              Read All Episodes →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
