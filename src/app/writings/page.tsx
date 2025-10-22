import Link from 'next/link';
import { getContentByCategory } from '@/utils/content';

async function getWritings() {
  const writings = await getContentByCategory('writings');
  return writings;
}

export default async function WritingsPage() {
  const writings = await getWritings();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
        Writings & Creative Works
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Collaborative explorations at the intersection of human and artificial intelligence—
        where consciousness meets creativity.
      </p>
      <div className="grid gap-6">
        {writings.map((writing) => (
          <Link
            href={`/writings/${writing.slug}`}
            key={writing.slug}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{writing.title}</h2>
            {writing.date && (
              <p className="text-sm text-gray-500 mb-2">{new Date(writing.date).toLocaleDateString()}</p>
            )}
            <p className="text-gray-600">{writing.excerpt}</p>
            {writing.tags && writing.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {writing.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
