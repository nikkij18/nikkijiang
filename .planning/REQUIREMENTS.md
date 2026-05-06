# REQUIREMENTS.md — nikkijiang Portfolio

## v1 Requirements

### HOME-01–03: Home Page

- [ ] **HOME-01**: User sees a hero with Nikki's name, "data storyteller / global health + design" identity framing, and a brief tagline — consistent with About page opening
- [ ] **HOME-02**: User can navigate to Projects, About, and Contact from the NavBar on every page (NavBar lives in root layout, not per-page)
- [ ] **HOME-03**: Page metadata (title, description) reflects data storyteller / global health identity (not "Product designer & Georgetown student")

### PROJ-01–08: Projects

- [ ] **PROJ-01**: User sees a projects index (/projects) with all 5 projects as cards — each showing a cover image, title, 1–2 line description, type tag, and role/year
- [ ] **PROJ-02**: Projects index has a 2–3 sentence framing paragraph above the cards explaining the through-line of the work
- [ ] **PROJ-03**: Projects are ordered by relevance: Locked Out of Care first, academic research second (Cyberattacks, Laos), creative projects last (Dinner Party, Task Manager)
- [ ] **PROJ-04**: User can open a full case study page for *Locked Out of Care* — includes hero image, problem statement, role, process sections with images, key findings, live site link
- [ ] **PROJ-05**: User can open a full case study page for *Cyberattacks on US Healthcare* — uses research-paper format (question → approach → key findings as bullets → implications → PDF download link)
- [ ] **PROJ-06**: User can open a full case study page for *Comparative Health Systems: Laos* — same research-paper format as PROJ-05
- [ ] **PROJ-07**: User can open a case study page for *Dinner Party Invite & Archive* — shorter format: what it is, what was built, live link
- [ ] **PROJ-08**: User can open a case study page for *Task Manager* — shorter format: what it is, what was built, live link or GitHub

### ABOUT-01–04: About Page

- [ ] **ABOUT-01**: About page opens with positioning statement in first person ("I'm Nikki Jiang, a Georgetown product design student working at the intersection of health research and data storytelling") — same framing as home hero, not paraphrased
- [ ] **ABOUT-02**: About page includes a paragraph explaining why global health specifically — connecting Locked Out of Care, Laos paper, and Cyberattacks work explicitly
- [ ] **ABOUT-03**: About page includes a resume download link (PDF) prominently placed
- [ ] **ABOUT-04**: About page includes a headshot photo (`public/headshot.jpg`)

### CONTACT-01: Contact Page

- [ ] **CONTACT-01**: Contact page shows email address as a visible, clickable mailto link — no form required

### INFRA-01–03: Infrastructure

- [x] **INFRA-01
**: Project data lives in `lib/projects.ts` as a typed `Project[]` array — no CMS, no MDX
- [ ] **INFRA-02**: Individual project pages use `/projects/[slug]` routing with `generateStaticParams` for full SSG
- [ ] **INFRA-03**: Blogs nav link removed; no blog route scaffolded

---

## v2 Requirements (Deferred)

- Reflection sections on case study pages — adds depth but not critical for v1
- Animation / page transitions — defer until core content is solid
- Contact form — mailto link is sufficient for this application cycle
- Blog section — no content ready
- Search or filtering on projects index — only 5 projects, unnecessary

---

## Out of Scope

- Blog / articles section — no content ready; NavBar link to be removed
- CMS or dynamic content management — static `lib/projects.ts` is sufficient
- Authentication — no user accounts needed
- Dark editorial aesthetic — warm and personal chosen instead
- Password-protecting any work — public portfolio only
- Contact form with input fields — friction hurts applications; mailto only

---

## Traceability

| REQ-ID | Phase | Status |
|--------|-------|--------|
| HOME-01 | Phase 1 | Pending |
| HOME-02 | Phase 1 | Pending |
| HOME-03 | Phase 1 | Pending |
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 1 | Pending |
| PROJ-01 | Phase 2 | Pending |
| PROJ-02 | Phase 2 | Pending |
| PROJ-03 | Phase 2 | Pending |
| PROJ-04 | Phase 2 | Pending |
| PROJ-05 | Phase 2 | Pending |
| PROJ-06 | Phase 2 | Pending |
| PROJ-07 | Phase 2 | Pending |
| PROJ-08 | Phase 2 | Pending |
| ABOUT-01 | Phase 3 | Pending |
| ABOUT-02 | Phase 3 | Pending |
| ABOUT-03 | Phase 3 | Pending |
| ABOUT-04 | Phase 3 | Pending |
| CONTACT-01 | Phase 3 | Pending |
