import type { Guide } from "@/lib/types";

export const guides: Guide[] = [
  {
    slug: "make-a-useful-shortlist",
    title: "Make a shortlist you'll actually use",
    excerpt: "Separate the things you need from the things you'd enjoy having.",
    paragraphs: [
      "Start with three lists: must-haves, preferences and deal-breakers. A minimum number of bedrooms may be essential. A larger kitchen may be a preference. A layout with several flights of stairs may rule a home out for you.",
      "Set your main filters first, then save the listings that deserve a closer look. Read their descriptions as well as their photographs. A home can look right and still miss a detail that matters to your daily routine.",
      "After comparing a few options, revisit your lists. You may find that one feature matters more than you expected. A useful shortlist helps you see those trade-offs clearly.",
    ],
    ctaLabel: "Start Your Shortlist",
    ctaHref: "/properties",
    cover: {
      src: "/images/formera/about/guide-shortlist.png",
      alt: "A contemporary house with a pool and timber roof",
    },
  },
  {
    slug: "questions-for-a-viewing",
    title: "Questions to take to a viewing",
    excerpt: "Look beyond the first impression and picture an ordinary day in the space.",
    paragraphs: [
      "Before a viewing, note what you want to understand about the layout. Where would you work? What needs storing? How would the rooms function when everyone is at home?",
      "During the visit, pay attention to natural light, noise, access and the condition of the spaces you would use most. Ask which features are included and which details still need confirmation. Photographs can help you remember a room, but ask permission before taking them.",
      "Finish by writing down the unanswered questions. A viewing is a chance to learn more, not a reason to rush a decision.",
    ],
    ctaLabel: "Explore Homes to View",
    ctaHref: "/properties",
    cover: {
      src: "/images/formera/about/guide-viewing.jpg",
      alt: "A furnished living room ready to view",
    },
  },
  {
    slug: "find-your-neighbourhood",
    title: "Find a neighbourhood that fits your routine",
    excerpt: "Think about the places and journeys that shape your week.",
    paragraphs: [
      "A neighbourhood search becomes more useful when you start with your routine. Consider the journeys you make, the services you use and the places where you like to spend time.",
      "Visit areas at different times if you can. A street can feel different during the working day, in the evening or at the weekend. Check travel routes yourself instead of relying on a broad description of the area.",
      "Keep notes alongside your property shortlist. The right room layout and the right location need to work together for you.",
    ],
    ctaLabel: "Browse by Neighbourhood",
    ctaHref: "/properties",
    cover: {
      src: "/images/formera/about/guide-neighbourhood.png",
      alt: "An aerial view of a residential neighbourhood with shared gardens",
    },
  },
  {
    slug: "compare-homes-clearly",
    title: "Compare homes without losing the details",
    excerpt: "Use the same questions for each home so the differences are easier to see.",
    paragraphs: [
      "Save the listings you want to compare, then review them against the same priorities. Start with your budget, the room layout, the usable space and any access requirements.",
      "Notice which details are confirmed and which are missing. A longer feature list is not always more useful than a clear answer to the question that matters most to you. Ask about unknowns before treating them as benefits.",
      "Finally, write one sentence about why each home remains on your list. If you struggle to explain it, it may be time to narrow the shortlist.",
    ],
    ctaLabel: "Review Saved Homes",
    ctaHref: "/saved",
    cover: {
      src: "/images/formera/about/guide-compare.png",
      alt: "A modern two-tone house with a landscaped garden",
    },
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getRelatedGuides(current: Guide, max = 2): Guide[] {
  return guides.filter((g) => g.slug !== current.slug).slice(0, max);
}
