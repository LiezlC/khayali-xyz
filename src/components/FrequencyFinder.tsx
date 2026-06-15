"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The Frequency Finder — the first "content agent" on khayali.
// One input → a fast model picks the single arc whose argument matches → a
// staggered reveal that ends in a play button. Bounded taste, routes to depth.

interface Result {
  arc: {
    id: string;
    title: string;
    label: string;
    description: string;
    youtube: string;
    distrokid: string | null;
    tagBg: string;
    tagText: string;
    gradientFrom: string;
    gradientTo: string;
    borderColor: string;
  };
  track: string;
  theArgument: string;
  whyYou: string;
}

const PROMPTS = [
  "my org just shipped an AI nobody can refuse",
  "5am, the taxi rank, and the spreadsheet can't see me",
  "I stopped looking for the answer and something showed up",
  "the audit that cannot happen",
];

export default function FrequencyFinder() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function run(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/arc-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something went sideways. Try again.");
      } else {
        setResult(data as Result);
      }
    } catch {
      setError("Couldn't reach the Finder. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 bg-gray-900/40 border-y border-purple-500/10">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="text-xs font-mono text-purple-400 mb-3 tracking-widest uppercase">
            the frequency finder
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
            Which arc are you in?
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Tell it one line — a mood, a situation, a problem you&apos;re sitting in.
            It finds the single arc whose argument is your frequency, and the track to play first.
          </p>
        </div>

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
            placeholder="say one true line…"
            className="flex-1 bg-gray-800/70 border border-gray-700 focus:border-purple-400 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {loading ? "Tuning…" : "Find my arc"}
          </button>
        </form>

        {!result && !loading && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setInput(p);
                  run(p);
                }}
                className="text-xs text-gray-400 hover:text-purple-300 border border-gray-700 hover:border-purple-500/50 rounded-full px-3 py-1.5 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-6 text-center text-sm text-red-400">{error}</p>
        )}

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.arc.id + result.track}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className={`mt-8 rounded-xl border ${result.arc.borderColor} bg-gradient-to-br ${result.arc.gradientFrom} ${result.arc.gradientTo} p-6`}
            >
              {[
                <span
                  key="tag"
                  className={`inline-block text-xs font-mono px-2 py-1 rounded-full ${result.arc.tagBg} ${result.arc.tagText}`}
                >
                  {result.arc.label}
                </span>,
                <h3 key="title" className="text-2xl font-bold text-white mt-3">
                  {result.arc.title}
                </h3>,
                result.track ? (
                  <p key="track" className="text-sm text-gray-300 mt-1 italic">
                    start with &ldquo;{result.track}&rdquo;
                  </p>
                ) : null,
                <p key="arg" className="text-gray-200 mt-4 leading-relaxed">
                  {result.theArgument}
                </p>,
                result.whyYou ? (
                  <p key="why" className={`mt-3 text-sm ${result.arc.tagText} leading-relaxed`}>
                    {result.whyYou}
                  </p>
                ) : null,
                <div key="cta" className="flex flex-wrap gap-4 mt-6 items-center">
                  <a
                    href={result.arc.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600/30 hover:border-red-400 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                      <path fill="#0b0c10" d="M9.545 15.568V8.432L15.818 12z" />
                    </svg>
                    Play the arc
                  </a>
                  {result.arc.distrokid && (
                    <a
                      href={result.arc.distrokid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                      Streaming platforms
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setResult(null);
                      setInput("");
                    }}
                    className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    try another line
                  </button>
                </div>,
              ]
                .filter(Boolean)
                .map((child, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.35 }}
                  >
                    {child}
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-6 text-center text-xs text-gray-600">
          An instrument, disclosed as such — a fast model reading your line against seven arcs.
        </p>
      </div>
    </section>
  );
}
