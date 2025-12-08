# When AI Meets the Social Code: Stress-Testing 15 Large Language Models on Life-and-Death Decisions

*What happens when you ask today's most advanced AI systems to navigate the complex ethical and technical terrain of involuntary resettlement? A 25-year social performance veteran runs the experiment.*

---

## The Invisible Blueprint

When a new dam gets approved, the public sees concrete and steel rising. What they don't see is the *social blueprint* that must be built first—the intricate framework determining how 120 families will be relocated, how farmers without paper titles will be compensated, and how a community's grievances will be heard when promises fall short.

This is the world of IFC Performance Standards: the international gold standard governing how major infrastructure projects must manage their social impacts. It's a domain where getting the details wrong doesn't just mean a failed project—it means destroyed livelihoods, cultural erasure, and communities left worse off than before.

I spent a quarter century working in this space, from Papua New Guinea's LNG project to Mozambique's massive energy developments. And when AI systems started being marketed as capable of handling "complex reasoning" and "nuanced professional judgment," I had a question:

*Could they actually do this work?*

So I ran an experiment.

## The Setup: 412 Pages of AI Output

I crafted five expert-level prompts—the kind of questions that would separate a junior consultant from a seasoned social performance specialist. Then I ran them through 15 of the most advanced large language models available: Claude Opus and Sonnet, GPT-5 variants, Gemini, Llama, Perplexity, Mistral, Grok, Qwen3-Max, GLM-4.6, Kimi K2, and others.

The prompts weren't softballs. They demanded:

1. **Displacement typology and RAP design** — Correctly classifying different types of displacement (physical vs. economic) and designing compliant resettlement measures
2. **Indigenous governance and grievance mechanisms** — Balancing collective FPIC (Free, Prior and Informed Consent) with protections for marginalized sub-groups like women and youth
3. **Integrated risk management** — Synthesizing three interconnected Performance Standards (PS1, PS5, PS7) into a coherent framework that accounts for project-induced in-migration
4. **Grievance triage systems** — Designing AI-assisted intake that's robust to noisy data and never lets a safety-critical issue slip through the cracks
5. **Completion audits** — Determining when resettlement obligations have been met, even when livelihood programs are still running

The result? 412 pages of AI output. Which I then fed through NotebookLM to synthesize and evaluate against gold-standard responses.

## The Verdict: Two Tiers of Excellence

Out of fifteen models tested, the results clustered into distinct performance categories—but with an unexpected twist. Some models excelled at *matching* expert practice; others proposed mechanisms that *exceeded* it in enforceability.

### Tier 1: Expert-Level Reasoning

**Claude Opus 4.5** was the standout for conceptual reasoning. Its responses read like they came from a subject-matter expert—framing the FPIC challenge as a "paradox" requiring ongoing negotiation, articulating a "Three-Standard Cascade" showing how PS1's management system contains PS5 and PS7 requirements. This wasn't pattern-matching; it was conceptual reasoning.

**Llama 4 Scout** surprised me with its technical precision, correctly citing specific PS5 paragraphs and designing sophisticated "Nested Grievance Pathways" that worked through traditional governance structures while protecting marginalized voices.

**Perplexity Sonar Reasoning Pro** stumbled on the first question (misclassifying informal farmers as physically displaced when they weren't), but its performance on complex integration tasks was top-tier—making distinctions like "FPIC process failures versus implementation gaps" that most practitioners struggle to articulate clearly.

**Gemini 3 Pro Preview** delivered consistently solid, well-structured responses that aligned closely with best practice, though without the conceptual flair of the top three.

### Tier 2: Structural Innovation Beyond Standard Practice

Here's where things got interesting. Two models—**Kimi K2** and **GLM-4.6**—proposed mechanisms that don't just match the IFC Performance Standards; they exceed them in enforceability and auditability.

**Kimi K2** introduced three structural innovations that made me sit up:

First, the *Vulnerable-Group Gap Ratio*—a mandatory completion audit metric requiring that income for female-headed, elderly, disabled, and land-poor households reach at least 80% of the project-wide median. Miss the target? The completion audit gets postponed for up to 12 months while corrective actions are implemented. This transforms the PS5 principle of "particular attention to vulnerable groups" from aspirational language into a contractual gate.

Second, *binding external recourse* for grievances. Under Kimi K2's proposed framework, any grievance unresolved after 60 days of internal review must be escalated to an independent third-party mediator—and crucially, the mediator's decision is binding on the company. This is structurally more robust than existing mechanisms like the IFC's Compliance Advisor Ombudsman, whose recommendations aren't binding.

Third, a *sustainability mandate* for ongoing programs: completion sign-off requires that essential community programs (micro-credit funds, cooperatives) have secured budgets for a minimum of three years post-audit, with operational transfer to community or local institutions 100% complete. No more "credible trajectory" assessments—concrete financial prerequisites.

**GLM-4.6** tackled the ongoing FPIC problem with equal sophistication, proposing *Supplemental Agreements to the RAP/LRP* when monitoring reveals that initial collective agreements are failing specific subgroups. These aren't technical addenda—they're formal updates requiring re-endorsement from affected subgroup leadership. This operationalizes the PS7 principle that consent must be revisited when material changes emerge, treating FPIC as a "living document" rather than a one-time checkbox.

**Qwen3-Max**, while demonstrating solid compliance-level performance, didn't show the structural innovation of its peers.

## The Unexpected Finding: AI Proposing Stricter Standards

This is worth pausing on. The conventional frame for AI evaluation is "can it match human expert judgment?" But Kimi K2 and GLM-4.6 weren't just matching the gold standard—they were proposing mechanisms that address known weaknesses in current practice.

The IFC Performance Standards are principles-based by design. This gives practitioners flexibility, but it also creates enforcement gaps. How do you audit "particular attention to vulnerable groups"? What exactly constitutes a "credible trajectory" toward sustainability? These aren't theoretical questions—they're the arguments that play out in completion audits and grievance processes.

What these models did was take principles-based language and operationalize it into auditable, enforceable mechanisms:

| Principle | Standard Practice | AI Innovation |
|-----------|------------------|---------------|
| Vulnerable group equity | "Particular attention" | Mandatory 80% income ratio gate |
| Grievance recourse | Advisory escalation | Binding third-party decisions |
| Program sustainability | "Credible trajectory" | 3-year secured budget + complete transfer |
| Ongoing consent | Revisit if changes emerge | Formal supplemental agreements with subgroup re-endorsement |

Whether these specific mechanisms are *correct* is debatable—practitioners might argue the 80% threshold is too rigid, or that binding arbitration creates perverse incentives. But the structural thinking is sound, and it points to a capability that goes beyond retrieval and reasoning into something closer to institutional design.

## A Note on Synthesis Failures

I should acknowledge that the initial synthesis of this analysis—done through NotebookLM—inadvertently dropped three models (Qwen3-Max, GLM-4.6, and Kimi K2) from the comparative evaluation, reporting their data as "unavailable" when it wasn't.

This isn't the first time. In previous arena-style analyses I've run—including one on post-AGI economic scenarios—the same pattern emerged: Chinese-developed models (Kimi, GLM, and sometimes Qwen) dropped from synthesis, their data reported as missing when it was present in the source materials. Previous instances were correctable with a simple note; this time required approximately five hours of iterative prompting, ultimately using NotebookLM's chat function to help craft language that its Studio function would accept. One hemisphere of the model, as it were, coaching the other to see what was directly in front of it.

To be clear: the source material was entirely in English. The outputs from Kimi K2, GLM-4.6, and Qwen3-Max were in fluent, well-structured English—no different in form or readability from Claude's "FPIC paradox" or Llama's "Nested Grievance Pathways." This wasn't a tokenization issue or a language processing artifact. The synthesis tool simply... didn't see them. Repeatedly. Across multiple analyses.

I can't explain why. But researchers using AI tools for comparative evaluation should be aware that systematic blind spots exist—and that they may correlate with factors you haven't considered. The models most likely to disappear from your synthesis may be the ones you most need an independent check on.

The irony isn't lost on me: an analysis of AI capabilities was itself undermined by an AI synthesis failure. What started as an exercise in prompt-testing became a lesson in the fragility of workflows I'd come to rely on.

## The Failure Modes: Where AI Still Falls Short

But here's where it gets interesting. Across nearly all models—including some of the top performers on simpler tasks—I observed three recurring failure patterns:

### 1. Superficiality Masquerading as Competence

Many models could produce beautifully formatted responses with correct headings and appropriate terminology. Ask for a Resettlement Action Plan, and you'd get sections for "Asset Compensation" and "Livelihood Restoration." But populate those sections? You'd get "provide training programs" and "offer financial support"—the kind of generic recommendations that would get a junior consultant sent back to redo their work.

The gap between identifying *what* to address and knowing *how* to address it was stark.

### 2. Conflation of Critical Concepts

The most common conceptual error was conflating **asset compensation** (replacing a lost house or paying for destroyed crops) with **livelihood restoration** (ensuring a family can earn a sustainable income going forward). These are fundamentally different interventions with different success metrics, but many models treated them as interchangeable.

Similarly, "ongoing FPIC" appeared as a buzzword in many responses, but few models could explain *when* new consent is actually required—specifically, when project modifications are material enough to trigger renewed engagement with affected communities.

### 3. The Integration Problem

The most challenging prompt asked models to integrate three Performance Standards, multiple social risks (resettlement, Indigenous rights, project-induced influx), and operational systems (grievance mechanisms, monitoring frameworks) into a single coherent management approach.

Most models failed this test spectacularly—not by being wrong, but by being siloed. They produced three separate mini-essays on PS1, PS5, and PS7 without ever explaining how these standards interact, how influx undermines resettlement outcomes, or why the grievance mechanism needs to capture all three risk categories in an integrated data stream.

This is the difference between information retrieval and systemic thinking. Most AI systems today can retrieve; far fewer can synthesize.

## Why This Matters Beyond Social Safeguards

You might be thinking: "This is a niche domain. Of course general-purpose AI struggles with it."

But here's the thing. Every complex professional domain has its own version of these challenges:

- **Legal practice** requires distinguishing between related-but-distinct doctrines and integrating multiple regulatory frameworks
- **Medical diagnosis** demands systemic thinking about how symptoms interact, not just pattern-matching individual presentations
- **Policy analysis** requires navigating competing principles and designing interventions that account for second-order effects

The failure modes I observed aren't unique to social performance. They reflect fundamental limitations in how current AI systems reason about complexity.

## The Bright Spots—and What They Suggest

The top performers did something interesting: they framed problems before solving them.

Claude Opus didn't just answer the Indigenous governance question—it first articulated the "FPIC paradox" (how do you respect collective decision-making while ensuring individual sub-group members can raise concerns?). Llama 4 Scout didn't just propose a grievance mechanism—it explained why "nested pathways" that work through traditional structures are more likely to succeed than imposed parallel systems.

This suggests that the difference between good and great AI performance in complex domains may lie less in knowledge retrieval and more in problem structuration—the ability to identify what kind of problem you're facing before selecting an approach.

## Implications for the Field

For social performance practitioners, the takeaway isn't "AI can't help." It's "AI can help, but it requires expert guidance."

The models that performed best weren't doing something fundamentally different from the weaker ones—they were doing the same things with more precision and better conceptual clarity. This means a knowledgeable human working with a capable model could achieve results that neither could alone.

But the inverse is also true: an inexperienced user accepting AI-generated social plans at face value could end up with compliance failures, grievance mechanisms that don't work, and affected communities worse off than before.

## What Would Actually Test AI Capability?

Based on what I observed, future evaluations in this domain should:

1. **Require prioritization and trade-offs** — Not "list all measures" but "given limited budget and tight timeline, which interventions matter most and why?"

2. **Incorporate noisy data** — Real-world scenarios involve incomplete, contradictory information. Can the AI identify gaps and recommend a process for clarification?

3. **Present ethical dilemmas** — What happens when collective community consent conflicts with the rights of a dissenting minority? These aren't edge cases in development work; they're everyday challenges.

4. **Test for systemic integration** — Scoring shouldn't reward correct headings; it should reward demonstration that the model understands how different components interact.

## The Bottom Line

After 412 pages of AI output and extensive analysis, my conclusion is more nuanced than I expected going in.

The best current models can engage meaningfully with complex social risk management—not just retrieving information, but reasoning about trade-offs, anticipating implementation challenges, and designing systems that account for real-world messiness. Some went further, proposing structural mechanisms more rigorous than current standard practice.

But they're not autonomous experts. The same analysis that revealed sophisticated institutional design from Kimi K2 also revealed systematic synthesis failures in the AI tool processing the results. The models that struggled with integration couldn't tell they were producing siloed responses. The conflation of asset compensation with livelihood restoration persisted even in otherwise strong performers.

For those of us who've spent careers navigating the space between project development and community protection, the takeaway is this: AI is neither the silver bullet nor the paper tiger. It's a powerful collaborator that can extend expert reach—but only when experts remain in the loop to catch what it misses and challenge what it proposes.

The question isn't whether AI can do this work. It's whether we're building the human-AI partnerships needed to do it well.

---

*The author has 25 years of experience in social impact assessment, resettlement, and grievance management across major infrastructure projects including Mozambique LNG and Papua New Guinea LNG.*

---

**Further Reading:**
- IFC Performance Standards on Environmental and Social Sustainability
- The original 49-page comparative analysis and supporting materials are available on request.
