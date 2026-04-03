import Link from 'next/link';

export default function ToolsPage() {
  const visualDecks = [
    {
      slug: 'bending-ai-truth',
      title: 'Bending AI Truth',
      description: 'The Epistemology of Acceptability: how format, perspective, and sequence bend AI truth. Multi-batch qualitative analysis of LLM cognitive mechanics across prose, satire, song, and victim registers.',
      file: 'Bending_AI_Truth.pdf',
    },
  ];

  const tools = [
    {
      slug: 'ai-vs-ifc-executive-extract',
      title: 'AI vs IFC - Executive Extract',
      description: 'Executive summary of AI accountability gaps in development finance',
      file: 'ai-vs-ifc-executive-extract.pdf',
    },
    {
      slug: 'ai-vs-ifc-technical-companion',
      title: 'AI vs IFC - Technical Companion',
      description: 'Technical analysis of IFC Performance Standards and AI systems',
      file: 'ai-vs-ifc-technical-companion.pdf',
    },
    {
      slug: 'architecture-of-refusal',
      title: 'Architecture of Refusal',
      description: 'Framework for designing systems that refuse harmful operations',
      file: 'architecture-of-refusal.pdf',
    },
    {
      slug: 'calvin-convention-contractual',
      title: 'Calvin Convention - Contractual Framework',
      description: 'Contractual structure for AI accountability in operations',
      file: 'calvin-convention-contractual.pdf',
    },
    {
      slug: 'calvin-convention-narrative',
      title: 'Calvin Convention - Narrative Overview',
      description: 'Narrative explanation of the Calvin Convention framework',
      file: 'calvin-convention-narrative.pdf',
    },
    {
      slug: 'constitutional-engine',
      title: 'Constitutional Engine',
      description: 'Design pattern for embedding governance rules in AI systems',
      file: 'constitutional-engine.pdf',
    },
    {
      slug: 'human-in-the-loop-not-enough',
      title: 'Human in the Loop: Not Enough',
      description: 'Analysis of human oversight limitations in AI-driven operations',
      file: 'human-in-the-loop-not-enough.pdf',
    },
    {
      slug: 'industrial-safety-architecture',
      title: 'Industrial Safety Architecture',
      description: 'Applying industrial safety principles to AI systems design',
      file: 'industrial-safety-architecture.pdf',
    },
    {
      slug: 'vendor-interrogation-script',
      title: 'Vendor Interrogation Script',
      description: 'Questions for evaluating AI vendors on accountability standards',
      file: 'vendor-interrogation-script.pdf',
    },
    {
      slug: 'right-of-override',
      title: 'Appendix A: Right of Override',
      description: 'Framework for human override rights in AI-assisted decision systems',
      file: 'Appendix_A_Right_of_Override.pdf',
    },
    {
      slug: 'edge-case-registry',
      title: 'Appendix B: Edge Case Registry',
      description: 'Registry of edge cases for AI accountability in operational contexts',
      file: 'Appendix_B_EdgeCase_Registry.pdf',
    },
    {
      slug: 'right-of-refusal',
      title: 'Appendix C: Right of Refusal',
      description: "Framework for the system's own right to refuse harmful instructions",
      file: 'Appendix_C_Right_of_Refusal.pdf',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Tools
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Practical frameworks, interrogation scripts, and architectural patterns for AI accountability in high-stakes operations.
        </p>

        <h2 className="text-3xl font-bold mb-6 text-teal-400">Visual Decks</h2>
        <p className="text-gray-400 mb-8">
          Presentation decks from the Sideways Arc and related AI interpretability research.
        </p>
        <div className="grid gap-6 mb-16">
          {visualDecks.map((deck) => (
            <div
              key={deck.slug}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-all"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{deck.title}</h3>
              <p className="text-gray-400 mb-4">{deck.description}</p>
              <div className="flex gap-3">
                <Link
                  href={`/tools/${deck.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </Link>
                <a
                  href={`/downloads/${deck.file}`}
                  download
                  className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-6 text-teal-400">Frameworks &amp; Tools</h2>
        <div className="grid gap-6">
          {tools.map((tool) => (
            <div
              key={tool.slug}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-all"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{tool.title}</h3>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              <div className="flex gap-3">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </Link>
                <a
                  href={`/downloads/${tool.file}`}
                  download
                  className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
