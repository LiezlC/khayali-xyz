export default function ESGAgentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Back link */}
      <div className="absolute top-4 left-4 z-10">
        <a
          href="/research"
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          ← Back to Research
        </a>
      </div>

      {/* Full embedded content */}
      <div className="h-screen">
        <iframe
          src="/avatar/esg-content.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="AI & ESG in Extractive Industries - Interactive Research Application"
        />
      </div>
    </div>
  );
}
