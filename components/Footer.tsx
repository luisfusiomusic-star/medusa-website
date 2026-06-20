'use client';

/**
 * Footer — logo, "Sponsored by" Autobi BMW MINI credit, address,
 * Instagram / Map / Call links, copyright.
 */
import {
  EASE_SMOOTH,
  EMAIL_CONTACT,
  INSTAGRAM_URL,
  MAPS_URL,
  PHONE,
  PHONE_DISPLAY,
  SPONSOR_LINK_SEDE,
  SPONSOR_LOGO,
  type Lang,
  type NavFn,
} from '@/lib/constants';

const MAP_LABEL: Record<Lang, string> = { it: 'Mappa', en: 'Map', de: 'Karte', fr: 'Carte', es: 'Mapa' };
const CALL_LABEL: Record<Lang, string> = {
  it: 'Chiamaci',
  en: 'Call us',
  de: 'Anrufen',
  fr: 'Appelez-nous',
  es: 'Llámanos',
};

export default function Footer({ nav, lang, dark }: { nav: NavFn; lang: Lang; dark?: boolean }) {
  return (
    <footer
      data-bg-context="dark"
      style={{
        background: 'var(--teal-deep)',
        color: 'rgba(255,255,255,0.72)',
        padding: '64px 32px 38px',
        textAlign: 'center',
        borderTop: dark ? '1px solid rgba(201,166,99,0.18)' : 'none',
      }}
    >
      <button
        onClick={() => nav('home')}
        aria-label="Medusa home"
        style={{ padding: 0, marginBottom: 20, display: 'inline-block', transition: `opacity 0.4s ${EASE_SMOOTH}` }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo_medusa.png" alt="MEDUSA" loading="lazy" style={{ height: 64, width: 'auto', display: 'block' }} />
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <span
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'rgba(201,166,99,0.55)',
          }}
        >
          Sponsored by
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
          <a
            href={SPONSOR_LINK_SEDE}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', opacity: 0.75, transition: 'opacity 0.3s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SPONSOR_LOGO} alt="Autobi BMW MINI" loading="lazy" style={{ height: 64, width: 'auto', display: 'block' }} />
          </a>
          {/* Timossi — light (_bn) version for the dark footer, like the Autobi logo. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/timossi_bn.png"
            alt="Timossi — Beverage & Food solution"
            loading="lazy"
            style={{ height: 40, width: 'auto', display: 'block', opacity: 0.75 }}
          />
        </div>
      </div>
      <div style={{ width: 36, height: 1, background: 'rgba(201,166,99,0.2)', margin: '0 auto 28px' }} />
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontStyle: 'italic', marginBottom: 26, lineHeight: 1.6 }}>
        Passeggiata Anita Garibaldi 27/A, Genova – Nervi
        <br />
        <span style={{ opacity: 0.75 }}>
          {PHONE_DISPLAY} · {EMAIL_CONTACT}
        </span>
      </p>
      <div
        style={{
          display: 'flex',
          gap: 28,
          justifyContent: 'center',
          marginBottom: 28,
          fontSize: 11,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          flexWrap: 'wrap',
        }}
      >
        <a className="nav-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ paddingBottom: 3 }}>
          Instagram
        </a>
        <a className="nav-link" href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ paddingBottom: 3 }}>
          {MAP_LABEL[lang]}
        </a>
        <a className="nav-link" href={'tel:' + PHONE} style={{ paddingBottom: 3 }}>
          {CALL_LABEL[lang]}
        </a>
      </div>
      <p style={{ fontSize: 10, opacity: 0.45, letterSpacing: '0.16em' }}>© 2026 Medusa Beach Club · medusabeachclub.it</p>
    </footer>
  );
}
