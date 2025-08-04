// src/app/esg/page.tsx - Clean standalone page for ESG content
export default function ESGPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Minimal header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">
            AI & ESG in Extractive Industries
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive analysis and framework
          </p>
        </div>
      </div>

      {/* Full-screen embedded content */}
      <div className="h-[calc(100vh-80px)]">
        <iframe 
          src="/avatar/esg-content.html" 
          style={{
            width: '100%', 
            height: '100%', 
            border: 'none',
            display: 'block'
          }}
          title="AI & ESG in Extractive Industries - Complete Analysis"
        />
      </div>
    </div>
  );
}