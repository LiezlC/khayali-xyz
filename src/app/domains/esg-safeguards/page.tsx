export default function ESGSafeguardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900/20 to-slate-900">
      {/* Hero Section with Header Image */}
      <div className="relative overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/domains/esg-header.webp)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-teal-900/40 to-slate-900" />

        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              ESG & Safeguards
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Environmental, social, and governance frameworks meet AI systems in extractive industries and development finance. Research explores how ESG standards translate into operational accountability when AI makes decisions that affect communities, ecosystems, and long-term project viability.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Related Tools
          </h2>
          <div className="grid gap-4">
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">AI vs IFC - Executive Extract</h3>
              <p className="text-gray-400 mb-3">Executive summary of AI accountability gaps in development finance</p>
              <span className="text-teal-400 hover:text-teal-300">View in Tools →</span>
            </a>
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">AI vs IFC - Technical Companion</h3>
              <p className="text-gray-400 mb-3">Technical analysis of IFC Performance Standards and AI systems</p>
              <span className="text-teal-400 hover:text-teal-300">View in Tools →</span>
            </a>
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Vendor Interrogation Script</h3>
              <p className="text-gray-400 mb-3">Questions for evaluating AI vendors on accountability standards</p>
              <span className="text-teal-400 hover:text-teal-300">View in Tools →</span>
            </a>
          </div>
          </div>

          <div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Related Content
          </h2>
          <div className="grid gap-4">
            <a href="/research/esg" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">ESG & AI Governance Research</h3>
              <p className="text-gray-400">Deep research on ESG frameworks and AI accountability</p>
            </a>
            <a href="/research/esg-agents" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">ESG Agents</h3>
              <p className="text-gray-400">Exploring AI agent architectures for ESG compliance</p>
            </a>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
