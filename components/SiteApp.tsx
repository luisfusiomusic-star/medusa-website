'use client';

/**
 * APP — orchestrates routing, language, and splash. The site is a
 * single-URL SPA with state-driven navigation, exactly like the original:
 * navigating swaps the view and re-keys it for the page-enter fade.
 */
import { useEffect, useState, type ReactNode } from 'react';
import { LANG_KEY, LANGS, type Lang, type PageKey } from '@/lib/constants';
import Loader from '@/components/Loader';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import LanguageSplash from '@/components/LanguageSplash';
import HomePage from '@/components/pages/HomePage';
import StabilimentoPage from '@/components/pages/StabilimentoPage';
import RistorantePage from '@/components/pages/RistorantePage';
import MenuPage from '@/components/pages/MenuPage';
import ViniPage from '@/components/pages/ViniPage';
import CocktailPage from '@/components/pages/CocktailPage';
import MeteoPage from '@/components/pages/MeteoPage';
import ContattiPage from '@/components/pages/ContattiPage';

function readStoredLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v && (LANGS as string[]).includes(v)) return v as Lang;
  } catch {
    /* storage unavailable */
  }
  return null;
}

export default function SiteApp() {
  const [page, setPage] = useState<PageKey>('home');
  const [navKey, setNavKey] = useState(0);
  const [lang, setLang] = useState<Lang>('it');
  const [showSplash, setShowSplash] = useState(false);
  // booted gates splash + persistence until localStorage has been read on
  // the client — the server prerender can't know the visitor's choice.
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const stored = readStoredLang();
    if (stored) setLang(stored);
    else setShowSplash(true);
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!booted) return;
    if (!showSplash) {
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch {
        /* storage unavailable */
      }
    }
    document.documentElement.lang = lang;
  }, [lang, showSplash, booted]);

  const chooseLanguage = (code: Lang) => {
    setLang(code);
    try {
      localStorage.setItem(LANG_KEY, code);
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = code;
    setShowSplash(false);
  };

  /* Body background follows the page theme — otherwise macOS/iOS
     rubber-band overscroll flashes cream above/below the dark pages. */
  useEffect(() => {
    const darkPages: Partial<Record<PageKey, string>> = {
      home: '#082935',
      menu: '#0F2230',
      vini: '#0F2230',
      cocktail: '#082935',
    };
    document.body.style.background = darkPages[page] || 'var(--cream)';
  }, [page]);

  const navigate = (target: PageKey) => {
    if (target === page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setPage(target);
    setNavKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const pages: Record<PageKey, ReactNode> = {
    home: <HomePage nav={navigate} lang={lang} setLang={setLang} />,
    stabilimento: <StabilimentoPage nav={navigate} lang={lang} setLang={setLang} />,
    ristorante: <RistorantePage nav={navigate} lang={lang} setLang={setLang} />,
    menu: <MenuPage nav={navigate} lang={lang} setLang={setLang} />,
    vini: <ViniPage nav={navigate} lang={lang} setLang={setLang} />,
    cocktail: <CocktailPage nav={navigate} lang={lang} setLang={setLang} />,
    meteo: <MeteoPage nav={navigate} lang={lang} setLang={setLang} />,
    contatti: <ContattiPage nav={navigate} lang={lang} setLang={setLang} />,
  };

  return (
    <>
      <Loader />
      <ScrollProgress />
      {/* Persistent navbar (rendered once) so the tubelight lamp animates
          across pages instead of remounting per view. */}
      <Navbar page={page} nav={navigate} lang={lang} setLang={setLang} />
      <div key={navKey} className="page-enter">
        {pages[page]}
      </div>
      <WhatsAppFloat lang={lang} />
      {booted && showSplash && <LanguageSplash onChoose={chooseLanguage} />}
    </>
  );
}
