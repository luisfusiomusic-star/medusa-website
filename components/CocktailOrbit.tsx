'use client';

/**
 * CocktailOrbit — cocktail glasses orbiting the Medusa logo in three dotted
 * rings (adapted from the FeatureSection orbit pattern, Medusa palette).
 *
 * Each ring is a `.orbit-spinner` that rotates; every glass on it counter-
 * rotates by the same duration so it stays upright. Glass positions are set
 * with a STATIC transform (not animation-delay), so under
 * prefers-reduced-motion — where the global stylesheet freezes animations —
 * the glasses still sit distributed and upright rather than collapsing.
 *
 * Each glass shows its real circular cocktail photo (the photos already carry
 * the #082935 background, so they blend into the orbit). Hovering a glass
 * scales it up and reveals its name as a small gold tooltip below.
 */
import { COCKTAILS, type OrbitCocktail } from '@/lib/cocktails';

interface OrbitConfig {
  r: number; // orbit radius (px, in the 480px design stage)
  dur: number; // seconds per revolution
  reverse: boolean; // spin direction
  items: OrbitCocktail[];
}

// 3 + 4 + 4 = 11 glasses across the three rings.
const ORBITS: OrbitConfig[] = [
  { r: 96, dur: 30, reverse: false, items: COCKTAILS.slice(0, 3) },
  { r: 148, dur: 40, reverse: true, items: COCKTAILS.slice(3, 7) },
  { r: 200, dur: 52, reverse: false, items: COCKTAILS.slice(7, 11) },
];

function GlassMedia({ name, img, onClick }: OrbitCocktail & { onClick: (name: string) => void }) {
  return (
    <button type="button" className="orbit-glass-media" onClick={() => onClick(name)} aria-label={name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt="" className="orbit-glass-img" loading="lazy" />
      <span className="orbit-glass-tooltip">{name}</span>
    </button>
  );
}

export default function CocktailOrbit({ onDrinkClick }: { onDrinkClick: (name: string) => void }) {
  return (
    <div className="cocktail-orbit">
      <div className="cocktail-orbit-stage">
        <div className="orbit-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo_medusa.png" alt="Medusa" />
        </div>
        {ORBITS.map((o, oi) => {
          const d = o.r * 2;
          const spin = o.reverse ? 'cocktail-orbit-spin-rev' : 'cocktail-orbit-spin';
          const counter = o.reverse ? 'cocktail-orbit-spin' : 'cocktail-orbit-spin-rev';
          return (
            <div key={oi} className="orbit" style={{ width: d, height: d }}>
              <div className="orbit-ring" style={{ animationName: spin, animationDuration: `${o.dur}s` }} />
              <div className="orbit-spinner" style={{ animationName: spin, animationDuration: `${o.dur}s` }}>
                {o.items.map((c, i) => {
                  const base = (360 / o.items.length) * i;
                  return (
                    <div
                      key={c.name}
                      className="orbit-glass"
                      style={{ transform: `rotate(${base}deg) translateY(${-o.r}px) rotate(${-base}deg)` }}
                    >
                      <div
                        className="orbit-glass-spin"
                        style={{ animationName: counter, animationDuration: `${o.dur}s` }}
                      >
                        <GlassMedia name={c.name} img={c.img} onClick={onDrinkClick} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
