import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import { getContentBySlug, getContentByCategory } from '@/utils/content';

async function getWriting(slug: string) {
  return await getContentBySlug('writings', slug);
}

// Generate static paths for all writings
export async function generateStaticParams() {
  const writings = await getContentByCategory('writings');
  return writings.map((writing) => ({
    slug: writing.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const writing = await getWriting(params.slug);
  if (!writing) return {};
  const title = writing.title;
  const description = writing.excerpt || `A writing by Liezl Coetzee on khayali.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://khayali.xyz/writings/${params.slug}`,
    },
    twitter: { card: 'summary', title, description },
    other: writing.date ? { 'article:published_time': writing.date } : {},
  };
}

export default async function WritingPage({ params }: { params: { slug: string } }) {
  const writing = await getWriting(params.slug);

  if (!writing) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold">Writing not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <article className="prose prose-invert lg:prose-xl max-w-3xl mx-auto">
        <h1 className="font-serif text-[var(--cream)]">
          {writing.title}
        </h1>
        {writing.date && (
          <p className="text-sm text-gray-400">{new Date(writing.date).toLocaleDateString()}</p>
        )}
        {writing.excerpt && <p className="lead text-xl text-gray-300">{writing.excerpt}</p>}
        {writing.tags && writing.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
            {writing.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-500/30">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-8">
          <ReactMarkdown>{writing.content || ''}</ReactMarkdown>
        </div>
        </article>
      </div>
    </div>
  );
}
