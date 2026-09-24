import type { Neighbourhood } from "@/lib/types";

// Editable asset manifest. Every hero, banner, neighbourhood tile and guide
// cover used across the site is declared here with its real file path and
// alt text, so media can be swapped without touching page components.
//
// Source note: photography comes from the supplied "images to use" folder,
// a generic stock pool that does not contain literal New York City street
// photography, dedicated bedroom/bathroom interiors, or six distinct
// neighbourhood photographs. Images are reused thoughtfully across pages
// and labelled illustrative throughout the site (see the footer disclosure
// and /demo-information). Recommend sourcing genuine NYC neighbourhood and
// bedroom/bathroom photography before using this template for a real launch.

export const heroImages = {
  home: {
    src: "/images/formera/hero/home-hero.png",
    alt: "A landscaped park in front of a pre-war apartment building and a modern residential tower",
  },
  properties: {
    src: "/images/formera/hero/properties-hero.png",
    alt: "Aerial view of a landscaped residential community",
  },
  about: {
    src: "/images/formera/hero/about-hero.png",
    alt: "A quiet architectural stairwell with natural light and greenery",
  },
  contact: {
    src: "/images/formera/hero/contact-hero.jpg",
    alt: "A bright, neutral-toned living room",
  },
  footerPanel: {
    src: "/images/formera/hero/footer-panel.jpg",
    alt: "A brick house exterior surrounded by autumn trees",
  },
  enquiryPanel: {
    src: "/images/formera/hero/enquiry-panel.png",
    alt: "A glass and timber architectural structure",
  },
  benefitBanner: {
    src: "/images/formera/hero/benefit-banner.png",
    alt: "A calm interior lounge and meeting space",
  },
} as const;

export const neighbourhoodImages: Record<Neighbourhood, { src: string; alt: string }> = {
  Tribeca: {
    src: "/images/formera/neighbourhoods/tribeca.png",
    alt: "Illustrative streetscape representing Tribeca, Manhattan",
  },
  SoHo: {
    src: "/images/formera/neighbourhoods/soho.png",
    alt: "Illustrative streetscape representing SoHo, Manhattan",
  },
  "Upper East Side": {
    src: "/images/formera/neighbourhoods/upper-east-side.png",
    alt: "Illustrative streetscape representing the Upper East Side, Manhattan",
  },
  "Brooklyn Heights": {
    src: "/images/formera/neighbourhoods/brooklyn-heights.png",
    alt: "Illustrative streetscape representing Brooklyn Heights, Brooklyn",
  },
  "Cobble Hill": {
    src: "/images/formera/neighbourhoods/cobble-hill.png",
    alt: "Illustrative streetscape representing Cobble Hill, Brooklyn",
  },
  "West Village": {
    src: "/images/formera/neighbourhoods/west-village.jpg",
    alt: "Illustrative streetscape representing the West Village, Manhattan",
  },
};

export const aboutImages = {
  story: {
    src: "/images/formera/about/about-story.png",
    alt: "An interior space with a marble counter and greenery, no identifiable people",
  },
  banner: {
    src: "/images/formera/about/about-banner.jpg",
    alt: "A warm, plant-filled living room",
  },
} as const;

export const priorityCardImages = {
  large: {
    src: "/images/formera/about/priority-large.png",
    alt: "An open-plan living and kitchen space",
  },
  moreSpace: {
    src: "/images/formera/about/priority-space.jpg",
    alt: "Exterior of a spacious townhouse-style home",
  },
  outdoorSpace: {
    src: "/images/formera/about/priority-outdoor.png",
    alt: "A private courtyard with evening lighting",
  },
  rent: {
    src: "/images/formera/about/priority-rent.png",
    alt: "Exterior of a home with a private garden",
  },
  homeOffice: {
    src: "/images/formera/about/priority-office.png",
    alt: "A quiet interior space suited to working from home",
  },
} as const;

export const brand = {
  logoWhite: "/images/formera/brand/formera-logo-white.png",
  logoBlack: "/images/formera/brand/formera-logo-black.png",
} as const;
