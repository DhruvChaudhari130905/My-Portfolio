import { useEffect, useState } from 'react';
import { fetchRepos, type Repo } from '@/lib/github';

// null while loading; [] if GitHub is unreachable, so callers can hide themselves
export function useGitHubRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchRepos()
      .then((r) => !cancelled && setRepos(r))
      .catch(() => !cancelled && setRepos([]));
    return () => {
      cancelled = true;
    };
  }, []);

  return repos;
}
