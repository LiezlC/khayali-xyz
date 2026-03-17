import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Sprints — Refracting Complexity in High-Stakes Domains',
  description: 'Fixed-scope engagements that turn dense expert material into clear narratives — without losing what matters. Strategic narrative design for AI governance, ESG, systems thinking, and institutional design.',
}

export default function ContentSprintsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900" />
        <div className="relative container mx-auto px-4 max-w-4xl">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Strategic Narrative Design
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent leading-tight">
            Content Sprints
          </h1>
          <p className="text-2xl text-gray-300 mb-4 leading-relaxed">
            Refracting Complexity in High-Stakes Domains
          </p>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            Fixed-scope engagements that turn dense expert material into clear narratives — without losing what matters.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4">
            The Problem
          </p>
          <h2 className="text-4xl font-bold mb-6 text-white">
            The real cost of complexity
          </h2>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed">
            Dense expert content loses its reach before anyone acts on it.
            The knowledge exists. The audience exists. The gap is translation.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-emerald-300 mb-3">Skipped</h3>
              <p className="text-gray-400">
                Decision-makers skip dense content entirely — the insight never reaches those who could act on it.
              </p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-emerald-300 mb-3">Ignored</h3>
              <p className="text-gray-400">
                Audiences disengage before the insight lands — attention drops before the point is made.
              </p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-emerald-300 mb-3">Buried</h3>
              <p className="text-gray-400">
                The work gets cited less, shared less, and built on less — its influence quietly disappears.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Reframe */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Reframe
          </p>
          <h2 className="text-4xl font-bold mb-6 text-white">
            Complexity isn&apos;t the problem
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Not about dumbing down</h3>
              <p className="text-gray-400 leading-relaxed">
                The fields that need clarity most — AI governance, systems thinking, ESG — are
                genuinely complex. Stripping that away isn&apos;t clarity. It&apos;s loss.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Hold it and move it</h3>
              <p className="text-gray-400 leading-relaxed">
                What&apos;s missing is someone who can hold the complexity and still make the
                ideas move — without flattening what makes them matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Content Pathology Matrix */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Diagnostics
          </p>
          <h2 className="text-3xl font-bold mb-3 text-white">
            Content Pathology Matrix
          </h2>
          <p className="text-gray-400 mb-8">The five states of draft purgatory.</p>

          <div className="space-y-4">
            {[
              {
                label: 'Too Dense',
                description: 'Essential insights are buried under cognitive load; cross-functional stakeholders disengage.'
              },
              {
                label: 'Too Messy',
                description: 'The substance is present, but the lack of framing obscures the core value proposition.'
              },
              {
                label: 'Too Jargon-Soaked',
                description: 'Alienates necessary external audiences and isolates the expertise.'
              },
              {
                label: 'Too Cross-Domain',
                description: 'Fails to explain neatly; attempts to unify systems thinking end up as disjointed fragments.'
              },
              {
                label: '"I know what I mean..."',
                description: "...but it isn't landing. The translation layer between SME intent and audience reception is broken."
              }
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 bg-gray-800/40 rounded-lg p-5 border border-gray-700/30">
                <div className="w-3 h-3 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0" />
                <div>
                  <span className="text-white font-semibold">{item.label}</span>
                  <span className="text-gray-400 ml-2">— {item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Focus Areas
          </p>
          <h2 className="text-4xl font-bold mb-4 text-white">
            What we work on together
          </h2>
          <p className="text-gray-400 mb-10">
            Four domains where complexity runs deepest and clear thinking is most urgently needed.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/60 rounded-xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <h3 className="text-xl font-bold text-emerald-300 mb-3">AI Governance</h3>
              <p className="text-gray-400">
                Policy framing, risk communication, and translating technical language for public audiences.
              </p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <h3 className="text-xl font-bold text-emerald-300 mb-3">Systems Thinking</h3>
              <p className="text-gray-400">
                Making feedback loops and interdependencies legible to people who need to act on them.
              </p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <h3 className="text-xl font-bold text-emerald-300 mb-3">ESG</h3>
              <p className="text-gray-400">
                Cutting through noise to surface what&apos;s material, why it matters, and who it affects.
              </p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <h3 className="text-xl font-bold text-emerald-300 mb-3">Institutional Design</h3>
              <p className="text-gray-400">
                Turning procedural complexity into structure people can actually navigate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Deliverables
          </p>
          <h2 className="text-4xl font-bold mb-4 text-white">
            What you get
          </h2>
          <p className="text-gray-400 mb-10">
            Every sprint ends with a finished asset — ready to publish, pitch, or share.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/60 rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-3">Long-form article</h3>
              <p className="text-gray-400">
                In-depth explainers that build authority and give your ideas the space they deserve.
              </p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-3">LinkedIn or YouTube package</h3>
              <p className="text-gray-400">
                Platform-native content — posts, scripts, or hooks — structured for reach and engagement.
              </p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-3">Visual framing</h3>
              <p className="text-gray-400">
                Diagrams and mental models that make complex ideas click at a glance.
              </p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-3">Mini-deck</h3>
              <p className="text-gray-400">
                A tight, persuasive deck for pitching or presenting one focused idea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-4xl font-bold mb-12 text-white">
            Four steps. No bloat.
          </h2>

          <div className="space-y-10">
            {[
              {
                step: '1',
                title: 'Share the raw material',
                description: 'Hand over your paper, deck, transcript, or long draft — whatever you have.'
              },
              {
                step: '2',
                title: 'Align on scope',
                description: 'We agree on audience, format, and the exact output you need.'
              },
              {
                step: '3',
                title: 'Fast turnaround',
                description: 'Fixed price, no retainer. I turn it around quickly — no drawn-out back-and-forth.'
              },
              {
                step: '4',
                title: 'Ready to publish',
                description: 'You walk away with something polished, ready to present or publish.'
              }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-6">
                <div className="text-4xl font-bold text-emerald-400/40 flex-shrink-0 w-12">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Engagement Model */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Why This, Not That
          </p>
          <h2 className="text-3xl font-bold mb-10 text-white">
            Agile sprints vs. institutional bloat
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/30">
              <h3 className="text-xl font-bold text-gray-500 mb-6">The Giant Consulting Circus</h3>
              <div className="space-y-4 text-gray-500">
                <p><span className="font-semibold">Scope:</span> Bloated, creeping engagements.</p>
                <p><span className="font-semibold">Pacing:</span> Slow turnaround; weeks of onboarding.</p>
                <p><span className="font-semibold">Translation:</span> Generalized consultants struggling with highly specific SME concepts.</p>
                <p><span className="font-semibold">Output:</span> Mushy material trying to speak to every audience at once.</p>
              </div>
            </div>
            <div className="bg-emerald-900/20 rounded-xl p-8 border border-emerald-500/30">
              <h3 className="text-xl font-bold text-emerald-300 mb-6">Strategic Content Sprints</h3>
              <div className="space-y-4 text-gray-300">
                <p><span className="font-semibold text-white">Scope:</span> Fixed and strictly bounded.</p>
                <p><span className="font-semibold text-white">Pacing:</span> Fast turnaround; immediate execution.</p>
                <p><span className="font-semibold text-white">Translation:</span> Specialized framing that respects institutional design and research.</p>
                <p><span className="font-semibold text-white">Output:</span> Sharper, clearer written and visual assets people can actually use.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
            Limited slots available now
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            This isn&apos;t a content mill. Slots are kept tight so the work stays sharp.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
              <p className="text-emerald-400 font-bold text-sm mb-2">01</p>
              <h3 className="text-white font-semibold mb-2">Limited by design</h3>
              <p className="text-gray-400 text-sm">Each sprint gets focused, high-attention work — not volume.</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
              <p className="text-emerald-400 font-bold text-sm mb-2">02</p>
              <h3 className="text-white font-semibold mb-2">Dense ideas welcome</h3>
              <p className="text-gray-400 text-sm">If it deserves a wider audience, this is where it gets one.</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50">
              <p className="text-emerald-400 font-bold text-sm mb-2">03</p>
              <h3 className="text-white font-semibold mb-2">DM to start</h3>
              <p className="text-gray-400 text-sm">One message. No form, no funnel — just a conversation.</p>
            </div>
          </div>

          <div className="space-y-4">
            <a href="mailto:liezlc@gmail.com?subject=Content Sprint Inquiry"
               className="inline-block px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg font-semibold transition-colors shadow-lg text-lg">
              Start a Conversation
            </a>
            <p className="text-gray-500 text-sm">
              Or connect on{' '}
              <a href="https://www.linkedin.com/in/liezl-coetzee/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Credibility anchor */}
      <section className="py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-800/40 rounded-xl p-8 border border-gray-700/30">
            <p className="text-gray-400 leading-relaxed">
              <span className="text-white font-semibold">About the practitioner:</span>{' '}
              20+ years in extractive industries, ESG, development finance, and resettlement operations.
              Author of the{' '}
              <a href="/sociablesystems" className="text-emerald-400 hover:text-emerald-300 transition-colors">Sociable Systems</a>{' '}
              newsletter (70+ episodes on AI accountability), creator of the{' '}
              <a href="/curriculum/index.html" className="text-emerald-400 hover:text-emerald-300 transition-colors">AI-ESG Integrated Strategist Curriculum</a>{' '}
              (7 levels + capstone), and builder of{' '}
              <a href="/grievoice" className="text-emerald-400 hover:text-emerald-300 transition-colors">GrieVoice</a>{' '}
              — an AI-powered grievance system for operational settings.
              The complexity isn&apos;t theoretical. It&apos;s lived.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
