"use client";

import { X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Property } from "@/lib/types";
import { applyFilters, type FiltersState } from "@/lib/filters";
import { FiltersFields } from "@/components/property/FiltersFields";
import { Button } from "@/components/ui/Button";

export function FiltersSheet({
  open,
  onClose,
  filters,
  allProperties,
  savedIds,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  filters: FiltersState;
  allProperties: Property[];
  savedIds: string[];
  onApply: (next: FiltersState) => void;
}) {
  const [draft, setDraft] = useState(filters);
  const draftCount = useMemo(
    () => applyFilters(allProperties, draft, savedIds).length,
    [allProperties, draft, savedIds]
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset draft to the applied filters each time the sheet opens
      setDraft(filters);
      triggerRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      panelRef.current?.querySelector<HTMLElement>("button, input, select")?.focus();
    } else {
      document.body.style.overflow = "";
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter homes"
        className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-panel bg-surface motion-safe:animate-[slideIn_200ms_ease-out]"
      >
        <div className="flex items-center justify-between border-b border-divider p-5">
          <h2 className="font-heading text-lg text-ink">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <FiltersFields value={draft} onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))} />
        </div>

        <div className="border-t border-divider p-5">
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              onApply(draft);
              onClose();
            }}
          >
            Show {draftCount} {draftCount === 1 ? "Home" : "Homes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
