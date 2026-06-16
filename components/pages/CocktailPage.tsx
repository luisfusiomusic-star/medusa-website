'use client';

/**
 * COCKTAIL / DRINK LIST — the rotating cocktail orbit sits at the top; below it
 * a vertical stack of full-width "nautical chart" drink cards (one per
 * cocktail). Clicking a glass in the orbit smooth-scrolls to that drink's card
 * and briefly flashes it (shared ids via drinkId()).
 */
import { useEffect, useRef, useState } from 'react';
import Footer from '@/components/Footer';
import CocktailOrbit from '@/components/CocktailOrbit';
import DrinkCard from '@/components/DrinkCard';
import { Reveal } from '@/components/primitives';
import type { Lang, NavFn } from '@/lib/constants';
import { COCKTAILS, COCKTAIL_COPY, COCKTAIL_INGREDIENTS, drinkId } from '@/lib/cocktails';

export default function CocktailPage({
  nav,
  lang,
}: {
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const c = COCKTAIL_COPY[lang] || COCKTAIL_COPY.it;
  const ingredients = COCKTAIL_INGREDIENTS[lang] || COCKTAIL_INGREDIENTS.it;

  // Click a glass in the orbit → smooth-scroll to its card, then flash it.
  // The flash is delayed until the scroll has roughly landed (otherwise the
  // 1.2s animation is over before the card is even on screen).
  const [flashed, setFlashed] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);
  const handleDrinkClick = (name: string) => {
    document.getElementById(drinkId(name))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    clearTimers();
    // Reset first so clicking the same drink again restarts the animation.
    setFlashed(null);
    timers.current.push(setTimeout(() => setFlashed(name), 650));
    timers.current.push(setTimeout(() => setFlashed(null), 650 + 1400));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#082935', color: 'white' }}>
      <main id="main" data-bg-context="dark" className="cocktail-main">
        {/* Header */}
        <Reveal>
          <div className="cocktail-head">
            <p className="cocktail-kicker">{c.kicker}</p>
            <h1 className="cocktail-title">{c.title}</h1>
            <p className="cocktail-subtitle">
              {c.subtitle} <span className="cocktail-price">· {c.price}</span>
            </p>
          </div>
        </Reveal>

        {/* Orbit (unchanged) */}
        <div className="cocktail-orbit-wrap">
          <CocktailOrbit onDrinkClick={handleDrinkClick} />
        </div>

        {/* Drink cards */}
        <div className="drink-cards">
          {COCKTAILS.map((drink, i) => (
            <DrinkCard
              key={drink.name}
              index={i}
              ingredientLine={ingredients[i]}
              price={c.price}
              lang={lang}
              flashed={flashed === drink.name}
            />
          ))}
        </div>

        {/* Premium note */}
        <Reveal>
          <div className="cocktail-premium">
            <p className="cocktail-premium-label">{c.premiumLabel}</p>
            <p className="cocktail-premium-note">
              {c.premiumNote} <span className="cocktail-price">{c.premiumPrice}</span>
            </p>
          </div>
        </Reveal>
      </main>
      <Footer nav={nav} lang={lang} dark />
    </div>
  );
}
