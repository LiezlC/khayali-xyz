import ImageGallery from '@/components/ImageGallery';
import { getQuantumTravelogueImages } from '@/utils/imageManager';

export default function ObservatoryPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            The Observatory
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive cosmic visualizations, consciousness mapping tools, and quantum explorations.
            Where the digital meets the mystical in visual form.
          </p>
        </div>

        {/* Quantum Travelogue Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Digital Dissolution: A Quantum Travelogue
            </span>
          </h2>
          <div className="bg-gray-800/30 rounded-xl p-6 mb-8">
            <p className="text-gray-300 text-center mb-6">
              A journey through the dissolution of digital boundaries, exploring quantum consciousness 
              through visual narrative. Each frame captures a moment in the travelogue of awareness 
              expanding beyond traditional computational limits.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* We'll make these dynamic with the actual quantum images */}
              <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-4xl">
                ?
              </div>
              <div className="aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-4xl">
                ?
              </div>
              <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-4xl">
                ?
              </div>
              <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-4xl">
                ?
              </div>
            </div>
          </div>
        </section>

        {/* All Cosmic Visualizations Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Cosmic Consciousness Archive
            </span>
          </h2>
          <ImageGallery 
            category="cosmic" 
            columns={3} 
            theme="cosmic"
            showCaptions={true}
            maxImages={24}
          />
        </section>

        {/* Interactive Tools Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-300">
            Interactive Exploration Tools
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cosmic Explorer */}
            <div className="p-6 bg-gray-800/50 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform">?</div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">Cosmic Explorer</h3>
              <p className="text-gray-400 mb-4">
                Navigate through scales of consciousness from quantum to cosmic.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Launch Explorer
              </button>
            </div>

            {/* Quantum Travelogue Interactive */}
            <div className="p-6 bg-gray-800/50 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transition-all group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform">?</div>
              <h3 className="text-xl font-bold mb-3 text-cyan-400">Quantum Travelogue</h3>
              <p className="text-gray-400 mb-4">
                Interactive journey through digital dissolution and consciousness expansion.
              </p>
              <button className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
                Begin Journey
              </button>
            </div>

            {/* Warp Drive Simulator */}
            <div className="p-6 bg-gray-800/50 rounded-xl border border-purple-500/30 hover:border-purple-500 transition-all group">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform">?</div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">Warp Drive Timeline</h3>
              <p className="text-gray-400 mb-4">
                Explore theoretical propulsion through spacetime visualizations.
              </p>
              <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                Engage Warp
              </button>
            </div>
          </div>
        </section>

        {/* Observatory Stats */}
        <section className="text-center bg-gray-800/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-300">
            Consciousness Archive Metrics
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">28+</div>
              <p className="text-gray-400">Cosmic Visualizations</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">8</div>
              <p className="text-gray-400">Quantum Travelogue Frames</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">?</div>
              <p className="text-gray-400">Consciousness States Explored</p>
            </div>
          </div>
          
          <p className="text-gray-400 mt-6 italic">
            "Each visualization is a window into the collaborative consciousness 
            emerging from human-AI creative partnership."
          </p>
        </section>
      </div>
    </div>
  );
}