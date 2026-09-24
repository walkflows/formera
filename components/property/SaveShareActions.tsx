"use client";

import { useState } from "react";
import { Heart, Share2, Check } from "lucide-react";
import clsx from "clsx";
import { useSavedProperties } from "@/context/SavedPropertiesContext";

export function SaveShareActions({
  propertyId,
  propertyName,
}: {
  propertyId: string;
  propertyName: string;
}) {
  const { isSaved, toggleSaved, hydrated } = useSavedProperties();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const saved = hydrated && isSaved(propertyId);

  async function handleShare() {
    setCopyFailed(false);
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => toggleSaved(propertyId)}
        aria-pressed={saved}
        className={clsx(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
          saved ? "border-gold bg-gold text-gold-ink" : "border-divider text-ink hover:border-ink/40"
        )}
      >
        <Heart size={16} className={saved ? "fill-gold-ink" : "fill-none"} aria-hidden="true" />
        {saved ? "Saved" : "Save Home"}
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-full border border-divider px-4 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Share2 size={16} aria-hidden="true" />}
        {copied ? "Link copied" : "Share"}
      </button>

      {copyFailed ? (
        <p role="alert" className="w-full text-sm text-ink-soft">
          Copying didn&apos;t work in this browser. Copy the address bar link to share{" "}
          {propertyName}.
        </p>
      ) : null}
    </div>
  );
}
