import { useNow } from '@/hooks/useNow';

const timeFormat = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  hour: 'numeric',
  minute: '2-digit',
});

// Availability with a live local clock, so visitors abroad know when to expect a reply
export function LiveStatus({ className = '' }: { className?: string }) {
  const now = useNow(10_000);

  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[#D7E2EA] ${className}`}
      style={{
        background: 'rgba(12, 12, 12, 0.6)',
        border: '1px solid rgba(215, 226, 234, 0.16)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
        fontWeight: 400,
      }}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DDC84] opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3DDC84]" />
      </span>
      <span>Open to opportunities</span>
      <span aria-hidden className="opacity-40">|</span>
      <span>
        Pune, <time dateTime={new Date(now).toISOString()}>{timeFormat.format(now)}</time>
      </span>
    </p>
  );
}
