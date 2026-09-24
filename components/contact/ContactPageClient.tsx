"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "@/components/contact/EnquiryForm";

export function ContactPageClient() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent") ?? undefined;
  const property = searchParams.get("property") ?? undefined;
  const savedSlugParams = searchParams.get("savedSlugs");
  const savedSlugs = savedSlugParams ? savedSlugParams.split(",").filter(Boolean) : [];

  return (
    <EnquiryForm
      variant="full"
      defaultIntentQuery={intent}
      defaultPropertySlug={property}
      savedSlugs={savedSlugs}
      id="enquiry-form"
    />
  );
}
