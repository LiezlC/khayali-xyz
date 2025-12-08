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

      {/* Resources Grid */}
      <div className="container mx-auto max-w-6xl px-4 pb-20">
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
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 float-animation overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
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
    </div>
  );
}
