# PITFALLS.md — Portfolio Site Pitfalls
*Research for nikkijiang portfolio*

## Critical

**1. Hero says the wrong thing**
`components/Hero.tsx` currently says "Product Designer" and "interested in product management" — neither signals the health + data storyteller identity needed for Mt. Sinai.
- Warning: Check Hero.tsx before any other work
- Prevention: Rewrite Hero text to "data storyteller / global health + design" framing first
- Phase: 1

**2. NavBar links 404**
No `app/about/`, `app/projects/`, or `app/contact/` directories exist. "Blogs" is in NavBar but explicitly out of scope.
- Warning: Any visitor clicking nav gets a 404
- Prevention: Remove Blogs from LINKS array, scaffold stub pages, move NavBar to root layout
- Phase: 1 (first code change)

**3. Headshot missing**
`public/headshot.jpg` does not exist. Hero layout centers on this image — a broken image is a hard disqualifier for a design portfolio.
- Warning: Check `public/` — only default SVGs present
- Prevention: Add headshot before `next build`
- Phase: 1

**4. Mixed project types without framing**
Dinner Party + Task Manager alongside carceral health research reads as a student project dump unless the projects index has a framing sentence and category tags making the diversity look intentional.
- Warning: No framing text above projects list, no type tags on cards
- Prevention: 2–3 sentence framing on projects index; subtle type tags per card
- Phase: 2

**5. Academic papers as PDF links, not case studies**
Laos and Cyberattacks pages will become dead ends without a plain-language problem statement, methodology explanation, key findings as callouts, and implications. PDF is a download at the bottom, not the main content.
- Warning: Project page is just a PDF embed or download link
- Prevention: Narrative structure — (1) problem, (2) your contribution + method, (3) 2–3 key findings, (4) implications, (5) PDF download
- Phase: 3

**6. Scrollytelling project described instead of demonstrated**
Locked Out of Care page uses only screenshots with no live link or video walkthrough.
- Warning: No working URL in the project page
- Prevention: Host on Vercel free tier or include a detailed video walkthrough; live link is far more compelling
- Phase: 3

**7. About page restates the resume**
First paragraph is credentials + dates with no story about why global health and no voice.
- Warning: Opening sentence starts with "I am a student at..."
- Prevention: Open with positioning statement in first person, then one concrete story about why health data matters. Credentials go second half.
- Phase: 4

**8. Contact section with a form**
Contact form adds infrastructure dependency and friction that will lose applicants.
- Warning: Form with input fields or third-party service
- Prevention: Mailto link + LinkedIn URL only. No form.
- Phase: 5

## Moderate

**9. NavBar not in root layout**
Currently rendered in `app/page.tsx`. Every new page must manually include it or it'll be absent.
- Prevention: Move to `app/layout.tsx` before scaffolding any additional pages
- Phase: 1

**10. Metadata describes a generic designer**
`layout.tsx` has `description: "Product designer & Georgetown student."` — appears in Google results and link previews.
- Prevention: Update to reflect data storyteller / global health identity
- Phase: 1

**11. `"use client"` overuse**
Adding interactivity for scroll effects or mobile menus via `"use client"` on parent components drags all imports into the client bundle.
- Prevention: Push `"use client"` to leaf nodes only. Use CSS for hover states.
- Phase: 2–3

**12. Images without stable dimensions causing layout shift**
`fill` prop requires parent with stable size. Project images need defined aspect ratios.
- Prevention: Use defined aspect ratios and `placeholder="blur"` on project images
- Phase: 2

## Minor

**13. No project order rationale**
Order by role relevance: Locked Out of Care first, academic research second, creative projects last.
- Phase: 2

**14. No visible email on contact page**
Always show email as plain text, not form-gated only.
- Phase: 5

**15. Default scaffold assets in `public/`**
`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` are unused boilerplate.
- Prevention: Delete before launch. 30-second cleanup.
- Phase: 1

## Phase Summary

| Phase | Pitfall | Action |
|-------|---------|--------|
| 1 | Hero framing | Rewrite text and bio first |
| 1 | NavBar | Remove Blogs, move to layout, scaffold stubs |
| 1 | Headshot | Add `public/headshot.jpg` before any build |
| 1 | Metadata | Update title + description in `layout.tsx` |
| 2 | Projects index | Framing sentence + category tags |
| 3 | Research pages | Case study narrative, PDF as supplement only |
| 3 | Locked Out of Care | Confirm live URL before building page |
| 4 | About | Open with positioning statement, not credentials |
| 5 | Contact | Mailto only, no form |
