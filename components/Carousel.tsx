'use client';

/**
 * Simple photo carousel (Ristorante) — La Sala / La Carta / Il Crudo.
 * Horizontal scroll-snap track with arrow navigation.
 * aspectRatio = naturalWidth/naturalHeight so each card is exactly
 * as wide as the photo is tall (500px fixed height × ratio).
 */
import { useRef } from 'react';

const SLIDES = [
  { src: '/medusa_ristorante_8b.jpeg', label: 'La Sala', aspectRatio: '1536/2752', loading: 'eager' as const },
  { src: '/medusa_ristorante_6b.jpg', label: 'La Carta', aspectRatio: '768/1365', loading: 'lazy' as const },
  { src: '/medusa_ristorante_7b.jpg', label: 'Il Crudo', aspectRatio: '666/1000', loading: 'lazy' as const },
];

export default function Carousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (left: number) => {
    trackRef.current?.scrollBy({ left, behavior: 'smooth' });
  };

  return (
    <div>
      <section className="simple-carousel-section">
        <div className="simple-carousel-wrapper">
          <button className="carousel-arrow left" aria-label="Previous" onClick={() => scrollBy(-464)}>
            ‹
          </button>
          <div className="simple-carousel-track" ref={trackRef}>
            {SLIDES.map((s) => (
              <div key={s.src} className="simple-carousel-slide" style={{ aspectRatio: s.aspectRatio }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.label} loading={s.loading} />
                <div className="slide-label">{s.label}</div>
              </div>
            ))}
          </div>
          <button className="carousel-arrow right" aria-label="Next" onClick={() => scrollBy(464)}>
            ›
          </button>
        </div>
      </section>
    </div>
  );
}
