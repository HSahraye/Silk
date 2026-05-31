'use client';

import { motion, type MotionValue, useTransform } from 'framer-motion';

/**
 * A debossed branding sleeve that wraps around the gift box.
 * `wrap` 0..1: 0 = sleeve off to the side, 1 = wrapped across center.
 */
export function BrandingSleeve({
  wrap,
  className,
}: {
  wrap: MotionValue<number>;
  className?: string;
}) {
  const x = useTransform(wrap, [0, 1], ['-30%', '0%']);
  const opacity = useTransform(wrap, [0, 0.2, 1], [0, 0.8, 1]);
  return (
    <motion.div
      className={className}
      style={{ x, opacity, willChange: 'transform, opacity' }}
    >
      <svg viewBox="0 0 800 200" className="h-full w-full" aria-hidden fill="none">
        <defs>
          <linearGradient id="sleeve" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1B1B22" />
            <stop offset="100%" stopColor="#08080B" />
          </linearGradient>
        </defs>
        <rect x="0" y="40" width="800" height="120" fill="url(#sleeve)" />
        <rect x="0" y="40" width="800" height="1" fill="rgba(255,255,255,0.06)" />
        <rect x="0" y="159" width="800" height="1" fill="rgba(0,0,0,0.6)" />

        {/* Debossed sample logos */}
        <g opacity="0.9">
          <text x="120" y="110" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="600" fill="#3E3E48">
            GLOBAL
          </text>
          <text x="320" y="110" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="600" fill="#3E3E48">
            TECH·CORP
          </text>
          <text x="540" y="110" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="600" fill="#3E3E48">
            CIPHER LP
          </text>
        </g>

        {/* Foil divider line */}
        <line x1="40" y1="100" x2="760" y2="100" stroke="#1E84C7" strokeOpacity="0.35" strokeWidth="0.6" />
      </svg>
    </motion.div>
  );
}
