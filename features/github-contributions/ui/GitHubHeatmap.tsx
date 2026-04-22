import { ContributionsResponse } from "@/shared/types/github";

interface GitHubHeatmapProps {
  data: ContributionsResponse
}

export function GitHubHeatmap({ data }: GitHubHeatmapProps) {
  const calendar = data.user.contributionsCollection.contributionCalendar;
  const weeks = calendar.weeks;

  // Функция определения цвета в зависимости от количества вкладов
  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-800/20';
    if (count <= 2) return 'bg-[#00ffcc]/20';
    if (count <= 5) return 'bg-[#00ffcc]/40';
    if (count <= 8) return 'bg-[#00ffcc]/60';
    if (count <= 12) return 'bg-[#00ffcc]/80';
    return 'bg-[#00ffcc]';
  };

  // Форматирование даты для подсказки
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="inline-flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.contributionDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm ${getColor(day.contributionCount)} border border-[#00ffcc]/10 hover:border-[#00ffcc]/50 transition-all`}
                title={`${formatDate(day.date)}: ${day.contributionCount} вклад${day.contributionCount === 1 ? '' : day.contributionCount < 5 ? 'а' : 'ов'}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Всего вкладов за год: {calendar.totalContributions}
      </div>
    </div>
  );
}