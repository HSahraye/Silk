'use client';

import Image from 'next/image';
import { motion, type MotionValue } from 'framer-motion';

/**
 * Production render swap slot.
 *
 * Drop a photorealistic PNG (with transparent background) into
 * `/public/products/silk-box-hero.png` and this component renders it
 * with the same float / rotate behavior as the SVG GiftBox.
 *
 * RENDER BRIEF — hand to your 3D artist:
 *   Subject     : The Silk keepsake box, closed, lid slightly forward
 *   Format      : PNG, 1600×1000, transparent background
 *   Camera      : 35mm equiv, slight 3/4 angle, eye-level
 *   Lighting    : 3-point — soft key from upper-left, warm fill from lower-right,
 *                 cool rim from behind. Practicals: a faint blue foil reflection on the lid.
 *   Materials   :
 *     - Box body : matte soft-touch black (textured, not glossy plastic), micro grain
 *     - Lid      : same body finish, with a debossed wordmark catching a single highlight
 *     - Foil mark: cool blue-cyan gradient (#5BC6FF → #1F84C7), real specular
 *     - Magnetic closure: subtle visible seam at the front, no metal showing
 *   Shadow      : contact shadow + 3% ambient occlusion blur underneath
 *   File name   : silk-box-hero.png  (also export _lid-open.png for scene 5)
 *
 * Also export an alpha-clean cross-section render of one baklava piece:
 *   silk-baklava-piece.png — top-down 3/4, layers + cross-section visible,
 *   honey thread suspended, pistachio crown lit by key, walnut chunk visible
 */
export function RealBox({
  src,
  alt,
  lidOpen,
  rotate,
  className,
}: {
  src: string;
  alt: string;
  lidOpen?: MotionValue<number>;
  rotate?: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.div
      style={{ rotate, perspective: 1200, willChange: 'transform' }}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        priority
        className="h-auto w-full select-none"
        draggable={false}
      />
      {/* Lid overlay (optional) — if the renderer exports an _lid-open variant,
          wire a crossfade here based on `lidOpen`. */}
    </motion.div>
  );
}
