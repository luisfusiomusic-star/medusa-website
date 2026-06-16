'use client';

/**
 * Brigata (Ristorante) — gold kicker + Italiana heading above a curved,
 * draggable WebGL gallery (CircularGallery) of the chef photos. No box: the
 * heading and the card chain sit free on the cream page (transparent canvas),
 * so the title is teal-deep and the labels match for contrast on cream.
 *
 * Chef data is fixed (do not edit names). Add a brigade member by appending to
 * `brigade` — the ring re-spaces automatically. `brigade` is module-level so its
 * reference stays stable across renders (the gallery re-instantiates if it
 * changes).
 */
import CircularGallery from '@/components/ui/CircularGallery';
import type { Lang } from '@/lib/constants';

/* text = name, subtitle = "age · role" (rendered as a second gold line). */
const brigade = [
  { image: '/montoya.jpeg', text: 'Montoya', subtitle: '45 · Chef' },
  { image: '/roma.jpeg', text: 'Roma', subtitle: '29 · Sous Chef' },
];

/* Gold kicker, per language (added locally; the locked i18n stays untouched). */
const LABEL: Record<Lang, string> = {
  it: 'CHI CUCINA',
  en: 'THE KITCHEN',
  de: 'DIE KÜCHE',
  fr: 'LA CUISINE',
  es: 'QUIÉN COCINA',
};

export default function BrigataGallery({ title, lang }: { title: string; lang: Lang }) {
  return (
    <section className="brigata-section" data-bg-context="light">
      <div className="brigata-head">
        <p className="brigata-label">{LABEL[lang] || LABEL.it}</p>
        <h2 className="brigata-heading">{title}</h2>
      </div>

      <div className="brigata-gallery-wrap">
        <CircularGallery
          items={brigade}
          bend={2}
          textColor="#0F2230"
          subtitleColor="#b08f4f"
          borderRadius={0.05}
          scrollEase={0.05}
          scrollSpeed={2}
          font="600 32px Italiana"
          subtitleFont="500 16px Jost"
        />
      </div>
    </section>
  );
}
