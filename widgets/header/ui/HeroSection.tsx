"use client";

import Image from "next/image";
import { Terminal } from "@/shared/ui/Terminal";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { scrollReveal } from "@/shared/constants/animations";

export default function HeroSection() {
  const t = useTranslations("heroSection");
  return (
    <motion.section className="mb-24" {...scrollReveal}>
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1 h-[400px] lg:h-[500px]">
          <Terminal />
        </div>
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start mb-6">
            <div className="relative w-42 h-42 rounded-full bg-gradient-to-br from-primary to-primary/40 overflow-hidden">
              <Image
                priority
                src="/avatar/avatar.png"
                alt="Avatar"
                width={200}
                height={200}
                className="object-cover mt-[10px]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-primary/60 font-['JetBrains_Mono'] tracking-wider">
              {t("resumeTitle")}
            </div>
            <p className="text-gray-400">{t("resumeDescription")}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
