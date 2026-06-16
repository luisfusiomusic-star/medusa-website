'use client';

/**
 * DrinkCard — one full-width "nautical chart" card per cocktail: gold-ruled
 * double frame, kicker + name + price up top, an INGREDIENTI / FLAVOURS two-
 * column body (with a small line-art glass), an optional verbatim variant note,
 * and a large fine-line sea creature as a decorative band at the bottom.
 *
 * Name / ingredients / price / variant notes come verbatim from the locked
 * cocktail data; flavours, glass and creature are decorative metadata.
 */
import { Reveal } from '@/components/primitives';
import { CreatureArt } from '@/components/DrinkArt';
import type { Lang } from '@/lib/constants';
import {
  drinkId,
  parseIngredientLine,
  DRINK_META,
  DRINK_FLAVOURS,
  DRINK_SECTION_LABELS,
  COCKTAILS,
} from '@/lib/cocktails';

export default function DrinkCard({
  index,
  ingredientLine,
  price,
  lang,
  flashed,
}: {
  index: number;
  ingredientLine: string;
  price: string;
  lang: Lang;
  flashed: boolean;
}) {
  const name = COCKTAILS[index].name;
  const meta = DRINK_META[index];
  const flavours = (DRINK_FLAVOURS[lang] || DRINK_FLAVOURS.it)[index] || [];
  const labels = DRINK_SECTION_LABELS[lang] || DRINK_SECTION_LABELS.it;
  const { items, note } = parseIngredientLine(ingredientLine);

  return (
    <Reveal
      as="article"
      id={drinkId(name)}
      delay={Math.min(index, 6) * 0.04}
      className={'drink-card' + (flashed ? ' drink-flash' : '')}
    >
      <div className="drink-card-inner">
        <header className="drink-card-head">
          <p className="drink-card-kicker">{meta.signature ? 'SIGNATURE' : 'COCKTAIL'}</p>
          <div className="drink-card-titlerow">
            <h3 className="drink-card-name">{name}</h3>
            <span className="drink-card-price">{price}</span>
          </div>
        </header>

        <div className="drink-card-cols">
          <div className="drink-card-col">
            <p className="drink-card-collabel">{labels.ingredients}</p>
            <ul className="drink-card-ingredients">
              {items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>

          <div className="drink-card-col drink-card-col-flavours">
            <p className="drink-card-collabel">{labels.flavours}</p>
            <p className="drink-card-flavours">{flavours.join(' · ')}</p>
          </div>
        </div>

        {note && <p className="drink-card-note">{note}</p>}

        <div className="drink-card-creature">
          <CreatureArt creature={meta.creature} />
        </div>
      </div>
    </Reveal>
  );
}
