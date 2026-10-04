import { motion, type Variants } from 'framer-motion';
import { RevealText } from '@/components/RevealText';
import { EASE_OUT_EXPO } from '@/lib/motion';

const RULE = 'rgba(12, 12, 12, 0.15)';

// Divider lines draw in left to right, then the row content settles
const rule: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

const content: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15, ease: EASE_OUT_EXPO } },
};

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
      <RevealText
        lines={['Skills']}
        className="text-center font-black uppercase px-4 md:px-0"
        style={{
          color: '#0C0C0C',
          fontSize: 'clamp(2.5rem, 11vw, 160px)',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          fontFamily: "'Kanit', sans-serif",
          marginBottom: 'clamp(2.5rem, 5vw, 7rem)',
        }}
      />

      {/* Skills list */}
      <div className="mx-auto" style={{ maxWidth: '64rem' }}>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.number}
            className="group relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {i === 0 && (
              <motion.div
                aria-hidden
                variants={rule}
                className="absolute inset-x-0 top-0 h-px origin-left"
                style={{ background: RULE }}
              />
            )}
            <motion.div
              aria-hidden
              variants={rule}
              className="absolute inset-x-0 bottom-0 h-px origin-left"
              style={{ background: RULE }}
            />

            <motion.div variants={content}>
              <div
                className="flex flex-col gap-4 transition-transform duration-500 ease-out sm:flex-row sm:items-start sm:gap-8 sm:group-hover:translate-x-4"
                style={{ padding: 'clamp(2rem, 3vw, 3rem) 0' }}
              >
                {/* Number */}
                <span
                  className="shrink-0 font-black text-[#0C0C0C] transition-colors duration-500 group-hover:text-[#7621B0]"
                  style={{
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
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
