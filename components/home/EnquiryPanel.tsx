import Image from "next/image";
import { heroImages } from "@/lib/data/assets";
import { EnquiryForm } from "@/components/contact/EnquiryForm";

export function EnquiryPanel() {
  return (
    <section className="container-formera py-16 md:py-24" aria-labelledby="home-enquiry-heading">
      <div className="relative isolate overflow-hidden rounded-panel bg-ink">
        <Image
          src={heroImages.enquiryPanel.src}
          alt={heroImages.enquiryPanel.alt}
          fill
          sizes="(min-width: 1280px) 1184px, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/45"
          aria-hidden="true"
        />
        <div className="relative grid grid-cols-1 gap-8 p-5 sm:p-10 lg:grid-cols-[1fr_minmax(0,600px)] lg:items-start lg:gap-14 lg:p-16">
          <div className="text-white lg:pt-2">
            <h2
              id="home-enquiry-heading"
              className="hero-title max-w-md text-[2rem] sm:text-4xl lg:text-[2.75rem]"
            >
              Tell us what your next home needs to do.
            </h2>
            <p className="hero-copy mt-4 max-w-md text-base text-white/90 sm:text-lg">
              More space, a different neighbourhood or a simpler daily routine? Start with what
              matters to you.
            </p>
          </div>
          <EnquiryForm variant="compact" />
        </div>
      </div>
    </section>
  );
}
