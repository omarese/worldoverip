"use client";

import { useMemo, useState } from "react";
import {
  bestValuePlan,
  cheapestPlan,
  formatData,
  formatPrice,
  getProvider,
  pricePerGb,
  type Plan,
} from "@/lib/catalog";

type SortKey = "price" | "value" | "data" | "days";

export function PlanCompare({ plans, destinationName }: { plans: Plan[]; destinationName: string }) {
  const [sort, setSort] = useState<SortKey>("value");
  const [onlyHotspot, setOnlyHotspot] = useState(false);
  const [onlyFiveG, setOnlyFiveG] = useState(false);
  const [duration, setDuration] = useState<"any" | "7" | "15" | "30">("any");

  const cheapest = cheapestPlan(plans);
  const valuePick = bestValuePlan(plans);

  const visible = useMemo(() => {
    const filtered = plans.filter((plan) => {
      if (onlyHotspot && !plan.hotspot) return false;
      if (onlyFiveG && !plan.fiveG) return false;
      if (duration !== "any" && plan.days !== Number(duration)) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price") return a.priceUsd - b.priceUsd;
      if (sort === "days") return a.days - b.days;
      if (sort === "data") {
        const av = a.dataGB ?? 1000;
        const bv = b.dataGB ?? 1000;
        return bv - av;
      }
      const aValue = pricePerGb(a) ?? 0;
      const bValue = pricePerGb(b) ?? 0;
      if (!a.dataGB && !b.dataGB) return a.priceUsd - b.priceUsd;
      if (!a.dataGB) return 1;
      if (!b.dataGB) return -1;
      return aValue - bValue;
    });
  }, [duration, onlyFiveG, onlyHotspot, plans, sort]);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-muted">
          Sort
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="ml-2 rounded-full border border-line bg-panel px-3 py-1.5 text-ink"
          >
            <option value="value">Best $ / GB</option>
            <option value="price">Lowest price</option>
            <option value="data">Most data</option>
            <option value="days">Shortest validity</option>
          </select>
        </label>
        <label className="text-sm text-muted">
          Days
          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value as "any" | "7" | "15" | "30")}
            className="ml-2 rounded-full border border-line bg-panel px-3 py-1.5 text-ink"
          >
            <option value="any">Any</option>
            <option value="7">7</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={onlyFiveG}
            onChange={(event) => setOnlyFiveG(event.target.checked)}
          />
          5G
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={onlyHotspot}
            onChange={(event) => setOnlyHotspot(event.target.checked)}
          />
          Hotspot
        </label>
        <p className="text-sm text-muted">{visible.length} plans for {destinationName}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-panel">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Provider</th>
              <th className="px-4 py-3 font-medium">Data</th>
              <th className="px-4 py-3 font-medium">Validity</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">$ / GB</th>
              <th className="px-4 py-3 font-medium">Features</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {visible.map((plan) => {
              const provider = getProvider(plan.providerSlug);
              const perGb = pricePerGb(plan);
              const isCheap = cheapest?.id === plan.id;
              const isValue = valuePick?.id === plan.id;
              return (
                <tr key={plan.id} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-3">
                    <a href={`/providers/${plan.providerSlug}`} className="font-medium text-ink hover:text-accent">
                      {provider?.name}
                    </a>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {isValue ? (
                        <span className="rounded-full bg-highlight px-2 py-0.5 text-[11px] text-ink">
                          Best value
                        </span>
                      ) : null}
                      {isCheap ? (
                        <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] text-highlight">
                          Lowest price
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">{formatData(plan)}</td>
                  <td className="px-4 py-3">{plan.days} days</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(plan.priceUsd)}</td>
                  <td className="px-4 py-3 text-muted">
                    {perGb ? formatPrice(perGb) : "—"}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {plan.fiveG ? "5G · " : "4G · "}
                    {plan.hotspot ? "Hotspot" : "No hotspot"}
                    <div className="text-xs">{plan.networks.join(", ")}</div>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={provider?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full bg-accent px-3 py-1.5 text-panel hover:bg-accent-dark"
                    >
                      View deal
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!visible.length ? (
          <p className="px-4 py-8 text-center text-muted">No plans match those filters.</p>
        ) : null}
      </div>
    </section>
  );
}
