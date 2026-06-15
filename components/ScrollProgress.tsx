'use client';

/**
 * Gold scroll progress bar — rAF-throttled width update on scroll.
 * Sits above the navbar (z=9999), fills L→R as the page is scrolled.
 */
import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let pending = false;
    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      bar.style.width = Math.max(0, Math.min(100, p)) + '%';
      pending = false;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div id="scroll-progress-bar" ref={barRef} aria-hidden="true" />;
}
