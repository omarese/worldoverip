import { DestinationCard } from "@/components/destination-card";
import { DestinationSearch } from "@/components/destination-search";
import { destinations, providers } from "@/lib/catalog";
import Link from "next/link";

export default function Home() {
  const popular = destinations.filter((item) => item.popular);

  return (
    <main>
      <section className="border-b border-line bg-[radial-gradient(circle_at_top_right,_#d8f25c33,_transparent_42%)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Travel data, compared</p>
            <h1 className="mt-3 max-w-xl font-serif text-5xl leading-[1.05] text-ink sm:text-6xl">
              Find the right eSIM before you take off.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted">
              WorldOverIP ranks travel eSIM plans by destination, gigabytes, and price so you can
              skip airport kiosks and expensive roaming.
            </p>
          </div>
          <DestinationSearch autoFocus />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl">Popular destinations</h2>
          <Link href="/destinations" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
          {[
            {
              title: "1. Pick a place",
              body: "Search a country or a regional pack if you are crossing borders.",
            },
            {
              title: "2. Compare the grid",
              body: "Sort by price, data, hotspot, and 5G. We flag lowest price and best value.",
            },
            {
              title: "3. Buy on the provider",
              body: "Install the eSIM in minutes. Keep your regular number for calls and codes.",
            },
          ].map((step) => (
            <div key={step.title}>
              <h3 className="font-serif text-2xl">{step.title}</h3>
              <p className="mt-2 text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-serif text-3xl">Providers in the catalog</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {providers.map((provider) => (
            <Link
              key={provider.slug}
              href={`/providers/${provider.slug}`}
              className="rounded-2xl border border-line bg-panel p-5 hover:border-accent"
            >
              <h3 className="font-serif text-xl">{provider.name}</h3>
              <p className="mt-2 text-sm text-muted">{provider.tagline}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-accent">{provider.coverage}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
