import ImageGallery from '@/components/ImageGallery';

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

        {/* Cosmic Visualizations Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Cosmic Consciousness Visualizations
            </span>
          </h2>
          <ImageGallery 
            category="cosmic" 
            columns={3} 
            theme="cosmic"
            showCaptions={true}
          />
        </section>

        {/* Interactive Tools Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-300">
            Interactive Exploration Tools
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cosmic Explorer */}
            <div className="p-6 bg-gray-800/50 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4 text-center">?</div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">Cosmic Explorer</h3>
              <p className="text-gray-400 mb-4">
                Navigate through scales of consciousness from quantum to cosmic.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Launch Explorer
              </button>
            </div>

            {/* Warp Drive Simulator */}
            <div className="p-6 bg-gray-800/50 rounded-xl border border-purple-500/30 hover:border-purple-500 transition-all">
              <div className="text-4xl mb-4 text-center">?</div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">Warp Drive Timeline</h3>
              <p className="text-gray-400 mb-4">
                Explore theoretical propulsion through spacetime visualizations.
              </p>
              <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                Engage Warp
              </button>
            </div>

            {/* Quantum Visualizer */}
            <div className="p-6 bg-gray-800/50 rounded-xl border border-teal-500/30 hover:border-teal-500 transition-all">
              <div className="text-4xl mb-4 text-center">??</div>
              <h3 className="text-xl font-bold mb-3 text-teal-400">Quantum Foam</h3>
              <p className="text-gray-400 mb-4">
                Visualize quantum mechanics and consciousness entanglement.
              </p>
              <button className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors">
                Observe Quantum
              </button>
            </div>
          </div>
        </section>

        {/* Upload Instructions */}
        <section className="text-center bg-gray-800/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-300">
            Ready to Populate with Your Visualizations
          </h3>
          <p className="text-gray-400 mb-6">
            Upload your cosmic consciousness images to see them integrated throughout the Observatory.
            Each visualization will be automatically categorized and made interactive.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/LiezlC/khayali-xyz/upload/main/public/images/cosmic" 
               target="_blank"
               className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              Upload to GitHub
            </a>
            <button className="px-6 py-3 border border-purple-500 hover:bg-purple-500/10 rounded-lg font-semibold transition-colors">
              View Upload Guide
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}