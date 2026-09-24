import Image from "next/image";
import Link from "next/link";
import { priorityCardImages } from "@/lib/data/assets";
import { Button } from "@/components/ui/Button";

const smallCards = [
  {
    title: "More room to spread out.",
    body: "Explore homes with three or more bedrooms.",
    href: "/properties?beds=3",
    image: priorityCardImages.moreSpace,
  },
  {
    title: "Your own outdoor space.",
    body: "Find a balcony, terrace or private garden.",
    href: "/properties?amenities=outdoor-space",
    image: priorityCardImages.outdoorSpace,
  },
  {
    title: "A place to rent next.",
    body: "Browse rental homes with clearly displayed monthly prices.",
    href: "/properties?purpose=rent",
    image: priorityCardImages.rent,
  },
  {
    title: "Room to work from home.",
    body: "Explore listings with a dedicated office or study.",
    href: "/properties?amenities=home-office",
    image: priorityCardImages.homeOffice,
  },
];

export function PriorityCards() {
  return (
    <section className="container-formera py-16 md:py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">
        Your Search, Your Priorities
      </p>
      <h2 className="mt-2 max-w-xl font-heading text-3xl text-ink sm:text-4xl">
        What would make a home work better for you?
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative overflow-hidden rounded-panel">
          <Image
            src={priorityCardImages.large.src}
            alt={priorityCardImages.large.alt}
            width={800}
            height={640}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full max-h-[520px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="on-image absolute inset-x-0 bottom-0 p-7 sm:p-9">
            <h3 className="font-heading text-2xl text-white">
              Room for the life you&apos;re planning.
            </h3>
            <p className="mt-2 max-w-sm text-sm text-white/85">
              Need another bedroom, a place to work or somewhere to spend time outside? Start with
              the things you don&apos;t want to compromise on.
            </p>
            <Button href="/contact" className="mt-5">
              Share Your Priorities
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {smallCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-card"
            >
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={400}
                height={320}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="h-[220px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="on-image absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-heading text-base text-white">{card.title}</h3>
                <p className="mt-1 text-xs text-white/80">{card.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
