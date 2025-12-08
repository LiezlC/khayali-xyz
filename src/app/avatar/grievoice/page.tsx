export default function GrieVoicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Optional: Add a discrete back link */}
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
          src="/avatar/grievoice-agent.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="GrieVoice Agent - Community Grievance System"
        />
      </div>
    </div>
  );
}
