import { useEffect, useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useScrollOffset } from '@/hooks/useScrollOffset';

type Shot = { src: string; name: string; phone?: boolean };

// Real screenshots from the projects below; phone shots get portrait cards
const row1: Shot[] = [
  { src: 'assets/project-mux-3.webp', name: 'MUX' },
  { src: 'assets/project-tradepro-1.webp', name: 'TradePro AI' },
  { src: 'assets/project-expense-1.webp', name: 'Expense Calculator' },
  { src: 'assets/project-mux-1.webp', name: 'MUX' },
  { src: 'assets/project-tradepro-2-jpg.webp', name: 'TradePro AI' },
];

const row2: Shot[] = [
  { src: 'assets/project-navguard-1.webp', name: 'Navguard', phone: true },
  { src: 'assets/project-expense-3.webp', name: 'Expense Calculator' },
  { src: 'assets/project-resqmesh-1.webp', name: 'Resqmesh', phone: true },
  { src: 'assets/project-navguard-2.webp', name: 'Navguard', phone: true },
  { src: 'assets/project-mux-2.webp', name: 'MUX' },
  { src: 'assets/project-resqmesh-3.webp', name: 'Resqmesh', phone: true },
  { src: 'assets/project-navguard-3.webp', name: 'Navguard', phone: true },
  { src: 'assets/project-tradepro-1-jpg.webp', name: 'TradePro AI' },
  { src: 'assets/project-resqmesh-2.webp', name: 'Resqmesh', phone: true },
  { src: 'assets/project-expense-2.webp', name: 'Expense Calculator' },
];

// Card height scales with the viewport; widths follow each shot's shape
const CARD_H = 'clamp(140px, 17vw, 250px)';
// Idle drift speed, px per second; scrolling adds to it
const DRIFT_SPEED = 24;

function MarqueeRow({
  shots,
  direction,
  offset,
  drift,
}: {
  shots: Shot[];
  direction: 'left' | 'right';
  offset: MotionValue<number>;
  drift: MotionValue<number>;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  // Width of one set of shots (incl. its trailing gap): the loop length
  const setWidth = useRef(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const first = row.children[0] as HTMLElement | undefined;
      const repeat = row.children[shots.length] as HTMLElement | undefined;
      if (first && repeat) setWidth.current = repeat.offsetLeft - first.offsetLeft;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    measure();
    return () => observer.disconnect();
  }, [shots.length]);

  const tripled = [...shots, ...shots, ...shots];
  // Wrap into [-setWidth, 0) so the three copies always cover the viewport
  const x = useTransform(() => {
    const travel = offset.get() + drift.get();
    const v = direction === 'right' ? travel : -travel;
    const w = setWidth.current;
    return w ? (((v % w) + w) % w) - w : -200;
  });

  return (
    <motion.div
      ref={rowRef}
      className="flex gap-3"
      style={{ x, willChange: 'transform' }}
    >
      {tripled.map((shot, i) => (
        <div
          key={i}
          aria-hidden={i >= shots.length || undefined}
          className="shrink-0 overflow-hidden"
          style={{
            height: CARD_H,
            aspectRatio: shot.phone ? '718 / 1498' : '16 / 9',
            borderRadius: shot.phone ? '17% / 8.2%' : '1rem',
          }}
        >
          <img
            src={shot.src}
            alt={i < shots.length ? `${shot.name} screenshot` : ''}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            style={{ background: '#1a1a1a' }}
          />
        </div>
      ))}
    </motion.div>
  );
}

export function MarqueeSection() {
  const { sectionRef, offset } = useScrollOffset();
  const reduce = useReducedMotion();
  const drift = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    // Cap delta so a backgrounded tab doesn't jump on return
    drift.set(drift.get() + (Math.min(delta, 64) / 1000) * DRIFT_SPEED);
  });

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden"
      style={{
        background: '#0C0C0C',
        paddingTop: 'clamp(4rem, 8vw, 10rem)',
        paddingBottom: '2.5rem',
        // Fade the rows out at both edges
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow shots={row1} direction="right" offset={offset} drift={drift} />
        <MarqueeRow shots={row2} direction="left" offset={offset} drift={drift} />
      </div>
    </section>
  );
}
