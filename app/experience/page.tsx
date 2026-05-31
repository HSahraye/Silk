import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/experience/SmoothScroll';
import { SilkExperience } from '@/components/experience/SilkExperience';

export const metadata: Metadata = {
  title: 'The Silk Experience',
  description:
    'A scroll-driven tour of the Silk gifting moment — from architectural baklava to the dedication card placed inside the box.',
};

export default function ExperiencePage() {
  return (
    <SmoothScroll>
      <SilkExperience />
    </SmoothScroll>
  );
}
