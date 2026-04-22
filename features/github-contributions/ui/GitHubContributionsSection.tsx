"use client";
import { useGithubContributions } from "../hooks/useGithubContributions";
import { GitHubHeatmap } from "./GitHubHeatmap";

export function GitHubContributionsSection() {
  const { loading, contributions, error } = useGithubContributions();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[#00ffcc] border-b border-[#00ffcc]/20 pb-3 flex-1">
          GitHub активность
        </h2>
      </div>

      {loading || !contributions ? (
        <p className="text-center text-gray-400">
          Загрузка активности GitHub...
        </p>
      ) : error ? (
        <p className="text-center text-red-400">
          Не удалось загрузить данные: {error.message}
        </p>
      ) : (
        <>
          <GitHubHeatmap data={contributions} />
          <p className="text-gray-500 text-xs mt-4 opacity-80">
            Данные из GitHub обновляются раз в сутки и кэшируются для быстрой
            загрузки.
          </p>
        </>
      )}
    </div>
  );
}
