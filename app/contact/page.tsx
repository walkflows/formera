import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { heroImages } from "@/lib/data/assets";
import { getFaqsByIds } from "@/lib/data/faqs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a general, buying, renting or selling enquiry to FORMERA.",
};

export default function ContactPage() {
  const faqs = getFaqsByIds([4, 5, 7]);

  return (
    <div>
      <section className="relative flex min-h-[260px] items-end overflow-hidden sm:min-h-[320px]">
        <Image
          src={heroImages.contact.src}
          alt={heroImages.contact.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />
        <div className="container-formera relative py-10 text-white sm:py-14">
          <h1 className="hero-title max-w-xl text-[2.1rem] sm:text-5xl lg:text-6xl">
            Let&apos;s talk about your next move.
          </h1>
          <p className="hero-copy mt-3 max-w-lg text-base text-white/90 sm:text-lg">
            A home you&apos;ve saved, an area you like or a move you&apos;re still considering.
            Start there.
          </p>
        </div>
      </section>

      <section className="container-formera py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-2xl text-ink sm:text-3xl">
            What would you like help with?
          </h2>
          <p className="mt-2 text-ink-soft">
            Tell us a little about your plans and the details that matter most.
          </p>

          <div className="mt-8">
            <Suspense fallback={<div className="h-64 animate-pulse rounded-panel bg-divider/40" />}>
              <ContactPageClient />
            </Suspense>
          </div>

        </div>
      </section>

      <Testimonials headingId="contact-testimonials-heading" />

      <section className="container-formera pb-16 md:pb-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-xl text-ink">Good questions</h2>
          <div className="mt-6">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
