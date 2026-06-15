<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Medusa Beach Club — Next.js migration

Single-page marketing site for Medusa Beach Club (Genova Nervi), migrated 1:1
from the static React-UMD site in `../medusa-deploy-perfect/index.html` to
Next.js 16 (App Router, TS, Tailwind v4, shadcn/ui). framer-motion, lucide-react
and @tsparticles/react+slim are installed and ready but intentionally unused —
the original animations were ported as-is (CSS keyframes + IntersectionObserver).

## Commands
- `npm run dev` / `npm run build` / `npm run lint`
- `node scripts/verify-e2e.mjs` — Playwright smoke test (needs `npm run dev -- --port 3777` running)

## Architecture
- One URL, state-driven SPA navigation — `components/SiteApp.tsx` owns
  `page`, `lang`, splash, and per-page body background. No Next routing for
  views (matches the original's `_redirects /* /index.html` behavior).
- Views live in `components/pages/*`; shared sections in `components/*`.
- `app/layout.tsx` carries all SEO: meta, OG (`og:type=restaurant` as raw
  tags), hreflang it/en/de/fr/x-default, Restaurant JSON-LD, Google Fonts
  link (Italiana, Cormorant Garamond, Jost, Space Grotesk — NOT next/font,
  the CSS references these family names directly).
- All site CSS is appended to `app/globals.css` after the shadcn theme.
- The loader (`components/Loader.tsx`) dismisses on the `medusa:frames-ready`
  CustomEvent dispatched by `components/Hero.tsx` when the hero video can
  play through (20s safety net). The Home reel scroll-locks the body until
  the video finishes (30s backstop).

## LOCKED content — do not rephrase
- `lib/i18n.ts` and `lib/menu-data.ts` were extracted VERBATIM from the
  original site (menu, wine list, all translations). Edit only on explicit
  owner request. 5 locales exist: IT/EN/DE/FR public + ES (kept from original).
- Palette `#082935` deep teal / `#c9a663` gold (CSS vars in globals.css).
- WhatsApp 393793753087 with IT/EN-adaptive prefill (`lib/constants.ts`).
- Beach Club email bagnimedusanervi@gmail.com; contact email
  bagnimedusa.bmr@gmail.com; address Passeggiata Anita Garibaldi 27/A.
- Autobi BMW MINI sponsor logo + links (loader + footer).
- `components/SponsorsStrip.tsx` is intentionally unrendered — the partner
  strip is paused per the owner (2026-06-12). Re-enable by rendering it
  before `<Footer />`.

## Conventions
- Plain `<img>`/`<video>` tags (not next/image) to preserve original
  rendering; assets live flat in `public/` with their original filenames
  (`medusa_stabilimento_${i+3}.jpg` patterns depend on them).
- `react-hooks/set-state-in-effect` is downgraded to warn (eslint.config.mjs)
  — the port intentionally initializes client-only state in mount effects.
