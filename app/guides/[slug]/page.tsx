import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getGuideBySlug, getRelatedGuides, guides } from "@/lib/data/guides";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide not found" };
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const related = getRelatedGuides(guide);

  return (
    <div className="container-formera py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-soft">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <Link href="/guides" className="hover:text-ink">
          Guides
        </Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span className="text-ink">{guide.title}</span>
      </nav>

      <div className="mx-auto mt-6 max-w-2xl">
        <span className="text-[11px] font-medium uppercase tracking-wide text-ink-soft">
          FORMERA demo guide
        </span>
        <h1 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">{guide.title}</h1>
        <p className="mt-3 text-lg text-ink-soft">{guide.excerpt}</p>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-panel">
          <Image src={guide.cover.src} alt={guide.cover.alt} fill sizes="800px" className="object-cover" />
        </div>

        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink">
          {guide.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <Button href={guide.ctaHref} className="mt-8">
          {guide.ctaLabel}
        </Button>
      </div>

      {related.length > 0 ? (
        <div className="mx-auto mt-16 max-w-2xl border-t border-divider pt-8">
          <h2 className="font-heading text-lg text-ink">More guides</h2>
          <ul className="mt-4 space-y-3">
            {related.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="text-ink underline underline-offset-2 hover:text-deep-green">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
