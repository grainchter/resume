import { CONTRIBUTIONS_QUERY } from "@/shared/lib/github/ContributionsQuery";
import { githubGraphQLClient } from "@/shared/lib/github/githubGraphQLClient";
import { ContributionsResponse } from "@/shared/types/github";
import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

const getCachedContributions = unstable_cache(
  async (username: string) => {
    const data = await githubGraphQLClient<ContributionsResponse>(
      CONTRIBUTIONS_QUERY,
      { username },
    );
    return data;
  },
  ["github-contributions"],
  {
    revalidate: 86400, // 24 часа
    tags: ["github-contributions"],
  },
);

export async function GET() {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    return NextResponse.json(
      { error: "GITHUB_USERNAME не задан в переменных окружения" },
      { status: 500 },
    );
  }

  try {
    const data = await getCachedContributions(username);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch (error: unknown) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Ошибка запроса к GitHub";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}