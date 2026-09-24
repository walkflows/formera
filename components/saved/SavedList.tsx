"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { properties } from "@/lib/data/properties";
import { formatPrice } from "@/lib/format";
import { useSavedProperties } from "@/context/SavedPropertiesContext";
import { Button } from "@/components/ui/Button";

export function SavedList() {
  const { savedIds, removeSaved, hydrated, persistent } = useSavedProperties();
  const [undo, setUndo] = useState<{ id: string; name: string } | null>(null);

  if (!hydrated) {
    return <div className="h-40 animate-pulse rounded-panel bg-divider/40" />;
  }

  const savedProperties = properties.filter((p) => savedIds.includes(p.id));

  if (savedProperties.length === 0) {
    return (
      <div className="rounded-panel border border-divider bg-surface p-10 text-center">
        <h2 className="font-heading text-xl text-ink">Something caught your eye? Save it here.</h2>
        <p className="mx-auto mt-2 max-w-sm text-ink-soft">
          Tap the heart on any property to keep it in your shortlist on this browser.
        </p>
        <Button href="/properties" className="mt-6">
          Explore Properties
        </Button>
      </div>
    );
  }

  const savedSlugsParam = savedProperties.map((p) => p.slug).join(",");

  return (
    <div>
      {!persistent ? (
        <p className="mb-6 rounded-lg bg-gold/15 px-4 py-3 text-sm text-ink">
          Your browser isn&apos;t letting this site remember your shortlist, so it will only last
          for this visit.
        </p>
      ) : null}

      {undo ? (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-lg bg-ink text-white px-4 py-3 text-sm">
          <span>Removed {undo.name} from saved homes.</span>
          <button
            type="button"
            className="font-medium underline underline-offset-2"
            onClick={() => setUndo(null)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedProperties.map((property) => (
          <article
            key={property.id}
            className="flex flex-col overflow-hidden rounded-card bg-surface shadow-[0_1px_2px_rgba(32,35,31,0.06)]"
          >
            <div className="relative aspect-[4/3]">
              <Link href={`/properties/${property.slug}`} className="absolute inset-0">
                <Image
                  src={property.cover.src}
                  alt={property.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </Link>
              <button
                type="button"
                onClick={() => {
                  removeSaved(property.id);
                  setUndo({ id: property.id, name: property.name });
                }}
                aria-label={`Remove ${property.name} from saved homes`}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-5">
              <Link href={`/properties/${property.slug}`} className="font-heading text-lg text-ink">
                {property.name}
              </Link>
              <p className="text-sm text-ink-soft">
                {property.neighbourhood}, {property.borough}
              </p>
              <p className="font-heading text-base text-ink">{formatPrice(property)}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-panel border border-divider bg-surface p-8 text-center">
        <h2 className="font-heading text-xl text-ink">Want to discuss your shortlist?</h2>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          Bring these homes into one enquiry and tell us what you like about them.
        </p>
        <Button href={`/contact?intent=property-question&savedSlugs=${savedSlugsParam}#enquiry-form`} className="mt-5">
          Discuss These Homes
        </Button>
      </div>
    </div>
  );
}
