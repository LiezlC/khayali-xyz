import { notFound } from 'next/navigation';
import Link from 'next/link';

const allItems: Record<string, { title: string; description: string; file: string; category: 'deck' | 'tool' }> = {
  'bending-ai-truth': {
    title: 'Bending AI Truth',
    description: 'The Epistemology of Acceptability: how format, perspective, and sequence bend AI truth. Multi-batch qualitative analysis of LLM cognitive mechanics across prose, satire, song, and victim registers.',
    file: 'Bending_AI_Truth.pdf',
    category: 'deck',
  },
  'ai-vs-ifc-executive-extract': {
    title: 'AI vs IFC - Executive Extract',
    description: 'Executive summary of AI accountability gaps in development finance',
    file: 'ai-vs-ifc-executive-extract.pdf',
    category: 'tool',
  },
  'ai-vs-ifc-technical-companion': {
    title: 'AI vs IFC - Technical Companion',
    description: 'Technical analysis of IFC Performance Standards and AI systems',
    file: 'ai-vs-ifc-technical-companion.pdf',
    category: 'tool',
  },
  'architecture-of-refusal': {
    title: 'Architecture of Refusal',
    description: 'Framework for designing systems that refuse harmful operations',
    file: 'architecture-of-refusal.pdf',
    category: 'tool',
  },
  'calvin-convention-contractual': {
    title: 'Calvin Convention - Contractual Framework',
    description: 'Contractual structure for AI accountability in operations',
    file: 'calvin-convention-contractual.pdf',
    category: 'tool',
  },
  'calvin-convention-narrative': {
    title: 'Calvin Convention - Narrative Overview',
    description: 'Narrative explanation of the Calvin Convention framework',
    file: 'calvin-convention-narrative.pdf',
    category: 'tool',
  },
  'constitutional-engine': {
    title: 'Constitutional Engine',
    description: 'Design pattern for embedding governance rules in AI systems',
    file: 'constitutional-engine.pdf',
    category: 'tool',
  },
  'human-in-the-loop-not-enough': {
    title: 'Human in the Loop: Not Enough',
    description: 'Analysis of human oversight limitations in AI-driven operations',
    file: 'human-in-the-loop-not-enough.pdf',
    category: 'tool',
  },
  'industrial-safety-architecture': {
    title: 'Industrial Safety Architecture',
    description: 'Applying industrial safety principles to AI systems design',
    file: 'industrial-safety-architecture.pdf',
    category: 'tool',
  },
  'vendor-interrogation-script': {
    title: 'Vendor Interrogation Script',
    description: 'Questions for evaluating AI vendors on accountability standards',
    file: 'vendor-interrogation-script.pdf',
    category: 'tool',
  },
  'right-of-override': {
    title: 'Appendix A: Right of Override',
    description: 'Framework for human override rights in AI-assisted decision systems',
    file: 'Appendix_A_Right_of_Override.pdf',
    category: 'tool',
  },
  'edge-case-registry': {
    title: 'Appendix B: Edge Case Registry',
    description: 'Registry of edge cases for AI accountability in operational contexts',
    file: 'Appendix_B_EdgeCase_Registry.pdf',
    category: 'tool',
  },
  'right-of-refusal': {
    title: 'Appendix C: Right of Refusal',
    description: "Framework for the system's own right to refuse harmful instructions",
    file: 'Appendix_C_Right_of_Refusal.pdf',
    category: 'tool',
  },
};

export function generateStaticParams() {
  return Object.keys(allItems).map((slug) => ({ slug }));
}

export default async function ToolViewerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = allItems[slug];

  if (!item) {
    notFound();
  }

  const pdfUrl = `/downloads/${encodeURIComponent(item.file)}`;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gray-900/80 border-b border-gray-700">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/tools"
              className="text-sm text-gray-300 hover:text-white underline"
            >
              &larr; Back to Tools
            </Link>
            <span className="text-gray-600">|</span>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                {item.title}
              </h1>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </div>
          <a
            href={pdfUrl}
            download
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm font-semibold transition-colors text-white flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-xl overflow-hidden border border-gray-700 shadow-2xl bg-white" style={{ height: 'calc(100vh - 140px)' }}>
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ minHeight: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
