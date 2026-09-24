import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatArea, formatBaths, formatBeds, formatPrice, purposeLabel } from "@/lib/format";
import { SaveHeart } from "@/components/ui/SaveHeart";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card bg-surface shadow-[0_1px_2px_rgba(32,35,31,0.06)] transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(32,35,31,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link
          href={`/properties/${property.slug}`}
          className="absolute inset-0 z-0"
          aria-label={`View ${property.name}`}
        >
          <Image
            src={property.cover.src}
            alt={property.cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-start justify-between">
          <span className="pointer-events-auto rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">
            {purposeLabel(property.purpose)}
          </span>
          <span className="pointer-events-auto">
            <SaveHeart propertyId={property.id} propertyName={property.name} size="sm" />
          </span>
        </div>
        <span className="absolute bottom-3 left-3 z-10 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium tracking-wide text-white">
          Sample listing
        </span>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <span className="mb-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            View Property
          </span>
        </div>
      </div>

      <Link href={`/properties/${property.slug}`} className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-heading text-lg text-ink">{property.name}</h3>
        </div>
        <p className="text-sm text-ink-soft">
          {property.neighbourhood}, {property.borough}
        </p>
        <p className="font-heading text-base text-ink">{formatPrice(property)}</p>
        <p className="mt-auto text-sm text-ink-soft">
          {formatBeds(property.beds)} &middot; {formatBaths(property.baths)} &middot;{" "}
          {formatArea(property.interiorSqFt)}
        </p>
      </Link>
    </article>
  );
}
