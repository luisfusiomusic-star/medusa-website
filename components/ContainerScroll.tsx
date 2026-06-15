'use client';

/**
 * ContainerScroll — 3D perspective card that un-tilts (rotateX 20° → 0°)
 * and scales as it scrolls through the viewport, with the header
 * translating up. Used on Home with the hero teaser video inside.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useScrollProgress } from '@/lib/hooks';

export default function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const progress = useScrollProgress(ref);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const rotate = lerp(20, 0, progress);
  const scaleFrom = isMobile ? 0.7 : 1.05;
  const scaleTo = isMobile ? 0.9 : 1;
  const scale = lerp(scaleFrom, scaleTo, progress);
  const translate = lerp(0, -100, progress);

  return (
    <div ref={ref} className="container-scroll">
      <div className="container-scroll-inner">
        <div className="container-scroll-header" style={{ transform: `translate3d(0, ${translate}px, 0)` }}>
          {titleComponent}
        </div>
        <div className="container-scroll-card" style={{ transform: `rotateX(${rotate}deg) scale(${scale})` }}>
          <div className="container-scroll-card-inner">{children}</div>
        </div>
      </div>
    </div>
  );
}
