# Workflow Blueprint Template

**Use this template to design AI-native workflows that are auditable and resilient. Output: 1 diagram + 2-page blueprint.**

---

## What Is an AI-Native Workflow?

An AI-native workflow embeds AI into the core decision path, not "off to the side." It includes:
1. **AI task** (what the system decides)
2. **Human checkpoints** (where humans verify or override)
3. **Stop cards** (when humans must intervene)
4. **Handoff rules** (when to escalate or defer)
5. **Audit trail** (proof of decision integrity)

---

## Step 1: Workflow Diagram (High-Level)

```
┌─────────────────────────────────────────────────────────────────┐
│                     SUPPORT TICKET INTAKE                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
         ┌────────────────────────────────────────┐
         │   AI: Classify Ticket Category          │
         │   (Prompting Skill)                     │
         │   ✓ Input: Ticket text                  │
         │   ✓ Output: Category + confidence       │
         └────────────────────────────────────────┘
                              ↓
         ┌─────────────────────────────────────────────────────┐
         │  Decision Logic (Critical Evaluation Skill)         │
         │  IF confidence > 0.85:                              │
         │    → Route automatically (non-urgent only)          │
         │  IF confidence 0.65-0.85:                           │
         │    → Flag for human review                          │
         │  IF confidence < 0.65:                              │
         │    → STOP CARD: Human review required              │
         │  IF category = "Safety/Fraud":                      │
         │    → STOP CARD: Escalate immediately               │
         └─────────────────────────────────────────────────────┘
                              ↓
    ┌────────────────────┬──────────────────┬──────────────────┐
    │                    │                  │                  │
    ▼                    ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────────┐
│ Auto-Route  │    │ Queue for   │    │ Human      │    │ Escalate to  │
│ (Confidence │    │ Review      │    │ Review     │    │ Manager      │
│ >0.85)      │    │ (0.65-0.85) │    │ (<0.65)    │    │ (Safety/     │
│             │    │             │    │            │    │ Fraud)       │
└─────────────┘    └─────────────┘    └─────────────┘    └──────────────┘
         ↓                  ↓                ↓                   ↓
    ┌────────────────────────────────────────────────────────────────┐
    │  Audit Trail: Log Decision, Outcome, Override (if any)        │
    │  (Workflow Integration & Ethics & Trust Skills)                │
    └────────────────────────────────────────────────────────────────┘
```

---

## Step 2: Detailed Workflow Blueprint

### 1. **Workflow Name & Purpose**
```
Name: Customer Support Ticket Triage
Owner: [Name/Team]
Version: 1.0
Last Updated: [Date]
Goal: Route 80% of tickets automatically, maintain <2% misdirection rate
```

### 2. **Inputs & Outputs**

| Input | Source | Format | Frequency |
|-------|--------|--------|-----------|
| Customer support ticket | Zendesk / Help Desk | Text (subject + body) | Real-time |
| Ticket metadata | Help Desk | JSON (priority, account type) | Real-time |

| Output | Consumer | Format | Action |
|--------|----------|--------|--------|
| Routing decision | Ticketing system | API call | Route to queue |
| Confidence score | Human reviewer | JSON | Display in dashboard |
| Override record | Audit system | Log entry | Store in database |

### 3. **AI Task Definition**

**What the AI does:**
```
Classify a customer support ticket into 1 of 8 predefined categories:
1. Billing & Payment
2. Technical Support
3. Account Access
4. Product Feedback
5. Complaint / Escalation
6. General Inquiry
7. Other
8. Safety / Fraud Alert

Model: Claude 3.5 Sonnet (via Anthropic API)
Latency SLA: <2 seconds per ticket
Cost: ~$0.001 per classification
```

**What the AI does NOT do:**
- Draft responses to customers (humans do this)
- Decide ticket priority or SLA
- Close tickets without human sign-off
- Contact customers directly

### 4. **Decision Logic & Stop Cards**

#### 4a. Confidence-Based Routing

```markdown
**IF confidence_score > 0.85 AND category != "Safety/Fraud":**
  └─ AUTO-ROUTE to appropriate queue
     └─ Update ticket status: "Routed (automated)"
     └─ Log decision with confidence score
     └─ Human reviewer spot-checks 5% of auto-routed tickets daily

**ELIF 0.65 < confidence_score <= 0.85:**
  └─ FLAG FOR HUMAN REVIEW (add to review queue)
     └─ Show model's top 2 category suggestions
     └─ Show confidence score
     └─ Wait for human decision (<4-hour SLA)

**ELIF confidence_score <= 0.65:**
  └─ STOP CARD: MANUAL REVIEW REQUIRED
     └─ Route to most experienced agent
     └─ Flag as "uncertain—human expertise needed"
     └─ SLA: <2 hours

**IF category == "Safety/Fraud":**
  └─ STOP CARD: ESCALATE IMMEDIATELY
     └─ Notify manager + compliance team
     └─ Do NOT auto-route
     └─ SLA: <15 minutes
```

#### 4b. Stop Card Conditions (Non-Negotiable Escalation)

| Stop Card | Trigger | Action | Owner |
|-----------|---------|--------|-------|
| **Safety Alert** | Model classifies as "Safety/Fraud" OR human detects harm/fraud mention | Escalate to manager within 15 min | Support Mgr |
| **Model Drift** | Weekly accuracy drops below 92% | Pause auto-routing, review prompt, retrain if needed | ML Engineer |
| **System Failure** | API latency >10 seconds OR >3 consecutive failures | Switch to manual routing, page on-call engineer | SRE |
| **Override Storm** | >20% of human reviews contradict model in a day | Review workflow logic, update prompt | Product Manager |

### 5. **Handoff Points (Workflow Integration Skill)**

#### 5a. AI → Human Review
```
Trigger: Confidence 0.65–0.85
Responsibility: Human support agent
SLA: <4 hours
Output: Corrected category + reason for correction (logged)
```

#### 5b. Human Review → AI Learning Loop
```
If human decision differs from model:
  1. Log disagreement (category, confidence, correction)
  2. Weekly: Aggregate corrections
  3. Monthly: Retrain prompt or fine-tune model if >5% pattern
  4. Update prompt library
```

#### 5c. Escalation → Manager
```
Trigger: Stop card conditions (safety, model drift, system failure)
Responsibility: Support manager
SLA: Varies (safety = 15 min, others = 1 day)
Output: Incident report + corrective action
```

### 6. **Audit Trail & Evidence (Ethics & Trust Skill)**

What gets logged for every ticket:

```json
{
  "ticket_id": "TKT-12345",
  "timestamp": "2026-02-06T14:23:45Z",
  "input": {
    "subject": "Can't reset my password",
    "body": "I've tried three times. Says 'invalid token.' Please help.",
    "customer_account_type": "premium"
  },
  "ai_output": {
    "category": "Account Access",
    "confidence": 0.92,
    "reasoning": "Customer explicitly mentions password reset failure."
  },
  "routing_decision": {
    "auto_routed": true,
    "queue": "account-support",
    "confidence_threshold_met": true
  },
  "human_override": {
    "occurred": false,
    "override_reason": null,
    "human_category": null
  },
  "outcome": {
    "actual_category": "Account Access",
    "resolved_correctly": true,
    "resolution_time_minutes": 12
  }
}
```

**Retention:** 2 years minimum (for regulatory audit)  
**Access:** Logged-in support agents + compliance team  
**Security:** Encrypted at rest, masked PII in logs  

### 7. **Monitoring & KPIs (Critical Evaluation Skill)**

#### Daily Dashboard

| Metric | Target | Alert If |
|--------|--------|----------|
| Accuracy (manual vs. AI) | ≥95% | <92% |
| Auto-route rate | 75–85% | <70% or >90% |
| Human override rate | <5% | >10% |
| Stop card activation rate | <2% | >3% |
| Average confidence score | 0.80+ | <0.75 |

#### Weekly Review

- [ ] Sample 100 auto-routed tickets; verify category accuracy
- [ ] Aggregate human overrides; identify patterns
- [ ] Check for category drift (e.g., more "Safety" alerts than before?)
- [ ] Review stop card triggers; were they valid?

#### Monthly Review

- [ ] Retrain/refine prompt if accuracy <93%
- [ ] Benchmark against baseline (human-only routing)
- [ ] Calculate cost savings: (4 FTEs saved) - (model cost + human review overhead)
- [ ] Report to business stakeholder + compliance team

---

## Step 3: Integration Checklist (AI Strategy Skill)

- [ ] **Workflow goal is measurable** (e.g., "reduce ticket routing time from 8 min to <1 min")
- [ ] **AI task is specific & scoped** (classify ≠ decide priority ≠ respond)
- [ ] **Confidence thresholds are defined** (>0.85 auto, 0.65–0.85 review, <0.65 escalate)
- [ ] **Stop cards are crisp & unambiguous** (safety, drift, failure = immediate escalation)
- [ ] **Handoff rules are clear** (AI → human review: <4 hrs; human review → AI learning: monthly check)
- [ ] **Audit trail captures everything** (input, output, override, outcome, timestamp)
- [ ] **Monitoring is automated** (daily dashboard, weekly spot-check, monthly full review)
- [ ] **Escalation path is documented** (who gets paged for safety? for drift? for outage?)

---

## Step 4: Pilot & Validation

### Pilot Phase (Week 1)
- [ ] Deploy to 5% of traffic (100 tickets/day)
- [ ] Monitor accuracy daily
- [ ] Document all human overrides + reason
- [ ] Alert if any Stop Card triggered

**Go/No-Go Decision:**
- If accuracy ≥92%: proceed to expansion
- If accuracy <92%: debug prompt, retest

### Expansion Phase (Weeks 2–4)
- [ ] 25% → 50% → 100% of traffic (if pilot successful)
- [ ] Monitor key metrics daily
- [ ] Implement weekly review process

### Production Phase (Ongoing)
- [ ] Continuous monitoring per KPIs
- [ ] Monthly prompt refresh
- [ ] Quarterly business review with stakeholders

---

## Foundational Skills Checklist

- [ ] **AI Strategy:** Workflow goal tied to business metric (e.g., cost savings, faster resolution)
- [ ] **Prompting:** Prompt is versioned and tested for accuracy across models
- [ ] **Workflow Integration:** Handoff rules, stop cards, and audit trail fully designed
- [ ] **Critical Evaluation:** KPIs defined, monitoring dashboard built, spot-check process documented
- [ ] **Ethics & Trust:** Guardrails (confidence thresholds, stop cards) designed to survive model changes; audit trail captures all decisions

---

## Real-World Example: Comparison

### Workflow Anti-Pattern (❌ Not AI-Native)
```
Tickets come in → AI classifier runs in background → 
Sometimes teams see the result, sometimes they don't → 
No one knows if accuracy is good → 
AI quietly misdirects critical issues → 
Customers complain
```

### Workflow Best Practice (✓ AI-Native)
```
Tickets come in → AI classifier + confidence score → 
IF high confidence → auto-route + log → weekly spot-check
IF low confidence → human review (with AI suggestion) → 
IF safety flag → escalate immediately → audit trail captured
Monitoring dashboard shows accuracy, override rate, SLA metrics
Monthly: Review outcomes, retrain if needed, celebrate wins
```

The difference: **Intentional human oversight + continuous learning + measurable outcomes.**
