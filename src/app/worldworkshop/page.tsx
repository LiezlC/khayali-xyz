import Link from 'next/link';
import { getContentByCategory } from '@/utils/content';

export default async function WorldWorkshopPage() {
  const content = await getContentByCategory('worldworkshop');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900">
      {/* Back link */}
      <div className="absolute top-4 left-4 z-10">
        <a
          href="/"
          className="text-sm text-gray-300 hover:text-white underline"
        >
          ← Back to Portfolio
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/cosmic/grok/00e09f3f-a612-4214-915b-45b23c05c2f9.jpg')] bg-cover bg-center" />

        <div className="relative container mx-auto max-w-6xl text-center">
          <div className="text-8xl mb-6">🌍</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            World Workshop
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Collaborative worldbuilding experiments—creating rich fictional universes
            through human-AI co-creation, including Project Aethel and beyond.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <div className="container mx-auto max-w-6xl px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, idx) => (
            <Link
              href={`/worldworkshop/${item.slug}`}
              key={item.slug}
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 float-animation overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-3 text-indigo-300 group-hover:text-indigo-200 transition-colors">
                  {item.title}
                </h2>
                {item.date && (
                  <p className="text-sm text-gray-500 mb-3">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {item.excerpt}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 text-indigo-400 font-semibold group-hover:text-indigo-300">
                  Explore World →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
