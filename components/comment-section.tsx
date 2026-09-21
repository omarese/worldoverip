'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { UserAvatar } from '@/components/user-avatar';
import { addComment, deleteComment } from '@/lib/actions/social';
import { COMMENT_MAX, formatLongDate, publicUrl } from '@/lib/social';

export type CommentView = {
  id: string;
  body: string;
  created_at: string;
  user_id: string;
  username: string;
  avatar_path: string | null;
};

export function CommentSection({
  postId,
  comments: initialComments,
  currentUserId,
  isLoggedIn,
}: {
  postId: string;
  comments: CommentView[];
  currentUserId?: string;
  isLoggedIn: boolean;
}) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) return;
    const body = text.trim();
    if (!body) return;
    setError(null);

    startTransition(async () => {
      const result = await addComment(postId, body);
      if (result.error) {
        setError(result.error);
        return;
      }
      setText('');
      window.location.reload();
    });
  }

  function handleDelete(commentId: string) {
    if (!window.confirm('Delete this comment?')) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteComment(commentId, postId);
      if (result.error) {
        setError(result.error);
        return;
      }
      setComments((list) => list.filter((c) => c.id !== commentId));
    });
  }

  return (
    <div className="mt-6 bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-5 md:p-6">
      <h2 className="text-sm font-black tracking-tight text-slate-900">
        Comments {comments.length > 0 && <span className="text-slate-500 font-bold">({comments.length})</span>}
      </h2>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={COMMENT_MAX}
            rows={2}
            placeholder="Write a comment…"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 transition resize-none"
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-slate-400">
              {text.length}/{COMMENT_MAX}
            </span>
            <button
              type="submit"
              disabled={pending || !text.trim()}
              className="bg-slate-900 hover:bg-slate-700 disabled:opacity-50 text-white rounded-full px-5 py-2 text-xs font-black shadow-sm transition"
            >
              {pending ? 'Posting…' : 'Post comment'}
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-3 text-xs font-medium text-slate-600">
          <Link href="/login" className="font-extrabold text-sky-700 hover:underline">
            Login
          </Link>{' '}
          to leave a comment.
        </p>
      )}

      {error && (
        <p role="alert" className="mt-2 text-xs font-bold text-rose-600">
          {error}
        </p>
      )}

      <ul className="mt-5 space-y-4">
        {comments.length === 0 ? (
          <li className="text-xs font-medium text-slate-500">No comments yet. Be the first.</li>
        ) : (
          comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <Link href={`/u/${c.username}`} className="shrink-0">
                <UserAvatar
                  username={c.username}
                  url={publicUrl('avatars', c.avatar_path)}
                  className="w-8 h-8 text-[10px]"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    <Link
                      href={`/u/${c.username}`}
                      className="font-extrabold text-slate-900 hover:text-sky-700 transition"
                    >
                      @{c.username}
                    </Link>{' '}
                    {c.body}
                  </p>
                  {currentUserId === c.user_id && (
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id)}
                      disabled={pending}
                      aria-label="Delete comment"
                      className="shrink-0 p-1 text-slate-400 hover:text-rose-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                  {formatLongDate(c.created_at)}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}