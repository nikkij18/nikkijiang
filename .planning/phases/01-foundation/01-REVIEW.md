---
phase: 01-foundation
reviewed: 2026-05-06T00:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - lib/types.ts
  - lib/projects.ts
  - components/Hero.tsx
  - components/NavBar.tsx
  - app/layout.tsx
  - app/page.tsx
  - app/about/page.tsx
  - app/projects/page.tsx
  - app/contact/page.tsx
  - app/projects/[slug]/page.tsx
findings:
  critical: 0
  warning: 3
  info: 3
  total: 6
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-05-06
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

Ten files from the Phase 1 foundation were reviewed: the type definitions, the projects data layer, Hero and NavBar components, the root layout, the home page, three stub pages (About, Projects, Contact), and the dynamic project detail page. The data model in `lib/types.ts` is clean and well-structured. The root layout correctly hoists NavBar. Stub pages are appropriate for this phase.

The main concern is the dynamic route handler (`app/projects/[slug]/page.tsx`): it generates static params but does not perform a slug lookup in the page body, so invalid slugs silently render a near-blank page rather than triggering a 404. Two additional warnings cover placeholder URLs that will ship as broken outbound links, and a missing `sizes` prop on the Hero image that causes Next.js to download a full-viewport image for what is rendered at ~28vw. Three info items cover accessibility, a redundant function alias, and dead placeholder data patterns.

---

## Warnings

### WR-01: Invalid slug does not trigger 404 — silent blank render

**File:** `app/projects/[slug]/page.tsx:10-21`

**Issue:** `generateStaticParams` pre-builds the known slugs, but the page component itself never calls `getProjectBySlug`. If a user navigates to an unknown slug (e.g., `/projects/typo`) the page renders without any data and without a `notFound()` call. In Next.js App Router, `notFound()` must be called explicitly from the page component to return a 404 response. Currently any slug — valid or not — renders identically: just the stub paragraph with the raw slug string.

**Fix:**
```tsx
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { notFound } from 'next/navigation'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-sm text-neutral-500">{slug} — coming soon.</p>
    </main>
  )
}
```

---

### WR-02: Placeholder URLs will ship as broken outbound links

**File:** `lib/projects.ts:14, 63, 79-80`

**Issue:** Three projects have `liveUrl: 'https://placeholder.example.com'` and one has `githubUrl: 'https://github.com/placeholder'`. These are hardcoded placeholder strings, not conditional fields. When Phase 2 renders project cards with these URLs, users will click links to `example.com` or a non-existent GitHub profile. The `Project` interface marks both `liveUrl` and `githubUrl` as optional (`?`), so the correct fix for projects without real URLs is to omit the field entirely.

**Fix:** Remove the `liveUrl` and `githubUrl` fields from entries that do not yet have real URLs. Leave the field absent rather than using a placeholder string.
```ts
// locked-out-of-care: remove liveUrl until real URL is known
// dinner-party: remove liveUrl until real URL is known
// task-manager: remove liveUrl and githubUrl until real URLs are known
```

---

### WR-03: Hero `<Image>` missing `sizes` — downloads full-viewport image at every breakpoint

**File:** `components/Hero.tsx:34-41`

**Issue:** The `<Image>` component uses the `fill` layout mode without a `sizes` prop. Next.js defaults `sizes` to `"100vw"` when it is absent, instructing the browser to download an image sized for the full viewport width. The actual rendered size is `clamp(240px, 28vw, 380px)` — roughly a quarter of the viewport on wide screens. This causes the browser to fetch a significantly larger image than needed.

**Fix:**
```tsx
<Image
  src="/headshot.jpg"
  alt="Nikki Jiang"
  fill
  sizes="(max-width: 640px) 240px, (max-width: 1280px) 28vw, 380px"
  className="object-cover object-top"
  priority
/>
```

---

## Info

### IN-01: `<nav>` missing accessible label

**File:** `components/NavBar.tsx:7`

**Issue:** The `<nav>` element has no `aria-label` attribute. When a page has multiple landmark regions, screen readers cannot distinguish between them. Adding a label is a low-effort best practice even for single-nav layouts.

**Fix:**
```tsx
<nav aria-label="Main navigation" className="fixed top-0 ...">
```

---

### IN-02: `getAllProjects` is a redundant alias for the `projects` array

**File:** `lib/projects.ts:88-90`

**Issue:** `getAllProjects()` simply returns the `projects` constant with no transformation or filtering. Any caller importing this function receives exactly what they would get by importing `projects` directly. This is harmless for Phase 1 but will become confusing if the array is ever sorted or filtered in the function — callers may not realize the two diverge.

**Fix:** Either add real logic to `getAllProjects` (e.g., sort by year descending, which is a common index-page need) or document the intent:
```ts
/** Returns all projects sorted by year, newest first. */
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => b.year - a.year)
}
```

---

### IN-03: Project detail page has no `generateMetadata` export

**File:** `app/projects/[slug]/page.tsx`

**Issue:** All project detail pages (`/projects/[slug]`) inherit only the generic root layout metadata (`title: "Nikki Jiang"`). For a portfolio, per-project Open Graph titles and descriptions (driven by `project.metaDescription`) are important for sharing. The `Project` interface already defines `metaDescription` for this purpose.

**Fix:** Add `generateMetadata` alongside `generateStaticParams` in Phase 2 when project data is real:
```tsx
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Nikki Jiang`,
    description: project.metaDescription,
  }
}
```

---

_Reviewed: 2026-05-06_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
