import Link from 'next/link';
import { storyCount, type Destination } from '@/lib/data';

export function DestinationCard({ destination }: { destination: Destination }) {
  const count = storyCount(destination.slug);

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group bg-white hover:shadow-md transition-all rounded-xl px-4 py-3 flex items-center space-x-3 shadow-sm"
    >
      <span
        aria-hidden
        className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
        style={{ background: destination.tint }}
      >
        {destination.flag}
      </span>
      <span className="min-w-0">
        <span className="block font-extrabold text-xs text-slate-900 group-hover:text-sky-600 transition">
          {destination.name}
        </span>
        <span className="block text-[11px] font-medium text-slate-500">
          {count} {count === 1 ? 'story' : 'stories'}
        </span>
      </span>
    </Link>
  );
}