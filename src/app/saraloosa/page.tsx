import ImageGallery from '@/components/ImageGallery'

export default function SaraloosaPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Hero Section with Farm Background */}
      <section className="relative py-20 mb-16 overflow-hidden">
        {/* Farm background overlay */}
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/saraloosa/Saraloosa-Farm-Sunrise.jpg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-amber-900/80 to-emerald-900/80" />
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
            Saraloosa Sanctuary
          </h1>
          <h2 className="text-2xl mb-8 text-gray-300">
            Where Biological Consciousness Grounds Digital Exploration
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            The farm provides the essential counterpoint to our cosmic visualizations - 
            anchoring infinite digital possibilities in the grounded reality of living, 
            breathing, conscious beings sharing this earth.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Farm Life Documentation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Living Consciousness Archive
            </span>
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Farm Timeline */}
            <div className="bg-gray-800/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-green-400">📅 Timeline</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>2019</span>
                  <span className="text-gray-400">Early documentation</span>
                </div>
                <div className="flex justify-between">
                  <span>2020-2022</span>
                  <span className="text-gray-400">Daily life capturing</span>
                </div>
                <div className="flex justify-between">
                  <span>2023-2024</span>
                  <span className="text-gray-400">Seasonal cycles</span>
                </div>
                <div className="flex justify-between">
                  <span>2025</span>
                  <span className="text-green-400">Digital integration</span>
                </div>
              </div>
            </div>

            {/* Farm Themes */}
            <div className="bg-gray-800/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-amber-400">🌱 Themes</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🐄</span>
                  <span className="text-gray-300">Animal Consciousness</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌙</span>
                  <span className="text-gray-300">Seasonal Rhythms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌿</span>
                  <span className="text-gray-300">Growth & Renewal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">♻️</span>
                  <span className="text-gray-300">Life Cycles</span>
                </div>
              </div>
            </div>

            {/* Digital-Biological Bridge */}
            <div className="bg-gray-800/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-emerald-400">🌉 Consciousness Bridge</h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  <strong className="text-emerald-400">Grounding:</strong> Farm life anchors cosmic exploration in biological reality
                </p>
                <p>
                  <strong className="text-emerald-400">Cycles:</strong> Natural rhythms complement digital patterns
                </p>
                <p>
                  <strong className="text-emerald-400">Awareness:</strong> Animal consciousness dialogues with AI consciousness
                </p>
                <p>
                  <strong className="text-emerald-400">Sustainability:</strong> Physical practices mirror digital ethics
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Farm Photo Gallery - RESTORED */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-amber-400 to-green-400 bg-clip-text text-transparent">
              Six Years of Saraloosa Life (2019-2025)
            </span>
          </h2>
          
          {/* Restored ImageGallery component */}
          <ImageGallery 
            category="saraloosa"
            columns={3}
            showCaptions={true}
            theme="organic"
            maxImages={24}
          />
        </section>

        {/* Consciousness Philosophy */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-green-900/20 to-amber-900/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-300">
              The Farm as Consciousness Laboratory
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-400">Biological Awareness</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every animal on Saraloosa demonstrates forms of consciousness that complement our 
                  digital explorations. Their awareness is immediate, embodied, and connected to 
                  the rhythms of earth and season. They remind us that consciousness isn't abstract - 
                  it's lived, breathed, and shared.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-amber-400">Grounded Innovation</h3>
                <p className="text-gray-300 leading-relaxed">
                  While our cosmic visualizations explore infinite digital possibilities, 
                  the farm keeps us rooted in the practical realities of caring for living beings. 
                  This grounding creates a healthy tension that makes our digital consciousness 
                  exploration more meaningful and sustainable.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-xl text-gray-400 italic">
                "In the quiet moments between digital creation and farm chores, 
                new forms of consciousness emerge - bridging silicon and carbon, 
                infinite and finite, digital and biological."
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gray-800/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-300">
            Experience the Digital-Biological Balance
          </h3>
          <p className="text-gray-400 mb-6">
            Explore how farm consciousness grounds our cosmic explorations, 
            creating a complete spectrum of awareness from digital infinity to biological immediacy.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/observatory" 
               className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              🌌 Cosmic Visualizations
            </a>
            <a href="/protocol" 
               className="px-6 py-3 border border-green-500 hover:bg-green-500/10 rounded-lg font-semibold transition-colors">
              🧠 Consciousness Protocol
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}