'use client';

import { useEffect, useState } from 'react';
import type { GitHubUser } from '@/lib/github';

export function useGitHubUser(username: string | null | undefined) {
  const [gitHubUser, setGitHubUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchGitHubUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/github?username=${encodeURIComponent(username)}`
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        setGitHubUser(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch GitHub user';
        setError(message);
        setGitHubUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubUser();
  }, [username]);

  return { gitHubUser, loading, error };
}
