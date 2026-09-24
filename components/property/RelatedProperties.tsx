import { PropertyCard } from "@/components/property/PropertyCard";
import type { Property } from "@/lib/types";

export function RelatedProperties({ properties }: { properties: Property[] }) {
  if (properties.length === 0) return null;
  return (
    <section className="container-formera py-16 md:py-20">
      <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">
        Your Next Move Starts Here
      </p>
      <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
        A few more homes to consider.
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
