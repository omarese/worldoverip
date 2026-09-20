import type { Metadata } from 'next';
import { StoryFeed } from '@/components/story-feed';
import { stories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Explore travel stories',
  description: 'Read travel diaries from around the world, from weekend city breaks to long road trips.',
};

export default function ExplorePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
      <StoryFeed
        stories={stories}
        headingAs="h1"
        title="Explore travel stories"
        subtitle="Diaries, tips and little discoveries from travellers everywhere."
      />
    </div>
  );
}