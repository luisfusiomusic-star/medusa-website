'use client';

/**
 * SPONSORS BAR — currently unused: the "I nostri partner" strip above the
 * footer is paused per the owner's request (2026-06-12). Re-enable by
 * rendering <SponsorsStrip lang={lang} /> before each <Footer /> call.
 * CSS (.sponsors-strip*) is kept too.
 */
import { SPONSOR_LINK_MINI, SPONSOR_LOGO, type Lang } from '@/lib/constants';

const LABELS: Record<Lang, string> = {
  it: 'I nostri partner',
  en: 'Our partners',
  de: 'Unsere Partner',
  fr: 'Nos partenaires',
  es: 'Nuestros socios',
};

export default function SponsorsStrip({ lang }: { lang: Lang }) {
  const label = LABELS[lang] || 'I nostri partner';
  return (
    <section className="sponsors-strip">
      <p className="sponsors-strip-label">{label}</p>
      <div className="sponsors-strip-logos">
        <a href={SPONSOR_LINK_MINI} target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SPONSOR_LOGO} alt="Autobi BMW MINI" loading="lazy" />
        </a>
      </div>
    </section>
  );
}
