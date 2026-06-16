'use client';

/**
 * Line-art SVGs for the cocktail "nautical chart" cards — drawn stroke-only
 * (fill:none, stroke:currentColor) so the gold colour and opacity come from
 * CSS. GlassIcon renders the drink's real glass shape; CreatureArt renders one
 * fine-line sea creature per drink (engraving-flavoured marine motif).
 */
import type { ReactElement } from 'react';
import type { GlassType, Creature } from '@/lib/cocktails';

/* ---- Glass icons (small, sit beside the flavours) ---- */
const GLASSES: Record<GlassType, { viewBox: string; el: ReactElement }> = {
  wine: {
    viewBox: '0 0 40 60',
    el: (
      <>
        <path d="M11 6 H29 C29 21 24.5 29 20 29 C15.5 29 11 21 11 6 Z" />
        <line x1="20" y1="29" x2="20" y2="51" />
        <line x1="12" y1="53" x2="28" y2="53" />
      </>
    ),
  },
  balloon: {
    viewBox: '0 0 44 60',
    el: (
      <>
        <path d="M10 15 C10 4 34 4 34 15 C34 27 28 31 22 31 C16 31 10 27 10 15 Z" />
        <line x1="22" y1="31" x2="22" y2="51" />
        <line x1="13" y1="53" x2="31" y2="53" />
      </>
    ),
  },
  highball: {
    viewBox: '0 0 30 60',
    el: (
      <>
        <path d="M8 6 H22 L20.5 54 H9.5 Z" />
        <line x1="8.6" y1="20" x2="21.4" y2="20" />
      </>
    ),
  },
  coupe: {
    viewBox: '0 0 44 56',
    el: (
      <>
        <path d="M6 9 C11 25 33 25 38 9" />
        <line x1="6" y1="9" x2="38" y2="9" />
        <line x1="22" y1="24" x2="22" y2="46" />
        <line x1="13" y1="48" x2="31" y2="48" />
      </>
    ),
  },
  rocks: {
    viewBox: '0 0 36 42',
    el: (
      <>
        <path d="M8 6 H28 L26 36 H10 Z" />
      </>
    ),
  },
};

export function GlassIcon({ type }: { type: GlassType }) {
  const g = GLASSES[type] ?? GLASSES.highball;
  return (
    <svg
      className="drink-glass-icon"
      viewBox={g.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {g.el}
    </svg>
  );
}

/* ---- Sea creatures (large decorative band in the lower part of the card) ---- */
const CREATURES: Record<Creature, { viewBox: string; el: ReactElement }> = {
  fish: {
    viewBox: '0 0 130 64',
    el: (
      <>
        <path d="M14 32 C34 10 78 10 96 32 C78 54 34 54 14 32 Z" />
        <path d="M96 32 L120 17 C114 27 114 37 120 47 Z" />
        <path d="M46 17 C55 25 55 39 46 47" />
        <path d="M52 50 C62 45 74 45 82 50" />
        <circle cx="32" cy="27" r="2.2" />
      </>
    ),
  },
  tropicalfish: {
    viewBox: '0 0 130 70',
    el: (
      <>
        <path d="M20 35 C40 12 80 12 100 35 C80 58 40 58 20 35 Z" />
        <path d="M100 35 L124 20 C119 28 119 42 124 50 Z" />
        <path d="M48 14 C44 26 44 44 48 56" />
        <path d="M64 13 C60 26 60 44 64 57" />
        <path d="M36 28 C34 33 34 37 36 42" />
        <circle cx="33" cy="31" r="2.2" />
      </>
    ),
  },
  seahorse: {
    viewBox: '0 0 78 120',
    el: (
      <>
        <path d="M44 18 C28 22 28 42 40 50 C54 60 50 82 38 92 C30 99 34 109 45 106 C51 104 53 98 50 93" />
        <path d="M44 18 C36 8 48 4 54 9 C58 13 64 14 63 21 C60 25 53 24 50 21" />
        <path d="M42 28 L36 24 M44 38 L38 35 M44 50 L38 49 M42 62 L36 62 M40 74 L34 75" />
        <path d="M40 26 L46 22 M40 16 L45 13" />
        <circle cx="52" cy="16" r="1.8" />
      </>
    ),
  },
  jellyfish: {
    viewBox: '0 0 100 116',
    el: (
      <>
        <path d="M14 48 C14 17 86 17 86 48" />
        <path d="M14 48 C24 58 30 48 40 56 C48 62 52 48 60 56 C68 62 76 48 86 48" />
        <path d="M28 54 C24 72 32 86 26 104" />
        <path d="M42 58 C38 76 46 92 40 110" />
        <path d="M58 58 C54 76 62 92 56 110" />
        <path d="M72 54 C68 72 76 86 70 104" />
        <path d="M50 60 C48 80 52 96 50 112" />
      </>
    ),
  },
  squid: {
    viewBox: '0 0 72 120',
    el: (
      <>
        <path d="M36 8 C24 10 23 32 27 50 L27 64 C27 72 45 72 45 64 L45 50 C49 32 48 10 36 8 Z" />
        <path d="M27 20 L12 12 C18 22 22 28 27 32" />
        <path d="M45 20 L60 12 C54 22 50 28 45 32" />
        <path d="M30 70 C28 86 32 100 29 114" />
        <path d="M36 71 C36 88 36 102 36 116" />
        <path d="M42 70 C44 86 40 100 43 114" />
        <path d="M33 70 C26 84 22 96 16 104" />
        <path d="M39 70 C46 84 50 96 56 104" />
        <circle cx="32" cy="44" r="1.8" />
        <circle cx="40" cy="44" r="1.8" />
      </>
    ),
  },
  crab: {
    viewBox: '0 0 130 80',
    el: (
      <>
        <path d="M40 44 C40 30 90 30 90 44 C90 56 78 62 65 62 C52 62 40 56 40 44 Z" />
        <path d="M52 32 L48 22 M78 32 L82 22" />
        <circle cx="48" cy="20" r="2" />
        <circle cx="82" cy="20" r="2" />
        <path d="M40 42 C26 38 18 44 12 40 M42 50 C28 50 20 58 12 56 M44 56 C32 60 26 68 18 70" />
        <path d="M90 42 C104 38 112 44 118 40 M88 50 C102 50 110 58 118 56 M86 56 C98 60 104 68 112 70" />
        <path d="M40 48 C28 50 22 60 30 64 C36 67 40 60 36 56" />
        <path d="M90 48 C102 50 108 60 100 64 C94 67 90 60 94 56" />
      </>
    ),
  },
  octopus: {
    viewBox: '0 0 116 116',
    el: (
      <>
        <path d="M58 12 C40 12 31 28 35 46 C38 58 78 58 81 46 C85 28 76 12 58 12 Z" />
        <circle cx="49" cy="36" r="2.4" />
        <circle cx="67" cy="36" r="2.4" />
        <path d="M37 50 C26 60 20 76 10 82 C20 80 28 74 34 66" />
        <path d="M44 55 C38 72 30 86 22 100 C32 92 40 80 46 68" />
        <path d="M56 57 C54 76 56 92 52 110 C58 98 60 82 60 66" />
        <path d="M72 55 C78 72 86 86 94 100 C84 92 76 80 70 68" />
        <path d="M79 50 C90 60 96 76 106 82 C96 80 88 74 82 66" />
      </>
    ),
  },
  shell: {
    viewBox: '0 0 100 86',
    el: (
      <>
        <path d="M50 78 C20 78 8 40 16 24 C20 16 30 18 34 26 C37 16 47 14 50 24 C53 14 63 16 66 26 C70 18 80 16 84 24 C92 40 80 78 50 78 Z" />
        <path d="M50 78 L34 30 M50 78 L50 26 M50 78 L66 30 M50 78 L22 38 M50 78 L78 38" />
      </>
    ),
  },
  starfish: {
    viewBox: '0 0 104 104',
    el: (
      <>
        <path d="M52 10 C57 30 62 40 86 42 C64 50 60 58 66 86 C56 70 48 70 38 86 C44 58 40 50 18 42 C42 40 47 30 52 10 Z" />
        <circle cx="52" cy="50" r="3" />
        <path d="M52 28 L52 36 M40 46 L46 49 M64 46 L58 49 M46 62 L49 55 M58 62 L55 55" />
      </>
    ),
  },
  lobster: {
    viewBox: '0 0 130 88',
    el: (
      <>
        <path d="M62 20 C56 20 52 26 52 34 L52 52 C52 60 58 66 65 66 C72 66 78 60 78 52 L78 34 C78 26 74 20 68 20" />
        <path d="M65 66 C63 72 58 78 52 80 C58 80 64 78 65 74 C66 78 72 80 78 80 C72 78 67 72 65 66 Z" />
        <path d="M52 30 H78 M52 40 H78 M52 50 H78" />
        <path d="M58 20 C54 12 50 8 44 6 M70 20 C74 12 78 8 84 6" />
        <path d="M52 34 C38 30 30 22 22 26 C28 30 28 38 36 40 C28 42 26 50 32 52 C40 50 46 42 52 40" />
        <path d="M78 34 C92 30 100 22 108 26 C102 30 102 38 94 40 C102 42 104 50 98 52 C90 50 84 42 78 40" />
      </>
    ),
  },
  seaweed: {
    viewBox: '0 0 84 120',
    el: (
      <>
        <path d="M42 116 C34 96 50 82 42 64 C35 48 49 32 42 8" />
        <path d="M42 92 C50 84 58 86 62 78 M42 70 C34 62 26 64 22 56 M42 50 C50 44 56 46 60 38" />
        <path d="M24 116 C20 100 30 90 26 74 C23 62 31 50 28 38" />
        <path d="M60 116 C64 100 54 90 58 74 C61 62 53 50 56 38" />
      </>
    ),
  },
};

export function CreatureArt({ creature }: { creature: Creature }) {
  const c = CREATURES[creature] ?? CREATURES.fish;
  return (
    <svg
      className="drink-creature-svg"
      viewBox={c.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {c.el}
    </svg>
  );
}
