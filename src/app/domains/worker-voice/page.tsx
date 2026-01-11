export default function WorkerVoicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
          Worker Voice
        </h1>

        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-xl text-gray-300 leading-relaxed">
            Labor management systems, worker representation, and industrial relations in extractive industries and large-scale projects. Research examines how AI-driven HR systems, predictive scheduling, and automated performance monitoring affect worker agency, collective bargaining power, and the practical exercise of labor rights in operational contexts.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            Related Tools
          </h2>
          <div className="grid gap-4">
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-emerald-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Architecture of Refusal</h3>
              <p className="text-gray-400 mb-3">Framework for designing systems that refuse harmful operations</p>
              <span className="text-emerald-400 hover:text-emerald-300">View in Tools →</span>
            </a>
            <a href="/tools" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-emerald-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Industrial Safety Architecture</h3>
              <p className="text-gray-400 mb-3">Applying industrial safety principles to AI systems design</p>
              <span className="text-emerald-400 hover:text-emerald-300">View in Tools →</span>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            Related Content
          </h2>
          <div className="grid gap-4">
            <a href="/research/worker-voice" className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-emerald-500 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Worker Voice Research</h3>
              <p className="text-gray-400">Deep research on labor systems and worker representation</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
