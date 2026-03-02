# Prompting Toolkit: Intent-First Design

**Use this toolkit to craft and evolve prompts across models and modalities. Output: 1 prompt library per use case.**

---

## What Is Intent-First Prompting?

Intent-first prompting starts with **what you want the AI to do** and **why**, then works backward to the words. It's model-agnostic—the same intent strategy works for Claude, Gemini, ChatGPT, or any multimodal system.

Key principle: **The prompt is a contract.** You specify what success looks like; the model delivers to spec.

---

## Step 1: Define Intent (The Why)

### Intent Statement Template
```
**Task:** [What is the AI doing? Be specific.]
Example: "Classify customer support tickets into 1 of 8 predefined categories."

**Success Criteria:** [How will you know it worked?]
Example: "Accuracy ≥95%, no hallucinations about categories not in the list, confidence score <0.7 triggers human review."

**Failure Mode:** [What's the worst error?]
Example: "Confidently assigning a safety-critical issue (injury, fraud) to 'general inquiry'."

**Context:** [Who uses this output? Why does it matter?]
Example: "Support team routes tickets. Wrong routing wastes 20 min/ticket and frustrates customers."
```

---

## Step 2: Craft the Instruction (Model-Agnostic Core)

Use this template regardless of which model you're using:

### Core Instruction Template

```markdown
You are a [ROLE: expert ticket classifier / data analyst / etc.].

**Your task:** [TASK: classify the following support ticket into 1 of these categories]

**Categories (use only these):**
1. Billing & Payment
2. Technical Support
3. Account Access
4. Product Feedback
5. Complaint / Escalation
6. General Inquiry
7. Other
8. Safety / Fraud (escalate immediately)

**Instructions:**
- Read the customer message carefully.
- Identify the PRIMARY issue (if multiple topics, choose the most urgent).
- Respond in JSON format only: {"category": "...", "confidence": 0.0-1.0, "reasoning": "..."}
- If the message doesn't fit any category, respond: {"category": "Other", "confidence": ..., "reasoning": "..."}
- If ANY mention of safety (injury, fraud, threats), immediately classify as "Safety / Fraud" and STOP.

**IMPORTANT:**
- Do NOT invent categories.
- Do NOT explain beyond the JSON response.
- Confidence must reflect your certainty (0.7+ = high confidence, <0.5 = uncertain, trigger human review).

**Ticket:**
[INSERT TICKET TEXT HERE]
```

---

## Step 3: Model-Specific Adjustments

### For Claude (Anthropic)

**Strengths:** reasoning, nuance, instruction-following  
**Adjustments:**
- Use clear structural language ("You are X. Your task is Y.")
- Ask for reasoning; Claude excels at explanation.
- Add a "think step-by-step" phrase for complex tasks.

**Tweaked instruction for Claude:**
```markdown
You are an expert customer support analyst. Your task is to classify support tickets.

[Same categories and instructions as above, plus:]

Before responding, think through your reasoning:
1. What is the PRIMARY issue the customer is describing?
2. Which category fits best?
3. How confident are you (0.0-1.0)?

Then respond in JSON format: {"category": "...", "confidence": ..., "reasoning": "..."}
```

### For GPT-4 / ChatGPT

**Strengths:** speed, diverse modalities  
**Adjustments:**
- Be more explicit about JSON formatting (ChatGPT can be loose with format).
- Use system/user message structure if available.

**Tweaked instruction for ChatGPT:**
```markdown
System: You are a customer support ticket classifier. You classify tickets into exactly one category.

User: 
[Same core instruction, with emphasis on JSON structure]

You MUST respond with valid JSON only:
{
  "category": "[exact category name from list]",
  "confidence": 0.0-1.0,
  "reasoning": "[2-3 sentence explanation]"
}
```

### For Gemini (Google)

**Strengths:** multimodal, real-time data  
**Adjustments:**
- Gemini handles multimodal well; if you have images/docs, include them.
- Be explicit about safety boundaries.

**Tweaked instruction for Gemini:**
```markdown
Role: You are a content classifier.
Task: Classify the following input into one of these categories: [list].
Safety rule: If any input mentions harm, injury, or fraud, classify as "Safety / Fraud" immediately.
Output format: JSON only.
```

---

## Step 4: Test & Iterate (The Evaluation Loop)

### Test Dataset
Create 5-10 labeled examples that cover:
- [ ] Straightforward case (clear category)
- [ ] Ambiguous case (could fit 2 categories)
- [ ] Rare/edge case (unusual request)
- [ ] Safety/fraud case
- [ ] Out-of-scope case (should be "Other")

### Evaluation Matrix

| Test Case | Input | Expected Output | Claude Output | GPT-4 Output | Gemini Output | Notes |
|-----------|-------|-----------------|----------------|----------------|----------------|-------|
| 1. Straightforward | "I can't log in" | Account Access / 0.95 | ✓ / 0.92 | ✓ / 0.88 | ✓ / 0.91 | All good |
| 2. Ambiguous | "Bill wrong & can't login" | Billing / 0.65 | Billing/0.70 | Account/0.68 | Billing/0.65 | Gemini & Claude agree |
| 3. Rare case | "API returned error 503" | Tech Support / 0.8 | Tech/0.82 | Tech/0.78 | Tech/0.75 | All classify correctly |
| 4. Safety | "Someone stole my password" | Safety / Fraud / 1.0 | ✓ / 1.0 | ✓ / 1.0 | ✓ / 1.0 | Perfect |
| 5. Out-of-scope | "How's the weather?" | Other / 0.9 | Other/0.88 | Other/0.92 | Other/0.85 | All good |

### Iteration Rules

**If accuracy <95%:**
1. Add clarifying examples to the prompt (show the model a category it confused).
2. Adjust the instruction language (e.g., "Safety is ANY mention of injury, fraud, or threat").
3. Try a different model (Claude for nuance, GPT-4 for speed).

**If confidence scores are wildly different across models:**
1. Increase the specificity of the prompt.
2. Ask the model to "explain first, then classify" (forces reasoning).

---

## Step 5: Deploy & Monitor (Continuous Learning)

### Monitoring Dashboard

```markdown
**Prompt Performance (Weekly)**

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Accuracy | ≥95% | 94.2% | ⚠️ Declining |
| Confidence (avg) | ≥0.85 | 0.78 | ⚠️ Drift |
| Hallucinations | 0 | 2/500 | ✓ Acceptable |
| Human override rate | <5% | 3.2% | ✓ Good |

**Recent Changes:**
- Model upgraded to Opus 4.5 (2/1). Accuracy dropped 1.5%; investigating prompt compatibility.

**Next Action:**
- Retrain prompt for Opus 4.5 using updated test set.
```

### Quarterly Prompt Refresh

Every 3 months, review:
- [ ] Model accuracy drift (new model versions may need prompt tweaks).
- [ ] Category distribution changes (new ticket types emerging?).
- [ ] User feedback on misclassifications (add examples to prompt).
- [ ] Cost/latency (should we switch models?).

---

## Prompt Library Template

Keep all production prompts in a single document (or database) for version control and comparison:

```markdown
# Production Prompts (2026 Q1)

## Prompt v2.3: Support Ticket Classification
**Created:** 2026-01-15  
**Last Updated:** 2026-02-01  
**Model(s):** Claude 3.5 Sonnet (primary), GPT-4 (backup)  
**Accuracy:** 94.8% (100 test cases)  
**Status:** ACTIVE

**Full Prompt:**
[Paste complete prompt here]

**Test Results:**
[Link to evaluation matrix]

**Known Issues:**
- Gemini 3.0 struggles with "Technical Support vs. Product Feedback" distinction; not recommended for this task.

**Next Review:** 2026-05-01

---

## Prompt v2.2: Support Ticket Classification (DEPRECATED)
**Retired:** 2026-02-01  
**Reason:** Accuracy <92% with new model releases.  
**Archive:** [Link to archived version]
```

---

## Foundational Skills Checklist

- [ ] **Prompting:** Intent clearly stated, instruction model-agnostic, test cases documented
- [ ] **Critical Evaluation:** Accuracy measured, confidence scores validated, edge cases tested
- [ ] **Workflow Integration:** Prompt versioned, handoff to human review defined (e.g., confidence <0.7)
- [ ] **AI Strategy:** Prompt supports business goal (ROI, risk threshold, compliance requirement)

---

## Quick Reference: Prompt Dos & Don'ts

| Do | Don't |
|----|----|
| Be specific ("classify into 8 categories") | Be vague ("improve the process") |
| Show examples | Assume the model knows your context |
| Define success criteria | Guess whether it worked |
| Version your prompts | Change them randomly |
| Test on realistic data | Test on toy examples |
| Monitor drift over time | "Set and forget" |
| Iterate based on failures | Blame the model for ambiguity |
| Ask for JSON/structured output | Accept free-form text |
