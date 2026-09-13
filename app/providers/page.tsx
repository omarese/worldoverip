import { providers } from "@/lib/catalog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "eSIM providers",
  description: "Independent profiles of travel eSIM brands compared on WorldOverIP.",
};

export default function ProvidersPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12">
      <h1 className="font-serif text-4xl">Providers</h1>
      <p className="mt-3 max-w-2xl text-muted">
        These are the brands currently in the WorldOverIP catalog. Open a profile for strengths,
        watch-outs, and every destination they cover here.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {providers.map((provider) => (
          <Link
            key={provider.slug}
            href={`/providers/${provider.slug}`}
            className="rounded-2xl border border-line bg-panel p-6 hover:border-accent"
          >
            <h2 className="font-serif text-2xl">{provider.name}</h2>
            <p className="mt-2 text-muted">{provider.tagline}</p>
            <p className="mt-4 text-sm text-accent">{provider.coverage}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
