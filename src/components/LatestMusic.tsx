import catalog from '@/data/khayaliYouTubeVideos.json'
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
  const feed = await getLatestYouTubeVideos()
  const firstCatalogEntry = feed.findIndex((video) => video.id === catalog[0].id)
  const recent = firstCatalogEntry === -1 ? [] : feed.slice(0, firstCatalogEntry)
  const knownIds = new Set(catalog.map((video) => video.id))
  const videos = [
    ...recent.filter((video) => !knownIds.has(video.id)),
    ...catalog,
  ]
  const releases: MusicRelease[] = videos.slice(0, 6).map((video) => ({
    ...video,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    image: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    date: '',
    source: 'youtube',
  }))

  return (
    <section className="py-12 md:py-16 border-y border-purple-500/15 bg-gray-950/30">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl text-[var(--cream)] mb-6">Latest music videos</h2>
        <ReleaseRail releases={releases} />
        <details className="mt-8 rounded-xl border border-gray-700 bg-gray-900/40">
          <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--cream)]">
            Browse all {videos.length} videos
          </summary>
          <ul className="grid gap-x-8 px-5 pb-5 sm:grid-cols-2">
            {videos.map((video) => (
              <li key={video.id} className="border-t border-gray-700/60 py-3">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  className="text-gray-200 hover:text-white underline underline-offset-4"
                >
                  {video.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  )
}
