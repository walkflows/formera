import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Demo Information",
  description: "What FORMERA is, what's simulated, and how the demo forms and saved homes work.",
};

export default function DemoInformationPage() {
  return (
    <div className="container-formera py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-heading text-3xl text-ink sm:text-4xl">About this demonstration.</h1>

        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-soft">
          <p>
            FORMERA shows how property browsing, saved homes and enquiry forms can work together
            on a real estate website. It is a portfolio project by WALKFLOW, not an operating
            property agency.
          </p>
          <p>
            Listings and prices are fictional. Photography is illustrative and does not verify a
            property&apos;s location, condition or availability. Do not use these details to make
            a purchase or rental decision.
          </p>
          <p>
            The property forms run as local previews. Your entries are not sent or saved by the
            form. Saved homes store property IDs in your browser, and you can remove them from the
            Saved Homes page. The website host may process technical request data under its own
            policies. The initial demo includes no added analytics or marketing trackers.
          </p>
          <p>
            Any future connection to email, a CRM or booking tools will need a separate
            implementation and updated information about how enquiries are handled.
          </p>
        </div>

        <Button href="/properties" className="mt-8">
          Back to Properties
        </Button>
      </div>
    </div>
  );
}
