import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Avatar, StoryCard } from '@/components/story-card';
import { LikeButton } from '@/components/like-button';
import { formatDate, getDestination, getStory, stories } from '@/lib/data';

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/stories/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: 'Story not found' };
  return { title: story.title, description: story.excerpt };
}

export default async function StoryPage({ params }: PageProps<'/stories/[slug]'>) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const destination = getDestination(story.destinationSlug);

  // More stories: same destination first, then the most loved ones.
  const more = [...stories]
    .filter((item) => item.slug !== story.slug)
    .sort((a, b) => {
      const aSame = a.destinationSlug === story.destinationSlug ? 1 : 0;
      const bSame = b.destinationSlug === story.destinationSlug ? 1 : 0;
      return bSame - aSame || b.likes - a.likes;
    })
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
      <Link
        href="/explore"
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>All stories</span>
      </Link>

      <article className="mt-6 max-w-3xl mx-auto">
        {/* Cover */}
        <div
          className="h-40 md:h-56 rounded-[28px] flex items-center justify-center text-7xl md:text-8xl shadow-sm"
          style={{ background: destination?.tint ?? '#FCD8B5' }}
        >
          <span aria-hidden>{destination?.flag ?? '🌍'}</span>
        </div>

        <div className="mt-8">
          {destination && (
            <Link
              href={`/destinations/${destination.slug}`}
              className="inline-flex items-center text-[11px] font-black uppercase tracking-wider text-sky-600 hover:underline"
            >
              <MapPin className="w-3 h-3 mr-1" />
              {destination.name}
            </Link>
          )}

          <h1 className="mt-2 text-3xl md:text-4xl font-black tracking-tight leading-tight text-slate-900">
            {story.title}
          </h1>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Avatar name={story.author.name} handle={story.author.handle} size="md" />
              <div>
                <p className="text-sm font-extrabold text-slate-900">{story.author.name}</p>
                <p className="text-xs font-medium text-slate-500">
                  @{story.author.handle} · {formatDate(story.publishedAt)} · {story.readMinutes} min read
                </p>
              </div>
            </div>
            <LikeButton initial={story.likes} large />
          </div>

          <div className="mt-8 space-y-5 text-base font-medium leading-relaxed text-slate-700">
            {story.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      {/* More stories */}
      <section className="mt-14">
        <div className="bg-[#5FB58A] rounded-[28px] p-6 md:p-8 text-slate-900 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 mb-6">
            Keep reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {more.map((item) => (
              <StoryCard key={item.slug} story={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Share CTA */}
      <section className="mt-8">
        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-6 md:p-8 text-center">
          <h2 className="text-lg md:text-2xl font-black tracking-tight text-slate-900">
            Have a story like this?
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-600">
            Join WorldOverIP and share your own travel diary.
          </p>
          <Link
            href="/register"
            className="mt-5 inline-block bg-slate-900 hover:bg-slate-700 text-white rounded-full px-7 py-3.5 text-sm font-black shadow-sm transition"
          >
            Register for free
          </Link>
        </div>
      </section>
    </div>
  );
}