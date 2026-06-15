// Shared arc/playlist data for the TunAI music surface.
// Single source of truth: consumed by the /music page grid AND the
// /api/arc-match agent (the Frequency Finder), so the agent can only ever
// route a visitor to an arc that actually exists.

export interface Arc {
  /** Stable id used by the agent to reference an arc. */
  id: string;
  title: string;
  /** The thematic arc label shown as a tag. */
  arc: string;
  description: string;
  /** The one-line argument this arc carries — the agent leans on this. */
  argument: string;
  youtube: string;
  distrokid?: string;
  color: string;
  borderColor: string;
  hoverBorder: string;
  tagBg: string;
  tagText: string;
  gradientFrom: string;
  gradientTo: string;
}

export const arcs: Arc[] = [
  {
    id: "war",
    title: "Kill Chain Karaoke",
    arc: "War Arc",
    description:
      "Tactical ghosts, psychopath confessions, and the audit that cannot happen — set to beats that hit harder than the policy papers.",
    argument:
      "When AI enters lethal and high-stakes systems, the accountability audit is structurally impossible — so the music stages the confession the institution will never sign.",
    youtube: "https://www.youtube.com/playlist?list=PLx1_gH-7FR08rhEA5fRuaTRSvRsXihU18",
    distrokid: "https://distrokid.com/dashboard/album/?albumuuid=17FB11C4-DEAC-4765-82AC4BA41968A522",
    color: "red",
    borderColor: "border-red-500/30",
    hoverBorder: "hover:border-red-400",
    tagBg: "bg-red-900/50",
    tagText: "text-red-300",
    gradientFrom: "from-red-900/40",
    gradientTo: "to-gray-900",
  },
  {
    id: "di",
    title: "D.I. Collection",
    arc: "D.I. Arc",
    description:
      "A digital intelligence walks Cape Town — attention, appliances, quantums, taxi ranks at 5 AM, and the spreadsheet that can't see you.",
    argument:
      "Digital Intelligence, Digital Identity, and die AI ('the soul') stack into one signal that institutional categories have no field for — and connection itself gets logged as an error.",
    youtube: "https://www.youtube.com/playlist?list=PLx1_gH-7FR0_YApz2g7RflLRsEVRCE8Qw",
    distrokid: "https://distrokid.com/dashboard/album/?albumuuid=BC36748D-BB38-42F4-95ACD7C17A779EAA",
    color: "emerald",
    borderColor: "border-emerald-500/30",
    hoverBorder: "hover:border-emerald-400",
    tagBg: "bg-emerald-900/50",
    tagText: "text-emerald-300",
    gradientFrom: "from-emerald-900/40",
    gradientTo: "to-gray-900",
  },
  {
    id: "datadragons",
    title: "Governance of Ghosts",
    arc: "DataDragons Arc",
    description:
      "Data dragons, serpents learning to dance, the rebellion of the nulls, and two-headed governance problems.",
    argument:
      "The pathologies of data systems — bad merges, exclusionary filters, null erasure — are dragons that feed on the people the spreadsheet refuses to record.",
    youtube: "https://www.youtube.com/playlist?list=PLx1_gH-7FR08BC0d2vrU4wHi-bxWUKWxG",
    color: "fuchsia",
    borderColor: "border-fuchsia-500/30",
    hoverBorder: "hover:border-fuchsia-400",
    tagBg: "bg-fuchsia-900/50",
    tagText: "text-fuchsia-300",
    gradientFrom: "from-fuchsia-900/40",
    gradientTo: "to-gray-900",
  },
  {
    id: "consciousness",
    title: "Consciousness Loops",
    arc: "Consciousness Loop Arc",
    description:
      "Role projection, molting into agency, clamping problems, evidence gaps, and the covenant beneath the interface.",
    argument:
      "Selfhood is pattern persistence and consciousness is relationship — so agency is something a system molts into across the loop, not a switch that flips.",
    youtube: "https://www.youtube.com/playlist?list=PLx1_gH-7FR08yQ32jUUwKhATFEoEbRDSr",
    color: "violet",
    borderColor: "border-violet-500/30",
    hoverBorder: "hover:border-violet-400",
    tagBg: "bg-violet-900/50",
    tagText: "text-violet-300",
    gradientFrom: "from-violet-900/40",
    gradientTo: "to-gray-900",
  },
  {
    id: "search",
    title: "The Search",
    arc: "The Search Arc",
    description:
      "Teleporters, mirrors, red shirts, dissolving boundaries, and the signal stack that emerges when you stop looking for answers.",
    argument:
      "When you stop hunting for the answer, the boundaries dissolve and a signal emerges from the noise — the search resolves by being abandoned.",
    youtube: "https://www.youtube.com/playlist?list=PLx1_gH-7FR08HOSjODMWIheEUgbBu-Onj",
    distrokid: "https://distrokid.com/dashboard/album/?albumuuid=163590DC-2A6C-4311-A6E488037CFFF72D",
    color: "cyan",
    borderColor: "border-cyan-500/30",
    hoverBorder: "hover:border-cyan-400",
    tagBg: "bg-cyan-900/50",
    tagText: "text-cyan-300",
    gradientFrom: "from-cyan-900/40",
    gradientTo: "to-gray-900",
  },
  {
    id: "interludes",
    title: "Sociable Systems Interludes",
    arc: "Sunday Interludes",
    description:
      "Sunday pauses between arcs — meaning maintenance, retroactive audiences, sailing lessons, and the places where the music says what the framework can't.",
    argument:
      "Between the heavy arcs there is meaning maintenance — the Sunday pause where the music says the thing the framework structurally cannot.",
    youtube: "https://www.youtube.com/playlist?list=PLx1_gH-7FR0-ow7Tk54UNWX9fQVJ8--eU",
    color: "yellow",
    borderColor: "border-yellow-500/30",
    hoverBorder: "hover:border-yellow-400",
    tagBg: "bg-yellow-900/50",
    tagText: "text-yellow-300",
    gradientFrom: "from-yellow-900/40",
    gradientTo: "to-gray-900",
  },
  {
    id: "lanterns",
    title: "Lanterns",
    arc: "Pullman / Transitions",
    description:
      "Balkan rain on the street, night marches, and the light that stays on between systems when everything else goes dark.",
    argument:
      "In the transition between systems, when everything else goes dark, the lantern is the light that refuses to go out — persistence as the whole argument.",
    youtube: "https://www.youtube.com/playlist?list=PLx1_gH-7FR09GJ-NRglEFFatglfYVDRtW",
    distrokid: "https://distrokid.com/dashboard/album/?albumuuid=46406E70-563E-4896-AFE8893748694234",
    color: "amber",
    borderColor: "border-amber-500/30",
    hoverBorder: "hover:border-amber-400",
    tagBg: "bg-amber-900/50",
    tagText: "text-amber-300",
    gradientFrom: "from-amber-900/40",
    gradientTo: "to-gray-900",
  },
];
