# FORMERA (WALKFLOW demo)

FORMERA is a fictional real estate website built as a standalone WALKFLOW portfolio
demo. It is entirely local: there is no backend, no database, and no analytics.
See `/demo-information` on the running site for the visitor-facing explanation, and
`FORMERA-Claude-Code-Website-Brief.md` in this folder for the full content brief this
build follows.

## Running locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:3000, or the next free port if 3000
is already in use). Other useful scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
npx tsc --noEmit  # type-check only
```

## Where things live

- `lib/data/properties.ts` — the authoritative dataset for all 15 sample listings
  (facts, prices, copy, highlights, image references). Card and detail pages both
  read from this one file, so editing a listing here updates it everywhere.
- `lib/data/guides.ts`, `lib/data/faqs.ts` — the four guide articles and the shared
  FAQ bank (pages pick which FAQ IDs to show).
- `lib/data/assets.ts` — the manifest for hero/neighbourhood/about imagery, with alt
  text and a note on where the photography came from.
- `lib/config.ts` — site-wide config, including `NEXT_PUBLIC_WALKFLOW_CONTACT_URL`
  (see below).
- `lib/filters.ts` — the Properties page's filter/sort/pagination logic and URL
  query-param scheme.
- `components/` — shared UI, organised by area (`layout`, `home`, `property`,
  `contact`, `saved`, `ui`).
- `app/` — one route per page, following the Next.js App Router.
- `public/images/formera/` — all site imagery, grouped by use (`hero`,
  `neighbourhoods`, `about`, `properties`, `brand`).

## Replacing media

Swap a file in `public/images/formera/...` for a new one **with the same filename**
and it updates everywhere automatically. To use a different filename, update the
matching entry in `lib/data/assets.ts` (shared imagery) or the `cover`/`gallery`
fields in `lib/data/properties.ts` (listing photos).

## Editing copy

- Page copy lives directly in each file under `app/` and `components/`.
- Listing facts and copy live in `lib/data/properties.ts`.
- Guides and FAQs live in `lib/data/guides.ts` and `lib/data/faqs.ts`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in values as needed:

- `NEXT_PUBLIC_WALKFLOW_CONTACT_URL` — when set, this turns on the "Discuss a
  website like this" banner link, the WALKFLOW CTAs on the Contact/About pages, the
  footer's WALKFLOW portfolio link, and FAQ 8. Left unset (the default), the demo
  stays fully self-contained and none of those render.
- `NEXT_PUBLIC_SITE_URL` — only used to build absolute URLs in `sitemap.xml`.

Neither variable is required to run or demo the site locally.

## What's real vs. simulated

- **Real and working:** property browsing, filters/sort/pagination with shareable
  URLs, saved homes (localStorage), the gallery/lightbox, and the enquiry form's
  client + server-shaped validation and "preview" flow.
- **Intentionally simulated:** the enquiry form never sends data anywhere — it holds
  values in memory only and shows an on-page preview of what would be sent. This is
  called out in the form itself and on `/demo-information`.
- **Not implemented (out of scope for this demo):** any backend, database, email/CRM
  integration, authentication, or analytics. The whole site is marked `noindex`.

## Known limitations to flag before a real launch

- The supplied stock photo pool has no genuine New York streetscapes and no
  bedroom/bathroom interiors. Neighbourhood tiles and some property photos are
  reused across sample listings and labelled illustrative rather than literal; two
  neighbourhood tiles (SoHo, Upper East Side) show photography with palm trees /
  suburban driveways that don't match the borough. Real NYC photography is
  recommended before this leaves demo status.
- Several property detail pages show a "More photos coming soon" placeholder in the
  gallery rather than a full multi-room set, for the same reason.
