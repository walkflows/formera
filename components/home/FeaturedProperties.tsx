import { getFeaturedProperties, properties } from "@/lib/data/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";

export function FeaturedProperties() {
  const featured = getFeaturedProperties();

  return (
    <section className="container-formera py-16 md:py-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">
            A Few Places to Start
          </p>
          <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
            Which one feels like your next move?
          </h2>
          <p className="mt-3 text-ink-soft">
            An open living room. A quieter corner. A terrace you&apos;ll actually use. Explore a
            selection of homes with different ways to make the space your own.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button href="/properties" variant="outline">
          Explore All {properties.length} Properties
        </Button>
      </div>
    </section>
  );
}
