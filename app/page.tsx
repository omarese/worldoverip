'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ChevronDown, 
  Globe, 
  ArrowUpDown, 
  Smartphone, 
  QrCode, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface Destination {
  name: string;
  flag: string;
  slug: string;
  priceEUR: string;
}

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'popular' | 'local' | 'regional' | 'global'>('popular');

  const popularLocations: Destination[] = [
    { name: 'Netherlands', flag: '🇳🇱', slug: 'netherlands', priceEUR: '4.00 €' },
    { name: 'Turkey', flag: '🇹🇷', slug: 'turkey', priceEUR: '4.00 €' },
    { name: 'United States', flag: '🇺🇸', slug: 'united-states', priceEUR: '4.00 €' },
    { name: 'Thailand', flag: '🇹🇭', slug: 'thailand', priceEUR: '4.00 €' },
    { name: 'Italy', flag: '🇮🇹', slug: 'italy', priceEUR: '4.00 €' },
    { name: 'Spain', flag: '🇪🇸', slug: 'spain', priceEUR: '4.00 €' },
    { name: 'Indonesia', flag: '🇮🇩', slug: 'indonesia', priceEUR: '4.00 €' },
    { name: 'United Kingdom', flag: '🇬🇧', slug: 'united-kingdom', priceEUR: '4.00 €' },
    { name: 'China', flag: '🇨🇳', slug: 'china', priceEUR: '4.00 €' },
    { name: 'Japan', flag: '🇯🇵', slug: 'japan', priceEUR: '4.00 €' },
    { name: 'Albania', flag: '🇦🇱', slug: 'albania', priceEUR: '4.00 €' },
    { name: 'Egypt', flag: '🇪🇬', slug: 'egypt', priceEUR: '5.00 €' },
  ];

  const regionalLocations = [
    { name: 'Africa', slug: 'africa' },
    { name: 'Africa Safari', slug: 'africa-safari' },
    { name: 'Asia', slug: 'asia' },
    { name: 'Caribbean Islands', slug: 'caribbean-islands' },
    { name: 'Europe', slug: 'europe' },
    { name: 'European Union and United Kingdom', slug: 'eu-uk' },
    { name: 'Latin America', slug: 'latin-america' },
    { name: 'Middle East and North Africa', slug: 'mena' },
    { name: 'North America', slug: 'north-america' },
    { name: 'Oceania', slug: 'oceania' },
    { name: 'Global', slug: 'global' },
  ];

  const filtered = query.trim() === ''
    ? popularLocations
    : popularLocations.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (slug: string) => {
    setQuery('');
    setIsDropdownOpen(false);
    router.push(`/esim/${slug}`);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-slate-800 font-sans tracking-tight pb-20">
      
      {/* FULL-WIDTH SEARCH BAR SECTION WITH SIDE LINES */}
      <section className="pt-12 pb-8 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Decorative Left Line */}
          <div className="flex-1 h-[1px] bg-slate-300 hidden sm:block" />

          {/* Full Width Search Container */}
          <div className="relative flex-1 max-w-5xl">
            <div className="flex items-center bg-white rounded-full border border-slate-300 shadow-sm focus-within:border-slate-400 transition-all overflow-hidden">
              
              {/* Left Search Input */}
              <div className="flex items-center flex-1 px-5 py-3.5">
                <Search className="w-5 h-5 text-slate-800 mr-3 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Where do you need an eSIM?"
                  className="w-full bg-transparent outline-none text-base font-bold text-slate-900 placeholder:text-slate-900 placeholder:font-bold"
                />
              </div>

              {/* Right Dropdown Toggle Button */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 border-l border-slate-200 px-6 py-3.5 hover:bg-slate-50 text-slate-900 font-extrabold text-sm shrink-0 transition"
              >
                <span>Locations</span>
                <ChevronDown className={`w-4 h-4 text-slate-800 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* SCREENSHOT 2: DUAL PANEL DROPDOWN MENU */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-[#F7F4EE] rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-50 p-6 flex flex-col md:flex-row gap-6">
                
                {/* Left Panel: Popular Locations */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-5">Popular locations</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
                      {filtered.slice(0, 12).map((item) => (
                        <button
                          key={item.slug}
                          onClick={() => handleSelect(item.slug)}
                          className="flex items-center space-x-3 text-left hover:text-sky-600 transition group"
                        >
                          <span className="text-xl shrink-0">{item.flag}</span>
                          <span className="text-sm font-bold text-slate-900 group-hover:text-sky-600">
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Explore eSIM Store Action Button */}
                  <div className="pt-8">
                    <Link
                      href="/destinations"
                      onClick={() => setIsDropdownOpen(false)}
                      className="inline-block bg-white hover:bg-slate-100 border border-slate-300 rounded-full px-6 py-2.5 text-xs font-black text-slate-900 transition shadow-sm"
                    >
                      Explore eSIM Store
                    </Link>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-[1px] bg-slate-200/80 self-stretch" />

                {/* Right Panel: Regional and Global eSIMs */}
                <div className="w-full md:w-72 shrink-0">
                  <h3 className="text-lg font-black text-slate-900 mb-5">
                    Regional and global eSIMs
                  </h3>
                  
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-2">
                    {regionalLocations.map((region) => (
                      <button
                        key={region.slug}
                        onClick={() => handleSelect(region.slug)}
                        className="block w-full text-left text-sm font-medium text-slate-800 hover:text-sky-600 transition"
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Decorative Right Line */}
          <div className="flex-1 h-[1px] bg-slate-300 hidden sm:block" />
        </div>
      </section>

      {/* WHY CHOOSE WORLDOVERIP BANNER */}
      <section className="max-w-7xl mx-auto px-6 my-8">
        <div className="bg-[#78C8DB] rounded-[36px] p-8 md:p-14 text-slate-900 relative overflow-hidden shadow-sm">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-10 tracking-tight leading-tight">
            Why do over 30 million people choose WorldOverIP?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                <Globe className="w-7 h-7 text-slate-900" />
              </div>
              <p className="text-sm font-extrabold leading-snug px-2">
                Local, regional, and global coverage for 200+ locations
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                <ArrowUpDown className="w-7 h-7 text-slate-900" />
              </div>
              <p className="text-sm font-extrabold leading-snug px-2">
                Flexible packages, including unlimited data options
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                <Smartphone className="w-7 h-7 text-slate-900" />
              </div>
              <p className="text-sm font-extrabold leading-snug px-2">
                App available in 53 languages, multiple currencies
              </p>
            </div>

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

      {/* POPULAR LOCATIONS CONTAINER */}
      <section className="max-w-7xl mx-auto px-6 my-10">
        <div className="bg-[#5FB58A] rounded-[36px] p-6 md:p-10 text-slate-900 shadow-sm">
          
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