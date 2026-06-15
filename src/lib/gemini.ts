// Shared Gemini Flash helper for the content-agents (Frequency Finder,
// Track Brief Generator, …). REST, no SDK. Forces JSON via responseSchema and
// turns thinking off — these are simple structured tasks, and 2.5 Flash
// otherwise spends the whole token budget thinking and truncates the JSON.

const MODEL = "gemini-2.5-flash";
const endpoint = (key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;

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

/**
 * Call Gemini Flash with a forced JSON schema and parse the result.
 * Returns a discriminated union so routes can map failures to clean messages.
 */
export async function callGeminiJSON<T>(opts: {
  system: string;
  user: string;
  schema: object;
  temperature?: number;
  maxOutputTokens?: number;
}): Promise<GeminiResult<T>> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 500, error: "Server is missing GOOGLE_GENERATIVE_AI_API_KEY." };
  }

  let res: Response;
  try {
    res = await fetch(endpoint(apiKey), {
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
    console.error("Could not parse model JSON:", raw);
    return { ok: false, status: 502, error: "The model garbled its answer. Try again." };
  }
}
