"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials({ headingId = "testimonials-heading" }: { headingId?: string }) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("li");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  const navButton =
    "inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 text-ink transition-[background-color,color,border-color,transform] duration-200 hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-green focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:active:scale-95";

  return (
    <section
      className="container-formera py-16 md:py-24"
      aria-labelledby={headingId}
      aria-roledescription="carousel"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            In their words
          </p>
          <h2 id={headingId} className="mt-2 text-3xl text-ink sm:text-4xl lg:text-5xl">
            What our clients say
          </h2>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => scrollByCard(-1)} className={navButton} aria-label="Previous testimonials">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollByCard(1)} className={navButton} aria-label="Next testimonials">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Client testimonials. Scroll horizontally or use the previous and next buttons."
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-green focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        {testimonials.map((t) => (
          <li
            key={t.name}
            aria-roledescription="slide"
            className="flex shrink-0 basis-[86%] snap-start flex-col rounded-card border border-divider bg-surface p-6 sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
          >
            <figure className="flex h-full flex-col">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-divider">
                  <Image
                    src={t.image.src}
                    alt={t.image.alt}
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption>
                  <span className="block font-heading text-base font-bold text-ink">{t.name}</span>
                  <span className="mt-0.5 block text-[13px] text-ink-soft">{t.detail}</span>
                </figcaption>
              </div>
              <blockquote className="mt-5 flex-1 text-[16px] leading-relaxed text-ink">
                “{t.quote.replace(/^“|”$/g, "")}”
              </blockquote>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
