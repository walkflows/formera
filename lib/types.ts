export type Purpose = "sale" | "rent";

export type PropertyType =
  | "Apartment"
  | "Condo"
  | "Loft"
  | "Townhouse"
  | "Penthouse";

export type Neighbourhood =
  | "Tribeca"
  | "SoHo"
  | "Upper East Side"
  | "Brooklyn Heights"
  | "Cobble Hill"
  | "West Village";

export type Borough = "Manhattan" | "Brooklyn";

export type Amenity =
  | "Outdoor space"
  | "Home office"
  | "Parking"
  | "Lift"
  | "In-unit laundry"
  | "Concierge";

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Property {
  id: string; // F01 - F15
  slug: string;
  name: string;
  neighbourhood: Neighbourhood;
  borough: Borough;
  purpose: Purpose;
  type: PropertyType;
  availability: "available";
  price: number; // USD; monthly when purpose === "rent"
  currency: "USD";
  beds: number; // 0 = studio
  baths: number;
  interiorSqFt: number;
  amenities: Amenity[];
  headline: string;
  description: string;
  highlights: [string, string, string, string];
  featuredRank: number | null;
  cover: GalleryImage;
  gallery: GalleryImage[];
  /** True when the real photo set is thinner than a full gallery; the
   * gallery UI shows one labelled "more photos coming soon" tile instead
   * of manufacturing extra images. */
  morePhotosPending?: boolean;
  video?: { src: string; poster: string } | null;
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaHref: string;
  cover: GalleryImage;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export type EnquiryIntent =
  | "buy"
  | "rent"
  | "sell"
  | "relocate"
  | "viewing"
  | "property-question";
