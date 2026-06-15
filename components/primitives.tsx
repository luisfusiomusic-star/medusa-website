'use client';

/**
 * UI primitives — Reveal, RevealLines, SectionDivider, Kicker, Btn, Photo,
 * DownloadBtn. Ported 1:1 from the original site.
 */
import React, {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { useReveal } from '@/lib/hooks';
import { EASE, EASE_SMOOTH, type Lang } from '@/lib/constants';

/* ---------------------------------------------------------------- Reveal */

interface RevealProps {
  delay?: number;
  y?: number;
  children?: ReactNode;
  as?: React.ElementType;
  style?: CSSProperties;
  className?: string;
  threshold?: number;
}

export function Reveal({
  delay = 0,
  y = 28,
  children,
  as: Tag = 'div',
  style = {},
  className = '',
  threshold,
}: RevealProps) {
  const [ref, visible] = useReveal(threshold);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : `translate3d(0,${y}px,0)`,
        transition: `opacity 0.95s ${EASE} ${delay}s, transform 0.95s ${EASE} ${delay}s`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------- RevealLines */

/* Line-by-line reveal for headings. Words are first laid out invisibly to
   measure their line breaks, then re-rendered as per-line clipped spans
   that slide up + fade in with a 120ms stagger when the heading enters
   the viewport (threshold 0.2). Children must be a plain string — for
   richer content, fall back to <Reveal>. */
interface RevealLinesProps {
  as?: React.ElementType;
  children?: ReactNode;
  delay?: number;
  threshold?: number;
  style?: CSSProperties;
  className?: string;
}

export function RevealLines({
  as: Tag = 'h2',
  children,
  delay = 0,
  threshold = 0.2,
  style = {},
  className = '',
}: RevealLinesProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [lines, setLines] = useState<string[][] | null>(null);
  const [visible, setVisible] = useState(false);
  const text = typeof children === 'string' ? children : null;
  const words = useMemo(() => (text || '').split(/\s+/).filter(Boolean), [text]);

  /* Phase 1: measure word offsets (after fonts ready), group by offsetTop.
     Re-runs whenever `words` changes — e.g. on language switch — so the
     heading is re-measured and re-rendered with the new text. */
  useEffect(() => {
    if (!words.length) return;
    // Drop into measurement phase: clear stale line groups + visibility
    // so the next render lays out the new words for offsetTop reads.
    setLines(null);
    setVisible(false);
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const doMeasure = () => {
      if (cancelled) return;
      const node = ref.current;
      if (!node) return;
      const spans = node.querySelectorAll<HTMLElement>('[data-rl-w]');
      if (spans.length === 0) return;
      const groups: string[][] = [];
      let lastTop: number | null = null;
      let current: string[] = [];
      spans.forEach((s, i) => {
        const top = s.offsetTop;
        if (lastTop !== null && Math.abs(top - lastTop) > 2) {
          if (current.length) groups.push(current);
          current = [];
        }
        current.push(words[i]);
        lastTop = top;
      });
      if (current.length) groups.push(current);
      if (!cancelled) setLines(groups);
    };
    const ready = (document.fonts && document.fonts.ready) || Promise.resolve();
    ready.then(doMeasure);
    // Re-measure on resize so line breaks stay accurate at new widths.
    let rafId = 0;
    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setLines(null));
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, [words]);

  /* Phase 2: IntersectionObserver — fires once. */
  useEffect(() => {
    if (!lines || visible) return;
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lines, visible, threshold]);

  if (!text || !words.length) {
    return (
      <Tag ref={ref} style={style} className={className}>
        {children}
      </Tag>
    );
  }
  if (!lines) {
    // Measurement render — laid out for offsetTop reads, invisible to user.
    return (
      <Tag ref={ref} style={{ ...style, visibility: 'hidden' }} className={className}>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span data-rl-w="">{w}</span>
            {i < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </Tag>
    );
  }
  // Reveal render — line-by-line with stagger.
  return (
    <Tag ref={ref} style={style} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span
            className={'reveal-line-inner' + (visible ? ' visible' : '')}
            style={{ transitionDelay: `${(delay + i * 0.12).toFixed(3)}s` }}
          >
            {line.join(' ')}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* -------------------------------------------------------- SectionDivider */

/* Gold ornament divider — fixed-width centered SVG, drops in above key
   h2 headings and between major sections. Decorative only (aria-hidden). */
export function SectionDivider({ style = {} }: { style?: CSSProperties }) {
  return (
    <div className="section-divider" aria-hidden="true" style={style}>
      <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg" width={200} height={20}>
        <line x1={0} y1={10} x2={80} y2={10} stroke="#c9a663" strokeWidth={0.5} opacity={0.6} />
        <path
          d="M90 10 L95 5 L100 10 L105 5 L110 10"
          stroke="#c9a663"
          strokeWidth={0.8}
          fill="none"
          opacity={0.9}
        />
        <line x1={120} y1={10} x2={200} y2={10} stroke="#c9a663" strokeWidth={0.5} opacity={0.6} />
        <circle cx={100} cy={10} r={1.5} fill="#c9a663" opacity={0.9} />
      </svg>
    </div>
  );
}

/* ----------------------------------------------------------------- Kicker */

export function Kicker({
  children,
  color = 'var(--gold)',
  style = {},
}: {
  children?: ReactNode;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        letterSpacing: '0.42em',
        textTransform: 'uppercase',
        color,
        fontWeight: 400,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{ width: 22, height: 1, background: 'currentColor', opacity: 0.55, display: 'inline-block' }}
      />
      {children}
      <span
        aria-hidden="true"
        style={{ width: 22, height: 1, background: 'currentColor', opacity: 0.55, display: 'inline-block' }}
      />
    </p>
  );
}

/* ------------------------------------------------------------------- Btn */

interface BtnProps {
  as?: 'button' | 'a';
  variant?: 'solid' | 'gold' | 'ghost' | 'ghostLight';
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  onClick?: () => void;
}

export function Btn({ as = 'button', variant = 'solid', children, style = {}, className = '', ...rest }: BtnProps) {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 36px',
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    fontWeight: 500,
    borderRadius: 999,
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: `transform 0.45s ${EASE_SMOOTH}, box-shadow 0.45s ${EASE_SMOOTH}, background 0.45s ${EASE_SMOOTH}, color 0.45s ${EASE_SMOOTH}, border-color 0.45s ${EASE_SMOOTH}`,
    textDecoration: 'none',
    lineHeight: 1,
    whiteSpace: 'nowrap',
  };
  const variants: Record<string, CSSProperties> = {
    solid: { background: 'var(--teal-deep)', color: 'white' },
    gold: { background: 'var(--gold)', color: 'var(--teal-deep)' },
    ghost: { background: 'transparent', color: 'var(--teal-deep)', borderColor: 'var(--teal-deep)' },
    ghostLight: { background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.55)' },
  };
  const Tag = as as React.ElementType;
  return (
    <Tag {...rest} className={'btn ' + className} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------------- Photo */

export function Photo({
  src,
  label,
  h: height = 300,
  style = {},
}: {
  src?: string;
  label?: string;
  h?: number;
  style?: CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  if (!src) {
    return (
      <div
        style={{
          width: '100%',
          height,
          background: 'linear-gradient(135deg, #173a4c 0%, #0F2230 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(201,166,99,0.55)',
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px -30px rgba(0,0,0,0.6)',
          ...style,
        }}
      >
        {label}
      </div>
    );
  }
  return (
    <figure
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        height,
        margin: 0,
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px -30px rgba(0,0,0,0.55)',
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: hover ? 'scale(1.05)' : 'scale(1)',
          transition: `transform 0.9s ${EASE}`,
        }}
      />
      <figcaption
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '20px 18px 14px',
          background: 'linear-gradient(180deg, rgba(15,34,48,0) 0%, rgba(15,34,48,0.75) 100%)',
          color: 'var(--gold)',
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          opacity: hover ? 1 : 0.85,
          transform: hover ? 'translateY(0)' : 'translateY(4px)',
          transition: `opacity 0.5s ${EASE_SMOOTH}, transform 0.5s ${EASE_SMOOTH}`,
        }}
      >
        {label}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------ DownloadBtn */

const DOWNLOAD_LABELS: Record<'menu' | 'vini', Record<Lang, string>> = {
  menu: {
    it: 'Scarica il Menu (PDF)',
    en: 'Download Menu (PDF)',
    de: 'Speisekarte herunterladen (PDF)',
    fr: 'Télécharger le Menu (PDF)',
    es: 'Descargar la Carta (PDF)',
  },
  vini: {
    it: 'Scarica la Carta Vini (PDF)',
    en: 'Download Wine List (PDF)',
    de: 'Weinkarte herunterladen (PDF)',
    fr: 'Télécharger la Carte des Vins (PDF)',
    es: 'Descargar la Carta de Vinos (PDF)',
  },
};

export function DownloadBtn({ href, lang, kind }: { href: string; lang: Lang; kind: 'menu' | 'vini' }) {
  return (
    <a
      href={href}
      download
      className="btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '14px 32px',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        fontWeight: 500,
        borderRadius: 999,
        background: 'transparent',
        color: 'var(--gold)',
        border: '1px solid var(--gold)',
        transition: `transform 0.45s ${EASE_SMOOTH}, box-shadow 0.45s ${EASE_SMOOTH}, background 0.45s ${EASE_SMOOTH}, color 0.45s ${EASE_SMOOTH}`,
        textDecoration: 'none',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1={12} y1={15} x2={12} y2={3} />
      </svg>
      {DOWNLOAD_LABELS[kind][lang]}
    </a>
  );
}
