"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, Fragment } from "react";
import { stringToArray } from "../utils/stringToArray";

export function Terminal() {
  const t = useTranslations("heroSection");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-black border border-[#00ffcc]/20 overflow-hidden backdrop-blur-sm">
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-[#00ffcc]/20 px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span className="ml-2 text-xs text-gray-500 font-['JetBrains_Mono']">
          bash
        </span>
      </div>
      <div className="p-6 font-['JetBrains_Mono'] text-sm">
        <div className="text-[#00ffcc] mb-4">
          <span className="text-gray-500">~</span> $ about --profile
        </div>
        <div className="space-y-2 text-gray-300">
          <div>
            <span className="text-[#00ffcc]">name:</span> "{t("name")}"
          </div>
          <div>
            <span className="text-[#00ffcc]">role:</span> "{t("role")}"
          </div>
          <div>
            <span className="text-[#00ffcc]">experience:</span> "
            {t("experience")}"
          </div>
          <div>
            <span className="text-[#00ffcc]">specialization:</span> [
            {stringToArray(t("specialization"))?.map((spec, index) => (
              <Fragment key={`${spec}-${index}`}>
                {index !== 0 && <>,{" "}</>}<span className="text-yellow-400">"{spec}"</span>
              </Fragment>
            ))}
            ]
          </div>
          <div className="mt-6">
            <span className="text-gray-500">~</span> ${" "}
            <span
              className={`inline-block w-2 h-4 bg-[#00ffcc] ${showCursor ? "opacity-100" : "opacity-0"}`}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
