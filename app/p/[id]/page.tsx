import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin } from 'lucide-react';
import { DeletePostButton } from '@/components/delete-post-button';
import { UserAvatar } from '@/components/user-avatar';
import { getCurrentUser } from '@/lib/auth';
import { getDestination } from '@/lib/data';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { formatLongDate, publicUrl, type Post, type Profile } from '@/lib/social';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const metadata: Metadata = { title: 'Post' };

export default async function PostPage({ params }: PageProps<'/p/[id]'>) {
  const { id } = await params;
  if (!isSupabaseConfigured || !UUID.test(id)) notFound();

  const supabase = await createClient();

  const { data: postData } = await supabase
    .from('posts')
    .select('id, user_id, image_path, caption, destination_slug, created_at')
    .eq('id', id)
    .maybeSingle();
  const post = postData as Post | null;
  if (!post) notFound();

  const { data: authorData } = await supabase
    .from('profiles')
    .select('id, username, bio, avatar_path, created_at')
    .eq('id', post.user_id)
    .maybeSingle();
  const author = authorData as Profile | null;
  if (!author) notFound();

  const viewer = await getCurrentUser();
  const isOwner = viewer?.id === author.id;
  const destination = post.destination_slug ? getDestination(post.destination_slug) : undefined;

  return (
    <div className="max-w-2xl mx-auto px-6 pt-10 pb-20">
      <Link
        href={`/u/${author.username}`}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>@{author.username}</span>
      </Link>

      <article className="mt-6 bg-white rounded-[28px] border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <Link href={`/u/${author.username}`} className="flex items-center space-x-3 min-w-0">
            <UserAvatar
              username={author.username}
              url={publicUrl('avatars', author.avatar_path)}
              className="w-10 h-10 text-sm"
            />
            <span className="min-w-0">
              <span className="block text-sm font-extrabold text-slate-900 truncate">{author.username}</span>
              <span className="block text-[11px] font-medium text-slate-500">
                {formatLongDate(post.created_at)}
              </span>
            </span>
          </Link>
          {destination && (
            <Link
              href={`/destinations/${destination.slug}`}
              className="inline-flex items-center space-x-1 text-[11px] font-black uppercase tracking-wider text-sky-600 hover:underline shrink-0"
            >
              <MapPin className="w-3 h-3" />
              <span>
                {destination.flag} {destination.name}
              </span>
            </Link>
          )}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={publicUrl('posts', post.image_path) ?? ''}
          alt={post.caption ? post.caption.slice(0, 80) : 'Post'}
          className="w-full bg-slate-100"
        />

        {post.caption && (
          <p className="px-5 py-5 text-sm font-medium leading-relaxed text-slate-700 whitespace-pre-line">
            <span className="font-black text-slate-900">{author.username}</span> {post.caption}
          </p>
        )}
      </article>

      {isOwner && (
        <div className="mt-5">
          <DeletePostButton postId={post.id} />
        </div>
      )}
    </div>
  );
}