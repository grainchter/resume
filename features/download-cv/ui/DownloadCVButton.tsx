"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export function DownloadCVButton() {
  const locale = useLocale();
  const t = useTranslations("workHistory");
  const [isLoading, setIsLoading] = useState(false);

  const getFileName = () => t("fileName")

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const fileUrl = `/cv/${locale}.pdf`;
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = getFileName();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="flex items-center gap-2 bg-primary/10 border border-primary text-primary px-4 py-2 hover:bg-primary/20 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>{isLoading ? "Loading..." : t("downloadButton")}</span>
    </button>
  );
}