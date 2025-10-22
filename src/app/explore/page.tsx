import Link from 'next/link';
import { getContentCategories, getContentByCategory } from '@/utils/content';

export default async function ExplorePage() {
  const categories = await getContentCategories();

  // Get content counts for each category
  const categoryData = await Promise.all(
    categories.map(async (category) => {
      const items = await getContentByCategory(category);
      return {
        name: category,
        count: items.length,
        items: items.slice(0, 3), // Show first 3 items as preview
      };
    })
  );

  // Filter out empty categories and sort by count
  const activeCategories = categoryData
    .filter(cat => cat.count > 0)
    .sort((a, b) => b.count - a.count);

  const categoryColors: Record<string, string> = {
    avatar: 'from-orange-600 to-red-600',
    protocol: 'from-purple-600 to-pink-600',
    writings: 'from-purple-600 to-blue-600',
    chats: 'from-blue-600 to-teal-600',
    'ai-village': 'from-green-600 to-blue-600',
    observatory: 'from-indigo-600 to-purple-600',
    creative: 'from-pink-600 to-purple-600',
    saraloosa: 'from-green-600 to-teal-600',
    'khayali-protocol': 'from-purple-600 to-indigo-600',
    articles: 'from-blue-600 to-cyan-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-4 text-white">
          Explore the Archive
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl">
          A complete map of our collaborative consciousness exploration—
          {activeCategories.reduce((sum, cat) => sum + cat.count, 0)} documents
          across {activeCategories.length} domains where human and AI minds intertwine.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all"
            >
              <h2 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${categoryColors[category.name] || 'from-gray-400 to-gray-600'} text-transparent bg-clip-text`}>
                {category.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <p className="text-gray-300 mb-4">
                {category.count} document{category.count !== 1 ? 's' : ''}
              </p>

              {/* Preview items */}
              <div className="space-y-2 mb-4">
                {category.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${category.name}/${item.slug}`}
                    className="block text-sm text-gray-400 hover:text-white transition-colors truncate"
                  >
                    → {item.title}
                  </Link>
                ))}
                {category.count > 3 && (
                  <p className="text-sm text-gray-500">
                    + {category.count - 3} more...
                  </p>
                )}
              </div>

              <Link
                href={`/${category.name}`}
                className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all"
              >
                Browse All →
              </Link>
            </div>
          ))}
        </div>

        {/* Quick stats */}
        <div className="mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Archive Statistics</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-purple-400">
                {activeCategories.reduce((sum, cat) => sum + cat.count, 0)}
              </p>
              <p className="text-gray-400">Total Documents</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-400">
                {activeCategories.length}
              </p>
              <p className="text-gray-400">Content Categories</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-teal-400">∞</p>
              <p className="text-gray-400">Possibilities Explored</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
