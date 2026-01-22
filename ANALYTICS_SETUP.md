# Analytics Setup Guide

This document explains the analytics options available for khayali.xyz.

## Current Setup: Vercel Analytics (Installed)

✅ **Already configured** - will work automatically when deployed to Vercel.

### What You Get:
- Page views
- Top pages
- Visitor locations (countries)
- Traffic sources (referrers)
- Device types (desktop/mobile)
- Real-time data

### How to View:
1. Deploy your site to Vercel
2. Go to your Vercel dashboard
3. Click on your project → Analytics tab
4. Data starts collecting immediately

**Cost**: Free tier includes 2,500 events/month (more than enough to start)

---

## Alternative: Google Analytics 4 (Optional)

If you want more detailed analytics or already use Google Analytics, here's how to add it:

### Step 1: Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property
3. Get your Measurement ID (looks like `G-XXXXXXXXXX`)

### Step 2: Install the Package

```bash
npm install @next/third-parties
```

### Step 3: Add to Your Layout

Update `src/app/layout.tsx`:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

### Step 4: Add Environment Variable (Optional but Recommended)

Create `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Then use in layout:
```typescript
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
```

### What You Get with GA4:
- Everything Vercel Analytics provides, plus:
- User demographics (age, gender, interests)
- Conversion tracking
- Custom events
- E-commerce tracking (if needed later)
- Much more detailed reports
- Integration with Google Ads

---

## Recommendation

**Start with Vercel Analytics** (already set up!)
- It's already working
- No configuration needed
- Perfect for tracking initial growth
- Privacy-friendly (no cookie consent needed in most regions)

**Add Google Analytics later if you need:**
- Deeper demographic insights
- Custom event tracking
- Integration with other Google tools
- More detailed user journey analysis

---

## Privacy Considerations

Both tools are privacy-friendly:
- **Vercel Analytics**: Doesn't use cookies, fully GDPR compliant
- **GA4**: Can be configured to respect user privacy, but you may want to add a cookie consent banner for EU visitors if you add it

---

## Tracking Key Metrics for Your Newsletter

What to watch as you share the site:

1. **Page Views** - Which episodes are most popular?
2. **Traffic Sources** - Where are people finding you? (LinkedIn, direct, etc.)
3. **Location** - Where is your professional audience based?
4. **Bounce Rate** - Are people reading through episodes or leaving quickly?
5. **Top Pages** - Which research areas get the most traction?

You can track the LinkedIn newsletter button clicks by adding custom events later if needed.

---

## Need Help?

Just ask Claude to help you:
- Set up custom event tracking
- Add Google Analytics 4
- Create custom analytics dashboards
- Track specific actions (like newsletter subscription clicks)
