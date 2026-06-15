'use client';

/**
 * Home hero — auto-zoom video (adapted from the ScrollExpandMedia pattern,
 * but TIME-DRIVEN, not scroll-driven).
 *
 * On mount, once the video can play, the MEDUSA loader is dismissed
 * (`medusa:frames-ready`) and — after a 600ms beat — a small centered video
 * automatically expands to fill the viewport over ~4s (easeInOut). When fully
 * expanded the video crossfades out and the destination picker fades in
 * (same picker markup/styling as before). No scroll listeners; the page
 * scrolls normally as soon as the picker appears.
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  HERO_VIDEO_DESKTOP,
  HERO_VIDEO_MOBILE,
  MOBILE_BREAKPOINT,
  type Lang,
  type NavFn,
} from '@/lib/constants';
import { I18N } from '@/lib/i18n';
import { Kicker } from '@/components/primitives';

const DURATION = 4000; // expansion length (ms)
const START_W = 300;
const START_H = 400;

export default function HeroZoom({ nav, lang }: { nav: NavFn; lang: Lang }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  const [hoveredSide, setHoveredSide] = useState<'rist' | 'stab' | null>(null);

  const t = I18N[lang].home;

  // Pick the source once and track the viewport size (the target expand box).
  useEffect(() => {
    setVideoSrc(window.innerWidth < MOBILE_BREAKPOINT ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP);
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Lock page scroll during the intro; release once the picker takes over.
  // (A style lock — not a scroll listener. Backstop guarantees it can't trap.)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    const backstop = setTimeout(() => {
      document.body.style.overflow = '';
    }, 8000);
    return () => {
      clearTimeout(backstop);
      document.body.style.overflow = '';
    };
  }, []);
  useEffect(() => {
    if (expanded) document.body.style.overflow = '';
  }, [expanded]);

  // Auto-expansion: drive progress 0→1 over DURATION with an easeInOut curve.
  useEffect(() => {
    if (!videoSrc) return;
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;
    let started = false;
    let rafId = 0;
    let startTimer: ReturnType<typeof setTimeout> | undefined = undefined;
    let readyFallback: ReturnType<typeof setTimeout> | undefined = undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

    const tick = (time: number) => {
      if (cancelled) return;
      if (startRef.current === null) startRef.current = time;
      const elapsed = time - startRef.current;
      const raw = Math.min(elapsed / DURATION, 1);
      const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
      setProgress(eased);
      if (raw < 1) rafId = requestAnimationFrame(tick);
      else setExpanded(true);
    };

    const begin = () => {
      if (started || cancelled) return;
      started = true;
      clearTimeout(readyFallback);
      // Dismiss the MEDUSA loader (it gates on this event).
      document.dispatchEvent(new CustomEvent('medusa:frames-ready'));
      if (reduce && reduce.matches) {
        // No animation for reduced-motion: jump straight to the picker.
        setProgress(1);
        setExpanded(true);
        return;
      }
      startTimer = setTimeout(() => {
        if (!cancelled) rafId = requestAnimationFrame(tick);
      }, 600);
    };

    if (v.readyState >= 3) begin();
    else {
      v.addEventListener('canplaythrough', begin, { once: true });
      v.addEventListener('loadeddata', begin, { once: true });
    }
    v.addEventListener('error', begin, { once: true }); // never brick on load failure
    readyFallback = setTimeout(begin, 4000); // hard fallback if no event fires

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(startTimer);
      clearTimeout(readyFallback);
      v.removeEventListener('canplaythrough', begin);
      v.removeEventListener('loadeddata', begin);
      v.removeEventListener('error', begin);
    };
  }, [videoSrc]);

  // Box grows from a small centered frame to the full viewport; radius 24→0.
  const w = Math.round(START_W + progress * (vp.w - START_W));
  const h = Math.round(START_H + progress * (vp.h - START_H));
  const radius = Math.max(0, Math.round(24 * (1 - progress)));

  return (
    <div className="hero-zoom-wrap" data-bg-context="dark">
      {/* Destination picker — sits behind the video, revealed as it fades out.
          Same markup/styling as before. */}
      <motion.div
        className="destination-picker"
        // Once expanded the picker rises ABOVE the video box (z-index 2) and
        // takes pointer events; the video box itself is pointer-events:none so
        // its faded-but-present layer can never intercept button clicks.
        style={{ zIndex: expanded ? 3 : 1, pointerEvents: expanded ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div
          className={'dp-bg dp-bg-rist' + (hoveredSide === 'rist' ? ' dp-active' : '')}
          style={{ backgroundImage: "url('/medusa_scelta_ristorante.jpeg')" }}
          aria-hidden="true"
        />
        <div
          className={'dp-bg dp-bg-stab' + (hoveredSide === 'stab' ? ' dp-active' : '')}
          style={{ backgroundImage: "url('/medusa_scelta_stabilimento0.jpeg')" }}
          aria-hidden="true"
        />
        <div className="dp-veil" aria-hidden="true" />
        <div className="dp-content">
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <Kicker color="var(--gold)">{t.pickKicker || I18N.it.home.pickKicker}</Kicker>
            <h2
              className="destination-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 400,
                letterSpacing: '0.14em',
                color: 'white',
                marginTop: 24,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
              }}
            >
              {t.pickTitle || I18N.it.home.pickTitle}
            </h2>
          </div>
          <div className="destination-picker-buttons">
            <button
              className="destination-btn"
              onMouseEnter={() => setHoveredSide('rist')}
              onMouseLeave={() => setHoveredSide(null)}
              onFocus={() => setHoveredSide('rist')}
              onBlur={() => setHoveredSide(null)}
              onClick={() => nav('ristorante')}
            >
              <span>{t.ristorante || I18N.it.home.ristorante}</span>
              <span className="destination-btn-sub">{t.ristoranteSub || I18N.it.home.ristoranteSub}</span>
            </button>
            <button
              className="destination-btn"
              onMouseEnter={() => setHoveredSide('stab')}
              onMouseLeave={() => setHoveredSide(null)}
              onFocus={() => setHoveredSide('stab')}
              onBlur={() => setHoveredSide(null)}
              onClick={() => nav('stabilimento')}
            >
              <span>{t.stabilimento || I18N.it.home.stabilimento}</span>
              <span className="destination-btn-sub">{t.stabilimentoSub || I18N.it.home.stabilimentoSub}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Auto-expanding video box. */}
      <motion.div
        className="hero-zoom-video-box"
        style={{ width: w, height: h, borderRadius: radius }}
        initial={{ opacity: 1 }}
        animate={{ opacity: expanded ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
    </div>
  );
}
