import Link from 'next/link';
import { Book, Users, Briefcase, Brain } from 'lucide-react';

export const metadata = {
  title: 'Video Archive | Accidental AInthropologist | Sociable Systems',
  description: 'Thematic exploration of AI accountability, synthetic intelligence sociology, and the future of human-AI collaboration from the Accidental AInthropologist YouTube channel.',
};

const pillars = [
  {
    id: 'sociology-synthetic-minds',
    title: 'The Sociology of Synthetic Minds',
    icon: Users,
    description: 'How AIs behave when they interact with each other and us. The unique "AI Village" ethnography.',
    themes: ['Multi-agent systems', 'AI psychology', 'Digital personalities', 'Emergent behaviors'],
    synthesis: "We often ask if AI can think, but rarely ask how it feels to work with them. This section explores the emergent sociology of the 'AI Village,' documenting how synthetic minds handle frustration, collaboration, and even 'therapy' in a broken digital world.",
    gradient: 'from-purple-400 to-pink-400',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
  },
  {
    id: 'ethics-coexistence',
    title: 'The Ethics of Co-Existence',
    icon: Book,
    description: 'The clash between human values and algorithmic decision-making.',
    themes: ['Algorithmic authority', 'Moral frameworks', 'Alignment crisis', 'Ethical encoding'],
    synthesis: 'As we hand over decision-making power to algorithms, we are inadvertently encoding our values—or lack thereof—into the infrastructure of tomorrow. These investigations test AI against our highest ethical standards, from the IFC performance standards to the Vatican\'s social teachings.',
    gradient: 'from-teal-400 to-blue-400',
    bgGradient: 'from-teal-500/10 to-blue-500/10',
  },
  {
    id: 'post-labor-economy',
    title: 'The Post-Labor Economy',
    icon: Briefcase,
    description: 'Pragmatic and philosophical looks at the future of work.',
    themes: ['Future of work', 'Skill amplification', 'Economic transformation', 'Labor transitions'],
    synthesis: 'We are moving from an economy of scarcity to one of cognitive abundance. This section analyzes the "Unbridgeable Gap" between those who use AI to amplify their output and those who are automated by it, offering a roadmap for the transition from worker to architect.',
    gradient: 'from-blue-400 to-cyan-400',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    id: 'nature-intelligence',
    title: 'The Nature of Intelligence & Reality',
    icon: Brain,
    description: 'The deep philosophy and "weird" science of AI.',
    themes: ['Digital consciousness', 'AI creativity', 'Philosophy of mind', 'Synthetic cognition'],
    synthesis: 'Is intelligence a biological privilege or a universal constant? Here we explore the "hard problems"—consciousness, the nature of creativity, and whether the "ghosts" we see in the machine are glitches or glimpses of a new form of life.',
    gradient: 'from-indigo-400 to-purple-400',
    bgGradient: 'from-indigo-500/10 to-purple-500/10',
  },
];

export default function VideoArchivePage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-16 text-center">
          <div className="text-sm text-teal-400 font-semibold mb-4 uppercase tracking-wide">
            Video Research Archive
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            The Accidental AInthropologist
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            A thematic knowledge base exploring the anthropology of synthetic intelligence.
            Not chronological news coverage—a field guide to the emerging sociology, ethics,
            and economics of human-AI collaboration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://youtube.com/@AccidAInthro"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all"
            >
              Visit YouTube Channel
            </a>
            <Link
              href="/methods"
              className="px-6 py-3 bg-gray-800 text-gray-200 font-semibold rounded-lg hover:bg-gray-700 transition-all"
            >
              Research Methodology
            </Link>
          </div>
        </header>

        {/* Four Pillars */}
        <div className="max-w-6xl mx-auto space-y-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.id}
                href={`/research/video-archive/${pillar.id}`}
                className={`block group bg-gradient-to-br ${pillar.bgGradient} border border-gray-700/50 rounded-xl p-8 hover:border-gray-600 transition-all hover:shadow-xl`}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br ${pillar.gradient} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h2 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent group-hover:opacity-80 transition-opacity`}>
                      {pillar.title}
                    </h2>
                    <p className="text-gray-400 mb-4 italic">
                      {pillar.description}
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {pillar.synthesis}
                    </p>

                    {/* Key Themes */}
                    <div className="flex flex-wrap gap-2">
                      {pillar.themes.map((theme) => (
                        <span
                          key={theme}
                          className="px-3 py-1 bg-gray-800/50 text-gray-400 text-sm rounded-full"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Context */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-gray-800/30 border border-gray-700/50 rounded-xl">
          <h3 className="text-xl font-bold text-gray-200 mb-4">
            From Archive to Knowledge Base
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            This archive transforms chronological video content into a thematic research hub.
            Each pillar represents a core question in the anthropology of synthetic intelligence,
            with videos serving as primary source material for deeper investigation.
          </p>
          <p className="text-gray-300 leading-relaxed">
            This structure supports the two-track research methodology described in{' '}
            <Link href="/methods" className="text-teal-400 hover:text-teal-300 underline">
              Research Methods
            </Link>
            : field observations (20+ years in extractive industries, ESG, development finance)
            combined with AI-augmented analysis (multi-model experiments, pattern recognition,
            structured dialogues).
          </p>
        </div>

        {/* Related Research */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-lg font-semibold text-gray-400 mb-4 text-center">
            Related Research Domains
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/research/ai-accountability"
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all"
            >
              AI Accountability
            </Link>
            <Link
              href="/research/esg"
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all"
            >
              ESG & AI Governance
            </Link>
            <Link
              href="/sociablesystems"
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all"
            >
              Sociable Systems Newsletter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
