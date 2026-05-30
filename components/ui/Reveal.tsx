'use client';

import { motion, type Variants } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

export function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  variants?: Variants;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
