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
    <main
      className="min-h-screen flex flex-col justify-center gap-4 pt-24"
      style={{ paddingLeft: "clamp(2rem, 6vw, 5rem)", paddingRight: "clamp(2rem, 6vw, 5rem)" }}
    >
      <p className="text-sm text-neutral-500">{slug} — coming soon.</p>
    </main>
  )
}
