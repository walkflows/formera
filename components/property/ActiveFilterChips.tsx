"use client";

import { X } from "lucide-react";
import type { FiltersState } from "@/lib/filters";
import { DEFAULT_FILTERS } from "@/lib/filters";

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

export function ActiveFilterChips({
  filters,
  onChange,
  onClearAll,
}: {
  filters: FiltersState;
  onChange: (patch: Partial<FiltersState>) => void;
  onClearAll: () => void;
}) {
  const chips: Chip[] = [];

  if (filters.q) {
    chips.push({ key: "q", label: `“${filters.q}”`, onRemove: () => onChange({ q: "" }) });
  }
  if (filters.purpose) {
    chips.push({
      key: "purpose",
      label: filters.purpose === "sale" ? "Buy" : "Rent",
      onRemove: () => onChange({ purpose: "", priceMin: null, priceMax: null }),
    });
  }
  filters.neighbourhoods.forEach((n) => {
    chips.push({
      key: `n-${n}`,
      label: n,
      onRemove: () =>
        onChange({ neighbourhoods: filters.neighbourhoods.filter((x) => x !== n) }),
    });
  });
  filters.types.forEach((t) => {
    chips.push({
      key: `t-${t}`,
      label: t,
      onRemove: () => onChange({ types: filters.types.filter((x) => x !== t) }),
    });
  });
  if (filters.beds !== "any") {
    chips.push({
      key: "beds",
      label: filters.beds === "studio" ? "Studio" : `${filters.beds}+ beds`,
      onRemove: () => onChange({ beds: "any" }),
    });
  }
  if (filters.baths !== "any") {
    chips.push({
      key: "baths",
      label: `${filters.baths}+ baths`,
      onRemove: () => onChange({ baths: "any" }),
    });
  }
  if (filters.priceMin !== null || filters.priceMax !== null) {
    const min = filters.priceMin !== null ? filters.priceMin.toLocaleString("en-US") : "0";
    const max = filters.priceMax !== null ? filters.priceMax.toLocaleString("en-US") : "any";
    chips.push({
      key: "budget",
      label: `Budget: $${min} – $${max}`,
      onRemove: () => onChange({ priceMin: null, priceMax: null }),
    });
  }
  if (filters.areaMin !== null || filters.areaMax !== null) {
    const min = filters.areaMin ?? 0;
    const max = filters.areaMax ?? "any";
    chips.push({
      key: "area",
      label: `Area: ${min} – ${max} sq ft`,
      onRemove: () => onChange({ areaMin: null, areaMax: null }),
    });
  }
  filters.amenities.forEach((a) => {
    chips.push({
      key: `a-${a}`,
      label: a,
      onRemove: () => onChange({ amenities: filters.amenities.filter((x) => x !== a) }),
    });
  });
  if (filters.savedOnly) {
    chips.push({ key: "saved", label: "Saved only", onRemove: () => onChange({ savedOnly: false }) });
  }

  if (chips.length === 0) return null;

  const isDefault = JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTERS);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1.5 text-sm text-ink hover:bg-ink/10"
        >
          {chip.label}
          <X size={14} aria-hidden="true" />
          <span className="visually-hidden">Remove filter</span>
        </button>
      ))}
      {!isDefault ? (
        <button
          type="button"
          onClick={onClearAll}
          className="text-sm font-medium text-deep-green underline underline-offset-2 hover:text-ink"
        >
          Clear All
        </button>
      ) : null}
    </div>
  );
}
