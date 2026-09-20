'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

// Likes are only kept in the browser for now. Save them to your database once accounts exist.
export function LikeButton({ initial, large = false }: { initial: number; large?: boolean }) {
  const [liked, setLiked] = useState(false);
  const count = initial + (liked ? 1 : 0);

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? 'Unlike this story' : 'Like this story'}
      onClick={() => setLiked((value) => !value)}
      className={`relative z-10 inline-flex items-center space-x-1.5 rounded-full font-extrabold transition ${
        large
          ? 'bg-white border border-slate-300 shadow-sm px-4 py-2 text-xs hover:bg-slate-50'
          : 'px-2 py-1 text-[11px] hover:bg-slate-100'
      } ${liked ? 'text-rose-600' : 'text-slate-600'}`}
    >
      <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
      <span>{count}</span>
    </button>
  );
}