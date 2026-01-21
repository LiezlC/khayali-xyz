// src/app/grievoice/page.tsx
export default function GrievoicePage() {
  const resources = [
    {
      title: "GrieVoice Overview",
      file: "index.html",
      description: "Main landing page with system overview and capabilities"
    },
    {
      title: "GrieVoice Agent",
      file: "grievoice-agent.html",
      description: "AI agent architecture and voice interaction design"
    },
    {
      title: "System Architecture",
      file: "grievoice-architecture.html",
      description: "Technical architecture and system components"
    },
    {
      title: "USSD Integration",
      file: "ussd-integration-spec.html",
      description: "USSD integration specifications for feature phone access"
    },
    {
      title: "WhatsApp Integration",
      file: "whatsapp-integration-spec.html",
      description: "WhatsApp integration specifications for messaging access"
    }
  ];

  const demos = [
    {
      title: "AI Voice Grievance Simulator",
      file: "demos/ai-voice-grievance-system-simulator/index.html",
      description: "Interactive simulator for voice-based grievance submission"
    },
    {
      title: "GrieVoice Interactive Experience",
      file: "demos/grievoice-interactive-experience/index.html",
      description: "Comprehensive interactive experience showcasing the full GrieVoice system"
    },
    {
      title: "GrieVoice AI Agent Simulator",
      file: "demos/grievoice-ai-agent-simulator/index.html",
      description: "Simulate AI agent interactions for grievance handling"
    },
    {
      title: "Interactive AI Agent",
      file: "demos/grievoice-interactive-ai-agent/index.html",
      description: "Test and interact with the AI grievance agent interface"
    },
    {
      title: "GrieVoice AI Grievance Systems",
      file: "demos/GrieVoice_AI_Grievance_Systems/index.html",
      description: "Explore the complete AI-powered grievance system architecture"
    },
    {
      title: "Grievance System Upgrade Simulator",
      file: "demos/grievance-system-upgrade-simulator/index.html",
      description: "Simulate upgrading traditional grievance systems to AI-powered solutions"
    },
    {
      title: "Privacy & Trust System",
      file: "demos/privacy-trust-secure-reporting-system/index.html",
      description: "Secure reporting framework with privacy protections"
    },
    {
      title: "Six-Phase Framework Tracker",
      file: "demos/six-phase-framework-interactive-tracker/index.html",
      description: "Track grievance resolution through six implementation phases"
    },
    {
      title: "Voice AI Impact Simulator",
      file: "demos/voice-ai-impact-simulator/index.html",
      description: "Measure and visualize impact of voice AI grievance systems"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900">
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
        <div className="relative container mx-auto max-w-6xl text-center">
          <div className="text-8xl mb-6">🎙️</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            GrieVoice
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            AI-powered grievance systems for worker voice with multilingual voice agents.
            Empowering workers through accessible, voice-first complaint handling.
          </p>
        </div>
      </section>

      {/* Live App Section */}
      <section className="pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-2xl p-8 border border-purple-500/30">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">🎙️</span>
              <div>
                <h2 className="text-3xl font-bold text-purple-300">Try the Live Voice Agent</h2>
                <p className="text-gray-400">Experience the actual Humevoice interface</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Interact with the fully functional GrieVoice system powered by Hume AI. Test multilingual
              voice grievance submission in English, Portuguese, or Swahili with emotion-aware responses.
            </p>
            <a
              href="https://humevoice-virid.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-colors text-white"
            >
              🎙️ Launch Live Voice Agent →
            </a>
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-red-800/50 to-pink-800/50 rounded-2xl p-8 border border-red-500/30">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">📺</span>
              <div>
                <h2 className="text-3xl font-bold text-red-300">Watch the Demo</h2>
                <p className="text-gray-400">See GrieVoice in action</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Watch a comprehensive demonstration of the GrieVoice system, showcasing multilingual
              voice-powered grievance handling for worker empowerment.
            </p>
            <a
              href="https://youtu.be/g7-88fHFjz0?si=JV1qDnptQZm3-bWf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-semibold transition-colors text-white"
            >
              📺 Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Downloadable Resources Section */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-green-800/50 to-teal-800/50 rounded-2xl p-8 border border-green-500/30">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">📥</span>
              <div>
                <h2 className="text-3xl font-bold text-green-300">Comprehensive Presentation Deck</h2>
                <p className="text-gray-400">Full interactive presentation covering all aspects of GrieVoice</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              14-slide comprehensive deck covering implementation framework, case studies, SWOT analysis,
              scaling strategies, privacy architecture, and technical specifications. Navigate via tabs or keyboard arrows.
            </p>
            <a
              href="/grievoice/grievoice-comprehensive-deck.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-lg font-semibold transition-colors text-white"
            >
              📥 View Interactive Deck →
            </a>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-4xl font-bold mb-8 text-teal-400 flex items-center gap-3 justify-center">
          <span>📚</span>
          Documentation & Specifications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, idx) => (
            <a
              key={idx}
              href={`/grievoice/${resource.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-3 text-teal-300 group-hover:text-teal-200 transition-colors">
                  {resource.title}
                </h2>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {resource.description}
                </p>
                <div className="mt-4 text-teal-400 font-semibold group-hover:text-teal-300">
                  View Documentation →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Interactive Demos */}
      <div className="container mx-auto max-w-7xl px-4 pb-20">
        <h2 className="text-4xl font-bold mb-4 text-cyan-400 flex items-center gap-3 justify-center">
          <span>🎮</span>
          Interactive Demos & Simulators
        </h2>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore GrieVoice through interactive demos, simulators, and prototypes
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {demos.map((demo, idx) => (
            <a
              key={idx}
              href={`/grievoice/${demo.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-lg font-bold mb-3 text-cyan-300 group-hover:text-cyan-200 transition-colors">
                  {demo.title}
                </h2>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {demo.description}
                </p>
                <div className="mt-4 text-cyan-400 font-semibold group-hover:text-cyan-300 text-sm">
                  Launch Simulator →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
