import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { CopyEmailButton } from '@/components/CopyEmailButton';
import { FadeIn } from '@/components/FadeIn';
import { RecentRepos } from '@/components/RecentRepos';
import { RevealText } from '@/components/RevealText';
import { GITHUB_URL } from '@/lib/github';
import { scrollToSection } from '@/lib/nav';

const LINKEDIN_URL = 'https://www.linkedin.com/in/dhruv-chaudhari-a49518320/';
const EMAIL = 'dhruvchaudhari411@gmail.com';

const socials = [
  { label: 'GitHub', href: GITHUB_URL, Icon: Github, external: true },
  { label: 'LinkedIn', href: LINKEDIN_URL, Icon: Linkedin, external: true },
  { label: 'Email', href: `mailto:${EMAIL}`, Icon: Mail, external: false },
];

export function FooterSection() {
  return (
    <footer
      id="contact"
      className="relative z-10 w-full"
      style={{
        background: '#0C0C0C',
        padding: 'clamp(3rem, 5vw, 5rem) clamp(1.25rem, 4vw, 2.5rem) clamp(2rem, 4vw, 3rem)',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <div className="mx-auto flex flex-col items-center" style={{ maxWidth: '800px' }}>
        <RevealText
          lines={["Let's Connect"]}
          className="text-center font-black uppercase"
          lineClassName="hero-heading"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 100px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        />

        <FadeIn delay={0.2} y={20} className="flex w-full flex-col items-center">
          <p
            className="mb-8 text-center sm:mb-12"
            style={{
              color: '#D7E2EA',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              lineHeight: 1.6,
              maxWidth: '500px',
              opacity: 0.8,
            }}
          >
            Always excited to discuss new projects, collaborations, and opportunities to build something great together.
          </p>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {socials.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-2 rounded-full px-4 py-2.5 text-[#D7E2EA] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D7E2EA]/10"
                style={{ border: '1px solid rgba(215, 226, 234, 0.18)', fontWeight: 400 }}
              >
                <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
            <CopyEmailButton email={EMAIL} />
          </div>

          <div className="mb-12 flex w-full justify-center sm:mb-16">
            <RecentRepos />
          </div>

          <div
            className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row"
            style={{
              borderTop: '1px solid rgba(215, 226, 234, 0.1)',
              paddingTop: '2rem',
            }}
          >
            <p
              className="text-center sm:text-left"
              style={{
                color: '#D7E2EA',
                opacity: 0.4,
                fontSize: '0.875rem',
                fontWeight: 300,
              }}
            >
              &copy; {new Date().getFullYear()} Dhruv Chaudhari. Built with React, TypeScript & Tailwind CSS.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('#hero')}
              className="group flex items-center gap-2 text-sm text-[#D7E2EA] opacity-60 transition-opacity duration-200 hover:opacity-100"
              style={{ fontWeight: 300 }}
            >
              Back to top
              <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
