import type { Metadata } from "next";
import Image from "next/image";
import { Key, Compass, Tag, Home as HomeIcon } from "lucide-react";
import { heroImages, aboutImages } from "@/lib/data/assets";
import { getFaqsByIds } from "@/lib/data/faqs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "How FORMERA approaches a home search, and the support available along the way.",
};

const expectCards = [
  {
    title: "Space to explain.",
    body: "Share the priorities behind your search, including the details a price filter can't capture.",
  },
  {
    title: "Information you can use.",
    body: "See the layout, features and practical facts together before deciding on a closer look.",
  },
  {
    title: "A shortlist with purpose.",
    body: "Keep the homes that match your needs and leave the rest behind.",
  },
  {
    title: "A clear next step.",
    body: "Know which property you're enquiring about and what you want to ask before a viewing.",
  },
];

const roleCards = [
  {
    icon: Key,
    title: "Buying a home",
    body: "Bring your budget, location and must-haves into a more focused search.",
    ctaLabel: "Explore Homes to Buy",
    href: "/properties?purpose=sale",
  },
  {
    icon: HomeIcon,
    title: "Finding a rental",
    body: "Compare monthly prices, space and features before arranging a closer look.",
    ctaLabel: "Explore Rentals",
    href: "/properties?purpose=rent",
  },
  {
    icon: Tag,
    title: "Planning to sell",
    body: "Start with a conversation about your property, your timing and what you want from the move.",
    ctaLabel: "Discuss Selling",
    href: "/contact?intent=sell",
  },
  {
    icon: Compass,
    title: "Moving to a new area",
    body: "Explain the routines and priorities that will shape your search.",
    ctaLabel: "Share Your Plans",
    href: "/contact?intent=relocate",
  },
];

export default function AboutPage() {
  const faqs = getFaqsByIds([1, 2, 5, 6]);

  return (
    <div>
      <section className="relative flex min-h-[340px] items-end overflow-hidden sm:min-h-[460px]">
        <Image
          src={heroImages.about.src}
          alt={heroImages.about.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
        <div className="container-formera relative py-12 text-white sm:py-16">
          <p className="hero-copy text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
            About FORMERA
          </p>
          <h1 className="hero-title mt-3 max-w-2xl text-[2.1rem] sm:text-5xl lg:text-6xl">
            Good property decisions start with being heard.
          </h1>
          <p className="hero-copy mt-4 max-w-lg text-base text-white/90 sm:text-lg">
            Your priorities deserve more attention than a list of available homes.
          </p>
        </div>
      </section>

      <section className="container-formera py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="font-heading text-3xl text-ink sm:text-4xl">
              The place matters. So does the process.
            </h2>
            <p className="mt-4 text-ink-soft">
              A property search often begins with a simple change: you need more room, want to
              live somewhere different or are ready for a place of your own. The details that
              follow can feel less simple.
            </p>
            <p className="mt-4 text-ink-soft">
              FORMERA&apos;s approach starts with what you need from your next home. From there,
              clear listing details, a useful shortlist and a focused conversation help give the
              search direction.
            </p>
            <Button href="/contact" className="mt-6">
              Tell Us About Your Move
            </Button>
          </div>
          <div className="overflow-hidden rounded-panel">
            <Image
              src={aboutImages.story.src}
              alt={aboutImages.story.alt}
              width={720}
              height={560}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-formera pb-16 md:pb-24">
        <h2 className="font-heading text-3xl text-ink sm:text-4xl">
          What you should expect along the way.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expectCards.map((card) => (
            <div key={card.title} className="rounded-card border border-divider bg-surface p-6">
              <h3 className="font-heading text-base text-ink">{card.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-formera pb-16 md:pb-24">
        <h2 className="font-heading text-3xl text-ink sm:text-4xl">
          Support for different kinds of moves.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roleCards.map((card) => (
            <div key={card.title} className="flex flex-col rounded-card border border-divider bg-surface p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-ink">
                <card.icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-base text-ink">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{card.body}</p>
              <Button href={card.href} variant="outline" size="sm" className="mt-5 w-fit">
                {card.ctaLabel}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="container-formera pb-16 md:pb-24">
        <div className="relative overflow-hidden rounded-panel">
          <Image
            src={aboutImages.banner.src}
            alt={aboutImages.banner.alt}
            width={1280}
            height={520}
            sizes="100vw"
            className="h-[280px] w-full object-cover sm:h-[340px]"
          />
          <div className="absolute inset-0 bg-ink/60" />
          <div className="on-image absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h2 className="max-w-lg font-heading text-2xl sm:text-3xl">
              You don&apos;t need every answer before you begin.
            </h2>
            <p className="mt-3 max-w-md text-white/85">
              Start with the move you&apos;re thinking about. The right questions can help make
              the next step clearer.
            </p>
            <Button href="/contact" className="mt-6">
              Start a Conversation
            </Button>
          </div>
        </div>
      </section>

      <Testimonials headingId="about-testimonials-heading" />

      <section className="container-formera pb-16 md:pb-24">
        <h2 className="font-heading text-2xl text-ink sm:text-3xl">Good questions</h2>
        <div className="mt-6">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}
