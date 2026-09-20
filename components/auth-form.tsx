'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const inputClass =
  'w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-semibold outline-none focus:border-slate-500 transition';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const isRegister = mode === 'register';
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: send the form values (new FormData(event.currentTarget)) to your auth backend here.
    setSubmitted(true);
  }

  return (
    <div className="max-w-md mx-auto px-6 pt-12 pb-20">
      <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-7 md:p-9">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
          {isRegister ? 'Join WorldOverIP' : 'Welcome back'}
        </h1>
        <p className="mt-2 text-sm font-medium text-slate-600">
          {isRegister
            ? 'Create a free account to share your trips and follow other travellers.'
            : 'Login to keep writing your travel diary.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {isRegister && (
            <div>
              <label htmlFor="username" className="block text-xs font-black text-slate-900 mb-1.5">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                minLength={3}
                autoComplete="username"
                placeholder="e.g. mika.roams"
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-black text-slate-900 mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-black text-slate-900 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={isRegister ? 8 : undefined}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                placeholder={isRegister ? 'At least 8 characters' : 'Your password'}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isRegister && (
            <label className="flex items-start space-x-2.5 text-xs font-medium text-slate-600 leading-relaxed">
              <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-slate-900 shrink-0" />
              <span>
                I agree to the{' '}
                <Link href="/terms" className="font-bold text-slate-900 underline hover:text-sky-600">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/guidelines" className="font-bold text-slate-900 underline hover:text-sky-600">
                  Community Guidelines
                </Link>
                .
              </span>
            </label>
          )}

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-700 text-white font-black text-sm rounded-full px-6 py-3.5 shadow-sm transition"
          >
            {isRegister ? 'Create account' : 'Login'}
          </button>

          <p role="status" aria-live="polite" className="text-xs font-bold text-sky-700 min-h-4">
            {submitted ? 'Accounts are not open just yet. Please check back soon!' : ''}
          </p>
        </form>

        <p className="mt-2 text-center text-xs font-semibold text-slate-600">
          {isRegister ? 'Already have an account?' : 'New to WorldOverIP?'}{' '}
          <Link
            href={isRegister ? '/login' : '/register'}
            className="font-black text-slate-900 underline hover:text-sky-600 transition"
          >
            {isRegister ? 'Login' : 'Register'}
          </Link>
        </p>
      </div>
    </div>
  );
}