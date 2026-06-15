'use client';

/**
 * Shared cream-page shell: fixed navbar, optional hero, centered main
 * column, footer.
 */
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Lang, NavFn, PageKey } from '@/lib/constants';

interface PageWrapProps {
  nav: NavFn;
  page: PageKey;
  children?: ReactNode;
  hero?: ReactNode;
  lang: Lang;
  setLang: (l: Lang) => void;
  background?: string;
}

export default function PageWrap({
  nav,
  page,
  children,
  hero,
  lang,
  setLang,
  background = 'var(--cream)',
}: PageWrapProps) {
  return (
    <div style={{ minHeight: '100vh', background }}>
      <Navbar page={page} nav={nav} lang={lang} setLang={setLang} />
      {hero}
      <main id="main" data-bg-context="light" style={{ maxWidth: 1120, margin: '0 auto', padding: '28px 32px 120px' }}>
        {children}
      </main>
      <Footer nav={nav} lang={lang} />
    </div>
  );
}
