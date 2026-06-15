'use client';

/**
 * Page hero (Beach Club / Ristorante / Menu / Vini / Contatti).
 * Subtle premium parallax: photo moves at 40% of scroll speed, capped at
 * ±40px so edges never expose. Paired with scale(1.15) (overscan) so
 * crop-bleed stays hidden through the full vertical shift range.
 */
import { useEffect, useState, type ReactNode } from 'react';
import { useParallax } from '@/lib/hooks';
import { EASE } from '@/lib/constants';

interface PageHeroProps {
  photo: string;
  kicker: string;
  title: string;
  sub?: ReactNode;
}

export default function PageHero({ photo, kicker, title, sub }: PageHeroProps) {
  const [pref, off] = useParallax<HTMLDivElement>(0.4);
  const cappedOff = Math.max(-40, Math.min(40, off));
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={pref}
      data-bg-context="dark"
      style={{
        height: '78vh',
        minHeight: 560,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--teal-deep)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-10% 0',
          backgroundImage: `url(${photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate3d(0, ${cappedOff}px, 0) scale(${shown ? 1.15 : 1.2})`,
          opacity: shown ? 1 : 0,
          transition: `opacity 1.6s ${EASE}, transform 1.6s ${EASE}`,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15,34,48,0.30) 0%, rgba(15,34,48,0.62) 100%)',
        }}
      />
      <div style={{ textAlign: 'center', color: 'white', zIndex: 2, padding: '0 20px', maxWidth: 900 }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 22,
            opacity: shown ? 1 : 0,
            transform: shown ? 'translateY(0)' : 'translateY(14px)',
            transition: `opacity 1s ${EASE} 0.2s, transform 1s ${EASE} 0.2s`,
          }}
        >
          {kicker}
        </p>
        <h1
          className="hero-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 10vw, 120px)',
            fontWeight: 400,
            letterSpacing: '0.12em',
            lineHeight: 1,
            opacity: shown ? 1 : 0,
            transform: shown ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 1.1s ${EASE} 0.35s, transform 1.1s ${EASE} 0.35s`,
            wordBreak: 'keep-all',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
            fontStyle: 'italic',
            marginTop: 22,
            opacity: shown ? 0.95 : 0,
            transform: shown ? 'translateY(0)' : 'translateY(14px)',
            transition: `opacity 1.2s ${EASE} 0.55s, transform 1.2s ${EASE} 0.55s`,
          }}
        >
          {sub}
        </p>
      </div>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1,
          height: 36,
          background: 'rgba(255,255,255,0.45)',
          opacity: shown ? 1 : 0,
          transition: `opacity 1s ${EASE} 1.1s`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 1,
            height: 14,
            background: 'var(--gold)',
            animation: 'scrollCue 2.2s cubic-bezier(0.32, 0.72, 0, 1) infinite',
          }}
        />
      </div>
    </div>
  );
}
