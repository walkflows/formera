import Image from "next/image";
import Link from "next/link";
import { NEIGHBOURHOODS, neighbourhoodCount } from "@/lib/data/properties";
import { neighbourhoodImages } from "@/lib/data/assets";
import { neighbourhoodSlug } from "@/lib/filters";
import { Button } from "@/components/ui/Button";

export function Neighbourhoods() {
  return (
    <section className="container-formera py-16 md:py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">
        Start With a Place
      </p>
      <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
        Where would you like to come home?
      </h2>
      <p className="mt-3 max-w-xl text-ink-soft">
        Already have an area in mind? Choose a neighbourhood to see its sample homes, then narrow
        the list by price, space and features.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {NEIGHBOURHOODS.map((n) => {
          const image = neighbourhoodImages[n];
          const count = neighbourhoodCount(n);
          return (
            <Link
              key={n}
              href={`/properties?neighbourhood=${neighbourhoodSlug(n)}`}
              className="group relative overflow-hidden rounded-card"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={420}
                height={420}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-ink/35 transition-colors duration-300 group-hover:bg-ink/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <span className="font-heading text-lg sm:text-xl">{n}</span>
                <span className="mt-1 text-xs text-white/85">
                  {count} sample {count === 1 ? "home" : "homes"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Button href="/properties" variant="outline">
          Browse Every Neighbourhood
        </Button>
      </div>
    </section>
  );
}
