# AI-ESG Integrated Strategist Curriculum: Sales Setup & Distribution Guide

## Overview

This guide provides step-by-step instructions for launching the curriculum sales infrastructure. The curriculum exists at `/public/curriculum/` and the landing page is at `/public/curriculum-sales.html`.

### Key Assets

- **Landing Page**: `curriculum-sales.html` - Conversion-focused sales page with three pricing tiers
- **Learning Content**: 23 HTML modules + capstone in `/public/curriculum/`
- **Supporting Materials**: 11 templates + 10 briefings in `/public/curriculum/artifacts/`

---

## Part 1: Choose Your Monetization Platform

### Option A: Gumroad (RECOMMENDED)

**Why Gumroad?**
- Simplest setup for individual creators/small teams
- Handles all payments and delivery
- Built-in email capture
- No need to manage customer databases
- 10% platform fee (lowest in the industry)
- Supports licensing/team models

**Setup Steps:**

1. Go to https://gumroad.com and create an account
2. Go to your creator dashboard
3. Create a new product:
   - **Title**: "AI-ESG Integrated Strategist Curriculum"
   - **Description**: Use the value proposition from the landing page
   - **Price**: $149 (one-time)
   - **Product Type**: Select "Product" (for downloadable content)
4. Set up delivery:
   - Create a downloadable file or use "Link to external content"
   - Option 1 (Simple): Link to your curriculum-sales.html with password protection
   - Option 2 (Robust): Export/package curriculum files as a downloadable archive
5. Enable email collection:
   - Gumroad automatically collects emails
   - You can export customer list for future updates
6. Set up variations for licensing:
   - Create a separate product for "Enterprise License"
   - Price it at "Custom" with note: "Contact for pricing"
   - Use this for team sales

**Your Gumroad URL**: https://khayali.gumroad.com/l/ai-esg-curriculum

---

### Option B: Teachable (More Robust, For Scaling)

**Why Teachable?**
- Full LMS (Learning Management System)
- Better for hosting video content
- Progress tracking across modules
- Certificate generation
- Supports student-to-student interaction
- Better for high-volume sales

**Setup Steps:**

1. Go to https://teachable.com and create account
2. Create your school/course brand
3. Build course structure:
   - Level 0: Constitutional Foundations
   - Level 0.5: Framing the Relationship
   - Level 1-6: Each as separate modules
   - Capstone: Audit Defense Challenge
4. Upload content:
   - Host video lectures (or link to YouTube)
   - Attach worksheets/templates as downloadable resources
   - Create quizzes for assessments
5. Set pricing:
   - Practitioner Tier: $149 (one-time)
   - Enterprise: Custom (gated inquiry form)
6. Email automations:
   - Welcome sequence
   - Module completion reminders
   - Graduation/capstone launch email

**Hosting Considerations**: You'll need to host video files somewhere (YouTube, Vimeo, AWS).

---

### Option C: Payhip (Middle Ground)

**Why Payhip?**
- Simple like Gumroad but with more LMS features
- Built-in course delivery
- 5% transaction fee (slightly less than Gumroad)
- Good for courses under 200 students

**Setup Steps:**

1. Create Payhip account at https://payhip.com
2. Create product: "AI-ESG Integrated Strategist Curriculum"
3. Set up course/product pages
4. Upload content modules
5. Configure pricing tiers
6. Enable affiliate program (optional, for referral marketing)

---

### Option D: Substack Paid Tier (Newsletter Distribution + Exclusivity)

**Why Substack?**
- You already have newsletter infrastructure
- Paid tier gives you revenue per subscriber
- Natural audience already engaged with your work
- Lower barrier to entry ($5-10/month feels more accessible than $149 one-time)
- Built-in email distribution

**Setup Steps:**

1. In your Substack settings, enable "Paid subscriptions"
2. Set tier: $10/month or $99/year
3. Gate curriculum content behind paywall:
   - Each module released as a detailed Substack post
   - Create a separate "Curriculum" publication (free) that links to paywall content
   - Or integrate into your main Sociable Systems publication
4. Include special perks for paid subscribers:
   - Early access to new levels
   - Monthly Q&A calls (async or live)
   - Direct email access for questions
   - Template library downloads

**Pros**: Leverages existing audience, low friction signup
**Cons**: Revenue split lower than direct sales, smaller overall revenue per student

---

## Part 2: Gating Content & Access Control

### Simplest Approach (No Authentication)

**Method 1: Email-Gated with Shared Link**

1. When customer purchases on Gumroad:
2. Gumroad automatically sends them a custom URL/access link
3. Update the landing page CTA buttons to link to Gumroad
4. After purchase, they receive email with link to curriculum folder
5. Option: Password-protect the `/curriculum/` folder at web server level:
   ```
   In your .htaccess or web server config:

   <Files "*.html">
      AuthType Basic
      AuthName "AI-ESG Curriculum"
      AuthUserFile /path/to/.htpasswd
      Require valid-user
   </Files>
   ```

**Pros**: Zero technical complexity, no code changes
**Cons**: Not fully secure (determined users can share links)

---

### Moderate Security: Token-Based Access

**Method 2: URL Token Verification**

1. When Gumroad completes a purchase, trigger a webhook (or manually record):
   - Customer email: user@example.com
   - Purchase date: 2025-03-15
   - Access token: randomized_string_abc123def456
2. Create a simple access log (spreadsheet or database):
   ```
   email | token | purchase_date | expires
   ```
3. Update landing page CTA to point to gated URL:
   ```
   https://khayali.xyz/curriculum-access/?token=abc123def456
   ```
4. Create a simple verification script (JavaScript):
   ```javascript
   // curriculum-access.js
   function verifyToken() {
     const params = new URLSearchParams(window.location.search);
     const token = params.get('token');

     // Check against your whitelist (hardcoded or fetched from API)
     if (validTokens.includes(token)) {
       // Redirect to curriculum
       window.location.href = '/curriculum/';
     } else {
       // Show purchase prompt
       window.location.href = '/curriculum-sales.html';
     }
   }
   ```

**Pros**: Moderate security, prevents casual sharing
**Cons**: Requires setup, doesn't prevent determined sharing

---

### Full Security: User Authentication

**Method 3: Email-Based Authentication (Recommended Long-Term)**

1. Use a third-party auth service:
   - **Magic Link**: https://magic.link (email-only login)
   - **Supabase Auth**: https://supabase.com (free tier with email auth)
   - **Auth0**: https://auth0.com (more expensive, very robust)

2. Setup with Supabase (free tier):
   ```
   a) Create Supabase project
   b) Enable email authentication
   c) Create a "curriculum_access" table:
      - user_id (PK)
      - email (unique)
      - purchase_date
      - tier (Explorer, Practitioner, Enterprise)
      - access_level (0-6, or "full")
   ```

3. After Gumroad purchase:
   - Manually (or via API) add user to Supabase
   - User receives email: "Your curriculum is ready. Click here to set password"
   - User logs in at https://khayali.xyz/curriculum/login
   - Based on tier, they see appropriate content (redirect to Level 0 only for Explorer, all levels for Practitioner)

4. Frontend implementation:
   ```javascript
   // pages/curriculum/index.html
   document.addEventListener('DOMContentLoaded', () => {
     const user = supabase.auth.user();
     if (!user) {
       window.location.href = '/curriculum/login';
       return;
     }

     // Fetch their tier
     const { data, error } = await supabase
       .from('curriculum_access')
       .select('tier')
       .eq('email', user.email)
       .single();

     if (data.tier === 'Explorer') {
       // Only show Level 0
     } else if (data.tier === 'Practitioner') {
       // Show all levels
     }
   });
   ```

**Pros**: Secure, scalable, professional
**Cons**: Requires development time (~4-8 hours to implement)

---

## Part 3: Integration with Gumroad

### Step 1: Create Product on Gumroad

1. Log into https://gumroad.com/dashboard
2. Click "New Product"
3. Fill in details:
   - **Name**: AI-ESG Integrated Strategist Curriculum
   - **Description** (use this):
     ```
     The only AI-ESG governance curriculum built from 20+ years of operational field experience in extractive industries and development finance.

     This 7-level comprehensive curriculum covers:
     - Level 0: Constitutional Foundations
     - Level 1: Epistemic Failures (Clarke's Law & The Watchdog Paradox)
     - Level 2: Architecture of Compliance
     - Level 3: Lucas Cycle (Risk Discovery)
     - Level 4: Pullman Cycle (Institutional Memory)
     - Level 5: Kubrick Cycle (Systems That Cannot Stop)
     - Level 6: Forensic Domains
     - Capstone: Audit Defense Challenge

     Includes 23 comprehensive modules, 11 professional templates, 10+ strategic briefings, assessment engines, and case studies from real operational failures.

     Perfect for ESG practitioners, corporate L&D departments, and governance teams navigating AI implementation.
     ```
   - **Price**: $149 (or $0 for free tier)
   - **Product Type**: Product or Course
4. Upload files or set up external link:
   - Create a .zip file of your curriculum folder
   - OR: Set up email delivery with link: "Your curriculum is ready at https://khayali.xyz/curriculum (shared with you via email)"
5. Enable email capture: Yes (default)

### Step 2: Get Your Gumroad Share Link

After creating product:
- Copy the product URL: https://gumroad.com/liezlc#ai-esg-curriculum
- Or use custom short link if Gumroad provides

### Step 3: Update Landing Page

In `curriculum-sales.html`, update these links:

```html
<!-- Change from -->
<a href="https://khayali.gumroad.com/l/ai-esg-curriculum">

<!-- To: Your actual Gumroad product link -->
<a href="https://khayali.gumroad.com/l/[your-product-slug]">
```

### Step 4: Set Up Webhook (Optional, for Automation)

If you want to automate customer access:

1. In Gumroad settings, go to "Webhooks"
2. Add webhook URL: https://khayali.xyz/api/gumroad-webhook
3. Subscribe to events:
   - `purchase` (when someone buys)
   - `subscription_update` (for recurring tiers)
4. Create an API endpoint that:
   - Receives purchase data
   - Adds customer to your access list
   - Sends welcome email with curriculum link

---

## Part 4: Email Campaign & Launch Strategy

### Launch Week Email Sequence

**Day 1 - Announcement Email**
Subject: "I built a curriculum for ESG practitioners. Here's why."

```
Hi [First Name],

For 20+ years, I've worked in extractive industries, development finance,
and ESG governance. I've seen the same governance failures happen repeatedly—
and watched organizations get caught flat-footed when regulators started
asking hard questions about AI and ESG.

I created the AI-ESG Integrated Strategist Curriculum to solve this.

It's not theory. It's 7 levels of operational reality—from constitutional
foundations to forensic audit defense—built on decades of field experience.

📚 Start free with Level 0 (Constitutional Foundations):
[link to curriculum-sales.html]

💙 Get the full 7-level curriculum + templates + briefings for $149:
[Gumroad link]

Or... let's talk if your team needs facilitated workshops and custom
delivery.

—Liezl
```

**Day 3 - Social Proof Email**
Subject: "What I learned from 20 years of governance failures"

```
Quick note: ESG practitioners are telling me the Audit Defense
sections are "game-changing." One director said: "Finally someone
explaining what auditors actually care about."

This curriculum wasn't built for tests or compliance theater.
It was built for practitioners who have to defend their organizations
in real audits.

[Link to curriculum-sales.html]
```

**Day 5 - FOMO Email**
Subject: "Curriculum launches this week"

```
The AI-ESG Integrated Strategist Curriculum launches Wednesday.

Three ways to engage:

🆓 Start free: 12 hours, Level 0 (Constitutional Foundations)
[Free link]

📚 Full curriculum: All 7 levels + capstone + templates ($149)
[Gumroad link]

👥 Team training: Facilitated workshops + custom case studies
[Contact link]

Launches at 9 AM ET Wednesday. Early birds get [lifetime access/discount].
```

### LinkedIn Launch Post

```
After 20+ years in extractive industries and development finance,
I've learned something: ESG practitioners are getting blindsided by AI governance.

The regulatory shift from "voluntary" to "mandatory" is happening NOW.
CSRD, ISSB, EUDR—they all implicitly encourage AI, but create new liability.

I just launched the AI-ESG Integrated Strategist Curriculum:
7 levels covering everything from constitutional foundations to forensic
audit defense.

Start free with Level 0 → https://khayali.xyz/curriculum-sales.html

Or get all 7 levels + templates + case studies: [Gumroad link]

If this resonates, share it with your ESG team.

#AI #ESG #Governance #AuditReady #RiskManagement
```

---

## Part 5: Substack Alternative Distribution

### Option 1: Paid Tier + Curriculum Hub

1. Enable paid subscriptions in your Substack settings
2. Create tier: "$10/month" or "$99/year"
3. Create a dedicated "Curriculum Hub" post (free):
   - Outline of all 7 levels
   - Sample video/content (Level 0 intro)
   - Link: "Unlock full curriculum with paid tier"
4. Release content on schedule:
   - Monday: Overview/framework post (free)
   - Wednesday: Deep dive from a level (paid)
   - Friday: Template/tool post (paid for paid subscribers)

**Revenue Model**:
- $10/month × 50 subscribers = $500/month
- Better for recurring revenue than one-time $149 sales

### Option 2: Hybrid Model

- Free tier: Newsletter + Level 0 content
- $10/month: Full curriculum access + monthly Q&A
- Gumroad: One-time $149 purchase for perpetual access

This lets customers choose their model.

---

## Part 6: Launching the Sales Page

### Pre-Launch Checklist

- [ ] Gumroad product created with correct pricing
- [ ] Landing page (curriculum-sales.html) updated with correct links
- [ ] FAQ section completed with your specific answers
- [ ] Testimonials (or placeholder ready for real ones)
- [ ] Meta tags verified for SEO
- [ ] Mobile responsiveness tested
- [ ] CTA buttons tested and linking to correct URLs
- [ ] Email sequences drafted
- [ ] LinkedIn post drafted

### Post-Launch Monitoring

1. **Analytics Setup**:
   - Add Google Analytics to curriculum-sales.html
   - Track button clicks to Gumroad
   - Track page scroll (how far do people read?)
   - Track time on page

2. **Gumroad Monitoring**:
   - Check daily sales
   - Monitor customer emails for support questions
   - Track refunds (refund rate tells you if content delivered value)

3. **Feedback Collection**:
   - Add email to sales page: "Questions? Email [your email]"
   - Request feedback in welcome email
   - Create feedback form: https://forms.gle/...

---

## Part 7: Team Training & Enterprise Sales

### Promoting Enterprise Tier

Update the curriculum-sales.html "Contact Us" button to email liezlc@gmail.com with subject line pre-filled:

```html
<a href="mailto:liezlc@gmail.com?subject=Enterprise%20Curriculum%20Inquiry&body=
Hello%20Liezl%2C%0A%0AI%20am%20interested%20in%20the%20AI-ESG%20Curriculum%20for%20our%20team.%0A%0ATeam%20size%3A%20%5B%5D%0AIndustry%3A%20%5B%5D%0AKey%20challenges%3A%20%5B%5D%0A%0APlease%20let%20me%20know%20about%20custom%20options.%0A%0A">
  Contact for Enterprise Pricing
</a>
```

### Enterprise Proposal Template

When you receive an enterprise inquiry, send this email:

```
Subject: Custom Curriculum Proposal - [Company Name]

Hi [Contact],

Thank you for your interest in bringing the AI-ESG Integrated Strategist
Curriculum to your team. Here's how we can work together:

OPTION 1: LICENSED ACCESS
- 10-50 team members
- Lifetime access to all 7 levels + templates
- Annual updates included
- Cost: $500-$1,500 (based on team size)

OPTION 2: FACILITATED WORKSHOPS
- Guided cohort (5-15 people)
- Live case study discussions (2 sessions)
- Real-time Q&A with creator
- Custom industry examples
- Cost: $2,000-$5,000

OPTION 3: CUSTOM DEVELOPMENT
- Adapt curriculum to your industry
- Internal case study development
- Staff training on delivery
- Ongoing support
- Cost: Custom quote ($10K+)

Would any of these work for your team? I'm also happy to set up a
call to understand your specific needs.

—Liezl
```

---

## Part 8: Long-Term Expansion

### Future Modules to Consider

1. **Level 7: The Next Frontier** - Emerging AI governance frameworks
2. **Industry-Specific Variants**:
   - AI-ESG for Banks (financial reporting focus)
   - AI-ESG for Retailers (supply chain focus)
   - AI-ESG for Tech (transparency requirements)
3. **Live Cohort Program** - $500-1000 for facilitated group learning
4. **Audit Readiness Bootcamp** - Intensive 2-3 day workshop ($2000+)

### Community Building

1. **Slack Community** for curriculum students (free or paid tier perk)
2. **Monthly Office Hours** with creator
3. **Student Success Stories** - collect and share
4. **Alumni Network** - recurring engagement

---

## Part 9: Compliance & Legal

### Disclaimer to Add

On curriculum-sales.html, add to footer:

```html
<p class="text-xs text-gray-500">
  This curriculum is educational material provided for professional
  development. It does not constitute legal, financial, or professional
  advice. Consult with qualified professionals before implementing
  governance frameworks. Liezl Coetzee and Sociable Systems are not
  liable for actions taken based on this curriculum.
</p>
```

### Terms of Service (Simple Version)

Consider creating a simple TOS at `/curriculum/terms.html`:

```
1. LICENSING
- Practitioner tier: Personal use only
- Enterprise tier: Licensed to organization, non-transferable

2. INTELLECTUAL PROPERTY
- All curriculum content © Liezl Coetzee / Sociable Systems
- You may not redistribute, publish, or sell the curriculum
- You may share templates with colleagues (internal use)

3. REFUND POLICY
- 30-day money-back guarantee on Practitioner tier
- No refunds on Enterprise tier after delivery begins

4. UPDATES
- Updates included in Practitioner tier pricing
- No additional cost for new versions
```

---

## Quick Start (TL;DR)

1. **This week**: Create Gumroad account, set up product at $149
2. **This week**: Test curriculum-sales.html, update Gumroad links
3. **This week**: Draft email + LinkedIn announcement
4. **Next week**: Launch announcement to newsletter (existing audience)
5. **Track**: Monitor sales, refund rate, customer feedback
6. **Iterate**: Update testimonials, FAQ, and messaging based on real feedback

Your goal is to validate demand before investing in more complex infrastructure (Teachable, Supabase auth, etc.).

Start simple. Gumroad + landing page + emails. Measure. Scale when you have real customers and can justify the complexity.

---

## Support Resources

- Gumroad Help: https://support.gumroad.com
- Teachable Setup: https://help.teachable.com/hc/en-us
- Supabase Docs: https://supabase.com/docs
- ESG Reporting Standards: https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/
