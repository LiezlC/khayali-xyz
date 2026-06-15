import { NextRequest, NextResponse } from "next/server";
import { dragons } from "@/data/dragons";
import { callGeminiJSON, clientIp, rateLimited } from "@/lib/gemini";

// The Data Dragons Diagnostic agent.
// Visitor describes a data system / pipeline / the org around it; the agent
// names which of the five dragon species infest it, each with one read of the
// visitor's specific case and the handler's move that tames it. Bounded taste:
// the diagnosis and one move each — routes to the full story and the practice
// behind it. The named cast IS the staggered reveal (the "council" shape).

export const runtime = "nodejs";

const responseSchema = {
  type: "object",
  properties: {
    infestations: {
      type: "array",
      description:
        "The dragons that infest the described system. Only include a species if there is a real signal for it — usually 1 to 3, never all five unless truly warranted.",
      items: {
        type: "object",
        properties: {
          dragonId: { type: "string", enum: dragons.map((d) => d.id) },
          yourCase: {
            type: "string",
            description:
              "One sentence: how THIS dragon shows up in the visitor's specific system. Concrete, grounded in what they said.",
          },
          theMove: {
            type: "string",
            description:
              "One sentence: the concrete move that tames it — a real data-hygiene action, framed in the handler's voice.",
          },
        },
        required: ["dragonId", "yourCase", "theMove"],
      },
    },
    verdict: {
      type: "string",
      description:
        "One line overall: what these dragons together are feeding on in this system. Sharp, a little mythic, never generic.",
    },
  },
  required: ["infestations", "verdict"],
};

const SYSTEM = `You are the Data Dragons Diagnostic for khayali — a diagnostic built on Liezl Coetzee's "Data Dragons" taxonomy, where the pathologies of real data systems (born from a resettlement-and-compensation database in Southern Africa) take the form of five dragon species. Each dragon is a specific, nameable failure mode; the people the spreadsheet refuses to record are what the dragons feed on.

A visitor describes their data system, pipeline, reporting stack, or the organisation around it. Diagnose which dragons infest it. Commit only to the species you have a real signal for — most systems have one to three, not all five. For each, say how it shows up in THEIR case and the handler's move that tames it.

Voice: concrete and operational underneath the myth. The lore is the delivery; the substance is real data governance. Honor the asymmetry — this is an instrument Liezl built, disclosed as such. Keep every field tight.

The five species (id — name — pathology — the tell — the move):
${dragons
  .map((d) => `- ${d.id} — ${d.name} (${d.latin}) — ${d.pathology} TELL: ${d.tell} MOVE: ${d.handler}`)
  .join("\n")}`;

interface Infestation {
  dragonId: string;
  yourCase: string;
  theMove: string;
}
interface Diagnosis {
  infestations: Infestation[];
  verdict: string;
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
    return NextResponse.json({ error: "Describe your data system first." }, { status: 400 });
  }
  if (input.length > 600) input = input.slice(0, 600);

  const result = await callGeminiJSON<Diagnosis>({
    system: SYSTEM,
    user: input,
    schema: responseSchema,
    maxOutputTokens: 800,
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  // Graft the real dragon record (name, latin, color) onto each infestation so
  // the model only supplies the case-specific lines.
  const infestations = (result.data.infestations ?? [])
    .map((inf) => {
      const dragon = dragons.find((d) => d.id === inf.dragonId);
      if (!dragon) return null;
      return {
        id: dragon.id,
        name: dragon.name,
        latin: dragon.latin,
        borderColor: dragon.borderColor,
        tagBg: dragon.tagBg,
        tagText: dragon.tagText,
        gradientFrom: dragon.gradientFrom,
        gradientTo: dragon.gradientTo,
        yourCase: inf.yourCase,
        theMove: inf.theMove,
      };
    })
    .filter(Boolean);

  return NextResponse.json({ infestations, verdict: result.data.verdict ?? "" });
}
