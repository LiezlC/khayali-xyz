// src/app/avatar/page.tsx
export default function AvatarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: `
              <iframe 
                src="/avatar/esg-content.html" 
                style="width: 100%; height: 100vh; border: none;"
                title="AI & ESG in Extractive Industries"
              />
            `
          }}
        />
      </div>
    </div>
  );
}