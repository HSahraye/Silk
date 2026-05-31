'use client';

import { motion, type MotionValue, useTransform } from 'framer-motion';

/**
 * Drifting gold-dust particles. Pure SVG, ~24 elements, GPU-friendly.
 * `density` controls visibility — used in scene 6 finale.
 */
export function GoldParticles({
  density,
  className,
}: {
  density: MotionValue<number>; // 0..1
  className?: string;
}) {
  const opacity = useTransform(density, [0, 1], [0, 1]);
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ opacity, willChange: 'opacity' }}
    >
      <svg viewBox="0 0 1000 800" className="h-full w-full" fill="none">
        {Array.from({ length: 26 }).map((_, i) => {
          const cx = (i * 73) % 1000;
          const cy = (i * 131) % 800;
          const r = 1 + (i % 3);
          const dur = 8 + (i % 6);
          return (
            <g key={i}>
              <motion.circle
                cx={cx}
                cy={cy}
                r={r}
                fill="#FBE8B0"
                opacity={0.7}
                animate={{
                  y: [0, -30 - (i % 4) * 8, 0],
                  x: [0, (i % 2 ? 10 : -10), 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: dur,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: i * 0.18,
                }}
              />
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}
