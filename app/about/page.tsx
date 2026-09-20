import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPage, InfoSection } from '@/components/info-page';

export const metadata: Metadata = {
  title: 'About',
  description: 'WorldOverIP is a travel diary community where people share their trips.',
};

export default function AboutPage() {
  return (
    <InfoPage
      title="About WorldOverIP"
      intro="A place to keep your travel memories and to find inspiration for the next trip."
    >
      <InfoSection title="What is WorldOverIP?">
        <p>
          WorldOverIP is a travel diary community. Travellers write about the places they visit,
          the small discoveries along the way and the tips they wish they had known before leaving.
        </p>
        <p>
          Every story is pinned to a destination, so you can read about a country before you go,
          or relive a trip long after you get home.
        </p>
      </InfoSection>

      <InfoSection title="How it works">
        <p>1. Create a free account and pick a username.</p>
        <p>2. Write about your trip, day by day or as one big story.</p>
        <p>3. Share it with the community and follow other travellers for more inspiration.</p>
      </InfoSection>

      <InfoSection title="What we care about">
        <p>
          Honest stories over perfect ones, respect for the places and people you visit, and a
          friendly community. Read our{' '}
          <Link href="/guidelines" className="font-bold text-slate-900 underline hover:text-sky-600">
            community guidelines
          </Link>{' '}
          to see how we keep it that way.
        </p>
      </InfoSection>
    </InfoPage>
  );
}