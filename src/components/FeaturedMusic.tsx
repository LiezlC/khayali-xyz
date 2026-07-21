import {
  FEATURED_PLAYLISTS_PER_WEEK,
  FEATURED_ROTATION_START,
  FEATURED_TRACKS_PER_WEEK,
  featuredPlaylists,
  featuredTracks,
  type FeaturedMusicItem,
} from "@/data/featuredMusic";

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

function rotatingWindow(
  items: FeaturedMusicItem[],
  count: number,
  rotationNumber: number,
) {
  if (items.length === 0) return [];

  const start = (rotationNumber * count) % items.length;
  return Array.from(
    { length: Math.min(count, items.length) },
    (_, index) => items[(start + index) % items.length],
  );
}

function getRotationNumber(now = new Date()) {
  const start = new Date(FEATURED_ROTATION_START).getTime();
  return Math.max(0, Math.floor((now.getTime() - start) / WEEK_IN_MS));
}

function MusicCard({ item, kind }: { item: FeaturedMusicItem; kind: "track" | "playlist" }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 hover:border-red-400/70 transition-all"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt=""
          className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
        {kind === "playlist" ? (
          <span className="absolute left-3 top-3 rounded-full border border-purple-300/30 bg-gray-950/80 px-3 py-1 text-xs font-mono uppercase tracking-wider text-purple-200">
            Playlist
          </span>
        ) : null}
      </div>
      <div className="p-4">
        <p className="font-semibold text-gray-100 leading-snug">{item.title}</p>
        <p className="text-xs mt-2 text-red-400">
          {kind === "playlist" ? "Open playlist" : "Watch on YouTube"} &rarr;
        </p>
      </div>
    </a>
  );
}

export default function FeaturedMusic() {
  const rotationNumber = getRotationNumber();
  const tracks = rotatingWindow(featuredTracks, FEATURED_TRACKS_PER_WEEK, rotationNumber);
  const playlists = rotatingWindow(
    featuredPlaylists,
    FEATURED_PLAYLISTS_PER_WEEK,
    rotationNumber,
  );

  return (
    <section className="py-20 border-y border-purple-500/15 bg-gray-950/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-100 mb-3">Featured from the signal</h2>
        <p className="text-lg text-gray-400 max-w-2xl mb-12">
          A changing selection from the Khayali catalogue, with new tracks and playlists featured each week.
        </p>

        <div className="mb-14">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-100">Featured tracks</h3>
            <p className="text-gray-500 mt-1">Six tracks, rotating every Monday.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-5">
            {tracks.map((track) => (
              <MusicCard key={track.id} item={track} kind="track" />
            ))}
          </div>
        </div>

        <div className="mb-14">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-100">Featured playlists</h3>
            <p className="text-gray-500 mt-1">Two longer journeys from the current rotation.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl">
            {playlists.map((playlist) => (
              <MusicCard key={playlist.id} item={playlist} kind="playlist" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
