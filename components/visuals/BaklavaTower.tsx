'use client';

import { motion } from 'framer-motion';

/**
 * Architectural baklava tower — pure SVG, no asset dependency.
 * Stacked hexagonal layers suggest hand-layered phyllo viewed in elevation.
 */
export function BaklavaTower({ className }: { className?: string }) {
  const layers = 14;
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto h-full w-full max-w-[520px]"
      >
        <svg
          viewBox="0 0 520 620"
          className="h-full w-full"
          aria-hidden="true"
          fill="none"
        >
          <defs>
            <linearGradient id="phyllo" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#F4ECD3" />
              <stop offset="55%" stopColor="#D9BF73" />
              <stop offset="100%" stopColor="#8C6418" />
            </linearGradient>
            <linearGradient id="phylloDark" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#B8862A" />
              <stop offset="100%" stopColor="#3F2D0F" />
            </linearGradient>
            <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#D9BF73" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#D9BF73" stopOpacity="0" />
            </radialGradient>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          {/* Ambient glow */}
          <ellipse cx="260" cy="540" rx="240" ry="60" fill="url(#glow)" />

          {/* Stacked layers */}
          {Array.from({ length: layers }).map((_, i) => {
            const y = 510 - i * 22;
            const w = 360 - i * 6;
            const x = (520 - w) / 2;
            const isAccent = i % 3 === 0;
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + i * 0.05,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <rect
                  x={x}
                  y={y - 14}
                  width={w}
                  height={14}
                  rx={3}
                  fill={isAccent ? 'url(#phyllo)' : 'url(#phylloDark)'}
                  opacity={0.95}
                />
                <rect
                  x={x}
                  y={y - 15}
                  width={w}
                  height={1}
                  fill="#FFF6DA"
                  opacity={0.25}
                />
              </motion.g>
            );
          })}

          {/* Crown — pistachio dusting */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: '260px 195px' }}
          >
            {Array.from({ length: 22 }).map((_, i) => {
              const angle = (i / 22) * Math.PI * 2;
              const r = 38 + (i % 3) * 4;
              const cx = 260 + Math.cos(angle) * r;
              const cy = 195 + Math.sin(angle) * r * 0.5;
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={2 + (i % 2)}
                  fill="#9ABE6F"
                  opacity={0.85}
                  filter="url(#soft)"
                />
              );
            })}
          </motion.g>

          {/* Top hairline highlight */}
          <line
            x1="120"
            y1="208"
            x2="400"
            y2="208"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
        </svg>

        {/* Floating tag */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -right-2 top-12 hidden rotate-[6deg] rounded-xl border border-line bg-bg-raised/80 px-3 py-2 text-xs backdrop-blur sm:block"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            Layer 23 / 41
          </div>
          <div className="mt-0.5 font-medium text-ink">Hand-folded phyllo</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
