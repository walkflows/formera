import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/lib/types";

export function StickyEnquiryCard({ property }: { property: Property }) {
  return (
    <div className="sticky top-28 hidden rounded-panel border border-divider bg-surface p-6 shadow-[0_1px_2px_rgba(32,35,31,0.06)] lg:block">
      <p className="font-heading text-lg text-ink">Take a closer look.</p>
      <p className="mt-2 text-sm text-ink-soft">
        Start a viewing request for {property.name}, or ask a question about the home.
      </p>
      <p className="mt-4 font-heading text-xl text-ink">{formatPrice(property)}</p>
      <div className="mt-5 flex flex-col gap-3">
        <Button href={`/contact?intent=viewing&property=${property.slug}#enquiry-form`}>
          Request a Viewing
        </Button>
        <Button
          href={`/contact?intent=property-question&property=${property.slug}#enquiry-form`}
          variant="outline"
        >
          Ask About This Home
        </Button>
      </div>
    </div>
  );
}
