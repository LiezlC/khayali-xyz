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

      {/* YouTube Video Section */}
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-200">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">📺</span>
              <div>
                <h2 className="text-3xl font-bold text-teal-800">Watch the Demo</h2>
                <p className="text-gray-600">See GrieVoice in action</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Watch a comprehensive demonstration of the GrieVoice system, showcasing multilingual
              voice-powered grievance handling for worker empowerment.
            </p>
            <a
              href="https://youtu.be/g7-88fHFjz0?si=JV1qDnptQZm3-bWf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-colors text-white"
            >
              📺 Watch on YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Full embedded content */}
      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: '80vh' }}>
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
      </div>
    </div>
  );
}
