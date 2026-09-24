import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { guides } from "@/lib/data/guides";

export const metadata: Metadata = {
  title: "Guides",
  description: "Practical, non-branded guides for shortlisting, viewing and comparing homes.",
};

export default function GuidesPage() {
  return (
    <>
    <div className="container-formera py-12 md:py-16">
      <h1 className="font-heading text-3xl text-ink sm:text-4xl">
        A clearer start to your next move.
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Practical ways to narrow your search, prepare for a viewing and keep track of the homes
        you like.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col overflow-hidden rounded-card bg-surface shadow-[0_1px_2px_rgba(32,35,31,0.06)] transition-shadow hover:shadow-[0_12px_32px_rgba(32,35,31,0.12)] sm:flex-row"
          >
            <div className="relative aspect-[4/3] sm:aspect-auto sm:w-48 sm:shrink-0">
              <Image
                src={guide.cover.src}
                alt={guide.cover.alt}
                fill
                sizes="(min-width: 640px) 200px, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="mt-2 font-heading text-lg text-ink">{guide.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{guide.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <Testimonials headingId="guides-testimonials-heading" />
    </>
  );
}
