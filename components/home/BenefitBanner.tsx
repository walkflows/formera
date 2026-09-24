import Image from "next/image";
import { heroImages } from "@/lib/data/assets";

const benefits = [
  {
    title: "See what matters",
    body: "Compare price, space and features without searching through scattered information.",
  },
  {
    title: "Keep your favourites together",
    body: "Save the homes you want to come back to, all in one shortlist.",
  },
  {
    title: "Take a clear next step",
    body: "Start a viewing request with the property already selected.",
  },
];

export function BenefitBanner() {
  return (
    <section className="container-formera py-8 md:py-12" aria-labelledby="less-guesswork-heading">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-panel lg:aspect-[5/4]">
          <Image
            src={heroImages.benefitBanner.src}
            alt={heroImages.benefitBanner.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Less Guesswork
          </p>
          <h2
            id="less-guesswork-heading"
            className="mt-3 max-w-lg text-3xl text-ink sm:text-4xl lg:text-5xl"
          >
            The details that make a difference.
          </h2>

          <ol className="mt-8 divide-y divide-divider border-y border-divider">
            {benefits.map((b, i) => (
              <li key={b.title} className="flex gap-4 py-5">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/25 font-heading text-sm text-ink"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-lg text-ink">{b.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{b.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
