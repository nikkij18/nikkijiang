# RESEARCH SUMMARY — nikkijiang Portfolio
*Synthesized from STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md*

## Executive Summary

Static Next.js 16 portfolio targeting one audience: Mount Sinai Digital Global Health internship reviewers. Must establish Nikki as "data storyteller who makes complex health systems legible for non-technical audiences" — not a generic designer. The existing codebase has a home page with NavBar and Hero, but zero working routes beyond `/`, a broken headshot, and hero copy signaling the wrong identity. Fix those three problems before building anything else.

**Locked Out of Care is the anchor.** It demonstrates rare combination of health domain knowledge, data visualization, and interactive storytelling. Every decision should serve making that piece land. Research papers (Cyberattacks, Laos) are secondary but meaningful if presented as case studies. Creative projects (Dinner Party, Task Manager) evidence technical execution — shorter treatment.

Hard deadline: this week. All content is static, all 5 projects are known.

## Stack Decision

**Use:** Existing Next.js 16 + TypeScript + Tailwind v4 stack. `lib/projects.ts` + `lib/types.ts` for typed static project data. `next/image` with defined aspect ratios. `generateStaticParams` for `/projects/[slug]`. CSS transitions only. PDFs from `public/files/`. Vercel deployment.

**Avoid:** MDX, `output: 'export'`, Framer Motion (defer), iframe PDF embeds, contact forms, `"use client"` on parent components.

**Critical Next.js 16 gotchas:**
1. `params` is a Promise — `const { slug } = await params`
2. Tailwind v4 is CSS-first — no `tailwind.config.*`, config in `globals.css`
3. `generateStaticParams` replaces `getStaticPaths`
4. Verify `postcss.config.mjs` exists before building

## Top 5 Table-Stakes Features

1. Named projects with thumbnail + 1-line description visible on the index
2. Per-project role + context + problem statement at top of every case study
3. About page with positioning statement, health connection, and resume download
4. Visible email address on contact page as plain text (no form)
5. Mobile-usable, fast load

## Top 5 Differentiators (Health Internship Context)

1. Locked Out of Care framed as methodology (scrollytelling for comparative health data) — not just a project
2. Consistent identity statement: "data storyteller who makes complex health systems legible" — same sentence in hero, About, meta description
3. Research papers as case studies (question → method → findings → implications → PDF) — not PDF links
4. Health domain vocabulary used precisely: "carceral health," "comparative health systems," "digital health infrastructure"
5. Projects index framed as curated body of work — 2–3 sentence framing, intentional order

## Top 5 Pitfalls (By Risk)

1. **Hero says wrong identity** — `Hero.tsx` says "Product Designer" / "interested in product management" — fix before anything else
2. **NavBar links 404** — `/about`, `/projects`, `/contact` don't exist; "Blogs" in NavBar is out of scope; NavBar not in root layout
3. **Headshot missing** — `public/headshot.jpg` does not exist; Hero centers on it
4. **Research papers as PDF links** — dead ends unless wrapped in case-study structure
5. **About page restates resume** — must open with positioning statement, not credentials

## Architecture

**Routes:**
```
app/page.tsx                  → /
app/about/page.tsx            → /about
app/projects/page.tsx         → /projects
app/projects/[slug]/page.tsx  → /projects/[slug] (all 5 via generateStaticParams)
app/contact/page.tsx          → /contact
```

**Content pattern:** Single `[slug]/page.tsx` template; `<ProjectLinks>` component reads `contentType` to render right CTA (live URL / PDF / GitHub).

**Project data schema fields:** `slug`, `title`, `subtitle?`, `contentType`, `tags`, `featured`, `shortDescription`, `longDescription`, `coverImage`, `images?`, `liveUrl?`, `pdfUrl?`, `githubUrl?`, `year`, `role`, `tools`, `status`, `metaDescription`

**Build:** Full SSG, no ISR, no `output: 'export'`, Vercel.

## MVP Sequencing (Suggested Phase Order)

| Phase | Focus | Pitfalls Addressed |
|-------|-------|--------------------|
| 1 | Fix broken foundation (Hero, NavBar, headshot, metadata, stubs) | #1, #2, #3 |
| 2 | Projects index + data layer (`lib/projects.ts`, cards, ordering) | — |
| 3 | Locked Out of Care case study (signature piece, full treatment) | #4 |
| 4 | About page (positioning statement leads, resume download, photo) | #5 |
| 5 | Contact + research case studies (Cyberattacks, Laos) | #4 |
| 6 | Polish: Dinner Party + Task Manager, image optimization | — |

## Open Questions (Resolve Before Building)

- Does `postcss.config.mjs` exist? (Tailwind v4 won't compile without it)
- Is Locked Out of Care hosted or can be hosted on Vercel before building its case study page?
- What format/dimensions is the headshot available in?
- Are PDF files for Cyberattacks and Laos papers available?
- Are cover images available for all 5 projects?
