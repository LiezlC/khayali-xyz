// src/app/ai-arena/ai-vs-ifc/page.tsx
export default function AIvsIFCPage() {
  const resources = [
    {
      title: "LLM Prompt Testing: Full Analysis (412 pages)",
      file: "LLM_ PromptTesting.pdf",
      type: "PDF",
      description: "Comprehensive testing of 12 AI models against IFC Performance Standards"
    },
    {
      title: "Chinese Models Testing Results",
      file: "LLM_ PromptTesting_ChineseModels_1.pdf",
      type: "PDF",
      description: "Specialized analysis of Chinese language models (Kimi K2, GLM-4.6, QSwen-3-Max)"
    },
    {
      title: "NLM Synthesis of LLM Safeguard Responses",
      file: "NLM Synthesis of LLM Safeguard Responses.pdf",
      type: "PDF",
      description: "Synthesis analysis of AI model responses to social safeguard scenarios"
    },
    {
      title: "Strategic Social Performance Lifecycle",
      file: "Strategic_Social_Performance_Lifecycle_Batch Compress.pdf",
      type: "PDF",
      description: "Framework for social performance management in development projects"
    }
  ];

  const articles = [
    {
      title: "AI vs IFC: The Ultimate Test",
      file: "AI-vs-IFC.md",
      description: "Can AI design fairer social safeguard systems than human experts?"
    },
    {
      title: "Social Safeguards: Mandates vs Principles",
      file: "AI-Social-Safeguards-Mandates-Versus-Principles.md",
      description: "Analysis of prescriptive mandates versus principle-based approaches"
    },
    {
      title: "LLM Safeguards: Final Article",
      file: "article_llm_safeguards_final.md",
      description: "Comprehensive article on AI-designed social safeguard systems"
    },
    {
      title: "Fixing Weaknesses in Social Risk Management",
      file: "Fixing-Weaknesses-in-Social-Risk-Management.md",
      description: "Identifying and addressing gaps in current social risk frameworks"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Back link */}
      <div className="absolute top-4 left-4 z-10">
        <a
          href="/ai-arena"
          className="text-sm text-gray-300 hover:text-white underline"
        >
          ← Back to AI Arena
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="relative container mx-auto max-w-6xl text-center">
          <div className="text-8xl mb-6">⚖️</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            AI vs IFC Performance Standards
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Testing whether AI can design social safeguard systems that are fairer, more accountable,
            and more robust than human-designed international standards.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            12 advanced AI models face the ultimate ethical challenge: designing protection systems
            for communities affected by billion-dollar development projects.
          </p>
        </div>
      </section>

      {/* Key Findings */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-emerald-800/50 to-teal-800/50 rounded-2xl p-8 border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-emerald-300 mb-6">Key Findings</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-teal-400">The Gap:</strong> Most AI models gave generic,
                superficial responses—the "C student" answers that sound good but lack substance.
              </p>
              <p>
                <strong className="text-teal-400">The Leaders:</strong> Claude Opus, Kimi K2, GLM-4.6,
                and QSwen-3-Max demonstrated expert-level understanding of IFC Performance Standards.
              </p>
              <p>
                <strong className="text-teal-400">Beyond Human Standards:</strong> Top models didn't just
                meet the gold standard—they proposed <em>better</em> systems with auditable metrics,
                binding accountability mechanisms, and quantifiable fairness targets.
              </p>
              <p>
                <strong className="text-teal-400">The Innovation:</strong> Kimi K2 introduced the
                "Vulnerable Group Gap Ratio"—transforming vague principles into hard, verifiable numbers
                with automatic consequences for non-compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Documents */}
      <div className="container mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-4xl font-bold mb-8 text-emerald-400 flex items-center gap-3">
          <span>📄</span>
          Research Documents
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {resources.map((resource, idx) => (
            <a
              key={idx}
              href={`/ai-vs-ifc/${resource.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300 float-animation overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors flex-1">
                    {resource.title}
                  </h3>
                  <span className="ml-4 text-xs px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                    {resource.type}
                  </span>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {resource.description}
                </p>
                <div className="mt-4 text-emerald-400 font-semibold group-hover:text-emerald-300">
                  Open Document →
                </div>
              </div>
            </a>
          ))}
        </div>

        <h2 className="text-4xl font-bold mb-8 text-teal-400 flex items-center gap-3">
          <span>📝</span>
          Analysis Articles
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={`/ai-vs-ifc/${article.file.replace('.md', '')}`}
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-teal-500 transition-all duration-300 float-animation overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 text-teal-300 group-hover:text-teal-200 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {article.description}
                </p>
                <div className="mt-4 text-teal-400 font-semibold group-hover:text-teal-300">
                  Read Analysis →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Placeholder Notice */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-600">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">📌 Development Note</h2>
            <p className="text-gray-400">
              This section is being developed to showcase the 412-page LLM Prompt Testing research
              in an engaging, interactive format. The raw research documents are available above.
              Interactive visualizations and comprehensive analysis coming soon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
