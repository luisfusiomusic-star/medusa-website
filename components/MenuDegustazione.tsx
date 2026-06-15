'use client';

/**
 * "Menù Degustazione al Buio" band (Ristorante) — dark island over
 * background_medusa.jpg with the €60 / €85 tasting prices.
 */
import { Kicker, Reveal } from '@/components/primitives';

interface MenuDegustazioneProps {
  kicker: string;
  title: string;
  text: string;
  course5: string;
  course8: string;
}

export default function MenuDegustazione({ kicker, title, text, course5, course8 }: MenuDegustazioneProps) {
  return (
    <Reveal>
      <div
        className="medusa-bg"
        style={{
          color: 'white',
          padding: '68px 40px',
          marginBottom: 80,
          textAlign: 'center',
          borderRadius: 8,
          boxShadow: '0 40px 100px -40px rgba(15,34,48,0.5)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Kicker color="var(--gold)" style={{ marginBottom: 22 }}>
            {kicker}
          </Kicker>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 38px)',
              fontWeight: 400,
              letterSpacing: '0.16em',
              marginBottom: 16,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 18,
              fontStyle: 'italic',
              opacity: 0.88,
              maxWidth: 540,
              margin: '0 auto 36px',
            }}
          >
            {text}
          </p>
          <div
            className="tasting-prices"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 56, flexWrap: 'wrap' }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--gold)', fontWeight: 400, lineHeight: 1 }}>
                €60
              </div>
              <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', opacity: 0.72, marginTop: 10 }}>
                {course5}
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--gold)', fontWeight: 400, lineHeight: 1 }}>
                €85
              </div>
              <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', opacity: 0.72, marginTop: 10 }}>
                {course8}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
