/**
 * One-off migration script: extracts the LOCKED content blocks (I18N, MENU_DATA,
 * ALLERGENS_TEXT, VINI_DATA) byte-for-byte from the original static site and
 * writes them into typed TypeScript modules under /lib.
 *
 * Content is copied verbatim — no rephrasing, no reformatting of strings.
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC = '/Users/lufusio/Desktop/Fusio/websites/medusa-deploy-perfect/index.html';
const OUT = '/Users/lufusio/Desktop/Fusio/websites/medusa_react/lib';

const lines = fs.readFileSync(SRC, 'utf8').split('\n');

function findLine(exact, from = 0) {
  const i = lines.findIndex((l, idx) => idx >= from && l === exact);
  if (i === -1) throw new Error(`Marker not found: ${JSON.stringify(exact)}`);
  return i;
}

function extractBlock(startMarker, endMarker) {
  const start = findLine(startMarker);
  const end = findLine(endMarker, start + 1);
  return lines.slice(start, end + 1);
}

// De-indent by the 6 spaces of the original IIFE scope.
const dedent = (ls) => ls.map((l) => (l.startsWith('      ') ? l.slice(6) : l)).join('\n');

/* ---- I18N ---- */
const i18nBlock = extractBlock('      const I18N = {', '      };');
i18nBlock[0] = '      export const I18N: Record<Lang, SiteDict> = {';

/* ---- MENU_DATA ---- */
const menuStart = findLine('      const MENU_DATA = {');
const menuEnd = findLine('      };', menuStart + 1);
const menuBlock = lines.slice(menuStart, menuEnd + 1);
menuBlock[0] = '      export const MENU_DATA: Record<Lang, MenuSection[]> = {';

/* ---- ALLERGENS_TEXT (single line) ---- */
const allergensIdx = lines.findIndex((l) => l.trimStart().startsWith('const ALLERGENS_TEXT = '));
if (allergensIdx === -1) throw new Error('ALLERGENS_TEXT not found');
const allergensLine = lines[allergensIdx].replace('const ALLERGENS_TEXT = ', 'export const ALLERGENS_TEXT = ');

/* ---- VINI_DATA ---- */
const viniStart = findLine('      const VINI_DATA = [');
const viniEnd = findLine('      ];', viniStart + 1);
const viniBlock = lines.slice(viniStart, viniEnd + 1);
viniBlock[0] = '      export const VINI_DATA: WineSection[] = [';

/* ================= write lib/i18n.ts ================= */
const i18nHeader = `/**
 * i18n dictionaries — extracted VERBATIM from the original
 * medusa-deploy-perfect/index.html. Content is LOCKED: do not rephrase.
 * 4 public languages (IT/EN/DE/FR) + ES kept as in the original source.
 */
import type { Lang } from './constants';
import type { WineSectionKey } from './menu-data';

export interface SiteDict {
  nav: { stabilimento: string; ristorante: string; menu: string; vini: string; meteo: string; contatti: string };
  splash: { picker: string };
  home: {
    scrollHint: string;
    pickKicker: string;
    pickTitle: string;
    ristorante: string;
    stabilimento: string;
    ristoranteSub: string;
    stabilimentoSub: string;
    chanelQuote: string;
    scrollKicker: string;
    scrollTitle: string;
    scrollHeadline: string;
  };
  stab: {
    kicker: string; title: string; heroSub: string;
    welcomeKicker: string; welcomeTitle: string; welcomeText: string;
    services: [string, string][];
    photos: string[];
    ctaKicker: string; ctaTitle: string; ctaText: string; ctaBtn: string;
  };
  rist: {
    kicker: string; title: string; heroSub: string;
    philKicker: string; philTitle: string; philText: string;
    tastingKicker: string; tastingTitle: string; tastingText: string;
    tastingCourse5: string; tastingCourse8: string;
    photos: string[];
    btnMenu: string; btnVini: string; btnBook: string;
    teamKicker: string; teamTitle: string;
  };
  menu: { kicker: string; title: string; intro?: string; quote: string; quoteAuthor: string; footer: string };
  vini: { kicker: string; title: string; subtitle: string; sections: Record<WineSectionKey, string> };
  meteo: {
    kicker: string; title: string; subtitle: string;
    loading: string; errorText: string; retry: string; nowKicker: string;
    feelsLike: string; wind: string; humidity: string;
    next6: string; tomorrow: string; footer: string;
    days: string[];
    conditions: {
      clear: string; partlyCloudy: string; fog: string; drizzle: string;
      rain: string; snow: string; showers: string; snowShowers: string; thunder: string;
    };
    moods: {
      beach: string; terrace: string; sunset: string; intimate: string;
      indoor: string; snow: string; sea: string;
    };
  };
  contatti: { kicker: string; title: string; labels: string[]; values: string[]; cta: string };
}

`;
fs.writeFileSync(path.join(OUT, 'i18n.ts'), i18nHeader + dedent(i18nBlock) + '\n');

/* ================= write lib/menu-data.ts ================= */
const menuHeader = `/**
 * Food menu + wine list — extracted VERBATIM from the original
 * medusa-deploy-perfect/index.html. Content is LOCKED: copy exactly,
 * do not rephrase. (✦ marks best sellers.)
 */
import type { Lang } from './constants';

export interface MenuSection {
  title: string;
  subtitle?: string;
  items: [string, string][];
}

export type WineSectionKey = 'charmat' | 'metodo' | 'champagne' | 'rosati' | 'bianchi' | 'rossi';

export interface WineSection {
  key: WineSectionKey;
  items: [string, string][];
}

`;
const menuParts = [
  menuHeader,
  dedent(menuBlock),
  '',
  '// Allergen disclosure — regulatory text, kept in Italian (mirrors the printed menu).',
  dedent([allergensLine]),
  '',
  '/* Wine list (section titles translate via i18n vini.sections;',
  '   wine names + prices are kept as the printed source) */',
  dedent(viniBlock),
  '',
];
fs.writeFileSync(path.join(OUT, 'menu-data.ts'), menuParts.join('\n'));

/* sanity check sentinels — fail loudly if anything went missing */
const i18nOut = fs.readFileSync(path.join(OUT, 'i18n.ts'), 'utf8');
const menuOut = fs.readFileSync(path.join(OUT, 'menu-data.ts'), 'utf8');
const checks = [
  [i18nOut, 'Il buon gusto nel vestire è qualcosa di innato'],
  [i18nOut, 'RÉSERVEZ VOTRE PLACE'],
  [i18nOut, 'DAS MEER AUF DEM TELLER'],
  [i18nOut, 'bagnimedusanervi@gmail.com'],
  [i18nOut, 'Passeggiata Anita Garibaldi, 27/A'],
  [menuOut, '✦ Tiradito di ombrina con estratto di rose'],
  [menuOut, 'Champagne Dom Pérignon Brut'],
  [menuOut, 'Costata di Choco Beef (peso circa 1 kg)'],
  [menuOut, 'Allergeni: Glutine (1)'],
  [menuOut, 'Le Volte IGT Tenuta Ornellaia'],
];
for (const [haystack, needle] of checks) {
  if (!haystack.includes(needle)) throw new Error(`Sentinel missing: ${needle}`);
}
console.log('OK — lib/i18n.ts and lib/menu-data.ts written with verbatim content.');
console.log('i18n.ts lines:', i18nOut.split('\n').length, '| menu-data.ts lines:', menuOut.split('\n').length);
