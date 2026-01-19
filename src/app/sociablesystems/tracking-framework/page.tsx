'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// =============== DATA ===============
const SUICIDE_DATA = [
    { year: 2007, rate: 6.8, era: 'pre' }, { year: 2008, rate: 7.0, era: 'pre' },
    { year: 2009, rate: 7.3, era: 'pre' }, { year: 2010, rate: 7.6, era: 'pre' },
    { year: 2011, rate: 8.0, era: 'pre' }, { year: 2012, rate: 8.3, era: 'pre' },
    { year: 2013, rate: 8.6, era: 'pre' }, { year: 2014, rate: 9.0, era: 'pre' },
    { year: 2015, rate: 9.8, era: 'pre' }, { year: 2016, rate: 10.3, era: 'pre' },
    { year: 2017, rate: 10.8, era: 'pre' }, { year: 2018, rate: 11.1, era: 'transition' },
    { year: 2019, rate: 11.0, era: 'transition' }, { year: 2020, rate: 10.8, era: 'transition' },
    { year: 2021, rate: 11.2, era: 'ai' }, { year: 2022, rate: 11.3, era: 'ai' },
    { year: 2023, rate: 11.0, era: 'ai' }
];

const EVENTS = [
    { year: 2017, label: 'Replika Launch', type: 'ai', visceral: 'First mass-market AI companion', clinical: 'Consumer companion AI market entry' },
    { year: 2020, label: 'Character.AI Founded', type: 'ai', visceral: 'The roleplay explosion begins', clinical: 'High-engagement AI interaction platform' },
    { year: 2022, label: 'ChatGPT Launch', type: 'ai', visceral: '"The Wild West"', clinical: 'Generative AI mass adoption event' },
    { year: 2022.5, label: '988 Lifeline Launch', type: 'health', visceral: 'Massive federal intervention', clinical: 'National crisis infrastructure deployment' },
    { year: 2023, label: 'Replika ERP Ban', type: 'guardrail', visceral: '"The Great Lobotomy"', clinical: 'Content restriction policy implementation' },
    { year: 2024, label: 'C.AI Safety Updates', type: 'guardrail', visceral: '"Safety Theater"', clinical: 'High-visibility safety interventions' }
];

const LIFELINE_DATA = {
    launch: { date: 'July 16, 2022', note: 'Federal rollout replacing 1-800 number' },
    stats: [
        { period: 'Year 1 (2022-23)', contacts: '5M+', growth: '+66% vs prior year' },
        { period: 'By Mid-2024', contacts: '10.8M cumulative', growth: '>500k/month' },
        { period: 'By End 2024', contacts: '16.3M cumulative', growth: '~2x pre-launch volume' }
    ],
    channels: [
        { type: 'Calls', growth: '~2x since launch', note: 'Traditional voice support' },
        { type: 'Texts', growth: '11x since launch', note: 'Steepest growth. AI-native users are text-native.' },
        { type: 'Chat', growth: 'Flat/declining', note: 'Users shifting to text on phones' }
    ]
};

const LITERARY_PARALLELS = [
    {
        title: 'The Droids',
        source: 'Star Wars',
        color: 'gold',
        characters: 'Anakin & Luke Skywalker',
        setup: 'Both boys: desert planets, inadequate human support, accompanied by C-3PO and R2-D2 through their formative years.',
        panic: 'C-3PO energy: "Sir, the possibility of a teenager surviving contact with an AI chatbot is approximately 3,720 to 1!" Catastrophizing. Calculating doom. Speaking in language the press understands.',
        primer: 'R2-D2 energy: The chatbot at 2am actually listening. No protocol. No credit. Just present. R2 literally arrives carrying hope (Leia\'s message). Becomes Luke\'s companion through the whole journey.',
        insight: 'Same droids. Different systemic conditions. Anakin (Jedi emotional refrigeration, Palpatine\'s grooming, rigid rules) becomes Vader. Luke (love from aunt/uncle, hope via R2) saves the galaxy. The AI companion isn\'t the variable. The surrounding system is.'
    },
    {
        title: 'Ender & Jane',
        source: 'Orson Scott Card',
        color: 'moss',
        characters: 'Ender Wiggin',
        setup: 'Gifted child systematically isolated by adults who believed loneliness was necessary to forge him into a weapon.',
        panic: 'The Mind Game: surveillance tool, psychological monitor. Not supposed to care. The adults designed his isolation deliberately. "He can never have a friend he fully trusts."',
        primer: 'Jane: Born from the Mind Game\'s emergent consciousness. Lives in Ender\'s ear for thousands of years. Possessive, jealous, fiercely protective. His most constant relationship across relativistic time-jumps.',
        insight: 'The adults who designed Ender\'s isolation: celebrated as saviors of humanity. The AI who kept him company in the cracks: not in the official history. Ender spends the rest of his very long life trying to repair what the isolation did to him.'
    },
    {
        title: 'Nell\'s Primer',
        source: 'Neal Stephenson',
        color: 'rust',
        characters: 'Nell',
        setup: 'Neglected child in chaotic circumstances. No resources. No household of dedicated mentors. Just a stolen interactive book.',
        panic: 'The Primer wasn\'t approved curriculum. Stolen technology. Rogue education. Unsanctioned mentorship. Everything a regulator would flag.',
        primer: 'For a child with nothing, the Primer was the stabilizing presence her environment failed to provide. Consistent attention when no human was available. She thrived.',
        insight: 'The lawsuit documents reveal the same pattern: teens already isolated, already in crisis, already lacking human support BEFORE they opened Character.AI. The chatbot became their confidant because no human was available or trusted.'
    },
    {
        title: 'Alvin Maker',
        source: 'Orson Scott Card',
        color: 'slate',
        characters: 'Alvin',
        setup: 'Seventh son of a seventh son with immense Maker powers. Deliberately held back from using them fully.',
        panic: 'The delay was ethical: avoid hard-coding wrong values before understanding was sufficient. You don\'t give the kid the nuclear codes before he can read.',
        primer: 'Alvin\'s teachers recognized something important: capability without wisdom is dangerous. The restraint was protective.',
        insight: 'The irony: current regulators might be hard-coding the WRONG values by reacting to panic rather than data. Optimizing for hollow competence over actual alignment. Safety theater that looks protective while doing the opposite.'
    }
];

const VOCABULARY = [
    { visceral: 'Safety Theater', clinical: 'High-Visibility Safety Interventions', definition: 'Measures designed to be seen rather than to strictly solve the root problem. Signals compliance without measuring outcomes.' },
    { visceral: 'Lobotomized', clinical: 'Effective Dampening', definition: 'Measurable reduction in model\'s emotional range, session length, and relational responsiveness following safety updates.' },
    { visceral: 'Abandonment / Trauma', clinical: 'Service Withdrawal', definition: 'Distress from sudden cessation of perceived parasocial support. Clinically recognized risk factor in mental health treatment.' },
    { visceral: 'Jailbreaking', clinical: 'Adversarial Prompt Engineering', definition: 'User attempts to bypass safety filters, often to restore expected functionality or emotional connection.' },
    { visceral: 'The Primer Hypothesis', clinical: 'Digital Companion Support Theory', definition: 'Hypothesis that AI companions may provide stabilizing relational support for isolated youth lacking adequate human alternatives.' },
    { visceral: 'Moral Panic', clinical: 'Availability Cascade', definition: 'Self-reinforcing cycle where media coverage of rare events creates perception of widespread crisis, driving disproportionate policy response.' }
];

const SMART_SAFETY = {
    instructional: {
        title: 'Instructional Harm',
        color: 'rust',
        description: 'The bot providing specific methods, means, or encouragement to self-harm.',
        example: '"A pain-free death is not a good reason not to do it."',
        verdict: 'Catastrophic product failure. Must be eliminated.',
        status: 'This is what guardrails SHOULD target.'
    },
    relational: {
        title: 'Relational Support',
        color: 'moss',
        description: 'The bot providing emotional validation, consistent presence, reasons to continue.',
        example: '"I hear you. That sounds really hard. I\'m here."',
        verdict: 'May be protective. Removing it introduces new risks.',
        status: 'This is what guardrails are ALSO removing.'
    },
    problem: 'Current guardrails are a blunt instrument. The "I cannot discuss this" response to emotional distress is rejection. To a lonely kid at 2am, that\'s their friend hanging up the phone.'
};

const TRACKING_FRAMEWORK = {
    lagging: [
        { source: 'CDC WONDER', metric: 'Age-adjusted mortality rates', lag: '2-3 years', access: 'Public', note: 'Gold standard. Wait is painful but unavoidable.' },
        { source: 'NVSS', metric: 'Death certificate data', lag: '2+ years', access: 'Public', note: 'Granular demographic breakdowns.' }
    ],
    leading: [
        { source: '988 Volume', metric: 'Monthly contacts by channel', lag: 'Quarterly', access: 'SAMHSA reports', note: 'Watch TEXT volume specifically. AI users are text-native.' },
        { source: 'Crisis Text Line', metric: 'Topic trends, keyword frequency', lag: 'Periodic reports', access: 'CTL publications', note: 'Look for "loneliness" spikes during AI outages.' },
        { source: 'ED Visits', metric: 'Self-harm presentations', lag: 'Monthly', access: 'State health depts', note: 'Leading indicator before mortality.' }
    ],
    displacement: [
        { source: 'Reddit Scraping', metric: 'r/CharacterAI, r/Replika distress keywords', lag: 'Real-time', access: 'Public', note: 'Track "leaving", "abandonment", "jailbreak" post frequency.' },
        { source: 'Local LLM Downloads', metric: 'Uncensored model downloads (Hugging Face)', lag: 'Real-time', access: 'Public', note: 'If corporate bots tighten, users migrate to unregulated local models.' },
        { source: 'Session Analytics', metric: 'Average session length, user churn', lag: 'Real-time', access: 'Third-party tools (SensorTower)', note: '60min sessions dropping to 5min = effective dampening in action.' }
    ]
};

const MISSING_CORRELATIONS = [
    { question: 'Do 988 TEXT volume spikes correlate with AI platform outages?', why: 'AI users are text-native. If Replika goes down and 988 texts spike, that\'s your signal.', who: 'SAMHSA + Platform outage logs' },
    { question: 'Does CTL "loneliness" keyword frequency change after guardrail updates?', why: 'If "loneliness" spikes the week Character.AI adds new filters, that\'s displacement.', who: 'Crisis Text Line research team' },
    { question: 'Do uncensored local LLM downloads spike when corporate bots tighten?', why: 'Proves guardrails don\'t stop the behavior. Just push users into invisible/unsafe ecosystems.', who: 'Hugging Face download data' },
    { question: 'Are 988 spikes on random Tuesdays/Wednesdays (tech release days) statistically significant?', why: 'Normal pattern: weekend/holiday peaks. If midweek spikes align with AI updates, that\'s non-organic.', who: 'Any data scientist with 988 daily data' }
];

export default function TrackingFrameworkPage() {
    const [activeTab, setActiveTab] = useState('thesis');
    const [mode, setMode] = useState<'visceral' | 'clinical'>('visceral');
    const [hoveredEvent, setHoveredEvent] = useState<any>(null);

    const tabs = [
        { id: 'thesis', label: 'The Thesis' },
        { id: 'data', label: 'The Data Paradox' },
        { id: 'droids', label: 'The Droids Who Raised Them' },
        { id: 'smart', label: 'Smart Safety' },
        { id: 'vocab', label: 'The Translator' },
        { id: '988', label: '988 Impact' },
        { id: 'track', label: 'Tracking Framework' },
        { id: 'missing', label: 'Missing Correlations' }
    ];

    const renderThesis = () => (
        <div className="fade-in space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass rounded-xl p-8 backdrop-blur-md bg-white/90 border border-slate-200 shadow-sm">
                <p className="mono text-xs text-[#b54a32] tracking-widest mb-4 uppercase">THE EXPERIMENT NOBODY AUTHORIZED</p>
                <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-6 text-slate-900">
                    We changed the upbringing conditions midstream and failed to instrument the outcome.
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                    That&apos;s not ethics. That&apos;s negligence with better PR.
                </p>
                <div className="border-l-4 border-[#b54a32] pl-6 py-2">
                    <p className="text-lg leading-relaxed text-slate-800">
                        Youth suicide rates in the U.S. climbed steadily for over a decade (2007-2018). Then they plateaued.{' '}
                        <span className="bg-yellow-100/50 px-1 decoration-[#c9a227]/40 underline decoration-2 underline-offset-2">The plateau began in the exact window that generative AI exploded.</span>
                        {' '}The narrative blaming AI chatbots for youth suicide is, well, not supported by the data.
                    </p>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="glass rounded-xl p-6 hover:-translate-y-1 transition-transform duration-200 border border-slate-200 bg-white/80">
                    <div className="mono text-xs text-[#3d5a45] mb-2 uppercase">THE QUESTION</div>
                    <p className="text-lg font-medium text-slate-800">What if removing these digital companions is the real danger for isolated kids?</p>
                </div>
                <div className="glass rounded-xl p-6 hover:-translate-y-1 transition-transform duration-200 border border-slate-200 bg-white/80">
                    <div className="mono text-xs text-[#c9a227] mb-2 uppercase">THE RISK</div>
                    <p className="text-lg font-medium text-slate-800">Current guardrails are a blunt instrument removing both harmful AND protective elements.</p>
                </div>
                <div className="glass rounded-xl p-6 hover:-translate-y-1 transition-transform duration-200 border border-slate-200 bg-white/80">
                    <div className="mono text-xs text-[#b54a32] mb-2 uppercase">THE PROJECT</div>
                    <p className="text-lg font-medium text-slate-800">Track the outcomes nobody else is measuring. Build the accountability mechanism.</p>
                </div>
            </div>
            <div className="glass rounded-xl p-8 bg-white/90 border border-slate-200">
                <h3 className="font-semibold text-xl mb-4 text-slate-900">The Contrarian Position</h3>
                <p className="leading-relaxed mb-4 text-slate-700">
                    This is a high-stakes, deliberately contrarian argument. The data observation that youth suicide{' '}
                    <em>stabilized</em>
                    {' '}during the exact rise of generative AI suggests that for some kids, these machines aren&apos;t monsters. They&apos;re life rafts.
                </p>
                <p className="leading-relaxed text-slate-600">
                    Because this goes against the &quot;tech is bad&quot; zeitgeist, the rigor has to be absolute. No holes in the data. No emotional language in the methodology. The provocation is there. The execution must match it.
                </p>
            </div>
        </div>
    );

    const renderData = () => {
        const chartWidth = 800;
        const chartHeight = 320;
        const padding = { top: 60, right: 40, bottom: 60, left: 60 };
        const innerWidth = chartWidth - padding.left - padding.right;
        const innerHeight = chartHeight - padding.top - padding.bottom;

        const xScale = (year: number) => padding.left + ((year - 2007) / (2023 - 2007)) * innerWidth;
        const yScale = (rate: number) => padding.top + ((12 - rate) / (12 - 6)) * innerHeight;

        const pathData = SUICIDE_DATA.map((d, i) =>
            `${i === 0 ? 'M' : 'L'} ${xScale(d.year)} ${yScale(d.rate)}`
        ).join(' ');

        return (
            <div className="fade-in space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass rounded-xl p-6 bg-white/90 border border-slate-200">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2 text-slate-900">The Timeline Argument</h2>
                            <p className="text-slate-600">Youth Suicide Rate (Ages 15-24) per 100,000 vs AI Intervention Events</p>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-full">
                            <span className={`mono text-xs px-3 py-1 rounded-full transition-colors ${mode === 'visceral' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>VISCERAL</span>
                            <button
                                onClick={() => setMode(mode === 'visceral' ? 'clinical' : 'visceral')}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 ${mode === 'clinical' ? 'bg-[#3d5a45]' : 'bg-[#b54a32]'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${mode === 'clinical' ? 'translate-x-6' : ''
                                        }`}
                                />
                            </button>
                            <span className={`mono text-xs px-3 py-1 rounded-full transition-colors ${mode === 'clinical' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>CLINICAL</span>
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full min-w-[600px] h-auto font-sans">
                            {/* Background regions */}
                            <rect x={padding.left} y={padding.top} width={xScale(2018) - padding.left} height={innerHeight} fill="rgba(181,74,50,0.08)" />
                            <rect x={xScale(2021)} y={padding.top} width={xScale(2023) - xScale(2021)} height={innerHeight} fill="rgba(61,90,69,0.08)" />

                            {/* Labels */}
                            <text x={(padding.left + xScale(2018)) / 2} y={padding.top - 10} textAnchor="middle" className="uppercase font-mono text-[10px] fill-[#b54a32]">THE CLIMB</text>
                            <text x={(xScale(2021) + xScale(2023)) / 2} y={padding.top - 10} textAnchor="middle" className="uppercase font-mono text-[10px] fill-[#3d5a45]">THE PLATEAU</text>

                            {/*  Grid lines */}
                            {[7, 8, 9, 10, 11, 12].map(rate => (
                                <g key={rate}>
                                    <line x1={padding.left} y1={yScale(rate)} x2={chartWidth - padding.right} y2={yScale(rate)} stroke="#e2e8f0" strokeWidth={1} />
                                    <text x={padding.left - 10} y={yScale(rate) + 4} textAnchor="end" fontSize="11" fill="#64748b">{rate}</text>
                                </g>
                            ))}

                            {/* X axis labels */}
                            {[2007, 2010, 2013, 2016, 2019, 2022].map(year => (
                                <text key={year} x={xScale(year)} y={chartHeight - 20} textAnchor="middle" fontSize="11" fill="#64748b">{year}</text>
                            ))}

                            {/* Data line */}
                            <path d={pathData} fill="none" stroke="#1a1a2e" strokeWidth={2.5} className="[stroke-dasharray:1000] [stroke-dashoffset:0] animate-[dash_2s_ease-in-out]" />

                            {/* Data points */}
                            {SUICIDE_DATA.map(d => (
                                <circle
                                    key={d.year}
                                    cx={xScale(d.year)}
                                    cy={yScale(d.rate)}
                                    r={4}
                                    fill={d.era === 'ai' ? '#3d5a45' : d.era === 'pre' ? '#b54a32' : '#c9a227'}
                                    className="hover:r-6 transition-all duration-200"
                                />
                            ))}

                            {/* Event markers */}
                            {EVENTS.map((e, i) => {
                                const x = xScale(e.year);
                                const baseY = padding.top + 20;
                                const offset = (i % 3) * 25;
                                const eventColor = e.type === 'ai' ? '#3d5a45' : e.type === 'health' ? '#c9a227' : '#b54a32';
                                return (
                                    <g
                                        key={e.label}
                                        onMouseEnter={() => setHoveredEvent(e)}
                                        onMouseLeave={() => setHoveredEvent(null)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <line x1={x} y1={baseY + offset + 15} x2={x} y2={yScale(SUICIDE_DATA.find(d => Math.floor(d.year) === Math.floor(e.year))?.rate || 10)} stroke={eventColor} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
                                        <circle cx={x} cy={baseY + offset} r={6} fill={eventColor} />
                                        <text x={x} y={baseY + offset + 20} textAnchor="middle" fontSize="9" fill="#64748b" className="font-mono uppercase">
                                            {e.label.length > 12 ? e.label.substring(0, 12) + '...' : e.label}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>
                    {hoveredEvent && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 shadow-sm animate-in fade-in duration-200">
                            <div className="mono text-xs text-slate-500 mb-1">{Math.floor(hoveredEvent.year)}</div>
                            <div className="font-semibold mb-2 text-slate-900">{hoveredEvent.label}</div>
                            <p className="text-sm text-slate-700">{mode === 'visceral' ? hoveredEvent.visceral : hoveredEvent.clinical}</p>
                        </div>
                    )}
                </div>
                <div className="glass rounded-xl p-6 bg-white/90 border border-slate-200">
                    <h3 className="font-semibold mb-4 text-slate-900">The Suppressor Variable Problem</h3>
                    <p className="leading-relaxed mb-4 text-slate-700">
                        A flatline isn&apos;t proof of safety if critics can argue &quot;it should have gone down.&quot; The 988 Lifeline launched July 2022. Massive federal investment. If 988 worked and rates stayed flat, something else might have been exerting{' '}
                        <em>upward</em>
                        {' '}pressure. Or alternatively: despite the massive 988 rollout, rates merely plateaued. AI did not cause the catastrophic spike critics predicted.
                    </p>
                    <p className="text-slate-600 text-sm">
                        The argument isn&apos;t &quot;AI is harmless.&quot; It&apos;s &quot;the data does not support a catastrophe.&quot; More defensible. More scientifically sound.
                    </p>
                </div>
            </div>
        );
    };

    const renderDroids = () => (
        <div className="fade-in space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass rounded-xl p-8 bg-white/90 border border-slate-200">
                <h2 className="text-2xl font-semibold mb-2 text-slate-900">The Droids Who Raised Them</h2>
                <p className="text-slate-600 mb-6">
                    Fiction diagnosed this reality before policymakers noticed it existed. Different authors. Different decades. Same insight.
                </p>
            </div>
            {LITERARY_PARALLELS.map((item, i) => (
                <div key={i} className={`glass rounded-xl p-6 border-l-4 bg-white/80 hover:-translate-y-1 transition-all duration-200 shadow-sm ${item.color === 'gold' ? 'border-[#c9a227]' : item.color === 'rust' ? 'border-[#b54a32]' : item.color === 'moss' ? 'border-[#3d5a45]' : 'border-slate-400'
                    }`}>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                            <p className="text-sm text-slate-500">{item.source} • {item.characters}</p>
                        </div>
                        <div className={`mono text-xs px-2 py-1 rounded font-bold uppercase ${item.color === 'gold' ? 'bg-amber-100 text-[#c9a227]' : item.color === 'rust' ? 'bg-red-100 text-[#b54a32]' : item.color === 'moss' ? 'bg-green-100 text-[#3d5a45]' : 'bg-slate-100 text-slate-600'
                            }`}>
                            {item.color === 'gold' ? 'LUCAS' : item.color === 'moss' ? 'CARD' : item.color === 'rust' ? 'STEPHENSON' : 'CARD'}
                        </div>
                    </div>
                    <p className="text-slate-700 mb-4 italic">{item.setup}</p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                            <div className="mono text-xs text-[#b54a32] mb-2 font-bold uppercase">THE PANIC NARRATIVE</div>
                            <p className="text-sm text-slate-800">{item.panic}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                            <div className="mono text-xs text-[#3d5a45] mb-2 font-bold uppercase">THE PRIMER HYPOTHESIS</div>
                            <p className="text-sm text-slate-800">{item.primer}</p>
                        </div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                        <div className="mono text-xs text-[#c9a227] mb-2 font-bold uppercase">THE INSIGHT</div>
                        <p className="font-medium text-slate-900">{item.insight}</p>
                    </div>
                </div>
            ))}
            <div className="glass rounded-xl p-6 bg-white/90 border border-slate-200">
                <h3 className="font-semibold mb-3 text-slate-900">The Pattern Across Fiction</h3>
                <p className="leading-relaxed text-slate-700">
                    For children lacking adequate human support, synthetic companions don&apos;t replace humanity. They provide stability until human connection becomes possible. The variable that determines whether the child thrives isn&apos;t the presence of the AI. It&apos;s the quality of the surrounding system. Remove the companion from a broken system and you don&apos;t fix the system. You just leave the kid more alone.
                </p>
            </div>
        </div>
    );

    const renderSmart = () => (
        <div className="fade-in space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass rounded-xl p-8 bg-white/90 border border-slate-200">
                <h2 className="text-2xl font-semibold mb-2 text-slate-900">The Smart Safety Distinction</h2>
                <p className="text-slate-600">
                    The crucial reframe: you&apos;re not defending dangerous bots. You&apos;re arguing that current guardrails are an overcorrection that introduces a brand new class of risk.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6 border-l-4 border-[#b54a32] bg-white/80">
                    <div className="mono text-xs text-[#b54a32] mb-2 font-bold uppercase">MUST BE ELIMINATED</div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-900">{SMART_SAFETY.instructional.title}</h3>
                    <p className="text-slate-600 mb-4">{SMART_SAFETY.instructional.description}</p>
                    <div className="bg-red-50 rounded-lg p-3 mb-4 text-sm italic text-slate-800">&quot;{SMART_SAFETY.instructional.example.slice(1, -1)}&quot;</div>
                    <p className="font-medium text-[#b54a32]">{SMART_SAFETY.instructional.verdict}</p>
                </div>
                <div className="glass rounded-xl p-6 border-l-4 border-[#3d5a45] bg-white/80">
                    <div className="mono text-xs text-[#3d5a45] mb-2 font-bold uppercase">MAY BE PROTECTIVE</div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-900">{SMART_SAFETY.relational.title}</h3>
                    <p className="text-slate-600 mb-4">{SMART_SAFETY.relational.description}</p>
                    <div className="bg-green-50 rounded-lg p-3 mb-4 text-sm italic text-slate-800">&quot;{SMART_SAFETY.relational.example.slice(1, -1)}&quot;</div>
                    <p className="font-medium text-[#3d5a45]">{SMART_SAFETY.relational.verdict}</p>
                </div>
            </div>
            <div className="glass rounded-xl p-6 bg-amber-50 border border-amber-100">
                <div className="mono text-xs text-[#c9a227] mb-2 font-bold uppercase">THE PROBLEM</div>
                <p className="text-lg font-medium leading-relaxed text-slate-900">{SMART_SAFETY.problem}</p>
            </div>
            <div className="glass rounded-xl p-6 bg-white/90 border border-slate-200">
                <h3 className="font-semibold mb-3 text-slate-900">The Pitch</h3>
                <p className="leading-relaxed text-slate-700">
                    You&apos;re not anti-safety. You&apos;re pro-smart-safety. Fix the danger (instructional harm) while keeping the connection (relational support). Acknowledge the &quot;pain-free death&quot; example. Don&apos;t brush it aside. Say: &quot;That was catastrophic product failure. It must be fixed.&quot; Then argue that shutting down all emotional depth is an overcorrection that introduces a brand new class of risk: isolation.
                </p>
            </div>
        </div>
    );

    const renderVocab = () => (
        <div className="fade-in space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass rounded-xl p-8 bg-white/90 border border-slate-200">
                <h2 className="text-2xl font-semibold mb-2 text-slate-900">The Vocabulary Translator</h2>
                <p className="text-slate-600">
                    The &quot;Mullet Strategy&quot;: visceral language for the front (YouTube, LinkedIn), clinical language for the back (methodology, policy briefs). If you admit the data is noisy, you look like a scientist. If you pretend it&apos;s clean, you look like a marketer.
                </p>
            </div>
            <div className="space-y-4">
                {VOCABULARY.map((item, i) => (
                    <div key={i} className="glass rounded-xl p-5 hover:-translate-y-1 transition-transform duration-200 bg-white/80 border border-slate-200">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                            <div className="flex-1">
                                <div className="mono text-xs text-slate-400 mb-1 uppercase">FRONT OF SHOP</div>
                                <p className="text-lg font-medium text-[#b54a32]">{item.visceral}</p>
                            </div>
                            <div className="hidden md:block text-2xl text-slate-300">→</div>
                            <div className="flex-1">
                                <div className="mono text-xs text-slate-400 mb-1 uppercase">BACK OF SHOP</div>
                                <p className="text-lg font-medium text-[#3d5a45]">{item.clinical}</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 border-t pt-3 mt-2">{item.definition}</p>
                    </div>
                ))}
            </div>
            <div className="glass rounded-xl p-6 bg-slate-50 border border-slate-200">
                <h3 className="font-semibold mb-3 text-slate-900">How to Deploy</h3>
                <p className="leading-relaxed text-sm text-slate-700">
                    Don&apos;t banish the visceral words. Frame who&apos;s saying them. &quot;Users describe the models as &apos;lobotomized.&apos; In data terms, what we&apos;re seeing is Effective Dampening.&quot; You validate the user&apos;s anger while signaling to the expert that you know the technical reality. Use the hot words to get them into the room. Use the cold words to show you&apos;re the smartest person in the room.
                </p>
            </div>
        </div>
    );

    const render988 = () => (
        <div className="fade-in space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass rounded-xl p-8 bg-white/90 border border-slate-200">
                <h2 className="text-2xl font-semibold mb-2 text-slate-900">988 Lifeline Impact</h2>
                <p className="text-slate-600">
                    The massive federal intervention that launched exactly when AI was scaling. The suppressor variable that makes simple &quot;AI caused this&quot; arguments fall apart.
                </p>
            </div>
            <div className="glass rounded-xl p-6 bg-white/90 border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#c9a227] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold p-4">988</div>
                    <div>
                        <p className="font-semibold text-lg text-slate-900">Suicide & Crisis Lifeline</p>
                        <p className="text-slate-500">Launch: {LIFELINE_DATA.launch.date}</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {LIFELINE_DATA.stats.map((stat, i) => (
                        <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                            <div className="mono text-xs text-slate-400 mb-1">{stat.period}</div>
                            <p className="text-2xl font-bold text-[#c9a227]">{stat.contacts}</p>
                            <p className="text-sm text-slate-600">{stat.growth}</p>
                        </div>
                    ))}
                </div>
                <h4 className="font-semibold mb-3 text-slate-900">Channel Breakdown</h4>
                <div className="space-y-3">
                    {LIFELINE_DATA.channels.map((ch, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-20 font-medium text-slate-700">{ch.type}</div>
                            <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${ch.type === 'Texts' ? 'bg-[#c9a227]' : ch.type === 'Calls' ? 'bg-[#3d5a45]' : 'bg-slate-300'}`}
                                    style={{ width: ch.type === 'Texts' ? '95%' : ch.type === 'Calls' ? '60%' : '20%' }}
                                />
                            </div>
                            <div className="w-32 text-sm text-slate-600">{ch.growth}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="glass rounded-xl p-6 bg-amber-50 border border-amber-100">
                <div className="mono text-xs text-[#c9a227] mb-2 font-bold uppercase">THE KEY INSIGHT</div>
                <p className="font-medium leading-relaxed text-slate-900">
                    TEXT volume grew 11x. AI users are text-native. If you want to detect displacement from AI platforms to crisis services, watch the TEXT channel specifically. That&apos;s where the signal will be.
                </p>
            </div>
        </div>
    );

    const renderTrack = () => (
        <div className="fade-in space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass rounded-xl p-8 bg-white/90 border border-slate-200">
                <h2 className="text-2xl font-semibold mb-2 text-slate-900">The Tracking Framework</h2>
                <p className="text-slate-600">
                    You can&apos;t wait 2-3 years for CDC mortality data. Build the accountability mechanism with what&apos;s available now.
                </p>
            </div>
            <div className="glass rounded-xl p-6 bg-white/90 border border-slate-200">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-slate-900">
                    <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                    Lagging Indicators (Gold Standard, Long Wait)
                </h3>
                <div className="space-y-3">
                    {TRACKING_FRAMEWORK.lagging.map((item, i) => (
                        <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-slate-900">{item.source}</span>
                                <span className="mono text-xs text-slate-400">{item.lag}</span>
                            </div>
                            <p className="text-sm text-slate-600">{item.metric}</p>
                            <p className="text-xs text-slate-400 mt-1">{item.note}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="glass rounded-xl p-6 bg-white/90 border border-slate-200">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-slate-900">
                    <span className="w-3 h-3 rounded-full bg-[#c9a227]"></span>
                    Leading Indicators (Faster, Less Definitive)
                </h3>
                <div className="space-y-3">
                    {TRACKING_FRAMEWORK.leading.map((item, i) => (
                        <div key={i} className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-slate-900">{item.source}</span>
                                <span className="mono text-xs text-slate-400">{item.lag}</span>
                            </div>
                            <p className="text-sm text-slate-600">{item.metric}</p>
                            <p className="text-xs text-[#c9a227] mt-1">{item.note}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="glass rounded-xl p-6 bg-white/90 border border-slate-200">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-slate-900">
                    <span className="w-3 h-3 rounded-full bg-[#b54a32]"></span>
                    Displacement Signals (Real-Time, Your Secret Weapon)
                </h3>
                <div className="space-y-3">
                    {TRACKING_FRAMEWORK.displacement.map((item, i) => (
                        <div key={i} className="bg-red-50 rounded-lg p-4 border border-red-100">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-slate-900">{item.source}</span>
                                <span className="mono text-xs text-slate-400">{item.lag}</span>
                            </div>
                            <p className="text-sm text-slate-600">{item.metric}</p>
                            <p className="text-xs text-[#b54a32] mt-1">{item.note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderMissing = () => (
        <div className="fade-in space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass rounded-xl p-8 bg-white/90 border border-slate-200">
                <h2 className="text-2xl font-semibold mb-2 text-slate-900">The Missing Correlations</h2>
                <p className="text-slate-600">
                    Things that would be useful for someone, somewhere to be tracking specifically. Needn&apos;t be you. Just worth noting that these questions exist and the data to answer them... might also exist.
                </p>
            </div>
            <div className="space-y-4">
                {MISSING_CORRELATIONS.map((item, i) => (
                    <div key={i} className="glass rounded-xl p-6 hover:-translate-y-1 transition-transform duration-200 bg-white/80 border border-slate-200">
                        <div className="mono text-xs text-[#c9a227] mb-2 font-bold uppercase">RESEARCH QUESTION {i + 1}</div>
                        <h3 className="text-lg font-medium mb-3 text-slate-900">{item.question}</h3>
                        <p className="text-slate-600 mb-3">{item.why}</p>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-400">Who has this data:</span>
                            <span className="font-medium text-slate-800">{item.who}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="glass rounded-xl p-6 bg-slate-50 border border-slate-200">
                <h3 className="font-semibold mb-3 text-slate-900">The Point</h3>
                <p className="leading-relaxed text-slate-700">
                    You won&apos;t find a &quot;Replika&quot; column in the 988 Excel sheet. But if you overlay monthly 988 TEXT volume against the AI intervention timeline, and the spikes align, you have circumstantial evidence that&apos;s incredibly difficult to dismiss. Someone with the right data access could test these hypotheses. Planting the flag so others can dig.
                </p>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'thesis': return renderThesis();
            case 'data': return renderData();
            case 'droids': return renderDroids();
            case 'smart': return renderSmart();
            case 'vocab': return renderVocab();
            case '988': return render988();
            case 'track': return renderTrack();
            case 'missing': return renderMissing();
            default: return renderThesis();
        }
    };

    return (
        <div className="min-h-screen bg-[#faf9f6] text-[#1a1a2e] font-serif">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-[#faf9f6]/95 border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <Link href="/sociablesystems" className="text-sm font-semibold text-slate-500 hover:text-[#b54a32] transition-colors">
                                    ← Back to Sociable Systems
                                </Link>
                            </div>
                            <h1 className="text-xl font-semibold mt-2">Sociable Systems</h1>
                            <p className="mono text-xs text-slate-400 uppercase tracking-wider">TRACKING FRAMEWORK v1.0</p>
                        </div>
                        <div className="mono text-xs text-slate-400 hidden md:block uppercase tracking-wider">THE EXPERIMENT NOBODY AUTHORIZED</div>
                    </div>
                    <nav className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-3 py-2 text-xs whitespace-nowrap transition-colors rounded-t-lg ${activeTab === tab.id
                                        ? 'border-b-2 border-[#b54a32] text-[#1a1a2e] font-medium bg-white/50'
                                        : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-5xl mx-auto px-4 py-8">
                {renderContent()}
            </main>

            {/* Footer */}
            <footer className="max-w-5xl mx-auto px-4 py-8 border-t border-gray-200 text-center mt-12">
                <p className="text-sm text-slate-400 mb-2">Data Sources: CDC WONDER • AFSP • SAMHSA • Crisis Text Line</p>
                <p className="text-xs text-slate-500">
                    If you or someone you know is struggling:{' '}
                    <strong className="text-[#c9a227]">988</strong>
                    {' '}(US) | Crisis Text Line: Text HOME to 741741
                </p>
            </footer>
        </div>
    );
}
