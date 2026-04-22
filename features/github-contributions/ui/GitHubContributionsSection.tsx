"use client";
import { useGithubContributions } from "../hooks/useGithubContributions";
import { GitHubHeatmap } from "./GitHubHeatmap";

export function GitHubContributionsSection() {
  const { loading, contributions, error } = useGithubContributions();

  if (loading || !contributions) return <p>Загрузка активности GitHub...</p>;
  if (error) return <p>Не удалось загрузить данные: {error.message}</p>;

  return <GitHubHeatmap data={contributions} />;
}