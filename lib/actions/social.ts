'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { COMMENT_MAX } from '@/lib/social';
import type { ActionResult } from '@/lib/auth-state';

const GENERIC_ERROR = 'Something went wrong. Please try again in a moment.';

async function getSessionUser() {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? { supabase, user } : null;
}

// ---------- LIKES ----------

export async function toggleLike(postId: string): Promise<ActionResult & { liked?: boolean }> {
  const session = await getSessionUser();
  if (!session) return { error: 'Please login to like posts.' };
  const { supabase, user } = session;

  const { data: existing } = await supabase
    .from('post_likes')
    .select('post_id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id);
    if (error) return { error: GENERIC_ERROR };
    revalidatePath(`/p/${postId}`);
    revalidatePath('/', 'layout');
    return { liked: false, message: 'Unliked' };
  }

  const { error } = await supabase.from('post_likes').insert({
    post_id: postId,
    user_id: user.id,
  });
  if (error) return { error: GENERIC_ERROR };
  revalidatePath(`/p/${postId}`);
  revalidatePath('/', 'layout');
  return { liked: true, message: 'Liked' };
}

// ---------- COMMENTS ----------

export async function addComment(postId: string, body: string): Promise<ActionResult> {
  const session = await getSessionUser();
  if (!session) return { error: 'Please login to comment.' };
  const { supabase, user } = session;

  const text = body.trim();
  if (!text) return { error: 'Comment cannot be empty.' };
  if (text.length > COMMENT_MAX) {
    return { error: `Comments can be at most ${COMMENT_MAX} characters.` };
  }

  const { error } = await supabase.from('post_comments').insert({
    post_id: postId,
    user_id: user.id,
    body: text,
  });
  if (error) return { error: GENERIC_ERROR };

  revalidatePath(`/p/${postId}`);
  return { message: 'Comment added' };
}

export async function deleteComment(commentId: string, postId: string): Promise<ActionResult> {
  const session = await getSessionUser();
  if (!session) return { error: 'Please login again.' };
  const { supabase, user } = session;

  const { error } = await supabase
    .from('post_comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', user.id);
  if (error) return { error: GENERIC_ERROR };

  revalidatePath(`/p/${postId}`);
  return { message: 'Comment deleted' };
}

// ---------- FOLLOWS ----------

export async function toggleFollow(
  targetUserId: string,
): Promise<ActionResult & { following?: boolean }> {
  const session = await getSessionUser();
  if (!session) return { error: 'Please login to follow people.' };
  const { supabase, user } = session;

  if (targetUserId === user.id) return { error: 'You cannot follow yourself.' };

  const { data: existing } = await supabase
    .from('follows')
    .select('follower_id')
    .eq('follower_id', user.id)
    .eq('following_id', targetUserId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', user.id)
      .eq('following_id', targetUserId);
    if (error) return { error: GENERIC_ERROR };
    revalidatePath('/', 'layout');
    return { following: false, message: 'Unfollowed' };
  }

  const { error } = await supabase.from('follows').insert({
    follower_id: user.id,
    following_id: targetUserId,
  });
  if (error) return { error: GENERIC_ERROR };
  revalidatePath('/', 'layout');
  return { following: true, message: 'Following' };
}

// ---------- SEARCH ----------

export type SearchProfile = {
  id: string;
  username: string;
  bio: string;
  avatar_path: string | null;
};

export async function searchProfiles(query: string): Promise<SearchProfile[]> {
  if (!isSupabaseConfigured) return [];
  const q = query.trim().toLowerCase().replace(/^@/, '');
  if (q.length < 1) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from('profiles')
    .select('id, username, bio, avatar_path')
    .ilike('username', `%${q}%`)
    .order('username', { ascending: true })
    .limit(8);

  return (data as SearchProfile[] | null) ?? [];
}