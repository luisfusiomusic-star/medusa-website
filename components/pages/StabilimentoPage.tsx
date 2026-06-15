'use client';

/**
 * BEACH CLUB (Stabilimento) — hero, welcome intro, service cards,
 * photo trio, booking CTA.
 */
import PageWrap from '@/components/PageWrap';
import PageHero from '@/components/PageHero';
import Filosofia from '@/components/Filosofia';
import Prenotazione from '@/components/Prenotazione';
import { Photo, Reveal } from '@/components/primitives';
import { PHOTO_STAB, type Lang, type NavFn } from '@/lib/constants';
import { I18N } from '@/lib/i18n';

export default function StabilimentoPage({
  nav,
  lang,
  setLang,
}: {
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = I18N[lang].stab;
  return (
    <PageWrap
      nav={nav}
      page="stabilimento"
      lang={lang}
      setLang={setLang}
      hero={<PageHero photo={PHOTO_STAB} kicker={t.kicker} title={t.title} sub={t.heroSub} />}
    >
      <Filosofia kicker={t.welcomeKicker} title={t.welcomeTitle} text={t.welcomeText} mb={100} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 22,
          marginBottom: 100,
        }}
      >
        {t.services.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="card" style={{ padding: '38px 30px', height: '100%' }}>
              <div style={{ width: 30, height: 1, background: 'var(--gold)', marginBottom: 22 }} />
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 24,
                  fontWeight: 500,
                  color: 'var(--teal-deep)',
                  marginBottom: 14,
                }}
              >
                {s[0]}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text)', opacity: 0.78 }}>{s[1]}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
          marginBottom: 100,
        }}
      >
        {t.photos.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <Photo src={`/medusa_stabilimento_${i + 3}.jpg`} label={p} h={380} />
          </Reveal>
        ))}
      </div>
      <Prenotazione kicker={t.ctaKicker} title={t.ctaTitle} text={t.ctaText} btn={t.ctaBtn} />
    </PageWrap>
  );
}
