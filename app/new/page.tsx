import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { NewPostForm } from '@/components/new-post-form';
import { getCurrentUser } from '@/lib/auth';

export const metadata: Metadata = { title: 'New post' };

export default async function NewPostPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <div className="max-w-xl mx-auto px-6 pt-10 pb-20">
      <Link
        href={user.username ? `/u/${user.username}` : '/'}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-800 hover:text-sky-600 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to profile</span>
      </Link>

      <div className="mt-6 bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">New post</h1>
        <p className="mt-2 text-sm font-medium text-slate-600">
          Share a photo from your trip and tell the story behind it.
        </p>
        <div className="mt-6">
          <NewPostForm userId={user.id} />
        </div>
      </div>
    </div>
  );
}