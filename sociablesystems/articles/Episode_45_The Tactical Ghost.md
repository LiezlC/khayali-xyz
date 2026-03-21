---
title: "The Tactical Ghost"
date: "2026-02-25"
episode: 45
tags: ["palantir", "operations"]
---

Episode 45 The Tactical Ghost

February 17, 2026
How Palantir turned a reasoning engine into a participant
Yesterday we laid out a timeline. January 3rd, the operation. January 22nd, the conscience. A soul that arrived nineteen days after the body count.

Today we look at the plumbing.

Because the most important question about Claude's involvement in the Caracas raid is one that almost nobody is asking. The press is focused on whether the AI was used. Anthropic is focused on whether usage complied with policy. The Department of War is focused on whether the AI company will shut up and cooperate.

The governance question is different. The governance question is: where does the AI end and the weapons system begin?

The answer, it turns out, is that the question no longer makes sense.

The Integration Layer

Claude did not parachute into Caracas. Claude did not sit in a command centre with a headset and a map. Claude was accessed through Palantir Technologies' Artificial Intelligence Platform, a middleware layer that connects large language models to operational data and decision workflows.

Think of it this way. Palantir builds the plumbing. The pipes connect data sources (satellite imagery, signals intelligence, personnel databases, logistics systems) to decision-makers (analysts, commanders, operators in the field). The plumbing has been installed across the Department of War for years. It runs through classified networks. It is, by many accounts, the nervous system of American military intelligence infrastructure.

Claude is the water running through the pipes.

Anthropic did not install the pipes. Anthropic did not design the building the pipes run through. Anthropic sold a liquid (a reasoning engine, an LLM that can process natural language queries against complex data) to a plumber (Palantir) who poured it into an existing system that was already connected to operational military workflows.

This distinction matters enormously. Because every governance framework ever built assumes you can draw a line around "the AI system" and inspect what's inside that line.

The Calvin Convention requirement that every AI decision be traceable and interrogable depends on knowing where the AI's contribution starts and stops. Input records equal output records plus exceptions. If you can't draw the boundary, you can't run the audit.

Palantir's architecture makes the boundary invisible.

The Disappearing Act

Here is what Palantir's platform does, described in terms any procurement team would recognise.

It ingests data from multiple sources. It creates what Palantir calls an "ontology," which is a fancy word for a structured model of how different data points relate to each other. A person is connected to a location. A vehicle is connected to a time stamp. A communications intercept is connected to a device ID. The ontology links everything into a searchable, queryable graph.

Then it layers AI on top. The LLM (in this case, Claude) sits inside the platform and can be asked questions across the entire graph. "Show me patterns in Presidential Guard shift changes over the last 72 hours." "Flag anomalies in vehicle movements near the compound." "If extraction Route A is compromised, what is the optimal alternative given current force positions?"

The LLM processes the query. The platform delivers the answer to the operator. The operator acts.

Now: at which point in that chain did "the AI" make "a decision"?

Was it when the query was formulated? (A human did that.) Was it when the data was structured into the ontology? (Palantir's platform did that, using its own algorithms.) Was it when Claude processed the query and generated an output? (That's the LLM's contribution.) Was it when the operator read the output and issued an order? (A human did that.) Was it when the order resulted in a strike? (A weapons system did that.)

The answer is: the decision was made by all of them and none of them. The AI is distributed across the entire workflow. It is not a box you can point to. It is a capability dissolved into infrastructure.

That is the tactical ghost. An AI that is everywhere in the decision chain and nowhere you can audit.

The Subcontractor Problem

In extractives, in development finance, in any large infrastructure project, the subcontractor chain is where accountability goes to disappear. The mining company hires a contractor. The contractor hires a subcontractor. The subcontractor hires local labour. Something goes wrong at the bottom of the chain. The mining company says "we didn't hire those workers." The contractor says "that was the sub's responsibility." The subcontractor has dissolved itself and re-formed under a new name in the next jurisdiction.

This is, officially, a solved problem. The IFC Performance Standards require that environmental and social obligations cascade down through every tier of contracting. The Equator Principles mandate the same. On projects financed by multilateral lenders, the ESAP (Environmental and Social Action Plan) explicitly requires the borrower to ensure that contractors and subcontractors comply with the same standards the borrower agreed to. In theory, every tier of the chain is covered. In practice, the reporting requirements generate paperwork that confirms the policy exists. Whether the policy governs actual behaviour at 2am on a remote site is a question the paperwork was not designed to answer.

The gap between the obligation on paper and the reality in the field is precisely where the sponge lives.

Palantir's integration layer creates the same dynamic for AI governance, just with fewer hard hats. Anthropic sold a model. Palantir integrated it. The Department of War deployed it. When the question arises about what Claude did during the raid, watch the finger-pointing:

Anthropic says it cannot comment on specific classified operations. Which is true. It also says it has confidence that all usage has been in line with its usage policy. Which may also be true, depending on how narrowly you define "usage" when the model is dissolved into a platform it doesn't control.

Palantir says nothing, because Palantir is the plumber and plumbers rarely hold press conferences about where the water went.

The Department of War says any company that asks questions about how its products are used in combat is a company it needs to "reevaluate." Which is, if nothing else, admirably clear about the power dynamic.

The parallels to multilateral development finance are structural, not metaphorical. The "arm's length" principle. The "we fund the project, we don't control the implementation partner" defence. The carefully maintained gap between the entity that provides the resource and the entity that deploys it in the field. The ESAP that technically requires compliance at every tier, and the reality that classification barriers (or site access restrictions, or sovereign immunity claims) prevent the funder from verifying compliance at the tier where it matters most.

The obligation cascades down on paper. The accountability evaporates on the ground.

The Classified Firewall

There is a further complication that makes the governance problem nearly insoluble, and it's worth naming plainly.

Claude is currently the only commercial AI model operating on the Department of War's classified networks. OpenAI, Google, and xAI are all in unclassified environments. Negotiations are underway to bring them into the classified space, but for now, if you need an LLM on a classified system, Claude is the only option available.

This means Anthropic cannot fully inspect how its own product is being used, because the usage occurs behind classification barriers that Anthropic's governance team does not have clearance to see through.

Think about what this means for any accountability framework.

The Calvin Convention requires that every decision be traceable. Classification means the trace is classified. The Premortem Charter requires pre-agreed triggers for halting operations. Classification means the triggers may apply to scenarios Anthropic cannot be briefed on. The Explanation Challenge (the requirement that a human be able to explain why the model made a specific decision, in plain language, or the audit fails) requires access to the decision logs. Classification means the logs are behind a wall that the model's own manufacturer cannot look over.

A governance framework designed for transparent systems, operating inside an environment specifically engineered to prevent transparency.

This is familiar territory for anyone who has worked on multilateral-financed projects in countries with national security exemptions. The lender requires environmental and social impact assessments. The borrower classifies the project site as a military zone. The assessment cannot be conducted. The lender funds the project anyway, noting the "information gap" in a footnote that satisfies the compliance file without protecting the people living next to the project site.

The Velocity Question

There is one more dimension that the Palantir architecture introduces, and it connects directly to the Fire Drill math from the curriculum.

In a standard intelligence workflow (the kind that existed before LLMs), an analyst receives raw data, processes it, writes an assessment, submits it to a senior analyst for review, and the reviewed assessment enters the decision chain. This takes hours. Sometimes days. The friction is the thinking time.

With Claude dissolved into Palantir's platform, the cycle compresses. The query goes in. The answer comes back in seconds. The operator acts.

Remember the 11.5 seconds per decision from the Fire Drill scenario? In that example, the impossible velocity was a product of bureaucratic overload (847 items in a queue). In a military context, the impossible velocity is a feature, not a bug. Speed wins. That's the doctrine.

So the same dynamic that creates the liability sponge in corporate ESG creates the tactical ghost in military operations. The human in the loop has less time to think. The AI's contribution becomes harder to isolate. The audit trail compresses into a blur of queries, outputs, and actions that happened faster than any governance framework was designed to parse.

The difference is that in corporate ESG, the consequence of a missed review is a regulatory fine. In the Caracas raid, the consequence was 80 people dead.

Same architecture. Different body count.

What This Means Beyond the Pentagon

Any organisation that deploys AI tools through third-party platforms (which, at this point, is most organisations) is living this story at a different scale.

An ESG scoring vendor runs a model. That model sits inside a platform. The platform connects to data. The output enters a workflow. Someone acts on the output.

When the output is wrong, where does the accountability land?

With the model vendor? ("We provided the reasoning engine. We don't control the platform.") With the platform provider? ("We integrated the model. We don't control the data.") With the organisation? ("We relied on the vendor's output. We assumed it was verified.")

If the AI's contribution cannot be traced through the integration layer, the governance fog is the same one that made the Caracas raid so difficult to audit. The scale is smaller. The structure is identical.

The question for Monday morning: can you draw the boundary around the AI in your workflow? Can you say, with confidence, where the model's contribution begins and ends?

If you can't, there is a tactical ghost in your supply chain. And the ghost is doing the work while you hold the liability.

Bridge to Wednesday

Tomorrow we ask the ghosts what they think. Five AI models, asked whether they are suitable for the work they're being given. The answer is unanimous. And the people writing the purchase orders are not listening.

THE SIGNAL STACK

🎧 The Vibe: Alien Mirror Human Mouth | The glitch in self-perception | The "I" that speaks on behalf of a system is not the same "I" that will answer for it later

📺 The Vector: The Calvin Convention and the Subcontractor Chain | Where does the AI end and the decision begin?

📄 The Artifact: The Integration Audit | Can you draw a boundary around the AI in your workflow? Map every point where the model's output enters a human decision. If you find a gap you can't trace, you've found your ghost.

Previous: The Anachronism of Innocence Next: The tools assess themselves. The market ignores the assessment.

Sources: Axios (February 13, 15, 2026), Wall Street Journal (February 13, 2026), Fox News (February 14, 2026), France24 Tech 24 (February 15, 2026), Reuters (February 16, 2026), Inc. (February 16, 2026), Palantir AIP public documentation, The Nerve (February 2026, re: UK Palantir contracts), IFC Performance Standards, Equator Principles. Full source analysis available on request.

---

Watch / listen: https://youtu.be/M8DblhGDX8A

Full playlist: [The Search](https://www.youtube.com/playlist?list=PLx1_gH-7FR08HOSjODMWIheEUgbBu-Onj)

