// Placeholder client testimonials. Replace with genuine, approved reviews
// before the site is published.
//
// Order is deliberately mixed: man, woman, man, woman, man.
//
// Portrait mapping note: the supplied files are only numbered. The two
// women's portraits (images 2 and 5) are used for Sarah and Emma; the three
// men's portraits (images 3, 7 and 8) for Daniel, James and Michael. Which
// portrait belongs to which name within each gender is provisional.
export interface Testimonial {
  name: string;
  detail: string;
  quote: string;
  image: { src: string; alt: string };
}

export const testimonials: Testimonial[] = [
  {
    name: "Daniel Brooks",
    detail: "First-time buyer, Cobble Hill",
    quote:
      "This was my first time buying, so I had plenty of questions. I appreciated getting clear answers without feeling rushed.",
    image: { src: "/images/formera/testimonials/daniel-brooks.jpg", alt: "Portrait of Daniel Brooks" },
  },
  {
    name: "Sarah Mitchell",
    detail: "Renter, SoHo",
    quote:
      "I had quite a specific list of things I wanted. The team listened, and I never felt pushed towards a home that wasn’t right for me.",
    image: { src: "/images/formera/testimonials/sarah-mitchell.jpg", alt: "Portrait of Sarah Mitchell" },
  },
  {
    name: "James Carter",
    detail: "Growing family, Brooklyn Heights",
    quote:
      "We needed more space but didn’t want to change neighbourhoods. Having a focused shortlist saved us a lot of time.",
    image: { src: "/images/formera/testimonials/james-carter.jpg", alt: "Portrait of James Carter" },
  },
  {
    name: "Emma Collins",
    detail: "Buyer, West Village",
    quote:
      "Being able to save my favourites made the search much easier. I could come back, compare the details and decide which homes I wanted to see.",
    image: { src: "/images/formera/testimonials/emma-collins.jpg", alt: "Portrait of Emma Collins" },
  },
  {
    name: "Michael Bennett",
    detail: "Relocating, Upper East Side",
    quote:
      "The property details helped me prepare before the viewing. I already knew what interested me and what I wanted to ask about.",
    image: { src: "/images/formera/testimonials/michael-bennett.jpg", alt: "Portrait of Michael Bennett" },
  },
];
