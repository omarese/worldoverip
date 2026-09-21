import { supabaseUrl } from '@/lib/supabase/config';

export type Profile = {
  id: string;
  username: string;
  bio: string;
  avatar_path: string | null;
  created_at: string;
};

export type Post = {
  id: string;
  user_id: string;
  image_path: string;
  caption: string;
  destination_slug: string | null;
  created_at: string;
};

export const USERNAME_PATTERN = /^[a-z0-9._]{3,20}$/;
export const USERNAME_HELP =
  'Username must be 3 to 20 characters: letters, numbers, dots or underscores.';
export const BIO_MAX = 150;
export const CAPTION_MAX = 500;
export const COMMENT_MAX = 500;
export const CHANGE_LIMIT_DAYS = 30;

export type PostComment = {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  created_at: string;
};

// Public web address of a photo in one of the storage buckets.
export function publicUrl(bucket: 'avatars' | 'posts', path?: string | null) {
  if (!path || !supabaseUrl) return null;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

// When a "once a month" change is possible again. Returns null if it is allowed now.
export function nextChangeDate(lastChange?: string | null): Date | null {
  if (!lastChange) return null;
  const next = new Date(new Date(lastChange).getTime() + CHANGE_LIMIT_DAYS * 24 * 60 * 60 * 1000);
  return next > new Date() ? next : null;
}

export function formatLongDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatMonthYear(date: Date | string) {
  return new Date(date).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}