// Shared model helper for the content-agents (Frequency Finder, Track Brief
// Generator, Data Dragons Diagnostic, …). REST, no SDK.
//
// Primary: Gemini 2.5 Flash with a forced responseSchema and thinking off
// (2.5 Flash otherwise spends the whole token budget thinking and truncates).
// Fallback: if Gemini errors AND OPENROUTER_API_KEY is set, retry the same
// request through OpenRouter (OpenAI-compatible) in JSON-object mode. This
// removes the single-Gemini-key point of failure in production. The fallback
// is inert until OPENROUTER_API_KEY is present, so it ships safely.

const GEMINI_MODEL = "gemini-2.5-flash";
const geminiEndpoint = (key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`;

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
// Default to an open-weights model served by several providers (cheap, good at
// JSON, not a churny `:free` slug). Override with OPENROUTER_FALLBACK_MODEL.
const OPENROUTER_MODEL = process.env.OPENROUTER_FALLBACK_MODEL || "openai/gpt-oss-120b";

// --- Per-IP rate limit (in-memory; fine for the prototype / single instance) ---
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "local"
  );
}

// Single (non-union) shape so callers can read .error/.status without relying
// on discriminated-union narrowing, which is unreliable with `strict` disabled.
export interface GeminiResult<T> {
  ok: boolean;
  data?: T;
  status?: number;
  error?: string;
}

interface CallOpts {
  system: string;
  user: string;
  schema: object;
  temperature?: number;
  maxOutputTokens?: number;
}

/**
 * Call the primary model (Gemini) with a forced JSON schema; on failure, fall
 * back to OpenRouter if configured. Returns a flat result the routes map to
 * clean messages. Name kept for the existing call sites.
 */
export async function callGeminiJSON<T>(opts: CallOpts): Promise<GeminiResult<T>> {
  const gemini = await tryGemini<T>(opts);
  if (gemini.ok) return gemini;

  // Gemini failed — try the OpenRouter fallback if a key is present.
  if (process.env.OPENROUTER_API_KEY) {
    const fallback = await tryOpenRouter<T>(opts);
    if (fallback.ok) return fallback;
    // Both failed: surface the fallback's error (it's the last thing tried).
    return fallback;
  }
  return gemini;
}

async function tryGemini<T>(opts: CallOpts): Promise<GeminiResult<T>> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 500, error: "Server is missing GOOGLE_GENERATIVE_AI_API_KEY." };
  }

  let res: Response;
  try {
    res = await fetch(geminiEndpoint(apiKey), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: opts.system }] },
        contents: [{ role: "user", parts: [{ text: opts.user }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: opts.schema,
          temperature: opts.temperature ?? 0.9,
          maxOutputTokens: opts.maxOutputTokens ?? 600,
          // Keep the budget for the answer, not the thinking.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    console.error("Gemini fetch failed", err);
    return { ok: false, status: 502, error: "The model is quiet right now. Try again in a moment." };
  }

  if (!res.ok) {
    console.error("Gemini error", res.status, await res.text());
    return { ok: false, status: 502, error: "The model is quiet right now. Try again in a moment." };
  }

  const json = await res.json();
  const raw = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  try {
    return { ok: true, data: JSON.parse(raw) as T };
  } catch {
    console.error("Could not parse Gemini JSON:", raw);
    return { ok: false, status: 502, error: "The model garbled its answer. Try again." };
  }
}

async function tryOpenRouter<T>(opts: CallOpts): Promise<GeminiResult<T>> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return { ok: false, status: 502, error: "No fallback configured." };

  // OpenRouter is OpenAI-compatible. Use json_object mode and inline the schema
  // in the system prompt (json_schema support varies by underlying model).
  const system = `${opts.system}\n\nReturn ONLY a JSON object that conforms to this JSON Schema. No prose, no markdown fences:\n${JSON.stringify(opts.schema)}`;

  let res: Response;
  try {
    res = await fetch(OPENROUTER_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://khayali.xyz",
        "X-Title": "khayali content-agents",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content: opts.user },
        ],
        temperature: opts.temperature ?? 0.9,
        max_tokens: opts.maxOutputTokens ?? 600,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(20_000),
    });
  } catch (err) {
    console.error("OpenRouter fetch failed", err);
    return { ok: false, status: 502, error: "The model is quiet right now. Try again in a moment." };
  }

  if (!res.ok) {
    console.error("OpenRouter error", res.status, await res.text());
    return { ok: false, status: 502, error: "The model is quiet right now. Try again in a moment." };
  }

  const json = await res.json();
  const raw = json?.choices?.[0]?.message?.content;
  try {
    return { ok: true, data: JSON.parse(raw) as T };
  } catch {
    console.error("Could not parse OpenRouter JSON:", raw);
    return { ok: false, status: 502, error: "The model garbled its answer. Try again." };
  }
}
