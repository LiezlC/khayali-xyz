import { getLatestYouTubeVideos, type MusicRelease } from '@/lib/musicFeeds'

function ReleaseRail({ title, intro, releases, accent }: { title: string; intro: string; releases: MusicRelease[]; accent: 'green' | 'red' }) {
  if (!releases.length) return null
  const border = accent === 'green' ? 'hover:border-green-400/70' : 'hover:border-red-400/70'
  const text = accent === 'green' ? 'text-green-400' : 'text-red-400'
  return (
    <div className="mb-14">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div><h3 className="text-2xl font-bold text-gray-100">{title}</h3><p className="text-gray-500 mt-1">{intro}</p></div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {releases.map((release) => (
          <a key={`${release.source}-${release.id}`} href={release.url} target="_blank" rel="noopener noreferrer" className={`group overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 ${border} transition-all`}>
            <img src={release.image} alt="" className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-300" loading="lazy" />
            <div className="p-4"><p className="font-semibold text-gray-100 leading-snug">{release.title}</p><p className={`text-xs mt-2 ${text}`}>{release.source === 'spotify' ? 'Listen on Spotify' : 'Watch on YouTube'} &rarr;</p></div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default async function LatestMusic() {
  const youtube = await getLatestYouTubeVideos()
  return (
    <section className="py-20 border-y border-purple-500/15 bg-gray-950/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-gray-100 mb-3">Latest from the signal</h2>
        <p className="text-lg text-gray-400 max-w-2xl mb-12">Fresh releases arrive here automatically. The archive below remains curated by arc.</p>
        <div className="mb-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div><h3 className="text-2xl font-bold text-gray-100">Released music</h3><p className="text-gray-500 mt-1">The living Khayali catalogue on Spotify, updated as new DistroKid releases arrive.</p></div>
          </div>
          <iframe
            title="Khayali on Spotify"
            src="https://open.spotify.com/embed/artist/23Sf7aUE9vWsiznIxOKpee?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          />
        </div>
        <ReleaseRail title="Latest transmissions" intro="Recent uploads from Khayali Tunes." releases={youtube} accent="red" />
      </div>
    </section>
  )
}
