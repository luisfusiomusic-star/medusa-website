/**
 * Cocktail / Drink List data.
 *
 * - COCKTAILS: the 11 drinks for the orbit (name + image path). Photos live
 *   under /public/drinks/ (circular crops on the #082935 background).
 * - COCKTAIL_INGREDIENTS: the left-side list, translated per language. Aligned
 *   by index with COCKTAILS. Cocktail names and spirit/proper names are kept
 *   unchanged across languages (only the descriptive words are translated).
 * - COCKTAIL_COPY: page strings (kicker / heading / subtitle / premium note).
 */
import type { Lang } from './constants';

export interface OrbitCocktail {
  name: string;
  img: string;
}

/** Stable DOM id for a drink's list entry — shared by the orbit (scroll
 *  target) and the list. e.g. "Spritz St. Germain" → "drink-spritz-st-germain". */
export const drinkId = (name: string): string =>
  'drink-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const COCKTAILS: OrbitCocktail[] = [
  { name: 'Spritz', img: '/drinks/spritz.jpeg' },
  // Photo file is "hugo.jpeg" — a Hugo is the St-Germain / elderflower spritz.
  { name: 'Spritz St. Germain', img: '/drinks/hugo.jpeg' },
  { name: 'Gin Tonic', img: '/drinks/gintonic.jpeg' },
  { name: 'Gin Fizz', img: '/drinks/ginfizz.jpeg' },
  { name: 'Moscow Mule', img: '/drinks/moscow.jpeg' },
  { name: 'Margarita', img: '/drinks/margarita.jpeg' },
  { name: 'Bloody Mary', img: '/drinks/bloodymary.jpeg' },
  { name: 'Mojito', img: '/drinks/mojito.jpeg' },
  { name: 'Caipirinha', img: '/drinks/caipirinha.jpeg' },
  { name: 'Paloma', img: '/drinks/paloma.jpeg' },
  { name: 'Negroni', img: '/drinks/negroni.jpeg' },
];

/* Ingredient lines, aligned by index with COCKTAILS. IT is the source text
   (verbatim); the others translate only the descriptive words. */
export const COCKTAIL_INGREDIENTS: Record<Lang, string[]> = {
  it: [
    "Aperol o Campari, prosecco, soda, scorza d'arancia",
    'St-Germain, prosecco, menta fresca, lime',
    'gin, acqua tonica servita a parte',
    'gin, limone fresco, zucchero, soda',
    'vodka, lime, ginger beer, menta (anche London, Jamaican o Mexican)',
    'tequila, triple sec, lime, bordatura di sale (anche Mezcal o Spicy)',
    'vodka, succo di pomodoro, limone, spezie',
    'rum, menta fresca, lime, zucchero di canna, soda',
    'cachaça, lime, zucchero di canna (anche Caipiroska, Caipirissima o Caipirita)',
    'tequila, pompelmo, lime',
    'gin, Campari, vermouth rosso (anche Sbagliato, Americano, Negroski o Milano-Torino)',
  ],
  en: [
    'Aperol or Campari, prosecco, soda, orange peel',
    'St-Germain, prosecco, fresh mint, lime',
    'gin, tonic water served separately',
    'gin, fresh lemon, sugar, soda',
    'vodka, lime, ginger beer, mint (also London, Jamaican or Mexican)',
    'tequila, triple sec, lime, salt rim (also Mezcal or Spicy)',
    'vodka, tomato juice, lemon, spices',
    'rum, fresh mint, lime, cane sugar, soda',
    'cachaça, lime, cane sugar (also Caipiroska, Caipirissima or Caipirita)',
    'tequila, grapefruit, lime',
    'gin, Campari, red vermouth (also Sbagliato, Americano, Negroski or Milano-Torino)',
  ],
  de: [
    'Aperol oder Campari, Prosecco, Soda, Orangenschale',
    'St-Germain, Prosecco, frische Minze, Limette',
    'Gin, Tonic Water separat serviert',
    'Gin, frische Zitrone, Zucker, Soda',
    'Wodka, Limette, Ginger Beer, Minze (auch London, Jamaican oder Mexican)',
    'Tequila, Triple Sec, Limette, Salzrand (auch Mezcal oder Spicy)',
    'Wodka, Tomatensaft, Zitrone, Gewürze',
    'Rum, frische Minze, Limette, Rohrzucker, Soda',
    'Cachaça, Limette, Rohrzucker (auch Caipiroska, Caipirissima oder Caipirita)',
    'Tequila, Grapefruit, Limette',
    'Gin, Campari, roter Wermut (auch Sbagliato, Americano, Negroski oder Milano-Torino)',
  ],
  fr: [
    "Aperol ou Campari, prosecco, soda, zeste d'orange",
    'St-Germain, prosecco, menthe fraîche, citron vert',
    'gin, eau tonique servie à part',
    'gin, citron frais, sucre, soda',
    'vodka, citron vert, ginger beer, menthe (aussi London, Jamaican ou Mexican)',
    'tequila, triple sec, citron vert, bordure de sel (aussi Mezcal ou Spicy)',
    'vodka, jus de tomate, citron, épices',
    'rhum, menthe fraîche, citron vert, sucre de canne, soda',
    'cachaça, citron vert, sucre de canne (aussi Caipiroska, Caipirissima ou Caipirita)',
    'tequila, pamplemousse, citron vert',
    'gin, Campari, vermouth rouge (aussi Sbagliato, Americano, Negroski ou Milano-Torino)',
  ],
  es: [
    'Aperol o Campari, prosecco, soda, piel de naranja',
    'St-Germain, prosecco, menta fresca, lima',
    'gin, agua tónica servida aparte',
    'gin, limón fresco, azúcar, soda',
    'vodka, lima, ginger beer, menta (también London, Jamaican o Mexican)',
    'tequila, triple sec, lima, borde de sal (también Mezcal o Spicy)',
    'vodka, zumo de tomate, limón, especias',
    'rum, menta fresca, lima, azúcar de caña, soda',
    'cachaça, lima, azúcar de caña (también Caipiroska, Caipirissima o Caipirita)',
    'tequila, pomelo, lima',
    'gin, Campari, vermut rojo (también Sbagliato, Americano, Negroski o Milano-Torino)',
  ],
};

export interface CocktailCopy {
  kicker: string;
  title: string;
  subtitle: string; // prefix before the price
  price: string; // standard price chip, e.g. "15 €"
  premiumLabel: string;
  premiumNote: string; // text before the trailing premium price
  premiumPrice: string; // e.g. "20 €"
}

/* ============================================================================
 * NAUTICAL-CHART CARD METADATA (decorative — not part of the locked data).
 * All arrays below are aligned by index with COCKTAILS.
 * ========================================================================== */

export type GlassType = 'wine' | 'balloon' | 'highball' | 'coupe' | 'rocks';
export type Creature =
  | 'seahorse'
  | 'jellyfish'
  | 'squid'
  | 'fish'
  | 'crab'
  | 'shell'
  | 'octopus'
  | 'seaweed'
  | 'starfish'
  | 'tropicalfish'
  | 'lobster';

export interface DrinkMeta {
  glass: GlassType;
  creature: Creature;
  signature: boolean; // true → "SIGNATURE" kicker, else "COCKTAIL"
}

/* Glass matches the real serve; one distinct sea creature per drink. */
export const DRINK_META: DrinkMeta[] = [
  { glass: 'wine', creature: 'seahorse', signature: false }, // Spritz
  { glass: 'wine', creature: 'jellyfish', signature: true }, // Spritz St. Germain
  { glass: 'balloon', creature: 'squid', signature: false }, // Gin Tonic
  { glass: 'highball', creature: 'fish', signature: false }, // Gin Fizz
  { glass: 'highball', creature: 'crab', signature: false }, // Moscow Mule
  { glass: 'coupe', creature: 'shell', signature: false }, // Margarita
  { glass: 'highball', creature: 'octopus', signature: false }, // Bloody Mary
  { glass: 'highball', creature: 'seaweed', signature: false }, // Mojito
  { glass: 'rocks', creature: 'starfish', signature: false }, // Caipirinha
  { glass: 'highball', creature: 'tropicalfish', signature: false }, // Paloma
  { glass: 'rocks', creature: 'lobster', signature: true }, // Negroni
];

/* 2–3 taste descriptors per drink, translated per language, aligned by index. */
export const DRINK_FLAVOURS: Record<Lang, string[][]> = {
  it: [
    ['Amaro', 'Agrumi', 'Frizzante'],
    ['Floreale', 'Fresco', 'Leggero'],
    ['Secco', 'Botanico', 'Croccante'],
    ['Agrumi', 'Morbido', 'Spumoso'],
    ['Speziato', 'Vivace', 'Rinfrescante'],
    ['Agrumi', 'Salato', 'Deciso'],
    ['Sapido', 'Speziato', 'Intenso'],
    ['Mentato', 'Fresco', 'Dolce'],
    ['Agrumi', 'Rustico', 'Forte'],
    ['Pompelmo', 'Aspro', 'Leggero'],
    ['Amaro', 'Erbaceo', 'Forte'],
  ],
  en: [
    ['Bitter', 'Citrus', 'Sparkling'],
    ['Floral', 'Fresh', 'Light'],
    ['Dry', 'Botanical', 'Crisp'],
    ['Citrus', 'Smooth', 'Foamy'],
    ['Spicy', 'Zesty', 'Refreshing'],
    ['Citrus', 'Salty', 'Sharp'],
    ['Savoury', 'Spicy', 'Bold'],
    ['Minty', 'Fresh', 'Sweet'],
    ['Citrus', 'Rustic', 'Strong'],
    ['Grapefruit', 'Tart', 'Light'],
    ['Bitter', 'Herbal', 'Strong'],
  ],
  de: [
    ['Bitter', 'Zitrus', 'Spritzig'],
    ['Blumig', 'Frisch', 'Leicht'],
    ['Trocken', 'Botanisch', 'Knackig'],
    ['Zitrus', 'Weich', 'Schaumig'],
    ['Würzig', 'Spritzig', 'Erfrischend'],
    ['Zitrus', 'Salzig', 'Scharf'],
    ['Herzhaft', 'Würzig', 'Kräftig'],
    ['Minzig', 'Frisch', 'Süß'],
    ['Zitrus', 'Rustikal', 'Stark'],
    ['Grapefruit', 'Herb', 'Leicht'],
    ['Bitter', 'Kräuterig', 'Stark'],
  ],
  fr: [
    ['Amer', 'Agrumes', 'Pétillant'],
    ['Floral', 'Frais', 'Léger'],
    ['Sec', 'Botanique', 'Croquant'],
    ['Agrumes', 'Doux', 'Mousseux'],
    ['Épicé', 'Acidulé', 'Rafraîchissant'],
    ['Agrumes', 'Salé', 'Vif'],
    ['Savoureux', 'Épicé', 'Corsé'],
    ['Mentholé', 'Frais', 'Sucré'],
    ['Agrumes', 'Rustique', 'Fort'],
    ['Pamplemousse', 'Acidulé', 'Léger'],
    ['Amer', 'Herbacé', 'Fort'],
  ],
  es: [
    ['Amargo', 'Cítrico', 'Burbujeante'],
    ['Floral', 'Fresco', 'Ligero'],
    ['Seco', 'Botánico', 'Crujiente'],
    ['Cítrico', 'Suave', 'Espumoso'],
    ['Especiado', 'Vivaz', 'Refrescante'],
    ['Cítrico', 'Salado', 'Intenso'],
    ['Sabroso', 'Especiado', 'Potente'],
    ['Mentolado', 'Fresco', 'Dulce'],
    ['Cítrico', 'Rústico', 'Fuerte'],
    ['Pomelo', 'Ácido', 'Ligero'],
    ['Amargo', 'Herbal', 'Fuerte'],
  ],
};

/* Section labels for the two columns + the small per-card kicker words. */
export const DRINK_SECTION_LABELS: Record<Lang, { ingredients: string; flavours: string }> = {
  it: { ingredients: 'INGREDIENTI', flavours: 'SENTORI' },
  en: { ingredients: 'INGREDIENTS', flavours: 'FLAVOURS' },
  de: { ingredients: 'ZUTATEN', flavours: 'AROMEN' },
  fr: { ingredients: 'INGRÉDIENTS', flavours: 'SAVEURS' },
  es: { ingredients: 'INGREDIENTES', flavours: 'NOTAS' },
};

/**
 * Split a locked ingredient line into individual ingredients + an optional
 * trailing variant note, WITHOUT rewording. The parenthetical "(anche …)" is
 * lifted out verbatim as the note; the rest is split on commas into lines.
 * (Extracting the parenthetical first protects commas inside it.)
 */
export function parseIngredientLine(raw: string): { items: string[]; note: string } {
  const m = raw.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  const main = m ? m[1].trim() : raw;
  const note = m ? m[2].trim() : '';
  const items = main
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return { items, note };
}

export const COCKTAIL_COPY: Record<Lang, CocktailCopy> = {
  it: {
    kicker: 'DRINK LIST',
    title: 'Cocktail',
    subtitle: 'Tutti i nostri cocktail',
    price: '15 €',
    premiumLabel: 'PREMIUM SELECTION',
    premiumNote: 'Per chi desidera un tocco in più: scegli un distillato premium e il tuo cocktail diventa',
    premiumPrice: '20 €',
  },
  en: {
    kicker: 'DRINK LIST',
    title: 'Cocktails',
    subtitle: 'All our cocktails',
    price: '15 €',
    premiumLabel: 'PREMIUM SELECTION',
    premiumNote: 'For those who want an extra touch: choose a premium spirit and your cocktail becomes',
    premiumPrice: '20 €',
  },
  de: {
    kicker: 'DRINK LIST',
    title: 'Cocktails',
    subtitle: 'Alle unsere Cocktails',
    price: '15 €',
    premiumLabel: 'PREMIUM SELECTION',
    premiumNote: 'Für das gewisse Extra: Wählen Sie eine Premium-Spirituose und Ihr Cocktail wird zu',
    premiumPrice: '20 €',
  },
  fr: {
    kicker: 'DRINK LIST',
    title: 'Cocktails',
    subtitle: 'Tous nos cocktails',
    price: '15 €',
    premiumLabel: 'PREMIUM SELECTION',
    premiumNote: 'Pour une touche en plus : choisissez un spiritueux premium et votre cocktail passe à',
    premiumPrice: '20 €',
  },
  es: {
    kicker: 'DRINK LIST',
    title: 'Cócteles',
    subtitle: 'Todos nuestros cócteles',
    price: '15 €',
    premiumLabel: 'PREMIUM SELECTION',
    premiumNote: 'Para un toque más: elige un destilado premium y tu cóctel se convierte en',
    premiumPrice: '20 €',
  },
};
