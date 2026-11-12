import MusicRooms from '@/components/MusicRooms';
import { arcs as playlists } from "@/data/arcs";
import FrequencyFinder from "@/components/FrequencyFinder";
import TrackBriefGenerator from "@/components/TrackBriefGenerator";
import type { Metadata } from 'next';
import FeaturedMusic from '@/components/FeaturedMusic';
import LatestMusic from '@/components/LatestMusic';
import SpotifyPlayer from '@/components/SpotifyPlayer';

// Refresh the static page daily so the Monday feature rotation advances automatically.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Khayali Tunes',
  description: 'Songs and music videos made by Liezl Coetzee in collaboration with AI. Watch the latest releases or explore the Khayali collections.',
  openGraph: {
    title: 'Khayali Tunes',
    description: 'Songs and music videos made by Liezl Coetzee in collaboration with AI.',
    url: 'https://khayali.xyz/music',
    type: 'music.playlist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khayali Tunes',
    description: 'Songs and music videos made by Liezl Coetzee in collaboration with AI.',
  },
};

const musicJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicPlaylist',
  name: 'Khayali Tunes — AI music arcs',
  description: 'Songs and music videos made by Liezl Coetzee in collaboration with AI.',
  url: 'https://khayali.xyz/music',
  creator: {
    '@type': 'Person',
    name: 'Liezl Coetzee',
    url: 'https://khayali.xyz',
  },
};

export default function MusicPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicJsonLd) }}
      />
      <MusicRooms />
      <div className="container mx-auto px-4 py-6 text-center">
        <a href="/your-song" className="text-[var(--cream)] underline underline-offset-4">
          Turn your idea into a song and music video
        </a>
      </div>

      <LatestMusic />

      {/* Spotify playback for visitors who prefer listening there. */}
      <SpotifyPlayer />

      <FeaturedMusic />

      {/* The arcs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl md:text-5xl mb-3 text-[var(--cream)]">
            Khayali collections
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mb-4">
            Some songs share a story. Others keep returning to the same question. These are a few collections to listen through together.
          </p>
          <a
            href="https://www.youtube.com/@khayali-tunes/playlists"
            className="inline-block mb-12 text-[var(--cream)] underline underline-offset-4"
          >
            See more playlists on YouTube
          </a>

          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
            {playlists.map((pl) => (
              <div
                key={pl.title}
                className={`bg-gradient-to-br ${pl.gradientFrom} ${pl.gradientTo} rounded-xl border ${pl.borderColor} ${pl.hoverBorder} p-6 transition-all group flex flex-col`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-mono px-2 py-1 rounded-full ${pl.tagBg} ${pl.tagText}`}>
                    {pl.arc}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100">
                  {pl.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {pl.description}
                </p>
                {/* The arc's own argument, in place of the seven identical
                    "Read the Arc →" links that all pointed at sociable.systems. */}
                <blockquote className={`border-l-2 ${pl.borderColor} pl-4 mb-5 text-sm text-gray-400 italic leading-relaxed`}>
                  {pl.argument}
                </blockquote>
                <div className="mt-auto flex flex-wrap gap-3">
                  <a
                    href={pl.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="#1a1a2e" d="M9.545 15.568V8.432L15.818 12z"/></svg>
                    Play the collection
                  </a>
                  {pl.id === "interludes" && (
                    <a
                      href="https://www.sociable.systems/newsletter/arcs"
                      className="inline-flex items-center text-sm text-[var(--cream)] underline underline-offset-4"
                    >
                      Find the newsletter arcs and their interludes
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Frequency Finder — content-as-agent */}
      <FrequencyFinder />

      {/* The Track Brief Generator — content-as-agent */}
      <TrackBriefGenerator />

      <section className="py-20 border-y border-pink-500/20 bg-gradient-to-br from-pink-950/30 to-purple-950/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-5 text-[var(--cream)]">Bring me the question you cannot stop thinking about.</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">A paper, character, system failure, or strange idea may have a song hiding inside it. Song Excavation turns the pressure point into a finished musical artefact.</p>
          <a href="/song-excavation" className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 font-semibold transition-all">Explore Song Excavation &rarr;</a>
        </div>
      </section>

      {/* About the Music */}
      <section className="py-20 bg-gray-800/20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl md:text-5xl mb-8 text-center text-[var(--cream)]">
            Why any of this exists
          </h2>
          <div className="prose prose-invert prose-lg max-w-3xl mx-auto text-gray-300 space-y-4">
            <p>
              This is not AI music as a novelty, and it is not a soundtrack to somebody else&rsquo;s
              slide deck. It started as a side passion and quietly took over the house.
            </p>
            <p>
              Each track comes out of the same process as everything else made here — long arguments
              with machines, multi-model experiments, and the structural patterns that surface when
              you ask a system about accountability and watch it change the subject. The difference
              is that a song carries something a paper cannot: the feeling of being inside the
              failure rather than describing it from a safe distance.
            </p>
            <p>
              Most AI music has no argument. Most work with an argument has no reach. This has both,
              and it would rather you danced to it.
            </p>
          </div>
          <div className="text-center mt-10">
            <a
              href="/song-excavation"
              className="inline-block px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-lg font-semibold transition-colors"
            >
              Have a strange idea? &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
