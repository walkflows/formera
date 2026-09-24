import Image from "next/image";
import { heroImages } from "@/lib/data/assets";
import { EnquiryForm } from "@/components/contact/EnquiryForm";

export function EnquiryPanel() {
  return (
    <section className="container-formera py-16 md:py-24">
      <div className="relative overflow-hidden rounded-panel">
        <Image
          src={heroImages.enquiryPanel.src}
          alt={heroImages.enquiryPanel.alt}
          width={1280}
          height={800}
          sizes="100vw"
          className="h-auto w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:p-16">
          <div className="text-white">
            <h2 className="max-w-md font-heading text-3xl sm:text-4xl">
              Tell us what your next home needs to do.
            </h2>
            <p className="mt-4 max-w-md text-white/85">
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
