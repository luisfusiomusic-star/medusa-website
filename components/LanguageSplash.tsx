'use client';

/**
 * First-visit language splash overlay — logo, "Genova · Nervi", and the
 * five language buttons. Picking one fades the overlay (420ms) and hands
 * the chosen code back to the app.
 */
import { useEffect, useState } from 'react';
import { EASE, EASE_SMOOTH, type Lang } from '@/lib/constants';

const OPTIONS: { code: Lang; label: string; flag: string }[] = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export default function LanguageSplash({ onChoose }: { onChoose: (code: Lang) => void }) {
  const [picked, setPicked] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 30);
    return () => clearTimeout(t);
  }, []);

  const choose = (code: Lang) => {
    if (picked) return;
    setPicked(true);
    setTimeout(() => onChoose(code), 420);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Choose language"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--teal-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: picked ? 0 : show ? 1 : 0,
        transition: `opacity 0.45s ${EASE}`,
        padding: '40px 24px',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(201,166,99,0.10), transparent 60%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          color: 'white',
          opacity: show && !picked ? 1 : 0,
          transform: show && !picked ? 'translateY(0)' : 'translateY(12px)',
          transition: `opacity 0.7s ${EASE} 0.05s, transform 0.7s ${EASE} 0.05s`,
        }}
      >
        <div style={{ width: 1, height: 60, background: 'var(--gold)', margin: '0 auto 30px', opacity: 0.55 }} />
        <h1 style={{ margin: 0, lineHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_medusa.png"
            alt="MEDUSA"
            fetchPriority="high"
            style={{ width: 'min(70vw, 620px)', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 300,
            color: 'var(--gold)',
            marginTop: 18,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
          }}
        >
          Genova · Nervi
        </p>
        <div style={{ width: 1, height: 40, background: 'var(--gold)', margin: '30px auto 36px', opacity: 0.35 }} />
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 16,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.62)',
            marginBottom: 26,
            letterSpacing: '0.04em',
          }}
        >
          Scegli la tua lingua · Choose your language
        </p>
        <div className="lang-splash-grid" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
          {OPTIONS.map((opt, idx) => (
            <button
              key={opt.code}
              onClick={() => choose(opt.code)}
              aria-label={opt.label}
              className="lang-splash-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '13px 22px',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'white',
                background: 'transparent',
                border: '1px solid rgba(201,166,99,0.45)',
                borderRadius: 999,
                cursor: 'pointer',
                transition: `color 0.4s ${EASE_SMOOTH}, background 0.4s ${EASE_SMOOTH}, border-color 0.4s ${EASE_SMOOTH}, transform 0.4s ${EASE_SMOOTH}`,
                opacity: show && !picked ? 1 : 0,
                transform: show && !picked ? 'translateY(0)' : 'translateY(8px)',
                transitionDelay: `${0.15 + idx * 0.06}s`,
              }}
            >
              <span style={{ fontSize: 18 }} aria-hidden="true">
                {opt.flag}
              </span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
