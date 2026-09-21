'use client';

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { ImagePlus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { compressImage } from '@/lib/image';
import { createPost } from '@/lib/actions/posts';
import { destinations } from '@/lib/data';
import { CAPTION_MAX } from '@/lib/social';

const inputClass =
  'w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 transition';

export function NewPostForm({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [destination, setDestination] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Show a preview of the chosen photo.
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null);
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError('Please choose a photo first.');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const blob = await compressImage(file, { maxSize: 1600 });
      const path = `${userId}/${crypto.randomUUID()}.jpg`;

      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from('posts')
        .upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' });
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

      // On success this redirects to your profile.
      const result = await createPost({
        imagePath: path,
        caption,
        destinationSlug: destination || null,
      });
      if (result?.error) {
        setError(result.error);
        setBusy(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <span className="block text-xs font-black text-slate-900 mb-1.5">Photo</span>
        <label
          htmlFor="photo"
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white hover:bg-slate-50 transition cursor-pointer overflow-hidden min-h-56"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Preview of your photo" className="w-full max-h-96 object-contain" />
          ) : (
            <span className="flex flex-col items-center gap-2 py-12 text-slate-500">
              <ImagePlus className="w-8 h-8" />
              <span className="text-sm font-bold">Choose a photo</span>
            </span>
          )}
        </label>
        <input id="photo" type="file" accept="image/*" onChange={handleFile} className="sr-only" />
        {preview && (
          <p className="mt-1.5 text-[11px] font-medium text-slate-500">Click the photo to choose a different one.</p>
        )}
      </div>

      <div>
        <label htmlFor="caption" className="block text-xs font-black text-slate-900 mb-1.5">
          Caption
        </label>
        <textarea
          id="caption"
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          maxLength={CAPTION_MAX}
          rows={4}
          placeholder="Tell the story behind this photo"
          className={`${inputClass} resize-none`}
        />
        <p className="mt-1 text-[11px] font-bold text-slate-500">
          {caption.length}/{CAPTION_MAX}
        </p>
      </div>

      <div>
        <label htmlFor="destination" className="block text-xs font-black text-slate-900 mb-1.5">
          Destination (optional)
        </label>
        <select
          id="destination"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          className={inputClass}
        >
          <option value="">No destination</option>
          {destinations.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.flag} {item.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full bg-slate-900 hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-sm rounded-full px-6 py-3.5 shadow-sm transition"
      >
        {busy ? 'Sharing…' : 'Share post'}
      </button>

      {error && (
        <p role="alert" className="text-xs font-bold text-rose-600">
          {error}
        </p>
      )}
    </form>
  );
}