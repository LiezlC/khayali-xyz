---
title: "AI's Real Scaling Problem Is Human"
date: "2026-01-31"
episode: 22
tags: ["human-in-the-loop", "scaling"]
---

# Episode 23: AI’s Real Scaling Problem Is Human (And That’s Actually Good News)

January 28, 2026
Why “Human in the Loop” Became a Liability Sponge, and What the H∞P Framework Offers Instead
Here’s a phrase that should make you suspicious precisely because it sounds so reassuring: human in the loop.

Say it enough times and AI systems start to feel safer. Which is convenient, because saying it is often the full extent of the safety intervention. The human is invoked. The checkbox is ticked. Everyone sleeps better at night.

Everyone except the human in question, who is now legally positioned between a system processing 1,000 decisions per hour and an audit trail that will eventually require someone to blame.

Welcome to the Liability Sponge.

The Math That Nobody Wants to Do
Maria is an ESG analyst. Her job description includes reviewing AI-flagged supplier violations. The system processes 847 suppliers per week. Maria has six hours allocated for this review.

Let’s do what most governance documents carefully avoid: the arithmetic.

Six hours equals 360 minutes. Divide by 847 suppliers. Maria has 25.5 seconds per supplier to review, verify, and make an auditable decision.

In practice, she opens each flagged case, sees a red score, scans a summary, and clicks “Approve” or “Escalate.” She has no time to verify source documents. She probably suspects this. She probably also suspects that mentioning it would be career-limiting.

The system misclassifies a compliant supplier due to an OCR error during document ingestion. Maria “reviewed” it. The audit trail shows her user ID, her timestamp, her approval.

When the supplier relationship implodes, the failure mode has a name attached. The name is not “OCR error.” The name is Maria.

This is not a bug. It’s architecture.

The Gremlins Have Names
When you ask AI systems to design realistic accountability failures (and yes, someone has run this experiment across 21 different models), they converge on remarkably consistent patterns.

These patterns are so prevalent in corporate documentation, audit reports, and regulatory filings that AI models trained on institutional text recognize them as normal.

The Liability Diode

Blame flows downward, credit flows upward. Junior staff absorb risk while executives claim credit for “oversight.” Current flows one way. So does accountability.

The Moral Crumple Zone

Borrowed from automotive engineering, where crumple zones absorb impact to protect the passenger compartment. In organizational design, middle managers and operational staff serve the same function: they absorb blame during failures, protecting senior leadership and the system architecture itself. Unlike cars, organizations don’t get totaled when the crumple zone collapses. They just replace the crumpled human.

The Velocity Mismatch

Industrial safety systems operate on a simple principle: intervention must outpace harm. Circuit breakers trip in milliseconds to save wires that melt in seconds.

AI governance inverts this logic. Systems process at silicon speed while humans review at biological speed. By the time audit detects an error, consequences have already compounded.

The human “oversight” exists to provide a signature, not a safeguard.

From Loop to H∞P
A loop implies a cycle that eventually closes or repeats. Governance cannot be a cycle. It must be a continuous aperture.

The H∞P framework (pronounced “hoop,” because mathematicians enjoy their little jokes) replaces the closed loop with an infinity symbol. The distinction is semantic on the surface and architectural underneath.

Loops close. The H∞P remains open: a continuous governance state that persists as long as the system operates.

The framework identifies two distinct lanes of human labor in AI systems. This distinction matters because most organizations fund only one while assuming it covers both.

Lane 1: The Training-Loop Economy

Humans shape the model before it matters. Labeling, annotation, validation. This is the economy organizations like humansintheloop.org have made visible.

It’s necessary work. It is also finished work. Once the model deploys, the training-loop humans have completed their function.

Lane 2: The Execution-H∞P

Humans govern the system while it matters. Intercepting edge cases, enforcing stop-work authority, ensuring audit-grade traceability.

This is the missing downstream lane. This is where the Liability Sponge currently sits, absorbing accountability without possessing authority.

The H∞P framework proposes something that shouldn’t be radical: staffing Lane 2 with the same seriousness organizations apply to Lane 1.

The Labor Stack
Scaling AI is a labor design challenge.

The H∞P labor stack defines specialized roles for continuous governance, each with specific mandates, stop conditions, and logging requirements.

Flow Control

Operators intercept ambiguity and route at machine speed. They don’t fix the model; they manage exceptions.

Ops Leads protect operator cognition and shift discipline. When panic thresholds trigger or quality collapses, they intervene on behalf of the human system.

Guardrails

Workflow Governors own threshold management and system boundaries. They define risk tiers. When scope breaches occur or thresholds drift, Governors make the call.

Independent Assurance proves reproducibility for audit-grade defense. Their stop conditions are elegant: non-reproducibility, missing evidence, control bypass. If you cannot reproduce it, you cannot defend it.

Behavioral Oversight

Robopsychologists (yes, the term comes from Asimov) detect automation bias and UI-induced errors. They address what happens when humans start trusting the system more than they trust themselves.

AInthropologists map the workaround culture and incentive distortions. Every operational system generates informal practices that deviate from documented procedures. Some are adaptive. Some are dangerous. All are invisible unless someone is specifically watching.

Stop Work Authority: The Test That Matters
Here’s how to audit your own architecture:

Can your human reviewers actually say no?

Walk through a transaction. Point to the specific, checkable moment where staff can reject the AI’s recommendation. Without permission. Without justification. Without career penalty.

If you cannot point to that moment, you have a Liability Sponge.

Stop Work Authority in the H∞P framework has four requirements:

Documented in the job description. Not implied. Not cultural. Written down.

No approval required to invoke. The authority is constitutional, meaning it exists independent of management preferences.

Protected from retaliation. Not “we have an anti-retaliation policy” protected. Structurally protected.

Invocations reviewed quarterly. Too few suggests the authority has become ceremonial. Too many suggests systemic dysfunction.

The alternative is a governance architecture that routes complaints, logs concerns, and continues processing. A system that flags risks and keeps scoring.

A liability sink masquerading as a legitimacy mechanism.

Pre-Action vs. Post-Action
Current state governance is almost universally post-action.

The system generates outputs. Humans review samples. Someone discovers the 40% false positive rate. By then, the damage is done: supplier relationships strained, decisions executed, consequences compounding.

The H∞P framework prioritizes pre-action constraint.

When the system detects data completeness below threshold, it refuses to generate a risk score. It returns: “Cannot assess. Insufficient data.” It flags the item for manual data gathering.

No false flags. No damaged relationships. No human required to absorb blame for a decision that should never have been made.

This is not a technical distinction. It’s an ethical position about where in the decision chain humans should exercise authority.

The Question
What would have to change in your operational systems for “I cannot proceed under these conditions” to be a legitimate system output? Consider your workflows. Your approval processes. Your escalation paths. Where does the system assume continuation even when humans are uncertain?

The H∞P framework proposes that governance is not a training phase. It is a permanent operating state.

Organizations that treat Lane 2 as an afterthought, that staff it with Liability Sponges, that assume “human in the loop” means “human available to blame,” will eventually discover the limits of that architecture.

The humans in those roles have likely already discovered them. They just cannot stop the system long enough to tell anyone.

Where are your Marias? And can they say no?

About this framework: The H∞P (Humans in the H∞P) governance model is part of ongoing work on AI accountability architecture. For the full labor stack specifications and implementation guidance, connect or follow for updates.

#AIGovernance #ESG #OperationalRisk #HumanOversight #RiskManagement