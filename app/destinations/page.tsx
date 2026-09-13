import { DestinationCard } from "@/components/destination-card";
import { DestinationSearch } from "@/components/destination-search";
import { destinations } from "@/lib/catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Browse countries and regional eSIM packs to compare travel data plans.",
};

export default function DestinationsPage() {
  const regions = [...new Set(destinations.map((item) => item.region))];

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12">
      <h1 className="font-serif text-4xl">Destinations</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Choose a country for a single-stop trip, or a regional / global pack if you are moving around.
      </p>
      <div className="mt-8 max-w-xl">
        <DestinationSearch />
      </div>
      {regions.map((region) => (
        <section key={region} className="mt-12">
          <h2 className="font-serif text-2xl">{region}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations
              .filter((item) => item.region === region)
              .map((destination) => (
                <DestinationCard key={destination.slug} destination={destination} />
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
