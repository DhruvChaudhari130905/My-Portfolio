import { FadeIn } from '@/components/FadeIn';
import { ScrollCharacterText } from '@/components/ScrollCharacterText';
import { ContactCTA } from '@/components/ContactCTA';

const bioText = `I’m Dhruv Chaudhari, a full-stack developer and AI/ML enthusiast passionate about building products that solve real-world problems.

Currently pursuing my B.Tech in Electronics & Communication Engineering with a specialization in AI & ML, I love turning ideas into scalable web applications and intelligent systems. From designing sleek frontends to building robust backends and experimenting with machine learning, I enjoy the complete process of creating impactful technology.

I’ve built projects ranging from AI-assisted dashboards to real-time web applications, always focusing on performance, user experience, and clean architecture.

When I’m not coding, you’ll probably find me exploring new technologies, learning system design, contributing to ideas, or playing football.

My goal? To build technology that feels smart, useful, and unforgettable.`;

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center"
      style={{
        background: '#0C0C0C',
        padding: '5rem clamp(1.25rem, 4vw, 2.5rem)',
      }}
    >
      {/* Decorative images */}
      {/* Moon - top left */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute z-0"
        style={{ top: '4%', left: 'clamp(1%, 3%, 4%)' } as React.CSSProperties}
      >
        <img
          src="/assets/deco-moon.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
          loading="lazy"
        />
      </FadeIn>

      {/* 3D Object - bottom left */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute z-0"
        style={{ bottom: '8%', left: 'clamp(3%, 6%, 10%)' } as React.CSSProperties}
      >
        <img
          src="/assets/deco-object.png"
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px]"
          loading="lazy"
        />
      </FadeIn>

      {/* Lego - top right */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute z-0"
        style={{ top: '4%', right: 'clamp(1%, 3%, 4%)' } as React.CSSProperties}
      >
        <img
          src="/assets/deco-lego.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
          loading="lazy"
        />
      </FadeIn>

      {/* 3D Group - bottom right */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute z-0"
        style={{ bottom: '8%', right: 'clamp(3%, 6%, 10%)' } as React.CSSProperties}
      >
        <img
          src="/assets/deco-group.png"
          alt=""
          className="w-[130px] sm:w-[170px] md:w-[220px]"
          loading="lazy"
        />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center" style={{ gap: 'clamp(2.5rem, 5vw, 4rem)' }}>
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase"
            style={{
              fontSize: 'clamp(3rem, 12vw, 160px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              fontFamily: "'Kanit', sans-serif",
              marginBottom: '2.5rem',
            }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated bio text */}
        <ScrollCharacterText text={bioText} />

        {/* CTA */}
        <div style={{ marginTop: 'clamp(2rem, 4vw, 4rem)' }}>
          <ContactCTA />
        </div>
      </div>
    </section>
  );
}
