import { GitHubContributionsSection } from "@/features/github-contributions/ui/GitHubContributionsSection";
import { LiveDemo } from "@/features/live-demo/ui/LiveDemo";
import LocaleSwitcher from "@/shared/ui/LocaleSwitcher";
import { Footer } from "@/widgets/footer/ui/Footer";
import HeroSection from "@/widgets/header/ui/HeroSection";
import { ProjectsSection } from "@/widgets/projects-section/ui/ProjectsSection";
import { WorkTimeline } from "@/widgets/work-timeline/ui/WorkTimeline";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 font-['JetBrains_Mono']">
      <div className="min-w-screen grid place-items-end p-[10px]">
        <LocaleSwitcher />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative grid gap-y-15">
        <HeroSection />
        <WorkTimeline />
        <ProjectsSection />
        <GitHubContributionsSection />
        <LiveDemo />
        <Footer />
      </div>
    </div>
  );
}
