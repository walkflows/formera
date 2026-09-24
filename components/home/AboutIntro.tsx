import { Button } from "@/components/ui/Button";

export function AboutIntro() {
  return (
    <section className="container-formera py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl text-ink sm:text-4xl">
          A home search should start with how you live.
        </h2>
        <p className="mt-5 text-ink-soft">
          Where you work, who you share your space with and what you want more room for all
          matter. FORMERA puts those details at the centre of the search, helping you move from a
          long list of possibilities to a few homes worth a closer look.
        </p>
        <p className="mt-4 text-ink-soft">
          Browse at your own pace. Ask the practical questions. Keep the features you care about
          in view as you decide what comes next.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/about" variant="outline">
            Get to Know FORMERA
          </Button>
          <Button href="/properties">Start Your Search</Button>
        </div>
      </div>
    </section>
  );
}
