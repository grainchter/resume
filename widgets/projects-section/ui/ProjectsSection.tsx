import { ProjectEntry } from "@/entities/project-entry/ui/ProjectEntry";
import { getProjects } from "@/shared/utils/getProjects";
import { getTranslations } from "next-intl/server";

export interface Project {
  title: string;
  description: string;
  link: string;
}

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const rawEntries = t.raw("projects") as any[];
  const projects = getProjects({ projects: rawEntries });
  return (
    <section className="mb-24">
      <h2 className="mb-8 text-[#00ffcc] border-b border-[#00ffcc]/20 pb-3">
        {t("title")}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectEntry
            key={index}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
}
