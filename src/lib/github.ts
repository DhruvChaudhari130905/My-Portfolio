export const GITHUB_USER = 'DhruvChaudhari130905';
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`;

export interface Repo {
  name: string;
  html_url: string;
  pushed_at: string;
  language: string | null;
  description: string | null;
  fork: boolean;
}

const CACHE_KEY = 'gh-repos-v1';
const CACHE_TTL = 10 * 60 * 1000;

let pending: Promise<Repo[]> | null = null;

// Public repos, most recently pushed first. One request per page load, cached for
// 10 minutes per tab to stay well inside GitHub's unauthenticated rate limit.
export function fetchRepos(): Promise<Repo[]> {
  if (pending) return pending;

  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null');
    if (cached && Date.now() - cached.at < CACHE_TTL) {
      pending = Promise.resolve(cached.repos);
      return pending;
    }
  } catch {
    // Storage unavailable; fall through to the network
  }

  pending = fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`)
    .then((res) => {
      if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
      return res.json() as Promise<Repo[]>;
    })
    .then((all) => {
      // Skip forks and the profile README repo
      const repos = all.filter((r) => !r.fork && r.name !== GITHUB_USER);
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
      } catch {
        // Caching is optional
      }
      return repos;
    })
    .catch((err) => {
      pending = null; // allow a retry on the next mount
      throw err;
    });

  return pending;
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
];

export function timeAgo(iso: string, now: number): string {
  const seconds = Math.round((new Date(iso).getTime() - now) / 1000);
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return 'just now';
}

// GitHub's linguist colours for the languages in these repos
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  Verilog: '#B2B7F8',
  HTML: '#E34C26',
  CSS: '#663399',
  Java: '#B07219',
  'Jupyter Notebook': '#DA5B0B',
};
