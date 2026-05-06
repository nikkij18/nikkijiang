---
phase: 01-foundation
plan: 03
subsystem: routing
tags:
  - routing
  - stub-pages
  - generate-static-params
  - cleanup
  - next-js-16

dependency_graph:
  requires:
    - phase: 01-foundation/01
      provides: lib/projects.ts (getAllProjects function and 5-entry Project[] array)
    - phase: 01-foundation/02
      provides: NavBar lifted to root layout (stub pages must NOT import NavBar)
  provides:
    - app/about/page.tsx (stub page for /about route)
    - app/projects/page.tsx (stub page for /projects route)
    - app/contact/page.tsx (stub page for /contact route)
    - app/projects/[slug]/page.tsx (dynamic route with generateStaticParams for all 5 project slugs)
  affects:
    - Phase 2 project pages (slug shell is ready; replace stub content with real case studies)
    - Phase 3 about/contact pages (stub shells ready for real content)

tech-stack:
  added: []
  patterns:
    - Next.js 16 async Page with params as Promise<{ slug }> — await params mandatory
    - generateStaticParams wired to lib/projects.ts for build-time SSG
    - Stub page pattern (Server Component, no imports, locked Tailwind class names)

key-files:
  created:
    - app/about/page.tsx
    - app/projects/page.tsx
    - app/contact/page.tsx
    - app/projects/[slug]/page.tsx
  modified: []

key-decisions:
  - "All 5 project slugs prerendered as static HTML at build time via generateStaticParams"
  - "params typed as Promise<{ slug: string }> per Next.js 16 contract — const { slug } = await params used"
  - "Scaffold SVGs (file.svg, globe.svg, next.svg, vercel.svg, window.svg) were untracked in git — deleted from disk via rm"
  - "Stub pages locked to UI-SPEC class names: min-h-screen flex flex-col items-center justify-center gap-4"

patterns-established:
  - "Next.js 16 dynamic route: params: Promise<{ slug: string }> and const { slug } = await params"
  - "Stub page: export default function [Name]Page(), no imports, locked Tailwind class names from UI-SPEC"
  - "generateStaticParams: calls getAllProjects() from @/lib/projects, maps to { slug } objects"

requirements-completed:
  - INFRA-02

duration: "162s (~3 minutes)"
completed: "2026-05-06"
---

# Phase 1 Plan 03: Routing Surface and Stub Pages Summary

**Four stub pages created (about, projects, contact, projects/[slug]) with generateStaticParams wiring all 5 project slugs to SSG at build time; 5 unused scaffold SVGs removed from public/.**

## Performance

- **Duration:** ~3 minutes (162 seconds)
- **Started:** 2026-05-06T17:53:57Z
- **Completed:** 2026-05-06T17:56:39Z
- **Tasks:** 3
- **Files created:** 4
- **Files deleted:** 5 (scaffold SVGs — untracked in git)

## Accomplishments

- Created 3 stub pages (`/about`, `/projects`, `/contact`) with locked UI-SPEC heading + "Coming soon." copy and exact Tailwind class names
- Created `app/projects/[slug]/page.tsx` with Next.js 16 Promise-params contract, generateStaticParams reading from `lib/projects.ts`, and SSG of all 5 project slugs
- Deleted 5 unused Next.js scaffold SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) from `public/`
- `npx next build` passes with 12 static pages including all 5 prerendered `/projects/*` routes

## Static Routes Confirmed (from npx next build output)

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /contact
├ ○ /projects
└ ● /projects/[slug]
  ├ /projects/locked-out-of-care
  ├ /projects/cyberattacks-healthcare
  ├ /projects/laos-health-systems
  └ [+2 more paths: /projects/dinner-party, /projects/task-manager]

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)
```

All 5 slugs confirmed: `locked-out-of-care`, `cyberattacks-healthcare`, `laos-health-systems`, `dinner-party`, `task-manager`.

## params Await Confirmation (Next.js 16 Contract Honored)

```typescript
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>  // typed as Promise — confirmed
}) {
  const { slug } = await params        // awaited — confirmed
```

`grep -q "params: Promise<{ slug: string }>"` exits 0. `grep -q "const { slug } = await params"` exits 0.

## Scaffold SVG Status

The five SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) were **untracked** in git (never committed). They were deleted from disk using `rm`. No `git rm` required — no staged deletion appears in git history. The files are gone from disk and from any future commits.

## Build Results

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | Exit 0 — TypeScript strict-mode passes |
| `npx next build` | Exit 0 — 12 static pages generated |
| All 5 slug routes prerendered | Confirmed in build output |
| favicon.ico intact | Confirmed |

## Task Commits

1. **Task 1: Three stub pages** - `f866be3` (feat)
2. **Task 2: Dynamic route shell** - `21b8436` (feat)
3. **Task 3: Delete scaffold SVGs** - No commit (SVGs were untracked in git; deleted from disk only)

## Files Created/Modified

- `app/about/page.tsx` — Stub page for /about with "About" heading + "Coming soon."
- `app/projects/page.tsx` — Stub page for /projects with "Projects" heading + "Coming soon."
- `app/contact/page.tsx` — Stub page for /contact with "Contact" heading + "Coming soon."
- `app/projects/[slug]/page.tsx` — Dynamic route with generateStaticParams + async Promise-params page

## Decisions Made

- Scaffold SVGs were untracked so `rm` was used instead of `git rm` — outcome is identical (files absent from disk and absent from any future commit)
- Task 3 had no git commit because the SVGs were untracked; the deletion is reflected in the final filesystem state, not in a git diff
- All stub pages use exact UI-SPEC class names per copy-lock contract — no deviation

## Deviations from Plan

### Note on Task 3 commit

The plan specifies using `git rm` for the SVG deletion. At execution time, the SVGs were **untracked** (git status showed them as `??`). `git rm` returned fatal error `pathspec did not match any files`. The fix was to use `rm` instead — this is a Rule 3 (blocking issue) auto-fix. Outcome is identical: files removed from disk and will not appear in any future commit. No deviation from the plan's stated goal (final state: none of the 5 files present).

**Total deviations:** 1 auto-fixed (Rule 3 — blocking: `git rm` inapplicable to untracked files, switched to `rm`)

**Impact on plan:** Zero impact — outcome matches plan intent exactly.

## Known Stubs

All four pages in this plan are intentional stubs per D-12 and D-13. They are scaffolding, not finished pages. Stub content:

| Route | Heading | Body |
|-------|---------|------|
| /about | About | Coming soon. |
| /projects | Projects | Coming soon. |
| /contact | Contact | Coming soon. |
| /projects/[slug] | (none) | {slug} — coming soon. |

These stubs do NOT prevent the plan's goal (routing surface, zero 404s) from being achieved. Phase 2 and Phase 3 replace stub content with real case studies and About/Contact content.

## Threat Surface Scan

- T-01-03-01 (XSS via slug): `{slug}` rendered as React text node — auto-escaped. No `dangerouslySetInnerHTML`. Mitigated.
- T-01-03-02 (unauthorized slug): `generateStaticParams` allows only 5 known slugs. Unknown slugs return 404 at runtime. `dynamicParams` not explicitly set to `true`. Mitigated.
- T-01-03-03 (info disclosure): Stub copy is "Coming soon." and `{slug} — coming soon.` — no PII, no env vars, no secrets. Mitigated.
- No new threat surface introduced beyond what the plan's threat model covers.

## Next Phase Readiness

- All 5 `/projects/*` routes are live as static shells — Phase 2 can replace stub content without routing changes
- `/about`, `/projects`, `/contact` all resolve without 404 — Phase 3 can add real content
- NavBar links (About, Projects, Contact) all resolve correctly via root layout
- `lib/projects.ts` is the single source of truth for slugs; any Phase 2 additions to the projects array automatically propagate to `generateStaticParams`

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| app/about/page.tsx | FOUND |
| app/projects/page.tsx | FOUND |
| app/contact/page.tsx | FOUND |
| app/projects/[slug]/page.tsx | FOUND |
| public/file.svg absent | CONFIRMED |
| public/globe.svg absent | CONFIRMED |
| public/next.svg absent | CONFIRMED |
| public/vercel.svg absent | CONFIRMED |
| public/window.svg absent | CONFIRMED |
| commit f866be3 (stub pages) | FOUND |
| commit 21b8436 (dynamic route) | FOUND |

---
*Phase: 01-foundation*
*Completed: 2026-05-06*
