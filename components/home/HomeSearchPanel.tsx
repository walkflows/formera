"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { allNeighbourhoods, neighbourhoodSlug } from "@/lib/filters";

export function HomeSearchPanel() {
  const router = useRouter();
  const [purpose, setPurpose] = useState<"sale" | "rent">("sale");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [beds, setBeds] = useState("");
  const purposeId = useId();
  const neighbourhoodId = useId();
  const bedsId = useId();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("purpose", purpose);
    if (neighbourhood) params.set("neighbourhood", neighbourhood);
    if (beds) params.set("beds", beds);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-3 rounded-panel bg-white p-4 shadow-[0_20px_45px_rgba(32,35,31,0.18)] sm:grid-cols-4 sm:items-end sm:p-5"
    >
      <label className="col-span-1 block">
        <span className="block text-xs font-medium uppercase tracking-wide text-ink-soft" id={`${purposeId}-label`}>
          Buy / Rent
        </span>
        <select
          id={purposeId}
          aria-labelledby={`${purposeId}-label`}
          value={purpose}
          onChange={(e) => setPurpose(e.target.value as "sale" | "rent")}
          className="mt-1.5 w-full rounded-lg border border-divider bg-background px-2.5 py-2.5 text-sm text-ink"
        >
          <option value="sale">Buy</option>
          <option value="rent">Rent</option>
        </select>
      </label>

      <label className="col-span-1 block">
        <span className="block text-xs font-medium uppercase tracking-wide text-ink-soft" id={`${neighbourhoodId}-label`}>
          Neighbourhood
        </span>
        <select
          id={neighbourhoodId}
          aria-labelledby={`${neighbourhoodId}-label`}
          value={neighbourhood}
          onChange={(e) => setNeighbourhood(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-divider bg-background px-2.5 py-2.5 text-sm text-ink"
        >
          <option value="">Any</option>
          {allNeighbourhoods().map((n) => (
            <option key={n} value={neighbourhoodSlug(n)}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <label className="col-span-1 block">
        <span className="block text-xs font-medium uppercase tracking-wide text-ink-soft" id={`${bedsId}-label`}>
          Bedrooms
        </span>
        <select
          id={bedsId}
          aria-labelledby={`${bedsId}-label`}
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-divider bg-background px-2.5 py-2.5 text-sm text-ink"
        >
          <option value="">Any</option>
          <option value="studio">Studio</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </label>

      <button
        type="submit"
        className="col-span-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-gold-ink transition-colors hover:bg-[#bb9a5f] sm:col-span-1"
      >
        Find Homes
      </button>
    </form>
  );
}
