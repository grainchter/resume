import { ProjectsEntry } from "../model/types";

export function ProjectEntry({ title, description, link }: ProjectsEntry) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-transparent rounded-sm blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative bg-black/40 backdrop-blur-md border border-primary/30 p-6 h-full">
        <h3 className="mb-3 text-primary">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs text-primary/70 border border-primary/20 px-3 py-1.5 w-fit hover:bg-primary/10 transition-colors"
        >
          <span>View Code (GitHub)</span>
        </a>
      </div>
    </div>
  );
}
