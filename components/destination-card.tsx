import type { Destination } from "@/lib/catalog";
import Link from "next/link";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/esim/${destination.slug}`}
      className="group rounded-2xl border border-line bg-panel p-5 transition hover:-translate-y-0.5 hover:border-accent"
    >
      <p className="text-2xl">{destination.flag}</p>
      <h3 className="mt-3 font-serif text-xl text-ink">{destination.name}</h3>
      <p className="mt-1 text-sm text-muted">{destination.region}</p>
      <p className="mt-3 line-clamp-2 text-sm text-ink/80">{destination.summary}</p>
      <p className="mt-4 text-sm text-accent group-hover:underline">Compare eSIMs →</p>
    </Link>
  );
}
