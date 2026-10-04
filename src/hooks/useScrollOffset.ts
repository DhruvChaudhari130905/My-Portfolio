import { useRef, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

const MARQUEE_SCROLL_FACTOR = 0.12;

// Returns a MotionValue (not state) so scrolling doesn't re-render the section.
export function useScrollOffset() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const offset = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      offset.set((window.scrollY - sectionTop + window.innerHeight) * MARQUEE_SCROLL_FACTOR);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [offset]);

  return { sectionRef, offset };
}
