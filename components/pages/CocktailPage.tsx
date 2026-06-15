'use client';

/**
 * COCKTAIL / DRINK LIST — split layout: the drink list on the left, the
 * orbiting cocktail glasses on the right (stacked on mobile, orbit on top).
 */
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CocktailOrbit from '@/components/CocktailOrbit';
import { Reveal } from '@/components/primitives';
import type { Lang, NavFn } from '@/lib/constants';
import { COCKTAILS, COCKTAIL_COPY, COCKTAIL_INGREDIENTS } from '@/lib/cocktails';

export default function CocktailPage({
  nav,
  lang,
  setLang,
}: {
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const c = COCKTAIL_COPY[lang] || COCKTAIL_COPY.it;
  const ingredients = COCKTAIL_INGREDIENTS[lang] || COCKTAIL_INGREDIENTS.it;

  return (
    <div style={{ minHeight: '100vh', background: '#082935', color: 'white' }}>
      <Navbar page="cocktail" nav={nav} lang={lang} setLang={setLang} />
      <main id="main" data-bg-context="dark" className="cocktail-main">
        <section className="cocktail-split">
          {/* LEFT — drink list */}
          <div className="cocktail-left">
            <Reveal>
              <p className="cocktail-kicker">{c.kicker}</p>
              <h1 className="cocktail-title">{c.title}</h1>
              <p className="cocktail-subtitle">
                {c.subtitle} <span className="cocktail-price">· {c.price}</span>
              </p>
            </Reveal>

            <ul className="cocktail-list">
              {COCKTAILS.map((drink, i) => (
                <Reveal as="li" key={drink.name} delay={Math.min(i, 8) * 0.04} className="cocktail-list-item">
                  <span className="cocktail-name">{drink.name}</span>
                  <span className="cocktail-ingredients">{ingredients[i]}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal>
              <div className="cocktail-premium">
                <p className="cocktail-premium-label">{c.premiumLabel}</p>
                <p className="cocktail-premium-note">
                  {c.premiumNote} <span className="cocktail-price">{c.premiumPrice}</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — orbit */}
          <div className="cocktail-right">
            <CocktailOrbit />
          </div>
        </section>
      </main>
      <Footer nav={nav} lang={lang} dark />
    </div>
  );
}
