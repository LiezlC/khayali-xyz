# Strategic AI Brief Template

**Use this template to justify AI deployment decisions to stakeholders. Output: 1-2 pages.**

---

## Executive Summary (1 paragraph)
Describe the business opportunity, the AI capability being deployed, and the key risk threshold. State clearly whether this deployment is recommended (GO), conditional (GO with controls), or not recommended (NO GO).

Example: *"We propose deploying Claude 3.5 Sonnet for customer service intent classification (70% automation goal). Hallucinogenic errors in safety-critical cases present unacceptable risk without a human verification layer. Recommendation: GO with Circuit Breaker Rule."*

---

## Opportunity Assessment

### Business Problem
- **What business pain point does this solve?** (e.g., 4 FTEs spent on intent routing; 18% mislabeling rate)
- **Why now?** (e.g., new regulatory requirement, competitive threat, cost pressure)

### AI Capability
- **Which model/system?** (e.g., OpenAI GPT-4, Claude, Gemini, internal fine-tune)
- **Task definition:** What exactly will the AI do? (Be specific: "classify support tickets into 8 categories" not "improve support")
- **Success metric:** How will we know it works? (Accuracy target, latency, cost reduction %)

### Deployment Context
- **Scale:** How many decisions/outputs per month?
- **Stakeholders affected:** Who uses this output or is impacted by errors?
- **Replacement scenario:** What human process does this replace/augment?

---

## Risk Threshold Definition

### Consequence Classes (rank by severity)

| Consequence | Definition | Risk Level |
|---|---|---|
| **Critical** | Regulatory violation, direct financial loss >$100K, safety/injury | Red |
| **Major** | Customer loss of trust, reputational damage, rework costs $10-100K | Orange |
| **Minor** | Operational inefficiency, customer friction, <$10K rework | Yellow |
| **Negligible** | Cosmetic errors, no downstream impact | Green |

### Current Hallucination/Error Rate (from testing)
- **False positive rate:** ___% (e.g., "classified as 'billing issue' when it was 'technical support'")
- **False negative rate:** ___% (e.g., "missed critical issues")
- **Rare edge-case errors:** List 2-3 examples from testing (e.g., "confused 'credit card fraud' with 'billing question'")

### Acceptable Risk Tolerance
- **For critical consequences:** How many critical errors can we tolerate per month? (e.g., "0-1" vs. "up to 5")
- **For major consequences:** Same (e.g., "up to 10")
- **Threshold:** If error rate exceeds this, we pause the deployment.

---

## Control Architecture (Refusal Stack)

### Layer 1: Pre-Action Controls
What prevents a bad decision from being made?
- [ ] Human review step (e.g., all "other" category tickets reviewed by human before routing)
- [ ] Confidence threshold (e.g., only auto-route if model confidence >0.85)
- [ ] Scope limits (e.g., only route non-urgent tickets)
- [ ] Other: ________________

**Effectiveness:** What % of errors will this catch? ____%

### Layer 2: Circuit Breaker Rule
Under what condition do we stop the deployment?
- Example: *"If weekly hallucination rate exceeds 2%, pause auto-routing and escalate to human review."*
- Monitoring metric: _____________________
- Pause threshold: _____________________
- Who gets alerted: _____________________

### Layer 3: Audit Trail / Logging
What data do we capture to prove safe operation?
- [ ] Model input (the ticket text)
- [ ] Model output (predicted category + confidence)
- [ ] Human override (if human changed the decision)
- [ ] Outcome (actual correct category, from customer feedback or manual review)
- [ ] Timestamp and operator

**Retention:** How long do we keep logs? _____ (recommended: 2 years minimum)

---

## Financial Model

| Input | Value | Notes |
|-------|-------|-------|
| **Implementation cost** | $___K | (infrastructure, training, validation) |
| **Ongoing monthly cost** | $___K | (API calls, human oversight, monitoring) |
| **Savings per month** | $___K | (e.g., 4 FTEs × $6K/month = $24K) |
| **Payback period** | ___ months | (implementation ÷ monthly savings) |
| **ROI (annual)** | __% | |

### Risk-Adjusted Scenario
If actual accuracy is 10% worse than testing, what does ROI look like?
- New monthly savings: $___K
- New ROI: ___%

---

## Governance Checkpoints

### Approval Timeline
- [ ] **Week 1:** Pilot with 5% of traffic (100 tickets/day). Daily error rate monitoring.
- [ ] **Week 2:** Expand to 25% of traffic if error rate stays <threshold.
- [ ] **Week 3:** Expand to 50% of traffic.
- [ ] **Week 4:** Full rollout if all thresholds met.

### Quarterly Review
- [ ] Audit 100 random decisions (manual review of input + output + outcome).
- [ ] Report actual hallucination rate to governance committee.
- [ ] Update risk threshold based on new model releases.

### Annual Renewal
- [ ] Business case still valid? (ROI, regulatory environment)
- [ ] Recommend upgrade to newer model or retire capability?

---

## Sign-Off

| Role | Name | Date | Approval |
|------|------|------|----------|
| **Business Sponsor** | __________ | __/__/____ | ☐ Approve ☐ Conditional ☐ Reject |
| **Risk/Compliance** | __________ | __/__/____ | ☐ Approve ☐ Conditional ☐ Reject |
| **Tech Lead** | __________ | __/__/____ | ☐ Approve ☐ Conditional ☐ Reject |

**Conditions (if applicable):**
_________________________________________________________________
_________________________________________________________________

---

## Foundational Skills Checklist

- [ ] **AI Strategy:** Deployment rationale and risk threshold documented
- [ ] **Critical Evaluation:** Error rates from testing quantified and ranked
- [ ] **Workflow Integration:** Human handoff points and circuit-breaker defined
- [ ] **Ethics & Trust:** Guardrails and audit trail designed to survive model changes
