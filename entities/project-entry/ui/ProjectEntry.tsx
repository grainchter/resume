import { ProjectsEntry } from "../model/types";

export function ProjectEntry({ title, description }: ProjectsEntry) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ffcc]/20 to-transparent rounded-sm blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative bg-black/40 backdrop-blur-md border border-[#00ffcc]/30 p-6 h-full">
        <h3 className="mb-3 text-[#00ffcc]">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>
        <div className="flex items-center gap-2 text-xs text-[#00ffcc]/70 border border-[#00ffcc]/20 px-3 py-1.5 w-fit hover:bg-[#00ffcc]/10 transition-colors cursor-pointer">
          <span>View Code (GitHub)</span>
        </div>
      </div>
    </div>
  );
}
