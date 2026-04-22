# INTEGRATIONS.md — External Services & APIs
*Last mapped: 2026-04-22*

## Current Integrations

### Google Fonts
- **Used for:** Geist font family
- **Integration:** `next/font/google` (auto-hosted by Next.js, no external request at runtime)
- **Location:** `app/layout.tsx`

## No Other Integrations (yet)
This is a greenfield portfolio site with no external APIs, databases, auth, analytics, or third-party services currently wired up.

## Anticipated Future Integrations
Based on the project type (personal portfolio for a Georgetown product design student):

- **Contact form:** Will likely need an email service (Resend, SendGrid, or Formspree)
- **Analytics:** Possibly Vercel Analytics or Plausible (privacy-friendly)
- **CMS:** Portfolio projects may be stored in a headless CMS or Notion
- **Deployment:** Likely Vercel (standard for Next.js projects)

## Public Assets
- `public/` directory exists with default Next.js SVG assets
- No custom assets yet (headshot image needs to be added at `public/headshot.jpg`)
