import Link from "next/link";
import { DEMO_BANNER_TEXT, WALKFLOW_CONTACT_URL } from "@/lib/config";

export function DemoBanner() {
  return (
    <div className="bg-ink text-white">
      <div className="container-formera flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-xs sm:text-[13px]">
        <span>{DEMO_BANNER_TEXT}</span>
        {WALKFLOW_CONTACT_URL ? (
          <Link href={WALKFLOW_CONTACT_URL} className="underline underline-offset-2 hover:text-gold">
            Discuss a website like this
          </Link>
        ) : null}
      </div>
    </div>
  );
}
