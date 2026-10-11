import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollCharacterTextProps {
  text: string;
  className?: string;
}

// Lights the text up word by word as it scrolls through the viewport.
// One animated node per word (not per character) keeps the bio cheap to render.
export function ScrollCharacterText({ text, className = '' }: ScrollCharacterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Precompute each word's global index so render stays pure
  const { paragraphs, totalWords } = useMemo(() => {
    let wordCount = 0;
    const paragraphs = text
      .split(/\n+/)
      .filter((p) => p.trim().length > 0)
      .map((paragraph) =>
        paragraph.split(' ').map((word) => ({ word, index: wordCount++ })),
      );
    return { paragraphs, totalWords: Math.max(wordCount, 1) };
  }, [text]);

  return (
    <div ref={containerRef} className={className}>
      <div
        className="flex flex-col gap-6"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
        }}
      >
        {paragraphs.map((words, pIndex) => (
          <p
            key={`p-${pIndex}`}
            className="text-center leading-relaxed"
            style={{
              color: '#D7E2EA',
              fontWeight: 500,
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              lineHeight: 1.625,
            }}
          >
            {words.map(({ word, index }, wordIndex) => (
              <span key={index}>
                <Word
                  word={word}
                  index={index}
                  total={totalWords}
                  scrollYProgress={scrollYProgress}
                />
                {wordIndex < words.length - 1 && ' '}
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}

interface WordProps {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function Word({ word, index, total, scrollYProgress }: WordProps) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return <motion.span style={{ opacity }}>{word}</motion.span>;
}
