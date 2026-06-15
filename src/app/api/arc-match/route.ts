import { NextRequest, NextResponse } from "next/server";
import { arcs } from "@/data/arcs";
import { callGeminiJSON, clientIp, rateLimited } from "@/lib/gemini";

// The Frequency Finder agent.
// Visitor types one line (a mood, a situation, a governance problem); a fast
// model matches them to ONE of the seven TunAI arcs and returns the argument
// that arc carries. Bounded taste: one arc, one track, ~15 seconds. The reveal
// ends in a play button that routes to the full playlist / the newsletter arc.

export const runtime = "nodejs";

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

interface ArcMatch {
  arcId: string;
  track: string;
  theArgument: string;
  whyYou: string;
}

export async function POST(req: NextRequest) {
  if (rateLimited(clientIp(req.headers))) {
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

  const result = await callGeminiJSON<ArcMatch>({
    system: SYSTEM,
    user: input,
    schema: responseSchema,
    maxOutputTokens: 500,
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const arc = arcs.find((a) => a.id === result.data.arcId) ?? arcs[0];

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
    track: result.data.track ?? "",
    theArgument: result.data.theArgument ?? arc.argument,
    whyYou: result.data.whyYou ?? "",
  });
}
