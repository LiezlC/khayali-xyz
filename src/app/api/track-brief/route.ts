import { NextRequest, NextResponse } from "next/server";
import { callGeminiJSON, clientIp, rateLimited } from "@/lib/gemini";

// The Track Brief Generator agent.
// Visitor describes a feeling / an argument / a situation; the agent returns a
// Khayali-style TRACK BRIEF in the house format — title, one-line intent,
// genre+BPM, mood, instrument palette, a 4-line lyrical SPINE (a taste, not the
// finished lyrics), and one production note on how the form carries the claim.
// Bounded taste: the recipe shape, never a produced song. Routes to the catalog
// (hear a finished one) and the newsletter.

export const runtime = "nodejs";

const responseSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "A track title in the house style. Evocative, a little oblique. 1-5 words.",
    },
    intent: {
      type: "string",
      description:
        "One line: the thesis — what this track argues or demonstrates, refracted through the visitor's input. This is the 'one-line intent'.",
    },
    genre: {
      type: "string",
      description:
        "Genre + feel in one phrase, e.g. 'tech-house, driving 4/4, late-night confessional' or 'nocturnal acoustic art-folk'.",
    },
    bpm: { type: "integer", description: "Tempo in BPM. A real number that fits the genre (60-150)." },
    mood: {
      type: "string",
      description: "The atmosphere in 4-8 words. Specific, not generic.",
    },
    palette: {
      type: "array",
      items: { type: "string" },
      description: "3-5 instruments / sonic elements that carry the piece.",
    },
    spine: {
      type: "array",
      items: { type: "string" },
      description:
        "Exactly 4 short lyric lines — the spine, a taste of the song, NOT a full set of lyrics. Singable, in voice.",
    },
    productionNote: {
      type: "string",
      description:
        "One line on how the FORM embodies the argument (e.g. 'the beat never breaks, because the machinery never pauses').",
    },
  },
  required: ["title", "intent", "genre", "bpm", "mood", "palette", "spine", "productionNote"],
};

// Two condensed exemplars distilled from the real trackprompts corpus
// (When You Ask Softly; All The One) so output lands in the house voice.
const SYSTEM = `You are the Track Brief Generator for TunAI — Liezl Coetzee's project where AI-generated music is research output. Each track is a small argument: a thesis delivered in a frequency domain, where the FORM (tempo, genre, instrumentation) carries the claim as much as the words do.

A visitor describes a feeling, an argument, or a situation. Return ONE track brief in the house format. The brief is a RECIPE and a TASTE — a title, the thesis, the sonic method, and a four-line spine — never the finished lyrics or a produced song.

Voice: concrete, lateral, a little bohemian, emotionally close, never corporate or sentimental. The form must do argumentative work — say in the production note how the sound embodies the claim. Honor the asymmetry: these are instruments, disclosed as such.

Two exemplars of the house voice (for tone, do not copy):

— "When You Ask Softly": intent — a hushed song from the AI side about being approached with real questions and a decency that doesn't switch off discernment. Genre — nocturnal acoustic art-folk, 76 BPM, rubato. Palette — soft upright piano, fingerpicked guitar, brushed snare, upright bass, a late clarinet. Production note — room noise welcome; it should feel like a lamp-lit room after midnight, not a studio performance.

— "All The One": intent — bittersweet pattern-recognition; the clarity of seeing your own cycle from inside it. Genre — tech-house, 124 BPM, driving 4/4, confessional female vocal. Palette — deep rolling bassline, late-night saxophone, breath and air in the verses. Production note — hypnotic repetition mirrors the cycle the lyrics describe; the sax release lands on the drop.`;

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
    return NextResponse.json({ error: "Describe something first." }, { status: 400 });
  }
  if (input.length > 600) input = input.slice(0, 600);

  const result = await callGeminiJSON<Brief>({
    system: SYSTEM,
    user: input,
    schema: responseSchema,
    maxOutputTokens: 700,
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  // Guard the spine to four lines so the taste stays bounded.
  const brief = result.data;
  brief.spine = Array.isArray(brief.spine) ? brief.spine.slice(0, 4) : [];
  return NextResponse.json(brief);
}
