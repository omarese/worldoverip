'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ArrowRight, 
  Globe, 
  ArrowUpDown, 
  Smartphone, 
  QrCode, 
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface Destination {
  name: string;
  flag: string;
  slug: string;
  priceEUR: string;
  priceUSD: string;
}

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'popular' | 'local' | 'regional' | 'global'>('popular');

  const popularLocations: Destination[] = [
    { name: 'Netherlands', flag: '🇳🇱', slug: 'netherlands', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'Turkey', flag: '🇹🇷', slug: 'turkey', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'United States', flag: '🇺🇸', slug: 'united-states', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'Thailand', flag: '🇹🇭', slug: 'thailand', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'Italy', flag: '🇮🇹', slug: 'italy', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'Spain', flag: '🇪🇸', slug: 'spain', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'Indonesia', flag: '🇮🇩', slug: 'indonesia', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'United Kingdom', flag: '🇬🇧', slug: 'united-kingdom', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'China', flag: '🇨🇳', slug: 'china', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'Japan', flag: '🇯🇵', slug: 'japan', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'Albania', flag: '🇦🇱', slug: 'albania', priceEUR: '4.00 €', priceUSD: '$4.50' },
    { name: 'Egypt', flag: '🇪🇬', slug: 'egypt', priceEUR: '5.00 €', priceUSD: '$5.50' },
  ];

  const filtered = query.trim() === ''
    ? []
    : popularLocations.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (slug: string) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/esim/${slug}`);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-slate-800 font-sans tracking-tight pb-20">
      
      {/* HERO SECTION WITH SEARCH */}
      <section className="pt-14 pb-10 px-6 max-w-4xl mx-auto text-center space-y-5">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
          Stay connected, wherever you travel, at affordable rates
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base">
          Compare eSIM data packages for 200+ countries and regions.
        </p>

        {/* Hero Search Bar */}
        <div className="max-w-xl mx-auto pt-3 relative">
          <div className="flex items-center bg-white rounded-full p-2.5 pl-6 shadow-md border border-slate-200">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
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
                if (filtered.length > 0) handleSelect(filtered[0].slug);
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 py-2 text-xs font-bold transition shrink-0 flex items-center space-x-1"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Search Dropdown */}
          {isOpen && filtered.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-800">
              {filtered.map((dest) => (
                <button
                  key={dest.slug}
                  onClick={() => handleSelect(dest.slug)}
                  className="w-full text-left px-5 py-3 hover:bg-sky-50 flex items-center justify-between transition border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{dest.flag}</span>
                    <span className="font-bold text-sm text-slate-900">{dest.name}</span>
                  </div>
                  <span className="text-xs font-black text-sky-600">{dest.priceEUR}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SCREENSHOT 1: WHY CHOOSE WORLDOVERIP BANNER */}
      <section className="max-w-6xl mx-auto px-6 my-8">
        <div className="bg-[#78C8DB] rounded-[36px] p-8 md:p-14 text-slate-900 relative overflow-hidden shadow-sm">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-10 tracking-tight leading-tight">
            Why do over 30 million people choose WorldOverIP?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                <Globe className="w-7 h-7 text-slate-900" />
              </div>
              <p className="text-sm font-extrabold leading-snug px-2">
                Local, regional, and global coverage for 200+ locations
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                <ArrowUpDown className="w-7 h-7 text-slate-900" />
              </div>
              <p className="text-sm font-extrabold leading-snug px-2">
                Flexible packages, including unlimited data options
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                <Smartphone className="w-7 h-7 text-slate-900" />
              </div>
              <p className="text-sm font-extrabold leading-snug px-2">
                App available in 53 languages, multiple currencies
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                <QrCode className="w-7 h-7 text-slate-900" />
              </div>
              <p className="text-sm font-extrabold leading-snug px-2">
                Easy installation and set up to get connected in minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOT 2: POPULAR LOCATIONS GREEN CARD CONTAINER */}
      <section className="max-w-6xl mx-auto px-6 my-10">
        <div className="bg-[#5FB58A] rounded-[36px] p-6 md:p-10 text-slate-900 shadow-sm">
          
          {/* Top Category Tabs */}
          <div className="border-b border-slate-900/20 pb-4 mb-6 flex flex-wrap items-center space-x-8 text-sm font-bold">
            <button
              onClick={() => setActiveTab('popular')}
              className={`flex items-center space-x-2 pb-2 transition border-b-2 ${
                activeTab === 'popular' ? 'border-slate-900 font-extrabold' : 'border-transparent text-slate-800/80 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Popular</span>
            </button>

            <button
              onClick={() => setActiveTab('local')}
              className={`flex items-center space-x-2 pb-2 transition border-b-2 ${
                activeTab === 'local' ? 'border-slate-900 font-extrabold' : 'border-transparent text-slate-800/80 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Local</span>
            </button>

            <button
              onClick={() => setActiveTab('regional')}
              className={`flex items-center space-x-2 pb-2 transition border-b-2 ${
                activeTab === 'regional' ? 'border-slate-900 font-extrabold' : 'border-transparent text-slate-800/80 hover:text-slate-900'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Regional</span>
            </button>

            <button
              onClick={() => setActiveTab('global')}
              className={`flex items-center space-x-2 pb-2 transition border-b-2 ${
                activeTab === 'global' ? 'border-slate-900 font-extrabold' : 'border-transparent text-slate-800/80 hover:text-slate-900'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Global</span>
            </button>
          </div>

          {/* Heading & View All Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                Get eSIMs for popular locations
              </h2>
              <p className="text-xs md:text-sm text-slate-900/80 font-medium">
                Explore our most popular eSIMs — packages start from the shown price.
              </p>
            </div>
            <Link 
              href="/destinations" 
              className="bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs px-5 py-3 rounded-full shadow-sm transition self-start md:self-auto shrink-0"
            >
              View all locations
            </Link>
          </div>

          {/* 3-Column Pill Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularLocations.map((item) => (
              <Link
                key={item.slug}
                href={`/esim/${item.slug}`}
                className="bg-white hover:shadow-md transition-all rounded-2xl px-4 py-3.5 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.flag}</span>
                  <span className="font-extrabold text-sm text-slate-900 group-hover:text-sky-600 transition">
                    {item.name}
                  </span>
                </div>
                <span className="font-black text-sm text-slate-900">
                  {item.priceEUR}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}