"use client";

import { useTranslations } from "next-intl";
import { WorkEntry } from "@/entities/work-entry/ui/WorkEntry";
import { DownloadCVButton } from "@/features/download-cv/ui/DownloadCVButton";
import { getWorkHistory } from "@/shared/utils/getWorkHistory";
import { motion } from "motion/react";
import { scrollReveal } from "@/shared/constants/animations";

export function WorkTimeline() {
  const t = useTranslations("workHistory");
  const rawEntries = t.raw("entries") as any[];
  const workHistory = getWorkHistory({ entries: rawEntries });

  return (
    <motion.div {...scrollReveal}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-[#00ffcc] border-b border-[#00ffcc]/20 pb-3 flex-1">
          {t("title")}
        </h2>
        <DownloadCVButton />
      </div>

      <div className="space-y-8">
        {workHistory.map((entry, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-8"
          >
            <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-0">
              <div className="w-4 h-4 rounded-full bg-[#00ffcc] border-4 border-[#00ffcc]/30 flex-shrink-0"></div>
              <div className="flex-1 md:flex-none md:w-0.5 md:h-full bg-gradient-to-b from-[#00ffcc]/50 to-transparent md:ml-1.5 h-0.5 md:h-auto"></div>
            </div>
            <WorkEntry entry={entry} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
