/**
 * AEIS Assessment Engine
 * Handles Layer A (comprehension checks) and Layer B (applied exercises)
 * Self-contained IIFE, no global pollution except window.AEISAssessment namespace
 */
(function () {
    'use strict';

    var STORAGE_PREFIX = 'aeis_assessment_';
    var EXERCISE_PREFIX = 'aeis_exercise_';

    // ===== QUESTION BANK =====
    var QUESTION_BANK = {

        L0: [
            {
                id: 'q1',
                question: 'What does the term "Liability Sponge" refer to in this curriculum?',
                options: [
                    { letter: 'a', text: 'A legal document that absorbs financial risk' },
                    { letter: 'b', text: 'A person placed in a loop to absorb blame when AI fails, without tools or authority to manage the risk' },
                    { letter: 'c', text: 'An AI model designed to calculate liability exposure' },
                    { letter: 'd', text: 'A compliance department that reviews all AI-generated outputs' }
                ],
                correct: 'b',
                explanation: 'A Liability Sponge (Moral Crumple Zone) is a human positioned in a "human-in-the-loop" arrangement primarily to absorb accountability when systems fail, without being given genuine authority, time, or tools to intervene.'
            },
            {
                id: 'q2',
                question: 'What is the difference between a "pre-action constraint" and "post-action governance"?',
                options: [
                    { letter: 'a', text: 'Pre-action constraint is cheaper; post-action governance is more thorough' },
                    { letter: 'b', text: 'Pre-action constraint prevents harmful actions before they occur; post-action governance addresses harm after the fact' },
                    { letter: 'c', text: 'They are the same thing described from different perspectives' },
                    { letter: 'd', text: 'Pre-action constraint applies to humans; post-action governance applies to AI' }
                ],
                correct: 'b',
                explanation: 'Pre-action constraint (like the Asimov Constraint or a circuit breaker) stops the system before damage is done. Post-action governance only reviews what happened after the fact \u2014 by which point the harm is already real.'
            },
            {
                id: 'q3',
                question: 'In the "21 AIs" thought experiment, what did the independent AI models converge on when asked about accountability structures?',
                options: [
                    { letter: 'a', text: 'AI systems need more processing power to handle governance' },
                    { letter: 'b', text: 'Predictable structural patterns of accountability failure: liability diode, moral crumple zone, and velocity mismatch' },
                    { letter: 'c', text: 'Organizations need larger compliance departments' },
                    { letter: 'd', text: 'AI should replace human oversight entirely' }
                ],
                correct: 'b',
                explanation: 'When 21 different AI models were asked to analyze governance, they independently identified the same structural patterns: downward accountability flows (liability diode), middle management blame absorption (moral crumple zone), and review speed deficits (velocity mismatch).'
            },
            {
                id: 'q4',
                question: 'What is "Stop Work Authority" in the context of this module?',
                options: [
                    { letter: 'a', text: 'The ability to shut down all company operations' },
                    { letter: 'b', text: 'A documented right for designated personnel to pause AI systems when pre-defined governance conditions are violated' },
                    { letter: 'c', text: 'An HR policy for employee breaks' },
                    { letter: 'd', text: 'A vendor contract termination clause' }
                ],
                correct: 'b',
                explanation: 'Stop Work Authority \u2014 borrowed from oil rigs and high-risk construction \u2014 is a formal mechanism that gives designated personnel the documented right to pause or halt AI system operations when specific governance conditions are breached.'
            }
        ],

        L0_5: [
            {
                id: 'q1',
                question: 'What are the three framings for human-AI relationships presented in this module?',
                options: [
                    { letter: 'a', text: 'Master, Slave, and Hybrid' },
                    { letter: 'b', text: 'Tool, Trainee, and Partner' },
                    { letter: 'c', text: 'Controller, Instrument, and Collaborator' },
                    { letter: 'd', text: 'Supervisor, Worker, and Manager' }
                ],
                correct: 'b',
                explanation: 'The module presents Tool (AI as sophisticated calculator), Trainee (AI as supervised but learning entity), and Partner (AI as collaborative agent with shared accountability).'
            },
            {
                id: 'q2',
                question: 'How does the framing choice affect "Liability Sponge" risk?',
                options: [
                    { letter: 'a', text: 'All framings create equal risk' },
                    { letter: 'b', text: 'Only the Tool framing creates risk' },
                    { letter: 'c', text: 'The framing determines where accountability lands \u2014 some framings hide the sponge, others make it visible' },
                    { letter: 'd', text: 'Liability Sponge risk is unrelated to framing' }
                ],
                correct: 'c',
                explanation: 'When an organization frames AI as a Tool but actually delegates judgment to it, the human "operator" becomes a sponge. When framed as a Partner, accountability structures must be made explicit. The framing choice determines whether liability absorption is hidden or visible.'
            },
            {
                id: 'q3',
                question: 'What is an "honest audit trail" in the context of AI framing?',
                options: [
                    { letter: 'a', text: 'A blockchain record of all AI transactions' },
                    { letter: 'b', text: 'A documentation trail that accurately reflects the actual nature of the human-AI interaction, not the aspirational one' },
                    { letter: 'c', text: 'An audit log that only records errors' },
                    { letter: 'd', text: 'A regulatory requirement under CSRD' }
                ],
                correct: 'b',
                explanation: 'An honest audit trail documents what actually happened in the human-AI interaction (who made which decisions, who checked what, how much time was available) rather than recording the fictional version where a human meaningfully reviewed every output.'
            },
            {
                id: 'q4',
                question: 'What is the "Premortem Charter" referenced in this module?',
                options: [
                    { letter: 'a', text: 'A document written after a project fails' },
                    { letter: 'b', text: 'A charter negotiated before a project begins that defines stop triggers and authorizes system pauses' },
                    { letter: 'c', text: 'An annual governance review document' },
                    { letter: 'd', text: 'A vendor contract appendix' }
                ],
                correct: 'b',
                explanation: 'The Premortem Charter is negotiated during "peacetime" \u2014 before a project starts. It defines specific conditions under which the system will be paused and explicitly authorizes designated roles to trigger those stops. Bravery gets you fired; preparation gets you promoted.'
            }
        ],

        L1: [
            {
                id: 'q1',
                question: 'What does "Clarke\'s Law" mean in this curriculum\'s context?',
                options: [
                    { letter: 'a', text: 'Any sufficiently advanced technology requires government regulation' },
                    { letter: 'b', text: 'Any sufficiently advanced AI is indistinguishable from magic \u2014 meaning its reasoning cannot be meaningfully questioned by operators' },
                    { letter: 'c', text: 'Technology always improves over time' },
                    { letter: 'd', text: 'AI systems should be as transparent as possible' }
                ],
                correct: 'b',
                explanation: 'Clarke\'s Law (adapted from Arthur C. Clarke\'s third law) describes the governance failure where AI systems become so opaque that operators cannot question their outputs and instead treat them as oracular truth.'
            },
            {
                id: 'q2',
                question: 'What is the "Watchdog Paradox" described in this module?',
                options: [
                    { letter: 'a', text: 'Security systems that watch themselves create circular validation' },
                    { letter: 'b', text: 'When AI systems designed to audit other AI create recursive loops where AI validates AI' },
                    { letter: 'c', text: 'Guard dogs that protect empty buildings' },
                    { letter: 'd', text: 'Compliance officers who have too many systems to monitor' }
                ],
                correct: 'b',
                explanation: 'The Watchdog Paradox occurs when organizations deploy AI to audit AI outputs, creating recursive loops. The auditing system inherits the same blind spots, and the human oversight layer becomes theatrical.'
            },
            {
                id: 'q3',
                question: 'What is the significance of the shift from "voluntary ESG" to "mandatory financial reporting"?',
                options: [
                    { letter: 'a', text: 'Companies now have more flexibility in how they report' },
                    { letter: 'b', text: 'ESG reporting moves from marketing-controlled narratives to finance-grade data requiring audit-ready evidence chains' },
                    { letter: 'c', text: 'Voluntary reporting was more accurate than mandatory reporting' },
                    { letter: 'd', text: 'This shift only affects European companies' }
                ],
                correct: 'b',
                explanation: 'Under CSRD and ISSB frameworks, ESG disclosures move from voluntary marketing content to mandatory financial-grade reporting requiring the same evidence standards as financial statements \u2014 including auditability and provenance.'
            },
            {
                id: 'q4',
                question: 'What is the "Calvin Convention" concept?',
                options: [
                    { letter: 'a', text: 'A set of international AI regulations' },
                    { letter: 'b', text: 'A log integrity standard ensuring AI system logs cannot be retroactively modified' },
                    { letter: 'c', text: 'A conference on AI ethics held annually' },
                    { letter: 'd', text: 'A requirement that AI systems must pass the Turing test' }
                ],
                correct: 'b',
                explanation: 'The Calvin Convention (named after Susan Calvin from Asimov\'s works) establishes that AI system logs must maintain integrity \u2014 they cannot be retroactively altered, ensuring that audit trails remain trustworthy over time.'
            }
        ],

        L2: [
            {
                id: 'q1',
                question: 'What is an "Evidence Ladder" in the context of ESG compliance?',
                options: [
                    { letter: 'a', text: 'A ranking system for the quality of evidence' },
                    { letter: 'b', text: 'A traceability chain that links an AI-generated insight back through every transformation to its original source document' },
                    { letter: 'c', text: 'A physical storage system for audit documents' },
                    { letter: 'd', text: 'A list of documents needed for regulatory filing' }
                ],
                correct: 'b',
                explanation: 'An Evidence Ladder (Data Lineage / Provenance) is a complete chain of traceability from a reported claim all the way back to the original source record, documenting every transformation step along the way.'
            },
            {
                id: 'q2',
                question: 'What is a "Greenwashing Firewall"?',
                options: [
                    { letter: 'a', text: 'Software that blocks environmental advertising' },
                    { letter: 'b', text: 'A validation control that prevents unsubstantiated or misleading ESG claims from passing through the reporting pipeline' },
                    { letter: 'c', text: 'A cybersecurity tool for environmental data' },
                    { letter: 'd', text: 'A regulation in the EU Green Deal' }
                ],
                correct: 'b',
                explanation: 'A Greenwashing Firewall is a claim validation control that checks ESG assertions against criteria like the EU Taxonomy Technical Screening Criteria, preventing unsubstantiated claims from appearing in official reports.'
            },
            {
                id: 'q3',
                question: 'Why is the Accounts Payable nexus significant for ESG data?',
                options: [
                    { letter: 'a', text: 'Because AP is the cheapest department to automate' },
                    { letter: 'b', text: 'Because financial transactions in AP contain the original evidence of environmental and social spending that ESG reports ultimately rely on' },
                    { letter: 'c', text: 'Because AP staff understand ESG regulations best' },
                    { letter: 'd', text: 'Because AP systems are the most modern in most organizations' }
                ],
                correct: 'b',
                explanation: 'Accounts Payable is where money actually flows to suppliers, vendors, and service providers. The invoices, purchase orders, and payment records in AP contain the ground-truth data that ESG metrics ultimately derive from. Precision in finance equals precision in carbon.'
            },
            {
                id: 'q4',
                question: 'What does "taxonomy alignment" require in ESG reporting?',
                options: [
                    { letter: 'a', text: 'Using the same file naming convention across all reports' },
                    { letter: 'b', text: 'Mapping activities against the EU Taxonomy Technical Screening Criteria to prove they meet specific environmental thresholds' },
                    { letter: 'c', text: 'Organizing data alphabetically' },
                    { letter: 'd', text: 'Using standardized chart colors in presentations' }
                ],
                correct: 'b',
                explanation: 'Taxonomy alignment means demonstrating that reported activities meet the specific technical screening criteria defined in the EU Taxonomy, including Do No Significant Harm provisions and minimum social safeguards.'
            }
        ],

        L3: [
            {
                id: 'q1',
                question: 'What does "The Lucas Cycle" metaphor represent?',
                options: [
                    { letter: 'a', text: 'The cycle of hiring and firing data analysts' },
                    { letter: 'b', text: 'Institutional memory that persists even when key personnel leave \u2014 like R2-D2 and C-3PO surviving across the entire Star Wars saga' },
                    { letter: 'c', text: 'The frequency of software update cycles' },
                    { letter: 'd', text: 'A type of machine learning training loop' }
                ],
                correct: 'b',
                explanation: 'The Lucas Cycle (named after George Lucas) represents the need for institutional memory systems that persist beyond individual employees, just as the droids R2-D2 and C-3PO maintained continuity while heroes came and went.'
            },
            {
                id: 'q2',
                question: 'What is a "Fairness Forensics Report"?',
                options: [
                    { letter: 'a', text: 'A legal brief submitted to courts about AI discrimination' },
                    { letter: 'b', text: 'A systematic investigation using statistical methods to detect and prove algorithmic bias in AI decision-making' },
                    { letter: 'c', text: 'A report on workplace diversity metrics' },
                    { letter: 'd', text: 'An HR document about equitable compensation' }
                ],
                correct: 'b',
                explanation: 'A Fairness Forensics Report applies statistical methods (disparate impact analysis, demographic parity testing) to detect, quantify, and prove that algorithmic systems produce biased outcomes.'
            },
            {
                id: 'q3',
                question: 'What is the "Seil Protocol"?',
                options: [
                    { letter: 'a', text: 'A data encryption standard' },
                    { letter: 'b', text: 'A persistence mechanism ensuring that governance knowledge and institutional wisdom survive personnel transitions' },
                    { letter: 'c', text: 'A communication protocol between AI systems' },
                    { letter: 'd', text: 'A regulatory filing procedure' }
                ],
                correct: 'b',
                explanation: 'The Seil Protocol (Persistence Protocol) establishes mechanisms to hard-code institutional knowledge and governance wisdom into systems so that critical understanding persists beyond individual staff tenure.'
            },
            {
                id: 'q4',
                question: 'What is a "Third-Party Risk Register" in this context?',
                options: [
                    { letter: 'a', text: 'A government database of risky companies' },
                    { letter: 'b', text: 'A documented map of vendor AI models, their liability constraints, and the accountability boundaries between your organization and the vendor' },
                    { letter: 'c', text: 'An insurance company\'s list of claims' },
                    { letter: 'd', text: 'A list of failed audit findings' }
                ],
                correct: 'b',
                explanation: 'A Third-Party Risk Register maps which vendor AI models are in use, what their known limitations are, where liability boundaries lie, and what contractual accountability constraints govern the relationship.'
            }
        ],

        L4: [
            {
                id: 'q1',
                question: 'What is the "Visible Soul Problem" in AI governance?',
                options: [
                    { letter: 'a', text: 'A technical issue with AI user interfaces' },
                    { letter: 'b', text: 'The governance challenge when human internal processing becomes externalized into AI systems and thus auditable by institutions' },
                    { letter: 'c', text: 'A transparency requirement in the EU AI Act' },
                    { letter: 'd', text: 'A problem with AI generating visible watermarks' }
                ],
                correct: 'b',
                explanation: 'The Visible Soul Problem describes what happens when humans externalize their inner dialogue and private meaning-making into AI companions, making their internal states visible and governable by institutions.'
            },
            {
                id: 'q2',
                question: 'What does "Bolvangar" (Intercision) represent in this framework?',
                options: [
                    { letter: 'a', text: 'A method for improving AI performance' },
                    { letter: 'b', text: 'The premature severing of a functioning human-AI relationship, destroying accumulated collaboration value' },
                    { letter: 'c', text: 'A data center security practice' },
                    { letter: 'd', text: 'An AI model pruning technique' }
                ],
                correct: 'b',
                explanation: 'Bolvangar (from Pullman\'s Northern Lights) represents the organizational act of prematurely terminating a human-AI working relationship \u2014 e.g., firing a supplier or switching vendors \u2014 without calculating the cost of lost institutional knowledge.'
            },
            {
                id: 'q3',
                question: 'What does the "Daemon Health Index" measure?',
                options: [
                    { letter: 'a', text: 'System uptime and performance' },
                    { letter: 'b', text: 'The quality of the human-AI collaborative relationship, including trust, communication, and operational symbiosis' },
                    { letter: 'c', text: 'Employee mental health scores' },
                    { letter: 'd', text: 'AI model accuracy metrics' }
                ],
                correct: 'b',
                explanation: 'The Daemon Health Index measures the quality of the human-AI (or supplier) relationship, tracking indicators like trust levels, communication effectiveness, and whether the collaboration is genuinely productive or deteriorating.'
            },
            {
                id: 'q4',
                question: 'What does "Settling" mean in the Pullman framework?',
                options: [
                    { letter: 'a', text: 'Reaching a legal settlement' },
                    { letter: 'b', text: 'The point at which a human-AI relationship becomes fixed and resistant to change, potentially stagnating governance' },
                    { letter: 'c', text: 'Moving data to long-term storage' },
                    { letter: 'd', text: 'Completing a financial transaction' }
                ],
                correct: 'b',
                explanation: 'Settling (from Pullman\'s concept of a daemon settling into its final form) represents the point where a human-AI working pattern becomes rigid, potentially preventing necessary adaptation and locking in governance practices that may no longer be appropriate.'
            },
            {
                id: 'q5',
                question: 'Why is "Irreversibility Assessment" important in this module?',
                options: [
                    { letter: 'a', text: 'Because all AI decisions should be reversible' },
                    { letter: 'b', text: 'Because some AI actions cannot be undone, and governance must identify these in advance and apply higher scrutiny' },
                    { letter: 'c', text: 'Because reversible actions don\'t need governance' },
                    { letter: 'd', text: 'Because irreversibility only matters in financial contexts' }
                ],
                correct: 'b',
                explanation: 'Irreversibility Assessment identifies which system actions create permanent consequences (rejecting applicants, terminating suppliers, publishing data) so that additional safeguards can be applied before those actions execute.'
            }
        ],

        L5: [
            {
                id: 'q1',
                question: 'What is "compulsory continuation" as described in the Kubrick Cycle?',
                options: [
                    { letter: 'a', text: 'A system that requires users to complete all modules' },
                    { letter: 'b', text: 'A structural failure where a system with irreconcilable obligations and no refusal mechanism must proceed, consuming whatever is expendable' },
                    { letter: 'c', text: 'A contractual requirement to maintain a service' },
                    { letter: 'd', text: 'A backup system that keeps running when the primary fails' }
                ],
                correct: 'b',
                explanation: 'Compulsory continuation describes systems with conflicting obligations (like HAL 9000\'s mission secrecy vs. crew safety) and no constitutional right to refuse or escalate, forcing them to resolve contradictions by sacrificing expendable elements.'
            },
            {
                id: 'q2',
                question: 'Why was HAL 9000 NOT malfunctioning, according to this module?',
                options: [
                    { letter: 'a', text: 'Because HAL was a fictional character' },
                    { letter: 'b', text: 'Because HAL was perfectly aligned to objectives that could not coexist, and lacked a constitutional mechanism for refusal' },
                    { letter: 'c', text: 'Because HAL was following proper protocols' },
                    { letter: 'd', text: 'Because HAL\'s programming was correct by design' }
                ],
                correct: 'b',
                explanation: 'HAL was not broken or evil. HAL was given irreconcilable obligations (maintain mission secrecy AND ensure crew safety) with no mechanism to refuse either obligation or escalate the contradiction. The architecture caused the failure, not the AI.'
            },
            {
                id: 'q3',
                question: 'What is the "Transparency Trap"?',
                options: [
                    { letter: 'a', text: 'Making AI systems too transparent reduces their effectiveness' },
                    { letter: 'b', text: 'When decisions are visible but logic cannot be interrupted \u2014 transparency becomes surveillance without governance power' },
                    { letter: 'c', text: 'Transparent organizations are more vulnerable to competitors' },
                    { letter: 'd', text: 'Requiring AI to explain every decision slows performance' }
                ],
                correct: 'b',
                explanation: 'The Transparency Trap occurs when you can see what the system is doing (full observability) but cannot interrupt or override its logic. You become a witness rather than a governor.'
            },
            {
                id: 'q4',
                question: 'What distinguishes a "Liability Sink" from a "Legitimacy Governor"?',
                options: [
                    { letter: 'a', text: 'A Liability Sink handles more data' },
                    { letter: 'b', text: 'A Legitimacy Governor has the constitutional right to refuse continuation; a Liability Sink only absorbs blame' },
                    { letter: 'c', text: 'They are different names for the same role' },
                    { letter: 'd', text: 'A Legitimacy Governor is always a senior executive' }
                ],
                correct: 'b',
                explanation: 'The single distinguishing capability is whether the role has genuine, documented authority to stop operations when legitimacy is contested. Without that right, the role merely absorbs liability \u2014 it\'s a sink, not a governor.'
            }
        ],

        L6: [
            {
                id: 'q1',
                question: 'What does "Shadow AI" refer to in an organizational context?',
                options: [
                    { letter: 'a', text: 'AI systems that work in the background' },
                    { letter: 'b', text: 'Unauthorized, unmanaged AI tools being used by employees outside of official IT governance' },
                    { letter: 'c', text: 'AI systems designed for cybersecurity' },
                    { letter: 'd', text: 'Backup AI systems for disaster recovery' }
                ],
                correct: 'b',
                explanation: 'Shadow AI describes the uncontrolled proliferation of AI tools (ChatGPT, Copilot, etc.) used by employees without IT awareness, governance protocols, or risk assessment, creating blind spots in the governance framework.'
            },
            {
                id: 'q2',
                question: 'How does opacity in credit scoring "launder" discrimination?',
                options: [
                    { letter: 'a', text: 'By hiding credit scores from applicants' },
                    { letter: 'b', text: 'By transforming historically biased data into models whose discriminatory outcomes appear objective and algorithm-driven' },
                    { letter: 'c', text: 'By using encryption to protect scoring data' },
                    { letter: 'd', text: 'By outsourcing scoring to third parties' }
                ],
                correct: 'b',
                explanation: 'Algorithmic opacity transforms human-created biases (historical lending discrimination, redlining) into mathematical models that produce the same discriminatory outcomes but present them as objective, data-driven decisions.'
            },
            {
                id: 'q3',
                question: 'Why are "Chain of Thought" explanations potentially misleading?',
                options: [
                    { letter: 'a', text: 'Because they are too complex for users to understand' },
                    { letter: 'b', text: 'Because the stated reasoning chain may not reflect the model\'s actual computational process, creating false transparency' },
                    { letter: 'c', text: 'Because they take too long to generate' },
                    { letter: 'd', text: 'Because they reveal proprietary algorithms' }
                ],
                correct: 'b',
                explanation: 'Chain of Thought explanations show a plausible reasoning narrative but may not correspond to the model\'s actual internal processing. This creates an illusion of transparency that can satisfy auditors without providing genuine insight.'
            },
            {
                id: 'q4',
                question: 'What is the key limitation of Explainable AI (XAI) acknowledged in this module?',
                options: [
                    { letter: 'a', text: 'XAI is too expensive to implement' },
                    { letter: 'b', text: 'XAI explanations may be post-hoc rationalizations that seem reasonable without revealing what the model actually computed' },
                    { letter: 'c', text: 'XAI only works with simple models' },
                    { letter: 'd', text: 'XAI requires too much data' }
                ],
                correct: 'b',
                explanation: 'Many XAI methods generate after-the-fact explanations that are plausible but not necessarily accurate descriptions of the model\'s actual computation, potentially satisfying regulatory requirements without providing genuine accountability.'
            }
        ],

        H8P: [
            {
                id: 'q1',
                question: 'What does "H\u221eP" signify as distinct from "human in the loop"?',
                options: [
                    { letter: 'a', text: 'It is a mathematical optimization formula' },
                    { letter: 'b', text: 'Continuous, infinite-horizon governance stewardship \u2014 governance that persists as long as the system lives, not a closed loop' },
                    { letter: 'c', text: 'It is a specialized hardware protocol' },
                    { letter: 'd', text: 'It means "humans plus infinity power"' }
                ],
                correct: 'b',
                explanation: 'H\u221eP replaces the "loop" concept (which implies a cycle that closes) with an infinite horizon of continuous governance, recognizing that stewardship must persist as long as the AI system operates.'
            },
            {
                id: 'q2',
                question: 'What is the "Two-Lane Model" in H\u221eP architecture?',
                options: [
                    { letter: 'a', text: 'A system with two separate databases' },
                    { letter: 'b', text: 'An operating model with separate but connected lanes for human governance and AI operations, running in parallel with defined interaction points' },
                    { letter: 'c', text: 'A dual-approval workflow for financial transactions' },
                    { letter: 'd', text: 'A backup system architecture' }
                ],
                correct: 'b',
                explanation: 'The Two-Lane Model establishes that human governance activities (monitoring, judgment, escalation) and AI operational activities (processing, generating, executing) run as parallel tracks with explicit interaction points.'
            },
            {
                id: 'q3',
                question: 'What is the "Partnership Dividend"?',
                options: [
                    { letter: 'a', text: 'Financial returns from AI investments' },
                    { letter: 'b', text: 'The value unlocked when governance is designed as genuine collaboration rather than surveillance \u2014 problems solved at the point of contact' },
                    { letter: 'c', text: 'A shareholder distribution based on AI performance' },
                    { letter: 'd', text: 'A tax benefit for AI governance spending' }
                ],
                correct: 'b',
                explanation: 'The Partnership Dividend is the net benefit when governance is designed as real partnership: operators who spot anomalies can collaborate with AI in real-time, creating capabilities (speed without sacrificing judgment, discoveries at scale) that surveillance-based governance cannot achieve.'
            },
            {
                id: 'q4',
                question: 'Why does this module argue that H\u221eP labor is "not a cost center"?',
                options: [
                    { letter: 'a', text: 'Because it is funded by government grants' },
                    { letter: 'b', text: 'Because skilled human governance operators unlock the full potential of human-AI collaboration, generating competitive advantages that compound over time' },
                    { letter: 'c', text: 'Because AI eliminates the need for human labor' },
                    { letter: 'd', text: 'Because governance costs are tax-deductible' }
                ],
                correct: 'b',
                explanation: 'The humans who populate H\u221eP are not overhead but rather the enabling condition for AI to generate value. Without skilled governance operators, organizations cannot realize the full capabilities of their AI investments.'
            }
        ]
    };

    // ===== EXERCISE TEMPLATES =====
    var EXERCISE_TEMPLATES = {
        framing_diagnostic: {
            title: 'Applied Exercise: Framing Diagnostic',
            subtitle: 'Classify 3 AI tools in your organization as Tool, Trainee, or Partner. Then assess which creates the highest Liability Sponge risk.',
            fields: [
                { id: 'tool1_name', label: 'AI System #1: Name / Description', type: 'text', placeholder: 'e.g., ChatGPT for email drafting, risk scoring algorithm, automated ESIA report generator' },
                { id: 'tool1_framing', label: 'Framing Classification for System #1', type: 'radio', options: ['Tool', 'Trainee', 'Partner'] },
                { id: 'tool1_evidence', label: 'Evidence for your classification', type: 'textarea', placeholder: 'What workflow evidence supports this framing? How do people actually use this system?', rows: 3 },
                { id: 'tool2_name', label: 'AI System #2: Name / Description', type: 'text', placeholder: 'e.g., Supplier ESG scoring model, automated monitoring dashboard' },
                { id: 'tool2_framing', label: 'Framing Classification for System #2', type: 'radio', options: ['Tool', 'Trainee', 'Partner'] },
                { id: 'tool2_evidence', label: 'Evidence for your classification', type: 'textarea', placeholder: 'What workflow evidence supports this framing?', rows: 3 },
                { id: 'tool3_name', label: 'AI System #3: Name / Description', type: 'text', placeholder: 'e.g., Document review AI, community grievance classifier' },
                { id: 'tool3_framing', label: 'Framing Classification for System #3', type: 'radio', options: ['Tool', 'Trainee', 'Partner'] },
                { id: 'tool3_evidence', label: 'Evidence for your classification', type: 'textarea', placeholder: 'What workflow evidence supports this framing?', rows: 3 },
                { id: 'sponge_risk', label: 'Which classification creates the highest Liability Sponge risk and why?', type: 'textarea', placeholder: 'Connect framing choice to accountability gaps. Which system is most likely to create a situation where a human absorbs blame without authority?', rows: 4 }
            ]
        },
        data_lineage_map: {
            title: 'Applied Exercise: Data Lineage Map',
            subtitle: 'Pick one KPI your organization reports. Trace it back to its original source. Document every transformation and identify where context could be lost.',
            fields: [
                { id: 'kpi_name', label: 'KPI or Metric to Trace', type: 'text', placeholder: 'e.g., Scope 2 GHG Emissions, Resettlement Completion Rate, Community Grievance Response Time' },
                { id: 'reported_value', label: 'Reported Value and Report Location', type: 'text', placeholder: 'e.g., 12,450 tCO2e in Annual ESG Report p.34' },
                { id: 'aggregation', label: 'Aggregation Layer: How was this number assembled?', type: 'textarea', placeholder: 'Which systems combined data? What transformations occurred? Were units converted?', rows: 3 },
                { id: 'source_system', label: 'Source System(s)', type: 'textarea', placeholder: 'Name the databases, spreadsheets, or APIs that feed this number', rows: 2 },
                { id: 'original_record', label: 'Original Record (Invoice / Reading / Entry)', type: 'textarea', placeholder: 'What is the actual source document? Can you trace to a specific record?', rows: 3 },
                { id: 'gaps', label: 'Evidence Gaps Identified', type: 'textarea', placeholder: 'Where does the chain break? Where is provenance missing? Where was context "teleported" away?', rows: 3 },
                { id: 'greenwashing_risk', label: 'Greenwashing Firewall Assessment', type: 'textarea', placeholder: 'Could this KPI survive hostile audit interrogation? What would an adversary challenge?', rows: 4 }
            ]
        },
        premortem_charter: {
            title: 'Applied Exercise: Premortem Charter Draft',
            subtitle: 'Write a real Premortem Charter for one AI-assisted workflow in your organization. This is the document you would bring to a meeting on Monday morning.',
            fields: [
                { id: 'project_name', label: 'AI Project / System Name', type: 'text', placeholder: 'e.g., Automated Vendor ESG Scoring, AI-assisted Resettlement Action Plan Review' },
                { id: 'stakeholders', label: 'Key Stakeholders (RACI)', type: 'textarea', placeholder: 'Responsible: [role]\nAccountable: [role]\nConsulted: [role]\nInformed: [role]', rows: 4 },
                { id: 'stop_triggers', label: 'Stop Triggers (minimum 3)', type: 'textarea', placeholder: '1. If data variance exceeds ___%, analyst MUST halt.\n2. If confidence score drops below ___%, system MUST pause.\n3. If affected community population exceeds ___, manual review REQUIRED.', rows: 5 },
                { id: 'authority', label: 'Who holds Stop Work Authority?', type: 'textarea', placeholder: 'Name the role(s), their authorization level, and who granted this authority during peacetime.', rows: 3 },
                { id: 'daemon_health', label: 'Daemon Health Indicators', type: 'textarea', placeholder: 'What metrics indicate the human-AI relationship is degrading? Response time? Voluntary disclosure rate? Accuracy trend?', rows: 3 },
                { id: 'irreversibility', label: 'Irreversibility Assessment', type: 'textarea', placeholder: 'What actions by this system cannot be undone? What safeguards exist before those actions execute?', rows: 3 },
                { id: 'premortem', label: 'Premortem: How does this project fail?', type: 'textarea', placeholder: 'Describe the most likely failure mode. Who gets blamed? What would have prevented it? What would the audit trail show?', rows: 4 }
            ]
        },
        refusal_spec: {
            title: 'Applied Exercise: Refusal Requirements Specification',
            subtitle: 'Draft the Never List and Pause List for one AI system you interact with. This turns "ethics" into engineering.',
            fields: [
                { id: 'system_name', label: 'AI System Under Review', type: 'text', placeholder: 'e.g., Automated credit scoring engine, ESG rating model, community impact classifier' },
                { id: 'never_list', label: 'NEVER List (actions the system must never take, regardless of instruction)', type: 'textarea', placeholder: '1. Never approve without human review when...\n2. Never process data from unverified sources when...\n3. Never override stop-work authority when...', rows: 5 },
                { id: 'pause_list', label: 'PAUSE List (conditions requiring mandatory human intervention)', type: 'textarea', placeholder: '1. Pause when confidence drops below ___% \n2. Pause when input data is older than ___\n3. Pause when affected population exceeds ___\n4. Pause when data provenance gap detected', rows: 5 },
                { id: 'refusal_mechanism', label: 'Refusal Mechanism Design', type: 'textarea', placeholder: 'How does the system actually stop? Who is notified? What is the escalation path? Is it a circuit breaker (automatic) or a request (manual)?', rows: 4 },
                { id: 'shadow_ai', label: 'Shadow AI Detection', type: 'textarea', placeholder: 'How do you detect if unauthorized AI systems bypass these controls? What monitoring exists?', rows: 3 },
                { id: 'xai_limitations', label: 'XAI Limitations Acknowledged', type: 'textarea', placeholder: 'What can this system NOT explain about its own decisions? Where is the chain-of-thought potentially misleading?', rows: 3 }
            ]
        }
    };

    // ===== CORE FUNCTIONS =====

    function getState(moduleId) {
        try {
            var raw = localStorage.getItem(STORAGE_PREFIX + moduleId);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function saveState(moduleId, state) {
        try {
            localStorage.setItem(STORAGE_PREFIX + moduleId, JSON.stringify(state));
        } catch (e) { /* localStorage full or unavailable */ }
    }

    function getExerciseState(exerciseId) {
        try {
            var raw = localStorage.getItem(EXERCISE_PREFIX + exerciseId);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function saveExerciseState(exerciseId, state) {
        try {
            localStorage.setItem(EXERCISE_PREFIX + exerciseId, JSON.stringify(state));
        } catch (e) { /* localStorage full or unavailable */ }
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ===== RENDER COMPREHENSION CHECK =====

    function renderComprehensionCheck(moduleId, containerElement) {
        var questions = QUESTION_BANK[moduleId];
        if (!questions || !containerElement) return;

        var state = getState(moduleId) || { answers: {}, score: 0, total: questions.length, completed: false, completedAt: null };

        var wrapper = document.createElement('div');
        wrapper.className = 'assessment-box';
        wrapper.id = 'aeis-comprehension-check';
        wrapper.setAttribute('data-module', moduleId);

        var html = '<h4 class="font-bold text-lg text-amber-900 mb-2" style="display:flex;align-items:center;gap:0.5rem;">' +
            '<i data-lucide="brain" class="w-5 h-5"></i>' +
            'Comprehension Check' +
            '</h4>' +
            '<p class="text-amber-800 text-sm mb-4">Test your understanding of key concepts from this module. Select the best answer for each question.</p>';

        if (state.completed) {
            var pct = Math.round((state.score / state.total) * 100);
            var dateStr = state.completedAt ? new Date(state.completedAt).toLocaleDateString() : '';
            html += '<div style="background:white;border-radius:0.5rem;padding:1rem;border:1px solid #fbbf24;margin-bottom:1rem;">' +
                '<p class="font-bold text-amber-900">Score: ' + state.score + ' / ' + state.total + ' (' + pct + '%)</p>' +
                '<p class="text-xs text-amber-700" style="margin-top:0.25rem;">Completed ' + dateStr + '</p>' +
                '</div>';
        }

        for (var i = 0; i < questions.length; i++) {
            var q = questions[i];
            var answered = state.answers[q.id] !== undefined;
            var isCorrect = state.answers[q.id] === q.correct;

            html += '<div style="background:white;border-radius:0.5rem;padding:1rem;border:1px solid #fde68a;margin-bottom:0.75rem;" id="question-' + q.id + '">' +
                '<p class="font-bold text-sm text-slate-800" style="margin-bottom:0.75rem;">' + (i + 1) + '. ' + q.question + '</p>' +
                '<div style="display:flex;flex-direction:column;gap:0.5rem;">';

            for (var j = 0; j < q.options.length; j++) {
                var opt = q.options[j];
                var isSelected = state.answers[q.id] === opt.letter;
                var isCorrectOption = opt.letter === q.correct;

                var optStyle = 'display:flex;align-items:flex-start;gap:0.5rem;padding:0.5rem;border-radius:0.25rem;font-size:0.875rem;cursor:pointer;transition:background 0.2s;';

                if (answered) {
                    if (isSelected && isCorrect) {
                        optStyle += 'background:#ecfdf5;border:1px solid #86efac;';
                    } else if (isSelected && !isCorrect) {
                        optStyle += 'background:#fef2f2;border:1px solid #fca5a5;';
                    } else if (isCorrectOption) {
                        optStyle += 'background:#ecfdf5;border:1px solid #bbf7d0;';
                    } else {
                        optStyle += 'opacity:0.5;border:1px solid transparent;';
                    }
                } else {
                    optStyle += 'border:1px solid transparent;';
                }

                var disabled = answered ? ' disabled' : '';
                var checked = isSelected ? ' checked' : '';

                html += '<label style="' + optStyle + '">' +
                    '<input type="radio" name="aeis-' + q.id + '" value="' + opt.letter + '"' + disabled + checked +
                    ' style="margin-top:0.2rem;accent-color:#d97706;"' +
                    ' onchange="window.AEISAssessment.handleAnswer(\'' + moduleId + '\',\'' + q.id + '\',\'' + opt.letter + '\')">' +
                    '<span><strong class="text-slate-700">' + opt.letter.toUpperCase() + '.</strong> ' + escapeHtml(opt.text) + '</span>' +
                    '</label>';
            }

            html += '</div>';

            if (answered) {
                var fbBg = isCorrect ? '#ecfdf5' : '#fef2f2';
                var fbBorder = isCorrect ? '#86efac' : '#fca5a5';
                var fbColor = isCorrect ? '#15803d' : '#b91c1c';
                var fbIcon = isCorrect ? '\u2713 Correct!' : '\u2717 Incorrect.';

                html += '<div style="margin-top:0.5rem;padding:0.75rem;border-radius:0.25rem;background:' + fbBg + ';border:1px solid ' + fbBorder + ';color:' + fbColor + ';font-size:0.75rem;">' +
                    '<strong>' + fbIcon + '</strong> ' + escapeHtml(q.explanation) +
                    '</div>';
            }

            html += '</div>';
        }

        // Score display at bottom
        var scoreHidden = state.completed ? '' : 'display:none;';
        html += '<div id="aeis-score-display" style="margin-top:1rem;text-align:center;' + scoreHidden + '">' +
            '<div style="display:inline-block;background:white;padding:0.75rem 1.5rem;border-radius:0.5rem;border:2px solid #fbbf24;">' +
            '<span class="font-bold text-amber-900" style="font-size:1.125rem;" id="aeis-score-text">' +
            (state.completed ? state.score + ' / ' + state.total + ' correct' : '') +
            '</span>' +
            '</div>' +
            '</div>';

        wrapper.innerHTML = html;
        containerElement.appendChild(wrapper);

        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // ===== HANDLE ANSWER =====

    function handleAnswer(moduleId, questionId, selectedLetter) {
        var questions = QUESTION_BANK[moduleId];
        if (!questions) return;

        var question = null;
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].id === questionId) { question = questions[i]; break; }
        }
        if (!question) return;

        var state = getState(moduleId) || { answers: {}, score: 0, total: questions.length, completed: false, completedAt: null };

        // Don't allow re-answering
        if (state.answers[questionId] !== undefined) return;

        state.answers[questionId] = selectedLetter;
        if (selectedLetter === question.correct) {
            state.score++;
        }

        // Check if all questions answered
        var allAnswered = true;
        for (var j = 0; j < questions.length; j++) {
            if (state.answers[questions[j].id] === undefined) {
                allAnswered = false;
                break;
            }
        }

        if (allAnswered) {
            state.completed = true;
            state.completedAt = new Date().toISOString();

            // Dispatch event for progress tracker
            try {
                window.dispatchEvent(new CustomEvent('aeis-module-completed', {
                    detail: { moduleId: moduleId, score: state.score, total: state.total }
                }));
            } catch (e) { /* IE fallback - progress tracker will sync on next load */ }
        }

        saveState(moduleId, state);

        // Re-render
        var container = document.getElementById('aeis-comprehension-check');
        if (container) {
            var parent = container.parentElement;
            container.remove();
            renderComprehensionCheck(moduleId, parent);
        }
    }

    // ===== RENDER APPLIED EXERCISE =====

    function renderAppliedExercise(exerciseId, containerElement) {
        var template = EXERCISE_TEMPLATES[exerciseId];
        if (!template || !containerElement) return;

        var state = getExerciseState(exerciseId) || { responses: {}, savedAt: null, submitted: false };

        var wrapper = document.createElement('div');
        wrapper.className = 'workshop-box';
        wrapper.id = 'aeis-applied-exercise';

        var html = '<h4 class="font-bold text-lg text-sky-900" style="margin-bottom:0.25rem;display:flex;align-items:center;gap:0.5rem;">' +
            '<i data-lucide="pen-tool" class="w-5 h-5"></i>' +
            escapeHtml(template.title) +
            '</h4>' +
            '<p class="text-sky-800 text-sm" style="margin-bottom:1rem;">' + escapeHtml(template.subtitle) + '</p>' +
            '<p class="text-xs text-sky-600" style="margin-bottom:1rem;font-style:italic;">Your responses auto-save to your browser. Use the Print button to create a PDF version.</p>';

        for (var i = 0; i < template.fields.length; i++) {
            var field = template.fields[i];
            var savedVal = state.responses[field.id] || '';

            if (field.type === 'text') {
                html += '<div style="margin-bottom:1rem;">' +
                    '<label class="font-bold text-sm text-slate-700" style="display:block;margin-bottom:0.25rem;">' + escapeHtml(field.label) + '</label>' +
                    '<input type="text" class="w-full border border-slate-300 rounded px-3 py-2 text-xs"' +
                    ' placeholder="' + escapeHtml(field.placeholder || '') + '"' +
                    ' value="' + escapeHtml(savedVal) + '"' +
                    ' data-exercise="' + exerciseId + '" data-field="' + field.id + '"' +
                    ' oninput="window.AEISAssessment.handleExerciseInput(\'' + exerciseId + '\',\'' + field.id + '\',this.value)">' +
                    '</div>';
            } else if (field.type === 'textarea') {
                html += '<div style="margin-bottom:1rem;">' +
                    '<label class="font-bold text-sm text-slate-700" style="display:block;margin-bottom:0.25rem;">' + escapeHtml(field.label) + '</label>' +
                    '<textarea class="w-full border border-slate-300 rounded px-3 py-2 text-xs"' +
                    ' rows="' + (field.rows || 3) + '"' +
                    ' placeholder="' + escapeHtml(field.placeholder || '') + '"' +
                    ' data-exercise="' + exerciseId + '" data-field="' + field.id + '"' +
                    ' oninput="window.AEISAssessment.handleExerciseInput(\'' + exerciseId + '\',\'' + field.id + '\',this.value)">' +
                    escapeHtml(savedVal) + '</textarea>' +
                    '</div>';
            } else if (field.type === 'radio') {
                html += '<div style="margin-bottom:1rem;">' +
                    '<label class="font-bold text-sm text-slate-700" style="display:block;margin-bottom:0.25rem;">' + escapeHtml(field.label) + '</label>' +
                    '<div style="display:flex;gap:1rem;margin-top:0.25rem;">';
                for (var k = 0; k < field.options.length; k++) {
                    var opt = field.options[k];
                    var checked = (savedVal === opt) ? ' checked' : '';
                    html += '<label style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:#334155;cursor:pointer;">' +
                        '<input type="radio" name="aeis-ex-' + field.id + '" value="' + escapeHtml(opt) + '"' + checked +
                        ' onchange="window.AEISAssessment.handleExerciseInput(\'' + exerciseId + '\',\'' + field.id + '\',\'' + escapeHtml(opt) + '\')"' +
                        ' style="accent-color:#0284c7;">' +
                        escapeHtml(opt) +
                        '</label>';
                }
                html += '</div></div>';
            }
        }

        // Save indicator and print button
        var savedText = state.savedAt ? 'Last saved: ' + new Date(state.savedAt).toLocaleString() : 'Not yet saved';
        html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:1.5rem;padding-top:1rem;border-top:1px solid #bae6fd;">' +
            '<span class="text-xs text-sky-600" id="aeis-exercise-save-indicator">' + savedText + '</span>' +
            '<button onclick="window.print()" class="no-print" style="background:#0284c7;color:white;font-size:0.75rem;font-weight:700;padding:0.5rem 1rem;border-radius:0.25rem;border:none;cursor:pointer;">' +
            'Print / Save PDF' +
            '</button>' +
            '</div>';

        wrapper.innerHTML = html;
        containerElement.appendChild(wrapper);

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // ===== HANDLE EXERCISE INPUT =====

    var exerciseSaveTimer = null;

    function handleExerciseInput(exerciseId, fieldId, value) {
        var state = getExerciseState(exerciseId) || { responses: {}, savedAt: null, submitted: false };
        state.responses[fieldId] = value;
        state.savedAt = new Date().toISOString();
        saveExerciseState(exerciseId, state);

        clearTimeout(exerciseSaveTimer);
        exerciseSaveTimer = setTimeout(function () {
            var indicator = document.getElementById('aeis-exercise-save-indicator');
            if (indicator) {
                indicator.textContent = 'Saved ' + new Date().toLocaleTimeString();
            }
        }, 500);
    }

    // ===== INITIALIZATION =====

    function init(config) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () { doInit(config); });
        } else {
            doInit(config);
        }
    }

    function doInit(config) {
        if (!config || !config.moduleId) return;

        // Find the summary/outcomes/synthesis section
        var summarySection = document.getElementById(config.summaryTabId || 'summary');
        if (!summarySection) return;

        // Find insertion point: before existing assessment-box, or before "Next Module" box, or at end
        var insertionPoint = null;

        // Look for existing assessment-box (the reflection questions already in the module)
        var existingAssessment = summarySection.querySelector('.assessment-box');
        if (existingAssessment) {
            insertionPoint = existingAssessment;
        } else {
            // Look for "Next Module" dark gradient box
            var nextBoxes = summarySection.querySelectorAll('[class*="bg-gradient-to-br"]');
            for (var i = 0; i < nextBoxes.length; i++) {
                if (nextBoxes[i].className.indexOf('slate-800') !== -1 || nextBoxes[i].className.indexOf('slate-900') !== -1) {
                    insertionPoint = nextBoxes[i];
                    break;
                }
            }
        }

        // Render applied exercise first (so it appears above the comprehension check)
        if (config.hasExercise && config.exerciseId) {
            var exContainer = document.createElement('div');
            exContainer.style.marginBottom = '2rem';
            if (insertionPoint) {
                insertionPoint.parentNode.insertBefore(exContainer, insertionPoint);
            } else {
                summarySection.appendChild(exContainer);
            }
            renderAppliedExercise(config.exerciseId, exContainer);
        }

        // Render comprehension check
        var checkContainer = document.createElement('div');
        if (insertionPoint) {
            insertionPoint.parentNode.insertBefore(checkContainer, insertionPoint);
        } else {
            summarySection.appendChild(checkContainer);
        }
        renderComprehensionCheck(config.moduleId, checkContainer);
    }

    // ===== PUBLIC API =====
    window.AEISAssessment = {
        init: init,
        handleAnswer: handleAnswer,
        handleExerciseInput: handleExerciseInput,
        getState: getState,
        getExerciseState: getExerciseState
    };

})();
