import { useTranslations, useLocale } from "next-intl";
import { ContributionsResponse } from "@/shared/types/github";

interface GitHubHeatmapProps {
  data: ContributionsResponse;
}

export function GitHubHeatmap({ data }: GitHubHeatmapProps) {
  const t = useTranslations();
  const locale = useLocale();

  const calendar = data.user.contributionsCollection.contributionCalendar;
  const weeks = calendar.weeks;

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-800/20';
    if (count <= 2) return 'bg-primary/20';
    if (count <= 5) return 'bg-primary/40';
    if (count <= 8) return 'bg-primary/60';
    if (count <= 12) return 'bg-primary/80';
    return 'bg-primary';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getTooltipText = (dateStr: string, count: number) => {
    const formattedDate = formatDate(dateStr);
    const contributionWord = t('contributions', { count });
    return `${formattedDate}: ${count} ${contributionWord}`;
  };

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden pb-2">
      <div className="inline-flex gap-1" style={{ minWidth: 'min-content' }}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.contributionDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm ${getColor(day.contributionCount)} border border-primary/10 hover:border-primary/50 transition-all`}
                title={getTooltipText(day.date, day.contributionCount)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}