'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { AuthState } from '@/lib/auth-state';

export async function register(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const username = String(formData.get('username') ?? '').trim().toLowerCase();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const values = { username, email };

  if (!isSupabaseConfigured) {
    return { error: 'Accounts are not set up yet. Please check back soon.', values };
  }
  if (!/^[a-z0-9._]{3,20}$/.test(username)) {
    return {
      error: 'Username must be 3 to 20 characters: letters, numbers, dots or underscores.',
      values,
    };
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.', values };
  }

  const supabase = await createClient();

  const { data: taken } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle();
  if (taken) {
    return { error: 'That username is already taken.', values };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });
  if (error) {
    // Show Supabase's message for normal 4xx problems (e.g. weak password); hide network errors.
    const isClientError = error.status !== undefined && error.status >= 400 && error.status < 500;
    return {
      error: isClientError ? error.message : 'Something went wrong. Please try again in a moment.',
      values,
    };
  }

  // Email confirmation off: the user is already logged in.
  if (data.session) {
    revalidatePath('/', 'layout');
    redirect('/');
  }

  // Email confirmation on: they must click the link in their inbox first.
  return { message: 'Almost there! Check your email and click the link to confirm your account.' };
}