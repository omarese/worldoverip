'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'eSIM Comparison', href: '/destinations' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Providers', href: '/providers' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-blue-600 font-extrabold text-xl">
          <Globe className="w-6 h-6" />
          <span className="text-slate-900">WorldOverIP</span>
        </Link>

        {/* Dynamic Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition pb-1 ${
                  isActive
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Language Selector */}
        <div className="flex items-center space-x-1 text-sm text-slate-700 cursor-pointer hover:text-slate-900">
          <Globe className="w-4 h-4 text-slate-500" />
          <span className="font-medium">EN</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
}