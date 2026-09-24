import Image from "next/image";
import { properties } from "@/lib/data/properties";
import { formatPrice } from "@/lib/format";
import { heroImages } from "@/lib/data/assets";
import { Button } from "@/components/ui/Button";
import { HomeSearchPanel } from "@/components/home/HomeSearchPanel";

export function Hero() {
  const featured = properties.find((p) => p.id === "F01")!;

  return (
    <section className="container-formera pt-6 sm:pt-10">
      <div className="relative overflow-hidden rounded-panel">
        <Image
          src={heroImages.home.src}
          alt={heroImages.home.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/10 to-ink/60" />

        <div className="relative flex min-h-[560px] flex-col justify-between p-6 sm:min-h-[600px] sm:p-10 lg:min-h-[680px] lg:p-14">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              FORMERA Real Estate
            </p>
            <h1 className="mt-4 font-heading text-[2.6rem] leading-[1.04] text-white sm:text-6xl lg:text-[5.2rem]">
              A home that feels right. A clearer way to find it.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] text-white/85 sm:text-base">
              From a first apartment to a place with room to grow, find homes that fit the way
              you want to live. Explore the details, save your favourites and take the next step
              when you&apos;re ready.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/properties">Explore Properties</Button>
              <Button href="/contact?intent=buy" variant="outline" className="border-white/60 text-white hover:border-white">
                Tell Us What You Need
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-1 gap-4 px-1 sm:-mt-10 lg:grid-cols-[1fr_320px]">
        <HomeSearchPanel />

        <div className="flex items-center gap-4 rounded-panel bg-white p-4 shadow-[0_20px_45px_rgba(32,35,31,0.18)]">
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
            <Image src={featured.cover.src} alt={featured.cover.alt} fill sizes="96px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-[15px] text-ink">{featured.name}</p>
            <p className="truncate text-xs text-ink-soft">
              {featured.neighbourhood}, {featured.borough}
            </p>
            <p className="text-sm font-medium text-ink">{formatPrice(featured)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 px-1 text-sm text-ink-soft lg:hidden">
        <span>Sample listing</span>
        <Button href={`/properties/${featured.slug}`} size="sm" variant="outline">
          View Property
        </Button>
      </div>
      <div className="hidden items-center justify-end px-1 lg:flex">
        <Button href={`/properties/${featured.slug}`} size="sm" variant="ghost" className="-mt-2">
          View Property →
        </Button>
      </div>
    </section>
  );
}
