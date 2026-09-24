import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getPropertyBySlug, getRelatedProperties, properties } from "@/lib/data/properties";
import { formatArea, formatBaths, formatBeds, formatPrice, purposeLabel } from "@/lib/format";
import { neighbourhoodSlug } from "@/lib/filters";
import { getInteriorDetails, getOutdoorDetails, getBuildingDetails } from "@/lib/propertyDetails";
import { Gallery } from "@/components/property/Gallery";
import { SaveShareActions } from "@/components/property/SaveShareActions";
import { StickyEnquiryCard } from "@/components/property/StickyEnquiryCard";
import { MobileViewingBar } from "@/components/property/MobileViewingBar";
import { RelatedProperties } from "@/components/property/RelatedProperties";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property not found" };
  return {
    title: property.name,
    description: property.description,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const galleryImages = [property.cover, ...property.gallery];
  const related = getRelatedProperties(property);
  const interior = getInteriorDetails(property);
  const outdoor = getOutdoorDetails(property);
  const building = getBuildingDetails(property);

  return (
    <div className="pb-24 lg:pb-0">
      <div className="container-formera pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-soft">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href="/properties" className="hover:text-ink">
            Properties
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="text-ink">{property.name}</span>
        </nav>
      </div>

      <div className="container-formera mt-4">
        <Gallery
          images={galleryImages}
          propertyName={property.name}
          morePhotosPending={property.morePhotosPending}
        />
      </div>

      <div className="container-formera mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <span className="inline-block rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink">
            {purposeLabel(property.purpose)} &middot; Sample listing
          </span>
          <h1 className="mt-3 font-heading text-3xl text-ink sm:text-4xl">{property.name}</h1>
          <p className="mt-1 text-ink-soft">
            {property.neighbourhood}, {property.borough}
          </p>
          <p className="mt-4 font-heading text-2xl text-ink">{formatPrice(property)}</p>

          <p className="mt-6 font-heading text-xl text-ink">{property.headline}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{property.description}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink">
            <div>
              <dt className="text-ink-soft">Beds</dt>
              <dd className="font-heading text-lg">{formatBeds(property.beds)}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Baths</dt>
              <dd className="font-heading text-lg">{formatBaths(property.baths)}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Interior area</dt>
              <dd className="font-heading text-lg">{formatArea(property.interiorSqFt)}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Type</dt>
              <dd className="font-heading text-lg">{property.type}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <SaveShareActions propertyId={property.id} propertyName={property.name} />
          </div>

          <h2 className="mt-10 font-heading text-xl text-ink">Highlights</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {property.highlights.map((h) => (
              <li
                key={h}
                className="rounded-lg border border-divider bg-surface px-4 py-3 text-sm text-ink"
              >
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <DetailsTable title="Interior" rows={interior} />
            <DetailsTable title="Outdoor space" rows={outdoor} />
            <DetailsTable title="Building and access" rows={building} />
          </div>

          <section className="mt-14 rounded-panel bg-ink/5 p-6 sm:p-8">
            <h2 className="font-heading text-xl text-ink">Explore {property.neighbourhood}</h2>
            <p className="mt-2 max-w-xl text-ink-soft">
              This sample home is presented in {property.neighbourhood}, {property.borough}.
              Browse other demonstration listings in the area.
            </p>
            <Button
              href={`/properties?neighbourhood=${neighbourhoodSlug(property.neighbourhood)}`}
              variant="outline"
              className="mt-4"
            >
              Browse {property.neighbourhood} Listings
            </Button>
          </section>
        </div>

        <div className="self-start">
          <StickyEnquiryCard property={property} />
        </div>
      </div>

      <section className="container-formera mt-16 md:mt-20">
        <div className="relative overflow-hidden rounded-panel">
          <Image
            src={property.cover.src}
            alt=""
            width={1280}
            height={480}
            className="h-[260px] w-full object-cover sm:h-[320px]"
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h2 className="font-heading text-2xl sm:text-3xl">
              Can you picture yourself here?
            </h2>
            <p className="mt-2 max-w-md text-white/85">
              Choose a preferred date and tell us what you&apos;d like to know about{" "}
              {property.name}.
            </p>
            <Button
              href={`/contact?intent=viewing&property=${property.slug}#enquiry-form`}
              className="mt-5"
            >
              Request a Viewing
            </Button>
          </div>
        </div>
      </section>

      <RelatedProperties properties={related} />

      <MobileViewingBar property={property} />
    </div>
  );
}

function DetailsTable({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  return (
    <div>
      <h3 className="font-heading text-base text-ink">{title}</h3>
      <dl className="mt-3 divide-y divide-divider border-y border-divider">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 py-2.5 text-sm">
            <dt className="text-ink-soft">{row.label}</dt>
            <dd className="text-right text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
