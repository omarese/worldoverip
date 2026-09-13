'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Zap, Wallet, Globe, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const destinations = [
    { name: 'Japan', flag: '🇯🇵', region: 'Asia', slug: 'japan' },
    { name: 'United States', flag: '🇺🇸', region: 'Americas', slug: 'united-states' },
    { name: 'Turkey', flag: '🇹🇷', region: 'Europe & ME', slug: 'turkey' },
    { name: 'United Kingdom', flag: '🇬🇧', region: 'Europe', slug: 'united-kingdom' },
    { name: 'Spain', flag: '🇪🇸', region: 'Europe', slug: 'spain' },
    { name: 'France', flag: '🇫🇷', region: 'Europe', slug: 'france' },
    { name: 'Italy', flag: '🇮🇹', region: 'Europe', slug: 'italy' },
    { name: 'Thailand', flag: '🇹🇭', region: 'Asia', slug: 'thailand' },
    { name: 'Australia', flag: '🇦🇺', region: 'Oceania', slug: 'australia' },
    { name: 'Mexico', flag: '🇲🇽', region: 'Americas', slug: 'mexico' },
  ];

  // Filter list based on search query
  const filteredDestinations = query.trim() === ''
    ? []
    : destinations.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.region.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (slug: string) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/esim/${slug}`);
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* HERO SECTION */}
      <section className="relative min-h-[580px] w-full bg-cover bg-center text-white" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12 flex flex-col justify-between min-h-[580px]">
          {/* Main Hero Header */}
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              Compare • Choose • Stay Connected
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              The Best eSIM Plans <br /> for Your Next Adventure
            </h1>
            <p className="text-slate-200 text-base md:text-lg max-w-xl">
              Compare eSIM providers, find the best plans, and stay connected wherever you go — with no roaming fees and no hassle.
            </p>

            {/* Interactive Live Search Dropdown */}
            <div className="pt-4 max-w-lg relative">
              <div className="flex items-center bg-white rounded-full p-2 pl-6 shadow-2xl text-slate-800">
                <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                  }}
                  onFocus={() => setIsOpen(true)}
                  placeholder="Where are you headed to?"
                  className="w-full bg-transparent focus:outline-none text-sm placeholder:text-slate-400"
                />
                <button 
                  onClick={() => {
                    if (filteredDestinations.length > 0) {
                      handleSelect(filteredDestinations[0].slug);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition shadow-md shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dropdown Menu Results */}
              {isOpen && filteredDestinations.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 text-slate-800">
                  {filteredDestinations.map((dest) => (
                    <button
                      key={dest.slug}
                      onClick={() => handleSelect(dest.slug)}
                      className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-center justify-between transition border-b border-slate-100 last:border-0"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{dest.flag}</span>
                        <span className="font-semibold text-sm text-slate-900">{dest.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">{dest.region}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Feature Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/20">
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">Instant Activation</h4>
                <p className="text-xs text-slate-300">Get online in minutes</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Wallet className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">Best Prices</h4>
                <p className="text-xs text-slate-300">Compare top providers</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Globe className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">Global Coverage</h4>
                <p className="text-xs text-slate-300">190+ countries</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">Trusted Providers</h4>
                <p className="text-xs text-slate-300">Airalo, Nomad, Holafly & more</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-2 mb-10">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase">Popular Destinations</p>
          <h2 className="text-3xl font-extrabold text-slate-900">Explore the World with eSIM</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {destinations.slice(0, 8).map((dest) => (
            <Link key={dest.slug} href={`/esim/${dest.slug}`} className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-500 hover:shadow-lg transition">
              <div className="text-3xl mb-3">{dest.flag}</div>
              <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition">{dest.name}</h3>
              <p className="text-xs text-slate-500">{dest.region}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}