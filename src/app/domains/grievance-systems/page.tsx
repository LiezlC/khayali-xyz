export default function GrievanceSystemsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
          Grievance Systems
        </h1>

        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-xl text-gray-300 leading-relaxed">
            Operational grievance mechanisms are the accountability interface between projects and affected communities. Research examines how these systems work in practice, where they fail, and how AI-augmented approaches might improve responsiveness without undermining human judgment in complex social contexts.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Related Tools
          </h2>
          <div className="grid gap-4">
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Architecture of Refusal</h3>
              <p className="text-gray-400 mb-3">Framework for designing systems that refuse harmful operations</p>
              <span className="text-blue-400 hover:text-blue-300">View in Tools →</span>
            </a>
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Calvin Convention - Contractual Framework</h3>
              <p className="text-gray-400 mb-3">Contractual structure for AI accountability in operations</p>
              <span className="text-blue-400 hover:text-blue-300">View in Tools →</span>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Related Content
          </h2>
          <div className="grid gap-4">
            <a href="/research/grievance" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Grievance Systems Research</h3>
              <p className="text-gray-400">Deep research on grievance mechanisms and accountability</p>
            </a>
            <a href="/grievoice" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">GrieVoice</h3>
              <p className="text-gray-400">AI-powered voice-based grievance system with multilingual support</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
