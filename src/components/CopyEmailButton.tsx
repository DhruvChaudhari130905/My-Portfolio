import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

const swap = {
  initial: { opacity: 0, y: 8, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.8 },
  transition: { duration: 0.2 },
};

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked: fall back to the mail app
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Email copied' : `Copy email address ${email}`}
      className="group flex items-center gap-2 rounded-full px-4 py-2.5 text-[#D7E2EA] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D7E2EA]/10"
      style={{
        border: `1px solid ${copied ? 'rgba(61, 220, 132, 0.6)' : 'rgba(215, 226, 234, 0.18)'}`,
        fontWeight: 400,
      }}
    >
      <span className="relative flex h-[18px] w-[18px] items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="check" {...swap} className="absolute text-[#3DDC84]">
              <Check size={18} />
            </motion.span>
          ) : (
            <motion.span key="copy" {...swap} className="absolute">
              <Copy size={18} className="transition-transform duration-300 group-hover:scale-110" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="hidden sm:inline" aria-live="polite">
        {copied ? 'Copied' : 'Copy email'}
      </span>
    </button>
  );
}
