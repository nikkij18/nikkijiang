import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import BackToMap from '@/components/BackToMap';
import Link from 'next/link';

const serif = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" };

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
    <main className="min-h-screen flex flex-col pt-28 pb-16"
      style={{ paddingLeft: "clamp(2rem, 6vw, 5rem)", paddingRight: "clamp(2rem, 6vw, 5rem)" }}
    >
      {/* Back to projects */}
      <Link
        href="/projects"
        className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-pink-400 transition-colors mb-6 inline-block"
        style={serif}
      >
        ← Projects
      </Link>

      {/* Title block */}
      <h1
        className="font-bold leading-[0.88] uppercase text-neutral-900 mb-4"
        style={{ ...serif, fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
      >
        {project.title}
      </h1>
      <div className="flex items-center gap-4 mb-10">
        <span className="text-xs uppercase tracking-[0.15em] text-pink-400 border border-pink-200 px-2 py-0.5" style={serif}>
          {project.contentType.replace('-', ' ')}
        </span>
        <span className="text-xs text-neutral-400" style={serif}>{project.role}</span>
      </div>

      <hr style={{ borderTopWidth: 1, borderColor: "#ddd", marginBottom: "2.5rem" }} />

      {/* PDF viewer */}
      {project.pdfUrl && (
        <div className="w-full" style={{ height: 'calc(100vw * 1.414)', maxHeight: 'none' }}>
          <iframe
            src={project.pdfUrl}
            className="w-full h-full"
            style={{ border: 'none' }}
            title={project.title}
          />
        </div>
      )}
    </main>
    <BackToMap />
    </>
  );
}
