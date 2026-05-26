interface LiveProjectButtonProps {
  className?: string;
  href?: string;
}

export function LiveProjectButton({ className = '', href = '#' }: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full border-2 border-[#D7E2EA] font-medium uppercase tracking-[0.12em] text-[#D7E2EA] transition-all duration-200 hover:bg-[#D7E2EA]/10 ${className}`}
      style={{
        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(2rem, 3vw, 3rem)',
        fontSize: 'clamp(0.75rem, 1vw, 1rem)',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      Live Project
    </a>
  );
}
