import { formatTextWithTags } from '@/shared/utils/formatText';
import { TimelineEntry } from '../model/types';

interface WorkEntryProps {
  entry: TimelineEntry;
}

export function WorkEntry({ entry }: WorkEntryProps) {
  return (
    <div className="relative group pb-6 md:pb-0">
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/5 to-transparent rounded-sm blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative">
        <div className="mb-3">
          <h3 className="text-primary mb-1">{entry.title}</h3>
          <div className="text-gray-400 text-sm">
            {entry.company} <span className="text-gray-600">•</span>{' '}
            <span className="text-gray-500">{entry.period}</span>
          </div>
        </div>
        <ul className="space-y-2 text-gray-400 text-sm">
          {entry.achievements.map((achievement, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-primary/60 flex-shrink-0">▹</span>
              <span>{formatTextWithTags(achievement)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}