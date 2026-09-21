'use client';

import { useState, useTransition } from 'react';
import { Pencil } from 'lucide-react';
import { updateBio } from '@/lib/actions/profile';
import { BIO_MAX } from '@/lib/social';

export function BioEditor({ initialBio, editable }: { initialBio: string; editable: boolean }) {
  const [bio, setBio] = useState(initialBio);
  const [draft, setDraft] = useState(initialBio);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function save() {
    setError(null);
    startTransition(async () => {
      const result = await updateBio(draft);
      if (result.error) {
        setError(result.error);
        return;
      }
      setBio(draft.trim());
      setEditing(false);
    });
  }

  if (!editable) {
    return bio ? (
      <p className="text-sm font-medium text-slate-700 whitespace-pre-line">{bio}</p>
    ) : null;
  }

  if (!editing) {
    return (
      <div className="space-y-1.5">
        {bio ? (
          <p className="text-sm font-medium text-slate-700 whitespace-pre-line">{bio}</p>
        ) : (
          <p className="text-sm font-medium text-slate-400">You have not added a bio yet.</p>
        )}
        <button
          type="button"
          onClick={() => {
            setDraft(bio);
            setEditing(true);
          }}
          className="inline-flex items-center space-x-1 text-xs font-extrabold text-sky-700 hover:underline"
        >
          <Pencil className="w-3 h-3" />
          <span>{bio ? 'Edit bio' : 'Add a bio'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label htmlFor="bio" className="sr-only">
        Bio
      </label>
      <textarea
        id="bio"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        maxLength={BIO_MAX}
        rows={3}
        placeholder="Tell people about yourself and your travels"
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 transition resize-none"
      />
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold text-slate-500">
          {draft.length}/{BIO_MAX}
        </span>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setError(null);
            }}
            disabled={pending}
            className="bg-white border border-slate-300 rounded-full px-4 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="bg-slate-900 hover:bg-slate-700 disabled:opacity-60 text-white rounded-full px-4 py-2 text-xs font-black transition"
          >
            {pending ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
      {error && (
        <p role="alert" className="text-xs font-bold text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}