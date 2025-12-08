// src/app/ai-augmentation/page.tsx
export default function AIAugmentationPage() {
  const resources = [
    {
      title: "AI Augmentation Comprehensive",
      file: "ai-augmentation-comprehensive.html",
      description: "Complete overview of AI augmentation frameworks and methodologies"
    },
    {
      title: "Augmentation Framework",
      file: "augment.html",
      description: "Core augmentation framework and implementation strategies"
    },
    {
      title: "Claude Opus Vision",
      file: "claudeopus_ai-augmentation-vision.html",
      description: "Vision for AI augmentation using Claude Opus capabilities"
    },
    {
      title: "Gemini AI Augmentation",
      file: "GemAIaugment.html",
      description: "Gemini-based AI augmentation approaches and patterns"
    },
    {
      title: "Elevation Manifesto",
      file: "genspark_elevation-manifesto-interactive_FIXED.html",
      description: "Interactive manifesto for human elevation through AI partnership"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-fuchsia-900 to-pink-900">
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
          <div className="text-8xl mb-6">🧠</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            AI Augmentation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Frameworks and methodologies for human-AI collaboration that elevates human capability.
            Exploring how artificial intelligence can augment rather than replace human intelligence.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <div className="container mx-auto max-w-6xl px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, idx) => (
            <a
              key={idx}
              href={`/ai-augmentation/${resource.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-fuchsia-500 transition-all duration-300 float-animation overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-3 text-fuchsia-300 group-hover:text-fuchsia-200 transition-colors">
                  {resource.title}
                </h2>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {resource.description}
                </p>
                <div className="mt-4 text-fuchsia-400 font-semibold group-hover:text-fuchsia-300">
                  Explore Framework →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
