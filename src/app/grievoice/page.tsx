// src/app/grievoice/page.tsx
export default function GrievoicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100">
      {/* Back link */}
      <div className="absolute top-4 left-4 z-10">
        <a
          href="/"
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          ← Back to Portfolio
        </a>
      </div>

      {/* Full embedded content */}
      <div className="h-screen">
        <iframe
          src="/grievoice/index.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="GrieVoice - AI-Powered Grievance Systems"
        />
      </div>
    </div>
  );
}
