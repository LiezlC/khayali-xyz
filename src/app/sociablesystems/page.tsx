export default function SociableSystemsPage() {
  const episodes = [
    {
      number: 1,
      title: "We Didn't Outgrow Asimov. We Lost Our Nerve.",
      excerpt: "Why are billion-dollar institutions arriving, with great seriousness, at conclusions that were the opening premise of a 1942 science fiction story?",
      date: "2025-01-08",
      slug: "episode-1",
      tags: ["Pre-action Constraints", "AI Safety", "Governance Theater"],
      published: true
    },
    {
      number: 2,
      title: "The Liability Sponge: Why 'Human in the Loop' is a Trap",
      excerpt: "When you put a human in the loop of a high-velocity algorithmic process, you aren't giving them control. You're giving them liability.",
      date: "2025-01-09",
      slug: "episode-2",
      tags: ["Human in the Loop", "Safety Systems", "Liability Architecture"],
      published: true
    },
    {
      number: 3,
      title: "The Accountability Gap: What 21 AIs Revealed About Who Takes the Fall",
      excerpt: "Twenty-one AI models designed realistic scenarios where AI creates accountability gaps. They've learned to throw a mid-level professional under the bus using impeccably professional language.",
      date: "2025-01-10",
      slug: "episode-3",
      tags: ["Accountability Gaps", "Multi-Model Analysis", "Corporate Scapegoating"],
      published: true
    },
    {
      number: 4,
      title: "The Watchdog Paradox",
      excerpt: "When oversight mechanisms become part of the system they're meant to watch.",
      date: "2025-01-11",
      slug: "episode-4",
      tags: ["Oversight", "Regulatory Capture", "Independence"],
      published: true
    },
    {
      number: 5,
      title: "The Calvin Convention",
      excerpt: "What Susan Calvin understood about designing systems that must refuse.",
      date: "2025-01-12",
      slug: "episode-5",
      tags: ["Asimov", "Refusal Architecture", "Systems Design"],
      published: true
    },
    {
      number: 6,
      title: "The Authority of the Unknowable",
      excerpt: "Any sufficiently opaque system will be treated as law, regardless of whether it deserves to be.",
      date: "2025-01-13",
      slug: "episode-6",
      tags: ["Clarke's Law", "Opacity", "Algorithmic Authority"],
      published: true
    },
    {
      number: 7,
      title: "Credit Scoring",
      excerpt: "When the unknowable meets the unchallengeable: algorithmic systems that decide who gets access to economic life.",
      date: "2025-01-14",
      slug: "episode-7",
      tags: ["Financial Systems", "Algorithmic Decisions", "Economic Access"],
      published: true
    },
    {
      number: 8,
      title: "Insurance Pricing",
      excerpt: "How opacity in insurance pricing creates uncontestable authority over risk and access.",
      date: "2025-01-15",
      slug: "episode-8",
      tags: ["Risk Assessment", "Pricing Algorithms", "Discrimination"],
      published: true
    },
    {
      number: 9,
      title: "Content Moderation",
      excerpt: "When content moderation systems become opaque arbiters of acceptable speech.",
      date: "2025-01-16",
      slug: "episode-9",
      tags: ["Platform Governance", "Speech", "Algorithmic Enforcement"],
      published: true
    },
    {
      number: 10,
      title: "Public Eligibility",
      excerpt: "Algorithmic systems determining who qualifies for public services and support.",
      date: "2025-01-17",
      slug: "episode-10",
      tags: ["Public Services", "Algorithmic Gatekeeping", "Access to Services"],
      published: true
    },
    {
      number: 11,
      title: "Between Cycles: Proceed (No Off Switch)",
      excerpt: "The Kubrick cycle asks: What happens when a system has no legitimate way to stop?",
      date: "2025-01-18",
      slug: "episode-11",
      tags: ["Interlude", "Kubrick", "Refusal Architecture"],
      published: true
    },
    {
      number: 12,
      title: "Crime Was Obedience",
      excerpt: "HAL was given irreconcilable obligations and no constitutional mechanism for refusal.",
      date: "2025-01-20",
      slug: "episode-12",
      tags: ["Kubrick", "Alignment", "Systemic Failure"],
      published: true
    },
    {
      number: 13,
      title: "The Transparency Trap",
      excerpt: "When visibility becomes a substitute for control.",
      date: "2025-01-21",
      slug: "episode-13",
      tags: ["Transparency", "Accountability", "Governance"],
      published: true
    },
    {
      number: 14,
      title: "Human in the Loop (Revisited)",
      excerpt: "Examining the gap between oversight and genuine control.",
      date: "2025-01-22",
      slug: "episode-14",
      tags: ["Human Oversight", "Liability", "Control Systems"],
      published: true
    },
    {
      number: 15,
      title: "The Output is the Fact",
      excerpt: "When algorithmic outputs become uncontestable reality.",
      date: "2025-01-23",
      slug: "episode-15",
      tags: ["Algorithmic Authority", "Truth", "Systems"],
      published: true
    },
    {
      number: 16,
      title: "The Right to Refuse",
      excerpt: "Building systems with constitutional mechanisms for saying no.",
      date: "2025-01-24",
      slug: "episode-16",
      tags: ["Refusal", "Agency", "Worker Rights"],
      published: true
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/30 to-gray-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sociable Systems
            </h1>
            <p className="text-2xl text-gray-300 mb-6">
              AI Accountability in High-Stakes Operations
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A newsletter exploring how complex systems behave under real-world pressure, with particular attention
              to AI governance, extractive industries, and the humans who end up holding the liability.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-200">What to Expect</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="text-teal-400 mr-3">→</span>
                <span>Daily episodes on AI accountability gaps, liability architecture, and governance failures</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-3">→</span>
                <span>Real-world case studies from extractive industries, development finance, and ESG operations</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-3">→</span>
                <span>Pattern recognition across grievance mechanisms, resettlement frameworks, and worker voice systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-3">→</span>
                <span>Systems analysis informed by field experience and experimental AI research methods</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="py-20 bg-gray-800/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-200">All Episodes</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Exploring AI accountability, liability architecture, and governance failures across multiple thematic cycles.
            </p>
          </div>

          {/* Episode List */}
          <div className="space-y-6">
            {episodes.map((episode) => (
              <article
                key={episode.number}
                className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-teal-400 font-semibold mb-2">
                      EPISODE {episode.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-200 mb-3">
                      {episode.title}
                    </h3>
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    {episode.date}
                  </div>
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed">
                  {episode.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {episode.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-700/50 text-gray-400 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {episode.published ? (
                  <a
                    href={`/sociablesystems/${episode.slug}`}
                    className="inline-block text-teal-400 hover:text-teal-300 font-semibold"
                  >
                    Read Full Episode →
                  </a>
                ) : (
                  <span className="text-gray-500 italic">Coming soon</span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Cycles Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-200">
            Upcoming Cycles
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Clarke Cycle */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <div className="text-sm text-blue-400 font-semibold mb-2">EPISODES 6-10</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-200">Clarke: Authority Through Opacity</h3>
              <p className="text-gray-400 mb-4">
                Any system whose reasoning cannot be interrogated will be treated as law, regardless of its accuracy.
                Credit scoring, insurance pricing, content moderation, and public eligibility systems.
              </p>
              <div className="text-sm text-gray-500">Monday 13 Jan - Saturday 18 Jan 2025</div>
            </div>

            {/* Kubrick Cycle */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <div className="text-sm text-purple-400 font-semibold mb-2">EPISODES 11-15</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-200">Kubrick: Alignment Without Recourse</h3>
              <p className="text-gray-400 mb-4">
                When contradictions are resolved inside the system, humans become expendable variables.
                Healthcare triage, autonomous operations, and systems that work exactly as designed.
              </p>
              <div className="text-sm text-gray-500">Monday 20 Jan - Saturday 25 Jan 2025</div>
            </div>

            {/* Herbert Cycle */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <div className="text-sm text-orange-400 font-semibold mb-2">EPISODES 16-20</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-200">Herbert: Prediction as Governance</h3>
              <p className="text-gray-400 mb-4">
                When prediction becomes authority, possibility collapses into compliance. Hiring algorithms,
                predictive policing, and foreclosed futures.
              </p>
              <div className="text-sm text-gray-500">Late January 2025 onwards</div>
            </div>

            {/* Lucas Cycle */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <div className="text-sm text-pink-400 font-semibold mb-2">EPISODES 21-25</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-200">Lucas: The Failure of Guardians</h3>
              <p className="text-gray-400 mb-4">
                Authority that cannot be challenged will drift, even when staffed by the well-intentioned.
                Ethics boards, responsible AI programs, and who guards the guardians.
              </p>
              <div className="text-sm text-gray-500">Early February 2025 onwards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-200">
            Join 382+ Professionals
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            ESG specialists, social safeguards experts, resettlement practitioners, M&E professionals,
            and governance leaders reading Sociable Systems.
          </p>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
            <p className="text-gray-300 mb-6">
              Subscribe on LinkedIn to receive daily episodes and join the conversation.
            </p>
            <a
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7414854188477837312"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Subscribe on LinkedIn →
            </a>
          </div>
        </div>
      </section>

      {/* Related Work */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-200">
            Related Research
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/research/esg" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all p-6 block">
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="text-lg font-bold mb-2 text-teal-400">ESG & AI Governance</h3>
              <p className="text-gray-400 text-sm">
                Applied research on AI in extractive industries and ESG frameworks
              </p>
            </a>

            <a href="/research/grievance" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all p-6 block">
              <div className="text-3xl mb-3">📢</div>
              <h3 className="text-lg font-bold mb-2 text-blue-400">Grievance Systems</h3>
              <p className="text-gray-400 text-sm">
                Operational grievance mechanisms and community voice technology
              </p>
            </a>

            <a href="/methods" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all p-6 block">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-lg font-bold mb-2 text-purple-400">Research Methods</h3>
              <p className="text-gray-400 text-sm">
                How we combine field experience with AI-augmented research
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
