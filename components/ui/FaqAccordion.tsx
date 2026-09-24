import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-divider rounded-card border border-divider bg-surface">
      {faqs.map((faq) => (
        <details key={faq.id} className="group p-5 sm:p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base text-ink marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-green sm:text-lg">
            {faq.question}
            <ChevronDown
              size={20}
              className="shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
