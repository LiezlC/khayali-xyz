"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The Track Brief Generator — the second content-agent on khayali.
// Describe a feeling/argument → a fast model returns a Khayali-style track
// brief (the recipe + a 4-line taste), grounded in the house format of the
// trackprompts corpus. Bounded: the brief, never a produced song.

interface Brief {
  title: string;
  intent: string;
  genre: string;
  bpm: number;
  mood: string;
  palette: string[];
  spine: string[];
  productionNote: string;
}

const SEEDS = [
  "the dread of a meeting that should have been an email",
  "watching a parent forget my name, gently",
  "the argument that consent can't be retrofitted",
  "leaving a city you loved before it was ready",
];

export default function TrackBriefGenerator() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brief, setBrief] = useState<Brief | null>(null);

  async function run(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    setLoading(true);
    setError(null);
    setBrief(null);
    try {
      const res = await fetch("/api/track-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: value }),
      });
      const data = await res.json();
      if (!res.ok) setError(data?.error ?? "Something went sideways. Try again.");
      else setBrief(data as Brief);
    } catch {
      setError("Couldn't reach the studio. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="text-xs font-mono text-amber-400 mb-3 tracking-widest uppercase">
            the brief generator
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Turn it into a track
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Describe a feeling, an argument, a thing you&apos;re carrying. It writes a brief in the
            TunAI house style — the thesis, the sound, and a four-line spine. The recipe, not the
            finished song.
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
            placeholder="what should the track be about?"
            className="flex-1 bg-gray-800/70 border border-gray-700 focus:border-amber-400 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-amber-600 to-pink-600 hover:from-amber-700 hover:to-pink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {loading ? "Writing…" : "Write the brief"}
          </button>
        </form>

        {!brief && !loading && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {SEEDS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setInput(s);
                  run(s);
                }}
                className="text-xs text-gray-400 hover:text-amber-300 border border-gray-700 hover:border-amber-500/50 rounded-full px-3 py-1.5 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {error && <p className="mt-6 text-center text-sm text-red-400">{error}</p>}

        <AnimatePresence mode="wait">
          {brief && (
            <motion.div
              key={brief.title + brief.bpm}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-900/20 to-gray-900 p-6 font-mono text-sm"
            >
              {[
                <div key="head" className="flex items-baseline justify-between gap-3 border-b border-amber-500/20 pb-3">
                  <h3 className="text-xl font-bold text-white not-italic font-sans">
                    {brief.title}
                  </h3>
                  <span className="text-amber-300 whitespace-nowrap">{brief.bpm} BPM</span>
                </div>,
                <p key="intent" className="text-gray-200 mt-4 leading-relaxed font-sans italic">
                  {brief.intent}
                </p>,
                <div key="genre" className="mt-4">
                  <span className="text-amber-400/80 uppercase text-xs tracking-wider">Genre</span>
                  <p className="text-gray-300 mt-1">{brief.genre}</p>
                </div>,
                <div key="mood" className="mt-3">
                  <span className="text-amber-400/80 uppercase text-xs tracking-wider">Mood</span>
                  <p className="text-gray-300 mt-1">{brief.mood}</p>
                </div>,
                <div key="palette" className="mt-3">
                  <span className="text-amber-400/80 uppercase text-xs tracking-wider">Palette</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {brief.palette.map((p, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-gray-800/80 text-gray-300 border border-gray-700">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>,
                <div key="spine" className="mt-4">
                  <span className="text-amber-400/80 uppercase text-xs tracking-wider">Spine</span>
                  <div className="mt-2 pl-3 border-l-2 border-amber-500/40 font-sans text-gray-200 leading-relaxed">
                    {brief.spine.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>,
                <p key="note" className="mt-4 text-gray-400 font-sans leading-relaxed">
                  <span className="text-amber-400/80">↳ </span>
                  {brief.productionNote}
                </p>,
                <div key="cta" className="flex flex-wrap gap-4 mt-6 items-center font-sans">
                  <a
                    href="https://www.youtube.com/@khayali-tunes/podcasts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600/30 hover:border-red-400 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                      <path fill="#0b0c10" d="M9.545 15.568V8.432L15.818 12z" />
                    </svg>
                    Hear a finished one
                  </a>
                  <button
                    onClick={() => {
                      setBrief(null);
                      setInput("");
                    }}
                    className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    write another
                  </button>
                </div>,
              ].map((child, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.1, duration: 0.32 }}
                >
                  {child}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-6 text-center text-xs text-gray-600">
          An instrument, disclosed as such — a fast model writing in the house format. The finished
          tracks are made by hand from briefs like these.
        </p>
      </div>
    </section>
  );
}
