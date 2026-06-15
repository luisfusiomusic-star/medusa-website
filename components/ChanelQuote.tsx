'use client';

/**
 * Coco Chanel quote — words slide in 80ms apart once 30% of the section
 * crosses the viewport. The cite author fades in 300ms after the last
 * word. Fires exactly once per mount.
 */
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

export default function ChanelQuote({ text, author = '— Coco Chanel' }: { text: string; author?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealedWords, setRevealedWords] = useState(0);
  const [authorVisible, setAuthorVisible] = useState(false);
  const words = useMemo(() => (text || '').trim().split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    if (!words.length) return;
    const el = ref.current;
    if (!el) return;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    if (!('IntersectionObserver' in window)) {
      setRevealedWords(words.length);
      setAuthorVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          words.forEach((_, i) => {
            timeouts.push(setTimeout(() => setRevealedWords((n) => Math.max(n, i + 1)), i * 80));
          });
          timeouts.push(setTimeout(() => setAuthorVisible(true), words.length * 80 + 300));
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [words]);

  return (
    <section ref={ref} className="quote-section" data-bg-context="dark">
      <div className="quote-ornament" aria-hidden="true">
        ——
      </div>
      <blockquote className="quote-text">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className={'quote-word' + (i < revealedWords ? ' visible' : '')}>{w}</span>
            {i < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </blockquote>
      <cite className={'quote-author' + (authorVisible ? ' visible' : '')}>{author}</cite>
    </section>
  );
}
