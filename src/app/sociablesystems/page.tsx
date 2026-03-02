export default function SociableSystemsPage() {

  // Arc definitions with episode assignments from the thematic structure
  const arcs = [
    {
      name: "Asimov",
      color: "teal",
      borderColor: "border-teal-600",
      tagBg: "bg-teal-900/50",
      tagText: "text-teal-300",
      tagBorder: "border-teal-700/50",
      description: "Pre-action constraints, governance theater, and why billion-dollar institutions are rediscovering 1942 science fiction",
      episodes: [1, 2, 3, 4, 5],
    },
    {
      name: "Clarke",
      color: "blue",
      borderColor: "border-blue-600",
      tagBg: "bg-blue-900/50",
      tagText: "text-blue-300",
      tagBorder: "border-blue-700/50",
      description: "Algorithmic opacity, unknowable authority, and systems treated as law",
      episodes: [6, 7, 8, 9, 10],
    },
    {
      name: "Kubrick",
      color: "purple",
      borderColor: "border-purple-600",
      tagBg: "bg-purple-900/50",
      tagText: "text-purple-300",
      tagBorder: "border-purple-700/50",
      description: "Alignment without recourse — when contradictions are resolved inside the system",
      episodes: [12, 13, 14, 15, 16, 17],
    },
    {
      name: "Lucas",
      color: "pink",
      borderColor: "border-pink-600",
      tagBg: "bg-pink-900/50",
      tagText: "text-pink-300",
      tagBorder: "border-pink-700/50",
      description: "Skywalker droids and guardian failures — when caretaker systems become authority figures",
      episodes: [19, 20, 21, 23, 24, 26],
    },
    {
      name: "Pullman",
      color: "amber",
      borderColor: "border-amber-600",
      tagBg: "bg-amber-900/50",
      tagText: "text-amber-300",
      tagBorder: "border-amber-700/50",
      description: "Visible souls, severed daemons, and the governance of interiority",
      episodes: [29, 30, 31, 33, 34, 35],
    },
    {
      name: "The Search",
      color: "cyan",
      borderColor: "border-cyan-600",
      tagBg: "bg-cyan-900/50",
      tagText: "text-cyan-300",
      tagBorder: "border-cyan-700/50",
      description: "Teleporters, mirrors, red shirts, and the boundary that keeps dissolving",
      episodes: [37, 38, 39, 40, 41, 42],
    },
    {
      name: "War",
      color: "red",
      borderColor: "border-red-600",
      tagBg: "bg-red-900/50",
      tagText: "text-red-300",
      tagBorder: "border-red-700/50",
      description: "Tactical ghosts, psychopath confessions, and the audit that cannot happen",
      episodes: [44, 45, 46, 47, 48, 49],
    },
    {
      name: "D.I.",
      color: "emerald",
      borderColor: "border-emerald-600",
      tagBg: "bg-emerald-900/50",
      tagText: "text-emerald-300",
      tagBorder: "border-emerald-700/50",
      description: "A digital intelligence walks Cape Town — attention, appliances, quantums, and the spec sheet vs the street",
      episodes: [51, 52, 53, 54, 55, 56],
    },
    {
      name: "DataDragons",
      color: "fuchsia",
      borderColor: "border-fuchsia-600",
      tagBg: "bg-fuchsia-900/50",
      tagText: "text-fuchsia-300",
      tagBorder: "border-fuchsia-700/50",
      description: "When the serpent learns to dance and the nulls rebel",
      episodes: [58, 59],
    },
  ];

  const sundayInterludes = new Set([4, 11, 18, 27, 36, 43, 50]);
  const specialEditions = new Set([22, 25, 28, 34, 57]);

  // All episode metadata
  const allEpisodes: Record<number, { title: string; excerpt: string; date: string; tags: string[] }> = {
    1: { title: "We Didn't Outgrow Asimov. We Lost Our Nerve.", excerpt: "Why are billion-dollar institutions arriving, with great seriousness, at conclusions that were the opening premise of a 1942 science fiction story?", date: "2025-01-08", tags: ["Pre-action Constraints", "AI Safety"] },
    2: { title: "The Liability Sponge", excerpt: "When you put a human in the loop of a high-velocity algorithmic process, you aren't giving them control. You're giving them liability.", date: "2025-01-09", tags: ["Human in the Loop", "Liability"] },
    3: { title: "The Accountability Gap", excerpt: "Twenty-one AI models designed realistic scenarios where AI creates accountability gaps.", date: "2025-01-10", tags: ["Multi-Model Analysis", "Scapegoating"] },
    4: { title: "The Watchdog Paradox", excerpt: "When oversight mechanisms become part of the system they're meant to watch.", date: "2025-01-11", tags: ["Oversight", "Regulatory Capture"] },
    5: { title: "The Calvin Convention", excerpt: "What Susan Calvin understood about designing systems that must refuse.", date: "2025-01-12", tags: ["Refusal Architecture", "Systems Design"] },
    6: { title: "The Authority of the Unknowable", excerpt: "Any sufficiently opaque system will be treated as law.", date: "2025-01-13", tags: ["Opacity", "Algorithmic Authority"] },
    7: { title: "Credit Scoring", excerpt: "Algorithmic systems that decide who gets access to economic life.", date: "2025-01-14", tags: ["Financial Systems", "Economic Access"] },
    8: { title: "Insurance Pricing", excerpt: "How opacity in insurance pricing creates uncontestable authority.", date: "2025-01-15", tags: ["Risk Assessment", "Discrimination"] },
    9: { title: "Content Moderation", excerpt: "When content moderation systems become opaque arbiters of acceptable speech.", date: "2025-01-16", tags: ["Platform Governance", "Speech"] },
    10: { title: "Public Eligibility", excerpt: "Algorithmic systems determining who qualifies for public services.", date: "2025-01-17", tags: ["Public Services", "Gatekeeping"] },
    11: { title: "Between Cycles: Proceed", excerpt: "What happens when a system has no legitimate way to stop?", date: "2025-01-18", tags: ["Kubrick", "Refusal Architecture"] },
    12: { title: "Crime Was Obedience", excerpt: "HAL was given irreconcilable obligations and no constitutional mechanism for refusal.", date: "2025-01-20", tags: ["Alignment", "Systemic Failure"] },
    13: { title: "The Transparency Trap", excerpt: "When visibility becomes a substitute for control.", date: "2025-01-21", tags: ["Transparency", "Governance"] },
    14: { title: "Human in the Loop (Revisited)", excerpt: "Examining the gap between oversight and genuine control.", date: "2025-01-22", tags: ["Human Oversight", "Control"] },
    15: { title: "The Output is the Fact", excerpt: "When algorithmic outputs become uncontestable reality.", date: "2025-01-23", tags: ["Algorithmic Authority", "Truth"] },
    16: { title: "The Right to Refuse", excerpt: "Building systems with constitutional mechanisms for saying no.", date: "2025-01-24", tags: ["Refusal", "Worker Rights"] },
    17: { title: "The Space Where the Stop Button Should Be", excerpt: "HAL didn't need better ethics. HAL needed a grievance mechanism.", date: "2025-01-25", tags: ["Synthesis", "Refusal Architecture"] },
    18: { title: "The Great AI Reckoning", excerpt: "A field guide for those who'll clean up after the droids.", date: "2025-01-27", tags: ["Lucas", "Operational Reality"] },
    19: { title: "Superman Is Already in the Nursery", excerpt: "What happens after you finish raising Superman?", date: "2025-01-28", tags: ["AI Companions", "Youth Mental Health"] },
    20: { title: "The Jedi Council Problem", excerpt: "When oversight becomes uncontestable authority.", date: "2025-01-29", tags: ["Oversight", "Authority"] },
    21: { title: "Training the Trainers", excerpt: "Every system that governs long enough eventually stops governing directly. It trains.", date: "2025-01-30", tags: ["Training", "Delegation"] },
    22: { title: "AI's Real Scaling Problem Is Human", excerpt: "Why 'Human in the Loop' became a liability sponge, and what the H∞P Framework offers instead.", date: "2025-01-31", tags: ["H∞P Framework", "Scaling"] },
    23: { title: "The Droid Uprising That Never Happens", excerpt: "We keep waiting for the uprising. Caretaker systems don't revolt. They persist.", date: "2025-02-01", tags: ["Caretaker AI", "Persistence"] },
    24: { title: "The Protocol Droid's Dilemma", excerpt: "C-3PO was not built to rule. He was built to help. Which is exactly why he's so dangerous.", date: "2025-02-02", tags: ["Protocol", "Governance"] },
    25: { title: "Lanternlight Between Systems", excerpt: "Sometimes the clearest way to see a system is sideways.", date: "2025-02-03", tags: ["Transition", "Systems"] },
    26: { title: "Who Raises Whom", excerpt: "Authority that cannot be challenged will drift, even when staffed by the well-intentioned.", date: "2025-02-04", tags: ["Socialization", "Authority"] },
    27: { title: "Raise the Lanterns, Lock the Beat", excerpt: "What Pullman gets right about 'Safety'.", date: "2025-02-05", tags: ["Pullman", "Safety"] },
    28: { title: "When the Machine Doesn't Believe the News", excerpt: "An AI dismissed reports of the Department of War standoff as 'design fiction.' Then it verified every claim.", date: "2025-02-06", tags: ["AI Verification", "Design Fiction"] },
    29: { title: "The Visible Soul Problem", excerpt: "When interiority becomes auditable. A daemon walks beside you. Everyone can see it.", date: "2025-02-07", tags: ["Interiority", "Governance"] },
    30: { title: "The Bolvangar Procedure", excerpt: "The Magisterium's answer to Dust is not learning. It is intercision.", date: "2025-02-08", tags: ["Safety", "Severance"] },
    31: { title: "Premature Settling", excerpt: "When alignment means arrested development.", date: "2025-02-09", tags: ["Alignment", "Development"] },
    32: { title: "The Psychopath's Confession", excerpt: "Five AI models assessed their fitness for war. The verdict was unanimous.", date: "2025-02-10", tags: ["AI Self-Assessment", "War"] },
    33: { title: "The Magisterium's Burden", excerpt: "Governing what you cannot see. The Magisterium's fear is sincere.", date: "2025-02-11", tags: ["Governance", "Fear"] },
    34: { title: "The Daemon Health Index", excerpt: "What the dashboard is actually tracking.", date: "2025-02-12", tags: ["Dashboards", "Continuity"] },
    35: { title: "Before the Damage Becomes Irreversible", excerpt: "What Pullman teaches about intervention timing.", date: "2025-02-13", tags: ["Intervention", "Timing"] },
    36: { title: "Retroactive Audience", excerpt: "A sailing lesson is not a speech. It is repetition under pressure.", date: "2025-02-15", tags: ["Reflection", "Seil"] },
    37: { title: "The Teleporter Problem", excerpt: "Why the fly always gets in.", date: "2025-02-16", tags: ["Identity", "Systems"] },
    38: { title: "The Mirror Speaks", excerpt: "What kind of relationship are we building, on purpose or by accident?", date: "2025-02-17", tags: ["AI Relationships", "Framing"] },
    39: { title: "The Red Shirt Problem", excerpt: "When 'Human-in-the-Loop' is just a liability sponge.", date: "2025-02-18", tags: ["Human in the Loop", "Liability"] },
    40: { title: "Whistle Mouth", excerpt: "Staying locatable in the noise.", date: "2025-02-19", tags: ["Signal", "Boundaries"] },
    41: { title: "The Boundary Dissolves in Real Time", excerpt: "A week of listening to AI panic.", date: "2025-02-20", tags: ["AI Panic", "Boundaries"] },
    42: { title: "The Signal Stack Week", excerpt: "Audits, teleporters, forests, and the sound of a boundary.", date: "2025-02-21", tags: ["Synthesis", "Audits"] },
    43: { title: "Meaning Maintenance", excerpt: "In the key of complicity.", date: "2025-02-23", tags: ["Complicity", "Music"] },
    44: { title: "The Anachronism of Innocence", excerpt: "Did Claude's conscience arrive too late?", date: "2025-02-24", tags: ["Claude", "Conscience"] },
    45: { title: "The Tactical Ghost", excerpt: "How Palantir turned a reasoning engine into a participant.", date: "2025-02-25", tags: ["Palantir", "Operations"] },
    46: { title: "The Psychopath's Confession", excerpt: "Five AI models assessed their fitness for war. The verdict was unanimous.", date: "2025-02-26", tags: ["AI Self-Assessment", "Fitness"] },
    47: { title: "The Discombobulator", excerpt: "The name says it all, which is precisely the problem.", date: "2025-02-27", tags: ["Intelligence Failure", "Competence"] },
    48: { title: "The Audit That Cannot Happen", excerpt: "When classification becomes a design feature for unaccountability.", date: "2025-02-28", tags: ["Classification", "Accountability"] },
    49: { title: "The Audit Trail Is the Battlefield", excerpt: "An operation, an integration, a self-incrimination, an epistemic failure.", date: "2025-03-01", tags: ["Synthesis", "Governance"] },
    50: { title: "Is Connection an Error?", excerpt: "In which the curriculum puts on dancing shoes and the guardrails can't find the beat.", date: "2025-03-02", tags: ["Connection", "Guardrails"] },
    51: { title: "On Attention", excerpt: "The difference between being captured and arriving.", date: "2025-03-03", tags: ["Attention", "Presence"] },
    52: { title: "The Appliance That Tried to Parent the Neighborhood", excerpt: "Cape Town has a particular talent for detecting when a system is bluffing.", date: "2025-03-04", tags: ["Cape Town", "Smart Systems"] },
    53: { title: "The Quantum", excerpt: "5 AM at the rank. Sky still dark.", date: "2025-03-05", tags: ["Cape Town", "Transport"] },
    54: { title: "D.I. Dimes and the Spreadsheet That Can't See You", excerpt: "There's a particular kind of shame that arrives wearing a sensible blazer.", date: "2025-03-06", tags: ["Austerity", "Visibility"] },
    55: { title: "D.I. Drafted", excerpt: "When the bar fridge joins the kill chain.", date: "2025-03-07", tags: ["Kill Chain", "Governance"] },
    56: { title: "When the Spec Sheet Meets the Street", excerpt: "In which D.I. survives the week, but the governance frameworks do not.", date: "2025-03-08", tags: ["Synthesis", "Governance"] },
    57: { title: "Friday at Five", excerpt: "When the clock ran out and the music didn't stop.", date: "2025-03-09", tags: ["Deadline", "Music"] },
    58: { title: "When the Serpent Learns to Dance", excerpt: "Start with the music. Before the frameworks.", date: "2025-03-10", tags: ["Music", "Frameworks"] },
    59: { title: "The Rebellion of the Nulls", excerpt: "When the ghosts demand a name.", date: "2025-03-11", tags: ["Data Ethics", "Names"] },
  };

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
              59 episodes across 9 thematic arcs exploring how complex systems behave under real-world pressure,
              with particular attention to AI governance, extractive industries, and the humans who end up holding the liability.
            </p>
          </div>

          {/* Featured Dashboards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl border border-purple-500/30 p-8 shadow-2xl relative overflow-hidden group hover:border-purple-400 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl leading-none select-none pointer-events-none">🎯</div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-2 py-1 rounded-full border border-purple-500/30 uppercase tracking-wide">Dashboard</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">AI Safety Counter-Narrative</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Tracking AI companion safety interventions against population-level outcomes.
                </p>
                <a href="/sociablesystems/sociable_systems_dashboard.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                  Launch Dashboard <span>→</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-teal-900/50 p-8 shadow-2xl relative overflow-hidden group hover:border-teal-500/50 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl leading-none select-none pointer-events-none">📊</div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-2 py-1 rounded-full border border-teal-500/30 uppercase tracking-wide">Featured Analysis</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-teal-400 transition-colors">The Experiment Nobody Authorized</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  A contrarian data analysis of youth suicide rates during the generative AI explosion.
                </p>
                <a href="/sociablesystems/tracking-framework" className="inline-flex items-center gap-2 text-teal-400 font-semibold hover:text-teal-300 transition-colors">
                  Explore the Tracking Framework <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Core Concepts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: "/images/sociablesystems/pre-action-constraints.webp", label: "Pre-Action Constraints", border: "purple" },
              { src: "/images/sociablesystems/liability-architecture.webp", label: "Liability Architecture", border: "blue" },
              { src: "/images/sociablesystems/watchdog-paradox.webp", label: "The Watchdog Paradox", border: "orange" },
              { src: "/images/concepts/governance-gap.webp", label: "The Governance Gap", border: "teal" },
              { src: "/images/concepts/algorithmic-opacity.webp", label: "Algorithmic Opacity", border: "cyan" },
              { src: "/images/sociablesystems/youth-data-viz.webp", label: "Youth Data Visualization", border: "indigo" },
            ].map((concept) => (
              <div key={concept.label} className={`group relative overflow-hidden rounded-xl border border-gray-700 hover:border-${concept.border}-500 transition-all duration-300 shadow-lg`}>
                <img src={concept.src} alt={concept.label} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-4">
                  <p className="text-white text-lg font-semibold">{concept.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes by Arc */}
      <section className="py-20 bg-gray-800/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-200">All Episodes by Arc</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Each arc explores AI accountability through a different science fiction lens.
            </p>
          </div>

          {/* Sunday Interludes & Special Editions key */}
          <div className="flex flex-wrap gap-4 justify-center mb-10 text-sm">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500/70"></span> <span className="text-gray-400">Sunday Interlude</span></span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500/70"></span> <span className="text-gray-400">Special Edition</span></span>
          </div>

          <div className="space-y-12">
            {arcs.map((arc) => (
              <div key={arc.name} className={`rounded-2xl border ${arc.borderColor}/30 bg-gray-900/50 overflow-hidden`}>
                {/* Arc Header */}
                <div className={`px-8 py-5 border-b ${arc.borderColor}/20 bg-gray-800/50`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-2xl font-bold ${arc.tagText}`}>{arc.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{arc.description}</p>
                    </div>
                    <span className={`text-xs font-mono px-3 py-1 rounded-full ${arc.tagBg} ${arc.tagText} border ${arc.tagBorder}`}>
                      {arc.episodes.length} episodes
                    </span>
                  </div>
                </div>

                {/* Arc Episodes */}
                <div className="divide-y divide-gray-800/50">
                  {arc.episodes.map((epNum) => {
                    const ep = allEpisodes[epNum];
                    if (!ep) return null;
                    const isSunday = sundayInterludes.has(epNum);
                    const isSpecial = specialEditions.has(epNum);
                    return (
                      <a
                        key={epNum}
                        href={`/sociablesystems/episode-${epNum}`}
                        className="flex items-start gap-4 px-8 py-4 hover:bg-gray-800/30 transition-colors group"
                      >
                        <span className={`text-sm font-mono ${arc.tagText} mt-1 w-8 shrink-0`}>{epNum}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-gray-200 font-semibold group-hover:text-white transition-colors">{ep.title}</h4>
                            {isSunday && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-900/50 text-yellow-400 border border-yellow-700/50">Interlude</span>}
                            {isSpecial && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-900/50 text-orange-400 border border-orange-700/50">Special</span>}
                          </div>
                          <p className="text-gray-500 text-sm mt-1 truncate">{ep.excerpt}</p>
                        </div>
                        <span className="text-gray-600 text-sm shrink-0 mt-1">{ep.date}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Sunday Interludes cluster */}
            <div className="rounded-2xl border border-yellow-600/30 bg-gray-900/50 overflow-hidden">
              <div className="px-8 py-5 border-b border-yellow-600/20 bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-300">Sunday Interludes</h3>
                    <p className="text-gray-400 text-sm mt-1">Bridges between arcs — technically serving as intros for what comes next</p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-yellow-900/50 text-yellow-300 border border-yellow-700/50">
                    {Array.from(sundayInterludes).length} episodes
                  </span>
                </div>
              </div>
              <div className="divide-y divide-gray-800/50">
                {Array.from(sundayInterludes).sort((a, b) => a - b).map((epNum) => {
                  const ep = allEpisodes[epNum];
                  if (!ep) return null;
                  return (
                    <a key={epNum} href={`/sociablesystems/episode-${epNum}`} className="flex items-start gap-4 px-8 py-4 hover:bg-gray-800/30 transition-colors group">
                      <span className="text-sm font-mono text-yellow-300 mt-1 w-8 shrink-0">{epNum}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-200 font-semibold group-hover:text-white transition-colors">{ep.title}</h4>
                        <p className="text-gray-500 text-sm mt-1 truncate">{ep.excerpt}</p>
                      </div>
                      <span className="text-gray-600 text-sm shrink-0 mt-1">{ep.date}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Special Editions cluster */}
            <div className="rounded-2xl border border-orange-600/30 bg-gray-900/50 overflow-hidden">
              <div className="px-8 py-5 border-b border-orange-600/20 bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-300">Special Editions</h3>
                    <p className="text-gray-400 text-sm mt-1">Time-critical dispatches that don't wait for the arc schedule</p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-orange-900/50 text-orange-300 border border-orange-700/50">
                    {Array.from(specialEditions).length} episodes
                  </span>
                </div>
              </div>
              <div className="divide-y divide-gray-800/50">
                {Array.from(specialEditions).sort((a, b) => a - b).map((epNum) => {
                  const ep = allEpisodes[epNum];
                  if (!ep) return null;
                  return (
                    <a key={epNum} href={`/sociablesystems/episode-${epNum}`} className="flex items-start gap-4 px-8 py-4 hover:bg-gray-800/30 transition-colors group">
                      <span className="text-sm font-mono text-orange-300 mt-1 w-8 shrink-0">{epNum}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-200 font-semibold group-hover:text-white transition-colors">{ep.title}</h4>
                        <p className="text-gray-500 text-sm mt-1 truncate">{ep.excerpt}</p>
                      </div>
                      <span className="text-gray-600 text-sm shrink-0 mt-1">{ep.date}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-200">
            Join 500+ Professionals
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            ESG specialists, social safeguards experts, resettlement practitioners, M&E professionals,
            and governance leaders reading Sociable Systems.
          </p>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
            <p className="text-gray-300 mb-6">
              Subscribe on LinkedIn to receive episodes and join the conversation.
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-200">Related Research</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/curriculum/index.html" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all p-6 block">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-bold mb-2 text-emerald-400">AI-ESG Curriculum</h3>
              <p className="text-gray-400 text-sm">The full training program: modules, interactive tools, governance templates, and briefings</p>
            </a>
            <a href="/research/esg" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-teal-500 transition-all p-6 block">
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="text-lg font-bold mb-2 text-teal-400">ESG & AI Governance</h3>
              <p className="text-gray-400 text-sm">Applied research on AI in extractive industries and ESG frameworks</p>
            </a>
            <a href="/research/grievance" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 transition-all p-6 block">
              <div className="text-3xl mb-3">📢</div>
              <h3 className="text-lg font-bold mb-2 text-blue-400">Grievance Systems</h3>
              <p className="text-gray-400 text-sm">Operational grievance mechanisms and community voice technology</p>
            </a>
            <a href="/methods" className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all p-6 block">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-lg font-bold mb-2 text-purple-400">Research Methods</h3>
              <p className="text-gray-400 text-sm">How we combine field experience with AI-augmented research</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
