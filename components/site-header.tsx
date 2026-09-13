'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "eSIM Comparison" },
  { href: "/destinations", label: "Destinations" },
  { href: "/providers", label: "Providers" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 text-xl font-extrabold text-blue-600">
          <Globe className="h-6 w-6" />
          <span className="text-slate-900">WorldOverIP</span>
        </Link>

        {/* Dynamic Navigation */}
        <nav className="hidden items-center space-x-8 text-sm font-medium md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition pb-1 ${
                  isActive
                    ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Language Selector */}
        <div className="flex cursor-pointer items-center space-x-1 text-sm text-slate-700 hover:text-slate-900">
          <Globe className="h-4 w-4 text-slate-500" />
          <span className="font-medium">EN</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
}