import { FadeIn } from '@/components/FadeIn';
import { Github, Linkedin, Mail } from 'lucide-react';

export function FooterSection() {
  return (
    <footer
      id="contact"
      className="relative z-10 w-full"
      style={{
        background: '#0C0C0C',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.25rem, 4vw, 2.5rem) clamp(2rem, 4vw, 3rem)',
      }}
    >
      <div className="mx-auto flex flex-col items-center" style={{ maxWidth: '800px' }}>
        <FadeIn delay={0} y={30}>
          <h2
            className="hero-heading text-center font-black uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 100px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              fontFamily: "'Kanit', sans-serif",
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            Let&apos;s Connect
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <p
            className="mb-8 text-center sm:mb-12"
            style={{
              color: '#D7E2EA',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              lineHeight: 1.6,
              maxWidth: '500px',
              fontFamily: "'Kanit', sans-serif",
              opacity: 0.8,
            }}
          >
            Always excited to discuss new projects, collaborations, and opportunities to build something great together.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <div className="mb-12 flex items-center gap-6 sm:mb-16 sm:gap-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
              style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 400 }}
            >
              <Github size={20} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
              style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 400 }}
            >
              <Linkedin size={20} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="mailto:dhruv@example.com"
              className="flex items-center gap-2 text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
              style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 400 }}
            >
              <Mail size={20} />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <div
            className="w-full text-center"
            style={{
              borderTop: '1px solid rgba(215, 226, 234, 0.1)',
              paddingTop: '2rem',
            }}
          >
            <p
              style={{
                color: '#D7E2EA',
                opacity: 0.4,
                fontSize: '0.875rem',
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 300,
              }}
            >
              &copy; {new Date().getFullYear()} Dhruv Chaudhari. Built with React, TypeScript & Tailwind CSS.
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
