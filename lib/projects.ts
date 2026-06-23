// lib/projects.ts
import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'locked-out-of-care',
    title: 'Locked Out of Care',
    contentType: 'interactive-site',
    tags: ['data visualization', 'health equity', 'interactive'],
    featured: true,
    shortDescription: 'An interactive scrollytelling data story exploring how systemic barriers leave patients locked out of care. Built around a German case study, the piece weaves data visualization with personal narrative to show who falls through the cracks and why. Design as advocacy, because the numbers only matter if people actually see them.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/locked-out-of-care.png',
    liveUrl: 'https://lockedoutofcare.vercel.app/index.html',
    year: 2024,
    role: 'Designer & Developer',
    tools: ['D3.js', 'Svelte'],
    status: 'live',
    metaDescription: 'Interactive data story on barriers to healthcare access.',
  },
  {
    slug: 'cyberattacks-healthcare',
    title: 'Cyberattacks on US Healthcare',
    contentType: 'research-report',
    tags: ['research', 'cybersecurity', 'health systems'],
    featured: true,
    shortDescription: 'A policy research report investigating the surge of foreign ransomware attacks targeting US hospitals and health systems. Examines threat actors, attack patterns, and the downstream patient harm that rarely makes headlines. Written at the intersection of cybersecurity and health policy, because attacks on hospitals are attacks on patients.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/cyberattacks-healthcare.jpg',
    pdfUrl: '/Cyber Attacks Case Study-Jiang, Nikki .pdf',
    year: 2024,
    role: 'Researcher',
    tools: ['Policy analysis'],
    status: 'archived',
    metaDescription: 'Research on foreign ransomware attacks targeting US hospitals.',
  },
  {
    slug: 'myanmar-health-systems',
    title: 'Myanmar Research Paper',
    contentType: 'academic-paper',
    tags: ['global health', 'comparative analysis', 'Myanmar'],
    featured: false,
    shortDescription: 'An academic research paper examining health system resilience and fragmentation in Myanmar. Analyzes how political instability, funding gaps, and infrastructure collapse compound each other, and what that means for the people caught inside. A case study in what happens when healthcare becomes collateral damage.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/myanmar-health-systems.jpg',
    pdfUrl: '/Myanmar Research Paper–Jiang, Nikki  (2).pdf',
    year: 2023,
    role: 'Researcher',
    tools: ['Academic writing'],
    status: 'archived',
    metaDescription: 'Academic research paper on Myanmar health systems.',
  },
  {
    slug: 'dinner-party',
    title: 'Dinner Party Invite & Archive',
    contentType: 'creative-site',
    tags: ['creative', 'web design', 'personal'],
    featured: false,
    shortDescription: 'A living digital archive and invite for a recurring dinner series. Every gathering gets its own zine-style spread with photos, menus, and moments, so nothing gets lost in a group chat. Built for the friends who always show up, and a reason for the ones who have not yet.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/dinner-party.png',
    liveUrl: 'https://jesres-300.vercel.app/gallery',
    year: 2024,
    role: 'Designer & Developer',
    tools: ['HTML', 'CSS'],
    status: 'live',
    metaDescription: 'Creative site for dinner party invites and memory archiving.',
  },
  {
    slug: 'task-manager',
    title: 'Get It Together',
    contentType: 'side-project',
    tags: ['productivity', 'side project', 'web app'],
    featured: false,
    shortDescription: 'Personal task tracker that sorts agenda items based on urgency and expected time use. Inspired by my own pain point shared by many students around me of spending too much time thinking about what to do rather than getting things done. The planner that does the thinking so you can do the do-ing. Time to get it together.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/task-manager.png',
    liveUrl: 'https://getittogether.vercel.app/',
    githubUrl: 'https://github.com/placeholder',
    year: 2024,
    role: 'Developer',
    tools: ['React', 'TypeScript'],
    status: 'in-progress',
    metaDescription: 'A personal task management app built as a side project.',
  },
]

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
