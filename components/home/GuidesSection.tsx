import Image from "next/image";
import Link from "next/link";
import { guides } from "@/lib/data/guides";
import { Button } from "@/components/ui/Button";

export function GuidesSection() {
  return (
    <section className="container-formera py-16 md:py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">
        Before Your Next Move
      </p>
      <h2 className="mt-2 max-w-xl font-heading text-3xl text-ink sm:text-4xl">
        A little preparation goes a long way.
      </h2>
      <p className="mt-3 max-w-xl text-ink-soft">
        Make your shortlist more useful and your viewings more focused with a few practical
        questions to keep in mind.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col overflow-hidden rounded-card bg-surface shadow-[0_1px_2px_rgba(32,35,31,0.06)] transition-shadow hover:shadow-[0_12px_32px_rgba(32,35,31,0.12)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={guide.cover.src}
                alt={guide.cover.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-heading text-base text-ink">{guide.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{guide.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button href="/guides" variant="outline">
          Read the Guides
        </Button>
      </div>
    </section>
  );
}
