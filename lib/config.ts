// Central place for the one external, cross-project link this demo can show.
// FORMERA is a WALKFLOW portfolio piece; until a real WALKFLOW marketing URL
// is supplied, keep this null so the site never guesses or fabricates one.
// Set NEXT_PUBLIC_WALKFLOW_CONTACT_URL in .env.local to enable the
// "Discuss a website like this" / WALKFLOW CTAs and FAQ 8.
export const WALKFLOW_CONTACT_URL: string | null =
  process.env.NEXT_PUBLIC_WALKFLOW_CONTACT_URL || null;

export const SITE_NAME = "FORMERA";

export const SITE_DESCRIPTION =
  "FORMERA is a fictional real estate demo built to showcase WALKFLOW's web design work.";

export const DEMO_BANNER_TEXT =
  "FORMERA — a real estate website demo by WALKFLOW.";

export const NAV_LINKS = [
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_DISCLOSURE =
  "FORMERA is a fictional real estate brand created as a WALKFLOW portfolio demonstration. All listings, prices and property details are sample content. Images are illustrative. Demo enquiries are not sent and viewings cannot be booked.";
