import { useRef, useEffect, useState } from 'react';

const MARQUEE_SCROLL_FACTOR = 0.12;

export function useScrollOffset() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const newOffset = (scrollY - sectionTop + innerHeight) * MARQUEE_SCROLL_FACTOR;
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { sectionRef, offset };
}
