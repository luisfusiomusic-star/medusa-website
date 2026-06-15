'use client';

/**
 * Tubelight pill navbar — a glass pill of nav items with an animated "lamp"
 * (a gold bar + soft glow) that slides onto the active item. Adapted to the
 * Medusa palette; the lamp is driven by `active` (the current page) via a
 * shared `layoutId`, so it tracks real navigation rather than local clicks.
 *
 * Desktop shows the text label; mobile swaps to the Lucide icon (CSS).
 */
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TubelightItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: TubelightItem[];
  active: string;
  onSelect: (key: string) => void;
}

export function NavBar({ items, active, onSelect }: NavBarProps) {
  return (
    <div className="tubelight">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
            className={cn('tubelight-item', isActive && 'is-active')}
          >
            <span className="tubelight-label">{item.label}</span>
            <span className="tubelight-icon">
              <Icon size={18} strokeWidth={2} aria-hidden="true" />
            </span>
            {isActive && (
              <motion.span
                layoutId="medusa-lamp"
                className="tubelight-lamp"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <span className="tubelight-lamp-bar">
                  <span className="tubelight-glow tubelight-glow-1" />
                  <span className="tubelight-glow tubelight-glow-2" />
                  <span className="tubelight-glow tubelight-glow-3" />
                </span>
              </motion.span>
            )}
          </button>
        );
      })}
    </div>
  );
}
