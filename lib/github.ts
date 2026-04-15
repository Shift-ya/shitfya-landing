export interface GitHubUser {
  login: string;
  name: string | null;
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  twitter_username: string | null;
}

export async function getGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      // Cache the request for 1 hour
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    return {
      login: data.login,
      name: data.name,
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      avatar_url: data.avatar_url,
      bio: data.bio,
      company: data.company,
      blog: data.blog,
      location: data.location,
      twitter_username: data.twitter_username,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub user:', error);
    return null;
  }
}
