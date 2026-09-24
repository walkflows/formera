"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { NAV_LINKS } from "@/lib/config";
import { Button } from "@/components/ui/Button";

export function MobileMenu({
  open,
  onClose,
  savedCount,
}: {
  open: boolean;
  onClose: () => void;
  savedCount: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-ink/40 motion-safe:animate-[fadeIn_180ms_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-surface p-6 shadow-xl motion-safe:animate-[slideIn_200ms_ease-out]"
      >
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg text-ink">Menu</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5"
            aria-label="Close menu"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Primary" className="mt-8 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 font-heading text-lg text-ink hover:bg-ink/5"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/saved"
            onClick={onClose}
            className="rounded-lg px-3 py-3 font-heading text-lg text-ink hover:bg-ink/5"
          >
            Saved Homes{savedCount > 0 ? ` (${savedCount})` : ""}
          </Link>
        </nav>

        <Button href="/properties" onClick={onClose} className="mt-8">
          Find a Home
        </Button>
      </div>
    </div>
  );
}
