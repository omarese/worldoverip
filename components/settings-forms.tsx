'use client';

import { useActionState, type ReactNode } from 'react';
import { updateEmail, updatePassword, updateUsername } from '@/lib/actions/profile';
import type { ActionResult } from '@/lib/auth-state';

const inputClass =
  'w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-semibold outline-none focus:border-slate-500 disabled:bg-slate-100 disabled:text-slate-500 transition';

function Card({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-6 md:p-8">
      <h2 className="text-lg font-black text-slate-900">{title}</h2>
      {note && <p className="mt-1 text-xs font-medium text-slate-600 leading-relaxed">{note}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function SubmitButton({ pending, disabled, label }: { pending: boolean; disabled?: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="bg-slate-900 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm rounded-full px-6 py-3 shadow-sm transition"
    >
      {pending ? 'Saving…' : label}
    </button>
  );
}

function Status({ state }: { state: ActionResult }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={`text-xs font-bold min-h-4 ${state.error ? 'text-rose-600' : 'text-emerald-700'}`}
    >
      {state.error ?? state.message ?? ''}
    </p>
  );
}

export function UsernameForm({ current, lockedUntil }: { current: string; lockedUntil: string | null }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(updateUsername, {});
  const locked = Boolean(lockedUntil);

  return (
    <Card
      title="Username"
      note={
        locked
          ? `You changed your username recently. You can change it again on ${lockedUntil}.`
          : 'You can change your username once every 30 days.'
      }
    >
      <form action={formAction} className="space-y-3">
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          minLength={3}
          maxLength={20}
          defaultValue={current}
          disabled={locked}
          autoComplete="username"
          className={inputClass}
        />
        <SubmitButton pending={pending} disabled={locked} label="Save username" />
        <Status state={state} />
      </form>
    </Card>
  );
}

export function EmailForm({
  current,
  pendingEmail,
  lockedUntil,
}: {
  current: string;
  pendingEmail?: string | null;
  lockedUntil: string | null;
}) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(updateEmail, {});
  const locked = Boolean(lockedUntil);

  return (
    <Card
      title="Email"
      note={
        locked
          ? `You changed your email recently. You can change it again on ${lockedUntil}.`
          : 'You can change your email once every 30 days.'
      }
    >
      <form action={formAction} className="space-y-3">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={current}
          disabled={locked}
          autoComplete="email"
          className={inputClass}
        />
        {pendingEmail && (
          <p className="text-xs font-bold text-sky-700">
            Waiting for you to confirm {pendingEmail}. Check that inbox for the link.
          </p>
        )}
        <SubmitButton pending={pending} disabled={locked} label="Save email" />
        <Status state={state} />
      </form>
    </Card>
  );
}

export function PasswordForm() {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(updatePassword, {});

  return (
    <Card title="Password" note="Enter your current password, then choose a new one (at least 8 characters).">
      <form action={formAction} className="space-y-3">
        <div>
          <label htmlFor="current" className="block text-xs font-black text-slate-900 mb-1.5">
            Current password
          </label>
          <input
            id="current"
            name="current"
            type="password"
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="next" className="block text-xs font-black text-slate-900 mb-1.5">
            New password
          </label>
          <input
            id="next"
            name="next"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="confirm" className="block text-xs font-black text-slate-900 mb-1.5">
            Confirm new password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={inputClass}
          />
        </div>
        <SubmitButton pending={pending} label="Save password" />
        <Status state={state} />
      </form>
    </Card>
  );
}