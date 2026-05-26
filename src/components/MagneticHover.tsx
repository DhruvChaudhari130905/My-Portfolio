import type { ReactNode } from 'react';
import { useMagneticHover } from '@/hooks/useMagneticHover';

interface MagneticHoverProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export function MagneticHover({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: MagneticHoverProps) {
  const { ref, onMouseLeave } = useMagneticHover({
    padding,
    strength,
    activeTransition,
    inactiveTransition,
  });

  return (
    <div
      ref={ref}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
