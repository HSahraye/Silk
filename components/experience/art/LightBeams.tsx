'use client';

import { motion, type MotionValue, useTransform } from 'framer-motion';

/**
 * Soft volumetric light beams descending from above the box.
 * Intensifies on first scene, fades out by Scene 2.
 */
export function LightBeams({
  intensity,
  className,
}: {
  intensity: MotionValue<number>; // 0..1
  className?: string;
}) {
  const opacity = useTransform(intensity, [0, 1], [0, 0.55]);
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ opacity, willChange: 'opacity, transform' }}
    >
      <svg
        viewBox="0 0 1000 900"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="beam" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,222,150,0.0)" />
            <stop offset="20%" stopColor="rgba(255,222,150,0.18)" />
            <stop offset="100%" stopColor="rgba(255,222,150,0)" />
          </linearGradient>
          <filter id="beam-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Three primary beams */}
        <g filter="url(#beam-blur)">
          <polygon points="380,0 620,0 700,900 300,900" fill="url(#beam)" />
          <polygon points="450,0 560,0 540,900 460,900" fill="url(#beam)" opacity="0.85" />
          <polygon points="200,0 360,0 460,900 80,900" fill="url(#beam)" opacity="0.55" />
          <polygon points="640,0 800,0 920,900 540,900" fill="url(#beam)" opacity="0.55" />
        </g>
      </svg>
    </motion.div>
  );
}
