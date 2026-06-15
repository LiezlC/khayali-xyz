import { NextRequest, NextResponse } from "next/server";
import { arcs } from "@/data/arcs";

// The Frequency Finder agent.
// Visitor types one line (a mood, a situation, a governance problem); a fast
// model matches them to ONE of the seven TunAI arcs and returns the argument
// that arc carries. Bounded taste: one arc, one track, ~15 seconds. The reveal
// ends in a play button that routes to the full playlist / the newsletter arc.

export const runtime = "nodejs";

// Closest "Flash" goto on the Generative Language API. Swap freely.
const MODEL = "gemini-2.5-flash";
const ENDPOINT = (model: string, key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

// --- Per-IP rate limit (in-memory; fine for the prototype / single instance) ---
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

// What we force the model to return. We let it pick an arc id and write the
// human-facing lines; everything else (urls, colors) we graft on server-side
// from the real arc record so the agent can never invent a dead link.
const responseSchema = {
  type: "object",
  properties: {
    arcId: {
      type: "string",
      enum: arcs.map((a) => a.id),
      description: "The id of the single best-matching arc.",
    },
    track: {
      type: "string",
      description:
        "A short, evocative track title or phrase that fits this arc and the visitor's input. Lowercase-cool, 2-5 words. Invent it in the house style if needed.",
    },
    theArgument: {
      type: "string",
      description:
        "One sentence: the argument this arc carries, refracted through the visitor's specific input. Sharp, not generic.",
    },
    whyYou: {
      type: "string",
      description:
        "One sentence addressed to the visitor ('you ...'): why this arc is their frequency right now. Warm, a little uncanny, never salesy.",
    },
  },
  required: ["arcId", "track", "theArgument", "whyYou"],
};

const SYSTEM = `You are the Frequency Finder for TunAI — Liezl Coetzee's project where AI-generated music is research output, and each musical "arc" carries its own argument about AI accountability, governance, consciousness, and the humans who hold the liability.

A visitor gives you one line: a mood, a situation, a problem they are sitting in. Match them to the SINGLE arc whose argument most resonates with what they said. Do not hedge across arcs; commit to one.

Voice: concrete, lateral, a little bohemian, never corporate. Honor the asymmetry — these are instruments Liezl built, not a colleague with stakes. Keep every field tight; this is a fifteen-second read.

The available arcs (id — arc — the argument it carries):
${arcs.map((a) => `- ${a.id} — ${a.arc} — ${a.argument}`).join("\n")}`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is missing GOOGLE_GENERATIVE_AI_API_KEY." },
      { status: 500 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Slow down a moment — too many requests. Try again shortly." },
      { status: 429 }
    );
  }

  let input = "";
  try {
    const body = await req.json();
    input = typeof body?.input === "string" ? body.input.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!input) {
    return NextResponse.json({ error: "Tell me one line first." }, { status: 400 });
  }
  if (input.length > 600) input = input.slice(0, 600);

  let data: any;
  try {
    const res = await fetch(ENDPOINT(MODEL, apiKey), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: input }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.9,
          maxOutputTokens: 500,
          // 2.5 Flash spends maxOutputTokens on thinking first; this is a
          // simple structured match, so turn thinking off to keep the budget
          // for the actual JSON.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
      // Don't let a slow upstream hang the route forever.
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Gemini error", res.status, detail);
      return NextResponse.json(
        { error: "The Finder is quiet right now. Try again in a moment." },
        { status: 502 }
      );
    }
    data = await res.json();
  } catch (err) {
    console.error("Arc-match fetch failed", err);
    return NextResponse.json(
      { error: "The Finder is quiet right now. Try again in a moment." },
      { status: 502 }
    );
  }

  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  let parsed: { arcId?: string; track?: string; theArgument?: string; whyYou?: string };
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error("Could not parse model JSON:", raw);
    return NextResponse.json(
      { error: "The Finder garbled its answer. Try again." },
      { status: 502 }
    );
  }

  const arc = arcs.find((a) => a.id === parsed.arcId) ?? arcs[0];

  return NextResponse.json({
    arc: {
      id: arc.id,
      title: arc.title,
      label: arc.arc,
      description: arc.description,
      youtube: arc.youtube,
      distrokid: arc.distrokid ?? null,
      tagBg: arc.tagBg,
      tagText: arc.tagText,
      gradientFrom: arc.gradientFrom,
      gradientTo: arc.gradientTo,
      borderColor: arc.borderColor,
    },
    track: parsed.track ?? "",
    theArgument: parsed.theArgument ?? arc.argument,
    whyYou: parsed.whyYou ?? "",
  });
}
