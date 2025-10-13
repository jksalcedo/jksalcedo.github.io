import type { GithubRepo, GithubUser } from "@/lib/types";

const GITHUB_API_URL = "https://api.github.com";

// Use a personal access token to avoid rate limiting.
// Add it to your .env.local file as GITHUB_TOKEN.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
  "Accept": "application/vnd.github.v3+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (GITHUB_TOKEN) {
  headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
}

/**
 * Fetches a GitHub user's profile information.
 * @param username The GitHub username.
 * @returns A promise that resolves to the user's data or null if not found.
 */
export async function getUser(username: string): Promise<GithubUser | null> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      headers,
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
                html_url
                description
                fork
                url
                stargazers {
                  totalCount
                }
                watchers {
                  totalCount
                }
                primaryLanguage {
                  name
                }
                forkCount
                issues(states: OPEN) {
                  totalCount
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      username: username,
    },
  };

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(graphqlQuery),
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error(`Error fetching pinned repos for '${username}': ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error('Error body:', errorBody);
      return [];
    }

    const jsonResponse = await response.json();
    
    if (jsonResponse.errors) {
        console.error("GraphQL errors:", jsonResponse.errors);
        return [];
    }
    
    const pinnedItems = jsonResponse.data?.user?.pinnedItems?.nodes || [];

    // Map the GraphQL response to our GithubRepo type
    return pinnedItems.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.nameWithOwner,
      html_url: repo.html_url,
      description: repo.description,
      fork: repo.fork,
      url: repo.url,
      stargazers_count: repo.stargazers.totalCount,
      watchers_count: repo.watchers.totalCount,
      language: repo.primaryLanguage?.name || null,
      forks_count: repo.forkCount,
      open_issues_count: repo.issues.totalCount,
    }));

  } catch (error) {
    console.error(`Failed to fetch pinned GitHub repos for '${username}':`, error);
    return [];
  }
}
