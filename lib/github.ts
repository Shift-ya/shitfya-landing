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
  created_at: string;
}

// Caché en memoria del servidor (per-request)
const memoryCache = new Map<string, { data: GitHubUser; timestamp: number }>();
const MEMORY_CACHE_TTL = 60 * 60 * 1000; // 1 hora

function isMemoryCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < MEMORY_CACHE_TTL;
}

export async function getGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    // 1. Verificar caché en memoria
    const cached = memoryCache.get(username);
    if (cached && isMemoryCacheValid(cached.timestamp)) {
      return cached.data;
    }

    // 2. Usar token de GitHub si está disponible (para aumentar rate limit)
    const githubToken = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    // 3. Hacer request a GitHub con timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      signal: controller.signal,
      // Cache the request for 1 hour en Next.js
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    const user: GitHubUser = {
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
      created_at: data.created_at,
    };

    // 4. Guardar en caché en memoria
    memoryCache.set(username, { data: user, timestamp: Date.now() });

    return user;
  } catch (error) {
    console.error('Failed to fetch GitHub user:', error);
    return null;
  }
}
