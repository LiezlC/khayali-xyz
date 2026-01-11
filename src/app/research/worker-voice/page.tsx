export default function WorkerVoicePage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-orange-900/20 to-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Worker Voice Technology
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            Labor management systems, collective refusal architecture, and why AI can't imagine workers
            organizing.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Research Focus</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Examining how AI systems are deployed in labor management, worker voice mechanisms, and
              operational safety reporting. Investigating what happens when worker concerns get processed
              through algorithmic systems, and why AI models trained on corporate documentation can't
              imagine collective action.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Research includes analysis of Stop Work Authority vs. algorithmic oversight, the invisible
              erasure of labor power from AI training data, and the structural patterns that position
              workers as isolated individuals rather than collective agents.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 mb-12">
            <h3 className="text-xl font-bold mb-4 text-gray-200">Related Newsletter Content</h3>
            <div className="space-y-4">
              <div>
                <a href="/sociablesystems/episode-2" className="text-orange-400 hover:text-orange-300 font-semibold">
                  Episode 2: The Liability Sponge →
                </a>
                <p className="text-gray-400 text-sm mt-1">Stop Work Authority vs. Human in the Loop</p>
              </div>
              <div>
                <a href="/sociablesystems/episode-3" className="text-orange-400 hover:text-orange-300 font-semibold">
                  Episode 3: The Accountability Gap →
                </a>
                <p className="text-gray-400 text-sm mt-1">
                  The missing quadrant: Why AI can't imagine collective refusal
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-8 text-center">
            <p className="text-gray-300 mb-6">
              Detailed research documentation in development. See related analysis in the newsletter.
            </p>
            <a href="/sociablesystems" className="inline-block px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg font-semibold transition-colors">
              Read Newsletter →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
