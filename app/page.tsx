'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Zap, Wallet, Globe, ShieldCheck, ChevronRight } from 'lucide-react';

interface Destination {
  name: string;
  region: string;
  slug: string;
  priceFrom: string;
  bgColor: string;
  textColor: string;
  iconText: string;
}

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'local' | 'regional' | 'global'>('local');

  // Airalo-style colorful abstract graphic cards
  const destinations: Destination[] = [
    { name: 'Italy', region: 'Europe', slug: 'italy', priceFrom: '$4.50', bgColor: 'bg-emerald-500', textColor: 'text-white', iconText: 'IT' },
    { name: 'Japan', region: 'Asia', slug: 'japan', priceFrom: '$4.50', bgColor: 'bg-rose-500', textColor: 'text-white', iconText: 'JP' },
    { name: 'United States', region: 'Americas', slug: 'united-states', priceFrom: '$4.50', bgColor: 'bg-blue-600', textColor: 'text-white', iconText: 'US' },
    { name: 'Turkey', region: 'Europe & ME', slug: 'turkey', priceFrom: '$4.50', bgColor: 'bg-red-500', textColor: 'text-white', iconText: 'TR' },
    { name: 'United Kingdom', region: 'Europe', slug: 'united-kingdom', priceFrom: '$5.00', bgColor: 'bg-indigo-600', textColor: 'text-white', iconText: 'UK' },
    { name: 'Spain', region: 'Europe', slug: 'spain', priceFrom: '$4.50', bgColor: 'bg-amber-500', textColor: 'text-white', iconText: 'ES' },
    { name: 'France', region: 'Europe', slug: 'france', priceFrom: '$4.50', bgColor: 'bg-sky-600', textColor: 'text-white', iconText: 'FR' },
    { name: 'Thailand', region: 'Asia', slug: 'thailand', priceFrom: '$4.50', bgColor: 'bg-purple-500', textColor: 'text-white', iconText: 'TH' },
    { name: 'Australia', region: 'Oceania', slug: 'australia', priceFrom: '$6.50', bgColor: 'bg-teal-500', textColor: 'text-white', iconText: 'AU' },
    { name: 'Mexico', region: 'Americas', slug: 'mexico', priceFrom: '$8.00', bgColor: 'bg-green-600', textColor: 'text-white', iconText: 'MX' },
    { name: 'Germany', region: 'Europe', slug: 'germany', priceFrom: '$4.50', bgColor: 'bg-slate-800', textColor: 'text-white', iconText: 'DE' },
    { name: 'Canada', region: 'Americas', slug: 'canada', priceFrom: '$6.00', bgColor: 'bg-red-600', textColor: 'text-white', iconText: 'CA' },
  ];

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
    <div className="bg-sky-50/30 min-h-screen text-slate-800 font-sans tracking-tight">
      {/* AIRALO BABY BLUE HERO */}
      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-50 text-white pt-16 pb-24 px-6 rounded-b-[40px] shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase text-white shadow-sm">
            WorldOverIP • Travel eSIM Comparison
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Stay connected, wherever you travel, at affordable rates
          </h1>
          <p className="text-slate-800 font-medium text-sm md:text-base max-w-xl mx-auto">
            Buy local, regional, and global eSIM data plans for 200+ countries.
          </p>

          {/* Main Hero Search Bar */}
          <div className="max-w-xl mx-auto pt-2 relative">
            <div className="flex items-center bg-white rounded-full p-2 pl-6 shadow-xl border border-sky-100">
              <Search className="w-5 h-5 text-sky-400 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="Search 200+ countries and regions..."
                className="w-full bg-transparent outline-none text-sm text-slate-900 font-medium placeholder:text-slate-400"
              />
              <button
                onClick={() => {
                  if (filteredDestinations.length > 0) {
                    handleSelect(filteredDestinations[0].slug);
                  }
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 py-2.5 text-xs font-bold transition shadow-md shrink-0 flex items-center space-x-1"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Main Search Dropdown */}
            {isOpen && filteredDestinations.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden z-50 text-slate-800">
                {filteredDestinations.map((dest) => (
                  <button
                    key={dest.slug}
                    onClick={() => handleSelect(dest.slug)}
                    className="w-full text-left px-5 py-3.5 hover:bg-sky-50/60 flex items-center justify-between transition border-b border-slate-100 last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-full ${dest.bgColor} ${dest.textColor} flex items-center justify-center font-black text-xs shadow-sm`}>
                        {dest.iconText}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">{dest.name}</span>
                        <span className="text-xs text-slate-400">{dest.region}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-sky-500">From {dest.priceFrom}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEGMENTED TAB NAVIGATION */}
      <section className="max-w-5xl mx-auto px-6 -mt-7">
        <div className="bg-white p-2 rounded-full shadow-lg border border-sky-100 flex items-center justify-center max-w-md mx-auto space-x-2">
          <button
            onClick={() => setActiveTab('local')}
            className={`w-1/3 py-2.5 rounded-full text-xs font-extrabold transition-all ${
              activeTab === 'local' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-600 hover:text-sky-500'
            }`}
          >
            Local eSIMs
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`w-1/3 py-2.5 rounded-full text-xs font-extrabold transition-all ${
              activeTab === 'regional' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-600 hover:text-sky-500'
            }`}
          >
            Regional eSIMs
          </button>
          <button
            onClick={() => setActiveTab('global')}
            className={`w-1/3 py-2.5 rounded-full text-xs font-extrabold transition-all ${
              activeTab === 'global' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-600 hover:text-sky-500'
            }`}
          >
            Global eSIMs
          </button>
        </div>
      </section>

      {/* AIRALO-STYLE DESTINATIONS GRID */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Popular Destinations</h2>
            <p className="text-xs text-slate-500 font-medium">Select a country to compare plans</p>
          </div>
          <Link href="/destinations" className="text-xs font-bold text-sky-500 hover:text-sky-600 flex items-center space-x-1 bg-sky-50 px-4 py-2 rounded-full transition">
            <span>View all 200+ countries</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/esim/${dest.slug}`}
              className="group bg-white p-4 rounded-3xl border border-sky-100 shadow-sm hover:shadow-xl hover:border-sky-400 transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5">
                {/* Airalo-style Colorful Graphic Badge */}
                <div className={`w-11 h-11 rounded-2xl ${dest.bgColor} ${dest.textColor} flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform`}>
                  {dest.iconText}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-sky-500 transition">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">From {dest.priceFrom}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-sky-50 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center text-sky-500 transition">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VALUE PROPOSITION BADGES */}
      <section className="bg-white border-t border-sky-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">Instant Activation</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Download your eSIM profile instantly via QR code without physical SIM cards.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">No Roaming Fees</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Pay local rates directly from top operators and avoid expensive carrier surprises.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">200+ Destinations</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Coverage across Europe, Asia, Americas, Africa, and global multi-country packs.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">Unbiased Comparison</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Compare prices, data limits, and validity periods side-by-side before you buy.</p>
          </div>
        </div>
      </section>
    </div>
  );
}