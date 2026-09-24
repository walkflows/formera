import { Button } from "@/components/ui/Button";

export function SearchHelpBanner() {
  return (
    <section className="container-formera">
      <div className="rounded-panel bg-deep-green px-8 py-14 text-center text-white sm:px-16">
        <h2 className="font-heading text-2xl sm:text-3xl">
          Know what you need, but haven&apos;t found it yet?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-white/80">
          Tell us your preferred area, budget and the features that matter. Give your search a
          clearer starting point.
        </p>
        <Button href="/contact?intent=buy" className="mt-6">
          Share Your Search
        </Button>
      </div>
    </section>
  );
}
