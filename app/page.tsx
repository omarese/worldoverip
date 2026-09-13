'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Zap, Wallet, Globe, ShieldCheck, ChevronRight } from 'lucide-react';

interface Destination {
  name: string;
  image: string;
  region: string;
  slug: string;
  priceFrom: string;
}

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'local' | 'regional' | 'global'>('local');

  const destinations: Destination[] = [
    { name: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=150&auto=format&fit=crop&q=80', region: 'Asia', slug: 'japan', priceFrom: '$4.50' },
    { name: 'United States', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=150&auto=format&fit=crop&q=80', region: 'Americas', slug: 'united-states', priceFrom: '$4.50' },
    { name: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=150&auto=format&fit=crop&q=80', region: 'Europe & ME', slug: 'turkey', priceFrom: '$4.50' },
    { name: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=150&auto=format&fit=crop&q=80', region: 'Europe', slug: 'united-kingdom', priceFrom: '$5.00' },
    { name: 'Spain', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=150&auto=format&fit=crop&q=80', region: 'Europe', slug: 'spain', priceFrom: '$4.50' },
    { name: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&auto=format&fit=crop&q=80', region: 'Europe', slug: 'france', priceFrom: '$4.50' },
    { name: 'Italy', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=150&auto=format&fit=crop&q=80', region: 'Europe', slug: 'italy', priceFrom: '$4.50' },
    { name: 'Thailand', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=150&auto=format&fit=crop&q=80', region: 'Asia', slug: 'thailand', priceFrom: '$4.50' },
    { name: 'Australia', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=150&auto=format&fit=crop&q=80', region: 'Oceania', slug: 'australia', priceFrom: '$6.50' },
    { name: 'Mexico', image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=150&auto=format&fit=crop&q=80', region: 'Americas', slug: 'mexico', priceFrom: '$8.00' },
    { name: 'Germany', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=150&auto=format&fit=crop&q=80', region: 'Europe', slug: 'germany', priceFrom: '$4.50' },
    { name: 'Canada', image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=150&auto=format&fit=crop&q=80', region: 'Americas', slug: 'canada', priceFrom: '$6.00' }
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
    <div className="bg-slate-50 min-h-screen text-slate-900">
      {/* AIRALO-STYLE HERO */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white pt-16 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-xs font-bold tracking-widest text-blue-300 uppercase">
            WorldOverIP • Travel eSIM Comparison
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Stay connected, wherever you travel,<br className="hidden md:inline" /> at affordable rates
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
            Compare eSIM data plans from top global providers for over 200+ countries and regions.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <div className="flex items-center bg-white rounded-2xl p-2 pl-5 shadow-2xl">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="Search data packages for 200+ countries and regions..."
                className="w-full bg-transparent focus:outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
              <button 
                onClick={() => {
                  if (filteredDestinations.length > 0) {
                    handleSelect(filteredDestinations[0].slug);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-xs font-semibold transition shrink-0 flex items-center space-x-1"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dropdown Live Search Results */}
            {isOpen && filteredDestinations.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 text-slate-800">
                {filteredDestinations.map((dest) => (
                  <button
                    key={dest.slug}
                    onClick={() => handleSelect(dest.slug)}
                    className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-center justify-between transition border-b border-slate-100 last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={dest.image} alt={dest.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                      <div>
                        <span className="font-semibold text-sm text-slate-900 block">{dest.name}</span>
                        <span className="text-xs text-slate-400">{dest.region}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600">From {dest.priceFrom}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEGMENTED TAB NAVIGATION (LOCAL / REGIONAL / GLOBAL) */}
      <section className="max-w-6xl mx-auto px-6 -mt-6">
        <div className="bg-white p-1.5 rounded-2xl shadow-md border border-slate-200/60 flex items-center justify-center max-w-md mx-auto space-x-1">
          <button
            onClick={() => setActiveTab('local')}
            className={`w-1/3 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'local' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Local eSIMs
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`w-1/3 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'regional' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Regional eSIMs
          </button>
          <button
            onClick={() => setActiveTab('global')}
            className={`w-1/3 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'global' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Global eSIMs
          </button>
        </div>
      </section>

      {/* AIRALO-STYLE DESTINATION GRID */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Popular Destinations</h2>
            <p className="text-xs text-slate-500">Select a country to compare top provider data plans</p>
          </div>
          <Link href="/destinations" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <span>View all 200+ countries</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/esim/${dest.slug}`}
              className="group bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-blue-500 hover:shadow-xl transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 group-hover:scale-105 transition-transform duration-200"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-400">From {dest.priceFrom}</p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-400 transition">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY WORLDOVERIP VALUE PROPOSITION */}
      <section className="bg-white border-t border-slate-200/80 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <Zap className="w-7 h-7 text-blue-600" />
            <h4 className="font-bold text-slate-900 text-sm">Instant Connectivity</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Download your eSIM profile instantly via QR code without waiting for physical delivery.</p>
          </div>

          <div className="space-y-2">
            <Wallet className="w-7 h-7 text-blue-600" />
            <h4 className="font-bold text-slate-900 text-sm">No Roaming Fees</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Pay local rates directly from top operators and avoid expensive carrier surprises.</p>
          </div>

          <div className="space-y-2">
            <Globe className="w-7 h-7 text-blue-600" />
            <h4 className="font-bold text-slate-900 text-sm">200+ Destinations</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Coverage across Europe, Asia, Americas, Africa, and global multi-country packs.</p>
          </div>

          <div className="space-y-2">
            <ShieldCheck className="w-7 h-7 text-blue-600" />
            <h4 className="font-bold text-slate-900 text-sm">Unbiased Comparison</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Compare prices, data limits, and validity periods side-by-side before you buy.</p>
          </div>
        </div>
      </section>
    </div>
  );
}