'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { getDestination } from '@/lib/data';
import { CAPTION_MAX } from '@/lib/social';
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

// Called after the browser uploaded the photo to storage.
export async function createPost(input: {
  imagePath: string;
  caption: string;
  destinationSlug: string | null;
}): Promise<ActionResult> {
  const session = await getSessionUser();
  if (!session) return { error: 'Please login again.' };
  const { supabase, user } = session;

  if (!new RegExp(`^${user.id}/[0-9a-f-]{36}\\.jpg$`).test(input.imagePath)) {
    return { error: 'Invalid image.' };
  }

  const caption = input.caption.trim();
  if (caption.length > CAPTION_MAX) {
    await supabase.storage.from('posts').remove([input.imagePath]);
    return { error: `Your caption can be at most ${CAPTION_MAX} characters.` };
  }

  const destinationSlug =
    input.destinationSlug && getDestination(input.destinationSlug) ? input.destinationSlug : null;

  const { error } = await supabase.from('posts').insert({
    user_id: user.id,
    image_path: input.imagePath,
    caption,
    destination_slug: destinationSlug,
  });
  if (error) {
    await supabase.storage.from('posts').remove([input.imagePath]);
    return { error: GENERIC_ERROR };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .maybeSingle();

  revalidatePath('/', 'layout');
  redirect(profile?.username ? `/u/${profile.username}` : '/');
}

export async function deletePost(id: string): Promise<ActionResult> {
  const session = await getSessionUser();
  if (!session) return { error: 'Please login again.' };
  const { supabase, user } = session;

  const { data: post } = await supabase
    .from('posts')
    .select('id, user_id, image_path')
    .eq('id', id)
    .maybeSingle();
  if (!post || post.user_id !== user.id) return { error: 'Post not found.' };

  const { error } = await supabase.from('posts').delete().eq('id', id).eq('user_id', user.id);
  if (error) return { error: GENERIC_ERROR };

  await supabase.storage.from('posts').remove([post.image_path]);

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .maybeSingle();

  revalidatePath('/', 'layout');
  redirect(profile?.username ? `/u/${profile.username}` : '/');
}