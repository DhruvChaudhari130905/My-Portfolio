import { useScrollOffset } from '@/hooks/useScrollOffset';

const row1Images = [
  '/assets/marquee-1.jpg',
  '/assets/marquee-2.jpg',
  '/assets/marquee-3.jpg',
  '/assets/marquee-4.jpg',
  '/assets/marquee-5.jpg',
  '/assets/marquee-6.jpg',
  '/assets/marquee-7.jpg',
  '/assets/marquee-8.jpg',
  '/assets/marquee-9.jpg',
  '/assets/marquee-10.jpg',
  '/assets/marquee-11.jpg',
];

const row2Images = [
  '/assets/marquee-12.jpg',
  '/assets/marquee-13.jpg',
  '/assets/marquee-14.jpg',
  '/assets/marquee-15.jpg',
  '/assets/marquee-16.jpg',
  '/assets/marquee-17.jpg',
  '/assets/marquee-18.jpg',
  '/assets/marquee-19.jpg',
  '/assets/marquee-20.jpg',
  '/assets/marquee-21.jpg',
];

function MarqueeRow({
  images,
  direction,
  offset,
}: {
  images: string[];
  direction: 'left' | 'right';
  offset: number;
}) {
  const tripled = [...images, ...images, ...images];
  const translateX = direction === 'right' ? offset - 200 : -(offset - 200);

  return (
    <div
      className="flex gap-3"
      style={{
        transform: `translateX(${translateX}px)`,
        willChange: 'transform',
      }}
    >
      {tripled.map((src, i) => (
        <div
          key={i}
          className="shrink-0 overflow-hidden rounded-2xl"
          style={{ width: '420px', height: '270px' }}
        >
          <img
            src={src}
            alt={`Project preview ${(i % images.length) + 1}`}
            className="h-full w-full object-cover"
            loading="lazy"
            style={{ background: '#1a1a1a' }}
          />
        </div>
      ))}
    </div>
  );
}

export function MarqueeSection() {
  const { sectionRef, offset } = useScrollOffset();

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden"
      style={{
        background: '#0C0C0C',
        paddingTop: 'clamp(6rem, 8vw, 10rem)',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow images={row1Images} direction="right" offset={offset} />
        <MarqueeRow images={row2Images} direction="left" offset={offset} />
      </div>
    </section>
  );
}
