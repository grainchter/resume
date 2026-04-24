"use client";

import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";

interface DemoEditorProps {
  code: string;
  onRun: () => void;
  output: string;
  language?: "react";
}

let highlighterPromise: Promise<Highlighter>;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["tsx"],
    });
  }
  return highlighterPromise;
}

export function DemoEditor({
  code,
  onRun,
  output,
}: DemoEditorProps) {
  const [highlighted, setHighlighted] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function highlight() {
      const highlighter = await getHighlighter();

      const html = highlighter.codeToHtml(code, {
        lang: "tsx",
        theme: "github-dark",
      });

      if (mounted) {
        setHighlighted(html);
      }
    }

    highlight();

    return () => {
      mounted = false;
    };
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-transparent rounded-sm blur"></div>

      <div className="relative bg-black border border-primary/30 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-black border-b border-primary/20 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>

            <span className="ml-2 text-xs text-gray-500 font-mono">
              ContactForm.tsx
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="text-xs px-2 py-1 border border-gray-700 hover:bg-gray-800 transition"
            >
              {copied ? "Copied" : "Copy"}
            </button>

            <button
              onClick={onRun}
              className="bg-primary/10 border border-primary/50 text-primary px-3 py-1 text-xs hover:bg-primary/20 transition"
            >
              Run
            </button>
          </div>
        </div>

        <div
          className="text-xs overflow-auto h-[500px] shiki-wrapper"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />

        <div className="border-t border-primary/20 px-4 py-2 bg-black/60">
          <div className="text-xs font-mono text-gray-500">
            {output}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .shiki {
          padding: 16px;
          background: transparent !important;
          overflow-x: auto;
        }

        .shiki pre {
          margin: 0;
        }

        .shiki code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco,
            Consolas, "Liberation Mono", "Courier New", monospace;
        }
      `}</style>
    </div>
  );
}