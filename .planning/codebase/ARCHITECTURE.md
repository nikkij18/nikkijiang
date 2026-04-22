# ARCHITECTURE.md — System Architecture
*Last mapped: 2026-04-22*

## Pattern
**Next.js App Router** — file-system routing with React Server Components (RSC) by default. Client components opt-in via `"use client"` directive.

## Layers

```
┌─────────────────────────────────┐
│         Pages (app/)            │  Route handlers, RSC by default
├─────────────────────────────────┤
│       Components (components/)  │  Shared UI, currently server components
├─────────────────────────────────┤
│         Public Assets (public/) │  Static files served at root
└─────────────────────────────────┘
```

## Entry Points
- `app/layout.tsx` — Root layout wrapping all pages (font, metadata, body styles)
- `app/page.tsx` — Home route `/` (NavBar + Hero)

## Data Flow
Currently static — no data fetching. All content is hardcoded in components.

## Component Architecture
- **Server Components** (default): `NavBar.tsx`, `Hero.tsx` — no client-side interactivity yet
- **No state management** — no hooks, no context, no stores
- **No API routes** — `app/api/` doesn't exist yet

## Key Abstractions
- `RootLayout` in `app/layout.tsx` — applies global font, metadata, and body class to all pages
- `NavBar` — global nav (currently only rendered on home page, not in layout)
- `Hero` — above-fold landing section

## Routing
| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Home page with Hero |
| `/about` | (not yet created) | NavBar links to it |
| `/projects` | (not yet created) | NavBar links to it |
| `/blogs` | (not yet created) | NavBar links to it |
| `/contact` | (not yet created) | NavBar links to it |

## Styling Architecture
- Tailwind v4 utility classes throughout
- CSS custom property `--font-geist` for font variable
- No CSS Modules, no styled-components
- Responsive sizing via `clamp()` in inline styles for large typography
