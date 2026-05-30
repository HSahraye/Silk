import { Hero } from '@/components/sections/Hero';
import { WhyRemember } from '@/components/sections/WhyRemember';
import { TasteProfile } from '@/components/sections/TasteProfile';
import { TheMoment } from '@/components/sections/TheMoment';
import { SilkStandard } from '@/components/sections/SilkStandard';
import { WhySilk } from '@/components/sections/WhySilk';
import { CorporateBand } from '@/components/sections/CorporateBand';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { CTA } from '@/components/sections/CTA';

/**
 * Homepage flow — desire-first.
 *   Hero            : sells the feeling, surfaces price + both CTAs
 *   WhyRemember     : emotional why
 *   TasteProfile    : sensory why
 *   TheMoment       : editorial gifting scenarios (replaces placeholder testimonials)
 *   SilkStandard    : the craft, demoted to justification
 *   WhySilk         : rational comparison, kept for the analytical reader
 *   CorporateBand   : the B2B door
 *   HowItWorks      : the simple promise
 *   CTA             : send a gift, primary
 */
export default function HomePage() {
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
