import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { properties } from "@/lib/data/properties";
import { heroImages } from "@/lib/data/assets";
import { getFaqsByIds } from "@/lib/data/faqs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { PropertiesExplorer } from "@/components/property/PropertiesExplorer";

export const metadata: Metadata = {
  title: "Properties",
  description: "Browse 15 FORMERA listings and filter by neighbourhood, budget and features.",
};

export default function PropertiesPage() {
  const faqs = getFaqsByIds([1, 2, 3]);

  return (
    <div>
      <section className="relative flex min-h-[320px] items-end overflow-hidden sm:min-h-[380px]">
        <Image
          src={heroImages.properties.src}
          alt={heroImages.properties.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/15" />
        <div className="container-formera relative py-12 text-white sm:py-16">
          <h1 className="hero-title max-w-2xl text-[2.1rem] sm:text-5xl lg:text-6xl">
            Find a place that fits.
          </h1>
          <p className="hero-copy mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            Explore homes to buy or rent, with the details you need to narrow your search.
          </p>
        </div>
      </section>

      <section className="container-formera py-12 md:py-16">
        <h2 className="font-heading text-3xl text-ink sm:text-4xl">Make the search your own.</h2>
        <p className="mt-3 max-w-xl text-ink-soft">
          Choose your area, set your budget and focus on the features that matter. Save any home
          you&apos;d like to revisit.
        </p>

        <div className="mt-8">
          <Suspense fallback={<div className="h-40 animate-pulse rounded-panel bg-divider/40" />}>
            <PropertiesExplorer properties={properties} />
          </Suspense>
        </div>
      </section>

      <Testimonials headingId="properties-testimonials-heading" />

      <section className="container-formera pb-16 md:pb-24">
        <h2 className="font-heading text-2xl text-ink sm:text-3xl">Good questions</h2>
        <div className="mt-6">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}
