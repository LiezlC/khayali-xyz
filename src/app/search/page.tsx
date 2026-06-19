'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SearchResult } from '@/app/api/search/route';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim(), topK: 20 }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Search failed');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during search');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const buildHref = (result: SearchResult): string => {
    if (result.section && result.slug) {
      return `/${result.section}/${result.slug}`;
    }
    return '#';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900">
      {/* Back link */}
      <div className="absolute top-4 left-4 z-10">
        <a href="/" className="text-sm text-gray-300 hover:text-white underline">
          ← Back to Home
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="relative container mx-auto max-w-4xl text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Search
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore content across khayali's creative and experimental works.
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="container mx-auto max-w-4xl px-4 pb-20">
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, topic, or keyword..."
              className="flex-1 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              aria-label="Search query"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-12 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Results */}
        {searched && (
          <div>
            {loading ? (
              <div className="text-center py-20 text-gray-400">
                <div className="inline-block animate-spin mb-4">
                  <div className="w-8 h-8 border-3 border-gray-600 border-t-purple-400 rounded-full" />
                </div>
                <p>Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div>
                <p className="text-sm text-gray-400 mb-8">
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </p>
                <div className="space-y-4">
                  {results.map((result) => (
                    <Link
                      key={`${result.section}-${result.slug}`}
                      href={buildHref(result)}
                      className="group block p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-purple-500 hover:bg-gray-800/80 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors mb-1 line-clamp-2">
                            {result.title}
                          </h3>
                          {result.section && (
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                              {result.section}
                            </p>
                          )}
                        </div>
                        {result.score !== undefined && (
                          <div className="text-xs text-gray-500 whitespace-nowrap">
                            Score: {result.score.toFixed(2)}
                          </div>
                        )}
                      </div>
                      {result.excerpt && (
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                          {result.excerpt}
                        </p>
                      )}
                      <div className="mt-4 text-purple-400 font-semibold text-sm group-hover:text-purple-300 transition-colors">
                        Read More →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-4">
                  No results found for "{query}"
                </p>
                <p className="text-gray-500">
                  Try different keywords or explore from the homepage.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!searched && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Start searching to explore content</p>
          </div>
        )}
      </section>
    </div>
  );
}
