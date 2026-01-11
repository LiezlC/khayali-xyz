export default function DevelopmentRightsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Development Rights & Resettlement
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            Resettlement frameworks, land acquisition, livelihood restoration, and the humans behind the KPIs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Research Focus</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Investigating how AI systems are being deployed in resettlement operations, livelihood restoration
              programs, and land acquisition processes. Examining what happens when complex human situations
              get processed through algorithmic systems optimized for efficiency.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Research includes analysis of household eligibility algorithms, livelihood assessment automation,
              and the accountability gaps that emerge when decisions about people's futures get made at
              silicon speed.
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-8 text-center">
            <p className="text-gray-300 mb-6">
              Detailed case studies and research documentation in development. See related analysis in newsletter episodes.
            </p>
            <a href="/sociablesystems" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-colors">
              Read Newsletter →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
