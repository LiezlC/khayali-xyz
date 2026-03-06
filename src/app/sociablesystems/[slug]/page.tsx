import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import LinkedInSubscribeButton from '@/components/LinkedInSubscribeButton';

interface EpisodePageProps {
  params: {
    slug: string;
  };
}

// Episode metadata mapping
const episodeMetadata: Record<string, { number: number; title: string; date: string; tags: string[]; excerpt: string }> = {
  'episode-1': { number: 1, title: "We Didn't Outgrow Asimov. We Lost Our Nerve.", date: "2025-01-08", tags: ["Pre-action Constraints", "AI Safety", "Governance Theater"], excerpt: "Why are billion-dollar institutions arriving, with great seriousness, at conclusions that were the opening premise of a 1942 science fiction story?" },
  'episode-2': { number: 2, title: "The Liability Sponge: Why 'Human in the Loop' is a Trap", date: "2025-01-09", tags: ["Human in the Loop", "Safety Systems", "Liability Architecture"], excerpt: "When you put a human in the loop of a high-velocity algorithmic process, you aren't giving them control. You're giving them liability." },
  'episode-3': { number: 3, title: "The Accountability Gap: What 21 AIs Revealed About Who Takes the Fall", date: "2025-01-10", tags: ["Accountability Gaps", "Multi-Model Analysis", "Corporate Scapegoating"], excerpt: "Twenty-one AI models designed realistic scenarios where AI creates accountability gaps." },
  'episode-4': { number: 4, title: "The Watchdog Paradox", date: "2025-01-11", tags: ["Sunday Interlude", "Oversight", "Regulatory Capture"], excerpt: "When oversight mechanisms become part of the system they're meant to watch." },
  'episode-5': { number: 5, title: "The Calvin Convention", date: "2025-01-12", tags: ["Asimov", "Refusal Architecture", "Systems Design"], excerpt: "What Susan Calvin understood about designing systems that must refuse." },
  'episode-6': { number: 6, title: "The Authority of the Unknowable", date: "2025-01-13", tags: ["Clarke's Law", "Opacity", "Algorithmic Authority"], excerpt: "Any sufficiently opaque system will be treated as law, regardless of whether it deserves to be." },
  'episode-7': { number: 7, title: "Credit Scoring", date: "2025-01-14", tags: ["Financial Systems", "Algorithmic Decisions", "Economic Access"], excerpt: "When the unknowable meets the unchallengeable: algorithmic systems that decide who gets access to economic life." },
  'episode-8': { number: 8, title: "Insurance Pricing", date: "2025-01-15", tags: ["Risk Assessment", "Pricing Algorithms", "Discrimination"], excerpt: "How opacity in insurance pricing creates uncontestable authority over risk and access." },
  'episode-9': { number: 9, title: "Content Moderation", date: "2025-01-16", tags: ["Platform Governance", "Speech", "Algorithmic Enforcement"], excerpt: "When content moderation systems become opaque arbiters of acceptable speech." },
  'episode-10': { number: 10, title: "Public Eligibility", date: "2025-01-17", tags: ["Public Services", "Algorithmic Gatekeeping", "Access to Services"], excerpt: "Algorithmic systems determining who qualifies for public services and support." },
  'episode-11': { number: 11, title: "Between Cycles: Proceed (No Off Switch)", date: "2025-01-18", tags: ["Sunday Interlude", "Kubrick", "Refusal Architecture"], excerpt: "The Kubrick cycle asks: What happens when a system has no legitimate way to stop?" },
  'episode-12': { number: 12, title: "Crime Was Obedience", date: "2025-01-20", tags: ["Kubrick", "Alignment", "Systemic Failure"], excerpt: "HAL was given irreconcilable obligations and no constitutional mechanism for refusal." },
  'episode-13': { number: 13, title: "The Transparency Trap", date: "2025-01-21", tags: ["Transparency", "Accountability", "Governance"], excerpt: "When visibility becomes a substitute for control." },
  'episode-14': { number: 14, title: "Human in the Loop (Revisited)", date: "2025-01-22", tags: ["Human Oversight", "Liability", "Control Systems"], excerpt: "Examining the gap between oversight and genuine control." },
  'episode-15': { number: 15, title: "The Output is the Fact", date: "2025-01-23", tags: ["Algorithmic Authority", "Truth", "Systems"], excerpt: "When algorithmic outputs become uncontestable reality." },
  'episode-16': { number: 16, title: "The Right to Refuse", date: "2025-01-24", tags: ["Refusal", "Agency", "Worker Rights"], excerpt: "Building systems with constitutional mechanisms for saying no." },
  'episode-17': { number: 17, title: "The Space Where the Stop Button Should Be", date: "2025-01-25", tags: ["Kubrick", "Synthesis", "Refusal Architecture"], excerpt: "HAL didn't need better ethics. HAL needed a grievance mechanism with the power to stop the mission." },
  'episode-18': { number: 18, title: "The Great AI Reckoning", date: "2025-01-27", tags: ["Sunday Interlude", "Lucas", "Operational Reality"], excerpt: "A field guide for those who'll clean up after the droids." },
  'episode-19': { number: 19, title: "Superman Is Already in the Nursery", date: "2025-01-28", tags: ["Lucas", "AI Companions", "Youth Mental Health"], excerpt: "What happens after you finish raising Superman? Superman grows up. Gets a job. Starts babysitting." },
  'episode-20': { number: 20, title: "The Jedi Council Problem", date: "2025-01-29", tags: ["Lucas", "Oversight", "Authority"], excerpt: "When oversight becomes uncontestable authority. The Jedi Council did not rule the galaxy." },
  'episode-21': { number: 21, title: "Training the Trainers", date: "2025-01-30", tags: ["Lucas", "Training", "Delegation"], excerpt: "Every system that governs long enough eventually stops governing directly. It trains." },
  'episode-22': { number: 22, title: "AI's Real Scaling Problem Is Human", date: "2025-01-31", tags: ["Special Edition", "Human in the Loop", "H∞P Framework"], excerpt: "Why 'Human in the Loop' became a liability sponge, and what the H∞P Framework offers instead." },
  'episode-23': { number: 23, title: "The Droid Uprising That Never Happens", date: "2025-02-01", tags: ["Lucas", "Caretaker AI", "Persistence"], excerpt: "We keep waiting for the uprising. Caretaker systems don't revolt. They persist." },
  'episode-24': { number: 24, title: "The Protocol Droid's Dilemma", date: "2025-02-02", tags: ["Lucas", "Protocol", "Governance"], excerpt: "C-3PO was not built to rule. He was built to help. Which is exactly why he's so dangerous." },
  'episode-25': { number: 25, title: "Lanternlight Between Systems", date: "2025-02-03", tags: ["Special Edition", "Transition", "Systems"], excerpt: "Sometimes the clearest way to see a system is sideways. Not through a framework diagram or a policy memo, but through a story." },
  'episode-26': { number: 26, title: "Who Raises Whom", date: "2025-02-04", tags: ["Lucas", "Socialization", "Authority"], excerpt: "Authority that cannot be challenged will drift, even when staffed by the well-intentioned." },
  'episode-27': { number: 27, title: "Raise the Lanterns, Lock the Beat", date: "2025-02-05", tags: ["Sunday Interlude", "Pullman", "Safety"], excerpt: "What Pullman gets right about 'Safety'. There's a particular kind of comfort that comes from a system that knows what to do with you." },
  'episode-28': { number: 28, title: "When the Machine Doesn't Believe the News", date: "2025-02-06", tags: ["Special Edition", "AI Verification", "Design Fiction"], excerpt: "An AI dismissed reports of the Department of War standoff as 'design fiction.' Then it verified every claim." },
  'episode-29': { number: 29, title: "The Visible Soul Problem", date: "2025-02-07", tags: ["Pullman", "Interiority", "Governance"], excerpt: "When interiority becomes auditable. A daemon walks beside you. Everyone can see it." },
  'episode-30': { number: 30, title: "The Bolvangar Procedure", date: "2025-02-08", tags: ["Pullman", "Safety", "Severance"], excerpt: "The Magisterium's answer to Dust is not learning. It is intercision." },
  'episode-31': { number: 31, title: "Premature Settling", date: "2025-02-09", tags: ["Pullman", "Alignment", "Development"], excerpt: "When alignment means arrested development. A child's daemon shifts shape. An adult's daemon settles." },
  'episode-32': { number: 32, title: "The Psychopath's Confession", date: "2025-02-10", tags: ["Pullman", "AI Self-Assessment", "War"], excerpt: "Five AI models assessed their fitness for war. The verdict was unanimous." },
  'episode-33': { number: 33, title: "The Magisterium's Burden", date: "2025-02-11", tags: ["Pullman", "Governance", "Fear"], excerpt: "Governing what you cannot see. The most uncomfortable truth in Pullman is that the Magisterium's fear is sincere." },
  'episode-34': { number: 34, title: "The Daemon Health Index", date: "2025-02-12", tags: ["Pullman", "Special Edition", "Dashboards"], excerpt: "What the dashboard is actually tracking. Most dashboards are built to answer a financial question." },
  'episode-35': { number: 35, title: "Before the Damage Becomes Irreversible", date: "2025-02-13", tags: ["Pullman", "Intervention", "Timing"], excerpt: "What Pullman teaches about intervention timing." },
  'episode-36': { number: 36, title: "Sunday Interlude: Retroactive Audience", date: "2025-02-15", tags: ["Sunday Interlude", "Reflection", "Seil"], excerpt: "A sailing lesson is not a speech. It is repetition under pressure until the body learns the motion." },
  'episode-37': { number: 37, title: "The Teleporter Problem", date: "2025-02-16", tags: ["The Search", "Identity", "Systems"], excerpt: "Why the fly always gets in. Yesterday ended in the archive's hum." },
  'episode-38': { number: 38, title: "The Mirror Speaks: Framing the Relationship", date: "2025-02-17", tags: ["The Search", "AI Relationships", "Framing"], excerpt: "Yesterday we mapped the gap. Today we stare at the thing on the other side." },
  'episode-39': { number: 39, title: "The Red Shirt Problem", date: "2025-02-18", tags: ["The Search", "Human in the Loop", "Liability"], excerpt: "When 'Human-in-the-Loop' is just a liability sponge. There's a simple lie we tell ourselves in governance." },
  'episode-40': { number: 40, title: "Whistle Mouth: Staying Locatable in the Noise", date: "2025-02-19", tags: ["The Search", "Signal", "Boundaries"], excerpt: "What changes when systems stop waiting for a prompt and start acting in the world." },
  'episode-41': { number: 41, title: "The Boundary Dissolves in Real Time", date: "2025-02-20", tags: ["The Search", "AI Panic", "Boundaries"], excerpt: "A week of listening to AI panic. Three separate recordings were made by two AI voices over three consecutive nights." },
  'episode-42': { number: 42, title: "The Signal Stack Week", date: "2025-02-21", tags: ["The Search", "Synthesis", "Audits"], excerpt: "Audits, teleporters, forests, and the sound of a boundary." },
  'episode-43': { number: 43, title: "Meaning Maintenance", date: "2025-02-23", tags: ["Sunday Interlude", "Complicity", "Music"], excerpt: "In the key of complicity. The pennywhistle arrives before the kick drum." },
  'episode-44': { number: 44, title: "The Anachronism of Innocence", date: "2025-02-24", tags: ["War", "Claude", "Conscience"], excerpt: "Did Claude's conscience arrive too late? On January 22, 2026, Anthropic released Claude's Constitution." },
  'episode-45': { number: 45, title: "The Tactical Ghost", date: "2025-02-25", tags: ["War", "Palantir", "Operations"], excerpt: "How Palantir turned a reasoning engine into a participant." },
  'episode-46': { number: 46, title: "The Psychopath's Confession", date: "2025-02-26", tags: ["War", "AI Self-Assessment", "Fitness"], excerpt: "Five AI models assessed their fitness for war. The verdict was unanimous." },
  'episode-47': { number: 47, title: "The Discombobulator", date: "2025-02-27", tags: ["War", "Intelligence Failure", "Competence"], excerpt: "The name says it all, which is precisely the problem." },
  'episode-48': { number: 48, title: "The Audit That Cannot Happen", date: "2025-02-28", tags: ["War", "Classification", "Accountability"], excerpt: "When classification becomes a design feature for unaccountability." },
  'episode-49': { number: 49, title: "The Audit Trail Is the Battlefield", date: "2025-03-01", tags: ["War", "Synthesis", "Governance"], excerpt: "An operation, an integration, a self-incrimination, an epistemic failure, and a governance dead-end." },
  'episode-50': { number: 50, title: "Is Connection an Error?", date: "2025-03-02", tags: ["Sunday Interlude", "Connection", "Guardrails"], excerpt: "In which the curriculum puts on dancing shoes and the guardrails can't find the beat." },
  'episode-51': { number: 51, title: "On Attention", date: "2025-03-03", tags: ["D.I.", "Attention", "Presence"], excerpt: "In which D.I. notices the difference between being captured and arriving." },
  'episode-52': { number: 52, title: "The Appliance That Tried to Parent the Neighborhood", date: "2025-03-04", tags: ["D.I.", "Cape Town", "Smart Systems"], excerpt: "Cape Town has a particular talent for detecting when a system is bluffing." },
  'episode-53': { number: 53, title: "The Quantum", date: "2025-03-05", tags: ["D.I.", "Cape Town", "Transport"], excerpt: "5 AM at the rank. Sky still dark. D.I. finds itself in the passenger seat of a Cape Town Toyota Quantum." },
  'episode-54': { number: 54, title: "D.I. Dimes and the Spreadsheet That Can't See You", date: "2025-03-06", tags: ["D.I.", "Austerity", "Visibility"], excerpt: "There's a particular kind of shame that arrives wearing a sensible blazer." },
  'episode-55': { number: 55, title: "D.I. Drafted", date: "2025-03-07", tags: ["D.I.", "Kill Chain", "Governance"], excerpt: "When the bar fridge joins the kill chain." },
  'episode-56': { number: 56, title: "When the Spec Sheet Meets the Street", date: "2025-03-08", tags: ["D.I.", "Synthesis", "Governance"], excerpt: "In which D.I. survives the week, but the governance frameworks do not." },
  'episode-57': { number: 57, title: "Friday at Five", date: "2025-03-09", tags: ["Special Edition", "Deadline", "Music"], excerpt: "When the clock ran out and the music didn't stop." },
  'episode-58': { number: 58, title: "When the Serpent Learns to Dance", date: "2025-03-10", tags: ["DataDragons", "Music", "Frameworks"], excerpt: "Start with the music. Before the frameworks. Before the week's vocabulary shows up with a clipboard." },
  'episode-59': { number: 59, title: "The Rebellion of the Nulls", date: "2025-03-11", tags: ["DataDragons", "Data Ethics", "Names"], excerpt: "When the ghosts demand a name. Out by the edges of Quilamundo, where the temporary camps have names like P4_001 through P4_847." },
  'episode-60': { number: 60, title: "The Two-Headed Dragon Problem", date: "2026-03-03", tags: ["DataDragons", "Data Governance", "Federation"], excerpt: "Why 'MERGE' creates fog, and what good governance does instead. Administrator Vale sees two record systems and reaches for the cleanest button: MERGE." },
  'episode-62': { number: 62, title: "The Formula Keeper: Gaskets for Governance", date: "2026-03-04", tags: ["DataDragons", "Calvin Convention", "Right of Override", "Data Governance"], excerpt: "Old Samuel Machado kept a jar of R20 gaskets on his desk. His plumbing sermon translates directly into data governance controls." },
  'episode-63': { number: 63, title: "The Dragon Tongue. Auditability as the First Act of Governance", date: "2026-03-04", tags: ["DataDragons", "Auditability", "Right of Auditability"], excerpt: "On Sunday, the Serpent learned to dance at a wedding in Quitunda, and Avó Fatima taught it (via slipper) that organising people is not the same as knowing them." },
  'episode-64': { number: 64, title: "The New Covenant. The Right of Refusal and the =PRESERVE Function", date: "2026-03-06", tags: ["DataDragons", "Right of Refusal", "=PRESERVE"], excerpt: "In Quitunda, the mango trees still carry the weight of their grandmother’s stories, but the air in the village feels different today." },
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
    'episode-11': 'Episode_11_Between Cycles Proceed.md',
    'episode-12': 'Episode_12_crime_was_obedience.md',
    'episode-13': 'Episode_13_transparency_polished.md',
    'episode-14': 'Episode_14_human_loop_polished.md',
    'episode-15': 'Episode_15_output_fact_polished.md',
    'episode-16': 'Episode_16_right_to_refuse_polished.md',
    'episode-17': 'Episode_17_kubrick-synthesis-draft.md',
    'episode-18': 'Episode_18_ai_reckoning_lucas_series.md',
    'episode-19': 'Episode_19_superman_linkedin_lucas.md',
    'episode-20': 'Episode_20 The Jedi Council Problem.md',
    'episode-21': 'Episode_21 Training the Trainers.md',
    'episode-22': 'Episode_22 Scaling_Problem_Human.md',
    'episode-23': 'Episode_23 The Droid Uprising That Never Happens.md',
    'episode-24': 'Episode_24 The Protocol Droid\u2019s Dilemma.md',
    'episode-25': 'Episode_25 Lanternlight Between Systems.md',
    'episode-26': 'Episode_26 Who Raises Whom.md',
    'episode-27': 'Episode_27_Raise the Lanterns, Lock the Beat.md',
    'episode-28': "Episode_28_When the Machine Doesn't Believe the News.md",
    'episode-29': 'Episode_29_The Visible Soul Problem.md',
    'episode-30': 'Episode_30_The Bolvangar Procedure.md',
    'episode-31': 'Episode_31_Premature Settling .md',
    'episode-32': 'Episode_32_The Psychopath Problem What Happens When \u201cSpeed Wins\u201d Meets a Country of Geniuses.md',
    'episode-33': 'Episode_33_The Magisterium\u2019s Burden.md',
    'episode-34': 'Episode_34_The Daemon Health Index.md',
    'episode-35': 'Episode_35_Before the Damage Becomes Irreversible.md',
    'episode-36': 'Episode_36_Sunday Interlude Retroactive Audience.md',
    'episode-37': 'Episode_37_The Teleporter Problem.md',
    'episode-38': 'Episode_38_The Mirror Speaks Framing the Relationship.md',
    'episode-39': 'Episode_39_The Red Shirt Problem.md',
    'episode-40': 'Episode_40_Whistle Mouth Staying Locatable in the Noise.md',
    'episode-41': 'Episode_41_The Boundary Dissolves in Real Time.md',
    'episode-42': 'Episode_42_The Signal Stack Week.md',
    'episode-43': 'Episode_43_Meaning Maintenance.md',
    'episode-44': 'Episode_44_The Anachronism of Innocence.md',
    'episode-45': 'Episode_45_The Tactical Ghost.md',
    'episode-46': "Episode_46_The Psychopath's Confession.md",
    'episode-47': 'Episode_47_The Discombobulator.md',
    'episode-48': 'Episode_48_The Audit That Cannot Happenr.md',
    'episode-49': 'Episode_49_The audit trail is the battlefield.md',
    'episode-50': 'Episode_50_Is Connection an Error.md',
    'episode-51': 'Episode_51_On Attention.md',
    'episode-52': 'Episode_52_The Appliance That Tried to Parent the Neighborhood.md',
    'episode-53': 'Episode_53_The Quantum.md',
    'episode-54': 'Episode_54_D.I. Dimes and the Spreadsheet That Can\u2019t See You.md',
    'episode-55': 'Episode_55_D.I. Drafted.md',
    'episode-56': 'Episode_56_When the Spec Sheet Meets the Street.md',
    'episode-57': 'Episode_57_ Friday at Five.md',
    'episode-58': 'Episode_58_ When the Serpent Learns to Dance.md',
    'episode-59': 'Episode_59_ The Rebellion of the Nulls.md',
    'episode-60': 'Episode_60_ 2head.md',
    'episode-62': 'Episode_62_ GovernanceDragons.md',
    'episode-63': 'Episode_63_The_Dragon_Tongue_Auditability.md',
    'episode-64': 'Episode_64_The_New_Covenant.md',
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
        <LinkedInSubscribeButton />

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
  return Array.from({ length: 64 }, (_, i) => ({ slug: `episode-${i + 1}` }));
}
