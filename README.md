# FORMERA

FORMERA is a real estate website: browse properties, filter and save homes,
read guides and send an enquiry. Built with Next.js, TypeScript and Tailwind.

## Run locally

```bash
npm install
npm run dev      # development server (prints its localhost URL)
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type-check
```

## Where things live

- `lib/data/properties.ts` — all listings (facts, prices, copy, image references).
- `lib/data/guides.ts`, `lib/data/faqs.ts`, `lib/data/testimonials.ts` — guides, FAQs, testimonials.
- `lib/data/assets.ts` — hero, banner, neighbourhood and guide imagery with alt text.
- `lib/config.ts` — brand tagline, positioning statement, navigation, contact details.
- `lib/filters.ts` — search/filter/sort/pagination and the URL query scheme.
- `components/` — shared UI by area; `app/` — one folder per route.
- `public/images/formera/` — all imagery. Replace a file with the same name to swap it everywhere.

## Status

- Working: browsing, filters and sorting with shareable URLs, saved homes (browser storage), galleries, enquiry form validation.
- Not connected yet: enquiry delivery (no email/CRM/database). The form says so on screen and never claims an enquiry was sent.
- Listings, testimonials and contact details are placeholders to replace with real ones before publishing. The site is marked `noindex` until then.
