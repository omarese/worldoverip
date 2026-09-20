import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AuthForm } from '@/components/auth-form';
import { getCurrentUser } from '@/lib/auth';

export const metadata: Metadata = { title: 'Login' };

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
  if (await getCurrentUser()) redirect('/');

  const { error } = await searchParams;
  const initialError =
    error === 'confirm'
      ? 'That confirmation link is invalid or has expired. Try registering again.'
      : undefined;

  return <AuthForm mode="login" initialError={initialError} />;
}