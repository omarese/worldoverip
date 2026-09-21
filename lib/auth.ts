import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { publicUrl } from '@/lib/social';

export type CurrentUser = {
  id: string;
  email?: string;
  username?: string;
  avatarUrl?: string | null;
};

// Returns the logged-in user, or null. Safe to call from any Server Component.
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  if (!isSupabaseConfigured) return null;

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) return null;

  // The profile table is the source of truth for the username and profile picture.
  const { data: profile } = await supabase
    .from('profiles')
    .select('username, avatar_path')
    .eq('id', claims.sub)
    .maybeSingle();

  const metadata = claims.user_metadata as { username?: string } | undefined;

  return {
    id: claims.sub,
    email: claims.email,
    username: profile?.username ?? metadata?.username,
    avatarUrl: publicUrl('avatars', profile?.avatar_path),
  };
});