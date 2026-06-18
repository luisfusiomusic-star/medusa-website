'use client';

/**
 * Home hero — full-screen video (TIME-DRIVEN). The video fills the viewport
 * from the start (no zoom/expand on either axis).
 *
 * Playback is gated on `start`: a returning visitor (language already chosen)
 * starts immediately; a first-time visitor's video stays paused at frame 0
 * until they pick a language, so no footage plays behind the language splash.
 * The loader still dismisses as soon as the video is ready (independent of
 * `start`) so the splash can appear. Once playback starts, the video plays
 * full-screen for a short hold, then crossfades into the destination picker.
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
import FlowingMenu from '@/components/ui/FlowingMenu';

const HOLD = 4600; // how long the full-screen video plays before the picker crossfades in (ms)

export default function HeroZoom({ nav, lang, start }: { nav: NavFn; lang: Lang; start: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedRef = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const t = I18N[lang].home;

  // Two rows replace the old picker buttons — same nav targets / labels.
  const menuItems = [
    {
      text: t.ristorante || I18N.it.home.ristorante,
      image: '/medusa_scelta_ristorante.jpeg',
      onSelect: () => nav('ristorante'),
    },
    {
      text: t.stabilimento || I18N.it.home.stabilimento,
      image: '/medusa_scelta_stabilimento0.jpeg',
      onSelect: () => nav('stabilimento'),
    },
  ];

  // Pick the source once (desktop / mobile).
  useEffect(() => {
    setVideoSrc(window.innerWidth < MOBILE_BREAKPOINT ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP);
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

  // Readiness: as soon as the video can play, dismiss the MEDUSA loader (so the
  // splash / page can show) and mark ready. NOT gated on `start` — the video
  // stays paused until allowed to play.
  useEffect(() => {
    if (!videoSrc) return;
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;
    let done = false;
    let readyFallback: ReturnType<typeof setTimeout> | undefined = undefined;

    const markReady = () => {
      if (done || cancelled) return;
      done = true;
      clearTimeout(readyFallback);
      document.dispatchEvent(new CustomEvent('medusa:frames-ready'));
      setReady(true);
    };

    if (v.readyState >= 3) markReady();
    else {
      v.addEventListener('canplaythrough', markReady, { once: true });
      v.addEventListener('loadeddata', markReady, { once: true });
    }
    v.addEventListener('error', markReady, { once: true }); // never brick on load failure
    readyFallback = setTimeout(markReady, 4000); // hard fallback if no event fires

    return () => {
      cancelled = true;
      clearTimeout(readyFallback);
      v.removeEventListener('canplaythrough', markReady);
      v.removeEventListener('loadeddata', markReady);
      v.removeEventListener('error', markReady);
    };
  }, [videoSrc]);

  // Start playback + the reveal hold ONLY when ready AND allowed (`start`).
  // Returning visitors: `start` is true from the off. First-timers: it flips
  // true when the language splash is dismissed — the video begins from frame 0
  // so nothing is lost while choosing.
  useEffect(() => {
    if (!ready || !start || startedRef.current) return;
    startedRef.current = true;
    const v = videoRef.current;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setExpanded(true);
      return;
    }
    if (v) {
      try {
        v.currentTime = 0;
      } catch {
        /* ignore */
      }
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
    const holdTimer = setTimeout(() => setExpanded(true), HOLD);
    return () => clearTimeout(holdTimer);
  }, [ready, start]);

  return (
    <div className="hero-zoom-wrap" data-bg-context="dark">
      {/* Destination picker — sits behind the video, revealed as it fades out.
          Same markup/styling as before. */}
      <motion.div
        className="destination-picker"
        // Once expanded the picker rises ABOVE the video box (z-index 3) and
        // takes pointer events; the video box itself is pointer-events:none so
        // its faded-but-present layer can never intercept the menu clicks.
        style={{ zIndex: expanded ? 3 : 1, pointerEvents: expanded ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <h2 className="dp-title">{t.pickTitle || I18N.it.home.pickTitle}</h2>
        <FlowingMenu items={menuItems} />
      </motion.div>

      {/* Full-screen video (no zoom) — fills the wrap, sits behind the navbar. */}
      <motion.div
        className="hero-zoom-video-box"
        initial={{ opacity: 1 }}
        animate={{ opacity: expanded ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
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
