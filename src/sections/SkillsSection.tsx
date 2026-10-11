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

// Tags pop in one after another once the row's text has settled
const tagList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.35 } },
};

const tag: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};

const skills = [
  {
    title: 'Frontend development',
    summary: 'Responsive interfaces and fast, accessible web apps.',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    title: 'Backend engineering',
    summary: 'APIs and server-side logic that hold up under real traffic.',
    tools: ['Node.js', 'Express', 'Python', 'Django', 'Flask', 'FastAPI'],
  },
  {
    title: 'Databases',
    summary: 'Efficient schemas, queries and state management.',
    tools: ['PostgreSQL', 'PL/pgSQL', 'MongoDB', 'SQLite', 'Supabase'],
  },
  {
    title: 'AI & machine learning',
    summary: 'Training, evaluating and shipping models with clean data pipelines.',
    tools: ['scikit-learn', 'TensorFlow', 'Keras', 'OpenCV', 'pandas', 'NumPy', 'MLflow'],
  },
  {
    title: 'DevOps & tools',
    summary: 'Deployment pipelines and day-to-day workflow.',
    tools: ['Docker', 'GitHub Actions', 'Vercel', 'Netlify', 'Git', 'Linux', 'Figma', 'Postman'],
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
        fontFamily: "'Kanit', sans-serif",
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
          marginBottom: 'clamp(2.5rem, 5vw, 6rem)',
        }}
      />

      {/* Skills list */}
      <div className="mx-auto" style={{ maxWidth: '68rem' }}>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.title}
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
                className="grid gap-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-baseline md:gap-10"
                style={{ padding: 'clamp(1.75rem, 3vw, 2.75rem) 0' }}
              >
                <h3
                  className="text-[#0C0C0C] transition-colors duration-500 group-hover:text-[#7621B0]"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(1.5rem, 3vw, 2.6rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {skill.title}
                </h3>

                <div className="flex flex-col gap-3">
                  <motion.ul
                    variants={tagList}
                    className="flex flex-wrap gap-2"
                    aria-label={`${skill.title} tools`}
                  >
                    {skill.tools.map((tool) => (
                      <motion.li
                        key={tool}
                        variants={tag}
                        whileHover={{ y: -3 }}
                        className="rounded-full border-[rgba(12,12,12,0.15)] px-3 py-1 text-[#0C0C0C] transition-colors duration-200 hover:border-[#7621B0] hover:text-[#7621B0]"
                        style={{
                          borderWidth: 1,
                          fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                          fontWeight: 400,
                        }}
                      >
                        {tool}
                      </motion.li>
                    ))}
                  </motion.ul>
                  <p
                    style={{
                      color: '#0C0C0C',
                      opacity: 0.6,
                      fontWeight: 300,
                      fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
                      lineHeight: 1.6,
                    }}
                  >
                    {skill.summary}
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
