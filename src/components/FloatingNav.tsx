import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion';
import { NAV_LINKS, scrollToSection } from '@/lib/nav';

// Scroll progress bar + section nav that appears once the hero is out of view
export function FloatingNav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setVisible(y > window.innerHeight * 0.75);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)',
        }}
      />
      <AnimatePresence>
        {visible && (
          <motion.nav
            key="floating-nav"
            aria-label="Sections"
            initial={{ y: -72, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: -72, opacity: 0, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed left-1/2 top-4 z-50 flex items-center gap-0.5 rounded-full p-1.5"
            style={{
              background: 'rgba(12, 12, 12, 0.88)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(215, 226, 234, 0.14)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-[#D7E2EA] transition-opacity duration-200 sm:px-4 sm:text-sm ${
                    isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(215, 226, 234, 0.12)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
