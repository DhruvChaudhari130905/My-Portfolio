import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { RevealText } from '@/components/RevealText';
import { LiveProjectButton } from '@/components/LiveProjectButton';
import { useGitHubRepos } from '@/hooks/useGitHubRepos';
import { useNow } from '@/hooks/useNow';
import { timeAgo } from '@/lib/github';

type Platform = 'web' | 'mobile';

interface Project {
  number: string;
  name: string;
  liveUrl: string;
  category: string;
  platform: Platform;
  /** web: [main, side, side] 16:9 screenshots; mobile: three portrait phone screens */
  images: [string, string, string];
}

const projects: Project[] = [
  {
    number: '01',
    name: 'MUX',
    liveUrl: '', // TODO: add the deployed URL
    category: 'Data Processing',
    platform: 'web',
    images: ['assets/project-mux-3.webp', 'assets/project-mux-1.webp', 'assets/project-mux-2.webp'],
  },
  {
    number: '02',
    name: 'TradePro AI',
    liveUrl: '', // TODO: add the deployed URL
    category: 'Full Stack AI',
    platform: 'web',
    images: ['assets/project-tradepro-1.webp', 'assets/project-tradepro-1-jpg.webp', 'assets/project-tradepro-2-jpg.webp'],
  },
  {
    number: '03',
    name: 'Navguard',
    liveUrl: '', // TODO: add the deployed URL
    category: 'Mobile App · Navigation',
    platform: 'mobile',
    images: ['assets/project-navguard-1.webp', 'assets/project-navguard-2.webp', 'assets/project-navguard-3.webp'],
  },
  {
    number: '04',
    name: 'Resqmesh',
    liveUrl: '', // TODO: add the deployed URL
    category: 'Mobile App · Emergency Response',
    platform: 'mobile',
    images: ['assets/project-resqmesh-1.webp', 'assets/project-resqmesh-2.webp', 'assets/project-resqmesh-3.webp'],
  },
  {
    number: '05',
    name: 'Expense Calculator',
    liveUrl: '', // TODO: add the deployed URL
    category: 'Vanilla JS',
    platform: 'web',
    images: ['assets/project-expense-1.webp', 'assets/project-expense-3.webp', 'assets/project-expense-2.webp'],
  },
];

const SHOT_RADIUS = 'clamp(10px, 2.5vw, 32px)';
const IMG_CLASS =
  'h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]';

// Layout and sizing live in .web-shots / .phone-shots (index.css)
function WebShots({ project }: { project: Project }) {
  return (
    <div className="web-shots">
      {project.images.map((src, i) => (
        <div key={src} className="group overflow-hidden" style={{ borderRadius: SHOT_RADIUS }}>
          <img
            src={src}
            alt={`${project.name} screenshot ${i + 1}`}
            className={IMG_CLASS}
            loading="lazy"
            style={{ background: '#1a1a1a' }}
          />
        </div>
      ))}
    </div>
  );
}

function PhoneShots({ project }: { project: Project }) {
  return (
    <div className="phone-shots">
      {project.images.map((src, i) => (
        <div
          key={src}
          className="phone-shot group overflow-hidden"
          // Screenshots are trimmed to the device bezel; match its corner curve
          style={{ borderRadius: '17% / 8.2%' }}
        >
          <img src={src} alt={`${project.name} screen ${i + 1}`} className={IMG_CLASS} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

// Screenshots lean a few degrees toward the cursor
function TiltShots({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1400 }}
    >
      {children}
    </motion.div>
  );
}

// Live "last updated" from the project's GitHub repo, when one matches by name
function RepoActivity({ name }: { name: string }) {
  const repos = useGitHubRepos();
  const now = useNow();
  const repo = repos?.find((r) => r.name.toLowerCase() === name.toLowerCase());
  if (!repo) return null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-2 text-[#D7E2EA] opacity-70 transition-opacity duration-200 hover:opacity-100"
      style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)', fontWeight: 300 }}
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DDC84] opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3DDC84]" />
      </span>
      Updated {timeAgo(repo.pushed_at, now)} on GitHub
    </a>
  );
}

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: Project;
  index: number;
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  // Cards being stacked over recede into the dark
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
  const isLast = index === totalCards - 1;

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{
        top: `clamp(64px, 8vw, 128px)`,
        // Spacing between stacked cards; the last one only needs its own height
        height: isLast ? 'auto' : '95vh',
        paddingTop: `${index * 20}px`,
      }}
    >
      <motion.div
        style={{ scale, willChange: 'transform' }}
        className="relative flex flex-col"
      >
        <div
          className="flex flex-col"
          style={{
            background: '#0C0C0C',
            border: '2px solid #D7E2EA',
            borderRadius: 'clamp(20px, 4vw, 60px)',
            padding: 'clamp(1rem, 2.5vw, 3rem)',
          }}
        >
          {/* Top row */}
          <div className="mb-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 sm:mb-4 md:mb-6">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              {/* Number */}
              <span
                className="hero-heading font-black shrink-0"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 100px)',
                  lineHeight: 1.0,
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                {project.number}
              </span>

              {/* Category + Name */}
              <div className="flex flex-col gap-1 min-w-0">
                <span
                  className="uppercase"
                  style={{
                    color: '#D7E2EA',
                    fontWeight: 500,
                    fontSize: 'clamp(0.65rem, 1vw, 0.875rem)',
                    letterSpacing: '0.15em',
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    color: '#D7E2EA',
                    fontWeight: 500,
                    fontSize: 'clamp(0.9rem, 2vw, 2.1rem)',
                    lineHeight: 1.3,
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {project.name}
                </span>
                <RepoActivity name={project.name} />
              </div>
            </div>

            {project.liveUrl && (
              <div className="self-start md:self-auto">
                <LiveProjectButton href={project.liveUrl} />
              </div>
            )}
          </div>

          {/* Screenshots, sized to fit the viewport without cropping */}
          <div className="project-shots flex justify-center">
            <TiltShots>
              {project.platform === 'mobile' ? <PhoneShots project={project} /> : <WebShots project={project} />}
            </TiltShots>
          </div>
        </div>
        {!isLast && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ opacity: dim, background: '#000', borderRadius: 'clamp(20px, 4vw, 60px)' }}
          />
        )}
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 w-full"
      style={{
        background: '#0C0C0C',
        borderRadius: 'clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px) 0 0',
        marginTop: '-2.5rem',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 2.5rem)',
      }}
    >
      <RevealText
        lines={['Projects']}
        className="text-center font-black uppercase px-4 md:px-0"
        lineClassName="hero-heading"
        style={{
          fontSize: 'clamp(2.5rem, 11vw, 160px)',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          fontFamily: "'Kanit', sans-serif",
          marginBottom: 'clamp(1.5rem, 3vw, 4rem)',
        }}
      />

      {/* Project cards */}
      <div>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
