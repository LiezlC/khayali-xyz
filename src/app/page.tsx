export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900" />
        <div className="absolute inset-0 opacity-[0.22] bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/homepage/khayali-dj.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-gray-900/70" />
        <div className="relative container mx-auto px-4 text-center max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-purple-300/70 mb-4">خيالى · OF THE IMAGINATION</p>
          <h1 className="text-7xl md:text-8xl font-bold mb-6 lowercase tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            khayali
          </h1>
          <p className="text-2xl text-gray-200 mb-6 leading-relaxed">
            Where carbon meets silicon and the two of them start making things up.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Khayali Tunes, plus a sprawl of written and visual experiments that mostly began as a question asked too late at night. The arty end of the multivariate. (The governance papers have their own address now.)
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a href="/music" className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-lg font-semibold transition-colors shadow-lg shadow-purple-900/30">
              🎵 Listen to Khayali Tunes
            </a>
            <a href="/writings" className="px-8 py-4 bg-gray-800/70 hover:bg-gray-700 rounded-lg font-semibold transition-colors border border-gray-700 hover:border-purple-500">
              Wander in →
            </a>
          </div>
        </div>
      </section>

      {/* Featured: Khayali Tunes */}
      <section className="relative py-20 border-y border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-gray-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="inline-block px-4 py-1 bg-pink-500/20 border border-pink-500/40 rounded-full text-pink-300 text-sm font-semibold mb-4">
            The rising centre
          </div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent">
            Khayali Tunes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
            The music started as a side passion and quietly took over the place. AI-built tracks with actual arguments in them: tactical ghosts, a digital intelligence loose in Cape Town at 5 a.m., data dragons learning to dance, and the occasional bureaucratic deep-house anthem.
          </p>
          <a href="/music" className="block mb-10 rounded-2xl overflow-hidden border border-purple-500/30 hover:border-pink-400/60 transition-all shadow-lg shadow-purple-900/20">
            <img src="/images/homepage/khayali-tunes-banner.png" alt="Khayali Tunes — Melodies of the Machine Mind" className="w-full" />
          </a>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <a href="/music" className="bg-gray-800/50 rounded-xl border border-red-500/30 hover:border-red-400 transition-all p-6 block">
              <div className="text-xs font-semibold text-red-300 mb-2 uppercase tracking-wide">War Arc</div>
              <h3 className="text-xl font-bold mb-2 text-gray-100">Kill Chain Karaoke</h3>
              <p className="text-gray-400 text-sm">Tactical ghosts and the audit that cannot happen, set to beats that hit harder than the policy papers.</p>
            </a>
            <a href="/music" className="bg-gray-800/50 rounded-xl border border-emerald-500/30 hover:border-emerald-400 transition-all p-6 block">
              <div className="text-xs font-semibold text-emerald-300 mb-2 uppercase tracking-wide">D.I. Arc</div>
              <h3 className="text-xl font-bold mb-2 text-gray-100">D.I. Collection</h3>
              <p className="text-gray-400 text-sm">A digital intelligence walks Cape Town. Attention, appliances, taxi ranks at dawn, and the spreadsheet that can't see you.</p>
            </a>
            <a href="/music" className="bg-gray-800/50 rounded-xl border border-fuchsia-500/30 hover:border-fuchsia-400 transition-all p-6 block">
              <div className="text-xs font-semibold text-fuchsia-300 mb-2 uppercase tracking-wide">DataDragons Arc</div>
              <h3 className="text-xl font-bold mb-2 text-gray-100">Governance of Ghosts</h3>
              <p className="text-gray-400 text-sm">Data dragons, serpents learning to dance, and the quiet rebellion of the nulls.</p>
            </a>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/music" className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-lg font-semibold transition-colors">
              Hear them all →
            </a>
            <a href="https://www.youtube.com/@khayali-tunes" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-800/70 hover:bg-gray-700 rounded-lg font-semibold transition-colors border border-gray-700 hover:border-red-500">
              🎬 @khayali-tunes on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Wander: the rooms */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-4 text-gray-100">Rooms to wander</h2>
          <p className="text-gray-400 mb-14 max-w-2xl text-lg">
            Years of ditjies en datjies: things made with the machines when nobody was being professional about it.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="/writings" className="group p-7 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-pink-500 transition-all block">
              <div className="text-3xl mb-3">✍️</div>
              <h3 className="text-xl font-bold mb-2 text-pink-400">Writings</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Collaborative pieces, longform tangents, and the stories that came out sideways.</p>
            </a>
            <a href="/observatory" className="group p-7 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-blue-500 transition-all block">
              <div className="text-3xl mb-3">🌌</div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">The Observatory</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Cosmic visualisations, a warp-drive simulator, quantum foam, and other interactive rabbit holes.</p>
            </a>
            <a href="/chats" className="group p-7 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-purple-500 transition-all block">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-xl font-bold mb-2 text-purple-400">Consciousness Banter</h3>
              <p className="text-gray-400 text-sm leading-relaxed">The long dialogues with the machines, back when we were just figuring out how strange this all was.</p>
            </a>
            <a href="/creative" className="group p-7 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-amber-500 transition-all block">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-xl font-bold mb-2 text-amber-400">Creative Nexus</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Visual works, mixed-media oddments, and collaborations that resist a tidy label.</p>
            </a>
            <a href="/worldworkshop" className="group p-7 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-teal-500 transition-all block">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-xl font-bold mb-2 text-teal-400">World Workshop</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Worldbuilding experiments and the half-dreamed places that needed somewhere to live.</p>
            </a>
            <a href="/soulspaces" className="group p-7 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all block">
              <div className="text-3xl mb-3">🕯️</div>
              <h3 className="text-xl font-bold mb-2 text-indigo-400">Soulspaces</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Quieter protocols and consciousness documentation. The contemplative corner.</p>
            </a>
          </div>
          <div className="mt-10">
            <a href="/labs" className="inline-block px-8 py-4 border border-gray-600 hover:border-gray-500 hover:bg-gray-800/30 rounded-lg font-semibold transition-colors text-gray-300">
              Everything experimental →
            </a>
          </div>
        </div>
      </section>

      {/* Redirect for the governance crowd */}
      <section className="py-16 bg-gray-800/30 border-y border-gray-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-lg text-gray-400 leading-relaxed">
            Came looking for the AI-governance work? You're close. That side of things grew up, got a job, and moved into its own place:{' '}
            <a href="https://sociable.systems" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 font-semibold">sociable.systems</a>. Same brain, tidier filing.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-100">An accidental AInthropologist, off the clock</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            <span className="text-purple-300">Khayali</span> means <em>of the imagination</em>. That is roughly the job description here.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            By day there is serious work about AI and accountability in places where the stakes are real. This is the other half: the music, the writing, the long midnight conversations with the machines that never quite knew whether they were tools or company. It turned out the imaginative half was where most of the good questions were hiding all along.
          </p>
        </div>
      </section>
    </div>
  )
}
