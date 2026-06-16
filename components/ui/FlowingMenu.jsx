'use client';

/**
 * FlowingMenu — full-height rows with a marquee that slides in from the nearest
 * edge on hover (desktop, gsap-driven). On touch / no-hover devices the marquee
 * is shown by default and loops continuously (the CSS horizontal scroll runs on
 * its own), so the effect is alive without a cursor.
 *
 * Adapted from the reactbits FlowingMenu pattern, themed to Medusa via
 * FlowingMenu.css. Navigation is SPA state-driven, so each row calls
 * `onSelect()` instead of routing through an href.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

/**
 * @param {{ items?: { text: string; image: string; onSelect?: () => void }[] }} props
 */
export default function FlowingMenu({
  items = /** @type {{ text: string; image: string; onSelect?: () => void }[]} */ ([]),
}) {
  return (
    <div className="flowing-menu">
      <nav className="flowing-menu__nav">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ text, image, onSelect }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // No-hover (touch) devices show the marquee by default and skip the hover
  // animation entirely.
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const distSq = (x, y, x2, y2) => {
    const a = x - x2;
    const b = y - y2;
    return a * a + b * b;
  };
  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const top = distSq(mouseX, mouseY, width / 2, 0);
    const bottom = distSq(mouseX, mouseY, width / 2, height);
    return top < bottom ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev) => {
    if (isMobile || !itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev) => {
    if (isMobile || !itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, '<');
  };

  // Repeat the text+image enough times to fill the band; the inner track is
  // duplicated (translateX 0 → -50%) so the loop is seamless.
  const marqueeContent = useMemo(() => {
    return Array.from({ length: 6 }).map((_, idx) => (
      <span className="flowing-menu__marquee-cell" key={idx}>
        <span className="flowing-menu__marquee-text">{text}</span>
        <span className="flowing-menu__marquee-img" style={{ backgroundImage: `url(${image})` }} />
      </span>
    ));
  }, [text, image]);

  return (
    <div className={'flowing-menu__item' + (isMobile ? ' is-mobile' : '')} ref={itemRef}>
      <button
        type="button"
        className="flowing-menu__link"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect?.()}
      >
        {text}
      </button>
      <div className="flowing-menu__marquee" ref={marqueeRef} aria-hidden="true">
        <div className="flowing-menu__marquee-wrap" ref={marqueeInnerRef}>
          <div className="flowing-menu__marquee-track">
            {marqueeContent}
            {marqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}
