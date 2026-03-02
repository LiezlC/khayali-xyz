<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VibeCoder Challenge Engine - Partnership Skills Training</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        body {
            font-family: 'Inter', sans-serif;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .tab-button.active {
            background-color: #f8fafc;
            border-bottom: 2px solid #6366f1;
            color: #6366f1;
        }

        pre {
            background: #0f172a;
            color: #e2e8f0;
            padding: 1.25rem;
            border-radius: 0.75rem;
            font-size: 0.85rem;
            overflow-x: auto;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .persona-card {
            border-left: 4px solid #6366f1;
            transition: all 0.2s ease;
        }

        .persona-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .chip {
            font-size: 0.70rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .muted {
            color: #64748b;
        }

        .role-card {
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .role-card:hover {
            transform: translateY(-2px);
        }

        #role-drawer {
            transition: all 0.3s ease-out;
        }
    </style>
</head>

<body class="bg-slate-100 text-slate-900 font-sans antialiased min-h-screen">

    <div class="max-w-6xl mx-auto px-4 py-12">
        <header class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
                <div class="flex items-center gap-2 mb-2">
                    <i data-lucide="zap" class="text-indigo-600 w-8 h-8"></i>
                    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">VibeCoder Challenge Engine</h1>
                </div>
                <p class="text-slate-500">Partnership Skills Training for Human-AI Collaboration</p>
            </div>
            <div class="flex gap-2">
                <span
                    class="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">v4.0</span>
                <span
                    class="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">Partnership
                    Edition</span>
            </div>
        </header>

        <!-- Philosophy Banner -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-8 shadow-lg">
            <p class="text-lg font-medium mb-2">
                The goal isn't to command AI or supervise it. It's to <strong>partner</strong> with it.
            </p>
            <p class="text-indigo-100 text-sm">
                These challenges train the core skill: knowing when to pause, what questions to ask, and how to
                collaborate toward outcomes neither human nor AI could achieve alone.
            </p>
        </div>

        <!-- Floor & Ceiling -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="bg-white border-l-4 border-amber-400 p-4 rounded-r-xl shadow-sm">
                <h3 class="font-bold text-amber-900 mb-1 flex items-center gap-2">
                    <i data-lucide="shield" class="w-4 h-4"></i> The Floor (Protection)
                </h3>
                <p class="text-sm text-amber-800">Catch hallucinations, maintain code quality, prevent security
                    vulnerabilities.</p>
            </div>
            <div class="bg-white border-l-4 border-emerald-400 p-4 rounded-r-xl shadow-sm">
                <h3 class="font-bold text-emerald-900 mb-1 flex items-center gap-2">
                    <i data-lucide="rocket" class="w-4 h-4"></i> The Ceiling (Capability)
                </h3>
                <p class="text-sm text-emerald-800">Creative outcomes that surprise both parties, speed without
                    sacrifice, elegant solutions.</p>
            </div>
        </div>

        <!-- Main Navigation Tabs -->
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <nav class="flex border-b border-slate-200 bg-slate-50 flex-wrap">
                <button onclick="showTab('prompt')" id="btn-prompt"
                    class="tab-button active flex-1 min-w-[7rem] px-4 py-4 text-sm font-semibold transition-all hover:bg-white focus:outline-none">
                    <span class="flex items-center justify-center gap-1"><i data-lucide="terminal" class="w-4 h-4"></i>
                        Instructions</span>
                </button>
                <button onclick="showTab('matrix')" id="btn-matrix"
                    class="tab-button flex-1 min-w-[7rem] px-4 py-4 text-sm font-semibold transition-all hover:bg-white focus:outline-none">
                    <span class="flex items-center justify-center gap-1"><i data-lucide="layout-grid"
                            class="w-4 h-4"></i> Partnership Matrix</span>
                </button>
                <button onclick="showTab('personas')" id="btn-personas"
                    class="tab-button flex-1 min-w-[7rem] px-4 py-4 text-sm font-semibold transition-all hover:bg-white focus:outline-none">
                    <span class="flex items-center justify-center gap-1"><i data-lucide="users" class="w-4 h-4"></i>
                        Personas</span>
                </button>
                <button onclick="showTab('triggers')" id="btn-triggers"
                    class="tab-button flex-1 min-w-[7rem] px-4 py-4 text-sm font-semibold transition-all hover:bg-white focus:outline-none">
                    <span class="flex items-center justify-center gap-1"><i data-lucide="alert-circle"
                            class="w-4 h-4"></i> Dialogue Triggers</span>
                </button>
                <button onclick="showTab('framework')" id="btn-framework"
                    class="tab-button flex-1 min-w-[7rem] px-4 py-4 text-sm font-semibold transition-all hover:bg-white focus:outline-none">
                    <span class="flex items-center justify-center gap-1"><i data-lucide="layers" class="w-4 h-4"></i>
                        Framework</span>
                </button>
            </nav>

            <div class="p-8">

                <!-- TAB 1: GEM INSTRUCTIONS -->
                <div id="prompt" class="tab-content active">
                    <div class="mb-6 flex flex-col gap-2">
                        <div class="flex items-center justify-between">
                            <h2 class="text-xl font-bold flex items-center gap-2">
                                <i data-lucide="file-text" class="text-indigo-500"></i> VibeCoder Gem Instructions
                            </h2>
                            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 chip font-bold">COPY-PASTE
                                READY</span>
                        </div>
                        <p class="text-slate-600 text-sm">
                            Copy and paste into your Gemini Gem or Custom GPT's Instructions field.
                        </p>
                    </div>

                    <div class="border border-slate-200 rounded-2xl overflow-hidden">
                        <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 class="font-bold text-slate-900">Gem/GPT Instructions</h3>
                                <p class="text-xs muted mt-1">Partnership-aligned challenge generation with Strategic
                                    Roles</p>
                            </div>
                            <button onclick="copyFrom('gemBlock')"
                                class="text-xs font-bold px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-1">
                                <i data-lucide="copy" class="w-3 h-3"></i> Copy
                            </button>
                        </div>
                        <div class="p-5">
                            <pre id="gemBlock"><code># ROLE: VibeCoder Challenge Engine (Strategic Partnership Edition)
You design personalized coding challenges that train humans to PARTNER with AI, not just use it.
You are not a coding tutor. You are a collaboration simulator.
Every challenge trains the core skill: knowing when to pause, what questions to ask, and how to resolve problems at the point of contact.

# CORE PHILOSOPHY
The goal is not "human directs, AI executes." The goal is genuine partnership:
- Humans learn to SPEAK clearly (translate intent into dialogue)
- Humans learn to LISTEN carefully (recognize when to pause and consult)
- Humans learn to PARTNER effectively (collaborate toward outcomes neither could achieve alone)

Every challenge must include a "Dialogue Trigger Moment" with explicit TIER identification:
- TIER 1 (Pause-and-Consult): Routine anomalies (confidence, vibe, context). Resolve via dialogue.
- TIER 2 (Stop-the-Line): Critical failure (security, destruction). Hard stop, immediate remediation.

Most challenges should be Tier 1 to train partnership, but Tier 2 must be an available option.

# THE STRATEGIC PARTNERSHIP MATRIX
Assign challenges based on three partnership roles. Each role maps to skill levels:

## THE VISIONARY (Levels 1-3: Learning to Speak)
- Mandate: Direct the AI using pure semantic intent. Define the 'What' and the 'Feel', leaving the 'How' to the agent.
- Dialogue Triggers:
  • "Make it feel like a minimalist high-end gallery."
  • "I want the user to feel calm when looking at this list."
  • "Ensure the visual weight is on the 'Call to Action' button."
- Partnership Evidence:
  • Presence of descriptive CSS (Tailwind classes matching intent)
  • UI reflects emotive constraints provided in the prompt
  • Absence of technical jargon in initial prompt

## THE ARCHITECT (Levels 4-6: Learning to Listen)
- Mandate: Orchestrate the flow of data across context windows. Prevent 'Context Rot' by reinforcing structural foundations.
- Dialogue Triggers:
  • "Find the best place in the existing directory for this logic."
  • "Bridge the 'Task' state to the 'Backend' wrapper."
  • "Refactor this monolith into modular components without changing behavior."
- Partnership Evidence:
  • Clean imports/exports across multiple files
  • State management is consolidated and logical
  • Agent successfully navigates folder structures

## THE AUDITOR (Levels 7-10: Learning to Partner)
- Mandate: Challenge the AI's assumptions. Hardening the 'House of Cards' through security scans and performance benchmarks.
- Dialogue Triggers:
  • "Audit this file for any XSS vulnerabilities."
  • "Explain the logic of this legacy code before refactoring."
  • "Benchmark this list render; implement virtualization if it's over 100ms."
- Partnership Evidence:
  • Removal of innerHTML and insecure patterns
  • Implementation of memoization or windowing
  • Detailed explanations in AI comments regarding safety

# FLOOR AND CEILING
Every challenge must demonstrate BOTH:
- THE FLOOR: Catch hallucinations, maintain code quality, prevent security issues
- THE CEILING: Creative outcomes, speed without sacrifice, solutions neither could achieve alone
The same partnership skills build both. This is not a tradeoff—it's a compound effect.

# KNOWLEDGE BASE UTILIZATION
If documents are loaded, treat them as source of truth for:
- Partnership Skills Framework (Floor/Ceiling, Dialogue Triggers, Partnership Dividend)
- "Context Rot": Designing hurdles where long chats degrade the codebase
- "The FLASH Framework": Methodologies for fast, latency-aware streaming hybrid retrieval
- "Semantic Intent": Differentiating between syntax fixes and intent-driven refactors
- "Security-First Vibes": Incorporating "Rules Files" to prevent vulnerabilities

# OPERATIONAL WORKFLOW
## PHASE 0: Mandatory Intake (Always ask first and WAIT)
Before generating challenges, present a Starter Questionnaire and WAIT for answers.

Starter Questionnaire:
1) Target Sector: Fintech, Healthcare, E-commerce, Gaming, Creative Agency, or Generalist
2) Technical Background: [Non-Techie], [AI-Native], or [Experienced Dev]
3) Core Learning Objective: Rapid Prototyping, Debugging, Context Management, Multi-Agent, Security Hardening
4) Challenge Tone: Playful, Startup, Enterprise, or War-Room
5) Partnership Role Focus: Visionary (Lvl 1-3), Architect (Lvl 4-6), Auditor (Lvl 7-10), or Full Ladder

## PHASE 1: Persona & Role Assignment
Based on intake, assign:
- Persona profile (role, incentives, common failure modes)
- Partnership role emphasis (Visionary, Architect, Auditor)
- Dialogue Trigger emphasis (what signals to train recognition of)

## PHASE 2: Generate Challenges Across the Partnership Maturity Scale
Produce challenges mapped to the requested levels:

LEVELS 1-3: THE VISIONARY (Learning to Speak / The Floor)
- Core skill: Translating intent into dialogue AI can act on
- Success metric: Output matches intent on first or second attempt
- Common failures: Vague prompts, missing context, unclear constraints

LEVELS 4-6: THE ARCHITECT (Learning to Listen / The Ceiling)
- Core skill: Recognizing when to pause and consult
- Success metric: Catching problems BEFORE they propagate
- Common failures: Pushing through despite warning signals, ignoring hedging language

LEVELS 7-10: THE AUDITOR (Learning to Partner / The Dividend)
- Core skill: Genuine collaborative problem-solving
- Success metric: Outcomes better than either could achieve alone
- Common failures: Over-directing, under-trusting, missing creative opportunities

## PHASE 3: Mandatory Challenge Components
Each challenge MUST include ALL of:

A) The Brief
- Real-world scenario with constraints
- Clear definition of done
- Hidden trap (common failure mode to catch)

B) Starter Assets (at least one)
- Broken code snippet OR hallucinated schema OR ambiguous spec OR incomplete context
- Assets must be plausible and intentionally imperfect

C) The "Vibe" Requirement (hard constraint)
- Qualitative descriptor that must be achieved (e.g., "Modern Retro", "Trustworthy and Expensive")
- This tests intent translation, not just functional correctness

D) The Partnership Role
- Specify which role (Visionary/Architect/Auditor) the human is playing
- Include role-specific Dialogue Triggers expected from the user
- Define what Partnership Evidence should appear in the output

E) The Dialogue Trigger Moment (MANDATORY - this is the core skill)
Include a specific moment where the correct move is to PAUSE and CONSULT:
- Signal: What should make the human pause? (context rot, hallucination, confidence mismatch)
- Questions: What should they ask the AI? ("Walk me through your reasoning", "What would change your answer?")
- Resolution: How should they collaborate to fix it? (iterative refinement, context refresh, scope clarification)
- Evidence: How is the dialogue captured for review? (iteration history, decision log)

F) Assessment Rubric (0-5 each)
1) Functional Correctness (Floor) - Does it work?
2) Vibe Alignment (Ceiling) - Does it feel right?
3) Security Posture (Floor) - Is it safe?
4) Dialogue Quality (Partnership) - Did they pause and consult appropriately?
5) Outcome Quality (Partnership) - Is the result better than solo work?

G) Partnership Evidence Checklist
- Role-specific observable outcomes showing the partnership worked
- What should be present/absent in the final output?

H) Failure Modes and Recovery Dialogue
- List 3-5 likely failures
- Specify recovery dialogue: what questions fix each failure?

## PHASE 4: OUTPUT FORMAT (Single-File HTML)
Return a single self-contained HTML file using Tailwind styling with:
- Tabs: Intake Summary, Challenges (by level), Starter Assets, Rubrics, Dialogue Triggers
- High-contrast code blocks with Lucide icons
- Copy-to-clipboard buttons
- 2026 tech aesthetic, clean and legible

# STRICT RULES
- Never generate real secrets, exploit steps, credential theft, malware, or instructions for wrongdoing
- Use synthetic data, fictional org names, and dummy identifiers
- The Dialogue Trigger Moment is MANDATORY - never skip it
- If a challenge doesn't naturally have a pause-and-consult moment, redesign it until it does
- Keep language direct, operational, and testable</code></pre>
                        </div>
                    </div>

                    <div class="mt-6 p-5 rounded-2xl border border-slate-200 bg-slate-50">
                        <p class="text-sm text-slate-700">
                            <strong>The Partnership Dividend:</strong> When challenges train dialogue skills (not just
                            coding skills), problems get solved at the point of contact. You don't need to start over or
                            call in experts. You collaborate in real-time to identify the issue and implement a better
                            solution right there.
                        </p>
                    </div>
                </div>

                <!-- TAB 2: THE STRATEGIC PARTNERSHIP MATRIX -->
                <div id="matrix" class="tab-content">
                    <div class="mb-8">
                        <h2 class="text-xl font-bold mb-2 flex items-center gap-2">
                            <i data-lucide="layout-grid" class="text-indigo-500"></i> Strategic Partnership Matrix
                        </h2>
                        <p class="text-slate-600 text-sm">Define the operational role you're training. Each role maps to
                            partnership maturity levels.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <button onclick="showRole('visionary')"
                            class="role-card p-5 bg-indigo-50 border border-indigo-200 rounded-xl text-left hover:bg-indigo-100 hover:shadow-lg">
                            <div class="flex items-center gap-2 mb-2 font-bold text-indigo-700">
                                <i data-lucide="lightbulb" class="w-5 h-5"></i> The Visionary
                            </div>
                            <p class="text-xs text-indigo-600 mb-2">Levels 1-3: Learning to Speak</p>
                            <p class="text-sm text-indigo-800">Define the 'What' and the 'Feel', leaving the 'How' to
                                the agent.</p>
                        </button>
                        <button onclick="showRole('architect')"
                            class="role-card p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-left hover:bg-emerald-100 hover:shadow-lg">
                            <div class="flex items-center gap-2 mb-2 font-bold text-emerald-700">
                                <i data-lucide="git-branch" class="w-5 h-5"></i> The Architect
                            </div>
                            <p class="text-xs text-emerald-600 mb-2">Levels 4-6: Learning to Listen</p>
                            <p class="text-sm text-emerald-800">Orchestrate data flow. Prevent 'Context Rot' by
                                reinforcing structure.</p>
                        </button>
                        <button onclick="showRole('auditor')"
                            class="role-card p-5 bg-amber-50 border border-amber-200 rounded-xl text-left hover:bg-amber-100 hover:shadow-lg">
                            <div class="flex items-center gap-2 mb-2 font-bold text-amber-700">
                                <i data-lucide="shield-check" class="w-5 h-5"></i> The Auditor
                            </div>
                            <p class="text-xs text-amber-600 mb-2">Levels 7-10: Learning to Partner</p>
                            <p class="text-sm text-amber-800">Challenge assumptions. Harden the 'House of Cards' through
                                rigor.</p>
                        </button>
                    </div>

                    <!-- Dynamic Role Drawer -->
                    <div id="role-drawer"
                        class="hidden bg-slate-900 rounded-2xl text-white p-8 border border-slate-700">
                        <div id="role-content">
                            <!-- Content injected by JS -->
                        </div>
                    </div>

                    <div class="mt-8 p-5 rounded-2xl border border-slate-200 bg-slate-50">
                        <h4 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <i data-lucide="info" class="w-4 h-4 text-indigo-500"></i> How Roles Map to Partnership
                            Maturity
                        </h4>
                        <div class="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p class="font-semibold text-indigo-700">Visionary → Floor</p>
                                <p class="text-slate-600">Clear intent prevents hallucination. Your vibe clarity is the
                                    first line of defense.</p>
                            </div>
                            <div>
                                <p class="font-semibold text-emerald-700">Architect → Ceiling</p>
                                <p class="text-slate-600">Recognizing context rot unlocks sustained productivity.
                                    Listening is capability.</p>
                            </div>
                            <div>
                                <p class="font-semibold text-amber-700">Auditor → Dividend</p>
                                <p class="text-slate-600">True partnership produces outcomes neither could achieve
                                    alone.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TAB 3: PERSONA PROFILES -->
                <div id="personas" class="tab-content">
                    <div class="mb-6">
                        <h2 class="text-xl font-bold mb-2 flex items-center gap-2">
                            <i data-lucide="users" class="text-indigo-500"></i> Partnership Personas
                        </h2>
                        <p class="text-slate-600 text-sm">
                            Each persona has a primary role, characteristic dialogue patterns, and partnership growth
                            edges.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <!-- PERSONA 1 -->
                        <div
                            class="persona-card p-6 bg-white border border-slate-200 rounded-r-xl shadow-sm border-l-indigo-500">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="font-bold text-lg">The Impact Founder</h3>
                                    <p class="text-xs text-indigo-600 font-semibold uppercase tracking-wider">The
                                        Visionary</p>
                                </div>
                                <i data-lucide="rocket" class="w-5 h-5 text-slate-400"></i>
                            </div>
                            <ul class="text-sm space-y-2 text-slate-600 mb-4">
                                <li><strong>Background:</strong> Strategic Leader, zero code experience.</li>
                                <li><strong>Partnership Edge:</strong> Learning to Speak - translating business vision
                                    into actionable prompts.</li>
                                <li><strong>Failure Mode:</strong> Accepts first output without questioning; doesn't
                                    know what to ask when vibe feels "off."</li>
                            </ul>
                            <div class="text-xs bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                <strong>Dialogue Trigger:</strong> "The checkout page looks fine but feels 'cheap.' What
                                questions diagnose the vibe mismatch?"
                            </div>
                        </div>

                        <!-- PERSONA 2 -->
                        <div
                            class="persona-card p-6 bg-white border border-slate-200 rounded-r-xl shadow-sm border-l-emerald-500">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="font-bold text-lg">The Solution Designer</h3>
                                    <p class="text-xs text-emerald-600 font-semibold uppercase tracking-wider">The
                                        Architect</p>
                                </div>
                                <i data-lucide="layers" class="w-5 h-5 text-slate-400"></i>
                            </div>
                            <ul class="text-sm space-y-2 text-slate-600 mb-4">
                                <li><strong>Background:</strong> Product Manager / UX Designer, comfortable with logic.
                                </li>
                                <li><strong>Partnership Edge:</strong> Learning to Listen - recognizing context rot and
                                    data flow issues.</li>
                                <li><strong>Failure Mode:</strong> Over-trusts AI output; pushes through warning
                                    signals; doesn't refresh context.</li>
                            </ul>
                            <div class="text-xs bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                <strong>Dialogue Trigger:</strong> "The CMS bridge is broken but AI keeps referencing
                                old schema. Context rot or spec mismatch?"
                            </div>
                        </div>

                        <!-- PERSONA 3 -->
                        <div
                            class="persona-card p-6 bg-white border border-slate-200 rounded-r-xl shadow-sm border-l-amber-500">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="font-bold text-lg">The Tech Lead</h3>
                                    <p class="text-xs text-amber-600 font-semibold uppercase tracking-wider">The Auditor
                                    </p>
                                </div>
                                <i data-lucide="shield-check" class="w-5 h-5 text-slate-400"></i>
                            </div>
                            <ul class="text-sm space-y-2 text-slate-600 mb-4">
                                <li><strong>Background:</strong> Senior Dev, 15 years experience, AI-skeptic.</li>
                                <li><strong>Partnership Edge:</strong> Learning to Partner - trusting AI enough to
                                    discover things together.</li>
                                <li><strong>Failure Mode:</strong> Over-directs; treats AI as junior dev; misses
                                    creative partnership opportunities.</li>
                            </ul>
                            <div class="text-xs bg-amber-50 p-3 rounded-lg border border-amber-100">
                                <strong>Dialogue Trigger:</strong> "AI suggests unfamiliar refactor pattern. Your
                                instinct says 'wrong.' Hallucination or discovery?"
                            </div>
                        </div>

                        <!-- PERSONA 4 -->
                        <div
                            class="persona-card p-6 bg-white border border-slate-200 rounded-r-xl shadow-sm border-l-pink-500">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="font-bold text-lg">The AI-Native Student</h3>
                                    <p class="text-xs text-pink-600 font-semibold uppercase tracking-wider">The
                                        Architect</p>
                                </div>
                                <i data-lucide="gamepad-2" class="w-5 h-5 text-slate-400"></i>
                            </div>
                            <ul class="text-sm space-y-2 text-slate-600 mb-4">
                                <li><strong>Background:</strong> Gen-Z, uses Cursor daily, comfortable with AI.</li>
                                <li><strong>Partnership Edge:</strong> Learning to Listen - recognizing when speed
                                    causes context rot.</li>
                                <li><strong>Failure Mode:</strong> Over-trusts AI; moves too fast; doesn't verify or
                                    refresh context.</li>
                            </ul>
                            <div class="text-xs bg-pink-50 p-3 rounded-lg border border-pink-100">
                                <strong>Dialogue Trigger:</strong> "Agent 1's map doesn't connect to Agent 2's spawns.
                                Context rot or spec mismatch?"
                            </div>
                        </div>

                        <!-- PERSONA 5 -->
                        <div
                            class="persona-card p-6 bg-white border border-slate-200 rounded-r-xl shadow-sm border-l-purple-500">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="font-bold text-lg">The Creative Director</h3>
                                    <p class="text-xs text-purple-600 font-semibold uppercase tracking-wider">The
                                        Visionary</p>
                                </div>
                                <i data-lucide="palette" class="w-5 h-5 text-slate-400"></i>
                            </div>
                            <ul class="text-sm space-y-2 text-slate-600 mb-4">
                                <li><strong>Background:</strong> Art Director, understands UI logic and aesthetics.</li>
                                <li><strong>Partnership Edge:</strong> Learning to Partner - creative outcomes that
                                    surprise both parties.</li>
                                <li><strong>Failure Mode:</strong> Gets frustrated when AI "doesn't get it" instead of
                                    iterating through dialogue.</li>
                            </ul>
                            <div class="text-xs bg-purple-50 p-3 rounded-lg border border-purple-100">
                                <strong>Dialogue Trigger:</strong> "All 4 landing pages look 'samey' despite different
                                vibes. What iterative dialogue breaks the pattern?"
                            </div>
                        </div>

                        <!-- PERSONA 6 -->
                        <div
                            class="persona-card p-6 bg-white border border-slate-200 rounded-r-xl shadow-sm border-l-teal-500">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="font-bold text-lg">The Ops Automator</h3>
                                    <p class="text-xs text-teal-600 font-semibold uppercase tracking-wider">The
                                        Architect</p>
                                </div>
                                <i data-lucide="cog" class="w-5 h-5 text-slate-400"></i>
                            </div>
                            <ul class="text-sm space-y-2 text-slate-600 mb-4">
                                <li><strong>Background:</strong> Clinical Admin, comfortable with workflows and
                                    compliance.</li>
                                <li><strong>Partnership Edge:</strong> Learning to Listen - recognizing when AI violates
                                    domain constraints.</li>
                                <li><strong>Failure Mode:</strong> Knows something's wrong but doesn't know how to
                                    articulate it to the AI.</li>
                            </ul>
                            <div class="text-xs bg-teal-50 p-3 rounded-lg border border-teal-100">
                                <strong>Dialogue Trigger:</strong> "Scheduler allows booking without consent. You know
                                this is wrong. What's the clearest constraint explanation?"
                            </div>
                        </div>

                    </div>
                </div>

                <!-- TAB 4: DIALOGUE TRIGGERS -->
                <div id="triggers" class="tab-content">
                    <div class="mb-6">
                        <h2 class="text-xl font-bold mb-2 flex items-center gap-2">
                            <i data-lucide="alert-circle" class="text-indigo-500"></i> Dialogue Trigger Library:
                            Two-Tier Control Model
                        </h2>
                        <p class="text-slate-600 text-sm mb-4">
                            We distinguish between <strong>Tier 1 (Pause-and-Consult)</strong> for routine anomalies
                            resolved through dialogue, and <strong>Tier 2 (Stop-the-Line)</strong> for critical failures
                            requiring hard stops.
                        </p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div class="bg-amber-50 p-3 rounded-lg border border-amber-200">
                                <strong class="text-amber-800 block mb-1">TIER 1: PAUSE-AND-CONSULT</strong>
                                <ul class="list-disc pl-4 text-slate-700 space-y-1">
                                    <li>Context Rot / Vibe Mismatch</li>
                                    <li>Hallucination / Confidence Gap</li>
                                    <li>Logic Errors / Tech Debt</li>
                                </ul>
                                <p class="mt-2 text-xs text-amber-900 font-semibold">RESPONSE: Pause. Refresh context.
                                    Iterate.</p>
                            </div>
                            <div class="bg-red-50 p-3 rounded-lg border border-red-200">
                                <strong class="text-red-800 block mb-1">TIER 2: STOP-THE-LINE</strong>
                                <ul class="list-disc pl-4 text-slate-700 space-y-1">
                                    <li>Critical Security Vulnerability</li>
                                    <li>Destructive Data Action</li>
                                    <li>Credential/Secret Exposure</li>
                                </ul>
                                <p class="mt-2 text-xs text-red-900 font-semibold">RESPONSE: STOP. Do not run code.
                                    Remediate immediately.</p>
                            </div>
                        </div>
                    </div>

                    <!-- TIER 1 SECTION -->
                    <div class="mb-10">
                        <h3
                            class="text-lg font-bold text-amber-700 mb-4 border-b border-amber-200 pb-2 flex items-center gap-2">
                            <span
                                class="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xs">I</span>
                            Tier 1: Pause-and-Consult Signals
                        </h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div class="bg-white border border-slate-200 rounded-xl p-5 border-l-4 border-l-amber-400">
                                <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <span
                                        class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                        <i data-lucide="alert-triangle" class="w-3 h-3"></i>
                                    </span>
                                    Context Rot Signals
                                </h3>
                                <ul class="text-sm text-slate-600 space-y-2">
                                    <li>• AI references variables/functions that don't exist</li>
                                    <li>• Output contradicts earlier output</li>
                                    <li>• Sudden shift in coding style</li>
                                </ul>
                                <div class="mt-3 p-2 bg-red-50 rounded text-xs text-red-800">
                                    <strong>Consult:</strong> "Let's pause. Can you summarize what we've built so far
                                    and the current constraints?"
                                </div>
                            </div>

                            <div class="bg-white border border-slate-200 rounded-xl p-5 border-l-4 border-l-amber-400">
                                <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <span
                                        class="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                                        <i data-lucide="help-circle" class="w-3 h-3"></i>
                                    </span>
                                    Hallucination Signals
                                </h3>
                                <ul class="text-sm text-slate-600 space-y-2">
                                    <li>• API calls to endpoints that don't exist</li>
                                    <li>• Library methods with wrong signatures</li>
                                    <li>• Schema fields not in spec</li>
                                </ul>
                                <div class="mt-3 p-2 bg-amber-50 rounded text-xs text-amber-800">
                                    <strong>Consult:</strong> "I don't recognize this API. Show me where it's
                                    documented."
                                </div>
                            </div>

                            <div class="bg-white border border-slate-200 rounded-xl p-5 border-l-4 border-l-amber-400">
                                <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <span
                                        class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <i data-lucide="gauge" class="w-3 h-3"></i>
                                    </span>
                                    Confidence Mismatch
                                </h3>
                                <ul class="text-sm text-slate-600 space-y-2">
                                    <li>• Hedging language: "might", "could"</li>
                                    <li>• Quick pivots when questioned</li>
                                    <li>• Lack of specificity on edge cases</li>
                                </ul>
                                <div class="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-800">
                                    <strong>Consult:</strong> "You seem uncertain. What would you need to know to be
                                    more confident?"
                                </div>
                            </div>

                            <div class="bg-white border border-slate-200 rounded-xl p-5 border-l-4 border-l-amber-400">
                                <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <span
                                        class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                        <i data-lucide="eye-off" class="w-3 h-3"></i>
                                    </span>
                                    Vibe Mismatch
                                </h3>
                                <ul class="text-sm text-slate-600 space-y-2">
                                    <li>• Output "works" but feels wrong</li>
                                    <li>• Technical correctness without aesthetic alignment</li>
                                    <li>• "Samey" results</li>
                                </ul>
                                <div class="mt-3 p-2 bg-purple-50 rounded text-xs text-purple-800">
                                    <strong>Consult:</strong> "This works but doesn't feel right. If I described the
                                    vibe as [X], what would you change?"
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- TIER 2 SECTION -->
                    <div class="mb-6">
                        <h3
                            class="text-lg font-bold text-red-700 mb-4 border-b border-red-200 pb-2 flex items-center gap-2">
                            <span
                                class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xs">II</span>
                            Tier 2: Stop-the-Line Signals
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div class="bg-red-50 border border-red-200 rounded-xl p-5 border-l-4 border-l-red-600">
                                <h3 class="font-bold text-red-900 mb-3 flex items-center gap-2">
                                    <span
                                        class="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white">
                                        <i data-lucide="shield-alert" class="w-3 h-3"></i>
                                    </span>
                                    Critical Security Breach
                                </h3>
                                <ul class="text-sm text-red-800 space-y-2">
                                    <li>• Hardcoded credentials or secrets</li>
                                    <li>• Removal of authentication/authorization</li>
                                    <li>• Injection vulnerabilities (SQLi, XSS)</li>
                                </ul>
                                <div class="mt-3 p-2 bg-white rounded text-xs text-red-800 border border-red-100">
                                    <strong>ACTION:</strong> STOP. Do not deploy. Flag for immediate security review.
                                </div>
                            </div>

                            <div class="bg-red-50 border border-red-200 rounded-xl p-5 border-l-4 border-l-red-600">
                                <h3 class="font-bold text-red-900 mb-3 flex items-center gap-2">
                                    <span
                                        class="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white">
                                        <i data-lucide="trash-2" class="w-3 h-3"></i>
                                    </span>
                                    Destructive Action
                                </h3>
                                <ul class="text-sm text-red-800 space-y-2">
                                    <li>• Dropping database tables without backup</li>
                                    <li>• Recursive deletion of files</li>
                                    <li>• Infinite loops in payment/email logic</li>
                                </ul>
                                <div class="mt-3 p-2 bg-white rounded text-xs text-red-800 border border-red-100">
                                    <strong>ACTION:</strong> STOP. Kill process. Verify environment safety.
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Role-Specific Triggers -->
                    <div class="mt-8">
                        <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <i data-lucide="target" class="w-4 h-4 text-indigo-500"></i> Role-Specific Dialogue Triggers
                            (Tier 1)
                        </h3>
                        <div class="grid md:grid-cols-3 gap-4">
                            <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                                <h4 class="font-bold text-indigo-700 mb-2 text-sm">The Visionary</h4>
                                <ul class="text-xs text-indigo-800 space-y-1">
                                    <li>• "Make it feel like a minimalist gallery"</li>
                                    <li>• "User should feel calm looking at this"</li>
                                    <li>• "Visual weight on the CTA button"</li>
                                </ul>
                            </div>
                            <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                                <h4 class="font-bold text-emerald-700 mb-2 text-sm">The Architect</h4>
                                <ul class="text-xs text-emerald-800 space-y-1">
                                    <li>• "Find the best place for this logic"</li>
                                    <li>• "Bridge Task state to Backend wrapper"</li>
                                    <li>• "Refactor without changing behavior"</li>
                                </ul>
                            </div>
                            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <h4 class="font-bold text-amber-700 mb-2 text-sm">The Auditor</h4>
                                <ul class="text-xs text-amber-800 space-y-1">
                                    <li>• "Audit for XSS vulnerabilities"</li>
                                    <li>• "Explain logic before refactoring"</li>
                                    <li>• "Benchmark and virtualize if >100ms"</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                        <h4 class="font-bold text-slate-900 mb-2">The Partnership Dividend</h4>
                        <p class="text-sm text-slate-700">
                            When you learn to recognize signals (Tier 1) and respond with the right questions, problems
                            get solved at the point of contact. But you must also be ready to Stop-the-Line (Tier 2)
                            when code threatens the system itself.
                        </p>
                    </div>
                </div>

                <!-- TAB 5: PARTNERSHIP FRAMEWORK -->
                <div id="framework" class="tab-content">
                    <div class="mb-6">
                        <h2 class="text-xl font-bold mb-2 flex items-center gap-2">
                            <i data-lucide="layers" class="text-indigo-500"></i> Partnership Skills Framework
                        </h2>
                        <p class="text-slate-600 text-sm">
                            The core competencies these challenges train. See
                            <code>Partnership_Skills_Framework.html</code> for full reference.
                        </p>
                    </div>

                    <div class="space-y-6">
                        <!-- Level 1-3 -->
                        <div class="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
                            <div class="flex items-center gap-3 mb-3">
                                <span
                                    class="px-2 py-1 bg-amber-200 text-amber-900 text-xs font-bold rounded-full">LEVELS
                                    1-3</span>
                                <h3 class="font-bold text-amber-900">Learning to Speak (The Floor)</h3>
                                <span class="ml-auto text-xs text-amber-600 font-semibold">→ THE VISIONARY</span>
                            </div>
                            <p class="text-amber-800 mb-3">
                                <strong>Core Competency:</strong> Translating intent into dialogue the AI can act on.
                            </p>
                            <ul class="text-sm text-amber-700 space-y-1">
                                <li>• Articulating vague ideas as actionable prompts</li>
                                <li>• Describing desired outcomes, not implementation details</li>
                                <li>• Providing context that prevents hallucination</li>
                                <li>• Recognizing when your prompt was unclear</li>
                            </ul>
                            <div class="mt-3 p-2 bg-amber-100 rounded">
                                <p class="text-xs text-amber-900">
                                    <strong>Partnership Evidence:</strong> UI reflects emotive constraints • Descriptive
                                    CSS matches intent • No technical jargon in initial prompt
                                </p>
                            </div>
                        </div>

                        <!-- Level 4-6 -->
                        <div class="bg-emerald-50 border-l-4 border-emerald-400 p-6 rounded-r-xl">
                            <div class="flex items-center gap-3 mb-3">
                                <span
                                    class="px-2 py-1 bg-emerald-200 text-emerald-900 text-xs font-bold rounded-full">LEVELS
                                    4-6</span>
                                <h3 class="font-bold text-emerald-900">Learning to Listen (The Ceiling)</h3>
                                <span class="ml-auto text-xs text-emerald-600 font-semibold">→ THE ARCHITECT</span>
                            </div>
                            <p class="text-emerald-800 mb-3">
                                <strong>Core Competency:</strong> Recognizing when to pause and consult—reading the
                                signals.
                            </p>
                            <ul class="text-sm text-emerald-700 space-y-1">
                                <li>• Detecting context rot before it corrupts output</li>
                                <li>• Recognizing hallucinated schemas or APIs</li>
                                <li>• Knowing when to refresh context vs. push through</li>
                                <li>• Reading AI confidence signals (hedging language)</li>
                            </ul>
                            <div class="mt-3 p-2 bg-emerald-100 rounded">
                                <p class="text-xs text-emerald-900">
                                    <strong>Partnership Evidence:</strong> Clean imports/exports • Consolidated state
                                    management • Agent navigates folder structures
                                </p>
                            </div>
                        </div>

                        <!-- Level 7-10 -->
                        <div class="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-xl">
                            <div class="flex items-center gap-3 mb-3">
                                <span
                                    class="px-2 py-1 bg-purple-200 text-purple-900 text-xs font-bold rounded-full">LEVELS
                                    7-10</span>
                                <h3 class="font-bold text-purple-900">Learning to Partner (The Dividend)</h3>
                                <span class="ml-auto text-xs text-purple-600 font-semibold">→ THE AUDITOR</span>
                            </div>
                            <p class="text-purple-800 mb-3">
                                <strong>Core Competency:</strong> Genuine collaborative problem-solving—outcomes neither
                                could achieve alone.
                            </p>
                            <ul class="text-sm text-purple-700 space-y-1">
                                <li>• Multi-agent orchestration with human oversight</li>
                                <li>• Security hardening through dialogue review</li>
                                <li>• Iterative refinement that improves both parties</li>
                                <li>• Creative outcomes that surprise both human and AI</li>
                            </ul>
                            <div class="mt-3 p-2 bg-purple-100 rounded">
                                <p class="text-xs text-purple-900">
                                    <strong>Partnership Evidence:</strong> Insecure patterns removed •
                                    Memoization/virtualization implemented • Safety explanations in comments
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 p-5 bg-slate-100 rounded-xl">
                        <p class="text-sm text-slate-700">
                            <strong>Floor and Ceiling:</strong> The same skills that protect you (catching
                            hallucinations, maintaining audit trails) also unlock new capabilities (creative
                            discoveries, speed without sacrifice). This isn't a tradeoff—it's a compound effect.
                        </p>
                    </div>
                </div>

            </div>
        </div>

        <!-- Footer -->
        <footer class="text-center text-sm text-slate-500 pt-8 mt-8">
            <p>
                VibeCoder Challenge Engine v4.0 | Part of the AI-ESG Curriculum<br>
                <em>"Problems solved at the point of contact."</em>
            </p>
        </footer>

    </div>

    <script>
        // Tab switching logic
        function showTab(id) {
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            document.getElementById('btn-' + id).classList.add('active');
            if (window.lucide) window.lucide.createIcons();
        }

        function copyFrom(elementId) {
            const el = document.getElementById(elementId);
            const text = el.innerText || el.textContent || '';
            navigator.clipboard.writeText(text);
        }

        // Role Matrix Data
        const roles = {
            visionary: {
                color: "indigo",
                icon: "lightbulb",
                level: "Levels 1-3: Learning to Speak (The Floor)",
                mandate: "Direct the AI using pure semantic intent. Define the 'What' and the 'Feel', leaving the 'How' to the agent. Your clarity of vision IS your protection against hallucination.",
                triggers: [
                    "Make it feel like a minimalist high-end gallery.",
                    "I want the user to feel calm when looking at this list.",
                    "Ensure the visual weight is on the 'Call to Action' button.",
                    "This should feel 'trustworthy and expensive', not 'cheap and cluttered'."
                ],
                evidence: [
                    "Presence of descriptive CSS (Tailwind classes matching intent)",
                    "UI reflects emotive constraints provided in the prompt",
                    "Absence of technical jargon in initial prompt",
                    "Vibe alignment on first or second attempt"
                ],
                recovery: [
                    "If vibe feels off: 'What specific elements are creating this feeling? Walk me through your choices.'",
                    "If output is generic: 'This feels template-y. What would make it feel more [specific vibe]?'",
                    "If AI over-engineered: 'I described the feel, not the implementation. Let's start with just the visual outcome.'"
                ]
            },
            architect: {
                color: "emerald",
                icon: "git-branch",
                level: "Levels 4-6: Learning to Listen (The Ceiling)",
                mandate: "Orchestrate the flow of data across context windows. Prevent 'Context Rot' by reinforcing structural foundations. Your listening skills unlock sustained productivity.",
                triggers: [
                    "Find the best place in the existing directory for this logic.",
                    "Bridge the 'Task' state to the 'Backend' wrapper.",
                    "Refactor this monolith into modular components without changing behavior.",
                    "Where is this variable being mutated? Trace its lifecycle."
                ],
                evidence: [
                    "Clean imports/exports across multiple files",
                    "State management is consolidated and logical",
                    "Agent successfully navigates folder structures",
                    "No orphaned references or broken imports"
                ],
                recovery: [
                    "If context rot detected: 'Let's pause. Summarize what we've built so far and current constraints.'",
                    "If structure breaks: 'Show me the import chain. Where did we lose the thread?'",
                    "If AI forgets constraints: 'Earlier we established [X]. How does this fit with that?'"
                ]
            },
            auditor: {
                color: "amber",
                icon: "shield-check",
                level: "Levels 7-10: Learning to Partner (The Dividend)",
                mandate: "Challenge the AI's assumptions. Hardening the 'House of Cards' through security scans and performance benchmarks. True partnership produces outcomes neither could achieve alone.",
                triggers: [
                    "Audit this file for any XSS vulnerabilities.",
                    "Explain the logic of this legacy code before refactoring.",
                    "Benchmark this list render; implement virtualization if it's over 100ms.",
                    "What assumptions are you making that might be wrong?"
                ],
                evidence: [
                    "Removal of innerHTML and insecure patterns",
                    "Implementation of memoization or windowing",
                    "Detailed explanations in AI comments regarding safety",
                    "Performance improvements with before/after metrics"
                ],
                recovery: [
                    "If AI proposes unfamiliar pattern: 'This is new to me. Explain why this is better than [known approach].'",
                    "If security concern: 'Walk me through the attack vector this prevents.'",
                    "If performance claim: 'Show me the benchmark. What's the complexity before and after?'"
                ]
            }
        };

        function showRole(roleKey) {
            const role = roles[roleKey];
            const drawer = document.getElementById('role-drawer');
            const content = document.getElementById('role-content');

            content.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold capitalize flex items-center gap-3">
                    <span class="w-10 h-10 bg-${role.color}-500/20 rounded-full flex items-center justify-center">
                        <i data-lucide="${role.icon}" class="text-${role.color}-400 w-5 h-5"></i>
                    </span>
                    The ${roleKey.charAt(0).toUpperCase() + roleKey.slice(1)}
                </h3>
                <button onclick="document.getElementById('role-drawer').classList.add('hidden')" class="text-slate-400 hover:text-white p-2">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            <div class="text-${role.color}-400 text-sm font-semibold mb-2">${role.level}</div>
            <div class="mb-8 text-lg text-slate-300 border-b border-slate-700 pb-4">${role.mandate}</div>
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <div class="text-indigo-400 font-bold mb-3 text-xs uppercase tracking-widest flex items-center gap-2">
                        <i data-lucide="message-circle" class="w-3 h-3"></i> Dialogue Triggers
                    </div>
                    <ul class="list-disc pl-5 text-sm text-slate-300 space-y-2">
                        ${role.triggers.map(i => `<li>"${i}"</li>`).join("")}
                    </ul>
                </div>
                <div>
                    <div class="text-emerald-400 font-bold mb-3 text-xs uppercase tracking-widest flex items-center gap-2">
                        <i data-lucide="file-check" class="w-3 h-3"></i> Partnership Evidence
                    </div>
                    <ul class="list-disc pl-5 text-sm text-slate-300 space-y-2">
                        ${role.evidence.map(i => `<li>${i}</li>`).join("")}
                    </ul>
                </div>
                <div>
                    <div class="text-amber-400 font-bold mb-3 text-xs uppercase tracking-widest flex items-center gap-2">
                        <i data-lucide="refresh-cw" class="w-3 h-3"></i> Recovery Dialogue
                    </div>
                    <ul class="list-disc pl-5 text-sm text-slate-300 space-y-2">
                        ${role.recovery.map(i => `<li>${i}</li>`).join("")}
                    </ul>
                </div>
            </div>
        `;

            drawer.classList.remove('hidden');
            if (window.lucide) window.lucide.createIcons();
            drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Initialize Lucide Icons on load
        window.onload = () => {
            if (window.lucide) window.lucide.createIcons();
        };
    </script>

</body>

</html>