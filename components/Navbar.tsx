'use client';

/**
 * Navbar — adaptive glass pills + language switcher.
 * Theme detection is instant via document.elementFromPoint(): on every
 * scroll/resize we sample the element sitting just below the navbar
 * (centre column, navH + 10px), walk up to find the nearest ancestor with
 * data-bg-context, and update nav.dataset.bg accordingly. Zero perceptible
 * lag because the swap fires the same frame as the scroll event.
 */
import { useEffect, useRef, useState, Fragment } from 'react';
import { useScrollY } from '@/lib/hooks';
import { EASE_SMOOTH, LANGS, type Lang, type NavFn, type PageKey } from '@/lib/constants';
import { I18N } from '@/lib/i18n';

export function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  // Colours are driven by CSS (.lang-btn / .lang-btn.is-active) so the nav
  // theme observer can adapt them to dark/light backgrounds.
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        letterSpacing: '0.14em',
        fontWeight: 400,
      }}
    >
      {LANGS.map((code, idx) => (
        <Fragment key={code}>
          {idx > 0 && <span className="lang-sep">·</span>}
          <button
            onClick={() => setLang(code)}
            aria-label={'language ' + code}
            className={'lang-btn' + (lang === code ? ' is-active' : '')}
          >
            {code.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  );
}

interface NavbarProps {
  page: PageKey;
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Navbar({ page, nav, lang, setLang }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const sy = useScrollY();
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    el.dataset.bg = 'dark';
    let pending = false;
    const detect = () => {
      pending = false;
      const navH = el.offsetHeight || 64;
      const x = Math.max(1, window.innerWidth / 2);
      const y = navH + 10;
      const hit = document.elementFromPoint(x, y);
      if (!hit) return;
      // Walk up to find the nearest data-bg-context ancestor.
      let ctx: string | null = null;
      for (let cur: Element | null = hit; cur && cur !== document.body; cur = cur.parentElement) {
        const c = (cur as HTMLElement).dataset && (cur as HTMLElement).dataset.bgContext;
        if (c === 'light' || c === 'dark') {
          ctx = c;
          break;
        }
      }
      const newBg = ctx || 'dark';
      if (el.dataset.bg !== newBg) el.dataset.bg = newBg;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(detect);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Run once after mount so first paint reflects the current section.
    detect();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [page]);

  const t = I18N[lang];
  const items: [PageKey, string][] = [
    ['ristorante', t.nav.ristorante],
    ['stabilimento', t.nav.stabilimento],
    ['menu', t.nav.menu],
    ['vini', t.nav.vini],
    ['cocktail', t.nav.cocktail],
    ['meteo', t.nav.meteo],
    ['contatti', t.nav.contatti],
  ];
  // Visible-from-frame-zero glass pills: nav strip itself has no opaque
  // background — each pill carries its own glass/blur, so the navbar is
  // always visible & legible without a solid bar behind it.
  const v = Math.min(sy / 60, 1);
  const scrolled = sy > 80;
  const padY = Math.max(12, 22 - v * 8);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav
        ref={navRef}
        className="nav-padded"
        data-bg="dark"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          /* 1fr auto 1fr grid → middle column is anchored to viewport
             center regardless of how wide the logo or right group are.
             Mobile reverts to flex via the `.nav-padded` media-query
             override (see CSS). */
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: `${padY}px 40px`,
          background: 'transparent',
          transition: `padding 0.6s ${EASE_SMOOTH}`,
        }}
      >
        <button
          onClick={() => nav('home')}
          aria-label="Medusa home"
          style={{
            padding: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifySelf: 'start',
            transition: `transform 0.6s ${EASE_SMOOTH}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_medusa.png"
            alt="MEDUSA"
            style={{ height: 22 - v * 2, width: 'auto', display: 'block', transition: `height 0.6s ${EASE_SMOOTH}` }}
          />
        </button>
        {/* Pill group — sits in grid column 2 (auto-width), viewport-centered. */}
        <div
          className="desktop-nav"
          data-scrolled={scrolled ? 'true' : 'false'}
          style={{ display: 'flex', gap: 8, alignItems: 'center', justifySelf: 'center' }}
        >
          {items.map(([k, label]) => (
            <button key={k} onClick={() => nav(k)} className="nav-pill" data-active={page === k ? 'true' : 'false'}>
              {label}
            </button>
          ))}
        </div>
        {/* Right side: language switcher wrapped in a static glass pill. */}
        <div
          className="desktop-nav-right"
          data-scrolled={scrolled ? 'true' : 'false'}
          style={{ display: 'flex', alignItems: 'center', justifySelf: 'end' }}
        >
          <div className="nav-pill-group">
            <LangSwitcher lang={lang} setLang={setLang} />
          </div>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="menu"
          aria-expanded={open}
          style={{
            display: 'none',
            color: 'var(--gold)',
            fontSize: 22,
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>
      <div
        style={{
          /* 76px = mobile nav height (16px×2 .nav-padded padding + 44px hamburger) */
          position: 'fixed',
          top: 76,
          left: 0,
          right: 0,
          zIndex: 99,
          background: open ? 'rgba(15, 34, 48, 0.97)' : 'transparent',
          backdropFilter: open ? 'blur(18px) saturate(140%)' : 'none',
          WebkitBackdropFilter: open ? 'blur(18px) saturate(140%)' : 'none',
          padding: open ? '24px 28px 30px' : '0 28px',
          borderBottom: open ? '1px solid rgba(201,166,99,0.2)' : 'none',
          maxHeight: open ? 500 : 0,
          overflow: 'hidden',
          pointerEvents: open ? 'auto' : 'none',
          transition: `max-height 0.55s ${EASE_SMOOTH}, padding 0.55s ${EASE_SMOOTH}, background 0.3s ${EASE_SMOOTH}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {items.map(([k, label], i) => (
          <button
            key={k}
            onClick={() => {
              nav(k);
              setOpen(false);
            }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: page === k ? 'var(--gold)' : 'rgba(255,255,255,0.88)',
              textAlign: 'left',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(-6px)',
              transition: `opacity 0.5s ${EASE_SMOOTH} ${i * 0.04}s, transform 0.5s ${EASE_SMOOTH} ${i * 0.04}s`,
            }}
          >
            {label}
          </button>
        ))}
        <div style={{ height: 1, background: 'rgba(201,166,99,0.18)', margin: '4px 0' }} />
        <div style={{ opacity: open ? 1 : 0, transition: `opacity 0.5s ${EASE_SMOOTH} 0.2s` }}>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>
    </>
  );
}
