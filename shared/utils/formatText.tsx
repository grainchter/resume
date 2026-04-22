import { ReactNode } from 'react';

export function formatTextWithTags(text: string): ReactNode[] {
  const parts = text.split(/(<[^>]+>)/g);
  return parts.map((part, index) => {
    if (part.startsWith('<') && part.endsWith('>')) {
      const tech = part.slice(1, -1);
      return (
        <span key={index} className="font-['JetBrains_Mono'] text-[#00ffcc] text-sm">
          {tech}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}