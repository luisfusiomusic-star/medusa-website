'use client';

/**
 * Navbar — fixed three-zone top bar:
 *   [ MEDUSA logo ]      [ tubelight pill nav ]      [ language switcher ]
 *        left                    center                      right
 * A CSS grid (1fr auto 1fr) keeps the pill perfectly centered regardless of
 * the logo / language widths. The active item is driven by the current page
 * (`page`), so the gold lamp shows/animates to the right item on load and on
 * navigation. Rendered once at the app level (SiteApp) so the lamp persists.
 */
import { Fragment } from 'react';
import { LANGS, type Lang, type NavFn, type PageKey } from '@/lib/constants';
import { I18N } from '@/lib/i18n';
import { NavBar as Tubelight, type TubelightItem } from '@/components/ui/tubelight-navbar';
import {
  UtensilsCrossed,
  Umbrella,
  BookOpen,
  Wine,
  Martini,
  CloudSun,
  MapPin,
  type LucideIcon,
} from 'lucide-react';

export function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  // Colours come from CSS (.lang-btn / .lang-btn.is-active): white-ish when
  // inactive, gold when active — readable on the dark glass pill.
  return (
    <div className="lang-switcher">
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

// Display order of the 7 nav pages + the Lucide icon shown on mobile.
const NAV_ORDER = ['ristorante', 'stabilimento', 'menu', 'vini', 'cocktail', 'meteo', 'contatti'] as const;
const ICONS: Record<(typeof NAV_ORDER)[number], LucideIcon> = {
  ristorante: UtensilsCrossed,
  stabilimento: Umbrella,
  menu: BookOpen,
  vini: Wine,
  cocktail: Martini,
  meteo: CloudSun,
  contatti: MapPin,
};

interface NavbarProps {
  page: PageKey;
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Navbar({ page, nav, lang, setLang }: NavbarProps) {
  const t = I18N[lang];
  const items: TubelightItem[] = NAV_ORDER.map((k) => ({ key: k, label: t.nav[k], icon: ICONS[k] }));

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav className="tubelight-nav" aria-label="Primary">
        {/* LEFT — logo, links home (detached from the pill) */}
        <button className="tubelight-logo" onClick={() => nav('home')} aria-label="Medusa home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo_medusa.png" alt="MEDUSA" />
        </button>

        {/* CENTER — the animated tubelight pill */}
        <div className="tubelight-center">
          <Tubelight items={items} active={page} onSelect={(k) => nav(k as PageKey)} />
        </div>

        {/* RIGHT — language switcher (unchanged behavior) in a matching pill */}
        <div className="tubelight-lang">
          <div className="tubelight-lang-pill">
            <LangSwitcher lang={lang} setLang={setLang} />
          </div>
        </div>
      </nav>
    </>
  );
}
