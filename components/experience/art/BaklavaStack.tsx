'use client';

import { motion, type MotionValue, useTransform } from 'framer-motion';

/**
 * A single baklava piece rendered as an exploded stack of phyllo layers.
 * As `separation` rises 0 → 1, the layers physically separate vertically
 * to reveal the pistachio + walnut filling cross-section.
 */
export function BaklavaStack({
  separation,
  rotate,
  className,
}: {
  separation: MotionValue<number>;
  rotate: MotionValue<number>;
  className?: string;
}) {
  // Each layer gets a different offset (in px) so the stack opens like a fan.
  return (
    <motion.div
      style={{ rotateY: rotate, perspective: 1400 }}
      className={className}
    >
      <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden fill="none">
        <defs>
          <linearGradient id="phyllo-top" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FBE8B0" />
            <stop offset="55%" stopColor="#D9A55B" />
            <stop offset="100%" stopColor="#7E4E1B" />
          </linearGradient>
          <linearGradient id="phyllo-side" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#C28338" />
            <stop offset="100%" stopColor="#5A3713" />
          </linearGradient>
          <linearGradient id="filling" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#A7C56C" />
            <stop offset="100%" stopColor="#4F6720" />
          </linearGradient>
          <radialGradient id="hot-spot" cx="0.5" cy="0.3" r="0.55">
            <stop offset="0%" stopColor="rgba(255,236,184,0.55)" />
            <stop offset="100%" stopColor="rgba(255,236,184,0)" />
          </radialGradient>
          <filter id="halo" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* Honey-gold halo behind the piece */}
        <motion.circle
          cx="300"
          cy="300"
          r="220"
          fill="rgba(217,165,91,0.18)"
          filter="url(#halo)"
          style={{ scale: useTransform(separation, [0, 1], [1, 1.18]) }}
        />

        {/* CROSS-SECTION FILLING (revealed as layers separate) */}
        <motion.g style={{ opacity: useTransform(separation, [0, 0.25, 1], [0, 0.4, 1]) }}>
          {/* Pistachio + walnut center band */}
          <rect x="130" y="280" width="340" height="40" rx="3" fill="url(#filling)" />
          {/* Pistachio kernels */}
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse
              key={`pist-${i}`}
              cx={150 + i * 24}
              cy={300 + (i % 2 ? -3 : 3)}
              rx={6}
              ry={4}
              fill="#86B046"
              opacity="0.9"
            />
          ))}
          {/* Walnut chunks */}
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={`wal-${i}`}
              cx={180 + i * 55}
              cy={310 + (i % 2 ? 2 : -2)}
              rx={10}
              ry={5}
              fill="#6A4521"
              opacity="0.85"
            />
          ))}
        </motion.g>

        {/* TOP STACK — 7 layers rising as separation increases */}
        {Array.from({ length: 7 }).map((_, i) => {
          const baseY = 250 - i * 6;
          const y = useTransform(
            separation,
            [0, 1],
            [baseY, baseY - (7 - i) * 18 - 24],
          );
          return (
            <motion.g key={`top-${i}`} style={{ y }}>
              <rect
                x={130 - i * 1}
                y={baseY - 12}
                width={340 + i * 2}
                height={12}
                rx={2.5}
                fill="url(#phyllo-top)"
                opacity={0.96}
              />
              <rect
                x={130 - i * 1}
                y={baseY - 13}
                width={340 + i * 2}
                height={1}
                fill="#FFF2C8"
                opacity={0.35}
              />
            </motion.g>
          );
        })}

        {/* BOTTOM STACK — 6 layers falling */}
        {Array.from({ length: 6 }).map((_, i) => {
          const baseY = 320 + i * 6;
          const y = useTransform(separation, [0, 1], [baseY, baseY + (i + 1) * 16 + 18]);
          return (
            <motion.g key={`bot-${i}`} style={{ y }}>
              <rect
                x={130 - i * 1}
                y={baseY}
                width={340 + i * 2}
                height={12}
                rx={2.5}
                fill="url(#phyllo-side)"
                opacity={0.96}
              />
              <rect
                x={130 - i * 1}
                y={baseY}
                width={340 + i * 2}
                height={1}
                fill="#FFF2C8"
                opacity={0.2}
              />
            </motion.g>
          );
        })}

        {/* Specular highlight on the topmost sheet */}
        <ellipse cx="300" cy="200" rx="170" ry="34" fill="url(#hot-spot)" />

        {/* Pistachio crown — drifts upward as it opens */}
        <motion.g style={{ y: useTransform(separation, [0, 1], [0, -32]) }}>
          {Array.from({ length: 11 }).map((_, i) => (
            <ellipse
              key={i}
              cx={220 + i * 16}
              cy={220 + (i % 2 ? -4 : 4)}
              rx={4}
              ry={3}
              fill="#94B25F"
              opacity="0.9"
            />
          ))}
        </motion.g>
      </svg>
    </motion.div>
  );
}
