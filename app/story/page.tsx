import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { WhyRemember } from '@/components/sections/WhyRemember';
import { TasteProfile } from '@/components/sections/TasteProfile';
import { TheMoment } from '@/components/sections/TheMoment';
import { SilkStandard } from '@/components/sections/SilkStandard';
import { WhySilk } from '@/components/sections/WhySilk';
import { CorporateBand } from '@/components/sections/CorporateBand';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'The Silk Story',
  description:
    'How Silk reinvented baklava as a luxury gifting category — the moment, the taste, the craft, and the quiet logistics behind every box.',
};

export default function StoryPage() {
  return (
    <>
      <Hero />
      <WhyRemember />
      <TasteProfile />
      <TheMoment />
      <SilkStandard />
      <WhySilk />
      <CorporateBand />
      <HowItWorks />
      <CTA />
    </>
  );
}
