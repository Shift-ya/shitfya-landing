'use client';

import { useEffect, useState, useRef } from 'react';
import type { GitHubUser } from '@/lib/github';

const CACHE_KEY = 'github_user_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas
const REQUEST_TIMEOUT = 10000; // 10 segundos

interface CachedUser extends GitHubUser {
  cachedAt: number;
}

interface Cache {
  [username: string]: CachedUser;
}

// Singleton para evitar múltiples requests simultáneos del mismo usuario
const pendingRequests = new Map<string, Promise<GitHubUser | null>>();

function getCache(): Cache {
  if (typeof window === 'undefined') return {};
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

function saveCache(cache: Cache) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (err) {
    console.error('Failed to save GitHub cache:', err);
  }
}

function isCacheValid(cachedAt: number): boolean {
  return Date.now() - cachedAt < CACHE_DURATION;
}

async function fetchWithTimeout(url: string, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export function useGitHubUser(username: string | null | undefined) {
  const [gitHubUser, setGitHubUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!username) {
      setGitHubUser(null);
      return;
    }

    const fetchGitHubUser = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Verificar caché local primero
        const cache = getCache();
        const cached = cache[username];

        if (cached && isCacheValid(cached.cachedAt)) {
          if (mountedRef.current) {
            const { cachedAt, ...userData } = cached;
            setGitHubUser(userData);
            setLoading(false);
          }
          return;
        }

        // 2. Evitar múltiples requests simultáneos del mismo usuario
        if (pendingRequests.has(username)) {
          const result = await pendingRequests.get(username);
          if (mountedRef.current) {
            setGitHubUser(result || null);
            setLoading(false);
          }
          return;
        }

        // 3. Hacer el request
        const requestPromise = (async () => {
          try {
            const response = await fetchWithTimeout(
              `/api/github?username=${encodeURIComponent(username)}`
            );

            if (!response.ok) {
              throw new Error(`GitHub API error: ${response.status}`);
            }

            const data = await response.json();

            // Guardar en caché
            const newCache = getCache();
            newCache[username] = {
              ...data,
              cachedAt: Date.now(),
            };
            saveCache(newCache);

            return data;
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch GitHub user';
            if (mountedRef.current) {
              setError(message);
            }
            return null;
          } finally {
            pendingRequests.delete(username);
          }
        })();

        pendingRequests.set(username, requestPromise);
        const result = await requestPromise;

        if (mountedRef.current) {
          setGitHubUser(result);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchGitHubUser();
  }, [username]);

  return { gitHubUser, loading, error };
}
