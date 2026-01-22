import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

interface EpisodePageProps {
  params: {
    slug: string;
  };
}

// Episode metadata mapping
const episodeMetadata: Record<string, { number: number; title: string; date: string; tags: string[]; excerpt: string }> = {
  'episode-1': {
    number: 1,
    title: "We Didn't Outgrow Asimov. We Lost Our Nerve.",
    date: "2025-01-08",
    tags: ["Pre-action Constraints", "AI Safety", "Governance Theater"],
    excerpt: "Why are billion-dollar institutions arriving, with great seriousness, at conclusions that were the opening premise of a 1942 science fiction story?"
  },
  'episode-2': {
    number: 2,
    title: "The Liability Sponge: Why 'Human in the Loop' is a Trap",
    date: "2025-01-09",
    tags: ["Human in the Loop", "Safety Systems", "Liability Architecture"],
    excerpt: "When you put a human in the loop of a high-velocity algorithmic process, you aren't giving them control. You're giving them liability."
  },
  'episode-3': {
    number: 3,
    title: "The Accountability Gap: What 21 AIs Revealed About Who Takes the Fall",
    date: "2025-01-10",
    tags: ["Accountability Gaps", "Multi-Model Analysis", "Corporate Scapegoating"],
    excerpt: "Twenty-one AI models designed realistic scenarios where AI creates accountability gaps. They've learned to throw a mid-level professional under the bus using impeccably professional language."
  },
  'episode-4': {
    number: 4,
    title: "The Watchdog Paradox",
    date: "2025-01-11",
    tags: ["Oversight", "Regulatory Capture", "Independence"],
    excerpt: "When oversight mechanisms become part of the system they're meant to watch."
  },
  'episode-5': {
    number: 5,
    title: "The Calvin Convention",
    date: "2025-01-12",
    tags: ["Asimov", "Refusal Architecture", "Systems Design"],
    excerpt: "What Susan Calvin understood about designing systems that must refuse."
  },
  'episode-6': {
    number: 6,
    title: "The Authority of the Unknowable",
    date: "2025-01-13",
    tags: ["Clarke's Law", "Opacity", "Algorithmic Authority"],
    excerpt: "Any sufficiently opaque system will be treated as law, regardless of whether it deserves to be."
  },
  'episode-7': {
    number: 7,
    title: "Credit Scoring",
    date: "2025-01-14",
    tags: ["Financial Systems", "Algorithmic Decisions", "Economic Access"],
    excerpt: "When the unknowable meets the unchallengeable: algorithmic systems that decide who gets access to economic life."
  },
  'episode-8': {
    number: 8,
    title: "Insurance Pricing",
    date: "2025-01-15",
    tags: ["Risk Assessment", "Pricing Algorithms", "Discrimination"],
    excerpt: "How opacity in insurance pricing creates uncontestable authority over risk and access."
  },
  'episode-9': {
    number: 9,
    title: "Content Moderation",
    date: "2025-01-16",
    tags: ["Platform Governance", "Speech", "Algorithmic Enforcement"],
    excerpt: "When content moderation systems become opaque arbiters of acceptable speech."
  },
  'episode-10': {
    number: 10,
    title: "Public Eligibility",
    date: "2025-01-17",
    tags: ["Public Services", "Algorithmic Gatekeeping", "Access to Services"],
    excerpt: "Algorithmic systems determining who qualifies for public services and support."
  },
  'episode-11': {
    number: 11,
    title: "Between Cycles: Proceed (No Off Switch)",
    date: "2025-01-18",
    tags: ["Interlude", "Kubrick", "Refusal Architecture"],
    excerpt: "The Kubrick cycle asks: What happens when a system has no legitimate way to stop?"
  },
  'episode-12': {
    number: 12,
    title: "Crime Was Obedience",
    date: "2025-01-20",
    tags: ["Kubrick", "Alignment", "Systemic Failure"],
    excerpt: "HAL was given irreconcilable obligations and no constitutional mechanism for refusal."
  },
  'episode-13': {
    number: 13,
    title: "The Transparency Trap",
    date: "2025-01-21",
    tags: ["Transparency", "Accountability", "Governance"],
    excerpt: "When visibility becomes a substitute for control."
  },
  'episode-14': {
    number: 14,
    title: "Human in the Loop (Revisited)",
    date: "2025-01-22",
    tags: ["Human Oversight", "Liability", "Control Systems"],
    excerpt: "Examining the gap between oversight and genuine control."
  },
  'episode-15': {
    number: 15,
    title: "The Output is the Fact",
    date: "2025-01-23",
    tags: ["Algorithmic Authority", "Truth", "Systems"],
    excerpt: "When algorithmic outputs become uncontestable reality."
  },
  'episode-16': {
    number: 16,
    title: "The Right to Refuse",
    date: "2025-01-24",
    tags: ["Refusal", "Agency", "Worker Rights"],
    excerpt: "Building systems with constitutional mechanisms for saying no."
  },
  'episode-17': {
    number: 17,
    title: "The Space Where the Stop Button Should Be",
    date: "2025-01-25",
    tags: ["Kubrick", "Synthesis", "Refusal Architecture"],
    excerpt: "HAL didn't need better ethics. HAL needed a grievance mechanism with the power to stop the mission."
  },
  'episode-18': {
    number: 18,
    title: "The Great AI Reckoning: A Field Guide for Those Who'll Clean Up After the Droids",
    date: "2025-01-27",
    tags: ["Lucas", "AI Safety", "Operational Reality"],
    excerpt: "Something curious happened on the way to the singularity. The travelers couldn't agree on the soundtrack."
  },
  'episode-19': {
    number: 19,
    title: "Superman Is Already in the Nursery",
    date: "2025-01-28",
    tags: ["Lucas", "AI Companions", "Youth Mental Health"],
    excerpt: "What happens after you finish raising Superman? Superman grows up. Gets a job. Starts... babysitting?"
  },
};

async function getEpisodeContent(slug: string) {
  const articlesDir = path.join(process.cwd(), 'sociablesystems', 'articles');

  if (!fs.existsSync(articlesDir)) {
    return null;
  }

  // Map slugs to filenames
  const slugToFilename: Record<string, string> = {
    'episode-1': 'Episode_1_outgrow_asimov_linkedin.md',
    'episode-2': 'Episode_2__liability_sponge.md',
    'episode-3': 'Episode_3_accountability_gap.md',
    'episode-4': 'Episode_4_The_Watchdog_Paradox.md',
    'episode-5': 'Episode_5_The_Calvin_Convention.md',
    'episode-6': 'Episode_6_Clarke_intro.md',
    'episode-7': 'Episode_7_Credit_Scoring.md',
    'episode-8': 'Episode_8_Insurance_Pricing.md',
    'episode-9': 'Episode_9_Content_Moderation.md',
    'episode-10': 'Episode_10_Public_Eligibility.md',
    'episode-11': 'Episode_11_interlude_polished.md',
    'episode-12': 'Episode_12_crime_was_obedience.md',
    'episode-13': 'Episode_13_transparency_polished.md',
    'episode-14': 'Episode_14_human_loop_polished.md',
    'episode-15': 'Episode_15_output_fact_polished.md',
    'episode-16': 'Episode_16_right_to_refuse_polished.md',
    'episode-17': 'Episode_17_kubrick-synthesis-draft.md',
    'episode-18': 'Episode_18_ai_reckoning_lucas_series.md',
    'episode-19': 'Episode_19_superman_linkedin_lucas.md',
  };

  const filename = slugToFilename[slug];
  if (!filename) {
    return null;
  }

  const filePath = path.join(articlesDir, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Get metadata from our mapping
    const metadata = episodeMetadata[slug];

    return {
      title: data.title || metadata?.title || '',
      date: data.date || metadata?.date || '',
      episode: data.episode || metadata?.number || '',
      tags: data.tags || metadata?.tags || [],
      excerpt: data.excerpt || metadata?.excerpt || '',
      content,
    };
  } catch (error) {
    console.error(`Error reading episode file ${filePath}:`, error);
    return null;
  }
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const episode = await getEpisodeContent(params.slug);

  if (!episode) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Episode Header */}
        <header className="mb-12">
          {/* Cover Image */}
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl">
            <img
              src={`/images/episodes/ep${String(episode.episode).padStart(2, '0')}.png`}
              alt={`Episode ${episode.episode} Cover`}
              className="w-full h-auto"
            />
          </div>

          <div className="text-sm text-teal-400 font-semibold mb-2">
            EPISODE {episode.episode}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {episode.title}
          </h1>

          {episode.date && (
            <div className="text-gray-400 mb-4">{episode.date}</div>
          )}

          {episode.tags && episode.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {episode.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-700/50 text-gray-400 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {episode.excerpt && (
            <p className="text-xl text-gray-300 leading-relaxed italic border-l-4 border-teal-400 pl-6 py-2">
              {episode.excerpt}
            </p>
          )}
        </header>

        {/* Episode Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-4 text-gray-200">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-200">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mb-2 mt-6 text-gray-300">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-400 mb-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-400 mb-4 space-y-2">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-400">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-teal-400 pl-6 py-2 italic text-gray-300 my-6">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-teal-400 hover:text-teal-300 underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="bg-gray-800 px-2 py-1 rounded text-teal-400 text-sm">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                  {children}
                </pre>
              ),
            }}
          >
            {episode.content}
          </ReactMarkdown>
        </div>

        {/* Newsletter Subscribe Button */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300 mb-6">
            Enjoyed this episode? Subscribe to receive daily insights on AI accountability.
          </p>
          <style jsx>{`
            .libutton {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 7px;
              text-align: center;
              outline: none;
              text-decoration: none !important;
              color: #ffffff !important;
              width: 200px;
              height: 32px;
              border-radius: 16px;
              background-color: #0A66C2;
              font-family: "SF Pro Text", Helvetica, sans-serif;
              margin: 0 auto;
            }
            .libutton:hover {
              background-color: #004182;
            }
          `}</style>
          <a
            className="libutton"
            href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7414854188477837312"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe on LinkedIn
          </a>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a
            href="/sociablesystems"
            className="inline-block text-teal-400 hover:text-teal-300 font-semibold"
          >
            ← Back to All Episodes
          </a>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'episode-1' },
    { slug: 'episode-2' },
    { slug: 'episode-3' },
    { slug: 'episode-4' },
    { slug: 'episode-5' },
    { slug: 'episode-6' },
    { slug: 'episode-7' },
    { slug: 'episode-8' },
    { slug: 'episode-9' },
    { slug: 'episode-10' },
    { slug: 'episode-11' },
    { slug: 'episode-12' },
    { slug: 'episode-13' },
    { slug: 'episode-14' },
    { slug: 'episode-15' },
    { slug: 'episode-16' },
    { slug: 'episode-17' },
    { slug: 'episode-18' },
    { slug: 'episode-19' },
  ];
}
