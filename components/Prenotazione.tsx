'use client';

/**
 * Booking CTA band (Beach Club) — dark island over background_medusa.jpg
 * with the bagnimedusanervi@gmail.com mailto button.
 */
import { Btn, Kicker, Reveal } from '@/components/primitives';
import { EMAIL_BEACH } from '@/lib/constants';

interface PrenotazioneProps {
  kicker: string;
  title: string;
  text: string;
  btn: string;
}

export default function Prenotazione({ kicker, title, text, btn }: PrenotazioneProps) {
  return (
    <Reveal>
      <div
        className="grain"
        style={{
          backgroundImage: "url('/background_medusa.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          textAlign: 'center',
          padding: '76px 32px',
          borderRadius: 8,
          color: 'white',
          boxShadow: '0 40px 100px -40px rgba(15,34,48,0.5)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,41,53,0.72)', borderRadius: 8, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Kicker color="var(--gold)" style={{ marginBottom: 22 }}>
            {kicker}
          </Kicker>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 400,
              letterSpacing: '0.16em',
              marginBottom: 18,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 19,
              fontStyle: 'italic',
              opacity: 0.88,
              maxWidth: 520,
              margin: '0 auto 36px',
            }}
          >
            {text}
          </p>
          <Btn as="a" variant="gold" href={`mailto:${EMAIL_BEACH}`}>
            {btn}
          </Btn>
        </div>
      </div>
    </Reveal>
  );
}
