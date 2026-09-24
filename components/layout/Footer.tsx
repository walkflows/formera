import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { heroImages } from "@/lib/data/assets";
import { brand } from "@/lib/data/assets";
import { FOOTER_DISCLOSURE, WALKFLOW_CONTACT_URL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-formera py-16 md:py-20">
        <div className="relative overflow-hidden rounded-panel">
          <Image
            src={heroImages.footerPanel.src}
            alt={heroImages.footerPanel.alt}
            width={1280}
            height={520}
            className="h-[280px] w-full object-cover md:h-[340px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <Image
              src={brand.logoWhite}
              alt="FORMERA"
              width={160}
              height={40}
              className="mb-6 h-8 w-auto"
            />
            <h2 className="max-w-md font-heading text-2xl text-white sm:text-3xl">
              Your next move starts with a closer look.
            </h2>
            <p className="mt-3 max-w-md text-white/80">
              Explore the homes, keep a shortlist and find the details that matter to you.
            </p>
            <Button href="/properties" className="mt-6 w-fit">
              Explore Properties
            </Button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div>
            <h3 className="font-heading text-sm text-white/60">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/properties?purpose=sale" className="hover:text-gold">
                  Homes to Buy
                </Link>
              </li>
              <li>
                <Link href="/properties?purpose=rent" className="hover:text-gold">
                  Homes to Rent
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-gold">
                  Saved Homes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm text-white/60">FORMERA</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-gold">
                  About
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-gold">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm text-white/60">About this demo</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/demo-information" className="hover:text-gold">
                  Demo Information
                </Link>
              </li>
              {WALKFLOW_CONTACT_URL ? (
                <li>
                  <Link href={WALKFLOW_CONTACT_URL} className="hover:text-gold">
                    WALKFLOW Portfolio
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-white/50">
          {FOOTER_DISCLOSURE}
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>FORMERA — Website concept by WALKFLOW.</p>
          <p>&copy; {new Date().getFullYear()} FORMERA demo. Not a real business.</p>
        </div>
      </div>
    </footer>
  );
}
