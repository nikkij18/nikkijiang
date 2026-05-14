# Phase 1: Foundation - Pattern Map

**Mapped:** 2026-05-05
**Files analyzed:** 9 new/modified files
**Analogs found:** 8 / 9

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `postcss.config.mjs` | config | — | `postcss.config.mjs` (already exists, correct content) | exact — no action needed |
| `components/Hero.tsx` | component | request-response | `components/Hero.tsx` (self — text edits only) | exact |
| `components/NavBar.tsx` | component | request-response | `components/NavBar.tsx` (self — array edit only) | exact |
| `app/layout.tsx` | layout | request-response | `app/layout.tsx` (self — add NavBar + fix metadata) | exact |
| `app/page.tsx` | page | request-response | `app/page.tsx` (self — remove NavBar import) | exact |
| `lib/types.ts` | utility | transform | `app/layout.tsx` (TypeScript module shape) | partial |
| `lib/projects.ts` | utility | transform | `app/layout.tsx` (TypeScript module + export pattern) | partial |
| `app/about/page.tsx` | page | request-response | `app/page.tsx` (stub page structure) | role-match |
| `app/projects/page.tsx` | page | request-response | `app/page.tsx` (stub page structure) | role-match |
| `app/projects/[slug]/page.tsx` | page | request-response | Next.js 16 docs (params-as-Promise, generateStaticParams) | no codebase analog |

---

## Pattern Assignments

### `postcss.config.mjs` (config)

**Status: Already exists with the correct content. No action needed.**

Verified content at `/Users/nikki/Personal Projects/nikkijiang/postcss.config.mjs` (lines 1-7):
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

This matches the exact content specified in D-09. Skip creation; planner should verify it exists and move on.

---

### `components/Hero.tsx` (component, request-response)

**Analog:** `components/Hero.tsx` (self — targeted text replacements only)

**Full current file** (lines 1-59) — shown for line reference during edits:
```tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-8 pt-24 pb-12">

      {/* Big split typography — sits behind the photo */}
      <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none select-none">
        <span
          className="font-black uppercase leading-none text-neutral-900"
          style={{ fontSize: "clamp(72px, 10vw, 160px)" }}
        >
          Product
        </span>
        <span
          className="font-black uppercase leading-none text-neutral-900"
          style={{ fontSize: "clamp(72px, 10vw, 160px)" }}
        >
          Designer
        </span>
      </div>

      {/* Center column: name + photo */}
      <div className="relative z-10 flex flex-col items-center gap-0">

        {/* Name — top left of the photo */}
        <div className="w-full max-w-xs self-center mb-2 pl-1">
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500">
            Nikki Jiang
          </p>
        </div>

        {/* Photo card */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl"
          style={{ width: "clamp(240px, 28vw, 380px)", aspectRatio: "3/4" }}
        >
          <Image
            src="/headshot.jpg"
            alt="Nikki Jiang"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Bio — bottom right */}
      <p
        className="absolute bottom-16 right-10 text-sm text-neutral-500 text-right leading-relaxed max-w-xs z-10"
        style={{ fontSize: "clamp(12px, 1vw, 15px)" }}
      >
        I&apos;m a student at Georgetown University<br />
        interested in product management.
      </p>

    </section>
  );
}
```

**Changes required (text-only, no layout change per D-03):**

- Line 13: `Product` → `Data`
- Line 19: `Designer` → `Stories`
- Lines 53-54 (bio paragraph content): replace with exact D-02 text:
  ```
  I make complex health systems legible —{" "}
  through research, design, and interactive data.
  ```

**Image pattern** (lines 38-44) — already correct, `next/image` with `fill` + `priority`:
```tsx
<Image
  src="/headshot.jpg"
  alt="Nikki Jiang"
  fill
  className="object-cover object-top"
  priority
/>
```

---

### `components/NavBar.tsx` (component, request-response)

**Analog:** `components/NavBar.tsx` (self — single line edit to LINKS array)

**Full current file** (lines 1-27):
```tsx
import Link from "next/link";

const LINKS = ["About", "Projects", "Blogs"];

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-10 bg-white border border-neutral-200 rounded-full px-6 py-2.5 shadow-sm">
        {LINKS.map(link => (
          <Link
            key={link}
            href={`/${link.toLowerCase()}`}
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            {link}
          </Link>
        ))}
        <Link
          href="/contact"
          className="text-sm font-medium text-white bg-neutral-900 rounded-full px-5 py-1.5 hover:bg-neutral-700 transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
```

**Change required per D-06:**
- Line 3: `const LINKS = ["About", "Projects", "Blogs"];` → `const LINKS = ["About", "Projects"];`

**Link pattern to preserve** (lines 9-16) — `next/link` with lowercase href derived from label:
```tsx
{LINKS.map(link => (
  <Link
    key={link}
    href={`/${link.toLowerCase()}`}
    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
  >
    {link}
  </Link>
))}
```

**Contact CTA button pattern** (lines 18-23) — keep unchanged per D-07:
```tsx
<Link
  href="/contact"
  className="text-sm font-medium text-white bg-neutral-900 rounded-full px-5 py-1.5 hover:bg-neutral-700 transition-colors"
>
  Contact
</Link>
```

---

### `app/layout.tsx` (layout, request-response)

**Analog:** `app/layout.tsx` (self — add NavBar import, fix metadata description)

**Full current file** (lines 1-18):
```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nikki Jiang",
  description: "Product designer & Georgetown student.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-neutral-900">{children}</body>
    </html>
  );
}
```

**Changes required:**

1. Add NavBar import after line 3 (per D-05):
   ```tsx
   import NavBar from "@/components/NavBar";
   ```

2. Fix metadata description (per D-08):
   ```tsx
   description: "Georgetown designer and data storyteller working at the intersection of global health and design.",
   ```

3. Add `<NavBar />` inside `<body>` before `{children}` (per D-05):
   ```tsx
   <body className="min-h-full bg-white text-neutral-900">
     <NavBar />
     {children}
   </body>
   ```

**Font pattern to preserve** (lines 5, 14) — Geist via CSS variable on `<html>`:
```tsx
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
// ...
<html lang="en" className={`${geist.variable} h-full antialiased`}>
```

**Path alias pattern** — use `@/components/NavBar` (tsconfig.json confirms `"@/*": ["./*"]`).

---

### `app/page.tsx` (page, request-response)

**Analog:** `app/page.tsx` (self — remove one import and one JSX element)

**Current file** (lines 1-11):
```tsx
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
    </>
  );
}
```

**Changes required (per D-05):**
- Remove line 1: `import NavBar from "@/components/NavBar";`
- Remove line 7: `<NavBar />`
- Simplify fragment to single child (fragment is no longer needed):
  ```tsx
  import Hero from "@/components/Hero";

  export default function HomePage() {
    return <Hero />;
  }
  ```

---

### `lib/types.ts` (utility, transform)

**No codebase analog** — first TypeScript types file in the project.

**Pattern: copy the schema verbatim from ARCHITECTURE.md.** The exact interface is specified and locked.

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

**TypeScript convention** — tsconfig has `"strict": true`. All required fields must be present in every Project object in `lib/projects.ts`.

---

### `lib/projects.ts` (utility, transform)

**No codebase analog** — first lib/ data file in the project.

**Pattern: typed array export + named helper functions** (from ARCHITECTURE.md).

```typescript
// lib/projects.ts
import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'locked-out-of-care',
    title: 'Locked Out of Care',
    contentType: 'interactive-site',
    tags: ['data visualization', 'health equity', 'interactive'],
    featured: true,
    shortDescription: 'An interactive data story on barriers to healthcare access.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/locked-out-of-care.jpg',
    liveUrl: 'https://placeholder.example.com',
    year: 2024,
    role: 'Designer & Developer',
    tools: ['D3.js', 'Svelte'],
    status: 'live',
    metaDescription: 'Interactive data story on barriers to healthcare access.',
  },
  {
    slug: 'cyberattacks-healthcare',
    title: 'Cyberattacks on US Healthcare',
    contentType: 'research-report',
    tags: ['research', 'cybersecurity', 'health systems'],
    featured: true,
    shortDescription: 'Research report on ransomware attacks targeting US hospitals.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/cyberattacks-healthcare.jpg',
    pdfUrl: '/files/cyberattacks-healthcare.pdf',
    year: 2024,
    role: 'Researcher',
    tools: ['Policy analysis'],
    status: 'archived',
    metaDescription: 'Research on ransomware attacks targeting US hospitals.',
  },
  {
    slug: 'laos-health-systems',
    title: 'Comparative Health Systems: Laos',
    contentType: 'academic-paper',
    tags: ['global health', 'comparative analysis', 'Laos'],
    featured: false,
    shortDescription: 'Academic paper comparing Laos health system structure.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/laos-health-systems.jpg',
    pdfUrl: '/files/laos-health-systems.pdf',
    year: 2023,
    role: 'Researcher',
    tools: ['Academic writing'],
    status: 'archived',
    metaDescription: 'Academic analysis of the Laos health system.',
  },
  {
    slug: 'dinner-party',
    title: 'Dinner Party Invite & Archive',
    contentType: 'creative-site',
    tags: ['creative', 'web design', 'personal'],
    featured: false,
    shortDescription: 'A creative site for dinner party invites and archiving.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/dinner-party.jpg',
    liveUrl: 'https://placeholder.example.com',
    year: 2024,
    role: 'Designer & Developer',
    tools: ['HTML', 'CSS'],
    status: 'live',
    metaDescription: 'Creative site for dinner party invites and memory archiving.',
  },
  {
    slug: 'task-manager',
    title: 'Task Manager',
    contentType: 'side-project',
    tags: ['productivity', 'side project', 'web app'],
    featured: false,
    shortDescription: 'A personal task management side project.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/task-manager.jpg',
    liveUrl: 'https://placeholder.example.com',
    githubUrl: 'https://github.com/placeholder',
    year: 2024,
    role: 'Developer',
    tools: ['React', 'TypeScript'],
    status: 'in-progress',
    metaDescription: 'A personal task management app built as a side project.',
  },
]

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
```

---

### `app/about/page.tsx` (page, request-response)

**Analog:** `app/page.tsx` — simplest possible page, no imports needed for stub.

**Stub pattern** (copy structure from `app/page.tsx`, strip components):
```tsx
export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-neutral-500">Coming soon.</p>
    </main>
  );
}
```

**Tailwind conventions to follow** (from Hero.tsx and layout.tsx):
- `min-h-screen` for full-height pages
- `text-neutral-500` for muted/placeholder text
- NavBar is rendered by root layout — do NOT import it here

---

### `app/projects/page.tsx` (page, request-response)

**Analog:** `app/page.tsx` — same stub pattern as `/about`.

```tsx
export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-neutral-500">Coming soon.</p>
    </main>
  );
}
```

---

### `app/projects/[slug]/page.tsx` (page, request-response)

**No codebase analog** — first dynamic route in the project.

**Pattern source:** Next.js 16 official docs (`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md` and `03-file-conventions/page.md`).

**Critical Next.js 16 rule:** `params` is a `Promise` — must use `await params`.

**generateStaticParams + async Page pattern** (from Next.js 16 docs):
```tsx
import { getAllProjects } from '@/lib/projects'

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-neutral-500">{slug} — coming soon.</p>
    </main>
  )
}
```

**Import convention** — use `@/lib/projects` (tsconfig alias `"@/*": ["./*"]`).
**NavBar** — rendered by root layout, do NOT import here.

---

## Shared Patterns

### Path Alias
**Source:** `tsconfig.json` — `"paths": { "@/*": ["./*"] }`
**Apply to:** All new files in `lib/`, `app/` subdirectories
```typescript
// Correct — use @/ alias, not relative paths
import NavBar from "@/components/NavBar";
import { getAllProjects } from "@/lib/projects";
import type { Project } from "@/lib/types";
```

### Tailwind Styling Conventions
**Source:** `components/Hero.tsx`, `components/NavBar.tsx`
**Apply to:** All new page stubs and components
```tsx
// Fluid typography: clamp() for responsive text
style={{ fontSize: "clamp(72px, 10vw, 160px)" }}

// Positioning: absolute for decorative, relative z-10 for content
className="absolute inset-0 pointer-events-none select-none"
className="relative z-10"

// Color palette: neutral-* scale only
className="text-neutral-900"   // primary text
className="text-neutral-500"   // muted text
className="text-neutral-600"   // secondary text
className="bg-white"           // backgrounds

// Transitions: always use transition-colors for hover states
className="hover:text-neutral-900 transition-colors"
```

### next/image Usage
**Source:** `components/Hero.tsx` (lines 38-44)
**Apply to:** Any file using images
```tsx
import Image from "next/image";

// fill prop requires parent with explicit dimensions
<div
  className="relative rounded-3xl overflow-hidden"
  style={{ width: "clamp(240px, 28vw, 380px)", aspectRatio: "3/4" }}
>
  <Image
    src="/headshot.jpg"
    alt="Nikki Jiang"
    fill
    className="object-cover object-top"
    priority   // only on above-fold images
  />
</div>
```

### next/link Usage
**Source:** `components/NavBar.tsx` (lines 9-16)
**Apply to:** Any file with internal navigation links
```tsx
import Link from "next/link";

<Link
  href="/about"
  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
>
  About
</Link>
```

### TypeScript Strict Mode
**Source:** `tsconfig.json` — `"strict": true`
**Apply to:** `lib/types.ts`, `lib/projects.ts`, all new `.tsx` files
- All required interface fields must be present in every object literal
- No implicit `any`
- Function return types inferred or explicitly typed

### Root Layout NavBar (after D-05)
**Source:** `app/layout.tsx` (after modification)
**Apply to:** All stub pages (`app/about/page.tsx`, `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`)
- Do NOT add `<NavBar />` to individual page files
- NavBar renders automatically via `app/layout.tsx` wrapping all routes

---

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `lib/types.ts` | utility | transform | First TypeScript types file in the project; use ARCHITECTURE.md schema verbatim |
| `lib/projects.ts` | utility | transform | First lib/ data file; no existing data layer pattern in codebase |
| `app/projects/[slug]/page.tsx` | page | request-response | First dynamic route; use Next.js 16 docs pattern for params-as-Promise + generateStaticParams |

---

## Discovery Notes

- `postcss.config.mjs` **already exists** at the project root with the correct `@tailwindcss/postcss` content. Context.md listed it as missing — verify once during planning but do not recreate it.
- `public/` contains only the 5 scaffold SVGs to delete (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). No `headshot.jpg` present — planner must include a verification step.
- No `lib/` directory exists yet — planner must include directory creation before writing `lib/types.ts` and `lib/projects.ts`.
- No `app/about/`, `app/projects/`, or `app/contact/` directories exist yet — planner must include directory creation before writing stub pages. Note: D-13 mentions `/contact` as a stub page but it is NOT in the phase boundary task list; planner should include it for completeness since D-13 explicitly calls for it.

## Metadata

**Analog search scope:** `/Users/nikki/Personal Projects/nikkijiang/` — `app/`, `components/`, `lib/`, `public/`, config files, `node_modules/next/dist/docs/`
**Files scanned:** 11 source files + 3 Next.js 16 doc files
**Pattern extraction date:** 2026-05-05
