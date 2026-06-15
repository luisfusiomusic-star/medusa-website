'use client';

/**
 * Centered intro section — gold divider, kicker, line-revealed display
 * heading, italic serif paragraph. Used for "La Filosofia / Il Mare nel
 * Piatto" on the Ristorante page and the "Benvenuti / Un Angolo di
 * Liguria" welcome on the Beach Club page.
 */
import { Kicker, Reveal, RevealLines, SectionDivider } from '@/components/primitives';
import { MagicText } from '@/components/ui/magic-text';

interface FilosofiaProps {
  kicker: string;
  title: string;
  text: string;
  mb?: number;
}

export default function Filosofia({ kicker, title, text, mb = 80 }: FilosofiaProps) {
  return (
    <Reveal>
      <div style={{ textAlign: 'center', marginBottom: mb }}>
        <SectionDivider style={{ marginBottom: 12 }} />
        <Kicker color="var(--gold)" style={{ marginBottom: 22 }}>
          {kicker}
        </Kicker>
        <RevealLines
          as="h2"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px, 4.5vw, 52px)',
            fontWeight: 400,
            letterSpacing: '0.12em',
            color: 'var(--teal-deep)',
            marginBottom: 28,
          }}
        >
          {title}
        </RevealLines>
        {/* Words reveal on scroll (MagicText) — same Medusa italic-serif look. */}
        <MagicText text={text} className="filosofia-magic" />
      </div>
    </Reveal>
  );
}
