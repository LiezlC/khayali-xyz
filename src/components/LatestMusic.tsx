import { getLatestYouTubeVideos, type MusicRelease } from '@/lib/musicFeeds'

function ReleaseRail({ releases }: { releases: MusicRelease[] }) {
  return (
    // Capped at four across. At `2xl:grid-cols-6` inside a full-bleed container,
    // a wide monitor rendered six 16:9 thumbnails in a row with 12px titles.
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {releases.map((release) => (
        <a
          key={`${release.source}-${release.id}`}
          href={release.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 hover:border-red-400/70 transition-all"
        >
          <img
            src={release.image}
            alt=""
            className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
          <div className="p-4">
            <p className="font-semibold text-gray-100 leading-snug">{release.title}</p>
            <p className="text-xs mt-2 text-red-400">
              {release.source === 'spotify' ? 'Listen on Spotify' : 'Watch on YouTube'} &rarr;
            </p>
          </div>
        </a>
      ))}
    </div>
  )
}

export default async function LatestMusic() {
  const youtube = await getLatestYouTubeVideos()
  if (!youtube.length) return null

  return (
    <section className="py-20 border-y border-purple-500/15 bg-gray-950/30">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl text-[var(--cream)] mb-3">Latest transmissions</h2>
        <p className="text-lg text-gray-400 max-w-2xl mb-12">
          Fresh uploads arrive here automatically. The arcs above stay curated by hand.
        </p>
        <ReleaseRail releases={youtube} />
      </div>
    </section>
  )
}
