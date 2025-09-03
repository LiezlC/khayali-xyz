export default function CreativePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
          src="/creative/creative-content.html" 
          style={{
            width: '100%', 
            height: '100%', 
            border: 'none'
          }}
          title="Creative Nexus - Collaborative Works"
        />
      </div>
    </div>
  );
}