import {
  destinations,
  getPlansForProvider,
  getProvider,
  providers,
} from "@/lib/catalog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return providers.map((provider) => ({ slug: provider.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/providers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProvider(slug);
  if (!provider) return { title: "Provider not found" };
  return {
    title: `${provider.name} eSIM review`,
    description: provider.tagline,
  };
}

export default async function ProviderPage({ params }: PageProps<"/providers/[slug]">) {
  const { slug } = await params;
  const provider = getProvider(slug);
  if (!provider) notFound();

  const covered = new Set(getPlansForProvider(provider.slug).map((plan) => plan.destinationSlug));
  const places = destinations.filter((item) => covered.has(item.slug));

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12">
      <p className="text-sm text-muted">
        <Link href="/providers" className="hover:text-accent">
          Providers
        </Link>
      </p>
      <h1 className="mt-3 font-serif text-4xl">{provider.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">{provider.tagline}</p>
      <p className="mt-2 text-sm text-muted">
        Founded {provider.founded} · {provider.coverage}
      </p>
      <a
        href={provider.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-highlight"
      >
        Visit {provider.name}
      </a>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-panel p-6">
          <h2 className="font-serif text-2xl">Strengths</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
            {provider.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-6">
          <h2 className="font-serif text-2xl">Watch-outs</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
            {provider.watchouts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Compare {provider.name} by destination</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {places.map((place) => (
            <Link
              key={place.slug}
              href={`/esim/${place.slug}`}
              className="rounded-full border border-line bg-panel px-3 py-1.5 text-sm hover:border-accent"
            >
              {place.flag} {place.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
