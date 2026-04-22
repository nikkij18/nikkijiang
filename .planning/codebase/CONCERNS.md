# CONCERNS.md — Technical Concerns & Debt
*Last mapped: 2026-04-22*

## High Priority

### Missing headshot image
- `components/Hero.tsx` references `src="/headshot.jpg"` which doesn't exist in `public/`
- Next.js Image will fail or show broken image in production
- **Fix:** Copy headshot to `public/headshot.jpg`

### NavBar not in root layout
- `NavBar` is rendered in `app/page.tsx` rather than `app/layout.tsx`
- When new pages (about, projects, blogs, contact) are added, each must manually include NavBar
- **Fix:** Move NavBar into `app/layout.tsx` before scaffolding additional pages

### Broken NavBar links
- NavBar links to `/about`, `/projects`, `/blogs`, `/contact` — none of these routes exist yet
- Clicking them will 404
- **Fix:** Create `app/about/page.tsx`, `app/projects/page.tsx`, etc.

## Medium Priority

### Next.js 16 — Training data gap
- `AGENTS.md` explicitly warns: "This version has breaking changes — APIs, conventions, and file structure may all differ from your training data"
- Must read `node_modules/next/dist/docs/` before writing new Next.js code
- Risk: AI-generated code may use deprecated or removed APIs

### No error pages
- No `app/not-found.tsx` or `app/error.tsx`
- Users hitting missing routes get default Next.js 404 (unstyled)

### No `<meta>` SEO beyond title/description
- `app/layout.tsx` has basic metadata but no og:image, twitter:card, canonical URL
- Portfolio sites benefit from rich social sharing previews

## Low Priority

### Default Next.js assets in public/
- `public/` contains `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` from scaffold
- Not used anywhere, should be cleaned up

### README.md is default scaffold
- Contains generic Next.js instructions, not project-specific docs

### No `.env` structure defined
- No environment variables yet, but contact form or CMS integration will need them
- No `.env.example` file to document expected variables

## No Security Concerns
- Static site with no backend, no auth, no user data
- No API routes or server actions yet
- Clean slate — introduce security considerations as features are added
