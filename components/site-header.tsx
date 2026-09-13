'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Search, ChevronDown } from 'lucide-react';

const links = [
  { href: '/', label: 'Local eSIMs' },
  { href: '/destinations', label: 'Regional eSIMs' },
  { href: '/providers', label: 'Global eSIMs' },
];

const searchDestinations = [
  { name: 'Japan', slug: 'japan', color: 'bg-red-100 text-red-500' },
  { name: 'United States', slug: 'united-states', color: 'bg-blue-100 text-blue-500' },
  { name: 'Italy', slug: 'italy', color: 'bg-emerald-100 text-emerald-500' },
  { name: 'Turkey', slug: 'turkey', color: 'bg-red-100 text-red-600' },
  { name: 'France', slug: 'france', color: 'bg-indigo-100 text-indigo-500' },
  { name: 'Spain', slug: 'spain', color: 'bg-amber-100 text-amber-600' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filtered = query.trim() === ''
    ? []
    : searchDestinations.filter(d => d.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (slug: string) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/esim/${slug}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 text-sky-500 font-black text-xl tracking-tight shrink-0">
          <Globe className="w-6 h-6 text-sky-400" />
          <span className="text-slate-900 font-bold">WorldOver<span className="text-sky-500">IP</span></span>
        </Link>

        {/* Sticky Search Bar in Header */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className="flex items-center bg-sky-50/80 border border-sky-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-sky-400 focus-within:bg-white transition">
            <Search className="w-4 h-4 text-sky-400 mr-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Where do you need data?"
              className="w-full bg-transparent outline-none text-xs font-medium text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Header Search Dropdown */}
          {isOpen && filtered.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-sky-100 overflow-hidden z-50">
              {filtered.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleSelect(item.slug)}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-sky-50 flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] text-sky-500 font-bold uppercase">eSIM</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition pb-1 ${
                  isActive
                    ? 'text-sky-500 font-extrabold border-b-2 border-sky-500'
                    : 'text-slate-600 hover:text-sky-500'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Language & Actions */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="flex items-center space-x-1 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full cursor-pointer hover:bg-sky-50 hover:text-sky-500 transition">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>EN</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}