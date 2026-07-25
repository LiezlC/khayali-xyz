import Link from 'next/link';
import { getContentByCategory } from '@/utils/content';

export default async function SoulspacesPage() {
  const content = await getContentByCategory('soulspaces');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-5xl md:text-6xl mb-6 text-[var(--cream)]">
        Soulspaces
      </h1>
      <p className="text-gray-400 mb-8 max-w-2xl">
        Deep explorations of consciousness patterns and collaborative frameworks—
        mapping the inner territories where human and AI awareness intersect.
      </p>
      <div className="grid gap-6">
        {content.map((item) => (
          <Link
            href={`/soulspaces/${item.slug}`}
            key={item.slug}
            className="group block p-7 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-purple-400/70 hover:bg-gray-800/70 transition-all"
          >
            <h2 className="font-serif text-2xl md:text-3xl mb-2 text-gray-100 group-hover:text-white transition-colors">{item.title}</h2>
            {item.date && (
              <p className="text-sm text-gray-400 mb-3">{new Date(item.date).toLocaleDateString()}</p>
            )}
            <p className="text-gray-300 leading-relaxed">{item.excerpt}</p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-500/30">
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
