# STACK.md — Technology Stack
*Last mapped: 2026-04-22*

## Runtime & Language
- **Runtime:** Node.js (Next.js server)
- **Language:** TypeScript 5.x (strict mode)
- **JSX:** React 19.x (`react-jsx` transform)

## Framework
- **Next.js 16.2.3** — App Router, file-based routing, server components by default
  - Config: `next.config.ts` (empty, no custom config yet)
  - Entry: `app/layout.tsx` (root layout), `app/page.tsx` (home page)

## Styling
- **Tailwind CSS v4** — via `@tailwindcss/postcss` plugin
  - Config: `postcss.config.mjs`
  - Global styles: `app/globals.css`
  - No `tailwind.config.*` file — v4 uses CSS-first config
- **Typography:** Geist font (Google Fonts via `next/font/google`)

## Dependencies (production)
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.3 | Framework |
| `react` | 19.2.4 | UI library |
| `react-dom` | 19.2.4 | DOM renderer |

## Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5 | Type checking |
| `@types/react` | ^19 | React types |
| `@types/react-dom` | ^19 | ReactDOM types |
| `@types/node` | ^20 | Node.js types |
| `tailwindcss` | ^4 | CSS framework |
| `@tailwindcss/postcss` | ^4 | PostCSS integration |
| `eslint` | ^9 | Linter |
| `eslint-config-next` | 16.2.3 | Next.js lint rules |

## Scripts
```json
"dev":   "next dev"
"build": "next build"
"start": "next start"
"lint":  "eslint"
```

## TypeScript Configuration
- Target: ES2017
- Module resolution: `bundler` (Next.js 13+ style)
- Path alias: `@/*` → `./*`
- Strict mode enabled
- `noEmit: true` (Next.js handles compilation)

## Notable: Next.js Version
This is **Next.js 16** — newer than most training data. APIs and conventions may differ. Per `AGENTS.md`: read `node_modules/next/dist/docs/` before writing Next.js code.
