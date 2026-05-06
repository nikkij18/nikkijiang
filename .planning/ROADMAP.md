# Roadmap: nikkijiang Portfolio

## Overview

Three phases deliver a recruiter-ready portfolio for the Mount Sinai Digital Global Health internship. Phase 1 fixes the broken foundation — wrong identity copy, 404 routes, missing headshot, and missing data layer. Phase 2 builds the signature work: the projects index and all five case study pages, with Locked Out of Care as the anchor. Phase 3 completes the site with the About page (positioning statement, resume download, headshot) and Contact page.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Fix broken state: hero identity, NavBar, metadata, stub routes, and project data layer
- [ ] **Phase 2: Projects** - Projects index and all five case study pages
- [ ] **Phase 3: About & Contact** - About page with positioning, resume, headshot; Contact with mailto

## Phase Details

### Phase 1: Foundation
**Goal**: The site has correct identity, working navigation, and the data layer that all project pages depend on
**Depends on**: Nothing (first phase)
**Requirements**: HOME-01, HOME-02, HOME-03, INFRA-01, INFRA-02, INFRA-03
**Success Criteria** (what must be TRUE):
  1. Hero displays "data storyteller / global health + design" identity — not "Product Designer" or "product management"
  2. NavBar links to /projects, /about, and /contact without 404; Blogs link is gone
  3. Page `<title>` and meta description reflect data storyteller / global health framing
  4. `lib/projects.ts` exports a typed `Project[]` array with all 5 projects; `/projects/[slug]` routes are statically generated
**Plans**: 3 plans
Plans:
- [ ] 01-01-PLAN.md — Create lib/types.ts + lib/projects.ts data layer; verify postcss.config.mjs
- [ ] 01-02-PLAN.md — Fix Hero copy, remove Blogs from NavBar, lift NavBar to root layout, fix metadata
- [ ] 01-03-PLAN.md — Create stub pages (/about, /projects, /contact, /projects/[slug]); delete scaffold SVGs
**UI hint**: yes

### Phase 2: Projects
**Goal**: Recruiters can browse all five projects and read full case studies for each
**Depends on**: Phase 1
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05, PROJ-06, PROJ-07, PROJ-08
**Success Criteria** (what must be TRUE):
  1. /projects shows all 5 projects as cards with cover image, title, 1–2 line description, type tag, and role/year
  2. A 2–3 sentence framing paragraph appears above the cards on the projects index
  3. Projects are ordered correctly: Locked Out of Care first, then Cyberattacks and Laos, then Dinner Party and Task Manager
  4. Each of the 5 case study pages is reachable and includes role, problem statement, and appropriate CTA (live link, PDF, or GitHub)
  5. Locked Out of Care page includes hero image, process sections with images, key findings, and live site link
**Plans**: TBD
**UI hint**: yes

### Phase 3: About & Contact
**Goal**: Recruiters understand who Nikki is, can download her resume, and can reach her by email
**Depends on**: Phase 2
**Requirements**: ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, CONTACT-01
**Success Criteria** (what must be TRUE):
  1. About page opens with the positioning statement in first person ("I'm Nikki Jiang…") — same framing as the home hero
  2. About page includes a paragraph connecting Locked Out of Care, Laos, and Cyberattacks to explain why global health specifically
  3. Resume PDF download link is prominently placed on the About page
  4. Headshot (`public/headshot.jpg`) appears on the About page
  5. Contact page shows a visible, clickable mailto link — no form
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/3 | Not started | - |
| 2. Projects | 0/TBD | Not started | - |
| 3. About & Contact | 0/TBD | Not started | - |
