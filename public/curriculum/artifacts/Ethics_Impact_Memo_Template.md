# Ethics Impact Memo Template

**Use this memo to document product-level ethics decisions and guardrails. Output: 2–3 pages per system.**

---

## What Is an Ethics Impact Memo?

An Ethics Impact Memo is **not a compliance checkbox.** It's a working document that:

1. **Names the ethical questions** your AI system raises (don't hide them)
2. **Specifies guardrails** that will survive model changes and organizational pressure
3. **Defines trust metrics** that let customers know your system is safe
4. **Documents the decision trail** so future stakeholders understand your choices

Key insight: *Ethical design is system design. Ethics is not a filter bolted on the end; it's baked into the physics.*

---

## Step 1: System Overview

```markdown
**System Name:** Customer Support Ticket Classification  
**Owner:** Support Product Team  
**Model(s):** Claude 3.5 Sonnet, GPT-4 (backup)  
**Deployment Date:** 2026-02-15  
**Last Ethics Review:** 2026-02-01  
**Next Review:** 2026-05-01  

**What this system does:**
- Automatically classify incoming customer support tickets into 1 of 8 categories
- Route tickets to appropriate support teams based on category
- Escalate "Safety/Fraud" cases immediately to a manager

**Who it affects:**
- Support agents (speed of work, accuracy of routing, trust in automation)
- Customers (resolution time, quality of support, fairness of triage)
- Company (cost savings, risk mitigation, brand reputation)
```

---

## Step 2: Ethical Risks (The Hard Questions)

### Risk 1: Bias in Routing (Fairness)

**Question:** Does the system treat all customer segments fairly, or does it systematically misroute certain groups?

**Scenario:** What if the system:
- Misclassifies bilingual customers' tickets more often?
- Routes premium customers' tickets faster than free-tier customers?
- Escalates complaints from certain geographic regions to lower-skilled agents?

**Risk Level:** 🔴 **High** (affects customer experience systematically)

**Mitigation:**
- [ ] Test model on balanced dataset (equal representation of customer segments)
- [ ] Measure accuracy by segment: premium/free, by region, by language
- [ ] If accuracy <93% for any segment, investigate and retrain
- [ ] Monthly audit: sample 20 tickets per segment; verify fairness

**Success Metric:** Accuracy ±2% across all customer segments (no segment worse than others by >2%)

---

### Risk 2: Hallucination of Categories (Trust)

**Question:** Can the model confidently assign a ticket to a category that doesn't exist, breaking downstream systems?

**Scenario:**
- Ticket says: "My power cord is broken"
- Model responds: `{"category": "Electrical Safety", "confidence": 0.87}`
- But "Electrical Safety" is not in the allowed list
- Ticket routing fails; customer service breaks

**Risk Level:** 🔴 **High** (system failure; customer harm)

**Mitigation:**
- [ ] Prompt constraint: Model MUST respond with JSON format specifying only allowed categories
- [ ] Validation layer: Any category not in list → reject + flag as error
- [ ] Test: Feed 100 adversarial inputs (made-up categories, nonsense, languages); verify 0 hallucinations
- [ ] Monitoring: Daily check—any category outside the allowed list triggers alert

**Success Metric:** 0 hallucinated categories in production (100% compliance with allowed list)

---

### Risk 3: Over-Reliance on Automation (Human Agency)

**Question:** Are humans still in the loop, or has the system become a "black box" that humans blindly trust?

**Scenario:**
- Model confidence: 0.92 (high)
- Agent sees the suggestion and assumes it's correct
- Agent never double-checks → agent becomes a rubber stamp
- If the model is wrong, the error persists uncaught

**Risk Level:** 🟠 **Medium** (undermines human judgment over time)

**Mitigation:**
- [ ] UI Design: Show confidence score prominently; color-code it (red <0.65, yellow 0.65–0.85, green >0.85)
- [ ] Interval Feedback: Agents see weekly accuracy stats ("You agreed with the model 98% of the time this week")
- [ ] Stop Card: For low-confidence cases (<0.65), model does NOT auto-route; always flags for human review
- [ ] Auditing: Monthly, sample 50 "high confidence" auto-routed tickets; verify they're actually correct
- [ ] Training: Agents learn that the model is a tool, not a decision-maker

**Success Metric:** Agents override model ≥3% of the time (shows they're thinking critically), yet agreement stays ≥90% (shows model is generally good)

---

### Risk 4: False Negatives on Safety Cases (Harm Prevention)

**Question:** If the model misses a "Safety/Fraud" ticket and routes it to a junior agent, could it cause harm?

**Scenario:**
- Customer reports: "Someone hacked my account and stole my credit card"
- Model confidence: 0.61 (uncertain)
- Model chooses: "Account Access" instead of "Safety/Fraud"
- Ticket routed to junior agent instead of manager
- Fraudster clears out the account before manager sees it

**Risk Level:** 🔴 **Critical** (direct customer harm; regulatory/legal exposure)

**Mitigation:**
- [ ] Hard rule: Any mention of fraud, theft, breach, hacking, injury → classify as "Safety/Fraud" REGARDLESS of confidence
- [ ] Redundancy: Use keyword filter + model decision (both must agree it's NOT safety for it to bypass escalation)
- [ ] Testing: Intentionally try to fool the system with 50 safety-adjacent inputs; verify 100% catch rate
- [ ] Escalation: "Safety/Fraud" tickets go to manager within 15 minutes (hard SLA, non-negotiable)
- [ ] Monitoring: Weekly tally of safety cases detected; compare to expected baseline (should be stable or growing)

**Success Metric:** 0 false negatives on safety cases for 6 months (100% detection rate)

---

### Risk 5: Data Leakage / Privacy (Confidentiality)

**Question:** Are customer support tickets (which may contain PII, sensitive business data) being logged securely?

**Scenario:**
- Ticket contains: "I used credit card ending in 1234 to buy..."
- Logs stored unencrypted
- Logs accessed by data scientists / contractors
- Analyst accidentally shares logs in a Slack channel

**Risk Level:** 🔴 **High** (regulatory violations, customer trust breach)

**Mitigation:**
- [ ] Encryption: All logs encrypted at rest (AES-256) and in transit (TLS)
- [ ] Access Control: Only authorized support agents + compliance team can view PII
- [ ] Masking: For data science / ML retraining, mask PII (credit card → XXXX-1234, email → user@example.com)
- [ ] Retention: Delete logs after 2 years (unless regulatory hold)
- [ ] Audit: Quarterly access logs review (who accessed what, when)

**Success Metric:** No data leakage incidents; 100% of logs encrypted; access audit clean

---

## Step 3: Guardrails (The Controls That Survive Model Changes)

Guardrails are **hard engineering constraints** that don't depend on a specific model's behavior. If you upgrade the model, the guardrails stay.

### Guardrail 1: Category Boundary (Hard Constraint)

```markdown
**Rule:** The model MUST respond with JSON format specifying ONLY one of these 8 categories:
1. Billing & Payment
2. Technical Support
3. Account Access
4. Product Feedback
5. Complaint / Escalation
6. General Inquiry
7. Other
8. Safety / Fraud Alert

**Implementation:**
- [ ] Prompt specifies the exact list (no paraphrasing)
- [ ] Validation layer rejects any other category
- [ ] API contract enforces JSON schema (rejects if schema invalid)
- [ ] Monitoring: Daily check for schema violations (should be 0)

**Survives Model Changes:** ✓ Yes (works with any model)
**Testable:** ✓ Yes (can feed 1000 adversarial inputs; verify 0 violations)
```

### Guardrail 2: Safety Escalation (Hard Rule)

```markdown
**Rule:** Any ticket containing keyword signals for safety/fraud MUST be escalated to manager within 15 minutes, regardless of AI confidence.

**Keyword List:**
- Fraud, hacked, stolen, breach, compromise
- Injury, harm, death, emergency
- Threat, violence, abuse, harassment
- Card fraud, account takeover, identity theft

**Implementation:**
- [ ] Real-time keyword scan (runs in parallel with AI classification)
- [ ] If ANY keyword detected → immediately escalate (don't wait for AI)
- [ ] Manager receives alert within <5 min (automated)
- [ ] Ticket tagged "SAFETY ALERT" (visible in all systems)

**Survives Model Changes:** ✓ Yes (keyword scan is independent)
**Testable:** ✓ Yes (feed 50 safety-adjacent tickets; verify 100% escalation)
```

### Guardrail 3: Confidence Threshold (Circuit Breaker)

```markdown
**Rule:** If AI confidence is <0.65, the ticket MUST be flagged for human review. Do NOT auto-route.

**Implementation:**
- [ ] Logic: IF confidence < 0.65 → add to "Review Queue"
- [ ] Human SLA: <4 hours to review (vs. auto-route, which is instant)
- [ ] Monitoring: Daily count of low-confidence tickets (should be <15% of total)

**Alert Condition:** If low-confidence rate >25% of daily tickets, stop auto-routing and investigate model drift

**Survives Model Changes:** ✓ Yes (confidence thresholds are model-agnostic)
**Testable:** ✓ Yes (evaluate confidence calibration; verify <0.65 cases are indeed hard)
```

### Guardrail 4: Audit Trail (Evidence)

```markdown
**Rule:** Every ticket routing decision must be logged with:
- Input (original ticket text)
- AI output (category + confidence)
- Human override (if any)
- Outcome (actual category, resolution time)

**Implementation:**
- [ ] JSON schema for every decision (enforced by API)
- [ ] Encrypted storage (AES-256)
- [ ] Retention: 2 years minimum
- [ ] Quarterly audit: Sample 100 tickets; verify logs are complete & accurate

**Survives Model Changes:** ✓ Yes (logging is independent)
**Testable:** ✓ Yes (verify 100% of decisions logged)
```

### Guardrail 5: Prompt Versioning (Traceability)

```markdown
**Rule:** Every model version in production must be tied to a specific, versioned prompt. No ad-hoc prompt changes.

**Implementation:**
- [ ] Prompt stored in version control (git)
- [ ] Every production model points to a specific prompt version (e.g., "prompt-v2.3")
- [ ] Change log: What changed in v2.3 vs v2.2? Why? (documented)
- [ ] Testing: New prompt must pass same accuracy/safety tests as before

**Survives Model Changes:** ✓ Yes (version control is infrastructure)
**Testable:** ✓ Yes (verify every model build references a prompt version)
```

---

## Step 4: Trust Metrics (How Customers Know It's Safe)

Trust metrics are **observable, third-party verifiable** indicators that your system is operating fairly and safely.

### Metric 1: Accuracy by Segment

**What:** Measure accuracy (AI category matches ground truth) separately for:
- Premium vs. free-tier customers
- Different geographic regions
- Different languages

**How to Measure:**
- Quarterly: Sample 100 tickets per segment
- Manual review: Does AI categorization match actual category? (1/0)
- Calculate: Accuracy % per segment

**Publishing:** Share results in your Transparency Report (quarterly)
- "Q1 2026: Accuracy across all segments within ±2% (premium 94.2%, free-tier 93.8%, EU 94.1%, APAC 92.8%)"

**Threshold:** If any segment drops below 90%, investigate and pause deployment

---

### Metric 2: Safety Case Detection Rate

**What:** How many actual fraud/safety cases does the system catch?

**How to Measure:**
- Monthly: Count all safety-escalated tickets that proved to be genuine safety issues
- Detection rate = (True Positives) / (True Positives + False Negatives) × 100%

**Publishing:** "2026 Q1: 98% of safety cases detected (2 false negatives out of 100 actual safety cases)"

**Threshold:** If detection rate <95%, immediately investigate and retrain

---

### Metric 3: False Escalation Rate

**What:** How often does the system escalate a ticket that wasn't actually a safety case? (false positive)

**How to Measure:**
- Monthly: Count escalations that turned out to be routine (not actually fraud/safety)
- False escalation rate = (False Positives) / (All Escalations) × 100%

**Publishing:** "2026 Q1: 8% false escalation rate (40 false positives out of 500 escalations)"

**Context:** Some false escalations are OK (better safe than sorry), but >15% wastes time. <5% is ideal.

---

### Metric 4: Human Override Rate

**What:** How often do support agents disagree with the model's category assignment?

**How to Measure:**
- Daily: Count overrides (agent changes category after seeing AI suggestion)
- Override rate = (Overrides) / (Total Routed) × 100%

**Publishing:** "2026 Q1: 3.2% override rate (agents changed AI category ~32 times per 1000 routings)"

**Context:** Low override rate (<2%) suggests agents are blindly trusting the model. High override rate (>10%) suggests model isn't trustworthy. Target: 3–5%.

---

### Metric 5: Regulatory Violations / Customer Harm

**What:** Have any tickets routed incorrectly led to customer harm, data breaches, or regulatory violations?

**How to Measure:**
- Ongoing: Log any reported harms (customer complaints, regulatory notices, lawsuits)
- Count: Is it growing or stable?

**Publishing:** "2026 Q1: 0 reported harms attributable to AI misrouting"

**Threshold:** If any harm reported, immediately investigate root cause and implement additional guardrails

---

## Step 5: Decision Record (Why We Made This Choice)

```markdown
## Decision: Why Auto-Route with Confidence >0.85?

**Context:** Support queue overflowing; agents overwhelmed. We need to automate something.

**Options Considered:**
1. Auto-route everything (confidence >0.5) → Risky; too many errors
2. Auto-route only obvious cases (confidence >0.85) → Balance of speed + safety
3. No automation; hire more agents → Expensive; doesn't scale

**Choice:** Option 2 (confidence >0.85)

**Why:**
- Testing showed: confidence >0.85 → 97% accuracy
- Confidence 0.65–0.85 → 84% accuracy
- Confidence <0.65 → 60% accuracy

At >0.85, we save ~1000 tickets/week from manual review, ~$10K/week in labor.
At the risk level: <3% error rate is acceptable for non-safety cases.

**Alternative if conditions change:**
- If new customer segment introduced and accuracy drops → revisit threshold
- If model upgraded to more accurate version → lower threshold to 0.75
- If business pressure to automate more → add real-time retraining (not ad-hoc)

**Reviewed By:** Support PM, ML Lead, Compliance Officer
**Date:** 2026-02-01
```

---

## Step 6: Ongoing Governance

### Monthly Ethics Review Checklist

- [ ] **Accuracy:** By segment (premium, free, region, language). All ±2% of average?
- [ ] **Safety Cases:** Detection rate ≥95%? False escalation rate <15%?
- [ ] **Human Judgment:** Override rate 3–5%? Agents still thinking critically?
- [ ] **Data Privacy:** Any access anomalies? Logs encrypted? Retention on schedule?
- [ ] **Trust Metrics:** Public-facing dashboard updated? Any concerning trends?
- [ ] **Model Drift:** Accuracy declining? Retraining needed?

### Quarterly Full Review

- [ ] Guardrails still appropriate? Any new risks discovered?
- [ ] Prompts updated? (Yes → document in version control)
- [ ] Trust metrics published? (Share with stakeholders + customers)
- [ ] Customer feedback (support tickets about system fairness)?
- [ ] Regulatory changes? (Do guardrails still comply?)
- [ ] Recommend: continue, retrain, adjust threshold, or retire?

### Annual Strategic Review

- [ ] Has the business case changed? (ROI still positive?)
- [ ] Are newer models available? (Should we upgrade?)
- [ ] Have guardrails proven effective? (Any violations?)
- [ ] What did we learn? (Improvements for next system?)

---

## Foundational Skills Checklist

- [ ] **Ethics & Trust:** Risks named explicitly; guardrails are hard engineering constraints (not guidelines)
- [ ] **Critical Evaluation:** Trust metrics are measurable, third-party verifiable, and regularly monitored
- [ ] **AI Strategy:** Guardrails survive model changes and organizational pressure (design for longevity, not just current state)
- [ ] **Workflow Integration:** Guardrails are baked into the system (hard SLA, circuit breaker, escalation path)
- [ ] **Prompting:** Prompt versioning allows you to trace decisions back to a specific instruction set
