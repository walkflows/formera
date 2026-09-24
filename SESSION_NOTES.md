# FORMERA session notes

## Session 2 — corrections round (local only, not pushed or published)

### Changed
- **Typography:** Playfair Display (500/600) now drives all `h1`/`h2` via one global rule in `app/globals.css`; DM Sans stays on `h3`+ and UI, Manrope on body/buttons. New `.hero-title` / `.hero-copy` classes give hero headings tuned weight, letter-spacing, balanced wrapping and a soft text shadow. Applied to Home, Properties, About, Contact heroes.
- **Home hero:** full-viewport-width image (no outer padding), content in the standard container. The featured-home card now holds its own "View Property" button linking to `/properties/the-hudson-residence` (resolved from shared data). Verified by clicking it: lands on The Hudson Residence.
- **Buttons:** one `Button` component with hover lift, colour/shadow transition, arrow that slides on hover/focus, pressed state, visible keyboard ring, `outline-light` variant for dark photos. Motion classes are `motion-safe:`; global reduced-motion rule kills transitions. Hover-only effects are cosmetic (all controls work by touch).
- **Less Guesswork:** rebuilt as image (natural colours, no overlay) beside numbered points; stacks on mobile.
- **Photography:** Guides (index, home "Before Your Next Move", articles) now use house photos; About hero is a residential house with a left-weighted overlay for legible text; About story image is a residential interior. Large new photos were downscaled to 2000px wide.
- **Favicon:** the supplied `FORMERA FAVICON.png` is an opaque white building glyph on a transparent background (invisible on light browser tabs). It is used unaltered, placed on the brand ink (#20231F) rounded square, to `app/icon.png` (512), `app/apple-icon.png` (180) and `app/favicon.ico` (48). All three return 200.
- **Home enquiry section:** heading + form now sit on one image-backed panel (previously the image was in normal flow above them). Form still validates and only shows a local preview; it never claims delivery.
- **Footer:** consolidated disclosure block above the image; image panel with Explore + Get in Touch (placeholder phone/email/address labelled "Placeholder details", `example.com` email, Instagram/TikTok/Facebook icons that are NOT links); logo in its own area at the bottom. Old "About this demo"/"FORMERA" link groups removed; Demo Information is reachable via the disclosure's "Learn more".
- **Demo wording:** removed from card badges, titles, headings, guide labels, sticky enquiry card, contact placeholder, page metadata, FAQs. Deleted the "Explore 15 fictional listings…" sentence. Honest wording kept where it matters: footer disclosure, form "Preview only" notice and preview message, FAQ 5, `/demo-information`.
- **Testimonials:** reusable `components/testimonials/Testimonials.tsx` (scroll-snap carousel, prev/next buttons, swipe, focusable track) on Home, About and Guides, headed "Sample testimonials" with a not-verified-reviews line. Data in `lib/data/testimonials.ts`.

### Verified (Playwright, localhost)
- Desktop 1440 and mobile 390 screenshots of Home (hero, Less Guesswork, enquiry, footer), About (hero, testimonials), Guides.
- No horizontal overflow at 320 / 390 / 768 on every route (iframe sweep).
- Favicon links load; reduced-motion emulation zeroes transitions; keyboard focus ring renders on buttons; testimonial next button scrolls; View Property destination correct.
- `npx tsc --noEmit` and `npm run lint` clean.

### Open items / needs Joshua
1. **Testimonial portraits are provisionally mapped.** Files are only numbered, so I matched by gender in supplied order: Sarah = image 2, Emma = image 5, Daniel = image 3, James = image 7, Michael = image 8. Please confirm (swap in `lib/data/testimonials.ts`).
2. **Footer placeholders:** real phone, email, address and social profile URLs.
3. **Top demo banner** ("FORMERA — a real estate website demo by WALKFLOW.") was kept as the brief's WALKFLOW attribution; say if you want it removed, since it duplicates the footer disclosure.
4. **Property cards** no longer show "Sample listing"; the detail page keeps one small "For Sale · Sample listing" tag. Say if that should go too.
5. **Favicon:** if you want the white glyph on a different backdrop, or a dark-on-transparent version, supply it.
6. **Photography** is still a reused stock pool (no real NYC streets, no bedroom/bathroom shots); several tiles and guide images are illustrative.
7. `NEXT_PUBLIC_WALKFLOW_CONTACT_URL` still unset, so WALKFLOW CTAs and FAQ 8 stay hidden.

## Session 3 — standalone FORMERA branding (local only)
- All public references to WALKFLOW/demo/portfolio/sample/preview removed; `/demo-information` route and footer/contact WALKFLOW links deleted. Top bar and footer line read "FORMERA — Find a place that feels like yours."; footer text uses the supplied positioning statement.
- Montserrat (400–900) via `next/font` for everything; h1 ExtraBold, h2/h3 Bold, body regular/medium.
- New home hero photo (`hero/home-hero.jpg`); `.on-image` / `.hero-title` text shadows on text over photos; enquiry heading top-aligned with the form.
- Testimonials (placeholder, unlabeled) order Daniel, Sarah, James, Emma, Michael; now on Home, Properties, property pages, About, Guides, Contact.
- Footer contact details set as supplied; social icons are not links (no profile URLs yet).
- Verified: no banned words in rendered text/alt/titles/descriptions on 10 routes; no horizontal overflow at 320/390/768/1024; build, tsc, lint.

### Must resolve before publishing
1. **Enquiry delivery is not connected.** The form still shows an on-screen notice and summary saying nothing has been delivered (kept deliberately: removing it would tell visitors an enquiry was sent when it was not). Needs a real backend/email hookup.
2. Listings, prices, testimonials (with portraits) and the address/phone/email are placeholders; replace with real, approved content. Testimonial portrait-to-name mapping is still provisional.
3. Site remains `noindex`. Social icons need real profile URLs.
