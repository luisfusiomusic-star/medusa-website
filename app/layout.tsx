import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://medusabeachclub.it/';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Medusa Beach Club · Stabilimento e Ristorante a Genova Nervi',
  description:
    'Medusa Beach Club — Stabilimento balneare e ristorante di pesce a Genova Nervi. Cucina di mare, terrazza sul mare, ombrelloni con vista, vermentino al tramonto.',
  keywords:
    'Medusa Beach Club, Genova, Nervi, stabilimento balneare, ristorante pesce, cucina ligure, aperitivo, tramonto, terrazza sul mare',
  authors: [{ name: 'Medusa Beach Club' }],
  alternates: {
    canonical: SITE_URL,
    languages: {
      it: SITE_URL,
      en: SITE_URL,
      de: SITE_URL,
      fr: SITE_URL,
      'x-default': SITE_URL,
    },
  },
  icons: {
    icon: [{ url: '/favicon.png', sizes: '64x64', type: 'image/png' }],
    shortcut: '/favicon.png',
    apple: [{ url: '/favicon.png', sizes: '64x64' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medusa Beach Club · Genova Nervi',
    description: 'Cucina di mare, terrazza al tramonto, ombrelloni con vista mare.',
    images: ['https://medusabeachclub.it/home_ristorante.jpeg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0F2230',
  colorScheme: 'light dark',
};

/* Local Business structured data — preserved verbatim from the original site. */
const JSON_LD = `{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Medusa Beach Club",
  "alternateName": "Medusa Genova",
  "image": "https://medusabeachclub.it/og.jpg",
  "url": "https://medusabeachclub.it/",
  "telephone": "+39 010 372 8113",
  "servesCuisine": ["Ligurian", "Seafood", "Italian"],
  "priceRange": "€€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Passeggiata Anita Garibaldi 27/A",
    "addressLocality": "Genova",
    "addressRegion": "GE",
    "postalCode": "16167",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 44.3833,
    "longitude": 9.05
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "08:00",
    "closes": "24:00"
  }],
  "sameAs": ["https://www.instagram.com/medusagenova"]
}`;

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Italiana&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&family=Space+Grotesk:wght@400;500&display=swap';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {/* Open Graph — written as raw tags to preserve og:type="restaurant"
            and the locale alternates exactly as the original. */}
        <meta property="og:type" content="restaurant" />
        <meta property="og:site_name" content="Medusa Beach Club" />
        <meta property="og:title" content="Medusa Beach Club · Genova Nervi" />
        <meta
          property="og:description"
          content="Stabilimento balneare e ristorante di pesce a Genova Nervi. Cucina di mare, ombrelloni con vista, aperitivi al tramonto."
        />
        <meta property="og:url" content="https://medusabeachclub.it/" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="de_DE" />
        <meta property="og:locale:alternate" content="fr_FR" />
        <meta property="og:image" content="https://medusabeachclub.it/home_ristorante.jpeg" />

        {/* Preconnect for fonts (perf) — same Google Fonts set as the original:
            Italiana, Cormorant Garamond, Jost, Space Grotesk. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href={FONTS_URL} />
        <link rel="stylesheet" href={FONTS_URL} />
        <link rel="preload" as="image" href="/logo_medusa.png" fetchPriority="high" />

        {/* Local Business structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      </head>
      <body>
        <noscript>
          <div style={{ padding: '60px 24px', textAlign: 'center', color: '#c9a663', fontFamily: 'serif' }}>
            <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 60, letterSpacing: '0.2em', color: 'white' }}>
              MEDUSA
            </h1>
            <p style={{ marginTop: 16, fontStyle: 'italic' }}>
              Per favore abilita JavaScript per visualizzare il sito. — Passeggiata Anita Garibaldi 27/A, Genova Nervi ·
              +39 010 372 8113
            </p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
