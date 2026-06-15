'use client';

/**
 * RISTORANTE — hero, philosophy, blind tasting band, photo carousel,
 * La Brigata team section, action buttons (menu / wine list / book).
 */
import PageWrap from '@/components/PageWrap';
import PageHero from '@/components/PageHero';
import Filosofia from '@/components/Filosofia';
import MenuDegustazione from '@/components/MenuDegustazione';
import Carousel from '@/components/Carousel';
import BrigataGallery from '@/components/BrigataGallery';
import { Btn, Reveal } from '@/components/primitives';
import { PHOTO_RIST, waLink, type Lang, type NavFn } from '@/lib/constants';
import { I18N } from '@/lib/i18n';

export default function RistorantePage({
  nav,
  lang,
  setLang,
}: {
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = I18N[lang].rist;
  return (
    <PageWrap
      nav={nav}
      page="ristorante"
      lang={lang}
      setLang={setLang}
      hero={<PageHero photo={PHOTO_RIST} kicker={t.kicker} title={t.title} sub={t.heroSub} />}
    >
      <Filosofia kicker={t.philKicker} title={t.philTitle} text={t.philText} mb={80} />
      <MenuDegustazione
        kicker={t.tastingKicker}
        title={t.tastingTitle}
        text={t.tastingText}
        course5={t.tastingCourse5}
        course8={t.tastingCourse8}
      />
      {/* Simple photo carousel — horizontal scroll with arrow navigation. */}
      <Carousel />
      {/* Team section — scroll-driven sticky gallery (photos sync the name). */}
      <BrigataGallery title={t.teamTitle} lang={lang} />
      <Reveal>
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <Btn variant="solid" onClick={() => nav('menu')}>
            {t.btnMenu}
          </Btn>
          <Btn variant="ghost" onClick={() => nav('vini')}>
            {t.btnVini}
          </Btn>
          <Btn as="a" variant="gold" target="_blank" rel="noopener noreferrer" href={waLink(lang)}>
            {t.btnBook}
          </Btn>
        </div>
      </Reveal>
    </PageWrap>
  );
}
