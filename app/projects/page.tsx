import PageReveal from "@/components/PageReveal";
import BackToMap from "@/components/BackToMap";
import ProjectsSection from "@/components/ProjectsSection";

export default function ProjectsPage() {
  return (
    <>
      <PageReveal>
        <main className="min-h-screen pt-20">
          <ProjectsSection />
        </main>
      </PageReveal>
      <BackToMap />
    </>
  );
}
