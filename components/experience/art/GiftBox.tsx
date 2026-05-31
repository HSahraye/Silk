'use client';

import { motion, type MotionValue } from 'framer-motion';

/**
 * Premium black keepsake gift box, in three pieces so the lid can open
 * and the box can rotate independently. SVG so it scales without loss.
 *
 * Props are MotionValues so the parent's scroll timeline drives everything.
 */
export function GiftBox({
  lidOpen,
  rotate,
  className,
}: {
  lidOpen: MotionValue<number>; // 0..1
  rotate: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.div
      style={{ rotate, perspective: 1200 }}
      className={className}
    >
      <svg
        viewBox="0 0 800 500"
        className="h-full w-full"
        aria-hidden
        fill="none"
      >
        <defs>
          <linearGradient id="box-top" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#1A1A1F" />
            <stop offset="100%" stopColor="#08080A" />
          </linearGradient>
          <linearGradient id="box-side" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#15151A" />
            <stop offset="100%" stopColor="#050507" />
          </linearGradient>
          <linearGradient id="lid-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#1E1E24" />
            <stop offset="100%" stopColor="#0A0A0D" />
          </linearGradient>
          <linearGradient id="silk-foil" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#5BC6FF" />
            <stop offset="100%" stopColor="#1F84C7" />
          </linearGradient>
          <radialGradient id="box-shine" cx="0.4" cy="0.2" r="0.6">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="box-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="400" cy="470" rx="320" ry="22" fill="rgba(0,0,0,0.55)" filter="url(#box-shadow)" />

        {/* Base (back face) */}
        <path d="M70,310 L730,310 L700,400 L100,400 Z" fill="url(#box-side)" />

        {/* Box body — top plane */}
        <path d="M70,310 L730,310 L660,250 L140,250 Z" fill="url(#box-top)" />
        <path d="M70,310 L730,310 L660,250 L140,250 Z" fill="url(#box-shine)" opacity="0.7" />

        {/* Tray inside (visible when lid is open) */}
        <motion.g style={{ opacity: lidOpen }}>
          <rect x="160" y="262" width="480" height="44" rx="4" fill="#1B0F08" />
          {/* 9-piece grid hint */}
          {Array.from({ length: 9 }).map((_, i) => {
            const c = i % 3;
            const r = Math.floor(i / 3);
            return (
              <rect
                key={i}
                x={180 + c * 150}
                y={268 + r * 14}
                width={130}
                height={10}
                rx={2}
                fill="#3F2C16"
                opacity="0.9"
              />
            );
          })}
        </motion.g>

        {/* Lid — opens by rotating around its back edge */}
        <motion.g
          style={{
            originX: '400px',
            originY: '250px',
          }}
        >
          <motion.g
            style={{
              transformOrigin: '400px 250px',
              rotateX: lidOpen,
              // useTransform from parent should map 0..1 → 0..-65deg before passing in
            }}
          >
            <path d="M70,250 L730,250 L660,200 L140,200 Z" fill="url(#lid-grad)" />
            <path d="M70,250 L730,250 L660,200 L140,200 Z" fill="url(#box-shine)" opacity="0.55" />
            {/* SILK wordmark on lid */}
            <g transform="translate(540 224)">
              <circle r="11" cx="-26" cy="-2" fill="none" stroke="url(#silk-foil)" strokeWidth="1.6" />
              <path
                d="M-32,-6 C-30,-12 -22,-12 -20,-6 C-18,-2 -22,0 -26,0 C-30,0 -34,2 -32,6 C-30,10 -22,10 -20,4"
                stroke="url(#silk-foil)"
                strokeWidth="1.6"
                fill="none"
              />
              <text
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="22"
                fontWeight="600"
                fill="url(#silk-foil)"
                letterSpacing="-0.02em"
              >
                silk
              </text>
            </g>
          </motion.g>
        </motion.g>

        {/* Bottom-front edge highlight */}
        <line x1="70" y1="310" x2="730" y2="310" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}
