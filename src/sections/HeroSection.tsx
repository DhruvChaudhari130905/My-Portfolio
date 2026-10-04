import { motion } from "framer-motion";
import { useEffect } from "react";
import { ContactCTA } from "@/components/ContactCTA";
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
  portrait: 0.55,
  footer: 0.95,
};

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO },
});

export function HeroSection() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SPLINE_VIEWER_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SPLINE_VIEWER_SRC;
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex h-screen flex-col justify-between overflow-x-clip"
      style={{
        background: "#0C0C0C",
        contain: "layout style",
      }}
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          contain: "layout style paint",
          pointerEvents: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: T.backdrop, ease: "easeOut" }}
      >
        <spline-viewer
          url="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        ></spline-viewer>
      </motion.div>

      {/* Navbar */}
      <motion.div
        className="relative z-20 w-full flex justify-center"
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

      {/* Hero Heading */}
      <div className="w-full relative z-20 flex justify-start overflow-visible">
        <RevealText
          as="h1"
          trigger="mount"
          delay={T.heading}
          stagger={0.14}
          lines={["Hi, i'm", "Dhruv"]}
          className="font-black uppercase text-left"
          lineClassName="hero-heading"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 13rem)",
            letterSpacing: "-0.02em",
            lineHeight: 0.85,
            marginTop: "clamp(2rem, 10vh, 6rem)",
            marginBottom: "clamp(7rem, 20vh, 24rem)",
            padding: "0 clamp(1.25rem, 5vw, 4rem)",
            fontFamily: "'Kanit', sans-serif",
          }}
        />
      </div>

      {/* Portrait - unmasked from the bottom while settling from a slight zoom */}
      <div
        className="absolute right-0 bottom-[170px] z-10 flex justify-end pr-2 sm:bottom-[clamp(120px,20vw,160px)] sm:pr-4"
      >
        <motion.div
          className="w-[260px] sm:w-[320px] md:w-[420px] lg:w-[540px] xl:w-[640px] overflow-hidden"
          style={{ borderRadius: "1rem" }}
          initial={{ clipPath: "inset(100% 0% 0% 0% round 1rem)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 1rem)" }}
          transition={{ duration: 1.2, delay: T.portrait, ease: EASE_OUT_EXPO }}
        >
          <motion.img
            src="assets/portrait-dhruv.jpeg"
            alt="Dhruv Chaudhari - Full Stack Developer"
            className="block h-auto w-full object-cover"
            loading="eager"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, delay: T.portrait, ease: EASE_OUT_EXPO }}
          />
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        className="relative z-20 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 sm:gap-4"
        style={{
          padding: "0 clamp(1.25rem, 4vw, 2.5rem) clamp(1.75rem, 3vw, 2.5rem)",
        }}
      >
        <motion.p
          {...rise(T.footer)}
          className="uppercase text-[#D7E2EA] text-center sm:text-left"
          style={{
            fontWeight: 300,
            fontSize: "clamp(0.7rem, 1.2vw, 1.2rem)",
            letterSpacing: "0.03em",
            lineHeight: 1.4,
            maxWidth: "280px",
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          a full stack developer driven by crafting scalable and intelligent
          applications
        </motion.p>

        <motion.div {...rise(T.footer + 0.12)}>
          <MagneticHover padding={80} strength={4}>
            <ContactCTA />
          </MagneticHover>
        </motion.div>
      </div>
    </section>
  );
}
