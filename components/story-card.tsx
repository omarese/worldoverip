import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { LikeButton } from '@/components/like-button';
import {
  avatarColor,
  formatDate,
  getDestination,
  initials,
  type Story,
} from '@/lib/data';

export function Avatar({ name, handle, size = 'sm' }: { name: string; handle: string; size?: 'sm' | 'md' }) {
  return (
    <span
      aria-hidden
      className={`shrink-0 rounded-full flex items-center justify-center font-black text-slate-900 ${
        size === 'md' ? 'w-10 h-10 text-sm' : 'w-7 h-7 text-[10px]'
      }`}
      style={{ background: avatarColor(handle) }}
    >
      {initials(name)}
    </span>
  );
}

export function StoryCard({ story }: { story: Story }) {
  const destination = getDestination(story.destinationSlug);

  return (
    <article className="group relative bg-white hover:shadow-md transition-all rounded-2xl overflow-hidden flex flex-col text-left shadow-sm">
      {/* Cover */}
      <div
        className="h-28 flex items-center justify-center text-5xl"
        style={{ background: destination?.tint ?? '#FCD8B5' }}
      >
        <span aria-hidden>{destination?.flag ?? '🌍'}</span>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {destination && (
          <p className="flex items-center text-[11px] font-black uppercase tracking-wider text-sky-600">
            <MapPin className="w-3 h-3 mr-1" />
            {destination.name}
          </p>
        )}

        <h3 className="mt-1.5 text-sm font-black text-slate-900 leading-snug group-hover:text-sky-600 transition">
          <Link href={`/stories/${story.slug}`} className="after:absolute after:inset-0">
            {story.title}
          </Link>
        </h3>

        <p className="mt-1.5 text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
          {story.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 min-w-0">
            <Avatar name={story.author.name} handle={story.author.handle} />
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold text-slate-900 truncate">{story.author.name}</p>
              <p className="text-[10px] font-medium text-slate-500">
                {formatDate(story.publishedAt)} · {story.readMinutes} min read
              </p>
            </div>
          </div>
          <LikeButton initial={story.likes} />
        </div>
      </div>
    </article>
  );
}