import { GitHubContributionsSection } from "@/features/github-contributions/ui/GitHubContributionsSection";
import { LiveDemo } from "@/features/live-demo/ui/LiveDemo";
import { routing } from "@/shared/config/i18n/routing";
import LocaleSwitcher from "@/shared/ui/LocaleSwitcher";
import { Footer } from "@/widgets/footer/ui/Footer";
import HeroSection from "@/widgets/header/ui/HeroSection";
import { ProjectsSection } from "@/widgets/projects-section/ui/ProjectsSection";
import { WorkTimeline } from "@/widgets/work-timeline/ui/WorkTimeline";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{ locale: string }>;
};

async function getLocaleFromCookie(): Promise<string> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE");

  if (localeCookie && routing.locales.includes(localeCookie.value as any)) {
    return localeCookie.value;
  }

  return routing.defaultLocale;
}

export async function generateMetadata({ params }: Props) {
  const locale = await getLocaleFromCookie();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
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
