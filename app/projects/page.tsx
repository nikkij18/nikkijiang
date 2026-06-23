import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/projects";
import PageReveal from "@/components/PageReveal";
import BackToMap from "@/components/BackToMap";
import type { Project } from "@/lib/types";

const serif = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" };
const dmSans = { fontFamily: "var(--font-dm-sans), sans-serif" };

const TYPE_LABELS: Record<string, string> = {
  'interactive-site': 'Interactive',
  'research-report':  'Research',
  'academic-paper':   'Academic',
  'creative-site':    'Creative',
  'side-project':     'Project',
};

const PAPERS = new Set(['research-report', 'academic-paper']);

function projectHref(p: Project): { href: string; external: boolean } {
  if (PAPERS.has(p.contentType)) return { href: `/projects/${p.slug}`, external: false };
  const url = p.liveUrl ?? p.githubUrl;
  if (url) return { href: url, external: true };
  return { href: `/projects/${p.slug}`, external: false };
}

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
    <PageReveal>
    <main
      className="min-h-screen flex flex-col pt-28 pb-16"
      style={{ paddingLeft: "clamp(2rem, 6vw, 5rem)", paddingRight: "clamp(2rem, 6vw, 5rem)" }}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6" style={serif}>
        02 — Work
      </p>

      <h1
        className="font-bold leading-[0.88] uppercase text-neutral-900 mb-10"
        style={{ ...serif, fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
      >
        Projects &amp;
        <br />
        Research
      </h1>

      <hr style={{ borderTopWidth: 1, borderColor: "#ddd", marginBottom: "3rem" }} />

      <div className="flex flex-col divide-y divide-neutral-100">
        {projects.map((project) => {
          const { href, external } = projectHref(project);
          return (
            <Link
              key={project.slug}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between gap-8 py-7 hover:pl-2 transition-all duration-200"
            >
              <div className="relative flex-shrink-0 w-24 h-16 overflow-hidden">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-pink-100" />
                )}
                <div className="absolute inset-0 bg-pink-400/40" />
              </div>
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="text-xs uppercase tracking-[0.15em] text-pink-400 border border-pink-200 px-2 py-0.5"
                    style={serif}
                  >
                    {TYPE_LABELS[project.contentType] ?? project.contentType}
                  </span>

                </div>
                <h2
                  className="font-semibold text-neutral-900 group-hover:text-pink-500 transition-colors leading-tight"
                  style={{ ...serif, fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
                >
                  {project.title}
                </h2>
                <p
                  className="text-neutral-500 leading-relaxed line-clamp-2"
                  style={{ ...dmSans, fontSize: "clamp(0.875rem, 1.2vw, 1rem)" }}
                >
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs text-neutral-400 uppercase tracking-wider" style={serif}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className="text-neutral-300 group-hover:text-pink-400 transition-colors text-xl flex-shrink-0"
                style={serif}
              >
                →
              </span>
            </Link>
          );
        })}
      </div>
    </main>
    </PageReveal>
    <BackToMap />
    </>
  );
}
