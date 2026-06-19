/**
 * POST /api/search
 * Body: { query: string, topK?: number }
 *
 * Primary path: Pinecone integrated semantic search (llama-text-embed-v2).
 * Graceful fallback: in-repo searchContent() keyword search when
 *   PINECONE_API_KEY is absent or the Pinecone call throws.
 *
 * Response: { results: SearchResult[], source: 'pinecone' | 'fallback' }
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchContent } from '@/utils/content';

export interface SearchResult {
  slug: string;
  title: string;
  section: string;
  excerpt?: string;
  score?: number;
}

const INDEX_NAME = 'khayali';
const NAMESPACE = 'content';
const DEFAULT_TOP_K = 10;

type HitFields = {
  title?: string;
  section?: string;
  slug?: string;
  chunk_text?: string;
};

/**
 * Run semantic search against the Pinecone integrated index.
 * Returns null if PINECONE_API_KEY is absent; throws on real errors (caught by caller).
 */
async function pineconeSearch(
  query: string,
  topK: number
): Promise<SearchResult[] | null> {
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) return null;

  // Dynamic import keeps the SDK out of the client bundle
  const { Pinecone } = await import('@pinecone-database/pinecone');
  const pc = new Pinecone({ apiKey });
  const ns = pc.index(INDEX_NAME).namespace(NAMESPACE);

  const response = await ns.searchRecords({
    query: {
      topK,
      inputs: { text: query },
    },
    fields: ['title', 'section', 'slug', 'chunk_text'],
  });

  const hits = response.result?.hits ?? [];

  return hits.map((hit) => {
    const fields = (hit.fields ?? {}) as HitFields;
    return {
      slug: fields.slug ?? hit._id,
      title: fields.title ?? hit._id,
      section: fields.section ?? '',
      excerpt: fields.chunk_text,
      score: hit._score,
    };
  });
}

/**
 * Keyword fallback using the existing in-repo searchContent().
 */
async function fallbackSearch(query: string, topK: number): Promise<SearchResult[]> {
  const items = await searchContent(query);
  return items.slice(0, topK).map(item => ({
    slug: item.slug,
    title: item.title,
    section: item.category ?? '',
    excerpt: item.excerpt,
  }));
}

export async function POST(req: NextRequest) {
  let body: { query?: string; topK?: number };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { query, topK = DEFAULT_TOP_K } = body;

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return NextResponse.json(
      { error: 'query must be a non-empty string' },
      { status: 400 }
    );
  }

  // Try Pinecone first
  try {
    const pineconeResults = await pineconeSearch(query.trim(), topK);

    if (pineconeResults !== null) {
      return NextResponse.json({ results: pineconeResults, source: 'pinecone' });
    }
  } catch (err) {
    console.error('[/api/search] Pinecone error, falling back:', err);
  }

  // Graceful fallback to keyword search
  try {
    const fallbackResults = await fallbackSearch(query.trim(), topK);
    return NextResponse.json({ results: fallbackResults, source: 'fallback' });
  } catch (err) {
    console.error('[/api/search] Fallback search error:', err);
    return NextResponse.json({ error: 'Search unavailable' }, { status: 500 });
  }
}
