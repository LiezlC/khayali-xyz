import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Song Excavation',
  description: 'Bring Khayali a question, paper, character, system failure, or strange idea. Get back the song hiding inside it.',
}

const requestHref = 'https://ko-fi.com/c/8e2c39dfca'
const emailHref = 'mailto:liezlc@khayali.xyz?subject=Song%20Excavation%20question'

export default function SongExcavationPage() {
  return <div className="min-h-screen overflow-hidden">
    <section className="relative py-24 md:py-32 border-b border-pink-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-900" />
      <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="relative container mx-auto px-4 max-w-5xl">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-7 bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">There may be a song hiding in your strange idea.</h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-5">Bring me a question, paper, character, system failure, or half-formed thought. I’ll find its pressure point and turn it into a finished musical artefact.</p>
          <p className="text-gray-400 text-lg max-w-2xl mb-10">This is not an audio summary. It is an artistic transformation: the contradiction, voice, ache, joke, or stubborn residue that wants to become music.</p>
          <div className="flex flex-wrap gap-4"><a href={requestHref} target="_blank" rel="noopener noreferrer" className="px-7 py-4 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 font-semibold transition-all">Request a founding excavation</a><a href="#process" className="px-7 py-4 rounded-lg border border-gray-600 hover:border-purple-400 bg-gray-900/60 font-semibold transition-all">See how it works</a></div>
        </div>
      </div>
    </section>

    <section className="py-20"><div className="container mx-auto px-4 max-w-5xl">
      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <div><h2 className="text-4xl font-bold text-gray-100 mb-5">The Song Excavation</h2><p className="text-gray-400 text-lg leading-relaxed">A deliberately small founding offer while I refine the process with the first three people brave enough to bring me something difficult to categorize.</p></div>
        <div className="border-l-2 border-pink-500/50 pl-7 space-y-5 text-gray-300">
          <p><strong className="text-white">You receive:</strong> an original finished track, lyrics, cover artwork, a short excavation note, and one revision round.</p>
          <p><strong className="text-white">Founding price:</strong> US$99 minimum, with pay-what-you-want enabled.</p>
          <p><strong className="text-white">Timing:</strong> normally 5–7 working days after the creative direction is agreed.</p>
          <p><strong className="text-white">Privacy:</strong> your source and song stay private unless you separately choose to share or release them.</p>
        </div>
      </div>
    </div></section>

    <section className="py-20 bg-gray-950/30"><div className="container mx-auto px-4 max-w-5xl">
      <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
        <div><h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Let the song become a world.</h2><p className="text-gray-400 leading-relaxed">Every excavation includes original cover artwork. If the idea wants a larger visual life, add one of these when you request it.</p></div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="p-6 rounded-xl border border-purple-500/30 bg-purple-950/20"><h3 className="text-xl font-bold text-purple-200 mb-2">Still Visual Set</h3><p className="text-sm text-gray-400 leading-relaxed mb-4">Five coordinated high-resolution images from the song’s world, for social posts, story artwork, presentations, or personal sharing.</p><p className="font-semibold text-purple-300">+ US$35</p></div>
          <div className="p-6 rounded-xl border border-pink-500/30 bg-pink-950/20"><h3 className="text-xl font-bold text-pink-200 mb-2">Moving Visual</h3><p className="text-sm text-gray-400 leading-relaxed mb-4">A full-song atmospheric visualizer, lyric-led moving piece, or generative music visual in one agreed format.</p><p className="font-semibold text-pink-300">+ US$125</p></div>
        </div>
      </div>
    </div></section>

    <section className="py-20 bg-gray-800/25 border-y border-gray-800"><div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What can you bring?</h2>
      <div className="grid md:grid-cols-5 gap-4 text-center">
        {[['A question','The one that keeps returning after everyone else has gone home.'],['A paper','Not every detail—the human tension or argument beating inside it.'],['A system failure','A procedure, institution, or machine behaving with terrible logic.'],['A character','Invented, historical, human, animal, bureaucratic, or impossible.'],['A strange idea','Something that cannot yet explain what it wants to be.']].map(([title,copy])=><div key={title} className="p-5 rounded-xl bg-gray-900/70 border border-gray-700"><h3 className="font-bold text-pink-300 mb-3">{title}</h3><p className="text-sm text-gray-400 leading-relaxed">{copy}</p></div>)}
      </div>
    </div></section>

    <section id="process" className="py-20"><div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-4xl font-bold mb-12">How the excavation works</h2>
      <ol className="space-y-9">
        {[['01','You bring the source','Tell me what it is, why it matters, and what the song must not flatten or betray.'],['02','I find the pressure point','I send a short creative direction: who is speaking, what is at stake, and how the song might move.'],['03','The song takes shape','I write, generate, resist, revise, select, and finish the track and its visual artefacts.'],['04','You receive the artefact','A listening copy, full-quality audio, lyrics, cover art, and the note from the dig. One revision round is included.']].map(([n,title,copy])=><li key={n} className="grid grid-cols-[3rem_1fr] gap-5"><span className="font-mono text-purple-400 text-lg">{n}</span><div><h3 className="text-xl font-bold text-gray-100 mb-2">{title}</h3><p className="text-gray-400 leading-relaxed">{copy}</p></div></li>)}
      </ol>
    </div></section>

    <section className="py-20 bg-gradient-to-r from-purple-950/60 to-pink-950/40 border-y border-purple-500/20"><div className="container mx-auto px-4 max-w-3xl text-center"><h2 className="text-4xl font-bold mb-5">Three founding excavations</h2><p className="text-lg text-gray-300 mb-9">If you have something that sounds impossible to turn into a song, that is probably the right thing to bring.</p><div className="flex flex-wrap justify-center gap-4"><a href={requestHref} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-lg bg-pink-600 hover:bg-pink-500 font-semibold transition-colors">Request on Ko-fi</a><a href={emailHref} className="px-8 py-4 rounded-lg border border-purple-400/60 hover:bg-purple-500/15 font-semibold transition-colors">Ask a question</a></div></div></section>
  </div>
}
