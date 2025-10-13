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

export async function getUser(username: string): Promise<GithubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      headers,
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error(`Error fetching user '${username}': ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch GitHub user '${username}':`, error);
    return null;
  }
}

export async function getRepos(username: string): Promise<GithubRepo[]> {
  try {
    const res = await fetch(`${GITHUB_API_URL}/users/${username}/repos?per_page=100&sort=pushed`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Error fetching repos for '${username}': ${res.status} ${res.statusText}`);
      return [];
    }

    const repos: GithubRepo[] = await res.json();
    
    // Filter out forks, sort by stars, and return top 6
    return repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

  } catch (error) {
    console.error(`Failed to fetch GitHub repos for '${username}':`, error);
    return [];
  }
}
