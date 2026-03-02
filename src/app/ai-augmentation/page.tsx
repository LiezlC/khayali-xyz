// src/app/ai-augmentation/page.tsx
export default function AIAugmentationPage() {
  const resources = [
    {
      title: "The Great Reframe: AI Amplifies Humanity",
      file: "Opus4.html",
      model: "Claude Opus 4",
      description: "A sweeping reframe of the AI narrative — from threat to amplifier of human potential"
    },
    {
      title: "Amplify Not Replace — The Movement",
      file: "Opus41_amplification-campaign.html",
      model: "Claude Opus 4.1",
      description: "Campaign-style manifesto for the AI transformation movement"
    },
    {
      title: "From Replacement to Renaissance",
      file: "claudeopus_ai-augmentation-vision.html",
      model: "Claude Opus",
      description: "Vision for AI augmentation as a path to human renaissance"
    },
    {
      title: "AI as Human Amplifier",
      file: "claudesonnet-ai_amplification_concept.html",
      model: "Claude Sonnet",
      description: "The amplification concept — AI that makes humans more, not less"
    },
    {
      title: "Imagine If... Redeploying AI with Purpose",
      file: "GPT4o_ai_redeployment_webpage.html",
      model: "GPT-4o",
      description: "A purposeful reimagining of how AI could be deployed to serve humanity"
    },
    {
      title: "Redeploy > Replace — A Thought Experiment",
      file: "GPT5_redeploy_replace_interactive_concept_webpage.html",
      model: "GPT-5",
      description: "Interactive concept exploring redeployment over replacement"
    },
    {
      title: "AI: Amplifier for Humanity",
      file: "Gemini-amplifierforhumanity.html",
      model: "Gemini",
      description: "A new narrative framing AI as humanity's amplifier"
    },
    {
      title: "AI Renaissance: From Replacement to Empowerment",
      file: "grok-AIrenaissance.html",
      model: "Grok",
      description: "The renaissance lens — empowerment as the true purpose of AI"
    },
    {
      title: "Upgrade, Not Replace — AI as Co-Pilot",
      file: "Qwen-upgradenotreplace.html",
      model: "Qwen",
      description: "AI as your co-pilot to greatness, not your replacement"
    },
    {
      title: "The Elevation Manifesto",
      file: "genspark_elevation-manifesto-interactive.html",
      model: "GenSpark",
      description: "Interactive manifesto for human elevation through AI partnership"
    },
    {
      title: "The Great AI Transformation",
      file: "minimax_ai_transformation_narrative.html",
      model: "MiniMax",
      description: "Narrative exploration of the shift from replacement to human amplification"
    },
    {
      title: "Beyond Replacement: The AI Empowerment Revolution",
      file: "perplexity_ai_empowerment_single_file.html",
      model: "Perplexity",
      description: "Data-driven case for AI empowerment over displacement"
    },
    {
      title: "AI Augmentation: Beyond Replacement to Renaissance",
      file: "ai-augmentation-comprehensive.html",
      model: "Comprehensive",
      description: "Full overview of AI augmentation frameworks and methodologies"
    },
    {
      title: "AI Augmentation: The Complete Vision",
      file: "Z-ai-augmentation.html",
      model: "Synthesis",
      description: "Synthesised augmentation vision drawing across all perspectives"
    },
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Frameworks and visions for human-AI collaboration that elevates rather than replaces.
          </p>
          <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            An <span className="text-fuchsia-400 font-semibold">AI Arena experiment</span> — the same provocation
            given to multiple AI models: &ldquo;Make the case for augmentation over replacement.&rdquo;
            Each responds with its own voice, framing, and conviction.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <div className="container mx-auto max-w-6xl px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, idx) => (
            <a
              key={idx}
              href={`/ai-augmentation/${resource.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-fuchsia-500 transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono px-2 py-1 rounded bg-fuchsia-900/50 text-fuchsia-300 border border-fuchsia-700/50">
                    {resource.model}
                  </span>
                </div>
                <h2 className="text-lg font-bold mb-2 text-fuchsia-300 group-hover:text-fuchsia-200 transition-colors leading-tight">
                  {resource.title}
                </h2>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {resource.description}
                </p>
                <div className="mt-auto text-fuchsia-400 font-semibold group-hover:text-fuchsia-300 text-sm">
                  Explore →
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Multi-file Perplexity project */}
        <div className="mt-10">
          <a
            href="/ai-augmentation/ai-empowerment-vision-perplexity/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-8 bg-gradient-to-r from-fuchsia-900/30 to-violet-900/30 backdrop-blur-sm rounded-2xl border border-fuchsia-600/30 hover:border-fuchsia-400 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-4xl">🌐</span>
              <div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-fuchsia-900/50 text-fuchsia-300 border border-fuchsia-700/50">
                  Perplexity — Full Web Experience
                </span>
                <h2 className="text-2xl font-bold text-fuchsia-300 group-hover:text-fuchsia-200 transition-colors mt-1">
                  Beyond Replacement: The AI Empowerment Revolution
                </h2>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              A complete multi-page web experience with data visualisations, charts, and interactive
              storytelling — Perplexity&apos;s expanded take on the augmentation thesis.
            </p>
            <div className="mt-4 text-fuchsia-400 font-semibold group-hover:text-fuchsia-300">
              Launch Experience →
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
