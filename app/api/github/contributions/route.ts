import { CONTRIBUTIONS_QUERY } from "@/shared/lib/github/ContributionsQuery";
import { githubGraphQLClient } from "@/shared/lib/github/githubGraphQLClient";
import { NextResponse } from "next/server";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: Week[];
}

interface ContributionsResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
    };
  };
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    return NextResponse.json(
      { error: "GITHUB_USERNAME не задан в переменных окружения" },
      { status: 500 },
    );
  }

  try {
    const data = await githubGraphQLClient<ContributionsResponse>(
      CONTRIBUTIONS_QUERY,
      { username },
    );

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Ошибка запроса к GitHub";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
