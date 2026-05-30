import type { Variants, BezierDefinition } from 'framer-motion';

export const easeSilk: BezierDefinition = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeSilk },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeSilk } },
};

export const stagger = (delay = 0.06): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: delay, delayChildren: 0.05 },
  },
});

export const viewportOnce = { once: true, amount: 0.2 } as const;
