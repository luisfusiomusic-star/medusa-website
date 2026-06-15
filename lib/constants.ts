/**
 * Site-wide constants — preserved exactly from the original site.
 */

export type Lang = 'it' | 'en' | 'de' | 'fr' | 'es';

export const LANGS: Lang[] = ['it', 'en', 'de', 'fr', 'es'];

/* SPA views — the site is a single URL with state-driven navigation,
   exactly like the original. */
export type PageKey =
  | 'home'
  | 'stabilimento'
  | 'ristorante'
  | 'menu'
  | 'vini'
  | 'cocktail'
  | 'meteo'
  | 'contatti';

export type NavFn = (target: PageKey) => void;

// Hero reel plays the hero3 MP4s directly.
export const HERO_VIDEO_DESKTOP = '/medusa_hero3.mp4';
export const HERO_VIDEO_MOBILE = '/medusa_hero3_mobile.mp4';
export const MOBILE_BREAKPOINT = 768;

export const PHONE = '+390103728113';
export const PHONE_DISPLAY = '+39 010 372 8113';
export const WHATSAPP = '393793753087';

/* Pre-filled WhatsApp message per language. Values are URL-encoded so the
   template can drop them straight into the `?text=` query string.
   IT → Italian message; any other language → English. */
export const WA_PREFILL = {
  it: 'Ciao%20Medusa%20Beach%20Club!%20Vorrei%20avere%20informazioni%20su...',
  en: 'Hello%20Medusa%20Beach%20Club!%20I%27d%20like%20some%20information%20about...',
};

export const waLink = (lang: Lang) =>
  `https://wa.me/${WHATSAPP}?text=${lang === 'it' ? WA_PREFILL.it : WA_PREFILL.en}`;

export const PHOTO_RIST = '/home_ristorante.jpeg';
export const PHOTO_STAB = '/home_stabilimento.jpeg';
export const LANG_KEY = 'medusaLang';

export const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const EASE_SMOOTH = 'cubic-bezier(0.32, 0.72, 0, 1)';

/* Autobi BMW MINI sponsor — logo + links preserved exactly. */
export const SPONSOR_LOGO = '/sponsor_1_bn.png';
export const SPONSOR_LINK_MINI =
  'https://www.biautogroup.com/mini/?_gl=1*1ebmwov*_up*MQ..*_ga*MTMyOTI1NTg3NS4xNzgwMjk5NzMw*_ga_38V11XC7TN*czE3ODAyOTk3MzAkbzEkZzAkdDE3ODAyOTk3MzAkajYwJGwwJGgw';
export const SPONSOR_LINK_SEDE =
  'https://www.biautogroup.com/sedi/concessionario-bmw-mini-genova/';

export const INSTAGRAM_URL = 'https://www.instagram.com/medusagenova';
export const MAPS_URL =
  'https://www.google.com/maps?q=Passeggiata+Anita+Garibaldi+27a,+Genova+Nervi';
export const MAPS_EMBED_URL =
  'https://www.google.com/maps?q=Passeggiata+Anita+Garibaldi+27a,+Genova+Nervi&output=embed';

export const EMAIL_BEACH = 'bagnimedusanervi@gmail.com';
export const EMAIL_CONTACT = 'bagnimedusa.bmr@gmail.com';

export const MENU_PDF = '/medusa_food_25mag.pdf';
export const VINI_PDF = '/medusa_vini_25mag.pdf';
