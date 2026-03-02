import { notFound } from 'next/navigation';

const pdfFiles: Record<string, { title: string; description: string; file: string }> = {
  'Data Dragon ID Kit': {
    title: 'Data Dragon ID Kit',
    description: 'The essential field guide for identifying and classifying Data Dragons in the wild.',
    file: 'Data Dragon ID Kit.pdf',
  },
  'DragonDataIntro': {
    title: 'Dragon Data Introduction',
    description: 'An introduction to the Dragon Data course — setting the scene for data ethics through fantasy.',
    file: 'DragonDataIntro.pdf',
  },
  'Foundation_DataDecay': {
    title: 'Foundation: Data Decay',
    description: 'Exploring how data degrades over time and the dragons that emerge from information entropy.',
    file: 'Foundation_DataDecay.pdf',
  },
};

export function generateStaticParams() {
  return Object.keys(pdfFiles).map((name) => ({ name }));
}

export default async function PdfViewerPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const pdf = pdfFiles[decodedName];

  if (!pdf) {
    notFound();
  }

  const pdfUrl = `/dragon-data/${encodeURIComponent(pdf.file)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-emerald-900">
      {/* Header */}
      <div className="bg-gray-900/80 border-b border-gray-700">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/dragon-data"
              className="text-sm text-gray-300 hover:text-white underline"
            >
              ← Back to Dragon Data
            </a>
            <span className="text-gray-600">|</span>
            <span className="text-2xl">🐉</span>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                {pdf.title}
              </h1>
              <p className="text-gray-400 text-sm">{pdf.description}</p>
            </div>
          </div>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors text-white flex items-center gap-2"
          >
            📥 Download PDF
          </a>
        </div>
      </div>

      {/* PDF Embed */}
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
