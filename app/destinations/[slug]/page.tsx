import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { StoryCard } from '@/components/story-card';
import { destinations, getDestination, storiesForDestination } from '@/lib/data';

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/destinations/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return { title: 'Destination not found' };
  return {
    title: `${destination.name} travel stories`,
    description: `Read travel diaries and tips about ${destination.name} from the WorldOverIP community.`,
  };
}

export default async function DestinationPage({ params }: PageProps<'/destinations/[slug]'>) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const list = storiesForDestination(destination.slug);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
      <Link
        href="/destinations"
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>All destinations</span>
      </Link>

      <div className="mt-6 text-center space-y-3 mb-10">
        <div
          aria-hidden
          className="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-sm"
          style={{ background: destination.tint }}
        >
          {destination.flag}
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
          {destination.name}
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base">
          {destination.blurb} · {destination.region}
        </p>
      </div>

      {list.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-8 text-center">
          <p className="text-sm font-medium text-slate-600">
            Nobody has shared a story about {destination.name} yet. Be the first!
          </p>
          <Link
            href="/register"
            className="mt-5 inline-block bg-slate-900 hover:bg-slate-700 text-white rounded-full px-6 py-3 text-sm font-black shadow-sm transition"
          >
            Register to share yours
          </Link>
        </div>
      )}
    </div>
  );
}