import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { brand, heroImages } from "@/lib/data/assets";
import { CONTACT_DETAILS, FOOTER_DISCLOSURE, TAGLINE } from "@/lib/config";

const exploreLinks = [
  { href: "/properties?purpose=sale", label: "Homes to Buy" },
  { href: "/properties?purpose=rent", label: "Homes to Rent" },
  { href: "/saved", label: "Saved Homes" },
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
];

const linkClass =
  "inline-block py-1 text-[15px] text-white/90 transition-colors duration-200 hover:text-gold focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.3 2.4 1.7 4 4 4.2v3.1c-1.5.1-2.9-.4-4-1.2v6.2c0 3.2-2.5 5.7-5.7 5.7S5.2 18.5 5.2 15.3s2.6-5.8 6-5.7v3.2c-1.5-.1-2.8 1-2.8 2.5 0 1.4 1.1 2.5 2.5 2.5s2.6-1.1 2.6-2.6V3h3.1z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "TikTok", Icon: TikTokIcon },
  { label: "Facebook", Icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-formera pt-14 md:pt-20">
        <p className="max-w-4xl border-l-2 border-gold pl-4 text-sm leading-relaxed text-white/80">
          {FOOTER_DISCLOSURE}
        </p>

        <div className="relative mt-6 overflow-hidden rounded-panel">
          <Image
            src={heroImages.footerPanel.src}
            alt={heroImages.footerPanel.alt}
            fill
            sizes="(min-width: 1280px) 1184px, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/55"
            aria-hidden="true"
          />

          <div className="on-image relative grid grid-cols-1 gap-10 p-6 sm:p-10 md:grid-cols-2 md:gap-16 lg:p-14">
            <nav aria-label="Footer">
              <h2 className="text-2xl text-white">Explore</h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 sm:max-w-sm">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <section aria-labelledby="footer-contact-heading">
              <h2 id="footer-contact-heading" className="text-2xl text-white">
                Get in Touch
              </h2>
              <ul className="mt-5 space-y-3 text-[15px] text-white/90">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="visually-hidden">Phone: </span>
                    <a href={`tel:${CONTACT_DETAILS.phone.replace(/[^+0-9]/g, "")}`} className="hover:text-gold">{CONTACT_DETAILS.phone}</a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="visually-hidden">Email: </span>
                    <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-gold">{CONTACT_DETAILS.email}</a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="visually-hidden">Address: </span>
                    {CONTACT_DETAILS.address}
                  </span>
                </li>
              </ul>

              <ul className="mt-6 flex items-center gap-3" aria-label="Social media">
                {socials.map(({ label, Icon }) => (
                  <li key={label}>
                    <span
                      role="img"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white/85"
                    >
                      <Icon />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 py-14 md:py-16">
          <Link href="/" aria-label="FORMERA home" className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
            <Image
              src={brand.logoWhite}
              alt="FORMERA"
              width={216}
              height={72}
              className="h-14 w-auto md:h-16"
            />
          </Link>
          <p className="text-center text-xs text-white/60">{TAGLINE}</p>
        </div>
      </div>
    </footer>
  );
}
