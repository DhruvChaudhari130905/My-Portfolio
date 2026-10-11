import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ContactCTA } from "@/components/ContactCTA";
import { LiveStatus } from "@/components/LiveStatus";
import { MagneticHover } from "@/components/MagneticHover";
import { RevealText } from "@/components/RevealText";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { NAV_LINKS, scrollToSection } from "@/lib/nav";

const SPLINE_VIEWER_SRC =
  "https://unpkg.com/@splinetool/viewer@1.0.91/build/spline-viewer.js";

// Intro timeline (seconds)
const T = {
  backdrop: 0,
  nav: 0.1,
  heading: 0.25,
  figure: 0.6,
  footer: 1.0,
};

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO },
});

// The 3D scene is heavy: only load it on larger screens without reduced motion
const SPLINE_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
// Pointer parallax only makes sense with a mouse
const PARALLAX_QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

export function HeroSection() {
  const [showSpline] = useState(() => window.matchMedia(SPLINE_QUERY).matches);

  // Pointer position, -0.5..0.5 from the viewport centre
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 20 });
  // Name and figure drift in opposite directions for depth
  const nameX = useTransform(smoothX, (v) => v * -28);
  const nameY = useTransform(smoothY, (v) => v * -12);
  const figureX = useTransform(smoothX, (v) => v * 36);
  const figureY = useTransform(smoothY, (v) => v * 14);

  useEffect(() => {
    if (!showSpline) return;
    if (document.querySelector(`script[src="${SPLINE_VIEWER_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SPLINE_VIEWER_SRC;
    script.type = "module";
    document.body.appendChild(script);
  }, [showSpline]);

  useEffect(() => {
    if (!window.matchMedia(PARALLAX_QUERY).matches) return;
    const onMove = (e: PointerEvent) => {
      pointerX.set(e.clientX / window.innerWidth - 0.5);
      pointerY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY]);

  return (
    <section
      id="hero"
      // .hero sets --fig-h / --name-at (index.css): the figure's height drives the layout
      className="hero relative flex h-[100svh] flex-col justify-between overflow-hidden"
      style={{
        background: "#0C0C0C",
        contain: "layout style",
      }}
    >
      {/* Background Layer, dimmed so the name and figure lead */}
      <motion.div
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          contain: "layout style paint",
          pointerEvents: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.6, delay: T.backdrop, ease: "easeOut" }}
      >
        {showSpline ? (
          <spline-viewer
            url="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          ></spline-viewer>
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(ellipse at 70% 30%, rgba(118, 33, 176, 0.5), transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(182, 0, 168, 0.3), transparent 55%)",
            }}
          />
        )}
      </motion.div>

      {/* Navbar */}
      <motion.div
        className="relative z-30 w-full flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: T.nav, ease: EASE_OUT_EXPO }}
      >
        <nav
          aria-label="Primary"
          className="flex items-center gap-5 sm:gap-10 md:gap-16"
          style={{
            paddingTop: "clamp(1.5rem, 3vw, 2rem)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="group relative uppercase text-[#D7E2EA]"
              style={{
                fontWeight: 500,
                fontSize: "clamp(0.8rem, 1.4vw, 1.4rem)",
                letterSpacing: "0.05em",
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              {link.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Name, behind the figure: across its chest on wide screens, above its head on tall ones */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 z-10 flex justify-center"
        style={{ bottom: "calc(var(--fig-h) * var(--name-at))", x: nameX, y: nameY }}
      >
        <RevealText
          as="h1"
          trigger="mount"
          delay={T.heading}
          stagger={0.14}
          lines={[
            <span
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 2.2rem)",
                fontWeight: 400,
                letterSpacing: "0.01em",
                lineHeight: 1.4,
              }}
            >
              Hi, I'm
            </span>,
            "DHRUV",
          ]}
          className="whitespace-nowrap text-left font-black"
          lineClassName="hero-heading"
          style={{
            fontSize: "min(27vw, 38svh)",
            letterSpacing: "-0.03em",
            lineHeight: 0.8,
            fontFamily: "'Kanit', sans-serif",
          }}
        />
      </motion.div>

      {/* Back light that lifts the figure off the dark background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 z-[15] -translate-x-1/2 rounded-full"
        style={{
          bottom: "calc(var(--fig-h) * 0.15)",
          width: "calc(var(--fig-h) * 1.1)",
          height: "calc(var(--fig-h) * 0.9)",
          background:
            "radial-gradient(closest-side, rgba(182, 0, 168, 0.38), rgba(118, 33, 176, 0.22) 55%, transparent)",
          filter: "blur(20px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: T.figure, ease: "easeOut" }}
      />

      {/* Figure, in front of the name */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
        <motion.div style={{ x: figureX, y: figureY }}>
          <motion.img
            src="assets/dhruv-cutout.webp"
            alt="Illustration of Dhruv Chaudhari in a hoodie and blazer"
            className="block w-auto max-w-none"
            style={{
              height: "var(--fig-h)",
              // Soften the flat crop at the legs
              maskImage: "linear-gradient(to top, transparent, #000 22%)",
              WebkitMaskImage: "linear-gradient(to top, transparent, #000 22%)",
              filter: "drop-shadow(0 0 28px rgba(118, 33, 176, 0.35))",
            }}
            loading="eager"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: T.figure, ease: EASE_OUT_EXPO }}
          />
        </motion.div>
      </div>

      {/* Keeps the tagline and button legible over the figure */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[36%] sm:h-[22%]"
        style={{ background: "linear-gradient(to top, #0C0C0C 25%, transparent)" }}
      />

      {/* Bottom bar */}
      <div
        className="relative z-30 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 sm:gap-4"
        style={{
          padding: "0 clamp(1.25rem, 4vw, 2.5rem) clamp(1.75rem, 3vw, 2.5rem)",
        }}
      >
        <motion.div
          {...rise(T.footer)}
          className="flex flex-col items-center gap-3 sm:items-start"
          style={{ fontFamily: "'Kanit', sans-serif" }}
        >
          <LiveStatus />
          <p
            className="text-[#D7E2EA] text-center sm:text-left"
            style={{
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 1.3vw, 1.25rem)",
              lineHeight: 1.45,
              maxWidth: "300px",
            }}
          >
            Full stack developer building scalable, intelligent applications.
          </p>
        </motion.div>

        <motion.div {...rise(T.footer + 0.12)}>
          <MagneticHover padding={80} strength={4}>
            <ContactCTA />
          </MagneticHover>
        </motion.div>
      </div>
    </section>
  );
}
