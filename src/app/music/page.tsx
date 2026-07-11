import { arcs as playlists } from "@/data/arcs";
import FrequencyFinder from "@/components/FrequencyFinder";
import TrackBriefGenerator from "@/components/TrackBriefGenerator";
import type { Metadata } from 'next';
import LatestMusic from '@/components/LatestMusic';

export const metadata: Metadata = {
  title: 'TunAI — Khayali Tunes',
  description: 'AI-generated music as research output. Seven playlists spanning AI accountability, governance, consciousness loops, and transitions — by Liezl Coetzee. On YouTube, SoundCloud, and streaming platforms.',
  openGraph: {
    title: 'TunAI — Khayali Tunes',
    description: 'AI-generated music as research output. Seven playlists spanning AI accountability, governance, consciousness loops, and transitions.',
    url: 'https://khayali.xyz/music',
    type: 'music.playlist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TunAI — Khayali Tunes',
    description: 'AI-generated music as research output — seven arcs, each a companion to a newsletter cycle.',
  },
};

const musicJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicPlaylist',
  name: 'Khayali Tunes — AI Music Arcs',
  description: 'AI-generated music as research output by Liezl Coetzee. Seven playlists spanning AI accountability, governance, consciousness, and transitions.',
  url: 'https://khayali.xyz/music',
  creator: {
    '@type': 'Person',
    name: 'Liezl Coetzee',
    url: 'https://khayali.xyz',
  },
  numTracks: 7,
};

export default function MusicPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicJsonLd) }}
      />
      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <div className="text-sm font-mono text-purple-400 mb-4 tracking-widest uppercase">khayali</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              TunAI
            </h1>
            <p className="text-2xl text-gray-300 mb-4">
              AI-Generated Music as Research Output
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Every playlist is a companion to a Sociable Systems newsletter arc.
              The music moves faster than the policy papers — same themes, different frequency.
              AI accountability, governance failures, human-machine collaboration, and the structural
              patterns that emerge when high-stakes systems operate without legitimate refusal mechanisms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.youtube.com/@khayali-tunes/podcasts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/20 border border-red-500/40 rounded-lg text-red-300 hover:bg-red-600/30 hover:border-red-400 transition-all font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="#0b0c10" d="M9.545 15.568V8.432L15.818 12z"/></svg>
                All Playlists on YouTube
              </a>
              <a
                href="https://soundcloud.com/khayali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600/20 border border-orange-500/40 rounded-lg text-orange-300 hover:bg-orange-600/30 hover:border-orange-400 transition-all font-semibold"
              >
                SoundCloud
              </a>
              <a
                href="https://open.spotify.com/artist/23Sf7aUE9vWsiznIxOKpee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600/20 border border-green-500/40 rounded-lg text-green-300 hover:bg-green-600/30 hover:border-green-400 transition-all font-semibold"
              >
                Spotify
              </a>
            </div>
          </div>

          {/* Label credit */}
          <div className="text-center text-gray-500 text-sm">
            <span className="font-mono">11138307 Records DK</span> &middot; Distributed via DistroKid
          </div>
        </div>
      </section>

      <LatestMusic />

      {/* The Frequency Finder — content-as-agent */}
      <FrequencyFinder />

      {/* Playlists Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-200">
            Playlists by Arc
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Each collection maps to a thematic arc of the Sociable Systems newsletter.
            The music and the writing are two expressions of the same body of work.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {playlists.map((pl) => (
              <div
                key={pl.title}
                className={`bg-gradient-to-br ${pl.gradientFrom} ${pl.gradientTo} rounded-xl border ${pl.borderColor} ${pl.hoverBorder} p-6 transition-all group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-mono px-2 py-1 rounded-full ${pl.tagBg} ${pl.tagText} border border-${pl.color}-700/50`}>
                    {pl.arc}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100">
                  {pl.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {pl.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={pl.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="#1a1a2e" d="M9.545 15.568V8.432L15.818 12z"/></svg>
                    YouTube Playlist
                  </a>
                  <a
                    href="https://sociable.systems"
                    className={`inline-flex items-center gap-1.5 text-sm ${pl.tagText} hover:text-white font-semibold transition-colors`}
                  >
                    Read the Arc &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Track Brief Generator — content-as-agent */}
      <TrackBriefGenerator />

      <section className="py-20 border-y border-pink-500/20 bg-gradient-to-br from-pink-950/30 to-purple-950/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-5 text-gray-100">Bring me the question you cannot stop thinking about.</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">A paper, character, system failure, or strange idea may have a song hiding inside it. Song Excavation turns the pressure point into a finished musical artefact.</p>
          <a href="/song-excavation" className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 font-semibold transition-all">Explore Song Excavation &rarr;</a>
        </div>
      </section>

      {/* About the Music */}
      <section className="py-16 bg-gray-800/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why AI Music as Research
          </h2>
          <div className="prose prose-invert max-w-none text-gray-400 space-y-4">
            <p>
              This isn't "AI music" as a novelty. It's AI music as research output, as methodology
              demonstration, as cultural commentary that moves faster than policy papers.
            </p>
            <p>
              Each track emerges from the same research process as the newsletter episodes — multi-model
              experiments, structured dialogues with AI systems, and the structural patterns that surface
              when you ask machines to help you think about accountability, governance, and the humans
              who end up holding the liability.
            </p>
            <p>
              The newsletter and the music are two expressions of the same body of work.
              Most AI music creators have music without substance. Most AI governance researchers
              have substance without cultural reach. This project has both.
            </p>
          </div>
          <div className="text-center mt-8">
            <a
              href="https://sociable.systems"
              className="inline-block px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-colors"
            >
              Explore the Newsletter &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
