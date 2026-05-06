// lib/types.ts

export type ContentType =
  | 'interactive-site'
  | 'research-report'
  | 'academic-paper'
  | 'creative-site'
  | 'side-project'

export type ProjectStatus = 'live' | 'archived' | 'in-progress'

export interface Project {
  slug: string
  title: string
  subtitle?: string
  contentType: ContentType
  tags: string[]
  featured: boolean
  shortDescription: string    // for /projects index cards
  longDescription: string     // for detail page
  coverImage: string          // "/images/projects/project-cover.jpg"
  images?: string[]
  liveUrl?: string
  pdfUrl?: string             // "/files/paper.pdf" — served from /public/files/
  githubUrl?: string
  year: number
  role: string
  tools: string[]
  status: ProjectStatus
  metaDescription: string     // SEO/share description
}
