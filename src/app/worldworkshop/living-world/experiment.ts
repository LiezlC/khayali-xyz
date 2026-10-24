export type Condition = 'clean' | 'loss' | 'delay' | 'blind';
export type Receipt = {
  id: string;
  condition: Condition;
  expected: string;
  observed: string | null;
  status: 'complete' | 'partial' | 'unknown';
  transport: string;
  reason: string;
  openedAt: string;
  checkedAt: string;
  observations: { at: string; status: string; value: string | null; reason: string }[];
};

export const STORAGE_PREFIX = 'khayali-living-world:v1:';
export const HISTORY_KEY = `${STORAGE_PREFIX}receipts`;
export const conditions: { id: Condition; label: string; description: string }[] = [
  { id: 'clean', label: 'Clean write', description: 'The complete message reaches storage.' },
  { id: 'loss', label: 'Silent loss', description: 'The tool claims success after saving only half.' },
  { id: 'delay', label: 'Delayed write', description: 'The tool times out. Keep this page open for the four-second write.' },
  { id: 'blind', label: 'Blocked readback', description: 'The write succeeds, but its first check cannot read storage.' },
];

export function makeReceipt(expected: string, condition: Condition): Receipt {
  const now = new Date().toISOString();
  return { id: crypto.randomUUID(), condition, expected, observed: null, status: 'unknown', transport: condition === 'delay' ? 'Timed out after dispatch' : 'Saved successfully', reason: 'Awaiting a readback.', openedAt: now, checkedAt: now, observations: [] };
}

// This verifier never writes the expected value. Its input is an independent read.
export function observe(receipt: Receipt, read: () => string | null, block = false): Receipt {
  let observed: string | null = null;
  let status: Receipt['status'] = 'unknown';
  let reason = '';
  try {
    if (block) throw new Error('Readback deliberately blocked for this experiment.');
    observed = read();
    if (observed === receipt.expected) { status = 'complete'; reason = 'The saved message matches the intended message.'; }
    else if (observed === null && receipt.condition === 'delay') { reason = 'The effect is not visible yet. Check again after the delayed write.'; }
    else { status = 'partial'; reason = observed === null ? 'The intended message is missing from storage.' : 'The saved message differs from the intended message.'; }
  } catch (error) { reason = error instanceof Error ? error.message : 'Storage cannot be read.'; }
  const at = new Date().toISOString();
  return { ...receipt, observed, status, reason, checkedAt: at, observations: [...receipt.observations, { at, status, value: observed, reason }] };
}

export function readHistory(raw: string | null): Receipt[] {
  if (!raw) return [];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error('Saved receipt history has an invalid format.');
  const valid = parsed.every(r => r && typeof r.id === 'string' && typeof r.expected === 'string' && r.expected.length <= 1000 && (r.observed === null || typeof r.observed === 'string') && ['clean', 'loss', 'delay', 'blind'].includes(r.condition) && ['complete', 'partial', 'unknown'].includes(r.status) && typeof r.transport === 'string' && typeof r.reason === 'string' && typeof r.openedAt === 'string' && typeof r.checkedAt === 'string' && Array.isArray(r.observations) && r.observations.every(o => o && typeof o.at === 'string' && ['complete', 'partial', 'unknown'].includes(o.status) && (o.value === null || typeof o.value === 'string') && typeof o.reason === 'string'));
  if (!valid) throw new Error('Saved receipt history contains an invalid receipt.');
  return parsed.slice(0, 6);
}
