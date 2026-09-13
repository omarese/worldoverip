'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Search, Banknote, ChevronDown } from 'lucide-react';

const links = [
  { href: '/', label: 'Local eSIMs' },
  { href: '/destinations', label: 'Regional eSIMs' },
  { href: '/providers', label: 'Global eSIMs' },
];

const searchDestinations = [
  { name: 'Japan', slug: 'japan' },
  { name: 'United States', slug: 'united-states' },
  { name: 'Italy', slug: 'italy' },
  { name: 'Turkey', slug: 'turkey' },
  { name: 'France', slug: 'france' },
  { name: 'Spain', slug: 'spain' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');

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
          <Globe className="w-6 h-6 text-sky-500" />
          <span className="text-slate-900 font-bold">WorldOver<span className="text-sky-500">IP</span></span>
        </Link>

        {/* Sticky Search Bar */}
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

        {/* Header Controls: Language | Currency */}
        <div className="flex items-center space-x-3 shrink-0">
          {/* Globe Icon / Language */}
          <button className="flex items-center space-x-1 text-xs font-bold text-slate-700 hover:text-sky-500 transition">
            <Globe className="w-4 h-4 text-slate-700" />
          </button>

          {/* Divider line like Screenshot 3 */}
          <div className="w-[1px] h-5 bg-slate-300" />

          {/* Currency Switcher (EUR / USD) */}
          <button 
            onClick={() => setCurrency(currency === 'EUR' ? 'USD' : 'EUR')}
            className="flex items-center space-x-1 text-xs font-bold text-slate-700 hover:text-sky-500 transition"
          >
            <Banknote className="w-4 h-4 text-slate-700" />
            <span className="text-[11px] font-extrabold">{currency === 'EUR' ? 'EUR €' : 'USD $'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}