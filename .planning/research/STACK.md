# STACK.md — Technology Stack Recommendations
*Research for nikkijiang portfolio*

Note: Stack research agent hit usage limits. These recommendations are derived from the architecture research and verified against the existing codebase.

## Existing Stack (Locked)

- **Next.js 16.2.3** — App Router, TypeScript, Tailwind v4
- **React 19** — Server Components by default
- **Geist font** — via `next/font/google`

## Content Architecture

**Recommendation: Static TypeScript data file (`lib/projects.ts`)**

Do NOT use MDX — it adds 4+ packages (`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`) and config overhead. These project pages are image-and-description portfolios, not prose-heavy content. The deadline doesn't justify the setup cost.

Use: `lib/projects.ts` + `lib/types.ts` for typed project data. See ARCHITECTURE.md for schema.

## Image Handling

**Use `next/image` with defined aspect ratios.**

- `fill` prop requires a parent with stable dimensions — always set `relative` + height on the wrapper
- Add `placeholder="blur"` + `blurDataURL` for above-fold project cover images
- Keep `priority={true}` on the hero image and first project card only
- Store project images in `public/images/projects/`
- Store PDF files in `public/files/`

Do NOT use `output: 'export'` — disables `next/image` optimization.

## Animation / Motion

**Use CSS only for this sprint.**

Tailwind v4 has `transition-*` and `animate-*` utilities built in. No animation library needed for a one-week deadline. Use:

- `transition-opacity duration-200` for hover states on project cards
- `transition-transform` for subtle card lifts
- CSS `@keyframes` for any hero text entrance (already established pattern from lockedoutofcare)

If more is needed later: Framer Motion is the standard choice for Next.js App Router but adds ~30kb. Defer until post-launch.

## PDF Handling

**Link, don't embed.**

Place PDFs in `public/files/` and link with `<a href="/files/paper.pdf" target="_blank">`. No iframe embed — iframe embeds are a pitfall (see PITFALLS.md).

Label download links clearly: "Read the full paper — PDF, 24 pages"

## Next.js 16 Gotchas

1. **`params` is a `Promise`** — `const { slug } = await params` in both page components and `generateMetadata`
2. **Tailwind v4 is CSS-first** — No `tailwind.config.*`; config goes in `globals.css` via `@theme`; `postcss.config.mjs` must exist
3. **`generateStaticParams` replaces `getStaticPaths`** — all Pages Router examples are wrong
4. **`'use cache'`** is a new Next.js 16 directive distinct from `'use client'`/`'use server'` — don't use it for in-memory data
5. **Read `node_modules/next/dist/docs/`** before writing any Next.js API code (per AGENTS.md)

## Deployment

**Vercel free tier** — zero-config, handles `next/image` optimization, deploys from GitHub push. Recommended for hosting the portfolio and for hosting lockedoutofcare (for the live link in the case study).
