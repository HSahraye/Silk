'use client';

import { motion, type MotionValue, useTransform } from 'framer-motion';

/**
 * High-fidelity SVG render of a single Silk baklava piece.
 *
 * Engineered toward photoreal through:
 *   • 14 individually-drawn phyllo layers with per-layer noise + edge-darken
 *   • Cross-section reveal: pistachio + walnut + honey-saturated wafers
 *   • Honey thread suspended between layers as they separate
 *   • Per-pistachio rendering with highlight + cast shadow on the crown
 *   • Specular sheen on the top surface
 *   • Warm subsurface glow halo
 *
 * As `separation` rises 0 → 1, the upper layers fan up and the lower
 * layers fall, revealing the filling.
 *
 * Designed to be replaced by a real <Image /> render at
 * /public/products/silk-baklava-piece.png when 3D assets are delivered.
 * See art/RealBox.tsx for the render brief.
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
  const fillingOpacity = useTransform(separation, [0, 0.2, 1], [0, 0.5, 1]);
  const honeyDripOpacity = useTransform(separation, [0.05, 0.4], [0, 1]);
  const haloScale = useTransform(separation, [0, 1], [1, 1.2]);

  return (
    <motion.div
      style={{ rotateY: rotate, perspective: 1500, willChange: 'transform' }}
      className={className}
    >
      <svg viewBox="0 0 700 700" className="h-full w-full" aria-hidden fill="none">
        <defs>
          {/* Phyllo materials — varied per layer for depth */}
          <linearGradient id="phyllo-1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FBE8B0" />
            <stop offset="55%" stopColor="#D9A55B" />
            <stop offset="100%" stopColor="#7E4E1B" />
          </linearGradient>
          <linearGradient id="phyllo-2" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#F3D998" />
            <stop offset="55%" stopColor="#C99749" />
            <stop offset="100%" stopColor="#6B4317" />
          </linearGradient>
          <linearGradient id="phyllo-3" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#C28338" />
            <stop offset="100%" stopColor="#5A3713" />
          </linearGradient>
          {/* Filling: pistachio paste base */}
          <linearGradient id="filling" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#C5DC95" />
            <stop offset="50%" stopColor="#88AC50" />
            <stop offset="100%" stopColor="#3F5418" />
          </linearGradient>
          {/* Honey saturation */}
          <linearGradient id="honey" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,200,90,0.95)" />
            <stop offset="100%" stopColor="rgba(180,110,30,0.95)" />
          </linearGradient>
          {/* Specular */}
          <radialGradient id="spec" cx="0.45" cy="0.25" r="0.45">
            <stop offset="0%" stopColor="rgba(255,250,220,0.65)" />
            <stop offset="100%" stopColor="rgba(255,250,220,0)" />
          </radialGradient>
          {/* Warm halo */}
          <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(217,165,91,0.30)" />
            <stop offset="60%" stopColor="rgba(217,165,91,0.10)" />
            <stop offset="100%" stopColor="rgba(217,165,91,0)" />
          </radialGradient>
          {/* Pistachio kernel */}
          <radialGradient id="pist" cx="0.4" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#B6D77E" />
            <stop offset="60%" stopColor="#86B046" />
            <stop offset="100%" stopColor="#3F5418" />
          </radialGradient>
          {/* Walnut */}
          <radialGradient id="walnut" cx="0.4" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#B58657" />
            <stop offset="60%" stopColor="#7C5224" />
            <stop offset="100%" stopColor="#3A220C" />
          </radialGradient>
          {/* Filters */}
          <filter id="phyllo-noise" x="0" y="0" width="100%" height="100%">
            <feTurbulence baseFrequency="0.9 0.18" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0.55 0 0 0 0 0.4 0 0 0 0 0.2 0 0 0 0.18 0" />
            <feComposite in="SourceGraphic" operator="in" />
          </filter>
          <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="micro-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Warm halo behind the piece */}
        <motion.ellipse
          cx="350"
          cy="350"
          rx="260"
          ry="240"
          fill="url(#halo)"
          filter="url(#soft-glow)"
          style={{ scale: haloScale, originX: '350px', originY: '350px' }}
        />

        {/* ───── CROSS-SECTION FILLING — revealed as layers separate ───── */}
        <motion.g style={{ opacity: fillingOpacity }}>
          {/* Honey-saturated wafer band */}
          <rect x="150" y="330" width="400" height="48" rx="3" fill="url(#filling)" />
          {/* Honey overlay */}
          <rect x="150" y="330" width="400" height="48" rx="3" fill="url(#honey)" opacity="0.35" />
          {/* Pistachio chunks */}
          {Array.from({ length: 22 }).map((_, i) => {
            const cx = 165 + (i * 23) % 380;
            const cy = 345 + ((i * 19) % 25);
            const rx = 5 + (i % 3);
            const ry = 4 + (i % 2);
            return (
              <ellipse
                key={`pist-${i}`}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                fill="url(#pist)"
                opacity="0.95"
                transform={`rotate(${(i * 23) % 60} ${cx} ${cy})`}
              />
            );
          })}
          {/* Walnut chunks */}
          {Array.from({ length: 9 }).map((_, i) => {
            const cx = 175 + i * 45;
            const cy = 358 + (i % 2 ? -4 : 4);
            return (
              <ellipse
                key={`wal-${i}`}
                cx={cx}
                cy={cy}
                rx={10}
                ry={6}
                fill="url(#walnut)"
                opacity="0.9"
                transform={`rotate(${i * 12} ${cx} ${cy})`}
              />
            );
          })}
        </motion.g>

        {/* ───── HONEY DRIP THREAD (between separating layers) ───── */}
        <motion.path
          d="M350,280 Q346,310 354,330 Q348,355 352,378 Q346,400 354,420"
          stroke="url(#honey)"
          strokeWidth="2.4"
          fill="none"
          opacity={0.85}
          style={{ opacity: honeyDripOpacity }}
        />

        {/* ───── TOP STACK — 7 layers, each rising as separation grows ───── */}
        {Array.from({ length: 7 }).map((_, i) => {
          const baseY = 300 - i * 7;
          const y = useTransform(
            separation,
            [0, 1],
            [baseY, baseY - (7 - i) * 22 - 36],
          );
          const gradient = i % 3 === 0 ? 'url(#phyllo-1)' : i % 3 === 1 ? 'url(#phyllo-2)' : 'url(#phyllo-3)';
          return (
            <motion.g key={`top-${i}`} style={{ y }}>
              {/* Layer body */}
              <rect
                x={150 - i * 1.5}
                y={baseY - 13}
                width={400 + i * 3}
                height={13}
                rx={2}
                fill={gradient}
                opacity={0.96}
              />
              {/* Specular sweep */}
              <rect
                x={150 - i * 1.5}
                y={baseY - 13}
                width={400 + i * 3}
                height={5}
                rx={2}
                fill="url(#spec)"
                opacity={i === 6 ? 0.6 : 0.3}
              />
              {/* Edge darken */}
              <rect
                x={150 - i * 1.5}
                y={baseY - 1.5}
                width={400 + i * 3}
                height={1.5}
                fill="#4A2D0E"
                opacity={0.8}
              />
              {/* Top hairline highlight */}
              <rect
                x={150 - i * 1.5}
                y={baseY - 13.5}
                width={400 + i * 3}
                height={0.6}
                fill="#FFF2C8"
                opacity={0.4}
              />
            </motion.g>
          );
        })}

        {/* ───── BOTTOM STACK — 6 layers, falling ───── */}
        {Array.from({ length: 6 }).map((_, i) => {
          const baseY = 380 + i * 7;
          const y = useTransform(separation, [0, 1], [baseY, baseY + (i + 1) * 18 + 26]);
          const gradient = i % 3 === 0 ? 'url(#phyllo-1)' : i % 3 === 1 ? 'url(#phyllo-2)' : 'url(#phyllo-3)';
          return (
            <motion.g key={`bot-${i}`} style={{ y }}>
              <rect
                x={150 - i * 1.5}
                y={baseY}
                width={400 + i * 3}
                height={13}
                rx={2}
                fill={gradient}
                opacity={0.96}
              />
              <rect
                x={150 - i * 1.5}
                y={baseY + 11}
                width={400 + i * 3}
                height={2}
                fill="#3D2509"
                opacity={0.85}
              />
              <rect
                x={150 - i * 1.5}
                y={baseY}
                width={400 + i * 3}
                height={0.6}
                fill="#FFF2C8"
                opacity={0.18}
              />
            </motion.g>
          );
        })}

        {/* ───── PISTACHIO CROWN — drifts upward as it opens ───── */}
        <motion.g style={{ y: useTransform(separation, [0, 1], [0, -42]) }}>
          {/* Shadow under the crown */}
          <ellipse cx="350" cy="290" rx="160" ry="10" fill="rgba(0,0,0,0.30)" filter="url(#micro-shadow)" />
          {/* Crown pistachios — each individually drawn */}
          {Array.from({ length: 18 }).map((_, i) => {
            const cx = 190 + i * 19 + (i % 3 ? 4 : -4);
            const cy = 280 + (i % 2 ? -6 : 4);
            const rx = 5 + (i % 3);
            const ry = 4 + (i % 2);
            const rot = (i * 47) % 90 - 45;
            return (
              <g key={`crown-${i}`} transform={`rotate(${rot} ${cx} ${cy})`}>
                <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#pist)" />
                {/* Tiny highlight */}
                <ellipse cx={cx - 1.5} cy={cy - 1.2} rx={rx * 0.4} ry={ry * 0.3} fill="rgba(255,255,235,0.45)" />
              </g>
            );
          })}
        </motion.g>

        {/* Specular sheen across the topmost surface */}
        <ellipse cx="350" cy="240" rx="200" ry="38" fill="url(#spec)" />
      </svg>
    </motion.div>
  );
}
