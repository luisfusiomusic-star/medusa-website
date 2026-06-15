'use client';

/**
 * Single MEDUSA loader: gold breathing letters + sponsor credit.
 * Gated on the hero video being ready — dismissed by the
 * `medusa:frames-ready` CustomEvent (dispatched by the Hero once the video
 * can play through), with a hard 20s safety net so a stalled video can
 * never trap the user. 400ms settle precedes the 0.8s fade, then the node
 * is removed.
 */
import { useEffect, useState } from 'react';
import { SPONSOR_LINK_MINI, SPONSOR_LOGO } from '@/lib/constants';

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let done = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const dismiss = () => {
      if (done) return;
      done = true;
      timeouts.push(
        setTimeout(() => {
          setHidden(true);
          timeouts.push(setTimeout(() => setRemoved(true), 800));
        }, 400)
      );
    };
    document.addEventListener('medusa:frames-ready', dismiss, { once: true });
    const safety = setTimeout(dismiss, 20000);
    return () => {
      document.removeEventListener('medusa:frames-ready', dismiss);
      clearTimeout(safety);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  if (removed) return null;

  return (
    <div id="fallback-loader" className={hidden ? 'hidden' : undefined}>
      <div className="fallback-letters">
        <span>M</span>
        <span>E</span>
        <span>D</span>
        <span>U</span>
        <span>S</span>
        <span>A</span>
      </div>
      <div className="loader-sponsors">
        <p className="loader-sponsors-label">CON IL SUPPORTO DI</p>
        <a href={SPONSOR_LINK_MINI} target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SPONSOR_LOGO} alt="Autobi BMW MINI" />
        </a>
      </div>
    </div>
  );
}
