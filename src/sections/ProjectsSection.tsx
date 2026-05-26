import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/FadeIn';
import { LiveProjectButton } from '@/components/LiveProjectButton';

const projects = [
  {
    number: '01',
    name: 'TradePro AI',
    category: 'Full Stack AI',
    col1Images: ['/assets/project-tradepro-1.jpg', '/assets/project-tradepro-2.jpg'],
    col2Image: '/assets/project-tradepro-1.png',
  },
  {
    number: '02',
    name: 'PitWall',
    category: 'Web App',
    col1Images: ['/assets/project-pitwall-1.jpg', '/assets/project-pitwall-2.jpg'],
    col2Image: '/assets/project-pitwall-3.jpg',
  },
  {
    number: '03',
    name: 'Expense Calculator',
    category: 'Vanilla JS',
    col1Images: ['/assets/project-expence-1.png', '/assets/project-expence-2.png'],
    col2Image: '/assets/project-expence-3.png',
  },
];

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof projects)[0];
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

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{
        top: `clamp(96px, 8vw, 128px)`,
        height: '95vh',
        paddingTop: `${index * 40}px`,
      }}
    >
      <motion.div
        style={{ scale, willChange: 'transform' }}
        className="flex h-full flex-col"
      >
        <div
          className="flex h-full flex-col"
          style={{
            background: '#0C0C0C',
            border: '2px solid #D7E2EA',
            borderRadius: 'clamp(40px, 5vw, 60px)',
            padding: 'clamp(1.5rem, 3vw, 3rem)',
          }}
        >
          {/* Top row */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 sm:mb-6">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Number */}
              <span
                className="hero-heading font-black"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 100px)',
                  lineHeight: 1.0,
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                {project.number}
              </span>

              {/* Category + Name */}
              <div className="flex flex-col gap-1">
                <span
                  className="uppercase"
                  style={{
                    color: '#D7E2EA',
                    fontWeight: 500,
                    fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
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
                    fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                    lineHeight: 1.3,
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {project.name}
                </span>
              </div>
            </div>

            <LiveProjectButton />
          </div>

          {/* Image grid */}
          <div className="flex flex-1 gap-3 sm:gap-4 overflow-hidden">
            {/* Left column - 40% */}
            <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: 'clamp(20px, 3vw, 40px)',
                  height: 'clamp(130px, 16vw, 230px)',
                }}
              >
                <img
                  src={project.col1Images[0]}
                  alt={`${project.name} screenshot 1`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  style={{ background: '#1a1a1a' }}
                />
              </div>
              <div
                className="flex-1 overflow-hidden"
                style={{
                  borderRadius: 'clamp(20px, 3vw, 40px)',
                  minHeight: 'clamp(160px, 22vw, 340px)',
                }}
              >
                <img
                  src={project.col1Images[1]}
                  alt={`${project.name} screenshot 2`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  style={{ background: '#1a1a1a' }}
                />
              </div>
            </div>

            {/* Right column - 60% */}
            <div
              className="w-[60%] overflow-hidden"
              style={{ borderRadius: 'clamp(20px, 3vw, 40px)' }}
            >
              <img
                src={project.col2Image}
                alt={`${project.name} main screenshot`}
                className="h-full w-full object-cover"
                loading="lazy"
                style={{ background: '#1a1a1a' }}
              />
            </div>
          </div>
        </div>
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
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading text-center font-black uppercase"
          style={{
            fontSize: 'clamp(3rem, 12vw, 160px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            fontFamily: "'Kanit', sans-serif",
            marginBottom: 'clamp(2rem, 4vw, 4rem)',
          }}
        >
          Project
        </h2>
      </FadeIn>

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
