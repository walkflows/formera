import Image from "next/image";
import { getPropertyBySlug } from "@/lib/data/properties";
import { formatPrice } from "@/lib/format";
import { heroImages } from "@/lib/data/assets";
import { Button } from "@/components/ui/Button";
import { HomeSearchPanel } from "@/components/home/HomeSearchPanel";

const FEATURED_SLUG = "the-hudson-residence";

export function Hero() {
  const featured = getPropertyBySlug(FEATURED_SLUG)!;
  const featuredHref = `/properties/${featured.slug}`;

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src={heroImages.home.src}
        alt={heroImages.home.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/40 to-ink/10" aria-hidden="true" />

      <div className="container-formera relative flex min-h-[640px] flex-col justify-between gap-10 py-12 sm:min-h-[700px] sm:py-16 lg:min-h-[760px]">
        <div className="max-w-3xl">
          <p className="hero-copy text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
            FORMERA Real Estate
          </p>
          <h1 className="hero-title mt-4 text-[2.25rem] text-white sm:text-5xl lg:text-[4.25rem]">
            A home that feels right. A clearer way to find it.
          </h1>
          <p className="hero-copy mt-5 max-w-xl text-[15px] leading-relaxed text-white/90 sm:text-lg">
            From a first apartment to a place with room to grow, find homes that fit the way you
            want to live. Explore the details, save your favourites and take the next step when
            you&apos;re ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/properties">Explore Properties</Button>
            <Button href="/contact?intent=buy" variant="outline-light">
              Tell Us What You Need
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px] lg:items-end">
          <HomeSearchPanel />

          <article className="flex items-center gap-4 rounded-panel bg-white p-4 shadow-[0_20px_45px_rgba(15,17,14,0.28)]">
            <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={featured.cover.src}
                alt={featured.cover.alt}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                Featured home
              </p>
              <h3 className="mt-0.5 truncate font-heading text-base text-ink">
                {featured.name}
              </h3>
              <p className="truncate text-xs text-ink-soft">
                {featured.neighbourhood}, {featured.borough}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink">{formatPrice(featured)}</p>
              <Button
                href={featuredHref}
                size="sm"
                className="mt-2 min-h-9! px-3.5! py-1.5! text-[13px]!"
                aria-label={`View Property: ${featured.name}`}
              >
                View Property
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
