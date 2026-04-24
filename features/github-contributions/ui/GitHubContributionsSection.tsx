"use client";
import { useTranslations } from "next-intl";
import { useGithubContributions } from "../hooks/useGithubContributions";
import { GitHubHeatmap } from "./GitHubHeatmap";
import { motion } from "motion/react";
import { scrollReveal } from "@/shared/constants/animations";

export function GitHubContributionsSection() {
  const t = useTranslations("githubContributions");
  const { loading, contributions, error } = useGithubContributions();

  return (
    <motion.div
      className="max-w-full overflow-hidden px-4 sm:px-6 lg:px-8"
      {...scrollReveal}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-primary border-b border-primary/20 pb-3 flex-1">
          {t("title")}
        </h2>
      </div>

      {loading || !contributions ? (
        <p className="text-center text-gray-400">{t("loader")}</p>
      ) : error ? (
        <p className="text-center text-red-400">
          {t("error")} {error.message}
        </p>
      ) : (
        <>
          <GitHubHeatmap data={contributions} />
          <p className="text-gray-500 text-xs mt-4 opacity-80">{t("info")}</p>
        </>
      )}
    </motion.div>
  );
}
