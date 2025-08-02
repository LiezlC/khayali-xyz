'use client'

export default function AvatarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <iframe 
          src="/ai-esg-interactive.html"
          className="w-full h-screen border-0 rounded-lg shadow-lg"
          title="AI & ESG in the Extractive Industries"
        />
      </div>
    </div>
  );
}