import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export type CurrentUser = {
  id: string;
  email?: string;
  username?: string;
};

// Returns the logged-in user, or null. Safe to call from any Server Component.
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  if (!isSupabaseConfigured) return null;

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) return null;

  const metadata = claims.user_metadata as { username?: string } | undefined;
  return { id: claims.sub, email: claims.email, username: metadata?.username };
});