# ARCHITECTURE.md — Portfolio Site Architecture
*Research for nikkijiang portfolio*

## Routing

**`/projects/[slug]` with `generateStaticParams` — all 5 slugs known at build time.**

```
app/
  page.tsx                     → /
  about/page.tsx               → /about
  projects/page.tsx            → /projects
  projects/[slug]/page.tsx     → /projects/locked-out-of-care, etc.
  contact/page.tsx             → /contact
```

All project pages prerendered as static HTML at `next build`. No server runtime needed at runtime. No ISR needed — no changing data source.

## Content Architecture

**Static TypeScript data file — not MDX, not per-project components.**

MDX adds 4+ packages and config overhead. These project pages are primarily visual (images, links, descriptions). Not warranted for a one-week deadline.

Pattern: `lib/projects.ts` exports a typed `Project[]` array plus helpers (`getProjectBySlug`, `getAllProjects`, `getFeaturedProjects`). `lib/types.ts` exports the `Project` interface.

## Mixed Content Types

All 5 projects share one `[slug]/page.tsx`. A `<ProjectLinks>` component reads `contentType` and optional URL fields to render the right CTA. No separate templates per type.

| contentType | Project | Primary CTA |
|-------------|---------|-------------|
| `interactive-site` | Locked Out of Care | `liveUrl` |
| `research-report` | Cyberattacks on US Healthcare | `pdfUrl` |
| `academic-paper` | Comparative Health Systems: Laos | `pdfUrl` |
| `creative-site` | Dinner Party Invite & Archive | `liveUrl` |
| `side-project` | Task Manager | `liveUrl` + `githubUrl` |

## Project Data Schema

```typescript
// lib/types.ts

export type ContentType =
  | 'interactive-site'
  | 'research-report'
  | 'academic-paper'
  | 'creative-site'
  | 'side-project'

export type ProjectStatus = 'live' | 'archived' | 'in-progress'

export interface Project {
  slug: string
  title: string
  subtitle?: string
  contentType: ContentType
  tags: string[]
  featured: boolean
  shortDescription: string    // for /projects index cards
  longDescription: string     // for detail page
  coverImage: string          // "/images/projects/project-cover.jpg"
  images?: string[]
  liveUrl?: string
  pdfUrl?: string             // "/files/paper.pdf" — served from /public/files/
  githubUrl?: string
  year: number
  role: string
  tools: string[]
  status: ProjectStatus
  metaDescription: string     // SEO/share description
}
```

## Build Strategy

- Full SSG via `generateStaticParams` (not `output: 'export'`)
- No ISR — content is static
- No `'use cache'` directive — in-memory data doesn't need caching
- Skip `output: 'export'` unless hosting outside Vercel (it disables `next/image` optimization)

## Recommended File Structure

```
nikkijiang/
  app/
    layout.tsx              ← exists
    page.tsx                ← exists
    globals.css             ← exists
    about/page.tsx
    contact/page.tsx
    projects/
      page.tsx
      [slug]/page.tsx
  components/
    NavBar.tsx              ← exists
    Hero.tsx                ← exists
    ProjectCard.tsx         ← new
    ProjectLinks.tsx        ← new (contentType-aware CTA renderer)
  lib/
    types.ts
    projects.ts
  public/
    images/projects/        ← cover images
    files/                  ← PDFs for download
```

## Next.js 16 Breaking Changes (Verified)

1. **`params` is a `Promise`.** Use `const { slug } = await params` — not `params.slug`. Applies to both page components and `generateMetadata`.

2. **`output: 'export'` disables `next/image` optimization.** Add `images: { unoptimized: true }` if using a static host that isn't Vercel.

3. **Tailwind v4 is CSS-first.** No `tailwind.config.*` — config goes in `globals.css` via `@theme`. `postcss.config.mjs` is required.

4. **`'use cache'`** is a new Next.js 16 directive, distinct from `'use client'` / `'use server'`. Only for async functions fetching from external sources — not for in-memory data.

5. **`generateStaticParams` replaces `getStaticPaths`** — Pages Router examples don't apply.

## Open Questions

- Does `postcss.config.mjs` exist? If missing, Tailwind v4 won't compile.
- Where are project assets (cover images, PDFs)? These need to land in `/public/` before project detail pages can be built.
