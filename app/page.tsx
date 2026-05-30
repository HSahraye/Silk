import { Hero } from '@/components/sections/Hero';
import { WhySilk } from '@/components/sections/WhySilk';
import { CorporateBand } from '@/components/sections/CorporateBand';
import { SilkStandard } from '@/components/sections/SilkStandard';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySilk />
      <SilkStandard />
      <CorporateBand />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}
