import { scrollToSection } from '@/lib/nav';

interface ContactCTAProps {
  className?: string;
}

export function ContactCTA({ className = '' }: ContactCTAProps) {
  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection('#contact');
      }}
      className={`group relative inline-block overflow-hidden rounded-full font-medium uppercase tracking-[0.12em] text-white shadow-[0px_4px_4px_rgba(181,1,167,0.25),inset_4px_4px_12px_#7721B1] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0px_10px_30px_rgba(181,1,167,0.45),inset_4px_4px_12px_#7721B1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B600A8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C0C0C] ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        outline: '2px solid white',
        outlineOffset: '-3px',
        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(2rem, 3vw, 3rem)',
        fontSize: 'clamp(0.75rem, 1vw, 1rem)',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      {/* Light sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[320%]"
      />
      <span className="relative">Contact Me</span>
    </a>
  );
}
