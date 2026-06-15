'use client';

/**
 * Brigata (Ristorante) — two chef cards that reveal with a fade + slide-up
 * when scrolled into view, cascading one after the other. Subtle hover
 * lift; photo brightness lifts slightly on hover (CSS).
 *
 * Chef data is fixed (do not edit names / ages / roles).
 */
import { motion } from 'motion/react';
import type { Lang } from '@/lib/constants';

interface Chef {
  url: string;
  name: string;
  role: string;
}

const chefs: Chef[] = [
  { url: '/montoya.jpeg', name: 'Montoya', role: '45 · Chef' },
  { url: '/roma.jpeg', name: 'Roma', role: '29 · Sous Chef' },
];

/* Small gold label above the heading. Added locally so the locked i18n
   dictionaries stay untouched. */
const LABEL: Record<Lang, string> = {
  it: 'CHI CUCINA',
  en: 'THE KITCHEN',
  de: 'DIE KÜCHE',
  fr: 'LA CUISINE',
  es: 'QUIÉN COCINA',
};

export default function BrigataGallery({ title, lang }: { title: string; lang: Lang }) {
  return (
    <section className="brigata-section" data-bg-context="dark">
      <p className="brigata-label">{LABEL[lang] || LABEL.it}</p>
      <h2 className="brigata-heading">{title}</h2>

      <div className="brigata-cards">
        {chefs.map((chef, index) => (
          <motion.div
            key={chef.name}
            className="brigata-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brigata-card-photo" src={chef.url} alt={chef.name} loading="lazy" />
            <p className="brigata-card-name">{chef.name}</p>
            <p className="brigata-card-role">{chef.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
