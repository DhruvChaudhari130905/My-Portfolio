import { useRef, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { FadeIn } from '@/components/FadeIn';
import { ScrollCharacterText } from '@/components/ScrollCharacterText';
import { ContactCTA } from '@/components/ContactCTA';
import { MagneticHover } from '@/components/MagneticHover';
import { RevealText } from '@/components/RevealText';

const bioText = `I’m Dhruv Chaudhari, a full-stack developer and AI/ML enthusiast passionate about building products that solve real-world problems.

Currently pursuing my B.Tech in Electronics & Communication Engineering with a specialization in AI & ML, I love turning ideas into scalable web applications and intelligent systems. From designing sleek frontends to building robust backends and experimenting with machine learning, I enjoy the complete process of creating impactful technology.

I’ve built projects ranging from AI-assisted dashboards to real-time web applications, always focusing on performance, user experience, and clean architecture.

When I’m not coding, you’ll probably find me exploring new technologies, learning system design, contributing to ideas, or playing football.

My goal? To build technology that feels smart, useful, and unforgettable.`;

const decorations = [
  { src: 'assets/deco-moon.png', from: -80, delay: 0.1, speed: 90, spin: -8, style: { top: '4%', left: '3%' }, size: 'w-[120px] sm:w-[160px] md:w-[210px]' },
  { src: 'assets/deco-object.png', from: -80, delay: 0.25, speed: -60, spin: 12, style: { bottom: '8%', left: '6%' }, size: 'w-[100px] sm:w-[140px] md:w-[180px]' },
  { src: 'assets/deco-lego.png', from: 80, delay: 0.15, speed: 120, spin: 6, style: { top: '4%', right: '3%' }, size: 'w-[120px] sm:w-[160px] md:w-[210px]' },
  { src: 'assets/deco-group.png', from: 80, delay: 0.3, speed: -80, spin: -10, style: { bottom: '8%', right: '6%' }, size: 'w-[130px] sm:w-[170px] md:w-[220px]' },
];

// Each decoration drifts at its own speed for depth
function Decoration({
  deco,
  progress,
}: {
  deco: (typeof decorations)[number];
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : [deco.speed, -deco.speed]);
  const rotate = useTransform(progress, [0, 1], reduce ? [0, 0] : [-deco.spin, deco.spin]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-0"
      style={{ ...(deco.style as CSSProperties), y, rotate }}
    >
      <FadeIn delay={deco.delay} x={deco.from} y={0} duration={0.9}>
        <img src={deco.src} alt="" className={deco.size} loading="lazy" />
      </FadeIn>
    </motion.div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center"
      style={{
        background: '#0C0C0C',
        padding: '5rem clamp(1.25rem, 4vw, 2.5rem)',
      }}
    >
      {decorations.map((deco) => (
        <Decoration key={deco.src} deco={deco} progress={scrollYProgress} />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center" style={{ gap: 'clamp(2.5rem, 5vw, 4rem)' }}>
        <RevealText
          lines={['About me']}
          className="text-center font-black uppercase px-4 md:px-0"
          lineClassName="hero-heading"
          style={{
            fontSize: 'clamp(2.5rem, 11vw, 160px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            fontFamily: "'Kanit', sans-serif",
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        />

        {/* Animated bio text */}
        <ScrollCharacterText text={bioText} />

        {/* CTA */}
        <div style={{ marginTop: 'clamp(2rem, 4vw, 4rem)' }}>
          <MagneticHover padding={80} strength={4}>
            <ContactCTA />
          </MagneticHover>
        </div>
      </div>
    </section>
  );
}
