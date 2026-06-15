'use client';

/**
 * HOME — auto-zoom video hero that expands on a timer and crossfades into
 * the destination picker. Nothing renders below the hero.
 */
import Navbar from '@/components/Navbar';
import HeroZoom from '@/components/HeroZoom';
import type { Lang, NavFn } from '@/lib/constants';

export default function HomePage({
  nav,
  lang,
  setLang,
}: {
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div style={{ background: '#082935', position: 'relative' }}>
      <Navbar page="home" nav={nav} lang={lang} setLang={setLang} />
      <HeroZoom nav={nav} lang={lang} />
    </div>
  );
}
