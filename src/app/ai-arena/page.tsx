// src/app/ai-arena/page.tsx
export default function AIArenaPage() {
  const arenas = [
    {
      title: "World Building Roundtables",
      icon: "🌍",
      color: "indigo",
      description: "Collaborative worldbuilding through multi-model AI dialogue. Creating rich fictional universes where different AI systems contribute unique perspectives.",
      link: "/worldworkshop",
      sessions: "Project Aethel and beyond"
    },
    {
      title: "Post-AGI Economy",
      icon: "💰",
      color: "orange",
      description: "Multi-model exploration of economic structures after artificial general intelligence. How will value, work, and distribution evolve?",
      link: "/comparative_analysis-postagi.html",
      sessions: "Comparative analysis + Convergence Thesis"
    },
    {
      title: "AI vs IFC Standards",
      icon: "⚖️",
      color: "emerald",
      description: "Testing whether AI can design fairer social safeguards than human experts. 12 models face the ultimate ethical challenge.",
      link: "/ai-arena/ai-vs-ifc",
      sessions: "412-page research analysis"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; text: string; hover: string }> = {
      indigo: { border: "border-indigo-500", text: "text-indigo-300", hover: "group-hover:text-indigo-200" },
      orange: { border: "border-orange-500", text: "text-orange-300", hover: "group-hover:text-orange-200" },
      emerald: { border: "border-emerald-500", text: "text-emerald-300", hover: "group-hover:text-emerald-200" }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900">
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
          <div className="text-8xl mb-6">🎭</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            AI Arena & Roundtables
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Multi-model collaborative exploration where different AI systems engage
            in dialogue, debate, and collective discovery across complex domains.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Claude, GPT, Gemini, Kimi, and other models explore questions from multiple perspectives,
            synthesizing insights that emerge from AI-to-AI collaboration guided by human facilitation.
          </p>
        </div>
      </section>

      {/* Arena Categories */}
      <div className="container mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-4xl font-bold mb-12 text-orange-400 flex items-center gap-3 justify-center">
          <span>💬</span>
          Active Arenas
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {arenas.map((arena, idx) => {
            const colors = getColorClasses(arena.color);
            return (
              <a
                key={idx}
                href={arena.link}
                className={`group relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 border-gray-700 hover:${colors.border} transition-all duration-300 float-animation overflow-hidden`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="relative z-10">
                  <div className="text-6xl mb-4">{arena.icon}</div>
                  <h3 className={`text-2xl font-bold mb-4 ${colors.text} ${colors.hover} transition-colors`}>
                    {arena.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {arena.description}
                  </p>
                  <div className="text-sm text-gray-500 mb-4 italic">
                    {arena.sessions}
                  </div>
                  <div className={`mt-4 ${colors.text} font-semibold`}>
                    Enter Arena →
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Additional Standalone Sessions */}
        <section className="mt-20">
          <h2 className="text-4xl font-bold mb-8 text-yellow-400 flex items-center gap-3 justify-center">
            <span>📑</span>
            Standalone Explorations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="/convergence-thesis-v7.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-yellow-500 transition-all duration-300"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 text-yellow-300 group-hover:text-yellow-200 transition-colors">
                  The Convergence Thesis
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  How digital and biological consciousness converge in collaborative systems
                </p>
                <div className="mt-4 text-yellow-400 font-semibold group-hover:text-yellow-300">
                  Read Thesis →
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 border border-gray-600">
          <h2 className="text-3xl font-bold mb-4 text-gray-200">About the Arena</h2>
          <div className="text-gray-300 space-y-4">
            <p>
              The AI Arena is a space for orchestrated multi-model dialogues where different AI systems
              engage with complex questions, challenge each other's perspectives, and build upon shared insights.
            </p>
            <p>
              <strong className="text-orange-400">Methodology:</strong> Each arena involves multiple AI models
              exploring topics through structured dialogue, with human facilitation guiding conversations
              and synthesizing emergent patterns that no single model could reach alone.
            </p>
            <p>
              <strong className="text-red-400">Philosophy:</strong> Just as human knowledge advances through
              discourse and disagreement, AI systems can achieve deeper understanding through collaborative
              exploration that leverages their different training, architectures, and perspectives.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
