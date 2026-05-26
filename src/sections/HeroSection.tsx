import { FadeIn } from '@/components/FadeIn';
import { MagneticHover } from '@/components/MagneticHover';
import { ContactCTA } from '@/components/ContactCTA';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function HeroSection() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex h-screen flex-col justify-between overflow-x-clip"
      style={{ background: '#0C0C0C' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full flex justify-center">
        <nav
          className="flex items-center gap-6 sm:gap-10 md:gap-16"
          style={{
            paddingTop: 'clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="uppercase text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
              style={{
                fontWeight: 500,
                fontSize: 'clamp(0.875rem, 1.4vw, 1.4rem)',
                letterSpacing: '0.05em',
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <FadeIn delay={0.15} y={40} className="w-full relative z-20">
        <div className="w-full flex justify-start overflow-visible">
          <h1
            className="hero-heading font-black uppercase text-left"
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 13rem)',
              letterSpacing: '-0.02em',
              lineHeight: 0.85,
              marginTop: 'clamp(2rem, 10vh, 6rem)',
              marginBottom: 'clamp(7rem, 20vh, 24rem)',
              padding: '0 clamp(1.25rem, 5vw, 4rem)',
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            Hi, i'm <br /> dhruv
          </h1>
        </div>
      </FadeIn>

      {/* Portrait - positioned on the right side */}
      <FadeIn delay={0.6} y={30} className="absolute right-0 z-10 flex justify-end pointer-events-none pr-4" style={{ bottom: '90px' }}>
        <MagneticHover
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="w-[320px] sm:w-[420px] md:w-[540px] lg:w-[640px] pointer-events-auto"
        >
          <img
            src="/assets/portrait-dhruv.jpeg"
            alt="Dhruv Chaudhari - Full Stack Developer"
            className="h-auto w-full object-cover pointer-events-none"
            style={{ borderRadius: '1rem' }}
            loading="eager"
          />
        </MagneticHover>
      </FadeIn>

      {/* Bottom bar */}
      <div
        className="flex items-end justify-between"
        style={{
          padding: '0 clamp(1.25rem, 4vw, 2.5rem) clamp(1.75rem, 3vw, 2.5rem)',
        }}
      >
        <FadeIn delay={0.35} y={20}>
          <p
            className="uppercase text-[#D7E2EA]"
            style={{
              fontWeight: 300,
              fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)',
              letterSpacing: '0.03em',
              lineHeight: 1.4,
              maxWidth: '260px',
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            a full stack developer driven by crafting scalable and intelligent applications
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactCTA />
        </FadeIn>
      </div>
    </section>
  );
}
