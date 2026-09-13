import { PlanCompare } from "@/components/plan-compare";
import {
  destinations,
  formatPrice,
  getDestination,
  getPlansForDestination,
  cheapestPlan,
  bestValuePlan,
  pricePerGb,
} from "@/lib/catalog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/esim/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return { title: "Destination not found" };
  return {
    title: `${destination.name} eSIM plans`,
    description: `Compare ${destination.name} travel eSIM prices, data, hotspot, and 5G options.`,
  };
}

export default async function DestinationPage({ params }: PageProps<"/esim/[slug]">) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const plans = getPlansForDestination(destination.slug);
  const cheap = cheapestPlan(plans);
  const value = bestValuePlan(plans);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12">
      <p className="text-sm text-muted">
        <Link href="/destinations" className="hover:text-accent">
          Destinations
        </Link>{" "}
        / {destination.region}
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl">
            {destination.flag} {destination.name} eSIMs
          </h1>
          <p className="mt-3 max-w-2xl text-muted">{destination.summary}</p>
        </div>
        <div className="rounded-2xl border border-line bg-panel px-4 py-3 text-sm">
          <p>
            From <span className="font-medium">{cheap ? formatPrice(cheap.priceUsd) : "—"}</span>
          </p>
          <p className="text-muted">
            Best value{" "}
            {value && pricePerGb(value)
              ? `${formatPrice(pricePerGb(value)!)} / GB`
              : "unlimited packs available"}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-muted">
        Typical networks: {destination.networks.join(" · ")}. Sample catalog — check the provider
        for live stock and fair-use rules.
      </div>

      <div className="mt-8">
        <PlanCompare plans={plans} destinationName={destination.name} />
      </div>
    </main>
  );
}
