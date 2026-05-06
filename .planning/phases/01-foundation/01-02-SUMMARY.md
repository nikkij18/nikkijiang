---
phase: 01-foundation
plan: 02
subsystem: identity-surface
tags:
  - identity
  - navigation
  - metadata
  - hero
dependency_graph:
  requires:
    - 01-01 (lib/types.ts, lib/projects.ts — data layer)
  provides:
    - components/Hero.tsx (corrected identity copy)
    - components/NavBar.tsx (Blogs removed)
    - app/layout.tsx (NavBar global, D-08 metadata)
    - app/page.tsx (NavBar removed, Hero only)
  affects:
    - All routes (NavBar now in root layout)
    - Search engine previews (metadata.description updated)
tech_stack:
  added: []
  patterns:
    - NavBar lifted to root layout — all routes automatically receive it
    - JSX expression {"—"} used for em dash in bio copy
key_files:
  created: []
  modified:
    - components/Hero.tsx
    - components/NavBar.tsx
    - app/layout.tsx
    - app/page.tsx
decisions:
  - D-01 applied exactly: "Data" (left span) / "Stories" (right span)
  - D-02 applied exactly: locked bio sentence with em dash as JSX expression {"—"}
  - D-03 honored: zero layout, class, or import changes to Hero
  - D-05 applied: NavBar moved from page.tsx to layout.tsx
  - D-06 applied: LINKS = ["About", "Projects"] — Blogs removed
  - D-07 honored: Contact CTA pill button unchanged
  - D-08 applied: metadata.description is the locked Georgetown data storyteller string
metrics:
  duration: 165s
  completed: 2026-05-06
  tasks_completed: 3
  files_modified: 4
---

# Phase 1 Plan 02: Identity Surface Fix Summary

**One-liner:** Updated Hero to "Data/Stories" data-storyteller identity, removed Blogs from NavBar, lifted NavBar to root layout with locked D-08 metadata description.

## What Was Done

Three tasks executed in sequence, each committed individually:

1. **Hero copy** (1c5d0f7) — Replaced "Product"/"Designer" split text with "Data"/"Stories"; replaced old Georgetown bio with locked D-02 sentence. All class names, layout structure, Image props, and imports preserved exactly per D-03.

2. **NavBar LINKS** (2201633) — Single-line change: `["About", "Projects", "Blogs"]` → `["About", "Projects"]`. Contact CTA pill unchanged per D-07.

3. **Root layout + page cleanup** (e9965d6) — Added NavBar import and `<NavBar />` render to `app/layout.tsx` (before `{children}`); updated `metadata.description` to D-08 string; rewrote `app/page.tsx` to render only `<Hero />` without NavBar.

## Copy Lock Verification

| Decision | Source | Applied |
|----------|--------|---------|
| D-01 Hero split text left | "Data" | `>Data<` in Hero.tsx — confirmed |
| D-01 Hero split text right | "Stories" | `>Stories<` in Hero.tsx — confirmed |
| D-02 Hero bio | "I make complex health systems legible — through research, design, and interactive data." | Present in Hero.tsx with `{"—"}` JSX expression for em dash |
| D-06 NavBar LINKS | `["About", "Projects"]` | Exact match — confirmed |
| D-07 Contact CTA | Unchanged pill button | Preserved — confirmed |
| D-08 metadata.description | "Georgetown designer and data storyteller working at the intersection of global health and design." | Present in layout.tsx — confirmed |
| D-08 metadata.title | "Nikki Jiang" (keep) | Preserved — confirmed |

## Headshot Status

`public/headshot.jpg` is **MISSING** at execution time. This is a noted content blocker (D-04, STATE.md). The Hero `<Image>` renders with `src="/headshot.jpg"` — a broken image will display until the user adds the file. Build succeeded without the file (Next.js does not require static assets at build time for `next/image`). This does not block plan completion.

## Build Results

- `npx tsc --noEmit`: exit 0 — TypeScript strict-mode passes
- `npx next build`: exit 0 — Production build succeeds cleanly (Next.js 16.2.3, Turbopack)

## Deviations from Plan

### Note on phase-level grep for bio

The phase-level verification check 2 uses:
```
grep -q "I make complex health systems legible — through research, design, and interactive data" components/Hero.tsx
```
This checks for the literal em dash `—` between "legible" and "through" in the source file. However, the task action explicitly specifies using `{"—"}` as a JSX expression, which is the correct pattern for em dashes in React JSX (avoids HTML entity drift). The rendered output is identical. The individual task acceptance criteria — which check the two parts separately (`"I make complex health systems legible"` and `"through research, design, and interactive data"`) — both pass. This is a verification wording mismatch, not a copy deviation.

**All other deviations:** None. Plan executed exactly as written.

## Known Stubs

None introduced by this plan. Hero, NavBar, layout, and page are fully wired — no placeholder values flow to UI rendering from this plan's changes.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. All files remain Server Components (no `'use client'`). No `process.env.*` reads in metadata. No `dangerouslySetInnerHTML`. All copy rendered as React text nodes (auto-escaped). Threat register T-01-02-01 through T-01-02-05 all mitigated as specified.

## Self-Check: PASSED

All files verified present. All commits verified in git log.

| Check | Result |
|-------|--------|
| components/Hero.tsx | FOUND |
| components/NavBar.tsx | FOUND |
| app/layout.tsx | FOUND |
| app/page.tsx | FOUND |
| commit 1c5d0f7 (Hero copy) | FOUND |
| commit 2201633 (NavBar LINKS) | FOUND |
| commit e9965d6 (layout + page) | FOUND |
