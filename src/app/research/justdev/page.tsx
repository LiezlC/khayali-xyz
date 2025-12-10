export default function JustDevPage() {
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
          src="/ai-vs-ifc/JustDev/index-enhanced.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="JustDev Framework - Just Development Rights & AI-Powered Enforcement"
        />
      </div>
    </div>
  );
}
