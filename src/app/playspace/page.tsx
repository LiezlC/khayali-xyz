'use client';

import { useState } from 'react';

type TabType = 'art' | 'farming' | 'futures';

export default function PlayspacePage() {
  const [activeTab, setActiveTab] = useState<TabType>('art');

  const artMindfulnessApps = [
    {
      title: 'Art & Mindfulness Bundle',
      description: 'Complete collection of creative and meditative experiences',
      path: '/applets/art-mindfulness-gumroad-bundle/index.html',
      category: 'Collection',
    },
  ];

  const farmingApps = [
    {
      title: 'BitSoil Farm',
      description: 'The Digital Detox farming experience',
      path: '/applets/farming-sim/bitsoil-farm-the-digital-detox/index.html',
    },
    {
      title: 'Cyber Bloom Synthesis',
      description: 'Futuristic botanical cultivation',
      path: '/applets/farming-sim/cyber-bloom-synthesis/index.html',
    },
    {
      title: 'Cyber Pastoral Farm',
      description: 'Interface between nature and technology',
      path: '/applets/farming-sim/cyber-pastoral-farm-interface/index.html',
    },
    {
      title: 'Dreamscape Forager',
      description: 'Harvest dreams in surreal landscapes',
      path: '/applets/farming-sim/dreamscape-forager/index.html',
    },
    {
      title: 'Nile Riverfront Builder',
      description: 'Ancient meets modern river management',
      path: '/applets/farming-sim/nile-riverfront-builder/index.html',
    },
    {
      title: 'Sunday Braai Simulator',
      description: 'South African barbecue tradition',
      path: '/applets/farming-sim/sunday-braai-simulator/index.html',
    },
    {
      title: 'Sunset Ranch Simulator',
      description: 'Golden hour pastoral management',
      path: '/applets/farming-sim/sunset-ranch-simulator/index.html',
    },
    {
      title: 'Synth Farm 2077',
      description: 'Agri-tech simulator from the future',
      path: '/applets/farming-sim/synth-farm-2077-agri-tech-simulator/index.html',
    },
    {
      title: 'Twin Peaks Tycoon',
      description: 'Mountain valley development',
      path: '/applets/farming-sim/twin-peaks-tycoon/index.html',
    },
    {
      title: 'Valley Estate Architect',
      description: 'Design your perfect valley homestead',
      path: '/applets/farming-sim/valley-estate-architect/index.html',
    },
    {
      title: 'VibesOnly Tycoon',
      description: 'The AI Influencer simulation',
      path: '/applets/farming-sim/vibesonly-tycoon-the-ai-influencer/index.html',
    },
    {
      title: 'VibeStack Viral Tycoon',
      description: 'Build your viral empire',
      path: '/applets/farming-sim/vibestack-viral-tycoon/index.html',
    },
  ];

  const futuresApps = [
    {
      title: 'Africa 2030: Digital Revolution',
      description: 'Simulate Africa\'s digital transformation',
      path: '/applets/speculative-ai-futures/africa-2030-the-digital-revolution-simulator/index.html',
    },
    {
      title: 'Africa\'s Single Digital Market 2030',
      description: 'Continental digital economy simulator',
      path: '/applets/speculative-ai-futures/africa-s-single-digital-market-2030-simulator/index.html',
    },
    {
      title: 'AGI Convergence Simulator',
      description: 'Explore artificial general intelligence emergence',
      path: '/applets/speculative-ai-futures/agi-convergence-simulator/index.html',
    },
    {
      title: 'AI Dog Translator',
      description: 'Decoding the bark with AI',
      path: '/applets/speculative-ai-futures/ai-dog-translator-decoding-the-bark/index.html',
    },
    {
      title: 'AI Dream Decoder',
      description: 'Neural dream interpretation interface',
      path: '/applets/speculative-ai-futures/ai-dream-decoder/index.html',
    },
    {
      title: 'AI Ethics: The Dilemma Engine',
      description: 'Navigate complex AI ethical scenarios',
      path: '/applets/speculative-ai-futures/ai-ethics-the-dilemma-engine/index.html',
    },
    {
      title: 'AI Futures: Alignment vs Convergence',
      description: 'Explore competing AI development paths',
      path: '/applets/speculative-ai-futures/ai-futures-alignment-vs-convergence/index.html',
    },
    {
      title: 'AI Office Chronicles',
      description: 'The workplace transformation game',
      path: '/applets/speculative-ai-futures/ai-office-chronicles-the-game/index.html',
    },
    {
      title: 'AI Reconstruction Protocol',
      description: 'Rebuild reality with artificial intelligence',
      path: '/applets/speculative-ai-futures/ai-reconstruction-protocol/index.html',
    },
    {
      title: 'Authentic Human Simulator',
      description: 'What does it mean to be authentically human?',
      path: '/applets/speculative-ai-futures/authentic-human-simulator/index.html',
    },
    {
      title: 'Beyond Automation: AI Lab',
      description: 'Research laboratory simulator',
      path: '/applets/speculative-ai-futures/beyond-automation-ai-lab-simulator/index.html',
    },
    {
      title: 'Brain 2.0: Evolution Simulator',
      description: 'Human cognitive enhancement pathways',
      path: '/applets/speculative-ai-futures/brain-2-0-evolution-simulator/index.html',
    },
    {
      title: 'Chronos Bridge: The Great Upload',
      description: 'Mind uploading simulation',
      path: '/applets/speculative-ai-futures/chronos-bridge-the-great-upload/index.html',
    },
    {
      title: 'Cyber Homestead OS',
      description: 'Digital-biological homesteading interface',
      path: '/applets/speculative-ai-futures/cyber-homestead-os/index.html',
    },
    {
      title: 'Cyber Shepherd OS',
      description: 'Pastoral management in the digital age',
      path: '/applets/speculative-ai-futures/cyber-shepherd-os/index.html',
    },
    {
      title: 'Digital Entropy Cube',
      description: 'Explore information decay and transformation',
      path: '/applets/speculative-ai-futures/digital-entropy-cube/index.html',
    },
    {
      title: 'Digital Sentience: The Synthesizer',
      description: 'Create artificial consciousness',
      path: '/applets/speculative-ai-futures/digital-sentience-the-synthesizer/index.html',
    },
    {
      title: 'EagleEye: Synthetic Chorus Protocol',
      description: 'Multi-agent consciousness coordination',
      path: '/applets/speculative-ai-futures/eagleeye-synthetic-chorus-protocol/index.html',
    },
    {
      title: 'FlamingoNE: The Turing Test',
      description: 'Distinguish human from AI',
      path: '/applets/speculative-ai-futures/flamingone-the-turing-test/index.html',
    },
    {
      title: 'Forever Alone: Companion Protocol',
      description: 'AI companionship futures',
      path: '/applets/speculative-ai-futures/forever-alone-companion-protocol/index.html',
    },
    {
      title: 'Mobius Data: Self-Referential Consciousness',
      description: 'Strange loops in information systems',
      path: '/applets/speculative-ai-futures/mobius-data-self-referential-consciousness/index.html',
    },
    {
      title: 'Neural Convergence Interface',
      description: 'Brain-computer interface simulation',
      path: '/applets/speculative-ai-futures/neural-convergence-interface/index.html',
    },
    {
      title: 'Neural Perception Visualizer',
      description: 'See the world through neural networks',
      path: '/applets/speculative-ai-futures/neural-perception-visualizer/index.html',
    },
    {
      title: 'Neural Synthesizer AI',
      description: 'Create music with neural networks',
      path: '/applets/speculative-ai-futures/neural-synthesizer-ai/index.html',
    },
    {
      title: 'Project Plato\'s Cave',
      description: 'Simulation architect and reality explorer',
      path: '/applets/speculative-ai-futures/project-plato-s-cave-simulation-architect/index.html',
    },
    {
      title: 'Singularity Reactor Control',
      description: 'Manage the emergence of superintelligence',
      path: '/applets/speculative-ai-futures/singularity-reactor-control/index.html',
    },
    {
      title: 'SoulQuery: The Organic Database',
      description: 'Query consciousness itself',
      path: '/applets/speculative-ai-futures/soulquery-the-organic-database/index.html',
    },
    {
      title: 'Strange Loops: Eternal Learning',
      description: 'Self-referential learning algorithms',
      path: '/applets/speculative-ai-futures/strange-loops-eternal-learning-algorithm/index.html',
    },
    {
      title: 'Symbiosis: Human-AI Resonance',
      description: 'Explore collaborative consciousness',
      path: '/applets/speculative-ai-futures/symbiosis-human-ai-resonance/index.html',
    },
    {
      title: 'Synapse: The Living Book',
      description: 'Interactive narrative consciousness',
      path: '/applets/speculative-ai-futures/synapse-the-living-book/index.html',
    },
    {
      title: 'Synth Mind: Neural Interface',
      description: 'Direct neural control simulation',
      path: '/applets/speculative-ai-futures/synth-mind-neural-interface/index.html',
    },
    {
      title: 'The AI Voice: Promise vs Peril',
      description: 'Interactive policy simulator',
      path: '/applets/speculative-ai-futures/the-ai-voice-promise-vs-peril-interactive-policy-simulator/index.html',
    },
    {
      title: 'The Algoriture: Influence Simulator',
      description: 'Algorithm-driven culture evolution',
      path: '/applets/speculative-ai-futures/the-algoriture-influence-simulator/index.html',
    },
    {
      title: 'The Ascension Protocol',
      description: 'Post-human transformation simulator',
      path: '/applets/speculative-ai-futures/the-ascension-protocol/index.html',
    },
    {
      title: 'The Asimov Interface',
      description: 'Robot ethics in practice',
      path: '/applets/speculative-ai-futures/the-asimov-interface/index.html',
    },
    {
      title: 'The Convergence Interface',
      description: 'Multiple intelligences merging',
      path: '/applets/speculative-ai-futures/the-convergence-interface/index.html',
    },
    {
      title: 'The Creator\'s Dilemma',
      description: 'Artificial beings and their makers',
      path: '/applets/speculative-ai-futures/the-creator-s-dilemma-artificial-beings/index.html',
    },
    {
      title: 'The Neural Cartographer',
      description: 'AI memory simulation explorer',
      path: '/applets/speculative-ai-futures/the-neural-cartographer-ai-memory-simulation/index.html',
    },
    {
      title: 'The Singularity Event',
      description: 'Experience the moment of technological transcendence',
      path: '/applets/speculative-ai-futures/the-singularity-event/index.html',
    },
    {
      title: 'The Tech Panic Playbook',
      description: 'Interactive tech fear response simulator',
      path: '/applets/speculative-ai-futures/the-tech-panic-playbook-interactive/index.html',
    },
    {
      title: 'Vibe Coding Simulator',
      description: 'Google AI Studio coding experience',
      path: '/applets/speculative-ai-futures/vibe-coding-simulator-google-ai-studio/index.html',
    },
    {
      title: 'Void Drifter: Event Horizon',
      description: 'Consciousness at the edge of reality',
      path: '/applets/speculative-ai-futures/void-drifter-event-horizon/index.html',
    },
    {
      title: 'Xeno Synthesis Lab',
      description: 'Create alien intelligence',
      path: '/applets/speculative-ai-futures/xeno-synthesis-lab/index.html',
    },
  ];

  const renderApps = () => {
    let apps = [];
    switch (activeTab) {
      case 'art':
        apps = artMindfulnessApps;
        break;
      case 'farming':
        apps = farmingApps;
        break;
      case 'futures':
        apps = futuresApps;
        break;
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app, index) => (
          <a
            key={index}
            href={app.path}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3 text-purple-400 group-hover:text-purple-300">
                {app.title}
              </h3>
              <p className="text-gray-400 mb-4">{app.description}</p>
              <span className="text-purple-400 hover:text-purple-300 font-semibold">
                Launch →
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/cosmic/grok/00e09f3f-a612-4214-915b-45b23c05c2f9.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-blue-900/80" />

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
            The Playspace
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Interactive experiences exploring consciousness, creativity, and possible futures.
            Dive into games, simulators, and thought experiments at the intersection of art,
            mindfulness, farming, and speculative AI.
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setActiveTab('art')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'art'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              🎨 Art & Mindfulness
            </button>
            <button
              onClick={() => setActiveTab('farming')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'farming'
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              🌾 Farming Simulators
            </button>
            <button
              onClick={() => setActiveTab('futures')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'futures'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              🔮 Speculative AI Futures
            </button>
          </div>

          {/* Apps Grid */}
          {renderApps()}
        </div>
      </section>
    </div>
  );
}
