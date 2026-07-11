import DataDragonsDiagnostic from "@/components/DataDragonsDiagnostic";
import { dragons } from "@/data/dragons";

export const metadata = {
  title: "Data Dragons Diagnostic · khayali",
  description:
    "Name the dragons in your data. A diagnostic built on the Data Dragons taxonomy — five failure modes of real data systems, drawn from a resettlement-and-compensation database.",
};

export default function DataDragonsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-fuchsia-900/20 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="text-sm font-mono text-fuchsia-400 mb-4 tracking-widest uppercase">
            the query realm
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-fuchsia-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">
            Data Dragons
          </h1>
          <p className="text-xl text-gray-300 mb-4">Name the dragons in your data.</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            In a Southern African resettlement-and-compensation database, the failure modes of the
            data started to <span className="italic">breathe</span>. The more suffering encoded in a
            dataset, the more powerful the dragon that emerged. Five species. Each one a specific,
            nameable pathology — and the people the spreadsheet refuses to record are what they feed on.
          </p>
        </div>
      </section>

      {/* The diagnostic */}
      <section className="py-12 bg-gray-900/40 border-y border-fuchsia-500/10">
        <div className="container mx-auto px-4 max-w-2xl text-center mb-2">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">Run the diagnostic</h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Describe your data system, pipeline, or the organisation around it. The realm names which
            dragons infest it, how each shows up in your case, and the move that tames it.
          </p>
        </div>
        <DataDragonsDiagnostic />
      </section>

      {/* The bestiary */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3 text-center text-gray-200">The bestiary</h2>
          <p className="text-gray-400 text-center text-sm mb-10 max-w-xl mx-auto">
            The five species, and the data-system pathology each one is.
          </p>
          <div className="space-y-4">
            {dragons.map((d) => (
              <div
                key={d.id}
                className={`rounded-xl border ${d.borderColor} bg-gradient-to-br ${d.gradientFrom} ${d.gradientTo} p-5`}
              >
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="text-lg font-bold text-white">{d.name}</h3>
                  <span className={`text-xs font-mono italic ${d.tagText}`}>{d.latin}</span>
                </div>
                <p className="text-gray-300 mt-2 text-sm leading-relaxed">{d.pathology}</p>
                <p className="text-gray-500 mt-2 text-xs leading-relaxed">
                  <span className="uppercase tracking-wider">Tell</span> — {d.tell}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/writings/data-dragons-story"
              className="inline-block px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 transition-colors"
            >
              Read the full story →
            </a>
            <a
              href="/music"
              className="inline-block px-6 py-3 rounded-lg font-semibold border border-fuchsia-500/40 text-fuchsia-300 hover:bg-fuchsia-500/10 transition-colors"
            >
              Hear the DataDragons arc →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
