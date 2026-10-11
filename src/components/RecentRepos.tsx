import { motion } from 'framer-motion';
import { useGitHubRepos } from '@/hooks/useGitHubRepos';
import { useNow } from '@/hooks/useNow';
import { GITHUB_URL, LANGUAGE_COLORS, timeAgo } from '@/lib/github';
import { EASE_OUT_EXPO } from '@/lib/motion';

// Live list of the most recently pushed repos; hidden if GitHub can't be reached
export function RecentRepos({ limit = 3 }: { limit?: number }) {
  const repos = useGitHubRepos();
  const now = useNow();
  if (!repos?.length) return null;

  return (
    <motion.section
      aria-labelledby="recent-repos"
      className="w-full"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      style={{ maxWidth: '560px' }}
    >
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h3 id="recent-repos" className="text-[#D7E2EA]" style={{ fontWeight: 500, fontSize: '1rem' }}>
          Recently on GitHub
        </h3>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#D7E2EA] opacity-60 transition-opacity duration-200 hover:opacity-100"
          style={{ fontWeight: 300 }}
        >
          View profile
        </a>
      </div>

      <ul
        className="overflow-hidden rounded-2xl"
        style={{ border: '1px solid rgba(215, 226, 234, 0.12)' }}
      >
        {repos.slice(0, limit).map((repo, i) => (
          <motion.li
            key={repo.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE_OUT_EXPO }}
            style={{ borderTop: i ? '1px solid rgba(215, 226, 234, 0.08)' : undefined }}
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/[0.06]"
            >
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: LANGUAGE_COLORS[repo.language ?? ''] ?? '#8B949E' }}
              />
              <span className="min-w-0 flex-1 truncate" style={{ fontWeight: 400 }}>
                {repo.name}
                {repo.language && (
                  <span className="ml-2 text-sm opacity-50" style={{ fontWeight: 300 }}>
                    {repo.language}
                  </span>
                )}
              </span>
              <span className="shrink-0 text-sm opacity-60" style={{ fontWeight: 300 }}>
                {timeAgo(repo.pushed_at, now)}
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
