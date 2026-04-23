import { ProjectsEntry } from "@/entities/project-entry/model/types";

interface ProjectsTranslations {
  projects: {
    title: string;
    description: string;
    link: string;
  }[];
}

export function getProjects(
  translations: ProjectsTranslations,
): ProjectsEntry[] {
  return translations.projects.map((project) => ({
    title: project.title,
    description: project.description,
    link: project.link,
  }));
}
