import { TimelineEntry } from '@/entities/work-entry/model/types';

interface WorkHistoryTranslations {
  entries: {
    title: string;
    company: string;
    period: string;
    achievements: string[];
  }[];
}

export function getWorkHistory(translations: WorkHistoryTranslations): TimelineEntry[] {
  return translations.entries.map(entry => ({
    title: entry.title,
    company: entry.company,
    period: entry.period,
    achievements: entry.achievements,
  }));
}