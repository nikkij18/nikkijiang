---
status: partial
phase: 01-foundation
source: [01-VERIFICATION.md]
started: 2026-05-06T17:45:00Z
updated: 2026-05-06T17:45:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Hero visual layout
expected: "Data"/"Stories" split text renders with the centered photo and bio bottom-right. Clamp-based fluid typography (clamp(72px–160px)) should display correctly across viewport sizes.
result: [pending]

### 2. Cross-route NavBar presence
expected: Navigate to /about, /projects, /contact, and /projects/locked-out-of-care in running dev server (`npm run dev`). NavBar appears on all routes without duplication — exactly one instance of the floating pill nav.
result: [pending]

### 3. Headshot image
expected: `public/headshot.jpg` is missing (user-supplied file, tracked in D-04). Add your headshot to `public/headshot.jpg` and confirm the Hero photo renders correctly. The `src="/headshot.jpg"` wiring is already correct — this is a content gap, not a code gap.
result: [pending]

## Summary

total: 3
passed: 0
issues: 0
pending: 3
skipped: 0
blocked: 0

## Gaps
