'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { ActionResult } from '@/lib/auth-state';
import {
  BIO_MAX,
  USERNAME_HELP,
  USERNAME_PATTERN,
  formatLongDate,
  nextChangeDate,
} from '@/lib/social';

const GENERIC_ERROR = 'Something went wrong. Please try again in a moment.';
const NOT_LOGGED_IN = 'Please login again.';

// Returns a Supabase client plus the verified logged-in user, or null.
async function getSessionUser() {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? { supabase, user } : null;
}

// Called after the browser uploaded a new profile picture to storage.
export async function setAvatar(path: string): Promise<ActionResult> {
  const session = await getSessionUser();
  if (!session) return { error: NOT_LOGGED_IN };
  const { supabase, user } = session;

  // The file must be inside this user's own folder.
  if (!new RegExp(`^${user.id}/\\d{10,15}\\.jpg$`).test(path)) {
    return { error: 'Invalid image.' };
  }

  const { data: old } = await supabase
    .from('profiles')
    .select('avatar_path')
    .eq('id', user.id)
    .maybeSingle();

  const { error } = await supabase.from('profiles').update({ avatar_path: path }).eq('id', user.id);
  if (error) {
    await supabase.storage.from('avatars').remove([path]);
    return { error: GENERIC_ERROR };
  }

  // Remove the previous picture so it doesn't use up storage space.
  if (old?.avatar_path && old.avatar_path !== path) {
    await supabase.storage.from('avatars').remove([old.avatar_path]);
  }

  revalidatePath('/', 'layout');
  return {};
}

export async function updateBio(bio: string): Promise<ActionResult> {
  const session = await getSessionUser();
  if (!session) return { error: NOT_LOGGED_IN };
  const { supabase, user } = session;

  const clean = bio.trim().replace(/\n{3,}/g, '\n\n');
  if (clean.length > BIO_MAX) {
    return { error: `Your bio can be at most ${BIO_MAX} characters.` };
  }

  const { error } = await supabase.from('profiles').update({ bio: clean }).eq('id', user.id);
  if (error) return { error: GENERIC_ERROR };

  revalidatePath('/', 'layout');
  return {};
}

export async function updateUsername(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const username = String(formData.get('username') ?? '').trim().toLowerCase();

  const session = await getSessionUser();
  if (!session) return { error: NOT_LOGGED_IN };
  const { supabase, user } = session;

  if (!USERNAME_PATTERN.test(username)) return { error: USERNAME_HELP };

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, username_changed_at')
    .eq('id', user.id)
    .maybeSingle();
  if (!profile) return { error: GENERIC_ERROR };

  if (username === profile.username) return { error: 'That is already your username.' };

  const next = nextChangeDate(profile.username_changed_at);
  if (next) {
    return { error: `You can change your username again on ${formatLongDate(next)}.` };
  }

  const { data: taken } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle();
  if (taken) return { error: 'That username is already taken.' };

  const { error } = await supabase.from('profiles').update({ username }).eq('id', user.id);
  if (error) {
    if (error.code === '23505') return { error: 'That username is already taken.' };
    if (error.message.includes('once every 30 days')) {
      return { error: 'You can only change your username once every 30 days.' };
    }
    return { error: GENERIC_ERROR };
  }

  revalidatePath('/', 'layout');
  redirect(`/u/${username}`);
}

export async function updateEmail(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();

  const session = await getSessionUser();
  if (!session) return { error: NOT_LOGGED_IN };
  const { supabase, user } = session;

  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: 'Please enter a valid email address.' };
  if (email === user.email?.toLowerCase()) return { error: 'That is already your email address.' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('email_changed_at')
    .eq('id', user.id)
    .maybeSingle();

  const next = nextChangeDate(profile?.email_changed_at);
  if (next) {
    return { error: `You can change your email again on ${formatLongDate(next)}.` };
  }

  const { data, error } = await supabase.auth.updateUser({ email });
  if (error) {
    const isClientError = error.status !== undefined && error.status >= 400 && error.status < 500;
    return { error: isClientError ? error.message : GENERIC_ERROR };
  }

  revalidatePath('/', 'layout');

  // With email confirmation on, the address only changes after the link is clicked.
  if (data.user?.new_email) {
    return { message: `We sent a confirmation link to ${email}. Your email changes after you click it.` };
  }
  return { message: 'Your email address was updated.' };
}

export async function updatePassword(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const current = String(formData.get('current') ?? '');
  const next = String(formData.get('next') ?? '');
  const confirm = String(formData.get('confirm') ?? '');

  const session = await getSessionUser();
  if (!session) return { error: NOT_LOGGED_IN };
  const { supabase, user } = session;

  if (next.length < 8) return { error: 'Your new password must be at least 8 characters.' };
  if (next !== confirm) return { error: 'The new passwords do not match.' };
  if (next === current) return { error: 'Your new password must be different from the current one.' };
  if (!user.email) return { error: GENERIC_ERROR };

  // Check the current password first.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: current,
  });
  if (signInError) {
    return {
      error:
        signInError.code === 'invalid_credentials'
          ? 'Your current password is incorrect.'
          : GENERIC_ERROR,
    };
  }

  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) {
    const isClientError = error.status !== undefined && error.status >= 400 && error.status < 500;
    return { error: isClientError ? error.message : GENERIC_ERROR };
  }

  return { message: 'Your password was updated.' };
}