import Link from 'next/link';
import { Globe, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-blue-600 font-extrabold text-xl">
          <Globe className="w-6 h-6" />
          <span className="text-slate-900">WorldOverIP</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link href="/" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Home</Link>
          <Link href="/destinations" className="hover:text-slate-900 transition">eSIM Comparison</Link>
          <Link href="/destinations" className="hover:text-slate-900 transition">Destinations</Link>
          <Link href="/providers" className="hover:text-slate-900 transition">Providers</Link>
          <Link href="/about" className="hover:text-slate-900 transition">About</Link>
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