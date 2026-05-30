import { ImagePlaceholder, type ImagePlaceholderProps } from './ImagePlaceholder';

type Partial = Omit<ImagePlaceholderProps, 'id' | 'title' | 'direction'> & {
  id?: string;
  title?: string;
  direction?: string;
};

/**
 * The four canonical Silk photographs. Reuse them anywhere.
 * Replace each with a real <Image /> when shoots are delivered.
 */

export function MacroTexture(props: Partial = {}) {
  return (
    <ImagePlaceholder
      id="SLK-01 / Macro"
      title="The cross-section, in extreme close-up."
      direction="100mm macro · raking sidelight · honey catches the edge of each phyllo sheet · pistachio dust in focus, butter halo soft."
      palette="honey"
      {...props}
    />
  );
}

export function TheBreak(props: Partial = {}) {
  return (
    <ImagePlaceholder
      id="SLK-02 / Break"
      title="A piece lifted from the tray."
      direction="50mm · single piece pulled, layers separating mid-air · honey thread suspended · matte black surface · light from a single north window."
      palette="ember"
      {...props}
    />
  );
}

export function TheGift(props: Partial = {}) {
  return (
    <ImagePlaceholder
      id="SLK-03 / Gift"
      title="The box arriving on a desk."
      direction="Top-down, 35mm · keepsake box open beside a calling card · soft directional light · suggestion of a hand · executive desk surface, no logo visible."
      palette="paper"
      {...props}
    />
  );
}

export function TheCraft(props: Partial = {}) {
  return (
    <ImagePlaceholder
      id="SLK-04 / Craft"
      title="Hands brushing butter onto phyllo."
      direction="85mm · half-frame hands only, no faces · brass butter cup · slow shutter for one drip of butter · warm tungsten + cool window edge."
      palette="rose"
      {...props}
    />
  );
}

export function Harvest(props: Partial = {}) {
  return (
    <ImagePlaceholder
      id="SLK-05 / Harvest"
      title="Pistachios in the open hand."
      direction="Outdoor · grower's palm holding shelled Kerman pistachios · golden hour · slight wind, soft focus on background orchard."
      palette="pistachio"
      {...props}
    />
  );
}
