'use client';

/**
 * MagicText — scroll-driven word reveal. Each word sits over a dim "ghost"
 * copy (opacity 0.18) and fades to full opacity as the paragraph scrolls
 * through the viewport. Styling is left entirely to `className` so it can
 * inherit the surrounding design (Medusa uses italic serif — no demo
 * text-3xl / font-semibold here).
 */
import * as React from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';

export interface MagicTextProps {
  text: string;
  className?: string;
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span style={{ position: 'relative', marginRight: '0.28em', display: 'inline-block' }}>
      <span style={{ position: 'absolute', opacity: 0.18 }}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

export function MagicText({ text, className }: MagicTextProps) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.85', 'start 0.35'],
  });
  const words = text.split(' ');
  return (
    <p
      ref={container}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
