export const SITE_NAME = "FORMERA";

export const TAGLINE = "FORMERA — Find a place that feels like yours.";

export const POSITIONING =
  "FORMERA helps people discover homes that fit the way they live. Browse properties, compare details and send an enquiry to begin your search. Enquiries and viewings are subject to confirmation.";

export const SITE_DESCRIPTION = POSITIONING;

export const TOP_BAR_TEXT = TAGLINE;

export const NAV_LINKS = [
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_DISCLOSURE = POSITIONING;

export const CONTACT_DETAILS = {
  email: "hello@formera.example.com",
  phone: "+1 (415) 555-0187",
  address: "218 Willow Avenue, San Francisco, CA 94107, United States",
} as const;
