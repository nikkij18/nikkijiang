// lib/projects.ts
import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'locked-out-of-care',
    title: 'Locked Out of Care',
    contentType: 'interactive-site',
    tags: ['data visualization', 'health equity', 'interactive'],
    featured: true,
    shortDescription: 'An interactive data story on barriers to healthcare access.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/locked-out-of-care.jpg',
    liveUrl: 'https://placeholder.example.com',
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
    shortDescription: 'Research report on ransomware attacks targeting US hospitals.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/cyberattacks-healthcare.jpg',
    pdfUrl: '/files/cyberattacks-healthcare.pdf',
    year: 2024,
    role: 'Researcher',
    tools: ['Policy analysis'],
    status: 'archived',
    metaDescription: 'Research on ransomware attacks targeting US hospitals.',
  },
  {
    slug: 'laos-health-systems',
    title: 'Comparative Health Systems: Laos',
    contentType: 'academic-paper',
    tags: ['global health', 'comparative analysis', 'Laos'],
    featured: false,
    shortDescription: 'Academic paper comparing Laos health system structure.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/laos-health-systems.jpg',
    pdfUrl: '/files/laos-health-systems.pdf',
    year: 2023,
    role: 'Researcher',
    tools: ['Academic writing'],
    status: 'archived',
    metaDescription: 'Academic analysis of the Laos health system.',
  },
  {
    slug: 'dinner-party',
    title: 'Dinner Party Invite & Archive',
    contentType: 'creative-site',
    tags: ['creative', 'web design', 'personal'],
    featured: false,
    shortDescription: 'A creative site for dinner party invites and archiving.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/dinner-party.jpg',
    liveUrl: 'https://placeholder.example.com',
    year: 2024,
    role: 'Designer & Developer',
    tools: ['HTML', 'CSS'],
    status: 'live',
    metaDescription: 'Creative site for dinner party invites and memory archiving.',
  },
  {
    slug: 'task-manager',
    title: 'Task Manager',
    contentType: 'side-project',
    tags: ['productivity', 'side project', 'web app'],
    featured: false,
    shortDescription: 'A personal task management side project.',
    longDescription: 'Placeholder — expand in Phase 2.',
    coverImage: '/images/projects/task-manager.jpg',
    liveUrl: 'https://placeholder.example.com',
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
