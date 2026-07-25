export default function CreativePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">      {/* Full embedded content */}
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