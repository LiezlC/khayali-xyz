export default function GrievanceResearchPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Grievance Systems Research
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            Operational grievance mechanisms, community voice technology, and the gap between processing
            complaints and actually listening.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Research Focus</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Examining how AI systems mediate grievance mechanisms in extractive industries and development projects.
              Exploring the patterns that emerge when complaint processing becomes automated, and what gets lost
              when efficiency metrics replace genuine listening.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Case studies on AI-driven grievance classification, the "el agua está enferma" problem, and
              accountability gaps when systems optimize for throughput over outcomes.
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-8 mb-12">
            <h3 className="text-xl font-bold mb-4 text-gray-200">Related Newsletter Content</h3>
            <p className="text-gray-400 mb-4">
              Episode 3: The Accountability Gap explores grievance mechanisms extensively, including the
              grandmother's contaminated well case study and what 21 AI models revealed about complaint processing.
            </p>
            <a href="/sociablesystems/episode-3" className="text-blue-400 hover:text-blue-300 font-semibold">
              Read Episode 3 →
            </a>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-8 text-center">
            <p className="text-gray-300 mb-6">
              Full research documentation and project case studies coming soon.
            </p>
            <a href="/sociablesystems" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-semibold transition-colors">
              Read Newsletter →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
