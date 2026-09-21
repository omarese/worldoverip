import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Camera, LayoutGrid } from 'lucide-react';
import { AvatarUploader } from '@/components/avatar-uploader';
import { BioEditor } from '@/components/bio-editor';
import { UserAvatar } from '@/components/user-avatar';
import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { formatMonthYear, publicUrl, type Post, type Profile } from '@/lib/social';

async function loadProfile(username: string) {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from('profiles')
    .select('id, username, bio, avatar_path, created_at')
    .eq('username', username.toLowerCase())
    .maybeSingle();
  return (data as Profile | null) ?? null;
}

export async function generateMetadata({
  params,
}: PageProps<'/u/[username]'>): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username.toLowerCase()}` };
}

export default async function ProfilePage({ params }: PageProps<'/u/[username]'>) {
  const { username } = await params;
  const profile = await loadProfile(username);
  if (!profile) notFound();

  const supabase = await createClient();
  const { data } = await supabase
    .from('posts')
    .select('id, user_id, image_path, caption, destination_slug, created_at')
    .eq('user_id', profile.id)
    .order('created_at', { ascending: false });
  const posts = (data as Post[] | null) ?? [];

  const viewer = await getCurrentUser();
  const isOwner = viewer?.id === profile.id;
  const avatarUrl = publicUrl('avatars', profile.avatar_path);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-20">
      {/* Profile header */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12">
        <div className="shrink-0">
          {isOwner ? (
            <AvatarUploader userId={profile.id} username={profile.username} avatarUrl={avatarUrl} />
          ) : (
            <UserAvatar
              username={profile.username}
              url={avatarUrl}
              className="w-28 h-28 sm:w-36 sm:h-36 text-4xl"
            />
          )}
        </div>

        <div className="flex-1 min-w-0 w-full space-y-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 break-all">
              {profile.username}
            </h1>
            {isOwner && (
              <>
                <Link
                  href="/settings/profile"
                  className="bg-white border border-slate-300 rounded-full px-4 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50 transition shadow-sm"
                >
                  Edit profile
                </Link>
                <Link
                  href="/new"
                  className="bg-slate-900 border border-slate-900 rounded-full px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 transition shadow-sm"
                >
                  Add post
                </Link>
              </>
            )}
          </div>

          <p className="text-sm font-medium text-slate-700">
            <span className="font-black text-slate-900">{posts.length}</span>{' '}
            {posts.length === 1 ? 'post' : 'posts'}
            <span className="mx-2 text-slate-400">·</span>
            Joined {formatMonthYear(profile.created_at)}
          </p>

          <BioEditor initialBio={profile.bio} editable={isOwner} />
        </div>
      </header>

      {/* Tab row */}
      <div className="mt-10 border-t border-slate-300/70 flex justify-center">
        <div className="-mt-px flex items-center space-x-2 border-t-2 border-slate-900 pt-3 text-xs font-extrabold tracking-wider uppercase text-slate-900">
          <LayoutGrid className="w-4 h-4" />
          <span>Posts</span>
        </div>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="mt-6 grid grid-cols-3 gap-1.5 sm:gap-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/p/${post.id}`}
              className="group relative block aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-slate-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={publicUrl('posts', post.image_path) ?? ''}
                alt={post.caption ? post.caption.slice(0, 80) : 'Post'}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center text-center gap-3">
          <div className="w-20 h-20 rounded-full border-2 border-slate-900 flex items-center justify-center">
            <Camera className="w-9 h-9 text-slate-900" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            {isOwner ? 'Share Photos' : 'No posts yet'}
          </h2>
          {isOwner ? (
            <>
              <p className="text-sm font-medium text-slate-600 max-w-xs">
                When you share photos, they will appear on your profile.
              </p>
              <Link href="/new" className="text-sm font-extrabold text-sky-700 hover:underline">
                Share your first photo
              </Link>
            </>
          ) : (
            <p className="text-sm font-medium text-slate-600">
              @{profile.username} has not shared anything yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}