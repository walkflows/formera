import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { heroImages } from "@/lib/data/assets";
import { getFaqsByIds } from "@/lib/data/faqs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { WALKFLOW_CONTACT_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Preview a general, buying, renting or selling enquiry with FORMERA's demo form.",
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
          <h1 className="max-w-xl font-heading text-4xl leading-[1.05] sm:text-5xl">
            Let&apos;s talk about your next move.
          </h1>
          <p className="mt-3 max-w-lg text-white/85">
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

          <div className="mt-10 rounded-panel border border-dashed border-divider p-6">
            <p className="font-heading text-base text-ink">Like how this works?</p>
            <p className="mt-2 text-sm text-ink-soft">
              WALKFLOW builds websites that help customers find what they need and take the next
              step.
            </p>
            {WALKFLOW_CONTACT_URL ? (
              <Link
                href={WALKFLOW_CONTACT_URL}
                className="mt-3 inline-block text-sm font-medium text-deep-green underline underline-offset-2"
              >
                Discuss Your Website
              </Link>
            ) : (
              <p className="mt-3 text-sm text-ink-soft">
                (WALKFLOW contact link not yet configured for this demo.)
              </p>
            )}
          </div>
        </div>
      </section>

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
