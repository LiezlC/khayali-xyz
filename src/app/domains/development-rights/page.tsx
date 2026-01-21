export default function DevelopmentRightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900">
      {/* Hero Section with Header Image */}
      <div className="relative overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/domains/development-rights-header.webp)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-cyan-900/40 to-slate-900" />

        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              Development Rights
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Resettlement, land acquisition, and rights-based approaches in development projects involve complex social negotiations and long-term livelihood impacts. Research explores how AI systems can support—or undermine—rights protection when algorithms assess compensation, predict risks, or optimize resettlement logistics without understanding local power dynamics.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
            Related Tools
          </h2>
          <div className="grid gap-4">
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Calvin Convention - Narrative Overview</h3>
              <p className="text-gray-400 mb-3">Narrative explanation of the Calvin Convention framework</p>
              <span className="text-cyan-400 hover:text-cyan-300">View in Tools →</span>
            </a>
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Human in the Loop: Not Enough</h3>
              <p className="text-gray-400 mb-3">Analysis of human oversight limitations in AI-driven operations</p>
              <span className="text-cyan-400 hover:text-cyan-300">View in Tools →</span>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
            Related Content
          </h2>
          <div className="grid gap-4">
            <a href="/research/development-rights" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Development Rights Research</h3>
              <p className="text-gray-400">Deep research on resettlement and land acquisition</p>
            </a>
            <a href="/research/justdev" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">JustDev</h3>
              <p className="text-gray-400">Justice-centered development practice exploration</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
