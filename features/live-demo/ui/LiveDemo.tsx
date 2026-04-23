"use client";

import { useEffect } from "react";
import { useLiveDemoState } from "../hooks/useLiveDemoState";
import { DemoEditor } from "./DemoEditor";
import { DemoPreview } from "./DemoPreview";
import { reactContactFormCode } from "@/features/react-contact-form/config/code";
import { useTranslations } from "next-intl";

export function LiveDemo() {
  const t = useTranslations("contactForm");
  const { output, handleRun, isRunning } = useLiveDemoState();
  const code = reactContactFormCode;

  useEffect(() => {
    handleRun();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[#00ffcc] border-b border-[#00ffcc]/20 pb-3 flex-1">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoEditor
          code={code}
          onRun={handleRun}
          output={output}
        />
        <DemoPreview
          isEnabled={isRunning || output !== 'Click "Run" to see the demo'}
        />
      </div>
    </div>
  );
}