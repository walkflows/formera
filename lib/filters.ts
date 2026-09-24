import type { Amenity, Neighbourhood, Property, PropertyType, Purpose } from "@/lib/types";
import { properties } from "@/lib/data/properties";

export const PAGE_SIZE = 9;

export type BedsFilter = "any" | "studio" | "1" | "2" | "3" | "4";
export type BathsFilter = "any" | "1" | "2" | "3";
export type SortOption = "featured" | "price-asc" | "price-desc" | "area-desc";

export interface FiltersState {
  q: string;
  purpose: "" | Purpose;
  neighbourhoods: Neighbourhood[];
  types: PropertyType[];
  beds: BedsFilter;
  baths: BathsFilter;
  priceMin: number | null;
  priceMax: number | null;
  areaMin: number | null;
  areaMax: number | null;
  amenities: Amenity[];
  savedOnly: boolean;
  sort: SortOption;
  page: number;
}

export const DEFAULT_FILTERS: FiltersState = {
  q: "",
  purpose: "",
  neighbourhoods: [],
  types: [],
  beds: "any",
  baths: "any",
  priceMin: null,
  priceMax: null,
  areaMin: null,
  areaMax: null,
  amenities: [],
  savedOnly: false,
  sort: "featured",
  page: 1,
};

const NEIGHBOURHOOD_SLUGS: Record<Neighbourhood, string> = {
  Tribeca: "tribeca",
  SoHo: "soho",
  "Upper East Side": "upper-east-side",
  "Brooklyn Heights": "brooklyn-heights",
  "Cobble Hill": "cobble-hill",
  "West Village": "west-village",
};

const SLUG_TO_NEIGHBOURHOOD: Record<string, Neighbourhood> = Object.fromEntries(
  Object.entries(NEIGHBOURHOOD_SLUGS).map(([k, v]) => [v, k as Neighbourhood])
);

const TYPE_SLUGS: Record<PropertyType, string> = {
  Apartment: "apartment",
  Condo: "condo",
  Loft: "loft",
  Townhouse: "townhouse",
  Penthouse: "penthouse",
};

const SLUG_TO_TYPE: Record<string, PropertyType> = Object.fromEntries(
  Object.entries(TYPE_SLUGS).map(([k, v]) => [v, k as PropertyType])
);

const AMENITY_SLUGS: Record<Amenity, string> = {
  "Outdoor space": "outdoor-space",
  "Home office": "home-office",
  Parking: "parking",
  Lift: "lift",
  "In-unit laundry": "in-unit-laundry",
  Concierge: "concierge",
};

const SLUG_TO_AMENITY: Record<string, Amenity> = Object.fromEntries(
  Object.entries(AMENITY_SLUGS).map(([k, v]) => [v, k as Amenity])
);

export function neighbourhoodSlug(n: Neighbourhood): string {
  return NEIGHBOURHOOD_SLUGS[n];
}
export function typeSlug(t: PropertyType): string {
  return TYPE_SLUGS[t];
}
export function amenitySlug(a: Amenity): string {
  return AMENITY_SLUGS[a];
}

function parseList<T>(value: string | null, map: Record<string, T>): T[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .map((v) => map[v])
    .filter((v): v is T => Boolean(v));
}

function parseNumber(value: string | null): number | null {
  if (value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

// Parses a URLSearchParams into a safe, defaulted FiltersState. Unknown or
// invalid values fall back to defaults rather than throwing.
export function parseFilters(params: URLSearchParams): FiltersState {
  const purposeRaw = params.get("purpose");
  const purpose: FiltersState["purpose"] =
    purposeRaw === "sale" || purposeRaw === "rent" ? purposeRaw : "";

  const bedsRaw = params.get("beds");
  const beds: BedsFilter = ["studio", "1", "2", "3", "4"].includes(bedsRaw ?? "")
    ? (bedsRaw as BedsFilter)
    : "any";

  const bathsRaw = params.get("baths");
  const baths: BathsFilter = ["1", "2", "3"].includes(bathsRaw ?? "")
    ? (bathsRaw as BathsFilter)
    : "any";

  const sortRaw = params.get("sort");
  const validSorts: SortOption[] = ["featured", "price-asc", "price-desc", "area-desc"];
  const sort: SortOption = validSorts.includes(sortRaw as SortOption)
    ? (sortRaw as SortOption)
    : "featured";

  const page = Math.max(1, Math.floor(parseNumber(params.get("page")) ?? 1));

  const priceMin = parseNumber(params.get("priceMin"));
  let priceMax = parseNumber(params.get("priceMax"));
  if (priceMin !== null && priceMax !== null && priceMin > priceMax) {
    // Never silently swap; treat as if the max wasn't set so results aren't wrong.
    priceMax = null;
  }

  const areaMin = parseNumber(params.get("areaMin"));
  let areaMax = parseNumber(params.get("areaMax"));
  if (areaMin !== null && areaMax !== null && areaMin > areaMax) {
    areaMax = null;
  }

  return {
    q: params.get("q")?.trim() ?? "",
    purpose,
    neighbourhoods: parseList(params.get("neighbourhood"), SLUG_TO_NEIGHBOURHOOD),
    types: parseList(params.get("type"), SLUG_TO_TYPE),
    beds,
    baths,
    priceMin: purpose ? priceMin : null,
    priceMax: purpose ? priceMax : null,
    areaMin,
    areaMax,
    amenities: parseList(params.get("amenities"), SLUG_TO_AMENITY),
    savedOnly: params.get("saved") === "1",
    sort: purpose ? sort : sort === "price-asc" || sort === "price-desc" ? "featured" : sort,
    page,
  };
}

export function filtersToSearchParams(state: FiltersState): URLSearchParams {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.purpose) params.set("purpose", state.purpose);
  if (state.neighbourhoods.length)
    params.set("neighbourhood", state.neighbourhoods.map(neighbourhoodSlug).join(","));
  if (state.types.length) params.set("type", state.types.map(typeSlug).join(","));
  if (state.beds !== "any") params.set("beds", state.beds);
  if (state.baths !== "any") params.set("baths", state.baths);
  if (state.purpose && state.priceMin !== null) params.set("priceMin", String(state.priceMin));
  if (state.purpose && state.priceMax !== null) params.set("priceMax", String(state.priceMax));
  if (state.areaMin !== null) params.set("areaMin", String(state.areaMin));
  if (state.areaMax !== null) params.set("areaMax", String(state.areaMax));
  if (state.amenities.length) params.set("amenities", state.amenities.map(amenitySlug).join(","));
  if (state.savedOnly) params.set("saved", "1");
  if (state.sort !== "featured") params.set("sort", state.sort);
  if (state.page > 1) params.set("page", String(state.page));
  return params;
}

function bedsMinimum(beds: BedsFilter): number | null {
  switch (beds) {
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    default:
      return null;
  }
}

function matchesSearch(p: Property, q: string): boolean {
  if (!q) return true;
  const needle = q.trim().toLowerCase();
  return (
    p.name.toLowerCase().includes(needle) ||
    p.neighbourhood.toLowerCase().includes(needle) ||
    p.borough.toLowerCase().includes(needle)
  );
}

export function applyFilters(
  all: Property[],
  state: FiltersState,
  savedIds: string[]
): Property[] {
  return all.filter((p) => {
    if (!matchesSearch(p, state.q)) return false;
    if (state.purpose && p.purpose !== state.purpose) return false;
    if (state.neighbourhoods.length && !state.neighbourhoods.includes(p.neighbourhood))
      return false;
    if (state.types.length && !state.types.includes(p.type)) return false;

    if (state.beds === "studio" && p.beds !== 0) return false;
    const bedsMin = bedsMinimum(state.beds);
    if (bedsMin !== null && p.beds < bedsMin) return false;

    if (state.baths !== "any" && p.baths < Number(state.baths)) return false;

    if (state.purpose && state.priceMin !== null && p.price < state.priceMin) return false;
    if (state.purpose && state.priceMax !== null && p.price > state.priceMax) return false;

    if (state.areaMin !== null && p.interiorSqFt < state.areaMin) return false;
    if (state.areaMax !== null && p.interiorSqFt > state.areaMax) return false;

    if (state.amenities.length && !state.amenities.every((a) => p.amenities.includes(a)))
      return false;

    if (state.savedOnly && !savedIds.includes(p.id)) return false;

    return true;
  });
}

export function sortProperties(list: Property[], sort: SortOption): Property[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "area-desc":
      return copy.sort((a, b) => b.interiorSqFt - a.interiorSqFt);
    case "featured":
    default:
      return copy.sort((a, b) => {
        const ra = a.featuredRank ?? Number.MAX_SAFE_INTEGER;
        const rb = b.featuredRank ?? Number.MAX_SAFE_INTEGER;
        if (ra !== rb) return ra - rb;
        return a.id.localeCompare(b.id);
      });
  }
}

export function paginate<T>(list: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: list.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total: list.length,
  };
}

export const BUY_BUDGET_CHIPS = [
  { label: "Up to $1m", min: 0, max: 1_000_000 },
  { label: "$1m–$2m", min: 1_000_000, max: 2_000_000 },
  { label: "$2m–$4m", min: 2_000_000, max: 4_000_000 },
  { label: "$4m+", min: 4_000_000, max: null },
] as const;

export const RENT_BUDGET_CHIPS = [
  { label: "Up to $4,000/mo", min: 0, max: 4_000 },
  { label: "$4,000–$6,000", min: 4_000, max: 6_000 },
  { label: "$6,000–$9,000", min: 6_000, max: 9_000 },
  { label: "$9,000+", min: 9_000, max: null },
] as const;

export function allNeighbourhoods(): Neighbourhood[] {
  return Array.from(new Set(properties.map((p) => p.neighbourhood)));
}

export function allTypes(): PropertyType[] {
  return ["Apartment", "Condo", "Loft", "Townhouse", "Penthouse"];
}

export function allAmenities(): Amenity[] {
  return [
    "Outdoor space",
    "Home office",
    "Parking",
    "Lift",
    "In-unit laundry",
    "Concierge",
  ];
}
