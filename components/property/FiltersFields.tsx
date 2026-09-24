"use client";

import clsx from "clsx";
import type { Amenity, Neighbourhood, PropertyType } from "@/lib/types";
import {
  BUY_BUDGET_CHIPS,
  RENT_BUDGET_CHIPS,
  allAmenities,
  allNeighbourhoods,
  allTypes,
  type FiltersState,
} from "@/lib/filters";

function toggleInList<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const fieldLabel = "block text-xs font-medium uppercase tracking-wide text-ink-soft";
const pillBase =
  "rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-green";

export function FiltersFields({
  value,
  onChange,
}: {
  value: FiltersState;
  onChange: (patch: Partial<FiltersState>) => void;
}) {
  const budgetChips = value.purpose === "rent" ? RENT_BUDGET_CHIPS : BUY_BUDGET_CHIPS;
  const budgetInvalid =
    value.priceMin !== null && value.priceMax !== null && value.priceMin > value.priceMax;

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className={fieldLabel}>Neighbourhood</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {allNeighbourhoods().map((n: Neighbourhood) => {
            const active = value.neighbourhoods.includes(n);
            return (
              <button
                key={n}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  onChange({ neighbourhoods: toggleInList(value.neighbourhoods, n) })
                }
                className={clsx(
                  pillBase,
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-divider bg-transparent text-ink hover:border-ink/40"
                )}
              >
                {n}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={fieldLabel}>Property type</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {allTypes().map((t: PropertyType) => {
            const active = value.types.includes(t);
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ types: toggleInList(value.types, t) })}
                className={clsx(
                  pillBase,
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-divider bg-transparent text-ink hover:border-ink/40"
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={fieldLabel} htmlFor="beds">
            Bedrooms
          </label>
          <select
            id="beds"
            value={value.beds}
            onChange={(e) => onChange({ beds: e.target.value as FiltersState["beds"] })}
            className="mt-2 w-full rounded-lg border border-divider bg-surface px-3 py-2.5 text-[15px] text-ink"
          >
            <option value="any">Any</option>
            <option value="studio">Studio</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div>
          <label className={fieldLabel} htmlFor="baths">
            Bathrooms
          </label>
          <select
            id="baths"
            value={value.baths}
            onChange={(e) => onChange({ baths: e.target.value as FiltersState["baths"] })}
            className="mt-2 w-full rounded-lg border border-divider bg-surface px-3 py-2.5 text-[15px] text-ink"
          >
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={fieldLabel}>
          Budget {value.purpose === "rent" ? "(monthly rent, USD)" : value.purpose === "sale" ? "(purchase price, USD)" : ""}
        </legend>
        {!value.purpose ? (
          <p className="mt-2 text-sm text-ink-soft">
            Choose Buy or Rent to filter or sort by price.
          </p>
        ) : (
          <>
            <div className="mt-2 flex flex-wrap gap-2">
              {budgetChips.map((chip) => {
                const active = value.priceMin === chip.min && value.priceMax === chip.max;
                return (
                  <button
                    key={chip.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onChange({ priceMin: chip.min, priceMax: chip.max })}
                    className={clsx(
                      pillBase,
                      active
                        ? "border-gold bg-gold text-gold-ink"
                        : "border-divider bg-transparent text-ink hover:border-ink/40"
                    )}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs text-ink-soft">Min</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={value.priceMin ?? ""}
                  onChange={(e) =>
                    onChange({
                      priceMin: e.target.value === "" ? null : Number(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-divider bg-surface px-3 py-2 text-[15px]"
                />
              </label>
              <label className="block">
                <span className="text-xs text-ink-soft">Max</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={value.priceMax ?? ""}
                  onChange={(e) =>
                    onChange({
                      priceMax: e.target.value === "" ? null : Number(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-divider bg-surface px-3 py-2 text-[15px]"
                />
              </label>
            </div>
            {budgetInvalid ? (
              <p role="alert" className="mt-2 text-sm text-red-700">
                Your maximum budget must be higher than or equal to your minimum.
              </p>
            ) : null}
          </>
        )}
      </fieldset>

      <fieldset>
        <legend className={fieldLabel}>Interior area (sq ft)</legend>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-ink-soft">Min</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={value.areaMin ?? ""}
              onChange={(e) =>
                onChange({ areaMin: e.target.value === "" ? null : Number(e.target.value) })
              }
              className="mt-1 w-full rounded-lg border border-divider bg-surface px-3 py-2 text-[15px]"
            />
          </label>
          <label className="block">
            <span className="text-xs text-ink-soft">Max</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={value.areaMax ?? ""}
              onChange={(e) =>
                onChange({ areaMax: e.target.value === "" ? null : Number(e.target.value) })
              }
              className="mt-1 w-full rounded-lg border border-divider bg-surface px-3 py-2 text-[15px]"
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className={fieldLabel}>Features</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {allAmenities().map((a: Amenity) => {
            const active = value.amenities.includes(a);
            return (
              <button
                key={a}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ amenities: toggleInList(value.amenities, a) })}
                className={clsx(
                  pillBase,
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-divider bg-transparent text-ink hover:border-ink/40"
                )}
              >
                {a}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex items-center gap-3 text-sm text-ink">
        <input
          type="checkbox"
          checked={value.savedOnly}
          onChange={(e) => onChange({ savedOnly: e.target.checked })}
          className="h-5 w-5 rounded border-divider text-deep-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-green"
        />
        Show only my saved homes
      </label>
    </div>
  );
}
