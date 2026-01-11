export default function ToolsPage() {
  const tools = [
    {
      title: "AI vs IFC - Executive Extract",
      description: "Executive summary of AI accountability gaps in development finance",
      file: "ai-vs-ifc-executive-extract.pdf"
    },
    {
      title: "AI vs IFC - Technical Companion",
      description: "Technical analysis of IFC Performance Standards and AI systems",
      file: "ai-vs-ifc-technical-companion.pdf"
    },
    {
      title: "Architecture of Refusal",
      description: "Framework for designing systems that refuse harmful operations",
      file: "architecture-of-refusal.pdf"
    },
    {
      title: "Calvin Convention - Contractual Framework",
      description: "Contractual structure for AI accountability in operations",
      file: "calvin-convention-contractual.pdf"
    },
    {
      title: "Calvin Convention - Narrative Overview",
      description: "Narrative explanation of the Calvin Convention framework",
      file: "calvin-convention-narrative.pdf"
    },
    {
      title: "Constitutional Engine",
      description: "Design pattern for embedding governance rules in AI systems",
      file: "constitutional-engine.pdf"
    },
    {
      title: "Human in the Loop: Not Enough",
      description: "Analysis of human oversight limitations in AI-driven operations",
      file: "human-in-the-loop-not-enough.pdf"
    },
    {
      title: "Industrial Safety Architecture",
      description: "Applying industrial safety principles to AI systems design",
      file: "industrial-safety-architecture.pdf"
    },
    {
      title: "Vendor Interrogation Script",
      description: "Questions for evaluating AI vendors on accountability standards",
      file: "vendor-interrogation-script.pdf"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Tools
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Practical frameworks, interrogation scripts, and architectural patterns for AI accountability in high-stakes operations.
        </p>

        <div className="grid gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-all"
            >
              <h2 className="text-2xl font-bold text-white mb-2">{tool.title}</h2>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              <a
                href={`/downloads/${tool.file}`}
                download
                className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
