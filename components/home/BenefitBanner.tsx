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
    <section className="container-formera">
      <div className="relative overflow-hidden rounded-panel">
        <Image
          src={heroImages.benefitBanner.src}
          alt={heroImages.benefitBanner.alt}
          width={1280}
          height={640}
          sizes="100vw"
          className="h-auto w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative p-8 sm:p-12 lg:p-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            Less Guesswork
          </p>
          <h2 className="mt-3 max-w-xl font-heading text-3xl text-white sm:text-4xl">
            The details that make a difference.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title}>
                <h3 className="font-heading text-lg text-white">{b.title}</h3>
                <p className="mt-2 text-sm text-white/80">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
