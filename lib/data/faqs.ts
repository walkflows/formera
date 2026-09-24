import type { Faq } from "@/lib/types";
import { WALKFLOW_CONTACT_URL } from "@/lib/config";

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
      "Open a property and select Request a Viewing. Its details will carry into the enquiry form. In this demo, you can preview the request, but nothing is sent and no appointment is booked.",
  },
  {
    id: 5,
    question: "Are these properties actually available?",
    answer:
      "No. FORMERA is a fictional website created to demonstrate WALKFLOW's web design work. The homes, prices and property details are sample content, and photographs are illustrative.",
  },
  {
    id: 6,
    question: "What if I haven't found a suitable home?",
    answer:
      "Try widening your search or use Tell Us What You Need to explore the enquiry form. You can enter sample preferences and see how a more detailed enquiry would be organised.",
  },
  {
    id: 7,
    question: "Can I ask about more than one property?",
    answer:
      "Yes. Save the homes you like, open Saved Homes and choose Discuss These Homes. Your selected properties will appear together in the demo enquiry.",
  },
  {
    id: 8,
    question: "Can WALKFLOW build this for my real estate business?",
    answer:
      "WALKFLOW can discuss a website built around your listings and enquiry process, with integrations scoped around the tools you use. Use the WALKFLOW contact link to start a separate conversation about your project.",
  },
];

export function getFaqsByIds(ids: number[]): Faq[] {
  return ids
    .map((id) => faqs.find((f) => f.id === id))
    .filter((f): f is Faq => Boolean(f))
    .filter((f) => (f.id === 8 ? Boolean(WALKFLOW_CONTACT_URL) : true));
}
