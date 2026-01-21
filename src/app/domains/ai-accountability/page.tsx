export default function AIAccountabilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section with Background */}
          <div className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 p-12">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96">
                <img
                  src="/images/accountability/AI_Accountability_Frameworks_version_1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="relative z-10">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                AI Accountability
              </h1>

              <p className="text-2xl text-gray-300 leading-relaxed mb-4">
                Pre-action constraints, liability architecture, and safety systems for AI in high-stakes operations.
              </p>

              <p className="text-lg text-gray-400 leading-relaxed">
                Research focuses on how to design AI systems that are accountable before they act—not just auditable after harm occurs—drawing on industrial safety principles, constitutional design patterns, and operational risk management frameworks.
              </p>
            </div>
          </div>

          {/* Visual Frameworks Gallery */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Core Accountability Frameworks
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/1__Pre-Deployment_Rule_Sovereignty_version_1.png"
                  alt="Pre-Deployment Rule Sovereignty"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">Pre-Deployment Rule Sovereignty</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/2__Default_to_Hold_version_1.png"
                  alt="Default to Hold"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">Default to Hold</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/3__Stop_Work_Authority_version_1.png"
                  alt="Stop Work Authority"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">Stop Work Authority</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/The_Architecture_of_Refusal_version_1.png"
                  alt="Architecture of Refusal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">Architecture of Refusal</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/AI_Accountability_Frameworks_version_1.png"
                  alt="AI Accountability Frameworks"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">AI Accountability Frameworks</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/The_AI_Governance_Gap_version_1.png"
                  alt="The AI Governance Gap"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">The AI Governance Gap</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/The_Need_for_a_Safety_Brake_version_1.png"
                  alt="The Need for a Safety Brake"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">The Need for a Safety Brake</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/Mandatory_Human_Re-entry_version_1.png"
                  alt="Mandatory Human Re-entry"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">Mandatory Human Re-entry</p>
                </div>
              </div>
            </div>

            {/* Additional Frameworks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/The_Watchdog_Paradox_version_1.png"
                  alt="The Watchdog Paradox"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">The Watchdog Paradox</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/Velocity_Over_Capacity_version_1.png"
                  alt="Velocity Over Capacity"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">Velocity Over Capacity</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-indigo-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
                <img
                  src="/images/accountability/AI_Says_'Optimal_'_Reality_Fails__version_1.png"
                  alt="AI Says Optimal - Reality Fails"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">AI Says 'Optimal' - Reality Fails</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Related Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <a href="/tools" className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">Constitutional Engine</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">Design pattern for embedding governance rules in AI systems</p>
                <span className="text-indigo-400 group-hover:text-indigo-300 font-semibold">View in Tools →</span>
              </a>

              <a href="/tools" className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">Architecture of Refusal</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">Framework for designing systems that refuse harmful operations</p>
                <span className="text-indigo-400 group-hover:text-indigo-300 font-semibold">View in Tools →</span>
              </a>

              <a href="/tools" className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">Industrial Safety Architecture</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">Applying industrial safety principles to AI systems design</p>
                <span className="text-indigo-400 group-hover:text-indigo-300 font-semibold">View in Tools →</span>
              </a>

              <a href="/tools" className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">Calvin Convention - Contractual Framework</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">Contractual structure for AI accountability in operations</p>
                <span className="text-indigo-400 group-hover:text-indigo-300 font-semibold">View in Tools →</span>
              </a>
            </div>
          </div>

          {/* Related Content */}
          <div>
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Related Content
            </h2>
            <a href="/research/ai-accountability" className="block group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">AI Accountability Research</h3>
              <p className="text-gray-400 leading-relaxed">Deep research on AI safety and accountability frameworks</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
