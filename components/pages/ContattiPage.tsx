'use client';

/**
 * CONTATTI — address / phone / hours / email cards, embedded Google map,
 * call-to-book button.
 */
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import { Btn, Reveal } from '@/components/primitives';
import { MAPS_EMBED_URL, PHONE, type Lang, type NavFn } from '@/lib/constants';
import { I18N } from '@/lib/i18n';

export default function ContattiPage({
  nav,
  lang,
  setLang,
}: {
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = I18N[lang].contatti;
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Navbar page="contatti" nav={nav} lang={lang} setLang={setLang} />
      <PageHero
        photo="/medusa_contatti.jpeg"
        kicker={t.kicker}
        title={t.title}
        sub="Passeggiata Anita Garibaldi 27/A · Genova Nervi"
      />
      <main id="main" data-bg-context="light" style={{ maxWidth: 1040, margin: '0 auto', padding: '80px 32px 100px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 22,
            marginBottom: 60,
          }}
        >
          {t.labels.map((label, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card" style={{ padding: '34px 26px', textAlign: 'center', height: '100%' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11,
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: 16,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 17,
                    lineHeight: 1.7,
                    color: 'var(--text)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {t.values[i]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="map-frame" style={{ marginBottom: 48 }}>
            <iframe
              title="map"
              src={MAPS_EMBED_URL}
              style={{ width: '100%', height: 420, border: 0, filter: 'grayscale(0.25) contrast(0.95)', display: 'block' }}
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal>
          <div style={{ textAlign: 'center' }}>
            <Btn as="a" variant="gold" href={'tel:' + PHONE}>
              {t.cta}
            </Btn>
          </div>
        </Reveal>
      </main>
      <Footer nav={nav} lang={lang} />
    </div>
  );
}
