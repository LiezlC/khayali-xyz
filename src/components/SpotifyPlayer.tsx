/**
 * The Spotify artist embed, as its own section so it can sit high on /music.
 * It used to live two thousand pixels down inside LatestMusic, which meant the
 * music page had no way to actually play anything above the fold.
 */
export default function SpotifyPlayer() {
  return (
    <section className="py-16 border-b border-purple-500/15 bg-gray-950/30">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--cream)] mb-2">Press play</h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            The living catalogue on Spotify, updated as new releases land.
          </p>
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
          className="rounded-xl max-w-5xl"
        />
      </div>
    </section>
  )
}
