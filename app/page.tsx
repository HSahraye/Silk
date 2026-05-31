import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/experience/SmoothScroll';
import { SilkExperience } from '@/components/experience/SilkExperience';
import { ExperienceFollowOn } from '@/components/experience/ExperienceFollowOn';

export const metadata: Metadata = {
  title: 'Silk — Luxury corporate baklava gifting',
  description:
    'A scroll-driven tour of the Silk gifting moment — from architectural baklava to the dedication card placed inside the box.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <SmoothScroll>
      <SilkExperience />
      <ExperienceFollowOn />
    </SmoothScroll>
  );
}
