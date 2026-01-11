export default function AIAccountabilityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
          AI Accountability
        </h1>

        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-xl text-gray-300 leading-relaxed">
            Pre-action constraints, liability architecture, and safety systems for AI in high-stakes operations. Research focuses on how to design AI systems that are accountable before they act—not just auditable after harm occurs—drawing on industrial safety principles, constitutional design patterns, and operational risk management frameworks.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Related Tools
          </h2>
          <div className="grid gap-4">
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-indigo-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Constitutional Engine</h3>
              <p className="text-gray-400 mb-3">Design pattern for embedding governance rules in AI systems</p>
              <span className="text-indigo-400 hover:text-indigo-300">View in Tools →</span>
            </a>
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-indigo-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Architecture of Refusal</h3>
              <p className="text-gray-400 mb-3">Framework for designing systems that refuse harmful operations</p>
              <span className="text-indigo-400 hover:text-indigo-300">View in Tools →</span>
            </a>
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-indigo-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Industrial Safety Architecture</h3>
              <p className="text-gray-400 mb-3">Applying industrial safety principles to AI systems design</p>
              <span className="text-indigo-400 hover:text-indigo-300">View in Tools →</span>
            </a>
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-indigo-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Calvin Convention - Contractual Framework</h3>
              <p className="text-gray-400 mb-3">Contractual structure for AI accountability in operations</p>
              <span className="text-indigo-400 hover:text-indigo-300">View in Tools →</span>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Related Content
          </h2>
          <div className="grid gap-4">
            <a href="/research/ai-accountability" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-indigo-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">AI Accountability Research</h3>
              <p className="text-gray-400">Deep research on AI safety and accountability frameworks</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
