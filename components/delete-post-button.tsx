'use client';

import { useState, useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { deletePost } from '@/lib/actions/posts';

export function DeletePostButton({ postId }: { postId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    setError(null);
    startTransition(async () => {
      // On success this redirects to your profile.
      const result = await deletePost(postId);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="inline-flex items-center space-x-1.5 bg-white border border-slate-300 rounded-full px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-60 transition shadow-sm"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>{pending ? 'Deleting…' : 'Delete post'}</span>
      </button>
      {error && (
        <p role="alert" className="mt-2 text-xs font-bold text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}