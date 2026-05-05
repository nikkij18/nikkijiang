# nikkijiang — Personal Portfolio

## What This Is

A personal portfolio site for Georgetown product design student Nikki Jiang, built with Next.js 16. The portfolio showcases her identity as a **data storyteller** — someone who makes complex health systems legible and actionable for non-technical audiences — through a mix of health data journalism, comparative health research, and creative technical projects. Primary goal: support her application for the Digital Global Health internship at Mount Sinai.

## Core Value

A recruiter visiting the site should immediately understand Nikki as someone who bridges health research and design, and see concrete proof of that in her work.

## Requirements

### Validated

- ✓ Next.js 16 App Router with TypeScript and Tailwind v4 — existing
- ✓ Home page (/) with NavBar and Hero component — existing
- ✓ Navigation links to /about, /projects, and /contact — existing (not yet implemented)

### Active

**Home**
- [ ] Hero communicates "data storyteller / health + design" identity clearly
- [ ] Featured work preview or CTA from home page leading to projects

**Projects**
- [ ] Projects index page (/projects) with all 5 featured projects
- [ ] Individual project page for *Locked Out of Care* — interactive scrollytelling site, carceral health US vs Germany
- [ ] Individual project page for *Cyberattacks on US Healthcare* — research report
- [ ] Individual project page for *Comparative Health Systems: Laos* — academic paper
- [ ] Individual project page for *Dinner Party Invite & Archive* — creative website
- [ ] Individual project page for *Task Manager* — side project website

**About**
- [ ] About page (/about) — who Nikki is, her background, why global health
- [ ] Resume/CV accessible from about page (download link or inline)

**Contact**
- [ ] Contact page or section (/contact) with email link

### Out of Scope

- Blog/articles section — no content ready, NavBar link to /blogs will be removed or deferred
- CMS or dynamic content management — static content is sufficient for this sprint
- Authentication — no user accounts needed
- Dark editorial aesthetic — going with warm and personal instead

## Context

- **Application target**: Mount Sinai Digital Global Health internship — research-adjacent, health systems context
- **Identity framing**: Data storyteller who makes complex health data legible — not just a designer, not just a researcher
- **Visual style**: Warm and personal — approachable palette, balances professionalism with personality
- **Timeline**: Must ship this week — internship application is imminent
- **Existing code**: Home page with NavBar + Hero exists; /about, /projects, /contact routes are linked but not yet created
- **Stack note**: Next.js 16 has breaking changes from 14/15 — read `node_modules/next/dist/docs/` before writing any Next.js code

## Constraints

- **Timeline**: Ready this week — prioritize shipping over perfection
- **Stack**: Next.js 16 with breaking changes; Tailwind v4 CSS-first config (no tailwind.config.*)
- **Content**: All projects are static content — no live data, no CMS
- **Audience**: Health internship recruiters at a research hospital — signal expertise + execution, not just aesthetics

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| "Data storyteller" as primary identity framing | Differentiates from pure designer or researcher; positions health data journalism as signature skill | — Pending |
| Creative projects (dinner party, task manager) featured prominently | Shows technical range and personality alongside health work; signals full-stack capability | — Pending |
| Warm and personal visual style | Approachable for internship reviewers without sacrificing professionalism | — Pending |
| Static content only (no CMS) | Timeline constraint — no time to build content management; all 5 projects are known | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-05 after initialization*
