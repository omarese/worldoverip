import type { Metadata } from 'next';
import { DestinationCard } from '@/components/destination-card';
import { destinations, regions } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Browse travel stories by country and find inspiration for your next trip.',
};

export default function DestinationsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
          Destinations
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base">
          Choose a country and read what fellow travellers have to say about it.
        </p>
      </div>

      <div className="space-y-8">
        {regions.map((region) => {
          const list = destinations.filter((item) => item.region === region);
          if (!list.length) return null;
          return (
            <section key={region} className="bg-white/70 rounded-[28px] border border-slate-200/70 shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 mb-5">{region}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {list.map((destination) => (
                  <DestinationCard key={destination.slug} destination={destination} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}