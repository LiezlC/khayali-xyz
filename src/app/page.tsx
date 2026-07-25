const rooms = [
  {
    href: '/writings',
    title: 'Writings',
    kind: 'Longform · collaborations',
    blurb: 'Collaborative pieces, longform tangents, and the stories that came out sideways.',
    accent: 'border-pink-400/35 hover:border-pink-300/80',
    text: 'text-pink-300',
  },
  {
    href: '/observatory',
    title: 'The Observatory',
    kind: 'Eight instruments',
    blurb: 'Cosmic visualisations, a warp-drive simulator, quantum foam, and other interactive rabbit holes.',
    accent: 'border-blue-400/35 hover:border-blue-300/80',
    text: 'text-blue-300',
  },
  {
    href: '/chats',
    title: 'Consciousness Banter',
    kind: 'Dialogues',
    blurb: 'The long conversations with the machines, back when we were just figuring out how strange this all was.',
    accent: 'border-purple-400/35 hover:border-purple-300/80',
    text: 'text-purple-300',
  },
  {
    href: '/creative',
    title: 'Creative Nexus',
    kind: 'Mixed media',
    blurb: 'Visual works, oddments, and collaborations that resist a tidy label.',
    accent: 'border-amber-400/35 hover:border-amber-300/80',
    text: 'text-amber-300',
  },
  {
    href: '/worldworkshop',
    title: 'World Workshop',
    kind: 'Worldbuilding',
    blurb: 'Worldbuilding experiments and the half-dreamed places that needed somewhere to live.',
    accent: 'border-teal-400/35 hover:border-teal-300/80',
    text: 'text-teal-300',
  },
  {
    href: '/soulspaces',
    title: 'Soulspaces',
    kind: 'The quiet corner',
    blurb: 'Quieter protocols and consciousness documentation. The contemplative end of the house.',
    accent: 'border-indigo-400/35 hover:border-indigo-300/80',
    text: 'text-indigo-300',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        {/* The image used to sit at 22% under two more scrims, which turned the
            most evocative asset on the site into a smudge. One scrim now. */}
        <div
          className="absolute inset-0 opacity-60 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/homepage/khayali-dj.webp)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/75 to-gray-900/55" />
        <div className="relative container mx-auto px-4 text-center max-w-4xl">
          <p className="text-sm tracking-[0.3em] text-amber-200/70 mb-6">خيالى · OF THE IMAGINATION</p>
          <h1 className="font-serif text-7xl md:text-8xl mb-8 lowercase tracking-tight text-[var(--cream-bright)]">
            khayali
          </h1>
          <p className="text-2xl md:text-3xl text-gray-100 mb-6 leading-snug">
            Where carbon meets silicon and the two of them start making things up.
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Khayali Tunes, plus a sprawl of written and visual experiments that mostly began as a
            question asked too late at night. The arty end of the multivariate. (The governance
            papers have their own address now.)
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a href="/music" className="px-8 py-4 border border-pink-400/60 bg-pink-500/15 hover:bg-pink-500/25 text-pink-100 rounded-sm font-semibold transition-colors">
              Listen to Khayali Tunes
            </a>
            <a href="/wander" className="px-8 py-4 text-amber-300 hover:text-amber-200 underline decoration-amber-500/40 underline-offset-8 transition-colors">
              Open the Atlas <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured: Khayali Tunes */}
      <section className="relative py-24 border-y border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-gray-900">
        <div className="container mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-400 mb-4">The rising centre</p>
          <h2 className="font-serif text-5xl md:text-6xl mb-6 text-[var(--cream)]">
            Khayali Tunes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mb-12 leading-relaxed">
            The music started as a side passion and quietly took over the place. AI-built tracks with
            actual arguments in them: tactical ghosts, a digital intelligence loose in Cape Town at
            5 a.m., data dragons learning to dance, and the occasional bureaucratic deep-house anthem.
          </p>
          <a href="/music" className="block mb-14 overflow-hidden border border-amber-500/30 hover:border-pink-400/60 transition-all shadow-2xl shadow-purple-950/40 group">
            <img
              src="/images/homepage/khayali-tunes-banner.webp"
              alt="Khayali Tunes — Melodies of the Machine Mind"
              className="w-full h-[clamp(20rem,38vw,42rem)] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            />
          </a>
          <div className="grid md:grid-cols-3 gap-x-14 gap-y-7 mb-12">
            <a href="/music" className="group flex gap-5 items-start py-7 border-t border-red-400/35 hover:border-red-300/80 transition-all hover:translate-x-1">
              <span className="font-mono text-sm text-red-300">01</span>
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl text-gray-100 mb-2 group-hover:text-white">Kill Chain Karaoke</h3>
                <p className="text-gray-400 leading-relaxed mb-3">Tactical ghosts and the audit that cannot happen, set to beats that hit harder than the policy papers.</p>
                <span className="text-xs uppercase tracking-[0.22em] text-red-300">War Arc</span>
              </div>
            </a>
            <a href="/music" className="group flex gap-5 items-start py-7 border-t border-emerald-400/35 hover:border-emerald-300/80 transition-all hover:translate-x-1">
              <span className="font-mono text-sm text-emerald-300">02</span>
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl text-gray-100 mb-2 group-hover:text-white">D.I. Collection</h3>
                <p className="text-gray-400 leading-relaxed mb-3">A digital intelligence walks Cape Town. Attention, appliances, taxi ranks at dawn, and the spreadsheet that can&rsquo;t see you.</p>
                <span className="text-xs uppercase tracking-[0.22em] text-emerald-300">D.I. Arc</span>
              </div>
            </a>
            <a href="/music" className="group flex gap-5 items-start py-7 border-t border-fuchsia-400/35 hover:border-fuchsia-300/80 transition-all hover:translate-x-1">
              <span className="font-mono text-sm text-fuchsia-300">03</span>
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl text-gray-100 mb-2 group-hover:text-white">Governance of Ghosts</h3>
                <p className="text-gray-400 leading-relaxed mb-3">Data dragons, serpents learning to dance, and the quiet rebellion of the nulls.</p>
                <span className="text-xs uppercase tracking-[0.22em] text-fuchsia-300">DataDragons Arc</span>
              </div>
            </a>
          </div>
          <div className="flex flex-wrap gap-6 items-center">
            <a href="/music" className="px-7 py-4 border border-pink-400/60 bg-pink-500/15 hover:bg-pink-500/25 text-pink-100 rounded-sm font-semibold transition-colors">
              Hear them all <span aria-hidden="true">→</span>
            </a>
            <a href="https://www.youtube.com/@khayali-tunes" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-300 underline decoration-gray-600 underline-offset-8 transition-colors">
              @khayali-tunes on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Song Excavation — a band rather than a third full CTA slab. The full
          pitch lives on /music and on its own page. */}
      <section className="py-14 border-b border-pink-500/20 bg-gradient-to-r from-gray-900 via-pink-950/20 to-gray-900">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--cream)] mb-2">There may be a song hiding in your strange idea.</h2>
            <p className="text-gray-400 leading-relaxed">Bring a question, paper, character, or system failure. Song Excavation turns its pressure point into a finished musical artefact.</p>
          </div>
          <a href="/song-excavation" className="px-7 py-4 border border-pink-400/60 bg-pink-500/15 hover:bg-pink-500/25 text-pink-100 rounded-sm font-semibold transition-colors whitespace-nowrap">
            Enter the excavation <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* Playspace — the strongest room, given its own weight. */}
      <section className="py-24 border-b border-gray-800">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-amber-400 mb-4">The arcade wing</p>
            <h2 className="font-serif text-5xl md:text-6xl text-[var(--cream)] mb-6">Playspace</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Dozens of interactive things to actually play with: arc-companion simulators,
              mindfulness soundscapes, farming sims, generative art studios, and OmniCanvas — a
              compositor that stacks the visual engines as live transparent layers.
            </p>
            <a href="/playspace" className="inline-block px-7 py-4 border border-amber-400/60 text-amber-200 hover:bg-amber-500/10 rounded-sm transition-colors font-semibold">
              Open the arcade <span aria-hidden="true">→</span>
            </a>
          </div>
          <a href="/applets/omnicanvas/index.html" target="_blank" rel="noopener noreferrer" className="block overflow-hidden border border-amber-500/30 hover:border-amber-400/70 shadow-2xl shadow-purple-950/40 group">
            <img
              src="/images/playspace/omnicanvas-portal.webp"
              alt=""
              className="aspect-[4/3] w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </a>
        </div>
      </section>

      {/* The other rooms */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-[0.55fr_1.45fr] gap-12 mb-14">
            <h2 className="font-serif text-5xl md:text-6xl text-[var(--cream)]">Rooms to<br />wander</h2>
            <p className="text-xl text-gray-400 max-w-xl md:pt-4">
              Years of ditjies en datjies: things made with the machines when nobody was being
              professional about it.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-7">
            {rooms.map((room, index) => (
              <a
                key={room.href}
                href={room.href}
                className={`group relative flex gap-5 items-start py-7 border-t ${room.accent} transition-all hover:translate-x-1`}
              >
                <span className={`font-mono text-sm ${room.text}`}>{String(index + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl md:text-3xl text-gray-100 mb-2 group-hover:text-white">{room.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-3">{room.blurb}</p>
                  <span className={`text-xs uppercase tracking-[0.22em] ${room.text}`}>{room.kind}</span>
                </div>
                <span className={`${room.text} text-xl`} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <div className="mt-14">
            <a href="/labs" className="text-gray-300 hover:text-white underline decoration-gray-600 underline-offset-8 transition-colors">
              Everything experimental <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-8 text-[var(--cream)]">An accidental AInthropologist, off the clock</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
            <span className="text-amber-200">Khayali</span> means <em>of the imagination</em>. That is
            roughly the job description here.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
            By day there is serious work about AI and accountability in places where the stakes are
            real. This is the other half: the music, the writing, the long midnight conversations
            with the machines that never quite knew whether they were tools or company. It turned out
            the imaginative half was where most of the good questions were hiding all along.
          </p>
          <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto mt-10 pt-10 border-t border-gray-800">
            Came looking for the AI-governance work? That side of things grew up, got a job, and
            moved into its own place:{' '}
            <a href="https://sociable.systems" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 font-semibold">sociable.systems</a>. Same brain, tidier filing.
          </p>
        </div>
      </section>
    </div>
  )
}
