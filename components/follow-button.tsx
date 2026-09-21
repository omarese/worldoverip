'use client';

import { useState, useTransition } from 'react';
import { UserPlus, UserMinus } from 'lucide-react';
import { toggleFollow } from '@/lib/actions/social';

export function FollowButton({
  targetUserId,
  initialFollowing = false,
}: {
  targetUserId: string;
  initialFollowing?: boolean;
}) {
  const [following, setFollowing] = useState(initialFollowing);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    setError(null);
    const next = !following;
    setFollowing(next);

    startTransition(async () => {
      const result = await toggleFollow(targetUserId);
      if (result.error) {
        setFollowing(!next);
        setError(result.error);
        return;
      }
      if (typeof result.following === 'boolean') {
        setFollowing(result.following);
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className={`inline-flex items-center space-x-1.5 rounded-full px-4 py-2 text-xs font-black shadow-sm transition disabled:opacity-60 ${
          following
            ? 'bg-white border border-slate-300 text-slate-900 hover:bg-slate-50'
            : 'bg-slate-900 border border-slate-900 text-white hover:bg-slate-700'
        }`}
      >
        {following ? (
          <>
            <UserMinus className="w-3.5 h-3.5" />
            <span>{pending ? '…' : 'Following'}</span>
          </>
        ) : (
          <>
            <UserPlus className="w-3.5 h-3.5" />
            <span>{pending ? '…' : 'Follow'}</span>
          </>
        )}
      </button>
      {error && (
        <p role="alert" className="mt-1.5 text-[11px] font-bold text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}