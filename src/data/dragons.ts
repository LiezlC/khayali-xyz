// The Data Dragon taxonomy — five failure modes of data systems, drawn from
// content/writings/data_dragons/data-dragons-story.md. Single source of truth
// for the Data Dragons Diagnostic agent (schema enum + UI) so the model can
// only ever name a dragon that actually exists in the lore.

export interface Dragon {
  id: string;
  name: string;
  latin: string;
  /** The data-system pathology this dragon IS. */
  pathology: string;
  /** How you know it has infested a system. */
  tell: string;
  /** The handler whose move tames it, and what that move is in practice. */
  handler: string;
  // Full static Tailwind classes (interpolated class names get purged in prod).
  borderColor: string;
  tagBg: string;
  tagText: string;
  gradientFrom: string;
  gradientTo: string;
}

export const dragons: Dragon[] = [
  {
    id: "merge",
    name: "Merge Dragons",
    latin: "Draconis Confluentia",
    pathology:
      "Improper joins that combine human records without consent — identity confusion, and family connections erased as 'duplicates'.",
    tell: "Two people collapse into one row; 'Removed Duplicates' quietly severs a household.",
    handler:
      "The Esperança move: make every join explicit and keyed — combine on a real identifier, never on a coincidence of name.",
    borderColor: "border-rose-500/30",
    tagBg: "bg-rose-900/50",
    tagText: "text-rose-300",
    gradientFrom: "from-rose-900/30",
    gradientTo: "to-gray-900",
  },
  {
    id: "filter",
    name: "Filter Wyverns",
    latin: "Draconis Exclusus",
    pathology:
      "Exclusion criteria that drop vulnerable populations — the families who fall into the gaps between classifications become invisible to the system that's meant to serve them.",
    tell: "A WHERE clause or priority tier silently removes the people most at risk; the report looks clean because they're gone.",
    handler:
      "The João move: walk the excluded set — count who the filter removed before you trust who it kept.",
    borderColor: "border-amber-500/30",
    tagBg: "bg-amber-900/50",
    tagText: "text-amber-300",
    gradientFrom: "from-amber-900/30",
    gradientTo: "to-gray-900",
  },
  {
    id: "pivot",
    name: "The Great Pivot Serpent",
    latin: "Draconis Transformatio",
    pathology:
      "Pivots and reshapes that transform categories themselves — 'Crops' become 'Structures', and a reframing of the data quietly rewrites what was owed.",
    tell: "A category changes meaning between two versions of the same table, and nobody can point to where the value went.",
    handler:
      "The Richard move: pin the schema — lock category definitions and validate them on every transform.",
    borderColor: "border-fuchsia-500/30",
    tagBg: "bg-fuchsia-900/50",
    tagText: "text-fuchsia-300",
    gradientFrom: "from-fuchsia-900/30",
    gradientTo: "to-gray-900",
  },
  {
    id: "ghost",
    name: "Ghost Entry Drakes",
    latin: "Draconis Nullius",
    pathology:
      "Nulls and missing data that swarm incomplete records — signatures and dates vanish from agreements, and undocumented people flicker between existing and `null`.",
    tell: "Key fields are empty on exactly the records that matter most; the gaps aren't random.",
    handler:
      "The João move again: treat every null as a person to find, not a cell to default — trace it back to the land.",
    borderColor: "border-slate-500/30",
    tagBg: "bg-slate-800/60",
    tagText: "text-slate-300",
    gradientFrom: "from-slate-800/40",
    gradientTo: "to-gray-900",
  },
  {
    id: "recursion",
    name: "The Recursion Hydra",
    latin: "Draconis Infinitus",
    pathology:
      "Circular references and self-joining calculations — each head computes a different version of the same family's number, and fixing one inconsistency spawns two more.",
    tell: "The same figure comes out different depending on which query you run; reconciliation never closes.",
    handler:
      "The cleansing query: break the circular logic — compute once from a single source of truth, then reference, never recompute.",
    borderColor: "border-violet-500/30",
    tagBg: "bg-violet-900/50",
    tagText: "text-violet-300",
    gradientFrom: "from-violet-900/30",
    gradientTo: "to-gray-900",
  },
];
