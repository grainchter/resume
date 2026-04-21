import { graphql } from "@octokit/graphql";

export const githubGraphQLClient = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});