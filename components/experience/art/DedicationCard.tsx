'use client';

import { motion, type MotionValue, useTransform } from 'framer-motion';

/**
 * Dedication card sliding out of the gift box on Scene 5.
 * `reveal` 0..1: 0 = inside the box, 1 = lifted out and illuminated.
 */
export function DedicationCard({
  reveal,
  className,
}: {
  reveal: MotionValue<number>;
  className?: string;
}) {
  const y = useTransform(reveal, [0, 1], ['10%', '-25%']);
  const opacity = useTransform(reveal, [0, 0.15, 1], [0, 1, 1]);
  const rotate = useTransform(reveal, [0, 1], [-2, 1]);
  return (
    <motion.div
      className={className}
      style={{ y, opacity, rotate, willChange: 'transform, opacity' }}
    >
      <div className="relative">
        {/* Spotlight halo */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 blur-3xl"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 50%, rgba(255,236,184,0.35), transparent 70%)',
            opacity: useTransform(reveal, [0, 1], [0, 0.9]),
          }}
        />
        {/* The card */}
        <div className="relative aspect-[16/10] w-full max-w-[420px] overflow-hidden rounded-md bg-[#F7F1E2] paper shadow-2xl">
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <div className="font-display text-xl leading-snug text-[#1A130C]">
              With every layer,
              <br />
              our quiet thanks.
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#7A6A4D]">
              Silk · San Francisco
            </div>
          </div>
        </div>
        {/* Gloved hand suggestion (subtle) */}
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_70%)]"
        />
      </div>
    </motion.div>
  );
}
