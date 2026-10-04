import { motion, type Variants } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { EASE_OUT_EXPO } from '@/lib/motion';

interface RevealTextProps {
  lines: ReactNode[];
  as?: 'h1' | 'h2';
  className?: string;
  /** Applied to each moving line, e.g. `hero-heading` for gradient text */
  lineClassName?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  trigger?: 'mount' | 'inView';
}

const line: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

// Each line slides up from behind a mask
export function RevealText({
  lines,
  as = 'h2',
  className = '',
  lineClassName = '',
  style,
  delay = 0,
  stagger = 0.12,
  trigger = 'inView',
}: RevealTextProps) {
  const Tag = motion[as];
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const triggerProps =
    trigger === 'mount'
      ? { animate: 'visible' }
      : { whileInView: 'visible', viewport: { once: true, amount: 0.5 } };

  return (
    <Tag className={className} style={style} variants={container} initial="hidden" {...triggerProps}>
      {lines.map((content, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span variants={line} className={`inline-block ${lineClassName}`}>
            {content}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
