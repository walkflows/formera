"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/config";
import { brand } from "@/lib/data/assets";
import { Button } from "@/components/ui/Button";
import { useSavedProperties } from "@/context/SavedPropertiesContext";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const pathname = usePathname();
  const { savedIds } = useSavedProperties();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-divider bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-formera flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="FORMERA home">
          <Image
            src={brand.logoBlack}
            alt="FORMERA"
            width={140}
            height={35}
            className="h-7 w-auto"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "font-heading text-[15px] transition-colors hover:text-gold",
                  active ? "text-ink" : "text-ink-soft"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/saved"
            className="relative hidden h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 sm:inline-flex"
            aria-label={`Saved homes${savedIds.length ? `, ${savedIds.length} saved` : ""}`}
          >
            <Heart size={20} aria-hidden="true" />
            {savedIds.length > 0 ? (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-deep-green px-1 text-[11px] font-medium text-white"
                aria-hidden="true"
              >
                {savedIds.length}
              </span>
            ) : null}
          </Link>

          <Button href="/properties" size="sm" className="hidden sm:inline-flex">
            Find a Home
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 md:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} savedCount={savedIds.length} />
    </>
  );
}
