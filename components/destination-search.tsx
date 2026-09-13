"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { destinations } from "@/lib/catalog";

export function DestinationSearch({
  autoFocus = false,
  compact = false,
}: {
  autoFocus?: boolean;
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations.filter((item) => item.popular).slice(0, 8);
    return destinations
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query]);

  return (
    <div className={compact ? "" : "w-full"}>
      <label htmlFor="destination" className="sr-only">
        Search destinations
      </label>
      <input
        id="destination"
        autoFocus={autoFocus}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search Japan, Europe, Turkey…"
        className="w-full rounded-full border border-line bg-panel px-5 py-3.5 text-base text-ink outline-none ring-highlight placeholder:text-muted focus:ring-2"
      />
      <ul className="mt-3 overflow-hidden rounded-2xl border border-line bg-panel">
        {matches.map((item) => (
          <li key={item.slug} className="border-b border-line last:border-b-0">
            <Link
              href={`/esim/${item.slug}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-highlight/40"
            >
              <span>
                <span className="mr-2">{item.flag}</span>
                {item.name}
              </span>
              <span className="text-sm text-muted">{item.region}</span>
            </Link>
          </li>
        ))}
        {!matches.length ? (
          <li className="px-4 py-3 text-sm text-muted">No destinations match that search.</li>
        ) : null}
      </ul>
    </div>
  );
}
