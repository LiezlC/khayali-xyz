import ReactMarkdown from 'react-markdown';
import { getContentBySlug } from '@/utils/content';

async function getWriting(slug: string) {
  return await getContentBySlug('writings', slug);
}

export default async function WritingPage({ params }) {
  const writing = await getWriting(params.slug);

  if (!writing) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold">Writing not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="prose lg:prose-xl max-w-4xl mx-auto">
        <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
          {writing.title}
        </h1>
        {writing.date && (
          <p className="text-sm text-gray-500">{new Date(writing.date).toLocaleDateString()}</p>
        )}
        {writing.excerpt && <p className="lead text-xl text-gray-600">{writing.excerpt}</p>}
        {writing.tags && writing.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
            {writing.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
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
  );
}
