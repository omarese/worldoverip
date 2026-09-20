'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Clock, Globe, MapPin } from 'lucide-react';
import { StoryCard } from '@/components/story-card';
import { getDestination, type Story } from '@/lib/data';

type Tab = 'popular' | 'newest' | 'europe' | 'beyond';

const tabs: { id: Tab; label: string; Icon: typeof Sparkles }[] = [
  { id: 'popular', label: 'Popular', Icon: Sparkles },
  { id: 'newest', label: 'Newest', Icon: Clock },
  { id: 'europe', label: 'Europe', Icon: MapPin },
  { id: 'beyond', label: 'Beyond Europe', Icon: Globe },
];

export function StoryFeed({
  stories,
  title,
  subtitle,
  limit,
  viewAllHref,
  headingAs = 'h2',
}: {
  stories: Story[];
  title: string;
  subtitle: string;
  limit?: number;
  viewAllHref?: string;
  headingAs?: 'h1' | 'h2';
}) {
  const [activeTab, setActiveTab] = useState<Tab>('popular');
  const Heading = headingAs;

  const visible = useMemo(() => {
    const isEurope = (story: Story) => getDestination(story.destinationSlug)?.region === 'Europe';
    let list = [...stories];

    if (activeTab === 'popular') list.sort((a, b) => b.likes - a.likes);
    if (activeTab === 'newest') list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    if (activeTab === 'europe') list = list.filter(isEurope);
    if (activeTab === 'beyond') list = list.filter((story) => !isEurope(story));

    return limit ? list.slice(0, limit) : list;
  }, [stories, activeTab, limit]);

  return (
    <div className="bg-[#5FB58A] rounded-[28px] p-6 md:p-8 text-slate-900 shadow-sm">

      <div className="border-b border-slate-900/20 pb-3 mb-5 flex flex-wrap items-center gap-x-6 text-xs font-bold" role="tablist">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-1.5 pb-2 transition border-b-2 ${
              activeTab === id
                ? 'border-slate-900 font-extrabold'
                : 'border-transparent text-slate-800/80 hover:text-slate-900'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <Heading className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
            {title}
          </Heading>
          <p className="text-xs text-slate-900/80 font-medium">{subtitle}</p>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs px-4 py-2.5 rounded-full shadow-sm transition self-start md:self-auto shrink-0"
          >
            View all stories
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="tabpanel">
        {visible.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </div>
  );
}