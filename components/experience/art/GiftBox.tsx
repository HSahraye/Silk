'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';

/**
 * High-fidelity SVG render of the Silk keepsake box.
 *
 * Engineered to approach photoreal through:
 *   • Soft-touch matte body with micro-grain (fractal noise overlay)
 *   • Beveled top edge with key + fill light gradients
 *   • Magnetic-closure seam at the front face
 *   • Debossed Silk wordmark on the lid with inner-shadow filter
 *   • Foil blue mark with sharp specular highlight
 *   • Multi-layer cast shadow (contact + ambient occlusion blur)
 *   • Reflection plate underneath
 *   • Lid opens by rotateX, hinged at the back edge
 *
 * Props are MotionValues so the parent's scroll timeline drives everything.
 * Designed as a drop-in for <RealBox /> when a photorealistic render is delivered.
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
  // Map lidOpen 0..1 → -68deg for a believable hinge swing.
  const lidRotateX = useTransform(lidOpen, [0, 1], [0, -68]);
  const trayOpacity = useTransform(lidOpen, [0, 0.3, 1], [0, 0.5, 1]);
  const innerShadowOpacity = useTransform(lidOpen, [0, 1], [0, 0.55]);

  return (
    <motion.div
      style={{ rotate, perspective: 1400, willChange: 'transform' }}
      className={className}
    >
      <svg
        viewBox="0 0 1000 700"
        className="h-full w-full"
        aria-hidden
        fill="none"
      >
        <defs>
          {/* ────────── Materials ────────── */}
          {/* Soft-touch matte top */}
          <linearGradient id="box-top" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#1E1E24" />
            <stop offset="35%" stopColor="#16161B" />
            <stop offset="100%" stopColor="#06060A" />
          </linearGradient>
          {/* Front face */}
          <linearGradient id="box-front" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#13131A" />
            <stop offset="100%" stopColor="#040408" />
          </linearGradient>
          {/* Right side, slightly lighter from rim light */}
          <linearGradient id="box-right" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0A0A10" />
            <stop offset="100%" stopColor="#1A1A22" />
          </linearGradient>
          {/* Lid */}
          <linearGradient id="lid-top" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22222A" />
            <stop offset="40%" stopColor="#191921" />
            <stop offset="100%" stopColor="#0A0A11" />
          </linearGradient>
          <linearGradient id="lid-front" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1A1A22" />
            <stop offset="100%" stopColor="#0E0E15" />
          </linearGradient>

          {/* Foil mark — cyan gradient */}
          <linearGradient id="silk-foil" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#5BC6FF" />
            <stop offset="50%" stopColor="#3FA9E6" />
            <stop offset="100%" stopColor="#1F84C7" />
          </linearGradient>

          {/* Specular highlight on top */}
          <radialGradient id="top-key" cx="0.32" cy="0.18" r="0.5">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          {/* Warm rim from below */}
          <radialGradient id="warm-bounce" cx="0.5" cy="1" r="0.6">
            <stop offset="0%" stopColor="rgba(217,165,91,0.18)" />
            <stop offset="100%" stopColor="rgba(217,165,91,0)" />
          </radialGradient>
          {/* Lid specular */}
          <linearGradient id="lid-spec" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Tray interior */}
          <linearGradient id="tray-inner" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0A0604" />
            <stop offset="100%" stopColor="#15100A" />
          </linearGradient>
          <linearGradient id="piece-top" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#F2DCA0" />
            <stop offset="50%" stopColor="#D9A55B" />
            <stop offset="100%" stopColor="#7E4E1B" />
          </linearGradient>

          {/* Reflection plate gradient */}
          <linearGradient id="reflect" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(20,20,28,0.35)" />
            <stop offset="100%" stopColor="rgba(20,20,28,0)" />
          </linearGradient>

          {/* ────────── Filters ────────── */}
          {/* Soft-touch micro grain (subtle) */}
          <filter id="micro-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence baseFrequency="0.95" numOctaves="1" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0" />
            <feComposite in="SourceGraphic" operator="over" />
          </filter>
          <filter id="contact-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="ao-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feSpecularLighting in="b" surfaceScale="2" specularConstant="0.7" specularExponent="20" lightingColor="#FFFFFF" result="s">
              <feDistantLight azimuth="135" elevation="55" />
            </feSpecularLighting>
            <feComposite in="s" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>

        {/* ───── Cast shadow stack ───── */}
        <ellipse cx="500" cy="630" rx="430" ry="22" fill="rgba(0,0,0,0.7)" filter="url(#ao-shadow)" />
        <ellipse cx="500" cy="618" rx="380" ry="10" fill="rgba(0,0,0,0.5)" filter="url(#contact-shadow)" />

        {/* ───── Faint reflection plate ───── */}
        <rect x="80" y="525" width="840" height="85" fill="url(#reflect)" opacity="0.55" />

        {/* ───── BOX BODY ───── */}
        {/* Right side */}
        <path d="M820,360 L880,310 L880,470 L820,510 Z" fill="url(#box-right)" />
        {/* Front face */}
        <path d="M180,360 L820,360 L820,510 L180,510 Z" fill="url(#box-front)" />
        {/* Magnetic-closure seam (front) */}
        <line x1="200" y1="385" x2="800" y2="385" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        {/* Foil-stamped batch number */}
        <text x="780" y="495" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(180,150,90,0.55)" letterSpacing="2">
          BATCH · 041
        </text>
        {/* Top plane */}
        <path d="M180,360 L820,360 L880,310 L240,310 Z" fill="url(#box-top)" />
        {/* Top specular highlight */}
        <path d="M180,360 L820,360 L880,310 L240,310 Z" fill="url(#top-key)" />
        {/* Top warm bounce from below */}
        <path d="M180,360 L820,360 L880,310 L240,310 Z" fill="url(#warm-bounce)" opacity="0.55" />
        {/* Top edge keyline */}
        <line x1="240" y1="310" x2="880" y2="310" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line x1="240" y1="310" x2="180" y2="360" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* ───── INNER TRAY (visible as lid opens) ───── */}
        <motion.g style={{ opacity: trayOpacity }}>
          {/* Tray well */}
          <path d="M210,330 L790,330 L820,360 L240,360 Z" fill="url(#tray-inner)" />
          {/* Inner shadow at the back wall */}
          <motion.rect x="210" y="320" width="580" height="20" fill="black" style={{ opacity: innerShadowOpacity }} />
          {/* 9-piece tray hint */}
          {Array.from({ length: 9 }).map((_, i) => {
            const c = i % 3;
            const r = Math.floor(i / 3);
            const x = 250 + c * 175;
            const y = 332 + r * 9;
            return (
              <g key={i}>
                <rect x={x} y={y} width={150} height={7} rx={1.5} fill="url(#piece-top)" opacity="0.92" />
                <circle cx={x + 75} cy={y + 3.5} r={1.5} fill="#86B046" />
              </g>
            );
          })}
        </motion.g>

        {/* ───── LID — hinged at back edge ───── */}
        <motion.g
          style={{
            originX: '500px',
            originY: '310px',
            transformOrigin: '500px 310px',
            rotateX: lidRotateX,
            transformBox: 'fill-box',
          }}
        >
          {/* Lid front lip (visible when closed/closing) */}
          <path d="M180,310 L820,310 L820,335 L180,335 Z" fill="url(#lid-front)" />
          {/* Lid top */}
          <path d="M180,310 L820,310 L880,260 L240,260 Z" fill="url(#lid-top)" />
          {/* Lid specular sweep */}
          <path d="M180,310 L820,310 L880,260 L240,260 Z" fill="url(#lid-spec)" opacity="0.45" />
          {/* Top edge keyline */}
          <line x1="240" y1="260" x2="880" y2="260" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          <line x1="240" y1="260" x2="180" y2="310" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {/* SILK foil mark — debossed feel via outer + foil fills */}
          <g transform="translate(660 295)">
            {/* Mark — small s-glyph circle */}
            <circle r="13" cx="-30" cy="-2" fill="none" stroke="url(#silk-foil)" strokeWidth="1.8" />
            <path
              d="M-37,-8 C-34,-15 -24,-15 -22,-8 C-20,-3 -25,0 -30,0 C-35,0 -40,3 -37,8 C-34,14 -24,14 -22,6"
              stroke="url(#silk-foil)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Wordmark — slightly oversized, foil fill */}
            <text
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="26"
              fontWeight="600"
              fill="url(#silk-foil)"
              letterSpacing="-0.02em"
            >
              silk
            </text>
            {/* Tiny tagline foil */}
            <text
              y="14"
              fontFamily="ui-monospace, monospace"
              fontSize="6"
              fill="rgba(95,180,230,0.55)"
              letterSpacing="3"
            >
              SAN FRANCISCO
            </text>
          </g>
        </motion.g>
      </svg>
    </motion.div>
  );
}
