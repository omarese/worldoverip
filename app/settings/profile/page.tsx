import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { EmailForm, PasswordForm, UsernameForm } from '@/components/settings-forms';
import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { formatLongDate, nextChangeDate } from '@/lib/social';

export const metadata: Metadata = { title: 'Edit profile' };

export default async function EditProfilePage() {
  const viewer = await getCurrentUser();
  if (!viewer) redirect('/login');

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, username_changed_at, email_changed_at')
    .eq('id', viewer.id)
    .maybeSingle();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!profile || !user) {
    return (
      <div className="max-w-xl mx-auto px-6 pt-12 pb-20">
        <p className="text-sm font-medium text-slate-600">
          We could not load your profile settings. Please try again in a moment.
        </p>
      </div>
    );
  }

  const usernameLock = nextChangeDate(profile.username_changed_at);
  const emailLock = nextChangeDate(profile.email_changed_at);

  return (
    <div className="max-w-xl mx-auto px-6 pt-10 pb-20">
      <Link
        href={`/u/${profile.username}`}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to profile</span>
      </Link>

      <h1 className="mt-6 text-3xl md:text-4xl font-black tracking-tight text-slate-900">Edit profile</h1>
      <p className="mt-2 text-sm font-medium text-slate-600">
        Change your profile picture and bio directly on your profile page.
      </p>

      <div className="mt-8 space-y-6">
        <UsernameForm
          current={profile.username}
          lockedUntil={usernameLock ? formatLongDate(usernameLock) : null}
        />
        <EmailForm
          current={user.email ?? ''}
          pendingEmail={user.new_email}
          lockedUntil={emailLock ? formatLongDate(emailLock) : null}
        />
        <PasswordForm />
      </div>
    </div>
  );
}