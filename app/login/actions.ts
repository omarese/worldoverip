'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { AuthState } from '@/lib/auth-state';

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const values = { email };

  if (!isSupabaseConfigured) {
    return { error: 'Accounts are not set up yet. Please check back soon.', values };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.code === 'email_not_confirmed') {
      return { error: 'Please confirm your email first. Check your inbox for the link.', values };
    }
    if (error.code === 'invalid_credentials') {
      return { error: 'Incorrect email or password.', values };
    }
    return { error: 'Something went wrong. Please try again in a moment.', values };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}