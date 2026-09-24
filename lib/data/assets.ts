import type { Neighbourhood } from "@/lib/types";

// Editable asset manifest. Every hero, banner, neighbourhood tile and guide
// cover used across the site is declared here with its file path and alt text,
// so media can be swapped without touching page components.

export const heroImages = {
  home: {
    src: "/images/formera/hero/home-hero.jpg",
    alt: "A modern timber-roofed family home with a wide lawn, terrace and pool under a blue sky",
  },
  properties: {
    src: "/images/formera/hero/properties-hero.png",
    alt: "Aerial view of a landscaped residential community",
  },
  about: {
    src: "/images/formera/hero/about-hero.jpg",
    alt: "A brick and timber family home with a wide lawn and mature trees",
  },
  contact: {
    src: "/images/formera/hero/contact-hero.jpg",
    alt: "A bright, neutral-toned living room",
  },
  footerPanel: {
    src: "/images/formera/hero/footer-panel.jpg",
    alt: "A modern hillside home glowing at dusk",
  },
  enquiryPanel: {
    src: "/images/formera/hero/enquiry-panel.png",
    alt: "A glass and timber house set in landscaped grounds",
  },
  benefitBanner: {
    src: "/images/formera/hero/benefit-banner.png",
    alt: "A bright, comfortable living room with a large sofa and warm timber details",
  },
} as const;

export const neighbourhoodImages: Record<Neighbourhood, { src: string; alt: string }> = {
  Tribeca: {
    src: "/images/formera/neighbourhoods/tribeca.png",
    alt: "Homes in Tribeca, Manhattan",
  },
  SoHo: {
    src: "/images/formera/neighbourhoods/soho.png",
    alt: "Homes in SoHo, Manhattan",
  },
  "Upper East Side": {
    src: "/images/formera/neighbourhoods/upper-east-side.png",
    alt: "Homes in the Upper East Side, Manhattan",
  },
  "Brooklyn Heights": {
    src: "/images/formera/neighbourhoods/brooklyn-heights.png",
    alt: "Homes in Brooklyn Heights, Brooklyn",
  },
  "Cobble Hill": {
    src: "/images/formera/neighbourhoods/cobble-hill.png",
    alt: "Homes in Cobble Hill, Brooklyn",
  },
  "West Village": {
    src: "/images/formera/neighbourhoods/west-village.jpg",
    alt: "Homes in the West Village, Manhattan",
  },
};

export const aboutImages = {
  story: {
    src: "/images/formera/about/about-story.png",
    alt: "An open-plan family living and kitchen space",
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
