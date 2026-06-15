'use client';

/**
 * CARTA VINI — wine list rendered inline. Section titles translate via
 * i18n vini.sections; wine names + prices are LOCKED (printed source).
 */
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { DownloadBtn, Reveal } from '@/components/primitives';
import { VINI_PDF, type Lang, type NavFn } from '@/lib/constants';
import { I18N } from '@/lib/i18n';
import { VINI_DATA } from '@/lib/menu-data';

export default function ViniPage({
  nav,
  lang,
}: {
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = I18N[lang].vini;
  return (
    <div className="grain" style={{ minHeight: '100vh', background: 'var(--teal-deep)', color: 'white' }}>
      <PageHero photo="/medusa_vini.jpeg" kicker={t.kicker} title={t.title} sub={t.subtitle} />
      <main
        id="main"
        style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 32px 120px', position: 'relative', zIndex: 1 }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
            gap: '60px 70px',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          {VINI_DATA.map((sec, i) => (
            <Reveal key={i} delay={Math.min(i, 5) * 0.06}>
              <div className="wine-section">
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.38em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: 20,
                  }}
                >
                  {t.sections[sec.key]}
                </h3>
                <div
                  style={{
                    height: 1,
                    background: 'linear-gradient(90deg, var(--gold) 0%, transparent 100%)',
                    opacity: 0.45,
                    marginBottom: 20,
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
                      padding: '10px 0',
                      borderBottom: '1px dotted rgba(201,166,99,0.12)',
                      maxWidth: '100%',
                    }}
                  >
                    <span
                      className="menu-item-name"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 15,
                        lineHeight: 1.4,
                        color: 'rgba(255,255,255,0.9)',
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
                        fontFamily: 'var(--font-display)',
                        fontSize: 15,
                        color: 'var(--gold)',
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        paddingLeft: 8,
                        textAlign: 'right',
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
          <div style={{ marginTop: 80, textAlign: 'center' }}>
            <DownloadBtn href={VINI_PDF} lang={lang} kind="vini" />
          </div>
        </Reveal>
      </main>
      <Footer nav={nav} lang={lang} dark />
    </div>
  );
}
