# STRUCTURE.md — Directory Layout
*Last mapped: 2026-04-22*

## Directory Tree
```
nikkijiang/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout (font, metadata, body)
│   ├── page.tsx            # Home route "/"
│   ├── globals.css         # Global CSS (Tailwind v4 @import)
│   └── favicon.ico         # Browser tab icon
├── components/             # Shared UI components
│   ├── NavBar.tsx          # Top navigation bar
│   └── Hero.tsx            # Hero section (split typography + photo)
├── public/                 # Static assets (served at "/")
│   ├── file.svg            # Default Next.js asset
│   ├── globe.svg           # Default Next.js asset
│   ├── next.svg            # Default Next.js asset
│   ├── vercel.svg          # Default Next.js asset
│   └── window.svg          # Default Next.js asset
├── .planning/              # GSD planning artifacts
│   └── codebase/           # Codebase map documents
├── node_modules/           # Dependencies
├── AGENTS.md               # Instructions for AI agents
├── CLAUDE.md               # Claude Code config (@AGENTS.md)
├── README.md               # Default Next.js readme
├── eslint.config.mjs       # ESLint config
├── next-env.d.ts           # Next.js TypeScript declarations
├── next.config.ts          # Next.js config (empty)
├── package.json            # Dependencies & scripts
├── package-lock.json       # Lockfile
├── postcss.config.mjs      # PostCSS config (Tailwind v4)
└── tsconfig.json           # TypeScript config
```

## Key Locations
| What | Where |
|------|-------|
| Pages | `app/` |
| Shared components | `components/` |
| Global styles | `app/globals.css` |
| Static assets | `public/` |
| Root layout | `app/layout.tsx` |
| Home page | `app/page.tsx` |

## Naming Conventions
- **Components:** PascalCase, `.tsx` extension (`NavBar.tsx`, `Hero.tsx`)
- **Pages:** `page.tsx` in route directory (App Router convention)
- **Layout:** `layout.tsx` in route directory
- **Path alias:** `@/` maps to project root (e.g., `@/components/NavBar`)

## Missing / Expected Future Structure
```
app/
├── about/page.tsx          # About page (linked in NavBar)
├── projects/page.tsx       # Projects page (linked in NavBar)
├── blogs/page.tsx          # Blogs page (linked in NavBar)
└── contact/page.tsx        # Contact page (linked in NavBar)
```
