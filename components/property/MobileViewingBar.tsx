import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/lib/types";

export function MobileViewingBar({ property }: { property: Property }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-divider bg-surface/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <span className="font-heading text-base text-ink">{formatPrice(property)}</span>
        <Button href={`/contact?intent=viewing&property=${property.slug}#enquiry-form`} size="sm">
          Request a Viewing
        </Button>
      </div>
    </div>
  );
}
