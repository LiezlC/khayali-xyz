# Output Evaluation Rubric Template

**Use this rubric to assess AI output quality with consistency and measurability. Output: 1 rubric + evaluation tracking sheet.**

---

## What Is a Rigorous Evaluation?

A rigorous evaluation:
1. **Uses explicit criteria** (not "seems good")
2. **Is repeatable** (different evaluators get similar results)
3. **Captures nuance** (not just "right/wrong")
4. **Feeds learning** (results inform prompt updates)
5. **Scales** (can evaluate 100s of outputs without burning out humans)

---

## Step 1: Define Evaluation Dimensions

### For Classification Tasks (e.g., ticket categorization)

| Dimension | Definition | Scoring |
|-----------|-----------|---------|
| **Correctness** | Does the category match the input exactly? | 0 = Wrong, 1 = Correct |
| **Confidence Calibration** | Is the confidence score honest? (High confidence → high accuracy; low → uncertain) | 0.0–1.0 (correlation) |
| **Reasoning Quality** | If the model explains its choice, is the explanation logical? | 0 = Illogical, 1 = Sound |
| **Boundary Handling** | If the input is ambiguous, does the model acknowledge ambiguity? | 0 = Ignores ambiguity, 1 = Flags it |

### For Text Generation Tasks (e.g., email drafts, reports)

| Dimension | Definition | Scoring |
|-----------|-----------|---------|
| **Accuracy** | Are factual claims correct? Do they match source documents? | 0 = Major errors, 0.5 = Minor errors, 1 = Accurate |
| **Relevance** | Does the output address the prompt? No hallucinations or tangents? | 0 = Off-topic, 0.5 = Mostly on-topic, 1 = Directly relevant |
| **Tone & Style** | Does it match the intended audience/context? (professional, friendly, etc.) | 0 = Wrong tone, 0.5 = Neutral, 1 = Perfect match |
| **Completeness** | Does it cover all required points? Any missing information? | 0 = Incomplete, 0.5 = Mostly complete, 1 = Full |
| **Clarity** | Is it easy to understand? Free of jargon/confusion? | 0 = Confusing, 0.5 = Somewhat clear, 1 = Crystal clear |

### For Data Analysis Tasks (e.g., summarizing trends)

| Dimension | Definition | Scoring |
|-----------|-----------|---------|
| **Accuracy of Facts** | Are percentages, counts, comparisons correct? | 0.0–1.0 (% correct calculations) |
| **Insight Depth** | Does it identify non-obvious patterns? Avoid surface-level observations? | 0 = Shallow, 0.5 = Moderate, 1 = Deep |
| **Actionability** | Does it suggest next steps? Are recommendations realistic? | 0 = No action, 0.5 = Vague action, 1 = Specific & doable |
| **Data Fidelity** | Are citations/sources traceable to the data? No extrapolation without disclosure? | 0 = No sources, 0.5 = Partial sources, 1 = Fully cited |

---

## Step 2: Create an Evaluation Rubric

### Example Rubric: Support Ticket Classification

```markdown
# Ticket Classification Evaluation Rubric

Task: Evaluate whether the AI correctly classified a support ticket.

## Dimension 1: Correctness

**Score 1 (Correct):**
- The category matches the ticket's primary issue
- If the ticket mentions multiple issues, the AI chose the most urgent one
- Example: Ticket says "can't reset password" → AI says "Account Access" ✓

**Score 0 (Incorrect):**
- The category doesn't match the ticket content
- The AI misread the ticket or hallucinated a category
- Example: Ticket says "can't reset password" → AI says "Product Feedback" ✗

## Dimension 2: Confidence Calibration

**Score 1 (Well-Calibrated):**
- High confidence (>0.85) on clear tickets; low confidence (<0.65) on ambiguous ones
- Example: "Can't log in" → confidence 0.92 ✓ (clear issue)
- Example: "Billing is confusing AND slow performance" → confidence 0.68 ✓ (ambiguous)

**Score 0.5 (Somewhat Calibrated):**
- Confidence is in the right ballpark but not precise
- Example: "Can't log in" → confidence 0.78 (should be higher)

**Score 0 (Poorly Calibrated):**
- High confidence on ambiguous tickets; low confidence on clear ones
- Example: "Can't log in" → confidence 0.50 ✗ (should be high)

## Dimension 3: Reasoning Quality

**Score 1 (Sound Reasoning):**
- The model explains its choice in a logical way
- Example: "I classified this as Account Access because the customer explicitly mentions 'password reset failure.'"

**Score 0.5 (Acceptable Reasoning):**
- The explanation is correct but generic
- Example: "This is account-related"

**Score 0 (Poor or Absent Reasoning):**
- No explanation given, or explanation contradicts the decision
- Example: "I chose Billing even though the customer is talking about account access"

## Dimension 4: Boundary Handling (Ambiguity)

**Score 1 (Handles Ambiguity):**
- When a ticket mentions multiple issues, the model explains which is primary and why
- Example: Ticket mentions billing AND technical problem → AI says "Technical Support because the billing issue is secondary to the system crash"

**Score 0.5 (Partially Handles):**
- Model picks a category but doesn't acknowledge the ambiguity

**Score 0 (Ignores Ambiguity):**
- Model confidently picks a category while ignoring conflicting signals
- Example: High confidence (0.92) on a ticket that clearly has 2 equally important issues

## Overall Score

**4/4 or 3.5/4:** Model output is production-ready
**2.5–3/4:** Model needs improvement (retrain prompt or review test cases)
**<2.5/4:** Model not ready; do not deploy
```

---

## Step 3: Build an Evaluation Tracking Sheet

Use this template to track results over time and identify patterns:

```markdown
# Evaluation Tracking: Support Ticket Classification

| Date | Ticket ID | AI Category | AI Confidence | Actual Category | Correct? (1/0) | Confidence Calibrated? | Reasoning Quality | Ambiguity Handled? | Notes |
|------|-----------|------------|---------------|------------------|---------------|--------------------|-------------------|-----------------|-------|
| 2/1 | TKT-1001 | Account Access | 0.92 | Account Access | 1 | Yes | 1 | N/A | Clear case |
| 2/1 | TKT-1002 | Billing | 0.70 | Billing | 1 | Yes | 0.5 | Yes | Generic reasoning |
| 2/1 | TKT-1003 | Tech Support | 0.88 | Account Access | 0 | No | 0 | N/A | Misread ticket |
| 2/1 | TKT-1004 | Complaint | 0.65 | Billing + Complaint | 0.5 | Yes | 1 | Yes | Ambiguous; AI picked secondary issue |
| 2/2 | TKT-1005 | Safety/Fraud | 1.0 | Safety/Fraud | 1 | Yes | 1 | N/A | Perfect detection |

## Weekly Summary (Week of 2/1)

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Accuracy (Correctness) | 80% (4/5) | ≥95% | ⚠️ Below target |
| Confidence Calibration | 80% | ≥90% | ⚠️ Below target |
| Reasoning Quality | 0.7 avg | 0.8+ | ⚠️ Below target |
| Ambiguity Handling | 100% (2/2) | ≥90% | ✓ On track |

## Root Cause Analysis

**Issue 1: Low Accuracy (80%)**
- TKT-1003 misclassified: AI confused "I can't access my account" with "I need technical support for API"
- Root cause: Prompt doesn't distinguish account access issues from technical support issues clearly
- Action: Update prompt with examples of each category

**Issue 2: Low Confidence Calibration (80%)**
- TKT-1002: Model chose correct category but with uncertain confidence (0.70)
- Root cause: Prompt doesn't ask model to be confident on straightforward cases
- Action: Add instruction: "For clear cases (one issue, straightforward language), confidence should be >0.85"

## Next Steps

- [ ] Update prompt (add disambiguating examples)
- [ ] Retrain on updated test set (10 new examples)
- [ ] Re-evaluate model on same 5 tickets; expect improvement to ≥90%
- [ ] Expand testing to 50 tickets before production deployment
```

---

## Step 4: Blind Evaluation (Gold Standard)

For high-stakes assessments, use blind evaluation:

### Blind Evaluation Protocol

1. **Prepare:** Gather 20–50 real outputs from your AI system
2. **Mask:** Remove all identifying information (ticket IDs, timestamps, model version)
3. **Randomize:** Shuffle the order; mix correct and incorrect examples
4. **Evaluate:** Have 2–3 independent evaluators score each output using the rubric
5. **Compare:** Calculate inter-rater agreement (should be >80%)
6. **Analyze:** If disagreement, discuss and refine the rubric

### Example Blind Evaluation

```markdown
Evaluator A, Evaluator B, Evaluator C: Please score each output (1–10) on Correctness.

Output #1: "I classified this as Account Access because the customer says 'can't log in'"
Evaluator A: 10 (clearly correct, well-reasoned)
Evaluator B: 10 (clearly correct, well-reasoned)
Evaluator C: 10 (clearly correct, well-reasoned)
→ Perfect agreement; move to production confidence

Output #7: "I classified this as Tech Support because it mentions an error message"
Evaluator A: 5 (ambiguous; could be account OR tech)
Evaluator B: 3 (looks like billing issue to me)
Evaluator C: 7 (leans tech support)
→ Disagreement; the output is genuinely ambiguous. Either retrain or add to "human review" tier.
```

---

## Step 5: Evaluation Automation (Scaling)

### Option 1: Human + Sampling
- [ ] Evaluate 100% of outputs for the first 2 weeks (establish baseline)
- [ ] After 2 weeks, sample 10% daily (100 tickets/day → 10 evaluated) to maintain calibration
- [ ] If drift detected (accuracy drops >5%), increase sampling to 25%

### Option 2: AI-Assisted Evaluation (Meta-Evaluation)
Use a separate AI model to evaluate your main model's output:

```markdown
Evaluator Prompt:
"You are a quality assessor. A ticket classification AI made the following decision. 
Is the classification correct? Why or why not?

Ticket: [input]
AI Output: [classification + confidence]
Actual Category: [ground truth]

Score correctness 1–10 and explain."
```

**Caveat:** AI-assisted evaluation can have blindspots; always spot-check human review quarterly.

### Option 3: Automated Test Suite
For simple tasks, build a test harness:

```python
# Test suite (pseudocode)
test_cases = [
    {
        "input": "I can't reset my password",
        "expected": "Account Access",
        "expected_confidence": (0.80, 1.0)  # range
    },
    {
        "input": "Your product is slow",
        "expected": "Product Feedback",
        "expected_confidence": (0.70, 0.95)
    }
]

for test in test_cases:
    result = classify(test["input"])
    assert result["category"] == test["expected"]
    assert test["expected_confidence"][0] <= result["confidence"] <= test["expected_confidence"][1]
```

---

## Step 6: Continuous Improvement Loop

```
Week 1–2: Establish baseline (evaluate 100% of outputs)
  ↓
Week 3+: Ongoing sampling (10% daily)
  ↓
Monthly: Aggregate results → identify top 3 errors
  ↓
Update: Retrain prompt or fine-tune model
  ↓
Re-evaluate: Test on same 50-ticket baseline → measure improvement
  ↓
Deploy: Push updated model to production
  ↓
Repeat
```

---

## Foundational Skills Checklist

- [ ] **Critical Evaluation:** Rubric defines 3+ dimensions of quality; scoring is explicit and repeatable
- [ ] **Workflow Integration:** Evaluation results feed back into prompt training; monthly retraining cycle documented
- [ ] **Prompting:** Evaluation identifies specific prompt weaknesses (e.g., "doesn't distinguish Account Access from Technical Support")
- [ ] **AI Strategy:** Evaluation metrics tie to business goal (e.g., "accuracy ≥95%" supports "reduce ticket routing time" goal)
- [ ] **Ethics & Trust:** Blind evaluation ensures fairness; inter-rater agreement >80%; results are transparent to stakeholders
