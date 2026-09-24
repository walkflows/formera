import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-formera flex flex-col items-center justify-center py-24 text-center">
      <h1 className="font-heading text-3xl text-ink sm:text-4xl">This page isn&apos;t here.</h1>
      <p className="mt-3 max-w-md text-ink-soft">
        The link may have changed. Browse our properties or return to the homepage.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button href="/properties">Explore Properties</Button>
        <Button href="/" variant="outline">
          Go Home
        </Button>
      </div>
    </div>
  );
}
