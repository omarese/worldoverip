import Link from 'next/link';
import { BookOpen, MapPin, Users, Heart, PenLine } from 'lucide-react';
import { StoryFeed } from '@/components/story-feed';
import { DestinationCard } from '@/components/destination-card';
import { destinations, stories } from '@/lib/data';

const features = [
  { Icon: BookOpen, text: 'Write diary-style posts for every day of your trip' },
  { Icon: MapPin, text: 'Pin each story to a country so others can find it' },
  { Icon: Users, text: 'Follow travellers and get inspired by their journeys' },
  { Icon: Heart, text: 'Like the stories that make you want to pack your bag' },
];

export default function HomePage() {
  return (
    <div className="pb-20">

      {/* HERO SECTION WITH HEADLINE */}
      <section className="relative z-10 pt-12 pb-6 px-6 max-w-5xl mx-auto text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
          Share your journey, wherever you travel,<br className="hidden md:block" /> and inspire the next trip
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base">
          Keep a travel diary, share your favourite places and discover stories from travellers around the world.
        </p>
      </section>

      {/* CALL TO ACTION ROW */}
      <section className="relative z-20 pb-10 px-4 max-w-[96%] mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-slate-300/80 hidden md:block" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mx-auto">
            <Link
              href="/register"
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-700 text-white rounded-full px-7 py-3.5 text-sm font-black shadow-sm transition"
            >
              <PenLine className="w-4 h-4" />
              <span>Share your first trip</span>
            </Link>
            <Link
              href="/explore"
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 rounded-full px-7 py-3.5 text-sm font-extrabold shadow-sm transition"
            >
              Explore stories
            </Link>
          </div>

          <div className="flex-1 h-[1px] bg-slate-300/80 hidden md:block" />
        </div>
      </section>

      {/* COMPACT BLUE FEATURE BANNER */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 my-6">
        <div className="bg-[#78C8DB] rounded-[28px] p-6 md:p-10 text-slate-900 relative overflow-hidden shadow-sm">
          <h2 className="text-xl md:text-3xl font-black text-center mb-8 tracking-tight leading-tight">
            Why do travellers love sharing on WorldOverIP?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-slate-900" />
                </div>
                <p className="text-xs font-extrabold leading-snug px-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPACT GREEN STORIES CONTAINER */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 my-8">
        <StoryFeed
          stories={stories}
          limit={6}
          title="Fresh from the road"
          subtitle="The latest and most loved travel stories from our community."
          viewAllHref="/explore"
        />
      </section>

      {/* PEACH DESTINATIONS CONTAINER */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 my-8">
        <div className="bg-[#FCD8B5] rounded-[28px] p-6 md:p-8 text-slate-900 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
                Where do you want to go next?
              </h2>
              <p className="text-xs text-slate-900/80 font-medium">
                Pick a destination and read what travellers say about it.
              </p>
            </div>
            <Link
              href="/destinations"
              className="bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs px-4 py-2.5 rounded-full shadow-sm transition self-start md:self-auto shrink-0"
            >
              View all destinations
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {destinations.slice(0, 6).map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CALL TO ACTION */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 my-8">
        <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm p-6 md:p-10 text-center">
          <h2 className="text-xl md:text-3xl font-black tracking-tight text-slate-900">
            Got a trip worth sharing?
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-600 max-w-xl mx-auto">
            Create a free account and start your travel diary. Your next trip could be someone else’s inspiration.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="bg-slate-900 hover:bg-slate-700 text-white rounded-full px-7 py-3.5 text-sm font-black shadow-sm transition"
            >
              Register for free
            </Link>
            <Link
              href="/login"
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 rounded-full px-7 py-3.5 text-sm font-extrabold shadow-sm transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}