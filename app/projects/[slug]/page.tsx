import { getAllProjects } from '@/lib/projects'

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-sm text-neutral-500">{slug} — coming soon.</p>
    </main>
  )
}
