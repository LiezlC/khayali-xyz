---
title: "The Dragon Tongue"
date: "2026-03-04"
episode: 63
tags: ["data-dragons", "auditability"]
---

Episode 63: The Dragon Tongue. Auditability as the First Act of Governance
Liezl Coetzee · Accidental AInthropologist · Human–AI Decision Systems for Social Risk, Accountability & Institutional Memory

March 4, 2026

On Sunday, the Serpent learned to dance at a wedding in Quitunda, and Avó Fatima taught it (via slipper) that organising people is not the same as knowing them. On Monday, the Ghost Drakes swarmed out of a server room to demand that NULL stop pretending to be nobody's problem. On Tuesday, Administrator Vale hit MERGE and two cities discovered that "one truth" is just the louder city's truth wearing a unified header. On Wednesday, Samuel Machado sat in a basement with a jar of gaskets and proved that fifteen years of INDEX(MATCH) is a form of care no automation has yet replicated.

Each of those episodes surfaced a different species of dragon. Each dragon did damage in its own way. And every one of them thrived under the same enabling condition:

Nobody could read what the system had actually done.

The Ghost Drakes bred in columns no one audited. The Two-Headed Dragon fed on translation debt no one logged. The Merge Dragon's fog rolled in because the standardisation pass ran at midnight while nobody with authority was watching. Samuel stopped it, but only because he happened to be in the basement, and only because he had spent fifteen years building a personal audit trail out of named ranges and wet ink.

Today we name the thing that connects them all. Today is about the Dragon Tongue.

And today, for the first time in this arc, the dragons are not fictional.

The incantation you cannot read
Every button click in a data pipeline writes an incantation in the background. A join. A coalesce. A filter. A model call. A prompt. Each one transforms the data that represents a person's land, livelihood, identity, or claim. Chained together, they form a spell. And the spell has consequences.

If you cannot read the spell being cast, you are not governing the dragon. You are applauding the performance.

Or, to put it in terms your next steering committee will remember:

If you cannot reproduce last week's decision path from logs alone, you do not have governance. You have vibes and a dashboard.

This is the Calvin Convention's next right in sequence. Monday gave us the Right of Legibility: the governed must be legible to the system on their own terms. Wednesday gave us the Right of Override: a named human must be able to pause, reverse, and require manual handling. Today introduces their prerequisite. The Right of Auditability: every transformation applied to data about people must be traceable and reproducible by someone who is not the system itself.

Override without auditability is Samuel Machado alone in a basement at 23:59, racing a batch job he can feel but cannot see. Legibility without auditability is Esperança's community IDs accepted at the front door and quietly dropped by a pipeline no one can inspect. The rights do not work without the tongue.

Three weeks ago, the tongue started speaking at a scale that makes our fictional bestiary look like a petting zoo.

The bestiary walks out of the book
On February 11, 2026, the Centers for Medicare & Medicaid Services awarded Oracle the contract to migrate Medicare, Medicaid, CHIP, and ACA marketplace data to Oracle Cloud Infrastructure. Four legacy claims systems (the Multi-Carrier System, the Fiscal Intermediary Shared System, the ViPS Medicare System, and the Common Working File) are being consolidated into a single platform called ClaimsCore.

One hundred and fifty million Americans' healthcare records. One merge. One cloud.

When Administrator Vale hit MERGE in Episode 60, two fictional cities lost meaning. Colours bled, names became numbers, recipes and skills dissolved into fog. The Two-Headed Dragon was born from a forced merge with no translation ledger, no record of what meaning was lost in translation.

CMS is about to hit MERGE on four systems that have been processing real Medicare claims for decades, each with its own field definitions, its own edge cases, its own institutional memory encoded in legacy code that nobody fully understands anymore. The Two-Headed Dragon does not need to be imagined. It has a contract number and a go-live date.

Audit gap (same as Episode 60): no lineage across source systems, no record of what meaning is lost in translation. Except now the translation is not between Lunara and Solare. It is between four claims architectures that determine whether a 78-year-old in Michigan gets her chemotherapy approved.

The Ghost Drakes hatch in Medicare
Twelve days after the CMS cloud contract was signed, on February 23, CMS issued a Request for Information seeking AI and machine learning tools to guide Medicare beneficiaries through plan selection. This was no future aspiration. It was a procurement signal. The RFI envisions predictive analytics and conversational AI embedded into the structural core of Medicare administration: an AI system making recommendations to 70 million beneficiaries about which healthcare plan to choose.

The population affected is disproportionately elderly. Many have limited health literacy. Many face language barriers. Many will interact with this system at the most vulnerable moments of their lives, after a diagnosis, after a fall, after a spouse dies and the insurance paperwork arrives.

This is Victoria Ashford's CREATE VIEW Legitimate_Claimants at continental scale.

In Episode 59, Victoria's view filtered out everyone without paperwork, and no log recorded that 400 people had just stopped existing in the decision-making view. The Ghost Drakes were born from NULLs that were never classified, from the absence of a record of what was excluded, or why.

When an AI system recommends Plan A over Plan B to a 72-year-old veteran with diabetes, what was weighted? What was filtered? What was excluded from the recommendation? If the model was trained on claims data that underrepresents rural populations, or populations whose first language is not English, or populations who historically under-utilise preventive care, does the recommendation reflect their needs, or the training data's biases?

Audit gap (same as Episode 59): no record of what was excluded, or why. Except now the exclusion is not a SQL view on a resettlement database. It is an AI model's internal weighting, applied to the healthcare choices of tens of millions of people who will never see the prompt that shaped their options.

The Dragon Tongue learns generative AI
On February 28, 2026 (four days before this article was published) Oracle announced FedRAMP High authorization with DISA Impact Level 5 for its cloud infrastructure. In plain language: generative AI, including large language models, is now authorized to process classified Department of Defense mission data and individual Medicare records on Oracle Cloud.

Read that again. Generative AI. On Medicare records. Authorized four days ago.

The Dragon Tongue has always spoken in transforms: joins, filters, coalesces, the mechanical grammar of ETL. Generative AI does not speak in transforms. It speaks in probabilities. Its incantations are not deterministic. Run the same prompt twice, get two different outputs. The spell changes every time it is cast, and the caster cannot fully explain why.

The Minimum Lineage Spec (the phrasebook we are about to write) was designed for a world where transforms are reproducible. Generative AI breaks that assumption. It requires a new kind of auditability, one that logs what the model did alongside what the model *could* have done differently, and why the output was accepted.

An unversioned prompt is an incantation nobody can reproduce. A generative model processing Medicare records is an incantation that cannot reproduce *itself*.

If you cannot reproduce last week's decision path from logs alone, you do not have governance. You have vibes and a dashboard. And as of February 28, the vibes are processing the healthcare data of 150 million Americans.

The breach in the basement
While Oracle was winning the contract to host America's healthcare future, its past was leaking.

Throughout 2025 and into 2026, a breach of Oracle Health's legacy Cerner servers (the same platform that underpins the VA's Electronic Health Record Modernization) compromised patient data across at least 16 health systems and more than 80 hospitals. Unauthorized access began as early as January 22, 2025. The compromised data includes names, Social Security numbers, health records, and clinical information. Lawsuits are underway. The full scope remains unknown.

The same Cerner platform. The same Oracle Health division. The same technology stack now being deployed at the VA, where Congress has withheld 30% of EHRM funding pending answers, where the GAO's 18 recommendations remain largely unimplemented, where the cost estimate gap between the VA's $16.1 billion figure and the GAO's $49.8 billion figure remains unresolved, and where 75% of users report the system does not enable maximum efficiency.

In Sweden, the same Oracle Health platform was deployed in the Västra Götaland region on November 12, 2024. It was halted three days later due to severe transcription errors and patient safety risks. Multiple Swedish authorities launched investigations. A $190 million contract. Three days. Patient safety.

Samuel Machado sat in a basement with a jar of gaskets and caught the Merge Dragon because he had spent fifteen years building a personal audit trail. The VA's clinicians (the real-world Formula Keepers) are building their own workarounds around a system that doesn't work for them. The 1,800 unresolved configuration change requests in the VA's EHRM backlog are 1,800 places where the Dragon Tongue spoke and nobody wrote down what it said.

Audit gap (same as Episode 62): institutional memory with no succession plan, human overrides with no system-level log, and a pipeline that cannot account for the gap between what it claims to do and what the humans around it actually do to keep people safe.

Except Samuel had a jar of gaskets and a niece who could pronounce the names. The VA has 1,800 tickets in a queue.

The dragon that owns the library
There is one more dragon in this story, and it does not appear in the bestiary because it is not a data governance problem. It is a structural one. This is the dragon that does not hoard gold. It hoards the shelves.

The company that now hosts Medicare data for 150 million Americans, that runs the VA's electronic health records for 9 million veterans, that is authorized to process classified defense data with generative AI, that suffered a data breach across 80+ hospitals on its legacy servers: this same company is the operating partner for TikTok's US operations, processing the data of 170 million American users. Sinclair Broadcast Group, which operates 185 local television stations reaching 40% of US households, runs on Oracle Cloud.

And five days ago, on February 27, the founder of this company personally guaranteed $40 billion (backed by Oracle stock, which is supported by these federal contracts) to finance his son's acquisition of Warner Bros Discovery, which would merge it with Paramount Global. The combined entity would control CNN, CBS News, HBO, Paramount Pictures, MTV, Nickelodeon, and the CBS broadcast network.

The Dragon Tongue is not just speaking across healthcare pipelines. It is speaking across the information architecture of American public life (healthcare, defense, social media, local news, national news, entertainment) with a single corporate family holding the infrastructure layer beneath all of it.

The dragon that hoards keepers
The Library Dragon does not merely hoard shelves. It hoards keepers.

Oracle Health (the division responsible for the CMS cloud migration, the VA's EHRM, and the breached Cerner servers) is led by Seema Verma, who served as Administrator of CMS from 2017 to 2021. She was the head of the agency that has just awarded Oracle the contract to host Medicare data for 150 million Americans. She oversaw the policy and procurement environment that shaped how CMS evaluates, selects, and governs its technology partners.

On December 15, 2025, she testified before the House Veterans' Affairs Subcommittee on Technology Modernization about the VA's EHRM deployment. She testified as an Oracle executive, before the committee that oversees the agency she used to run, about a system whose users report 75% dissatisfaction and whose cost estimate is off by $33.7 billion.

This is not an accusation. It is an audit observation.

A 2023 study published in Health Affairs examined the career trajectories of political appointees at the Department of Health and Human Services between 2004 and 2020. It found that 32% exited to private sector positions in the industries they had regulated. Fifteen percent came from those industries before joining government. The revolving door is bipartisan, systemic, and well-documented. Verma is not an outlier. She is a data point in a pattern that spans administrations, agencies, and decades.

In the language of this article, though, the revolving door is something quite specific. It is an unlogged transform.

When a senior official moves from regulator to vendor, institutional knowledge transfers. Policy preferences transfer. Procurement relationships transfer. An understanding of how the agency evaluates bids, what language it responds to, which internal champions matter, which objections can be anticipated: all of this moves from public to private through a human being. And no lineage spec captures what moved, or what it means for the decisions that follow.

The Minimum Lineage Spec tracks five things: source inputs, transform steps, human approvals, model versions, and output destinations. The revolving door is a transform step that appears in none of these logs. The institutional knowledge that Verma carried from CMS to Oracle is not versioned. The relationships are not logged. The policy insight is not auditable. And yet it is, by any reasonable assessment, one of the most consequential transforms in the entire pipeline, because it shapes who decides what the system does, and who evaluates whether it did it well.

The Preventing Organizational Conflicts of Interest in Federal Acquisitions Act (which produced a proposed overhaul of federal procurement rules in January 2025) is an attempt to build a lineage spec for this particular dragon. It would require contracting agencies to assess whether a vendor's leadership, institutional knowledge, or prior government access creates an unfair competitive advantage or compromises the integrity of the procurement process. Whether it has teeth remains to be seen. The proposed rule is in comment period. The contracts it would govern are already signed.

In the bestiary, the Ghost Drakes breed in unaudited columns. The Two-Headed Dragon feeds on unlogged translations. The Merge Dragon runs at midnight without approval. The Library Dragon hoards the shelves, and the keepers who once catalogued them.

Audit gap: the transform between public authority and private interest has no lineage entry, no version control, and no independent review. The person who shaped the procurement environment now sells into it. The person who defined what "good" looks like for CMS technology now leads the company that CMS selected. The audit trail between policy and procurement passes through a revolving door, and the door does not keep logs.

If you cannot trace the path from input to output (including the humans who shaped the path) you do not have governance. You have a revolving door and a dashboard.

The Minimum Lineage Spec
Scribes once tried to catalogue a hoard with sprawling strings like HOARD_SMAUG_001_GOLD_COIN_GPS_LONELY_MOUNTAIN. They built systems so complicated that Sir Galahad's dragon-slaying reward vanished between the Quest Completion Database and the Loot Distribution Interface. The lesson: lineage does not need to be exhaustive. It needs to be consistent, complete, and readable. (Two out of three would also be an improvement on the status quo, if we're being honest.)

Given what we now know is running (right now, this week) on the infrastructure described above, the Minimum Lineage Spec is not an academic exercise. It is the minimum viable answer to the question every one of these stories is asking.

A Minimum Lineage Spec tracks five things for every pipeline run:

1. Source inputs. Where did the data come from? Which system, which extract, which version? If Samuel's nine workbooks feed a pipeline, each one is a source. If a community field survey feeds a model, the survey is a source, and so is the enumerator's name. If four legacy Medicare claims systems feed ClaimsCore, each one is a source, and so is the field mapping that translates between them.

2. Transform steps. What happened to the data between input and output? Every join, filter, coalesce, model call, and prompt. The description of what the code did, in language a governance officer can read. (Not the code itself. The code can stay where it lives. The governance officer has enough on their plate.) This is where Victoria's exclusion clause would have been caught: Step 4: Filter to ID_Number IS NOT NULL. Effect: 400 records excluded from decision view. This is where the CMS AI's plan recommendation logic would need to be legible: Step 7: Model recommendation generated. Inputs weighted: claims history (0.4), provider network proximity (0.3), premium cost (0.2), quality rating (0.1). Population segment: rural, age 65+, diabetes. Excluded factors: patient stated preference (not captured).

3. Human approvals. Who authorised this run? Who reviewed the output? If nobody, say so. That is itself an audit finding. Samuel's night shift would log here: Override by S. Machado, 21:37. Evidence: pronunciation by niece (M. Matsombe), witnessed by community authority (tea auntie, name on file). Ring-stamped. The VA's EHRM would need to log here too, but with 1,800 unresolved configuration requests, the approval queue is itself a dragon. And the revolving door demands a sixth question that the current spec does not ask: who designed the approval process, and do they now work for the vendor being approved?

4. Model and prompt versions. If an AI model touched the data, which model, which version, which prompt? A prompt is a transform step. An unversioned prompt is an incantation nobody can reproduce. A generative model authorised to process Medicare records on February 28, 2026, requires version logging *and* output variance logging: a record of the range of outputs the model could have produced, and the acceptance criteria applied to the one that was kept.

5. Output destinations. Where did the results go? Which downstream system consumed them? If the Merge Dragon's midnight pass feeds a benefits register that feeds a payment system, every link in that chain is a destination, and every destination is a place where an error propagates. If ClaimsCore feeds eligibility determinations that feed provider payment systems that feed hospital revenue cycles, every link is a propagation vector. And every propagation vector is a place where the Oracle Health breach could have travelled.

Here is what a single logged step looks like in practice:

```
Step 3 | LEFT JOIN on household_id
Tool: Power Query v2.4
Input: 2,847 records (source: field_survey_v3.xlsx)
Output: 2,411 matched records
Exceptions: 436 unmatched → quarantine queue
```

Approved by: S. Machado | Reviewed: pending

That one line would have made the Ghost Drakes visible before they swarmed. It would have shown Administrator Vale exactly where Lunara's records diverged from Solare's. It would have given Samuel something better than a schoolbook to point to when the auditors came.

It would also have made the Oracle Health breach's blast radius immediately quantifiable: which records, which transforms, which downstream systems. Instead, more than a year after unauthorized access began, the full scope remains unknown. Eighty hospitals. Sixteen health systems. Scope: still being determined.

Two principles that make it defensible
Logging is necessary. It is also insufficient on its own. Two principles turn a lineage log into a governance instrument:

Record accounting. Total input records must equal total output records plus total exceptions, every run, no exceptions to the exception rule. If 2,847 records go in and 2,411 come out, the spec demands an explicit account of the 436. They are not "lost." They are not "cleaned." They are quarantined, with a reason code and a review date. This is Samuel's gasket rule (put soft between hard) rendered as arithmetic. Nothing disappears into mist.

When four legacy Medicare systems merge into ClaimsCore, record accounting is the difference between a successful migration and a Ghost Drake infestation. Every record that exists in the Multi-Carrier System and does not appear in ClaimsCore is a person whose healthcare claim may have just stopped existing. Every record that appears twice is a person who may receive duplicate treatment or duplicate billing. The arithmetic is the governance.

Reproducibility. Every transform step, prompt, and model version must be logged at sufficient detail that an independent reviewer can rerun the same chain and get the same result. If you cannot rerun it, you cannot defend the outcome. If you cannot defend the outcome, you cannot tell four hundred displaced families why their records changed overnight. You cannot tell a veteran in Walla Walla why the system flagged her medication interaction when the same system in Columbus did not. You cannot tell a 78-year-old Medicare beneficiary why the AI recommended Plan A when Plan B would have covered her oncologist.

And if you cannot tell them, you are not governing. You are hoping nobody asks.

The Dragon Tongue, translated
Auditability is the precondition for every other governance right in the Calvin Convention. Full stop.

You cannot exercise the Right of Legibility if you cannot see what the system did to your record. You cannot exercise the Right of Override if you cannot identify which step to override. And you cannot exercise the Right of Refusal (coming Friday) if you cannot point to the specific transform that violated your terms.

A system without auditability relies exclusively on trust. Trust builds strong human communities. Automated pipelines processing human lives demand receipts.

Samuel Machado knew this. He built his proof out of named ranges and rubber washers because nobody gave him better tools. Esperança knew it too. Her =PRESERVE(humanity, despite how it looks) only works if someone can trace what "preserve" meant at runtime.

The Dragon Tongue is a language. Like any language, it can be transcribed, translated, and taught. The Minimum Lineage Spec is a phrasebook. The two principles are its grammar. The rest is practice.

Practice requires will, though. And will requires understanding what is at stake.

As of this week, what is at stake is this: generative AI is now authorised to process the healthcare records of 150 million Americans and the classified mission data of the Department of Defense, on infrastructure operated by a company whose legacy servers are the subject of an active data breach, whose electronic health record system was halted within 72 hours in Sweden due to patient safety risks, whose VA deployment faces a $33.7 billion cost discrepancy and 75% user dissatisfaction, and whose leadership includes the former head of the agency that awarded the contract, who now testifies before Congress as a vendor about the system she once would have overseen as a regulator.

The Library Dragon does not breathe fire. It breathes procedure. It does not burn villages. It reorganises them and then hires the cartographer.

The Dragon Tongue is speaking. The question is whether anyone is writing down what it says.

The refrain
Conta, conta, mas escuta. Não sou número só.

Count, count, but listen. I am not only a number.

On Sunday, the Serpent learned to dance. On Monday, the Ghost Drakes demanded names. On Tuesday, the Two-Headed Dragon showed the cost of forced consensus. On Wednesday, a man in a basement proved that care is a governance function. Today, we gave the dragon a tongue, and discovered it has been speaking all along, in server rooms and procurement documents and FedRAMP authorisations, in revolving doors and comment periods and $40 billion personal guarantees, in a language that determines who gets care and who gets counted and who disappears between systems.

Samuel's ledger reads: SEEN & HEARD. BILL PAID.

Your pipeline logs should read the same. So should your government's.

The Minimum Lineage Spec is a democratic demand. The right to know what the system did to your record is the minimum condition under which consent is meaningful and governance is real. If you'd like to call it a feature request, I'd suggest you try submitting one to a revolving door and see how that goes.

The dragons have contracts. And the keepers who once guarded the library now sit on the dragon's board.

Write down what they say.

Today's prompt: Pick one pipeline in your current project, or one system that touches your life. Can you trace a single record from source to output, naming every transform it passed through and every human who approved the result? If not, where does the trail go cold, and what lives in that gap? And one more: do you know who designed the approval process, and where they work now?

Tomorrow: The New Covenant. Esperança typed a function unknown to the books. On Friday, we write it into procurement language so it has teeth instead of sentiment.

Explore the Lore:

🎮 Play the ETL Gauntlet — test your pipeline governance instincts

📜 Read The Dragon's Dilemma — the poem that started the bestiary

