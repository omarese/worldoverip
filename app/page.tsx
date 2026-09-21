import Link from 'next/link';
import { BookOpen, MapPin, Users, Heart, PenLine, Camera } from 'lucide-react';
import { StoryFeed } from '@/components/story-feed';
import { DestinationCard } from '@/components/destination-card';
import { UserAvatar } from '@/components/user-avatar';
import { LikeButton } from '@/components/like-button';
import { destinations, stories, getDestination } from '@/lib/data';
import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { formatLongDate, publicUrl, type Post, type Profile } from '@/lib/social';

const features = [
  { Icon: BookOpen, text: 'Write diary-style posts for every day of your trip' },
  { Icon: MapPin, text: 'Pin each story to a country so others can find it' },
  { Icon: Users, text: 'Follow travellers and get inspired by their journeys' },
  { Icon: Heart, text: 'Like the stories that make you want to pack your bag' },
];

type FeedPost = Post & {
  author: Pick<Profile, 'id' | 'username' | 'avatar_path'>;
  likeCount: number;
  likedByMe: boolean;
};

async function loadFeedPosts(viewerId?: string, limit = 40): Promise<FeedPost[]> {
  if (!isSupabaseConfigured) return [];

  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('id, user_id, image_path, caption, destination_slug, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (!posts?.length) return [];

  const userIds = [...new Set(posts.map((p) => p.user_id))];
  const postIds = posts.map((p) => p.id);

  const [{ data: profiles }, { data: likes }] = await Promise.all([
    supabase.from('profiles').select('id, username, avatar_path').in('id', userIds),
    supabase.from('post_likes').select('post_id, user_id').in('post_id', postIds),
  ]);

  const byId = new Map((profiles ?? []).map((p) => [p.id, p]));
  const likeCountByPost = new Map<string, number>();
  const likedByMe = new Set<string>();
  for (const like of likes ?? []) {
    likeCountByPost.set(like.post_id, (likeCountByPost.get(like.post_id) ?? 0) + 1);
    if (viewerId && like.user_id === viewerId) likedByMe.add(like.post_id);
  }

  return posts
    .map((post) => {
      const author = byId.get(post.user_id);
      if (!author) return null;
      return {
        ...(post as Post),
        author: {
          id: author.id,
          username: author.username,
          avatar_path: author.avatar_path,
        },
        likeCount: likeCountByPost.get(post.id) ?? 0,
        likedByMe: likedByMe.has(post.id),
      };
    })
    .filter((p): p is FeedPost => p !== null);
}

function MarketingHome() {
  return (
    <div className="pb-20">
      <section className="relative z-10 pt-12 pb-6 px-6 max-w-5xl mx-auto text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
          Share your journey, wherever you travel,
          <br className="hidden md:block" /> and inspire the next trip
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base">
          Keep a travel diary, share your favourite places and discover stories from travellers
          around the world.
        </p>
      </section>

      <section className="relative z-20 pb-10 px-4 max-w-[96%] mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-slate-300/80 hidden md:block" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mx-auto">
            <Link
              href="/register"
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-700 text-white rounded-full px-7 py-3.5 text-sm font-black shadow-sm transition"
            >
              <PenLine className="w-4 h-4" />
              <span>Share your first trip</span>
            </Link>
            <Link
              href="/explore"
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 rounded-full px-7 py-3.5 text-sm font-extrabold shadow-sm transition"
            >
              Explore stories
            </Link>
          </div>
          <div className="flex-1 h-[1px] bg-slate-300/80 hidden md:block" />
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 my-6">
        <div className="bg-[#78C8DB] rounded-[28px] p-6 md:p-10 text-slate-900 relative overflow-hidden shadow-sm">
          <h2 className="text-xl md:text-3xl font-black text-center mb-8 tracking-tight leading-tight">
            Why do travellers love sharing on WorldOverIP?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-slate-900" />
                </div>
                <p className="text-xs font-extrabold leading-snug px-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 my-8">
        <StoryFeed
          stories={stories}
          limit={6}
          title="Fresh from the road"
          subtitle="The latest and most loved travel stories from our community."
          viewAllHref="/explore"
        />
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 my-8">
        <div className="bg-[#FCD8B5] rounded-[28px] p-6 md:p-8 text-slate-900 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
                Where do you want to go next?
              </h2>
              <p className="text-xs text-slate-900/80 font-medium">
                Pick a destination and read what travellers say about it.
              </p>
            </div>
            <Link
              href="/destinations"
              className="bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs px-4 py-2.5 rounded-full shadow-sm transition self-start md:self-auto shrink-0"
            >
              View all destinations
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {destinations.slice(0, 6).map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 my-8">
        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-6 md:p-10 text-center">
          <h2 className="text-xl md:text-3xl font-black tracking-tight text-slate-900">
            Got a trip worth sharing?
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-600 max-w-xl mx-auto">
            Create a free account and start your travel diary. Your next trip could be someone
            else’s inspiration.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="bg-slate-900 hover:bg-slate-700 text-white rounded-full px-7 py-3.5 text-sm font-black shadow-sm transition"
            >
              Register for free
            </Link>
            <Link
              href="/login"
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 rounded-full px-7 py-3.5 text-sm font-extrabold shadow-sm transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeedHome({ posts }: { posts: FeedPost[] }) {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">Home</h1>
          <p className="text-sm font-medium text-slate-600 mt-0.5">
            Latest posts from travellers around the world
          </p>
        </div>
        <Link
          href="/new"
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-white rounded-full px-4 py-2.5 text-xs font-black shadow-sm transition shrink-0"
        >
          <PenLine className="w-3.5 h-3.5" />
          <span>New post</span>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-10 text-center">
          <div className="mx-auto w-16 h-16 rounded-full border-2 border-slate-900 flex items-center justify-center mb-4">
            <Camera className="w-7 h-7 text-slate-900" />
          </div>
          <h2 className="text-xl font-black tracking-tight text-slate-900">No posts yet</h2>
          <p className="mt-2 text-sm font-medium text-slate-600 max-w-sm mx-auto">
            Be the first to share a photo from your trip. Your post will show up here for everyone.
          </p>
          <Link
            href="/new"
            className="mt-6 inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-white rounded-full px-6 py-3 text-sm font-black shadow-sm transition"
          >
            <PenLine className="w-4 h-4" />
            Share your first photo
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => {
            const destination = post.destination_slug
              ? getDestination(post.destination_slug)
              : undefined;
            const imageUrl = publicUrl('posts', post.image_path);

            return (
              <article
                key={post.id}
                className="bg-white rounded-[24px] border border-slate-200/80 shadow-sm overflow-hidden"
              >
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <Link
                    href={`/u/${post.author.username}`}
                    className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition"
                  >
                    <UserAvatar
                      username={post.author.username}
                      url={publicUrl('avatars', post.author.avatar_path)}
                      className="w-9 h-9 text-xs"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-slate-900 truncate">
                        @{post.author.username}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500">
                        {formatLongDate(post.created_at)}
                      </p>
                    </div>
                  </Link>
                  {destination && (
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-sky-700 hover:text-sky-900 shrink-0"
                    >
                      <MapPin className="w-3 h-3" />
                      {destination.name}
                    </Link>
                  )}
                </div>

                <Link href={`/p/${post.id}`} className="block bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl ?? ''}
                    alt={post.caption ? post.caption.slice(0, 100) : 'Travel photo'}
                    loading="lazy"
                    className="w-full aspect-square object-cover"
                  />
                </Link>

                <div className="px-4 pt-3 flex items-center gap-3">
                  <LikeButton
                    postId={post.id}
                    initialCount={post.likeCount}
                    initialLiked={post.likedByMe}
                  />
                  <Link
                    href={`/p/${post.id}`}
                    className="text-[11px] font-extrabold text-slate-500 hover:text-sky-600 transition"
                  >
                    Comment
                  </Link>
                </div>

                {post.caption ? (
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                      <Link
                        href={`/u/${post.author.username}`}
                        className="font-extrabold text-slate-900 hover:text-sky-700 transition"
                      >
                        @{post.author.username}
                      </Link>{' '}
                      {post.caption}
                    </p>
                  </div>
                ) : (
                  <div className="px-4 pb-3">
                    <Link
                      href={`/p/${post.id}`}
                      className="text-xs font-bold text-slate-500 hover:text-sky-600 transition"
                    >
                      View post
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    const posts = await loadFeedPosts(user.id);
    return <FeedHome posts={posts} />;
  }

  return <MarketingHome />;
}