import type { Property } from "@/lib/types";

export function formatBathsDetailed(baths: number): string {
  if (Number.isInteger(baths)) {
    return `${baths} full ${baths === 1 ? "bathroom" : "bathrooms"}`;
  }
  const full = Math.floor(baths);
  return `${full} full ${full === 1 ? "bathroom" : "bathrooms"} and a guest WC`;
}

export interface DetailRow {
  label: string;
  value: string;
}

export function getInteriorDetails(p: Property): DetailRow[] {
  const rows: DetailRow[] = [
    { label: "Bedrooms", value: p.beds === 0 ? "Studio" : String(p.beds) },
    { label: "Bathrooms", value: formatBathsDetailed(p.baths) },
    { label: "Interior area", value: `${p.interiorSqFt.toLocaleString("en-US")} sq ft` },
  ];
  if (p.amenities.includes("Home office")) {
    rows.push({ label: "Home office", value: "Separate room or nook" });
  }
  if (p.amenities.includes("In-unit laundry")) {
    rows.push({ label: "Laundry", value: "In-unit" });
  }
  return rows;
}

export function getOutdoorDetails(p: Property): DetailRow[] {
  if (p.amenities.includes("Outdoor space")) {
    return [{ label: "Outdoor space", value: "Private balcony, terrace, garden or courtyard" }];
  }
  return [{ label: "Outdoor space", value: "None specified for this listing" }];
}

export function getBuildingDetails(p: Property): DetailRow[] {
  const rows: DetailRow[] = [
    { label: "Lift access", value: p.amenities.includes("Lift") ? "Yes" : "No" },
    { label: "Parking", value: p.amenities.includes("Parking") ? "Yes" : "Not included" },
    { label: "Concierge", value: p.amenities.includes("Concierge") ? "Yes" : "No" },
  ];
  return rows;
}
