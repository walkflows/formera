import { getFaqsByIds } from "@/lib/data/faqs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Hero } from "@/components/home/Hero";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { BenefitBanner } from "@/components/home/BenefitBanner";
import { AboutIntro } from "@/components/home/AboutIntro";
import { PriorityCards } from "@/components/home/PriorityCards";
import { Neighbourhoods } from "@/components/home/Neighbourhoods";
import { SearchHelpBanner } from "@/components/home/SearchHelpBanner";
import { GuidesSection } from "@/components/home/GuidesSection";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { EnquiryPanel } from "@/components/home/EnquiryPanel";

export default function HomePage() {
  const faqs = getFaqsByIds([1, 2, 3, 4, 5, 6]);

  return (
    <div>
      <Hero />
      <FeaturedProperties />
      <BenefitBanner />
      <AboutIntro />
      <PriorityCards />
      <Neighbourhoods />
      <SearchHelpBanner />
      <GuidesSection />
      <Testimonials />
      <EnquiryPanel />

      <section className="container-formera py-16 md:py-24">
        <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">Good Questions</p>
        <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
          Before you take the next step.
        </h2>
        <p className="mt-3 max-w-xl text-ink-soft">
          Here&apos;s how to browse the homes, keep a shortlist and try the viewing-request
          experience.
        </p>
        <div className="mt-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}
