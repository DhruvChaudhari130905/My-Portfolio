import { FadeIn } from '@/components/FadeIn';

const skills = [
  {
    number: '01',
    title: 'Frontend Development',
    description:
      'Next.js, React.js, TypeScript, Tailwind CSS, HTML5, CSS3. Building responsive UIs and performant web apps.',
  },
  {
    number: '02',
    title: 'Backend Engineering',
    description:
      'Node.js, Express.js, Python (Django, Flask, FastAPI). Architecting robust APIs and server-side logic.',
  },
  {
    number: '03',
    title: 'Database Management',
    description:
      'PostgreSQL (PL/pgSQL), MongoDB, SQLite, Supabase. Designing efficient schemas and managing state.',
  },
  {
    number: '04',
    title: 'AI & Machine Learning',
    description:
      'scikit-learn, TensorFlow, Keras, OpenCV, pandas, NumPy, MLflow. Applying machine learning models and data processing.',
  },
  {
    number: '05',
    title: 'DevOps & Tools',
    description:
      'Docker, GitHub Actions, Vercel, Netlify, Git, Linux, Figma, Postman. Streamlining deployment pipelines and workflows.',
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative w-full"
      style={{
        background: '#FFFFFF',
        borderRadius: 'clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px) 0 0',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 2.5rem)',
      }}
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="text-center font-black uppercase px-4 md:px-0"
          style={{
            color: '#0C0C0C',
            fontSize: 'clamp(2.5rem, 11vw, 160px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            fontFamily: "'Kanit', sans-serif",
            marginBottom: 'clamp(2.5rem, 5vw, 7rem)',
          }}
        >
          Skills
        </h2>
      </FadeIn>

      {/* Skills list */}
      <div className="mx-auto" style={{ maxWidth: '64rem' }}>
        {skills.map((skill, i) => (
          <FadeIn key={skill.number} delay={i * 0.1} y={30}>
            <div
              className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
                padding: 'clamp(2rem, 3vw, 3rem) 0',
              }}
            >
              {/* Number */}
              <span
                className="shrink-0 font-black"
                style={{
                  color: '#0C0C0C',
                  fontSize: 'clamp(2rem, 8vw, 140px)',
                  lineHeight: 1.0,
                  fontFamily: "'Kanit', sans-serif",
                  minWidth: 'clamp(60px, 10vw, 180px)',
                }}
              >
                {skill.number}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-1 md:gap-2">
                <h3
                  className="uppercase"
                  style={{
                    color: '#0C0C0C',
                    fontWeight: 500,
                    fontSize: 'clamp(0.95rem, 2vw, 2.1rem)',
                    lineHeight: 1.3,
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {skill.title}
                </h3>
                <p
                  style={{
                    color: '#0C0C0C',
                    opacity: 0.6,
                    fontWeight: 300,
                    fontSize: 'clamp(0.8rem, 1.4vw, 1.25rem)',
                    lineHeight: 1.6,
                    maxWidth: '42rem',
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {skill.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
