"use client";

import { MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";

const NOTE =
  "FORMERA helps you explore available homes. Enquiries and viewings are subject to confirmation.";

const faqs = [
  {
    q: "How do I search for a home?",
    a: "Open Properties and use the search box, the Buy/Rent selector and the filters for neighbourhood, type, bedrooms, budget and features. Your filters stay in the page link, so you can come back to them.",
  },
  {
    q: "Can I save homes?",
    a: "Yes. Tap the heart on any listing. Saved homes are kept in this browser and collected on the Saved Homes page, where you can review them or enquire about several at once.",
  },
  {
    q: "How do I request a viewing?",
    a: "Open a property and choose Request a Viewing. The home is carried into the enquiry form, where you can add a preferred date and time window. Viewings are subject to confirmation.",
  },
  {
    q: "What happens after I send an enquiry?",
    a: "Enquiry sending is not switched on yet: details you enter stay in this browser and are not delivered. Enquiries and viewings are subject to confirmation.",
  },
  {
    q: "Are prices monthly or purchase prices?",
    a: "Homes to buy show a purchase price. Rentals show a monthly price marked /month. Choose Buy or Rent in the filters to search by budget.",
  },
];

interface Message {
  from: "user" | "bot";
  text: string;
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const openPanel = useCallback(() => {
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => setMounted(false), 220);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closePanel();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closePanel]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function ask(item: (typeof faqs)[number]) {
    setMessages((m) => [...m, { from: "user", text: item.q }, { from: "bot", text: item.a }]);
  }

  // Property pages show a fixed viewing bar on small screens; lift the widget above it.
  const lifted = pathname?.startsWith("/properties/");

  return (
    <div
      className={clsx(
        "fixed right-4 z-40 flex flex-col items-end gap-3 sm:right-6",
        lifted ? "bottom-24 lg:bottom-6" : "bottom-4 sm:bottom-6"
      )}
    >
      {mounted ? (
        <div
          ref={panelRef}
          id="formera-chat-panel"
          role="dialog"
          aria-label="FORMERA help chat"
          tabIndex={-1}
          className={clsx(
            "flex max-h-[min(640px,calc(100dvh-8.5rem))] w-[calc(100vw-2rem)] max-w-[380px] origin-bottom-right flex-col overflow-hidden rounded-panel border border-divider bg-surface shadow-[0_24px_60px_rgba(32,35,31,0.28)] outline-none",
            "transition-[opacity,transform] duration-200 ease-out",
            open ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
          )}
        >
          <div className="flex items-center justify-between bg-deep-green px-5 py-4 text-white">
            <div>
              <p className="font-heading text-base font-bold">FORMERA Help</p>
              <p className="text-xs text-white/75">Quick answers about searching and enquiring</p>
            </div>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close chat"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            className="min-h-[170px] flex-1 space-y-3 overflow-y-auto px-5 py-4 text-[14px] leading-relaxed"
          >
            <p className="max-w-[90%] rounded-2xl rounded-tl-sm bg-background px-4 py-3 text-ink">
              Hello! Choose a question below for quick guidance.
            </p>
            {messages.map((m, i) => (
              <p
                key={i}
                className={clsx(
                  "max-w-[90%] rounded-2xl px-4 py-3",
                  m.from === "user"
                    ? "ml-auto rounded-tr-sm bg-gold text-gold-ink"
                    : "rounded-tl-sm bg-background text-ink"
                )}
              >
                {m.text}
              </p>
            ))}
          </div>

          <div className="border-t border-divider px-5 pb-4 pt-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
              Common questions
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {faqs.map((item) => (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => ask(item)}
                    className="rounded-full border border-ink/20 px-3 py-2 text-left text-[13px] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-green focus-visible:ring-offset-2"
                  >
                    {item.q}
                  </button>
                </li>
              ))}
            </ul>
            <Button href="/contact" onClick={closePanel} className="mt-4 w-full">
              Send an enquiry
            </Button>
            <p className="mt-3 text-[12px] leading-snug text-ink-soft">{NOTE}</p>
          </div>
        </div>
      ) : null}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? closePanel() : openPanel())}
        aria-label={open ? "Close FORMERA help chat" : "Open FORMERA help chat"}
        aria-expanded={open}
        aria-controls="formera-chat-panel"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-deep-green text-white shadow-[0_10px_28px_rgba(38,59,50,0.4)] ring-2 ring-gold/70 transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#1c2e26] hover:shadow-[0_14px_34px_rgba(38,59,50,0.5)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-95"
      >
        <span className="relative h-6 w-6" aria-hidden="true">
          <MessageCircle
            size={24}
            className={clsx(
              "absolute inset-0 transition-[opacity,transform] duration-200",
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            )}
          />
          <X
            size={24}
            className={clsx(
              "absolute inset-0 transition-[opacity,transform] duration-200",
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            )}
          />
        </span>
      </button>
    </div>
  );
}
