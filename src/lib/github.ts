import type { GithubRepo, GithubUser } from "@/lib/types";

const GITHUB_API_URL = "https://api.github.com";

// Use a personal access token to avoid rate limiting.
// Add it to your .env.local file as GITHUB_TOKEN.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Separate headers for REST (v3) and GraphQL (v4)
const REST_HEADERS: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

const GRAPHQL_HEADERS: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

if (GITHUB_TOKEN) {
  REST_HEADERS["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  GRAPHQL_HEADERS["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
}

/**
 * Fetches a GitHub user's profile information.
 * @param username The GitHub username.
 * @returns A promise that resolves to the user's data or null if not found.
 */
export async function getUser(username: string): Promise<GithubUser | null> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      headers: REST_HEADERS,
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error(`Error fetching user '${username}': ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch GitHub user '${username}':`, error);
    return null;
  }
}

/**
 * Fetches a user's pinned repositories using a GraphQL query.
 * @param username The GitHub username.
 * @returns A promise that resolves to an array of pinned repositories.
 */
export async function getPinnedRepos(username: string): Promise<GithubRepo[]> {
  // Helper to normalize data shape
  const mapToGithubRepo = (repo: any): GithubRepo => {
    const rawId = repo?.id;
    const numericId = typeof rawId === 'number' ? rawId : Number.isFinite(Number(rawId)) ? Number(rawId) : 0;
    return {
      id: numericId,
      name: repo?.name ?? '',
      full_name: repo?.nameWithOwner ?? repo?.full_name ?? '',
      html_url: repo?.url ?? repo?.html_url ?? '',
      description: repo?.description ?? null,
      url: repo?.url ?? repo?.html_url ?? '',
      stargazers_count: repo?.stargazers?.totalCount ?? repo?.stars ?? 0,
      watchers_count: repo?.watchers?.totalCount ?? 0,
      language: repo?.primaryLanguage?.name ?? repo?.language ?? null,
      forks_count: repo?.forkCount ?? repo?.forks ?? 0,
      open_issues_count: repo?.issues?.totalCount ?? 0,
    };
  };

  // 1) Try GitHub GraphQL (requires token)
  if (GITHUB_TOKEN) {
    const graphqlQuery = {
      query: `
        query PinnedRepos($username: String!) {
          user(login: $username) {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  id
                  name
                  nameWithOwner
                  description
                  url
                  stargazers { totalCount }
                  watchers { totalCount }
                  primaryLanguage { name }
                  forkCount
                  issues(states: OPEN) { totalCount }
                }
              }
            }
          }
        }
      `,
      variables: { username },
    } as const;

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: GRAPHQL_HEADERS,
        body: JSON.stringify(graphqlQuery),
        next: { revalidate: 3600 }, // Revalidate every hour
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if (!jsonResponse?.errors) {
          const pinnedItems = Array.isArray(jsonResponse?.data?.user?.pinnedItems?.nodes)
            ? jsonResponse.data.user.pinnedItems.nodes
            : [];
          if (pinnedItems.length > 0) {
            return pinnedItems.map(mapToGithubRepo);
          }
        } else if (process.env.NODE_ENV !== 'production') {
          console.warn('[GitHub] GraphQL errors:', jsonResponse.errors);
        }
      } else if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `[GitHub] GraphQL request failed for '${username}': ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Failed to fetch pinned GitHub repos via GraphQL for '${username}':`, error);
      }
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `[GitHub] No GITHUB_TOKEN set; falling back to public pinned repos service for '${username}'. Add GITHUB_TOKEN to .env.local to use GitHub GraphQL API.`
    );
  }

  // 2) Fallback: use a public API that scrapes pinned repositories (no token needed)
  //    Source: https://gh-pinned-repos.egoist.dev/
  try {
    const res = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${encodeURIComponent(username)}`,
      { next: { revalidate: 1800 } } // revalidate every 30 minutes
    );
    if (!res.ok) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `[GitHub] Fallback pinned repos service failed for '${username}': ${res.status} ${res.statusText}`
        );
      }
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    // The service returns: [{ owner, repo, link, description, language, stars, forks, ... }]
    return data.slice(0, 6).map((item: any) =>
      mapToGithubRepo({
        id: 0,
        name: item?.repo,
        nameWithOwner: `${item?.owner}/${item?.repo}`,
        description: item?.description ?? null,
        url: item?.link,
        html_url: item?.link,
        primaryLanguage: { name: item?.language ?? null },
        stargazers: { totalCount: item?.stars ?? 0 },
        forkCount: item?.forks ?? 0,
      })
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Failed to fetch pinned repos from fallback service for '${username}':`, error);
    }
    return [];
  }
}
