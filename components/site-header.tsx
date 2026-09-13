'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="w-full bg-[#FAF7F2] relative z-30 py-4 px-6 md:px-12 flex items-center justify-between border-b border-slate-200/50">
      
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Globe className="w-6 h-6 text-sky-600" />
        <span className="text-xl font-black text-slate-900 tracking-tight">
          WorldOverIP
        </span>
      </Link>

      {/* Navigation Links & Action Buttons */}
      <div className="flex items-center space-x-6 text-xs font-bold text-slate-800">
        <Link 
          href="/destinations" 
          className="hover:text-sky-600 transition hidden sm:inline-block"
        >
          Destinations
        </Link>
        <Link 
          href="/providers" 
          className="hover:text-sky-600 transition hidden sm:inline-block"
        >
          Providers
        </Link>

        {/* Currency / Language Selector Pill */}
        <button 
          type="button"
          className="flex items-center space-x-1.5 bg-white border border-slate-300 rounded-full px-3.5 py-2 hover:bg-slate-50 transition shadow-sm text-slate-900"
        >
          <Globe className="w-3.5 h-3.5 text-slate-600" />
          <span>EUR (€)</span>
        </button>
      </div>

    </header>
  );
}

export default SiteHeader;