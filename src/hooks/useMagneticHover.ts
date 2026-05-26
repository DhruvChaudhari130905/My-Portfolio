import { useRef, useCallback, useEffect } from 'react';

interface MagneticHoverOptions {
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

export function useMagneticHover({
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: MagneticHoverOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const isActiveRef = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const expandedLeft = rect.left - padding;
      const expandedRight = rect.right + padding;
      const expandedTop = rect.top - padding;
      const expandedBottom = rect.bottom + padding;

      const isInside =
        e.clientX >= expandedLeft &&
        e.clientX <= expandedRight &&
        e.clientY >= expandedTop &&
        e.clientY <= expandedBottom;

      if (isInside) {
        if (!isActiveRef.current) {
          isActiveRef.current = true;
          el.style.transition = activeTransition;
        }
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
      } else {
        if (isActiveRef.current) {
          isActiveRef.current = false;
          el.style.transition = inactiveTransition;
          el.style.transform = 'translate3d(0, 0, 0)';
        }
      }
    },
    [padding, strength, activeTransition, inactiveTransition]
  );

  const handleMouseLeave = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;
    if (isActiveRef.current) {
      isActiveRef.current = false;
      el.style.transition = inactiveTransition;
      el.style.transform = 'translate3d(0, 0, 0)';
    }
  }, [inactiveTransition]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return { ref: elementRef, onMouseLeave: handleMouseLeave };
}
