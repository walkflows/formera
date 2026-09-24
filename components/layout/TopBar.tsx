import { TOP_BAR_TEXT } from "@/lib/config";

export function TopBar() {
  return (
    <div className="bg-ink text-white">
      <p className="container-formera py-2 text-center text-xs font-medium tracking-wide sm:text-[13px]">
        {TOP_BAR_TEXT}
      </p>
    </div>
  );
}
