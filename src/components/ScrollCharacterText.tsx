import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollCharacterTextProps {
  text: string;
  className?: string;
}

export function ScrollCharacterText({ text, className = '' }: ScrollCharacterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Split by one or more newlines to get paragraphs
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
  
  // Calculate total characters excluding newlines for animation timing
  const totalChars = paragraphs.join(' ').length;
  let charCount = 0;

  return (
    <div ref={containerRef} className={className}>
      <div
        className="flex flex-col gap-6"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
        }}
      >
        {paragraphs.map((paragraph, pIndex) => {
          const words = paragraph.split(' ');
          
          return (
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
              {words.map((word, wordIndex) => {
                const chars = word.split('');
                const wordElement = (
                  <span key={`word-${wordIndex}`} className="inline-block">
                    {chars.map((char, charIndex) => {
                      const index = charCount++;
                      return (
                        <Character
                          key={charIndex}
                          char={char}
                          index={index}
                          total={totalChars}
                          scrollYProgress={scrollYProgress}
                        />
                      );
                    })}
                  </span>
                );
                
                // Increment for the space we add between words
                charCount++;
                
                return (
                  <span key={`group-${wordIndex}`}>
                    {wordElement}
                    {wordIndex < words.length - 1 && ' '}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>
    </div>
  );
}

interface CharacterProps {
  char: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function Character({ char, index, total, scrollYProgress }: CharacterProps) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span style={{ visibility: 'hidden' }}>{char === ' ' ? '\u00A0' : char}</span>
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity,
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
}
