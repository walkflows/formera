"use client";

import { Heart } from "lucide-react";
import clsx from "clsx";
import { useSavedProperties } from "@/context/SavedPropertiesContext";

export function SaveHeart({
  propertyId,
  propertyName,
  className,
  size = "md",
}: {
  propertyId: string;
  propertyName: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const { isSaved, toggleSaved, hydrated } = useSavedProperties();
  const saved = hydrated && isSaved(propertyId);
  const dimension = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const iconSize = size === "sm" ? 16 : 18;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(propertyId);
      }}
      aria-pressed={saved}
      aria-label={
        saved ? `Remove ${propertyName} from saved homes` : `Save ${propertyName}`
      }
      className={clsx(
        dimension,
        "inline-flex items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition-transform duration-150 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-green active:scale-95",
        className
      )}
    >
      <Heart
        size={iconSize}
        className={clsx(
          "transition-colors",
          saved ? "fill-gold text-gold" : "fill-none text-ink"
        )}
        aria-hidden="true"
      />
    </button>
  );
}
