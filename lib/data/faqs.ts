import type { Faq } from "@/lib/types";

export const faqs: Faq[] = [
  {
    id: 1,
    question: "Can I browse both homes for sale and rentals?",
    answer:
      "Yes. Choose Buy or Rent on the Properties page. Purchase prices and monthly rental prices are displayed separately so you can search with the right budget in mind.",
  },
  {
    id: 2,
    question: "How do I narrow down the properties?",
    answer:
      "Use the neighbourhood, property type, bedroom and feature filters. Choose Buy or Rent to add a price range. You can remove individual filters or clear them all at any time.",
  },
  {
    id: 3,
    question: "Can I save properties without creating an account?",
    answer:
      "Yes. Tap the heart on a listing to save it in this browser. Your shortlist is stored on your device and won't automatically appear on another device or browser.",
  },
  {
    id: 4,
    question: "How do I request a viewing?",
    answer:
      "Open a property and select Request a Viewing. Its details will carry into the enquiry form, where you can choose a preferred date and time. Viewings are subject to confirmation.",
  },
  {
    id: 5,
    question: "Are these properties actually available?",
    answer:
      "Availability can change, so every enquiry and viewing is subject to confirmation. Send an enquiry for the home you like and ask about its current status.",
  },
  {
    id: 6,
    question: "What if I haven't found a suitable home?",
    answer:
      "Try widening your search or use Tell Us What You Need to share your preferred area, budget and must-have features through the enquiry form.",
  },
  {
    id: 7,
    question: "Can I ask about more than one property?",
    answer:
      "Yes. Save the homes you like, open Saved Homes and choose Discuss These Homes. Your selected properties will appear together in one enquiry.",
  },
];

export function getFaqsByIds(ids: number[]): Faq[] {
  return ids
    .map((id) => faqs.find((f) => f.id === id))
    .filter((f): f is Faq => Boolean(f));
}
