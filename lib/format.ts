import type { Property } from "@/lib/types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(property: Pick<Property, "price" | "purpose">): string {
  const amount = currencyFormatter.format(property.price);
  return property.purpose === "rent" ? `${amount}/month` : amount;
}

export function formatArea(sqFt: number): string {
  return `${sqFt.toLocaleString("en-US")} sq ft`;
}

export function formatBeds(beds: number): string {
  return beds === 0 ? "Studio" : `${beds} ${beds === 1 ? "bed" : "beds"}`;
}

export function formatBaths(baths: number): string {
  return `${baths} ${baths === 1 ? "bath" : "baths"}`;
}

export function purposeLabel(purpose: Property["purpose"]): "For Sale" | "For Rent" {
  return purpose === "sale" ? "For Sale" : "For Rent";
}
