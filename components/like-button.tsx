'use client';

import { useState, useTransition } from 'react';
import { Heart } from 'lucide-react';
import { toggleLike } from '@/lib/actions/social';

export function LikeButton({
  postId,
  initial,
  initialCount,
  initialLiked = false,
  large = false,
}: {
  postId?: string;
  /** @deprecated use initialCount — kept for static StoryCard */
  initial?: number;
  initialCount?: number;
  initialLiked?: boolean;
  large?: boolean;
}) {
  const startCount = initialCount ?? initial ?? 0;
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(startCount);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!postId) {
      setLiked((v) => !v);
      setCount((c) => c + (liked ? -1 : 1));
      return;
    }

    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));

    startTransition(async () => {
      const result = await toggleLike(postId);
      if (result.error) {
        setLiked(!nextLiked);
        setCount((c) => c + (nextLiked ? -1 : 1));
        return;
      }
      if (typeof result.liked === 'boolean') {
        setLiked(result.liked);
      }
    });
  }

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
      disabled={pending}
      onClick={handleClick}
      className={`relative z-10 inline-flex items-center space-x-1.5 rounded-full font-extrabold transition disabled:opacity-60 ${
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