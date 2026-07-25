import ReactMarkdown from 'react-markdown';
import { getContentBySlug, getContentByCategory } from '@/utils/content';
import Link from 'next/link';

async function getContent(slug: string) {
  return await getContentBySlug('khayali-protocol', slug);
}

export async function generateStaticParams() {
  const content = await getContentByCategory('khayali-protocol');
  return content.map((item) => ({
    slug: item.slug,
  }));
}

export default async function KhayaliProtocolDetailPage({ params }: { params: { slug: string } }) {
  const content = await getContent(params.slug);

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold">Content not found</h1>
        <Link href="/khayali-protocol" className="text-purple-600 hover:underline mt-4 inline-block">
          ← Back to Khayali Protocol
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Link href="/khayali-protocol" className="text-purple-600 hover:underline mb-4 inline-block">
          ← Back to Khayali Protocol
        </Link>
        <article className="prose prose-invert lg:prose-xl max-w-3xl mx-auto">
        <h1 className="font-serif text-[var(--cream)]">
          {content.title}
        </h1>
        {content.date && (
          <p className="text-sm text-gray-400">{new Date(content.date).toLocaleDateString()}</p>
        )}
        {content.excerpt && <p className="lead text-xl text-gray-300">{content.excerpt}</p>}
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
            {content.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-500/30">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-8">
          <ReactMarkdown>{content.content || ''}</ReactMarkdown>
        </div>
        </article>
      </div>
    </div>
  );
}
