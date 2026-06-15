'use client';

/**
 * MENÙ — full food menu rendered inline (two-column grid on desktop,
 * single on mobile), allergen disclosure, PDF download.
 * Menu content is LOCKED — rendered verbatim from lib/menu-data.ts.
 */
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { DownloadBtn, Reveal } from '@/components/primitives';
import { MENU_PDF, type Lang, type NavFn } from '@/lib/constants';
import { I18N } from '@/lib/i18n';
import { ALLERGENS_TEXT, MENU_DATA } from '@/lib/menu-data';

export default function MenuPage({
  nav,
  lang,
}: {
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = I18N[lang].menu;
  // Pick the menu data for the active language; missing locales fall through to IT.
  const sections = MENU_DATA[lang] || MENU_DATA.it;

  // Quote + author rendered as the hero subtitle. Wrapping inside a single
  // node so PageHero's <p> stays valid (the author becomes a styled span block).
  const heroSub = (
    <>
      {t.quote}
      <span
        style={{
          display: 'block',
          marginTop: 12,
          fontFamily: 'var(--font-sans)',
          fontStyle: 'normal',
          fontSize: 11,
          letterSpacing: '0.32em',
          color: 'var(--gold)',
          opacity: 0.9,
        }}
      >
        {t.quoteAuthor}
      </span>
    </>
  );

  return (
    <div className="grain" style={{ minHeight: '100vh', background: 'var(--teal-deep)', color: 'white' }}>
      <PageHero photo="/medusa_menu.jpeg" kicker={t.kicker} title={t.title} sub={heroSub} />
      <main
        id="main"
        style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 32px 120px', position: 'relative', zIndex: 1 }}
      >
        {/* Philosophy intro paragraph (EN / DE only — undefined for IT and FR) */}
        {t.intro && (
          <Reveal>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 19,
                fontStyle: 'italic',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.86)',
                maxWidth: 760,
                margin: '0 auto 70px',
                textAlign: 'center',
              }}
            >
              {t.intro}
            </p>
          </Reveal>
        )}
        {/* Full menu content rendered inline — two-column grid on desktop, single on mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))',
            gap: '54px 64px',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          {sections.map((sec, i) => (
            <Reveal key={i} delay={Math.min(i, 5) * 0.06}>
              <div className="menu-section">
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 16,
                    fontWeight: 400,
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: 6,
                  }}
                >
                  {sec.title}
                </h3>
                {sec.subtitle && (
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 14,
                      fontStyle: 'italic',
                      color: 'rgba(255,255,255,0.55)',
                      marginBottom: 18,
                      lineHeight: 1.5,
                    }}
                  >
                    {sec.subtitle}
                  </p>
                )}
                <div
                  style={{
                    height: 1,
                    background: 'linear-gradient(90deg, var(--gold) 0%, transparent 100%)',
                    opacity: 0.45,
                    marginBottom: 18,
                  }}
                />
                {sec.items.map(([name, price], j) => (
                  <div
                    key={j}
                    className="menu-item"
                    style={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      alignItems: 'baseline',
                      gap: 8,
                      padding: '11px 0',
                      borderBottom: '1px dotted rgba(201,166,99,0.14)',
                      maxWidth: '100%',
                    }}
                  >
                    <span
                      className="menu-item-name"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 16,
                        lineHeight: 1.4,
                        color: 'rgba(255,255,255,0.92)',
                        flex: 1,
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {name}
                    </span>
                    <span
                      className="menu-item-price"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 14,
                        color: 'var(--gold)',
                        letterSpacing: '0.04em',
                        fontWeight: 500,
                        textAlign: 'right',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        paddingLeft: 8,
                      }}
                    >
                      {'€ ' + price}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div
            style={{
              marginTop: 70,
              padding: '30px 36px',
              border: '1px solid rgba(201,166,99,0.28)',
              borderRadius: 6,
              fontFamily: 'var(--font-serif)',
              fontSize: 14,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.8,
              textAlign: 'center',
            }}
          >
            {t.footer}
          </div>
        </Reveal>
        <Reveal>
          <p
            style={{
              padding: '0 8px',
              fontFamily: 'var(--font-serif)',
              fontSize: 12,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75,
              textAlign: 'center',
              maxWidth: 760,
              margin: '22px auto 0',
            }}
          >
            {ALLERGENS_TEXT}
          </p>
        </Reveal>
        <Reveal>
          <div style={{ marginTop: 80, textAlign: 'center' }}>
            <DownloadBtn href={MENU_PDF} lang={lang} kind="menu" />
          </div>
        </Reveal>
      </main>
      <Footer nav={nav} lang={lang} dark />
    </div>
  );
}
