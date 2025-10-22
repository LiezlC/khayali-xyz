import ReactMarkdown from 'react-markdown';
import { getContentBySlug, getContentByCategory } from '@/utils/content';
import Link from 'next/link';

async function getContent(slug: string) {
  return await getContentBySlug('soulspaces', slug);
}

export async function generateStaticParams() {
  const content = await getContentByCategory('soulspaces');
  return content.map((item) => ({
    slug: item.slug,
  }));
}

export default async function SoulspacesDetailPage({ params }: { params: { slug: string } }) {
  const content = await getContent(params.slug);

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold">Content not found</h1>
        <Link href="/soulspaces" className="text-indigo-600 hover:underline mt-4 inline-block">
          ← Back to Soulspaces
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/soulspaces" className="text-indigo-600 hover:underline mb-4 inline-block">
          ← Back to Soulspaces
        </Link>
        <article className="prose lg:prose-xl max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          {content.title}
        </h1>
        {content.date && (
          <p className="text-sm text-gray-500">{new Date(content.date).toLocaleDateString()}</p>
        )}
        {content.excerpt && <p className="lead text-xl text-gray-600">{content.excerpt}</p>}
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
            {content.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
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
