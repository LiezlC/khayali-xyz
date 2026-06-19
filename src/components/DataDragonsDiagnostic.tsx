"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The Data Dragons Diagnostic — the third content-agent on khayali.
// Describe a data system → the agent names which of the five dragon species
// infest it, each with a read of your case and the handler's move. The named
// cast is the staggered reveal. Bounded: the diagnosis, routing to the full
// story and the practice behind it.

interface Infestation {
  id: string;
  name: string;
  latin: string;
  borderColor: string;
  tagBg: string;
  tagText: string;
  gradientFrom: string;
  gradientTo: string;
  yourCase: string;
  theMove: string;
}

interface Diagnosis {
  infestations: Infestation[];
  verdict: string;
}

const SEEDS = [
  "we dedupe beneficiaries by name before paying compensation",
  "a nightly pivot reclassifies our asset categories",
  "half our intake forms are missing signatures and dates",
  "two dashboards report different totals for the same fund",
];

export default function DataDragonsDiagnostic() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

  async function run(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    setLoading(true);
    setError(null);
    setDiagnosis(null);
    try {
      const res = await fetch("/api/data-dragons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: value }),
      });
      const data = await res.json();
      if (!res.ok) setError(data?.error ?? "Something went sideways. Try again.");
      else setDiagnosis(data as Diagnosis);
    } catch {
      setError("Couldn't reach the realm. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={600}
            placeholder="describe your data system, pipeline, or the org around it…"
            className="flex-1 bg-gray-800/70 border border-gray-700 focus:border-fuchsia-400 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {loading ? "Scrying…" : "Name the dragons"}
          </button>
        </form>

        {!diagnosis && !loading && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {SEEDS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setInput(s);
                  run(s);
                }}
                className="text-xs text-gray-400 hover:text-fuchsia-300 border border-gray-700 hover:border-fuchsia-500/50 rounded-full px-3 py-1.5 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {error && <p className="mt-6 text-center text-sm text-red-400">{error}</p>}

        <AnimatePresence mode="wait">
          {diagnosis && (
            <motion.div
              key={diagnosis.verdict}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-4"
            >
              {diagnosis.infestations.length === 0 && (
                <p className="text-center text-gray-400">
                  No dragons surfaced from that — give the realm more to work with.
                </p>
              )}

              {diagnosis.infestations.map((inf, i) => (
                <motion.div
                  key={inf.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.18, duration: 0.4 }}
                  className={`rounded-xl border ${inf.borderColor} bg-gradient-to-br ${inf.gradientFrom} ${inf.gradientTo} p-5`}
                >
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-white">{inf.name}</h3>
                    <span className={`text-xs font-mono italic ${inf.tagText}`}>{inf.latin}</span>
                  </div>
                  <p className="text-gray-200 mt-3 leading-relaxed text-sm">{inf.yourCase}</p>
                  <div className={`mt-3 text-sm rounded-lg px-3 py-2 ${inf.tagBg}`}>
                    <span className={`font-semibold ${inf.tagText}`}>The move — </span>
                    <span className="text-gray-200">{inf.theMove}</span>
                  </div>
                </motion.div>
              ))}

              {diagnosis.verdict && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + diagnosis.infestations.length * 0.18, duration: 0.4 }}
                  className="text-center text-gray-300 italic pt-2 leading-relaxed"
                >
                  {diagnosis.verdict}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + diagnosis.infestations.length * 0.18, duration: 0.4 }}
                className="flex flex-wrap gap-4 justify-center items-center pt-2"
              >
                <a
                  href="/writings/data-dragons-story"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-fuchsia-600/20 border border-fuchsia-500/40 text-fuchsia-300 hover:bg-fuchsia-600/30 hover:border-fuchsia-400 transition-all"
                >
                  Read the full bestiary →
                </a>
                <button
                  onClick={() => {
                    setDiagnosis(null);
                    setInput("");
                  }}
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                >
                  scry another system
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-xs text-gray-600">
          An instrument, disclosed as such — a fast model reading your system against five named
          failure modes drawn from a real resettlement database.
        </p>
      </div>
    </section>
  );
}
