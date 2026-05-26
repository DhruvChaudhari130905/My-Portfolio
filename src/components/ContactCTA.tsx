interface ContactCTAProps {
  className?: string;
}

export function ContactCTA({ className = '' }: ContactCTAProps) {
  return (
    <a
      href="#contact"
      className={`inline-block rounded-full font-medium uppercase tracking-[0.12em] text-white transition-all duration-200 hover:scale-[1.02] hover:brightness-110 ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(2rem, 3vw, 3rem)',
        fontSize: 'clamp(0.75rem, 1vw, 1rem)',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      Contact Me
    </a>
  );
}
