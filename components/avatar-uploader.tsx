'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Camera } from 'lucide-react';
import { UserAvatar } from '@/components/user-avatar';
import { createClient } from '@/lib/supabase/client';
import { compressImage } from '@/lib/image';
import { setAvatar } from '@/lib/actions/profile';

// Profile picture with a button to change it (only shown on your own profile).
export function AvatarUploader({
  userId,
  username,
  avatarUrl,
}: {
  userId: string;
  username: string;
  avatarUrl: string | null;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setBusy(true);
    setError(null);
    try {
      const blob = await compressImage(file, { maxSize: 400, square: true });
      const path = `${userId}/${Date.now()}.jpg`;

      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' });
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

      const result = await setAvatar(path);
      if (result.error) throw new Error(result.error);

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        aria-label="Change profile picture"
        className="group relative rounded-full disabled:opacity-60"
      >
        <UserAvatar username={username} url={avatarUrl} className="w-28 h-28 sm:w-36 sm:h-36 text-4xl" />
        <span className="absolute inset-0 rounded-full bg-slate-900/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition flex items-center justify-center text-white">
          <Camera className="w-7 h-7" />
        </span>
      </button>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="text-xs font-extrabold text-sky-700 hover:underline disabled:opacity-60"
      >
        {busy ? 'Uploading…' : 'Change photo'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      {error && (
        <p role="alert" className="text-xs font-bold text-rose-600 max-w-[12rem] text-center">
          {error}
        </p>
      )}
    </div>
  );
}