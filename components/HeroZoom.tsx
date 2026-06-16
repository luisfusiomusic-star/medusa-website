'use client';

/**
 * Home hero — full-screen video (TIME-DRIVEN). The video fills the viewport
 * from the start (no zoom/expand on either axis).
 *
 * On mount, once the video can play, the MEDUSA loader is dismissed
 * (`medusa:frames-ready`); the video then plays full-screen for a short hold
 * before crossfading out as the destination picker fades in. No scroll
 * listeners; the page scrolls normally as soon as the picker appears.
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

export default function HeroZoom({ nav, lang }: { nav: NavFn; lang: Lang }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [vp, setVp] = useState({ w: 1280, h: 800 });

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

  // Once the video can play: dismiss the loader, hold full-screen, then expand
  // (crossfade to the picker). No size animation — the video never zooms.
  useEffect(() => {
    if (!videoSrc) return;
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;
    let started = false;
    let holdTimer: ReturnType<typeof setTimeout> | undefined = undefined;
    let readyFallback: ReturnType<typeof setTimeout> | undefined = undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

    const begin = () => {
      if (started || cancelled) return;
      started = true;
      clearTimeout(readyFallback);
      // Dismiss the MEDUSA loader (it gates on this event).
      document.dispatchEvent(new CustomEvent('medusa:frames-ready'));
      if (reduce && reduce.matches) {
        // Reduced-motion: jump straight to the picker.
        setExpanded(true);
        return;
      }
      holdTimer = setTimeout(() => {
        if (!cancelled) setExpanded(true);
      }, HOLD);
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
      clearTimeout(holdTimer);
      clearTimeout(readyFallback);
      v.removeEventListener('canplaythrough', begin);
      v.removeEventListener('loadeddata', begin);
      v.removeEventListener('error', begin);
    };
  }, [videoSrc]);

  // Full-screen video — no zoom on either axis.
  const w = vp.w;
  const h = vp.h;
  const radius = 0;

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

      {/* Full-screen video (no zoom). */}
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
