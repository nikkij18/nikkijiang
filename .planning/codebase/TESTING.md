# TESTING.md — Testing Structure
*Last mapped: 2026-04-22*

## Current State
**No tests exist.** This is a fresh scaffold with no testing infrastructure set up.

## No Testing Framework Installed
- No Jest, Vitest, Playwright, Cypress, or Testing Library in `package.json`
- No test scripts in `package.json`
- No `__tests__/` directories or `*.test.tsx` files

## Lint
- ESLint 9 configured via `eslint.config.mjs`
- `eslint-config-next` provides Next.js-specific rules
- Run: `npm run lint`

## Type Checking
- TypeScript strict mode acts as a first layer of correctness
- Run: `npx tsc --noEmit`

## Recommended Testing Setup (if needed)
For a portfolio site, testing is low priority. If added:
- **Unit/component:** Vitest + React Testing Library (lighter than Jest for Vite/Next)
- **E2E:** Playwright (first-class Next.js support)
- **Visual regression:** Chromatic or Percy (good for design-forward sites)

## Manual Testing
Currently the primary verification method — run `npm run dev` and visually inspect in browser.
