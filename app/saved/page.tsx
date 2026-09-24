import type { Metadata } from "next";
import { SavedList } from "@/components/saved/SavedList";

export const metadata: Metadata = {
  title: "Saved Homes",
  description: "Review the sample FORMERA listings you've saved on this browser.",
};

export default function SavedPage() {
  return (
    <div className="container-formera py-12 md:py-16">
      <h1 className="font-heading text-3xl text-ink sm:text-4xl">
        Your shortlist, all in one place.
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Come back to the homes that caught your attention. Open a listing for another look or
        remove the ones that no longer fit.
      </p>

      <div className="mt-10">
        <SavedList />
      </div>
    </div>
  );
}
