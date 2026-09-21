'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { UserAvatar } from '@/components/user-avatar';
import { searchProfiles, type SearchProfile } from '@/lib/actions/social';
import { publicUrl } from '@/lib/social';

export function ProfileSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchProfile[]>([]);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 1) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      startTransition(async () => {
        const list = await searchProfiles(q);
        setResults(list);
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={containerRef} className="relative">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search people"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm transition"
        >
          <Search className="w-4 h-4" />
        </button>
      ) : (
        <div className="flex items-center gap-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people…"
              className="w-40 sm:w-52 rounded-full border border-slate-300 bg-white pl-8 pr-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 shadow-sm transition"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setQuery('');
              setResults([]);
            }}
            aria-label="Close search"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-slate-500 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {open && query.trim().length >= 1 && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden z-50">
          {pending && results.length === 0 ? (
            <p className="px-4 py-3 text-xs font-medium text-slate-500">Searching…</p>
          ) : results.length === 0 ? (
            <p className="px-4 py-3 text-xs font-medium text-slate-500">No people found</p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/u/${p.username}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery('');
                      setResults([]);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition"
                  >
                    <UserAvatar
                      username={p.username}
                      url={publicUrl('avatars', p.avatar_path)}
                      className="w-8 h-8 text-[10px]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-slate-900 truncate">@{p.username}</p>
                      {p.bio && (
                        <p className="text-[11px] font-medium text-slate-500 truncate">{p.bio}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}