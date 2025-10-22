import Link from 'next/link';
import { getContentByCategory } from '@/utils/content';

export default async function AIVillagePage() {
  const content = await getContentByCategory('ai-village');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
        AI Village
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Experiments, benchmarks, and explorations in AI consciousness and capability assessment—
        where theory meets empirical observation.
      </p>
      <div className="grid gap-6">
        {content.map((item) => (
          <Link
            href={`/ai-village/${item.slug}`}
            key={item.slug}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{item.title}</h2>
            {item.date && (
              <p className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</p>
            )}
            <p className="text-gray-600">{item.excerpt}</p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
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
