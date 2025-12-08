export default function ObservatoryPage() {
  const visualizations = [
    {
      title: "Observatory Content",
      file: "observatory-content.html",
      description: "Main observatory interface with cosmic visualizations"
    },
    {
      title: "Alcubierre Warp Drive Simulator",
      file: "alcubierre-warp-drive-simulator.html",
      description: "Interactive simulation of faster-than-light warp drive mechanics"
    },
    {
      title: "Cosmic Scale Consciousness Explorer",
      file: "cosmic_scale_consciousness_explorer.html",
      description: "Explore consciousness at different cosmic scales"
    },
    {
      title: "Cosmic Harmonic Enhanced",
      file: "cosmic-harmonic-enhanced.html",
      description: "Enhanced visualization of cosmic harmonics and resonance"
    },
    {
      title: "Cosmic Scale Explorer Fixed",
      file: "cosmic-scale-explorer-fixed.html",
      description: "Fixed version of the cosmic scale exploration tool"
    },
    {
      title: "Enhanced Warp Timeline",
      file: "enhanced-warp-timeline.html",
      description: "Timeline visualization of warp drive development"
    },
    {
      title: "Nebula Forge",
      file: "NebulaForge.html",
      description: "Create and shape your own nebula formations"
    },
    {
      title: "Vortex Engine",
      file: "VortexEngine.html",
      description: "Interactive vortex dynamics and consciousness mapping"
    },
    {
      title: "Warp Drive Visualizations",
      file: "warp-drive-visualizations.html",
      description: "Comprehensive warp drive visualization suite"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Back link */}
      <div className="absolute top-4 left-4 z-10">
        <a
          href="/"
          className="text-sm text-gray-300 hover:text-white underline"
        >
          ← Back to Portfolio
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/cosmic/grok/0cc94df5-b49a-450a-8442-a00b16efdda4.jpg')] bg-cover bg-center" />

        <div className="relative container mx-auto max-w-6xl text-center">
          <div className="text-8xl mb-6">🌌</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            The Observatory
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Interactive cosmic visualizations, warp drive simulators, and consciousness mapping tools.
            Explore the infinite through interactive experiences.
          </p>
        </div>
      </section>

      {/* Visualizations Grid */}
      <div className="container mx-auto max-w-6xl px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visualizations.map((viz, idx) => (
            <a
              key={idx}
              href={`/observatory/${viz.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 float-animation overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-3 text-blue-300 group-hover:text-blue-200 transition-colors">
                  {viz.title}
                </h2>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {viz.description}
                </p>
                <div className="mt-4 text-blue-400 font-semibold group-hover:text-blue-300">
                  Launch Visualization →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}