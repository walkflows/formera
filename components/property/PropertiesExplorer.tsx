"use client";

import { useId, useMemo, useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import type { Property } from "@/lib/types";
import {
  applyFilters,
  paginate,
  sortProperties,
  type FiltersState,
} from "@/lib/filters";
import { useFilters } from "@/components/property/useFilters";
import { useSavedProperties } from "@/context/SavedPropertiesContext";
import { FiltersFields } from "@/components/property/FiltersFields";
import { FiltersSheet } from "@/components/property/FiltersSheet";
import { ActiveFilterChips } from "@/components/property/ActiveFilterChips";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";

function moreFiltersCount(f: FiltersState): number {
  return (
    f.neighbourhoods.length +
    f.types.length +
    (f.beds !== "any" ? 1 : 0) +
    (f.baths !== "any" ? 1 : 0) +
    (f.priceMin !== null || f.priceMax !== null ? 1 : 0) +
    (f.areaMin !== null || f.areaMax !== null ? 1 : 0) +
    f.amenities.length +
    (f.savedOnly ? 1 : 0)
  );
}

export function PropertiesExplorer({ properties }: { properties: Property[] }) {
  const { filters, updateFilters, clearAll, applyFilters: applyAndPush } = useFilters();
  const { savedIds, hydrated } = useSavedProperties();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const searchId = useId();

  const filtered = useMemo(
    () => applyFilters(properties, filters, hydrated ? savedIds : []),
    [properties, filters, savedIds, hydrated]
  );
  const sorted = useMemo(() => sortProperties(filtered, filters.sort), [filtered, filters.sort]);
  const { items, page, totalPages, total } = paginate(sorted, filters.page);

  const activeMoreCount = moreFiltersCount(filters);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-panel border border-divider bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="flex-1 min-w-[220px]">
            <label htmlFor={searchId} className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
              Search homes or neighbourhoods
            </label>
            <div className="relative mt-2">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
                aria-hidden="true"
              />
              <input
                id={searchId}
                type="search"
                value={filters.q}
                onChange={(e) => updateFilters({ q: e.target.value })}
                placeholder="Try “Tribeca” or “loft”"
                className="w-full rounded-lg border border-divider bg-background py-2.5 pl-9 pr-3 text-[15px] text-ink placeholder:text-ink-soft"
              />
            </div>
          </div>

          <div className="min-w-[140px]">
            <label htmlFor="purpose" className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
              Purpose
            </label>
            <select
              id="purpose"
              value={filters.purpose}
              onChange={(e) =>
                updateFilters({
                  purpose: e.target.value as FiltersState["purpose"],
                  priceMin: null,
                  priceMax: null,
                })
              }
              className="mt-2 w-full rounded-lg border border-divider bg-background px-3 py-2.5 text-[15px] text-ink"
            >
              <option value="">All homes</option>
              <option value="sale">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          <div className="min-w-[160px]">
            <label htmlFor="sort" className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
              Sort
            </label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value as FiltersState["sort"] }, { resetPage: false })}
              className="mt-2 w-full rounded-lg border border-divider bg-background px-3 py-2.5 text-[15px] text-ink"
            >
              <option value="featured">Featured</option>
              <option value="price-asc" disabled={!filters.purpose}>
                Price: Low to High{!filters.purpose ? " (choose Buy or Rent)" : ""}
              </option>
              <option value="price-desc" disabled={!filters.purpose}>
                Price: High to Low{!filters.purpose ? " (choose Buy or Rent)" : ""}
              </option>
              <option value="area-desc">Largest area</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            className="hidden items-center gap-2 rounded-lg border border-divider bg-background px-4 py-2.5 text-[15px] font-medium text-ink hover:border-ink/40 md:inline-flex"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            More Filters
            {activeMoreCount > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-deep-green px-1 text-[11px] text-white">
                {activeMoreCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-divider bg-background px-4 py-2.5 text-[15px] font-medium text-ink hover:border-ink/40 md:hidden"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            Filters
            {activeMoreCount > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-deep-green px-1 text-[11px] text-white">
                {activeMoreCount}
              </span>
            ) : null}
          </button>
        </div>

        {!filters.purpose ? (
          <p className="text-sm text-ink-soft">Choose Buy or Rent to filter or sort by price.</p>
        ) : null}

        {moreOpen ? (
          <div className="hidden border-t border-divider pt-4 md:block">
            <FiltersFields value={filters} onChange={(patch) => updateFilters(patch)} />
          </div>
        ) : null}

        <ActiveFilterChips filters={filters} onChange={(patch) => updateFilters(patch)} onClearAll={clearAll} />
      </div>

      <FiltersSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        allProperties={properties}
        savedIds={hydrated ? savedIds : []}
        onApply={(next) => applyAndPush(next)}
      />

      <p aria-live="polite" className="mt-6 text-sm text-ink-soft">
        {total} {total === 1 ? "home" : "homes"} found
      </p>

      {items.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-panel border border-divider bg-surface p-10 text-center">
          <h2 className="font-heading text-xl text-ink">No homes match those choices yet.</h2>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">
            Try a wider budget, another neighbourhood or fewer must-have features.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" onClick={clearAll}>
              Clear Filters
            </Button>
            <Button href="/contact?intent=buy">Tell Us What You Need</Button>
          </div>
        </div>
      )}

      {totalPages > 1 ? (
        <nav aria-label="Properties pagination" className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => updateFilters({ page: page - 1 }, { resetPage: false })}
            className="rounded-full border border-divider px-4 py-2 text-sm text-ink disabled:opacity-40"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              aria-current={p === page ? "page" : undefined}
              onClick={() => updateFilters({ page: p }, { resetPage: false })}
              className={`h-10 w-10 rounded-full text-sm ${
                p === page ? "bg-ink text-white" : "text-ink hover:bg-ink/5"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => updateFilters({ page: page + 1 }, { resetPage: false })}
            className="rounded-full border border-divider px-4 py-2 text-sm text-ink disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      ) : null}
    </div>
  );
}
