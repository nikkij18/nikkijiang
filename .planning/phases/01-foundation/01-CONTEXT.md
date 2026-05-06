# Phase 1: Foundation - Context

**Gathered:** 2026-05-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Fix the broken foundation: update Hero identity text and copy, move NavBar to root layout, remove the Blogs link, create stub pages for /about /projects /contact, update page metadata, create postcss.config.mjs (missing — Tailwind v4 blocker), and build the typed project data layer (lib/types.ts + lib/projects.ts) that all project case study pages depend on.

New capabilities (individual project pages, About content, Contact page content) belong in Phases 2 and 3.

</domain>

<decisions>
## Implementation Decisions

### Hero: Background Split Text
- **D-01:** Replace "Product" / "Designer" with **"Data" / "Stories"** — keeps the existing split-text layout, signals data storyteller identity without healthcare jargon

### Hero: Bio Copy
- **D-02:** Replace "I'm a student at Georgetown University interested in product management." with data storyteller framing:
  **"I make complex health systems legible — through research, design, and interactive data."**

### Hero: Layout Structure
- **D-03:** Keep existing layout structure — photo centered, big split text floating behind, bio bottom-right. Only update text content. No layout redesign this phase.

### Hero: Headshot
- **D-04:** User has a headshot photo and will add it as `public/headshot.jpg`. Planner should include a task to verify it exists before the phase is marked complete.

### NavBar
- **D-05:** Move NavBar from `app/page.tsx` to `app/layout.tsx` so it appears on every page automatically
- **D-06:** Remove "Blogs" from the `LINKS` array — out of scope per requirements
- **D-07:** Add "Contact" to the LINKS array or keep as CTA button — current implementation already has Contact as a styled button, keep that pattern

### Page Metadata
- **D-08:** Update `app/layout.tsx` metadata:
  - `title`: "Nikki Jiang" (keep)
  - `description`: "Georgetown designer and data storyteller working at the intersection of global health and design."

### Build: postcss.config.mjs
- **D-09:** Create `postcss.config.mjs` — this file is MISSING and is required for Tailwind v4 to compile. Create it before any other code changes to confirm Tailwind works. Content:
  ```js
  const config = { plugins: { "@tailwindcss/postcss": {} } };
  export default config;
  ```

### Project Data Layer
- **D-10:** Create `lib/types.ts` with `Project` interface and `ContentType` union type (as specified in ARCHITECTURE.md)
- **D-11:** Create `lib/projects.ts` with `Project[]` array for all 5 projects — slugs and titles can be filled in; placeholder cover images and descriptions are acceptable for this phase
- **D-12:** Create `app/projects/[slug]/page.tsx` shell with `generateStaticParams` wired to `lib/projects.ts` — no content yet, just the routing infrastructure

### Stub Pages
- **D-13:** Create stub pages for `/about`, `/projects`, and `/contact` — minimal content ("Coming soon" or empty), enough to stop the 404s
- **D-14:** Delete unused scaffold assets from `public/`: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`

### Claude's Discretion
- Exact slug names for all 5 projects (suggest: `locked-out-of-care`, `cyberattacks-healthcare`, `laos-health-systems`, `dinner-party`, `task-manager`)
- Whether stub pages render the NavBar directly or rely on root layout (should be root layout after D-05)
- Placeholder content in lib/projects.ts for fields not yet finalized

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/REQUIREMENTS.md` — Phase 1 requirements: HOME-01–03, INFRA-01–03
- `.planning/PROJECT.md` — Core value and identity framing

### Architecture
- `.planning/research/ARCHITECTURE.md` — Project data schema, routing structure, Next.js 16 gotchas
- `.planning/research/STACK.md` — Stack decisions and Next.js 16 breaking changes
- `.planning/research/PITFALLS.md` — Phase 1 pitfalls (Hero, NavBar, headshot, metadata)

### Next.js 16 critical: params is a Promise
- `node_modules/next/dist/docs/` — Read before writing any Next.js API code (per AGENTS.md)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/NavBar.tsx` — Exists. Pill-shaped floating nav with fixed positioning. Needs: (1) remove Blogs from LINKS, (2) move import to layout.tsx instead of page.tsx
- `components/Hero.tsx` — Exists. Photo-centered layout with absolute-positioned split text. Needs: (1) update big text from "Product"/"Designer" to "Data"/"Stories", (2) update bio copy
- `app/layout.tsx` — Exists. Root layout with Geist font. NavBar import needs to move here.
- `app/page.tsx` — Exists. Currently renders NavBar + Hero directly; after move, just renders Hero.
- `app/globals.css` — Exists. Tailwind v4 CSS-first config lives here.

### Established Patterns
- Styling: Tailwind v4 utility classes; `clamp()` for fluid typography; `absolute` positioning for decorative elements
- Images: `next/image` with `fill` and `priority` props (established in Hero.tsx)
- Links: `next/link` with `href` prop (established in NavBar.tsx)
- Font: Geist via `next/font/google`, applied as CSS variable `--font-geist`

### Integration Points
- NavBar moves from `app/page.tsx` to `app/layout.tsx` — all new pages automatically get it
- `lib/projects.ts` → `app/projects/[slug]/page.tsx` → `generateStaticParams` — data layer feeds routing
- `postcss.config.mjs` → must exist for `next dev` to work with Tailwind v4

### Critical Blockers (Verify Before Any Build)
- `postcss.config.mjs` is MISSING — create this first
- `public/headshot.jpg` is MISSING — user will add it; planner should include a verification step

</code_context>

<specifics>
## Specific Ideas

- Hero big text: exactly **"Data"** (left) and **"Stories"** (right)
- Hero bio: exactly **"I make complex health systems legible — through research, design, and interactive data."**
- Keep existing Hero layout structure (no redesign)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 1 scope.

Project data content decisions (exact descriptions, cover images, PDFs for each of the 5 projects) deferred to Phase 2 when individual case study pages are built.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-05-05*
