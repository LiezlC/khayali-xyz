export default function ESGResearchPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-teal-900/20 to-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            ESG & AI Governance
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            AI applications in environmental, social, and governance frameworks for extractive industries.
            Where compliance meets operational reality.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Research Focus</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              This research area explores how AI systems intersect with ESG frameworks in high-stakes operations,
              particularly in extractive industries, development finance, and infrastructure projects.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Topics include accountability gaps in ESG compliance, AI-mediated decision-making in social safeguards,
              and the gap between policy frameworks and operational implementation.
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-8 text-center">
            <p className="text-gray-300 mb-6">
              Detailed research projects and case studies coming soon. In the meantime, see related analysis
              in the Sociable Systems newsletter.
            </p>
            <a href="/sociablesystems" className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-colors">
              Read Newsletter Episodes →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
