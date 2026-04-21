"use client";

import { Terminal } from "@/shared/ui/Terminal";
import { useTranslations } from "next-intl";

export default function HeroSection() {
    const t = useTranslations("heroSection");
  return (
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 h-[400px] lg:h-[500px]">
              <Terminal />
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00ffcc] to-[#00ffcc]/40 border-4 border-[#00ffcc]/30 flex items-center justify-center">
                  <span className="font-['JetBrains_Mono'] text-black">avatar</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[#00ffcc]/60 font-['JetBrains_Mono'] tracking-wider">{t('resumeTitle')}</div>
                <p className="text-gray-400">{t('resumeDescription')}</p>
              </div>
            </div>
          </div>
        </section>
  );
}