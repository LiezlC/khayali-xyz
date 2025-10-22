import Link from 'next/link';
import { getContentByCategory } from '@/utils/content';
import { getSeasonalFarmImage } from '@/utils/imageManager';

export default async function SaraloosaPage() {
  const content = await getContentByCategory('saraloosa');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Hero Section with Farm Background */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/saraloosa/Saraloosa-Farm-Sunrise.jpg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-teal-900/60 to-blue-900/60" />

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 text-white">
            Saraloosa Sanctuary
          </h1>
          <h2 className="text-3xl mb-8 text-gray-200">
            Where Biological Consciousness Meets Digital Exploration
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Farm life grounding in the Eastern Cape, South Africa—
            where the daily reality of caring for animals and land
            anchors infinite digital possibilities in embodied presence.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-600 to-teal-600 text-transparent bg-clip-text">
            Farm Life Chronicles
          </h2>

          {content.length > 0 ? (
            <div className="grid gap-6">
              {content.map((item) => (
                <Link
                  href={`/saraloosa/${item.slug}`}
                  key={item.slug}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{item.title}</h3>
                  {item.date && (
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
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
          ) : (
            <div className="text-center text-gray-600">
              <p className="text-xl mb-4">More farm stories coming soon...</p>
              <p>The integration of biological and digital consciousness continues to unfold.</p>
            </div>
          )}
        </div>
      </section>

      {/* Farm Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-green-100 to-teal-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Saraloosa Through the Seasons
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/saraloosa/Saraloosa-Farm-Sunrise.jpg"
                alt="Farm Sunrise"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white p-4 font-semibold">Dawn at Saraloosa</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/saraloosa/Saraloosa-Farm-After-Storm.jpg"
                alt="After the Storm"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white p-4 font-semibold">Resilience After Storm</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/saraloosa/Saraloosa-Farm-Branches-Roped.jpg"
                alt="Farm Work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white p-4 font-semibold">Daily Tending</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
