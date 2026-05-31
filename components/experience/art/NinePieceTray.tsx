'use client';

import { motion, type MotionValue, useTransform } from 'framer-motion';

/**
 * The Signature Collection tray — 9 pieces, animating into a perfect grid.
 * `assembly` 0..1: 0 = scattered/hidden, 1 = perfect grid.
 */
export function NinePieceTray({
  assembly,
  className,
}: {
  assembly: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      <svg viewBox="0 0 500 500" className="h-full w-full" aria-hidden fill="none">
        <defs>
          <linearGradient id="tray-gold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#E2B770" />
            <stop offset="100%" stopColor="#7A4E1F" />
          </linearGradient>
          <linearGradient id="piece-top" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FBE8B0" />
            <stop offset="60%" stopColor="#D9A55B" />
            <stop offset="100%" stopColor="#8C5821" />
          </linearGradient>
        </defs>

        {/* Tray base */}
        <rect x="40" y="40" width="420" height="420" rx="22" fill="#0F0B07" />
        <rect x="44" y="44" width="412" height="412" rx="20" fill="none" stroke="url(#tray-gold)" strokeWidth="2.5" />

        {/* 9 pieces */}
        {Array.from({ length: 9 }).map((_, i) => {
          const c = i % 3;
          const r = Math.floor(i / 3);
          const targetX = 80 + c * 120;
          const targetY = 80 + r * 120;
          // Off-grid scatter starting positions
          const startX = targetX + (c - 1) * 60 + ((i % 2) ? 14 : -14);
          const startY = targetY + (r - 1) * 60 + ((i % 2) ? -10 : 10);
          const x = useTransform(assembly, [0, 1], [startX, targetX]);
          const y = useTransform(assembly, [0, 1], [startY, targetY]);
          const opacity = useTransform(assembly, [0, 0.2, 1], [0, 0.4, 1]);
          const scale = useTransform(assembly, [0, 1], [0.7, 1]);
          return (
            <motion.g key={i} style={{ x, y, opacity, scale }}>
              <rect x={0} y={0} width={100} height={100} rx={8} fill="url(#piece-top)" />
              {/* layer hairlines */}
              {Array.from({ length: 6 }).map((__, j) => (
                <line
                  key={j}
                  x1={6}
                  x2={94}
                  y1={18 + j * 12}
                  y2={18 + j * 12}
                  stroke="rgba(255,242,200,0.25)"
                  strokeWidth="0.6"
                />
              ))}
              {/* pistachio center */}
              <ellipse cx="50" cy="50" rx="9" ry="6" fill="#86B046" opacity="0.95" />
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}
