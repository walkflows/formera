# FORMERA — Complete website content and Claude Code build brief

## 1. What to build

Build FORMERA as a standalone fictional real estate website for WALKFLOW’s Web Design portfolio. Create the complete website described here, including all page copy, 15 individual property pages, working filters, saved properties, galleries and a clearly labelled viewing-request preview.

FORMERA demonstrates WALKFLOW’s ability to make a business easy to understand, help visitors find what suits them and turn interest into a clear next step. The visitor-facing content should sound like a thoughtful property business. Keep WALKFLOW’s service pitch in a small, separate demo banner and footer attribution.

This brief sets the content and behaviour. The supplied screenshots guide layout and visual proportions. They are not finished page assets and their original text is not approved copy.

Working market assumption: New York, with prices in USD and areas in square feet, matching the supplied references. All property names, prices, specifications and descriptions below are invented demonstration data. They are not real availability, valuations or investment advice. Display “Sample listing” on cards and detail pages. Use neighbourhood names for context, but do not invent precise street addresses, map pins, brokerage licences or actual agent identities.

Build in the separate FORMERA project folder. Inspect existing project instructions and files first. Preserve unrelated work. If starting from an empty folder, use Next.js with TypeScript and a simple shared component structure. Keep the project independently deployable. Finish and test locally; do not deploy or purchase services as part of this brief.

## 2. Reference images: how to inspect and use them

Put the ten supplied screenshots in a folder named `design-references` at the FORMERA project root, retaining their filenames. Put usable original photography in `public/images/formera`, grouped into `hero`, `neighbourhoods`, `about` and `properties`. Put black and white FORMERA logo files in `public/images/formera/brand`.

Claude Code must list the folders and open every reference before writing the page layouts. Inspect each image visually, not just its filename. If an image exceeds the tool’s size limit, make smaller inspection copies or overlapping sections, keeping originals untouched. Aim for inspection files under 4 MB each. Use numbered sections to retain reading order. Do not repeatedly attach oversized full-page images to the chat.

| Exact reference filename | Apply to | What to take from it |
|---|---|---|
| `1. reference hero section.png` | Home: hero and featured listings | Large rounded photo hero; oversized light text; compact white featured-property panel; spacious heading row; three-column property grid |
| `2. reference image.png` | Home: benefits and introduction | Photo-backed banner; split text/image introduction; one large card beside four smaller cards. Replace invented stats and testimonials with the content below |
| `3. reference image.png` | Home: neighbourhoods and search-help banner | Six rounded neighbourhood image tiles with overlays. Replace “As Seen In” with a useful search-help CTA |
| `4. reference image.png` | Home: guides, enquiry and FAQ | Editorial heading beside four guide cards; wide photo panel with white enquiry card; two-column FAQ layout |
| `5. reference footer section.png` | Shared footer | Wide rounded image-backed footer; white logo; clear link columns; bottom divider. Replace newsletter and unused links as specified below |
| `about us reference image.png` | About | Image hero; split story section; four-card row; supporting banner; enquiry section. Use approach and service-role cards rather than fabricated people |
| `contact page reference image.png` | Contact | Wide photo hero; form on the left, large interior image on the right |
| `reference individual property details image 1.png` | Property detail: upper section | Image hero and thumbnails; description with sticky enquiry panel; key facts; large gallery; organised feature tables |
| `reference individual property details image 2.png` | Property detail: lower section | Optional video, location context, image CTA, related listings and footer. Omit video without a real supplied file and omit inaccurate maps |
| `reference property listings page.png` | Properties | Image hero; large introductory heading; consistent three-column cards; shared footer. Add functional filters above the grid |

Reference numbers 1–5 represent the homepage’s top-to-bottom flow. The two property-detail references are consecutive parts of one detail template, not separate page types.

Rebuild layouts as real responsive components. Do not place screenshots on the page as a substitute for components. Do not crop the original brand logos or template credits out of reference screenshots and present the remaining screenshot as our design. Use separate authorised photographs. If originals are missing, show attractive labelled image placeholders and report the missing assets; do not silently reuse one photograph as 15 different properties.

Create an editable asset manifest mapping every hero, card, neighbourhood and property gallery to its actual file path and alt text. If gallery filenames end in a number, sort numerically: 1, 2, 3 … 10. Do not use alphabetical ordering that puts 10 before 2. Do not invent a video, floor plan or 360-degree tour where none exists.

## 3. Visual direction and typography

FORMERA should feel calm, spacious and architectural. Use large photography, light backgrounds, dark text, warm gold details and restrained movement. This gives WALKFLOW’s portfolio a distinct real estate identity.

Recommended font pairing: **DM Sans for headings, Manrope for body text and interface labels**. This is a design recommendation, not an identification of the exact reference fonts.

- Headings: DM Sans, weights 400–500. Avoid heavy bold display headings.
- Body: Manrope 400; buttons/navigation 500–600.
- Hero headline: responsive 44–104 px, line height around 1.04; never force it onto one line on mobile.
- Section headings: responsive 32–64 px, line height 1.12.
- Body: 16–18 px, line height 1.6. Form inputs at least 16 px.
- Small labels: 13–14 px. Keep useful information legible.
- Prices: use consistent numeric alignment; allow wrapping on narrow cards.
- Load only required weights; use local font assets where available. Include a sensible sans-serif fallback and prevent layout jumps.

Official font sources: https://fonts.google.com/specimen/DM+Sans and https://fonts.google.com/specimen/Manrope.

Suggested palette:

| Role | Colour |
|---|---|
| Page background | `#F7F6F2` |
| Card surface | `#FFFFFF` |
| Main text | `#20231F` |
| Secondary text | `#62665F` |
| Warm gold fill | `#C6A76A` |
| Gold button text | `#20231F` |
| Dividers | `#DEDED5` |
| Deep green alternative CTA | `#263B32` with white text |

Use dark text on gold buttons rather than low-contrast white. Check real colour contrast when building. Photos with white text need a dark overlay that works across the entire text area.

Use 24–32 px radii for large photo panels, 18–24 px for cards, and pill-shaped buttons. Keep desktop content around 1280 px maximum width, with 24–48 px outer gutters. Mobile gutters: 20 px. Avoid excessive blank space: section spacing approximately 80–112 px desktop and 48–64 px mobile.

## 4. Page map and shared navigation

| Page | Route | Main purpose |
|---|---|---|
| Home | `/` | Introduce FORMERA and start a property search |
| Properties | `/properties` | Browse, filter and sort all 15 properties |
| Property details | `/properties/[slug]` | Explore one home and start its viewing request |
| Saved homes | `/saved` | Review a visitor’s local shortlist |
| About FORMERA | `/about` | Explain the approach and support available |
| Property guides | `/guides` | Read the four short guides below |
| Guide details | `/guides/[slug]` | Read a complete guide and continue searching |
| Contact | `/contact` | Preview a general, buying, renting or selling enquiry |
| Demo information | `/demo-information` | Explain sample data and local-only form behaviour |
| Not found | framework 404 route | Recover from an invalid URL |

Header: FORMERA logo links home. Links: Properties · About · Guides · Contact. Saved-home icon includes a count and accessible text. Main button: **Find a Home** → `/properties`.

Place a discreet persistent demo label above the header: **“FORMERA — a real estate website demo by WALKFLOW.”** Add **“Discuss a website like this”** only when the actual WALKFLOW contact URL has been supplied. Keep that destination in one config value. Do not guess a live WALKFLOW domain.

On photo heroes use the white logo and light navigation with adequate contrast. After scrolling use a solid light header and black logo. On mobile use a labelled menu button, a readable panel, keyboard support and a close button. Preserve the saved-home control.

## 5. Homepage: final copy and section order

### Hero

Eyebrow: FORMERA REAL ESTATE

H1: **A home that feels right. A clearer way to find it.**

Paragraph: From a first apartment to a place with room to grow, find homes that fit the way you want to live. Explore the details, save your favourites and take the next step when you’re ready.

Primary button: **Explore Properties** → `/properties`

Secondary button: **Tell Us What You Need** → `/contact?intent=buy`

Compact search panel: Buy / Rent · Neighbourhood · Bedrooms · **Find Homes**. Default Buy. Submit the selected values to the listings page through query parameters. Label every field.

Featured-property panel: **The Hudson Residence** · Tribeca, Manhattan · **$4,250,000** · 3 beds · 3 baths · **View Property** → `/properties/the-hudson-residence`. Include “Sample listing.” Read the price from shared property data so it cannot differ from the detail page.

Keep the main headline, compact search and feature panel visually distinct. On mobile place the search and feature panel beneath the hero copy if they would otherwise crowd the photograph.

### Featured properties

Eyebrow: A FEW PLACES TO START

Heading: **Which one feels like your next move?**

Paragraph: An open living room. A quieter corner. A terrace you’ll actually use. Explore a selection of homes with different ways to make the space your own.

Show property IDs F01, F04, F07, F10, F12 and F14 in that order. Cards show listing name, neighbourhood, sale or rental price, beds, baths, interior area, sample label and save button.

Button: **Explore All 15 Properties** → `/properties`. Derive the number from the dataset.

### Photo-backed benefit banner

Eyebrow: LESS GUESSWORK

Heading: **The details that make a difference.**

Three columns:

**See what matters** — Compare price, space and features without searching through scattered information.

**Keep your favourites together** — Save the homes you want to come back to, all in one shortlist.

**Take a clear next step** — Start a viewing request with the property already selected.

Use the reference’s three-column banner composition. No animated sales totals, fake experience figures or transaction claims.

### About introduction

Heading: **A home search should start with how you live.**

Paragraph: Where you work, who you share your space with and what you want more room for all matter. FORMERA puts those details at the centre of the search, helping you move from a long list of possibilities to a few homes worth a closer look.

Paragraph: Browse at your own pace. Ask the practical questions. Keep the features you care about in view as you decide what comes next.

Buttons: **Get to Know FORMERA** → `/about`; **Start Your Search** → `/properties`.

### Priority cards — reuse the reference’s testimonial-grid proportions

Eyebrow: YOUR SEARCH, YOUR PRIORITIES

Heading: **What would make a home work better for you?**

Large photographic card: **Room for the life you’re planning.** “Need another bedroom, a place to work or somewhere to spend time outside? Start with the things you don’t want to compromise on.” Button **Share Your Priorities** → `/contact`.

Four smaller clickable cards:

- **More room to spread out.** Explore homes with three or more bedrooms. → `/properties?beds=3`
- **Your own outdoor space.** Find a balcony, terrace or private garden. → `/properties?amenities=outdoor-space`
- **A place to rent next.** Browse rental homes with clearly displayed monthly prices. → `/properties?purpose=rent`
- **Room to work from home.** Explore listings with a dedicated office or study. → `/properties?amenities=home-office`

### Neighbourhoods

Eyebrow: START WITH A PLACE

Heading: **Where would you like to come home?**

Paragraph: Already have an area in mind? Choose a neighbourhood to see its sample homes, then narrow the list by price, space and features.

Six photo tiles: Tribeca · SoHo · Upper East Side · Brooklyn Heights · Cobble Hill · West Village. Each links to its matching neighbourhood filter. Show a live listing count derived from data, not hardcoded text. Use appropriate images or label imagery illustrative; do not match landmarks to the wrong neighbourhood as in some reference tiles.

Button: **Browse Every Neighbourhood** → `/properties`.

### Search-help banner — replaces press-logo strip

Heading: **Know what you need, but haven’t found it yet?**

Paragraph: Tell us your preferred area, budget and the features that matter. Give your search a clearer starting point.

Button: **Share Your Search** → `/contact?intent=buy`.

### Guides

Eyebrow: BEFORE YOUR NEXT MOVE

Heading: **A little preparation goes a long way.**

Paragraph: Make your shortlist more useful and your viewings more focused with a few practical questions to keep in mind.

Four cards, using the guide titles and excerpts in section 12. Button **Read the Guides** → `/guides`.

### Enquiry panel

Heading: **Tell us what your next home needs to do.**

Paragraph: More space, a different neighbourhood or a simpler daily routine? Start with what matters to you.

White form card over a darkened architectural photo. Use the shared demo form, fields Name, Email, I’m looking to, Preferred neighbourhood, Budget range, Message. Place the demo notice above the fields, not only below the submit button.

### FAQ

Eyebrow: GOOD QUESTIONS

Heading: **Before you take the next step.**

Intro: Here’s how to browse the homes, keep a shortlist and try the viewing-request experience.

Show FAQ items 1–6 from section 13. Then shared footer.

## 6. Properties page and working filters

Hero H1: **Find a place that fits.**

Subheading: Explore homes to buy or rent, with the details you need to narrow your search.

Section heading: **Make the search your own.**

Paragraph: Choose your area, set your budget and focus on the features that matter. Save any home you’d like to revisit.

Notice: **“Explore 15 fictional listings. Prices, features and availability are for demonstration only.”**

All 15 records have availability `available`; 10 are for sale, 5 are for rent. Default listing view shows all 15. Display 9 per page, with 6 on page two. Filter first, sort second, paginate last. Reset to page one whenever a filter changes.

Filters:

| Control | Options / behaviour |
|---|---|
| Search | Match property name, neighbourhood and borough; case-insensitive, trimmed; label “Search homes or neighbourhoods” |
| Purpose | All homes / Buy / Rent |
| Neighbourhood | All / the six named areas; multi-select; OR within this field |
| Property type | All / Apartment / Condo / Loft / Townhouse / Penthouse; multi-select |
| Bedrooms | Any / Studio / 1+ / 2+ / 3+ / 4+; Studio means exactly 0 |
| Bathrooms | Any / 1+ / 2+ / 3+ |
| Budget | Min and max numeric inputs; inclusive bounds; only active after Buy or Rent is selected |
| Interior area | Optional minimum and maximum square feet |
| Features | Outdoor space / Home office / Parking / Lift / In-unit laundry / Concierge; require ALL checked features |
| Saved only | Show only locally saved IDs; works with other filters |
| Sort | Featured / Price low–high / Price high–low / Largest area |

When All homes is selected, show “Choose Buy or Rent to filter or sort by price.” Disable price sorting and price inputs to avoid comparing a monthly rent with a purchase price. Switching Buy ↔ Rent clears the old price range and announces it. Keep other filters. Sale budgets and monthly rental budgets must have explicit units.

Suggested quick budget chips: Buy — Up to $1m / $1m–$2m / $2m–$4m / $4m+. Rent — Up to $4,000 per month / $4,000–$6,000 / $6,000–$9,000 / $9,000+. Define non-overlapping boundaries in code; use numeric inputs as the underlying source of truth.

Display active-filter chips, individual remove buttons, **Clear All**, a result count and an accessible announcement on update. AND between different filter fields. Preserve filters, sort and page in the URL; browser Back should restore them. Treat unknown query values safely, not as a crash.

Desktop: compact filter bar with “More Filters” expansion. Mobile: labelled **Filters** button with active-count badge opens an accessible sheet with draft selections; **Show [count] Homes** applies them. Cancel leaves existing selections unchanged. Escape closes and returns focus. Controls must remain usable without animation.

No results heading: **No homes match those choices yet.**

Body: Try a wider budget, another neighbourhood or fewer must-have features.

Buttons: **Clear Filters**; **Tell Us What You Need** → contact with search preferences prefilled, but no personal data in the URL.

Invalid budget message: **“Your maximum budget must be higher than or equal to your minimum.”** Do not silently swap amounts.

## 7. The 15-property dataset

The table is authoritative for card facts, filtering and detail facts. All prices are USD. Rental figures are monthly. Area is interior area, not lot size. Use IDs F01–F15; slugs are the lowercase hyphenated property names. Purpose Buy maps to `sale`; Rent maps to `rent`. All availability fields are `available`.

| ID | Property name | Neighbourhood / borough | Purpose | Type | Price | Beds | Baths | Sq ft | Filterable amenities |
|---|---|---|---|---|---:|---:|---:|---:|---|
| F01 | The Hudson Residence | Tribeca / Manhattan | Buy | Condo | 4,250,000 | 3 | 3 | 2,450 | Outdoor space, Home office, Lift, In-unit laundry, Concierge |
| F02 | Canal House Loft | Tribeca / Manhattan | Buy | Loft | 2,650,000 | 2 | 2 | 1,850 | Home office, Lift, In-unit laundry |
| F03 | Mercer Light Loft | SoHo / Manhattan | Buy | Loft | 3,100,000 | 2 | 2 | 2,050 | Home office, Lift, In-unit laundry |
| F04 | Spring Terrace Penthouse | SoHo / Manhattan | Buy | Penthouse | 5,800,000 | 4 | 3.5 | 3,200 | Outdoor space, Home office, Parking, Lift, In-unit laundry, Concierge |
| F05 | Parkside Apartment | Upper East Side / Manhattan | Buy | Apartment | 975,000 | 1 | 1 | 780 | Lift, In-unit laundry, Concierge |
| F06 | The Easton Residence | Upper East Side / Manhattan | Buy | Condo | 2,350,000 | 3 | 2.5 | 1,950 | Home office, Parking, Lift, In-unit laundry, Concierge |
| F07 | Willow Garden Townhouse | Brooklyn Heights / Brooklyn | Buy | Townhouse | 3,950,000 | 4 | 3.5 | 3,100 | Outdoor space, Home office, In-unit laundry |
| F08 | Harbour View Condo | Brooklyn Heights / Brooklyn | Buy | Condo | 1,650,000 | 2 | 2 | 1,300 | Outdoor space, Parking, Lift, In-unit laundry, Concierge |
| F09 | The Courtyard House | Cobble Hill / Brooklyn | Buy | Townhouse | 2,850,000 | 3 | 2.5 | 2,400 | Outdoor space, Home office, In-unit laundry |
| F10 | Westhaven Penthouse | West Village / Manhattan | Buy | Penthouse | 4,900,000 | 3 | 3 | 2,650 | Outdoor space, Lift, In-unit laundry, Concierge |
| F11 | Franklin Studio | Tribeca / Manhattan | Rent | Apartment | 3,800 | 0 | 1 | 540 | Lift, In-unit laundry |
| F12 | Sullivan Loft | SoHo / Manhattan | Rent | Loft | 6,200 | 1 | 1.5 | 1,050 | Home office, Lift, In-unit laundry |
| F13 | The Lenox Apartment | Upper East Side / Manhattan | Rent | Apartment | 5,400 | 2 | 2 | 1,180 | Lift, In-unit laundry, Concierge |
| F14 | The Grove Apartment | Cobble Hill / Brooklyn | Rent | Apartment | 4,800 | 2 | 1 | 950 | Outdoor space, In-unit laundry |
| F15 | Bedford Terrace Home | West Village / Manhattan | Rent | Townhouse | 9,500 | 3 | 2.5 | 1,850 | Outdoor space, Home office, In-unit laundry |

### Property descriptions and highlights

**F01 — The Hudson Residence**

Headline: Room to gather. Space to step away.

Description: A generous living and dining area gives this three-bedroom home its centre, while a separate study makes room for focused work. Step onto the private balcony for a change of pace, then return to a layout that keeps everyday living and quieter rooms comfortably apart.

Highlights: Private balcony; separate study; open living and dining space; lift access and concierge.

**F02 — Canal House Loft**

Headline: Open space, with room for your own ideas.

Description: High ceilings and an open living area give this two-bedroom loft a sense of breathing room. There’s space for a dining table that stays set up, a dedicated study for working days and a kitchen that remains part of the conversation.

Highlights: High ceilings; dedicated study; open kitchen; in-unit laundry.

**F03 — Mercer Light Loft**

Headline: A bright backdrop for everyday living.

Description: Large windows and a wide living area make this loft feel open from the moment you enter. Two bedrooms sit away from the main gathering space, while a separate office gives work its own place without taking over the dining table.

Highlights: Large windows; separate office; two bathrooms; lift access.

**F04 — Spring Terrace Penthouse**

Headline: Take the evening outside.

Description: A private terrace extends the living space in this four-bedroom penthouse. Inside, a generous kitchen, dining area and separate study make the layout useful beyond entertaining. Three full bathrooms and a guest WC help busy mornings run more comfortably.

Highlights: Private terrace; separate study; parking; three full bathrooms and guest WC.

**F05 — Parkside Apartment**

Headline: A smaller home that makes good use of its space.

Description: This one-bedroom apartment keeps things simple with a separate bedroom, open living area and built-in storage. In-unit laundry, lift access and a concierge add practical details to a manageable footprint.

Highlights: Built-in storage; separate bedroom; in-unit laundry; concierge.

**F06 — The Easton Residence**

Headline: Space for busy mornings and quieter evenings.

Description: Three bedrooms, two full bathrooms and a guest WC give this home a flexible everyday layout. A separate study keeps work contained, while the main living area leaves room to bring everyone together. Parking and lift access complete the practical details.

Highlights: Separate study; parking; guest WC; concierge.

**F07 — Willow Garden Townhouse**

Headline: More room inside. Your own garden outside.

Description: This four-bedroom townhouse offers space across multiple levels, with a private rear garden for time outdoors. A dedicated study and separate dining room give different parts of the day their own setting. Stairs connect the floors, an important detail to consider when exploring the layout.

Highlights: Private garden; dedicated study; separate dining room; multi-level layout without a lift.

**F08 — Harbour View Condo**

Headline: A place to pause above the everyday.

Description: An open living area leads onto a private balcony in this two-bedroom condo. Two bathrooms provide separation when sharing the home, and in-unit laundry keeps a daily task close at hand. The building includes lift access, parking and concierge service.

Highlights: Private balcony; two bathrooms; parking; concierge.

**F09 — The Courtyard House**

Headline: A little outdoor space changes the day.

Description: A private courtyard gives this three-bedroom townhouse an outdoor room of its own. Inside, the kitchen and dining area sit together, with a separate study for calls or focused work. The home extends over multiple floors connected by stairs.

Highlights: Private courtyard; separate study; kitchen and dining space; in-unit laundry.

**F10 — Westhaven Penthouse**

Headline: Make room for a different view.

Description: A broad living area and private terrace give this three-bedroom penthouse two places to settle in. Each bedroom has access to its own bathroom, while lift access and concierge service support the day-to-day rhythm of the building.

Highlights: Private terrace; three bathrooms; generous living area; concierge.

**F11 — Franklin Studio**

Headline: Your own space, simply arranged.

Description: This studio brings living and sleeping into one open room, with built-in storage and a separate bathroom. Lift access and in-unit laundry add convenience without requiring a larger home. A useful starting point for a search focused on a compact layout.

Highlights: Studio layout; built-in storage; lift access; in-unit laundry.

**F12 — Sullivan Loft**

Headline: A rental with room to work and unwind.

Description: This one-bedroom loft pairs an open living area with a separate study. A full bathroom and guest WC help keep shared spaces practical, while in-unit laundry and lift access support everyday routines.

Highlights: Separate study; open living area; guest WC; in-unit laundry.

**F13 — The Lenox Apartment**

Headline: Two bedrooms. A little more flexibility.

Description: Two bedrooms and two bathrooms give this rental options for sharing, guests or a changing routine. The living and dining space brings the layout together, with in-unit laundry and concierge service adding useful everyday support.

Highlights: Two bathrooms; combined living and dining; lift access; concierge.

**F14 — The Grove Apartment**

Headline: Come home, open the door to the garden.

Description: This two-bedroom rental includes a private garden reached from the living area. The layout keeps the main rooms compact and connected, with in-unit laundry to simplify the week. Building access includes steps and no lift.

Highlights: Private garden; connected living area; in-unit laundry; stepped access without a lift.

**F15 — Bedford Terrace Home**

Headline: Settle into a home with space beyond the living room.

Description: Three bedrooms, a study and a private terrace give this townhouse rental room for several parts of daily life. An open kitchen and dining area keep the main floor connected, with additional rooms reached by stairs.

Highlights: Private terrace; separate study; kitchen and dining space; multi-level layout without a lift.

## 8. Individual property pages

Generate all 15 pages from one typed dataset and one shared template. Do not create inconsistent handwritten facts in multiple components.

Order:

1. Breadcrumb: Home → Properties → current property.
2. Hero: relevant image, sample label, For Sale / For Rent, property name, neighbourhood and borough. Thumbnail buttons switch the active image.
3. Overview: supplied headline, description, price, type, beds, baths and interior area. Display Studio rather than 0 beds. Rental prices always include `/month`.
4. Save and Share actions. Share copies the current URL with “Link copied” feedback; provide a visible fallback if copying fails.
5. Four property-specific highlights from the supplied copy.
6. Gallery: full-width imagery, thumbnails, previous/next controls and fullscreen viewer. Show the actual image count. If there is only one asset, do not manufacture a carousel.
7. Property details: Interior / Outdoor space / Building and access. Render known fields and explain half-baths as guest WCs. Do not add MLS IDs, taxes, lease terms, renovation years or floor plans without supplied data.
8. Optional video: only when a real file is assigned to this listing; label **Watch Property Walkthrough**. User-initiated play, controls, poster, no autoplay audio. Do not label a normal video a 360° tour.
9. Location: heading **Explore [Neighbourhood]**; text “This sample home is presented in [Neighbourhood], [Borough]. Browse other demonstration listings in the area.” Button to the relevant filter. No precise pin for a fictional home. A map may be added later using verified locations.
10. Image CTA: **Can you picture yourself here?** / “Choose a preferred date and tell us what you’d like to know about [Property Name].” / **Request a Viewing**.
11. Related properties: **A few more homes to consider.** Show up to three different records with the same sale/rent purpose. Rank same neighbourhood, then same type, then closest price; exclude the current record. Do not mix monthly rent and sale prices for recommendations.
12. Shared footer.

Desktop sidebar: sticky white enquiry card that stops before the footer. Heading **Take a closer look.** Body “Start a viewing request for [Property Name], or ask a question about the home.” Buttons **Request a Viewing** and **Ask About This Home**.

Both buttons route to `/contact?intent=viewing&property=[slug]` or `/contact?intent=property-question&property=[slug]` and anchor to the form. The contact page resolves the ID from the shared dataset and displays the selected property card. Do not put personal information into URLs. Mobile: a compact sticky bottom viewing button with price; allow safe-area padding and ensure it does not obscure page content or consent controls.

## 9. Saved homes page

H1: **Your shortlist, all in one place.**

Paragraph: Come back to the homes that caught your attention. Open a listing for another look or remove the ones that no longer fit.

Show saved property cards with the same shared data. Save only property IDs in local storage. Store no names, emails or messages. Hydrate saved state safely after loading to prevent mismatched server markup. If storage is unavailable, fall back to an in-memory shortlist and explain it lasts only for this visit.

Empty heading: **Something caught your eye? Save it here.**

Body: Tap the heart on any property to keep it in your shortlist on this browser.

Button: **Explore Properties**.

Populated CTA: **Want to discuss your shortlist?** / “Bring these homes into one enquiry and tell us what you like about them.” / **Discuss These Homes** → contact with comma-separated saved IDs, validated against the dataset.

Remove button accessible label: “Remove [Property Name] from saved homes.” Show a brief undo action. Do not require an account or imply cross-device syncing.

## 10. About page: final copy

Hero eyebrow: ABOUT FORMERA

H1: **Good property decisions start with being heard.**

Subheading: Your priorities deserve more attention than a list of available homes.

Split section heading: **The place matters. So does the process.**

Paragraph: A property search often begins with a simple change: you need more room, want to live somewhere different or are ready for a place of your own. The details that follow can feel less simple.

Paragraph: FORMERA’s approach starts with what you need from your next home. From there, clear listing details, a useful shortlist and a focused conversation help give the search direction.

Button: **Tell Us About Your Move** → `/contact`.

Section heading: **What you should expect along the way.**

Four cards:

- **Space to explain.** Share the priorities behind your search, including the details a price filter can’t capture.
- **Information you can use.** See the layout, features and practical facts together before deciding on a closer look.
- **A shortlist with purpose.** Keep the homes that match your needs and leave the rest behind.
- **A clear next step.** Know which property you’re enquiring about and what you want to ask before a viewing.

Role-card section heading: **Support for different kinds of moves.**

Use four architectural detail photographs or simple icons, not invented staff portraits or licence numbers:

- **Buying a home** — Bring your budget, location and must-haves into a more focused search. Button **Explore Homes to Buy** → sale filter.
- **Finding a rental** — Compare monthly prices, space and features before arranging a closer look. Button **Explore Rentals** → rent filter.
- **Planning to sell** — Start with a conversation about your property, your timing and what you want from the move. Button **Discuss Selling** → contact with sell intent.
- **Moving to a new area** — Explain the routines and priorities that will shape your search. Button **Share Your Plans** → contact with relocate intent.

Photo banner heading: **You don’t need every answer before you begin.**

Body: Start with the move you’re thinking about. The right questions can help make the next step clearer.

Button: **Start a Conversation** → `/contact`.

Show shared FAQ items 1, 2, 5 and 6, then the footer. Do not fabricate a founding history, team size, sales record, awards or testimonials.

## 11. Contact page and viewing-request demonstration

Hero H1: **Let’s talk about your next move.**

Subheading: A home you’ve saved, an area you like or a move you’re still considering. Start there.

Form heading: **What would you like help with?**

Intro: Tell us a little about your plans and the details that matter most.

Persistent form notice: **“Demo form: use sample details. Nothing you enter here is sent or saved.”**

Fields with persistent visible labels:

- Full name — required; placeholder “Alex Taylor”.
- Email address — required; placeholder “alex@example.com”.
- Phone number — optional; no real number prefilled.
- I’m looking to — Buy / Rent / Sell / Relocate / Request a viewing / Ask about a property.
- Selected property — prefilled summary if arriving from a listing; allow change through a property picker.
- Preferred neighbourhood — optional, six areas plus “I’m open to suggestions”.
- Budget range — optional; explicitly purchase budget or monthly rent depending on intent. Hide for selling.
- Planned timeframe — Exploring / Within 3 months / 3–6 months / Later.
- Preferred viewing date and time window — only for viewing intent. Future dates; Morning / Afternoon / Evening. Label times “New York local time — preference only”. No availability calendar or appointment confirmation claim.
- Your message — required for general questions, optional for a viewing request with selected property and date. Placeholder “Tell us what you’re looking for or what you’d like to know.”

Submit button: **Preview My Enquiry**; viewing intent uses **Preview Viewing Request**.

On valid submit, show an on-page summary containing the selected property, preferences and message. Heading **“Here’s how your enquiry would appear.”** Message **“This is a demonstration. No message has been sent and no viewing has been booked.”** Buttons **Edit Details** and **Explore More Properties**.

Validation messages: “Enter your name.” / “Enter a valid email address.” / “Choose what you need help with.” / “Choose a property for this viewing request.” / “Choose a future viewing date.” / “Tell us a little about your enquiry.”

Use only temporary in-memory form state. Do not submit to a backend, analytics, CRM or email provider. Do not log entered details. Prevent native form navigation from leaking values into query strings. Provide a reset action. Never use a fake “we’ll contact you shortly” success message.

Secondary visitor-to-client CTA, visually separated from the property form: **Like how this works?** / “WALKFLOW builds websites that help customers find what they need and take the next step.” / **Discuss Your Website** — render as a link only after WALKFLOW’s real contact URL is configured.

Future integration note for developer only: structure the form so a server endpoint can later validate, protect against spam and send an authorised enquiry to n8n, CRM or email. That integration is outside the initial demo scope. Do not expose keys or describe an unconnected workflow as live.

## 12. Guides page and four complete short articles

Index H1: **A clearer start to your next move.**

Intro: Practical ways to narrow your search, prepare for a viewing and keep track of the homes you like.

Each guide card links to its own article. Avoid invented authors, stale market claims and fabricated publication dates. Label these “FORMERA demo guide”.

### Guide 1 — Make a shortlist you’ll actually use

Slug: `make-a-useful-shortlist`

Excerpt: Separate the things you need from the things you’d enjoy having.

Article: Start with three lists: must-haves, preferences and deal-breakers. A minimum number of bedrooms may be essential. A larger kitchen may be a preference. A layout with several flights of stairs may rule a home out for you.

Set your main filters first, then save the listings that deserve a closer look. Read their descriptions as well as their photographs. A home can look right and still miss a detail that matters to your daily routine.

After comparing a few options, revisit your lists. You may find that one feature matters more than you expected. A useful shortlist helps you see those trade-offs clearly.

CTA: **Start Your Shortlist** → `/properties`.

### Guide 2 — Questions to take to a viewing

Slug: `questions-for-a-viewing`

Excerpt: Look beyond the first impression and picture an ordinary day in the space.

Article: Before a viewing, note what you want to understand about the layout. Where would you work? What needs storing? How would the rooms function when everyone is at home?

During the visit, pay attention to natural light, noise, access and the condition of the spaces you would use most. Ask which features are included and which details still need confirmation. Photographs can help you remember a room, but ask permission before taking them.

Finish by writing down the unanswered questions. A viewing is a chance to learn more, not a reason to rush a decision.

CTA: **Explore Homes to View** → `/properties`.

### Guide 3 — Find a neighbourhood that fits your routine

Slug: `find-your-neighbourhood`

Excerpt: Think about the places and journeys that shape your week.

Article: A neighbourhood search becomes more useful when you start with your routine. Consider the journeys you make, the services you use and the places where you like to spend time.

Visit areas at different times if you can. A street can feel different during the working day, in the evening or at the weekend. Check travel routes yourself instead of relying on a broad description of the area.

Keep notes alongside your property shortlist. The right room layout and the right location need to work together for you.

CTA: **Browse by Neighbourhood** → `/properties`.

### Guide 4 — Compare homes without losing the details

Slug: `compare-homes-clearly`

Excerpt: Use the same questions for each home so the differences are easier to see.

Article: Save the listings you want to compare, then review them against the same priorities. Start with your budget, the room layout, the usable space and any access requirements.

Notice which details are confirmed and which are missing. A longer feature list is not always more useful than a clear answer to the question that matters most to you. Ask about unknowns before treating them as benefits.

Finally, write one sentence about why each home remains on your list. If you struggle to explain it, it may be time to narrow the shortlist.

CTA: **Review Saved Homes** → `/saved`.

Article template: breadcrumb, title, excerpt, relevant photograph, the three paragraphs, CTA and two related guide links. Use the shared header/footer.

## 13. Shared FAQs — exact copy

**1. Can I browse both homes for sale and rentals?**
Yes. Choose Buy or Rent on the Properties page. Purchase prices and monthly rental prices are displayed separately so you can search with the right budget in mind.

**2. How do I narrow down the properties?**
Use the neighbourhood, property type, bedroom and feature filters. Choose Buy or Rent to add a price range. You can remove individual filters or clear them all at any time.

**3. Can I save properties without creating an account?**
Yes. Tap the heart on a listing to save it in this browser. Your shortlist is stored on your device and won’t automatically appear on another device or browser.

**4. How do I request a viewing?**
Open a property and select Request a Viewing. Its details will carry into the enquiry form. In this demo, you can preview the request, but nothing is sent and no appointment is booked.

**5. Are these properties actually available?**
No. FORMERA is a fictional website created to demonstrate WALKFLOW’s web design work. The homes, prices and property details are sample content, and photographs are illustrative.

**6. What if I haven’t found a suitable home?**
Try widening your search or use Tell Us What You Need to explore the enquiry form. You can enter sample preferences and see how a more detailed enquiry would be organised.

**7. Can I ask about more than one property?**
Yes. Save the homes you like, open Saved Homes and choose Discuss These Homes. Your selected properties will appear together in the demo enquiry.

**8. Can WALKFLOW build this for my real estate business?**
WALKFLOW can discuss a website built around your listings and enquiry process, with integrations scoped around the tools you use. Use the WALKFLOW contact link to start a separate conversation about your project.

Only render FAQ 8 when a working WALKFLOW contact link is supplied. On the Contact page show FAQs 4, 5 and 7. On Properties show 1, 2 and 3. Do not place all eight on every page.

## 14. Shared footer and utility copy

Use a rounded architectural photo panel, dark overlay and white FORMERA logo. Keep link text readable. Do not copy the reference’s template author credit into the newly built site; retain any actual third-party code or asset licence notices where required.

Heading: **Your next move starts with a closer look.**

Body: Explore the homes, keep a shortlist and find the details that matter to you.

Button: **Explore Properties** → `/properties`. This replaces the reference newsletter form because the demo has no email subscription service.

Footer links:

- Explore: Homes to Buy / Homes to Rent / Saved Homes.
- FORMERA: About / Guides / Contact.
- About this demo: Demo Information / WALKFLOW portfolio link if configured.

Disclosure: **“FORMERA is a fictional real estate brand created as a WALKFLOW portfolio demonstration. All listings, prices and property details are sample content. Images are illustrative. Demo enquiries are not sent and viewings cannot be booked.”**

Bottom line: **“FORMERA — Website concept by WALKFLOW.”** Use the actual WALKFLOW destination only when provided. Omit unconfigured social icons, real-estate membership marks and unused template links.

Demo Information page H1: **About this demonstration.**

Copy: FORMERA shows how property browsing, saved homes and enquiry forms can work together on a real estate website. It is a portfolio project by WALKFLOW, not an operating property agency.

Copy: Listings and prices are fictional. Photography is illustrative and does not verify a property’s location, condition or availability. Do not use these details to make a purchase or rental decision.

Copy: The property forms run as local previews. Your entries are not sent or saved by the form. Saved homes store property IDs in your browser, and you can remove them from the Saved Homes page. The website host may process technical request data under its own policies. The initial demo includes no added analytics or marketing trackers.

Copy: Any future connection to email, a CRM or booking tools will need a separate implementation and updated information about how enquiries are handled.

Button: **Back to Properties**.

404 H1: **This page isn’t here.**

Body: The link may have changed. Browse the sample properties or return to the homepage.

Buttons: **Explore Properties** / **Go Home**.

## 15. How pages interact

| Visitor action | Destination / result | Information carried forward |
|---|---|---|
| Submit homepage search | Properties | Purpose, neighbourhood and bedrooms in URL |
| Click property photo or title | Individual detail page | Slug; preserve the search return URL |
| Click save heart | Updates shortlist without navigating | Property ID only |
| Click a neighbourhood tile | Filtered Properties page | Matching neighbourhood |
| Click a priority card | Filtered Properties page or Contact | Matching requirement |
| Return from detail to results | Prior results view | Filters, sort and page restored |
| Click Request a Viewing | Contact form | Property slug and viewing intent |
| Click Ask About This Home | Contact form | Property slug and question intent |
| Click Discuss These Homes | Contact form | Validated saved IDs |
| Submit demo enquiry | Local enquiry preview | Form values in memory only |
| Edit preview | Return to same form | Current values retained in memory |
| Click related property | Its detail page | That property’s data |
| Click a guide card | Complete guide article | Guide slug |
| Click configured WALKFLOW CTA | WALKFLOW contact page | Optional non-personal source tag identifying FORMERA |

Use real anchor links for navigation and buttons for actions. A card’s save button must not sit inside its navigation link. Keep keyboard focus visible. Avoid whole-card overlays that swallow other controls.

## 16. Animation and interaction specification

The references are static screenshots; motion below is a proposed treatment, not an observed animation from those images.

| Element | Motion and timing | Limits |
|---|---|---|
| Hero text | Fade in with 12 px upward movement, 500 ms; 80 ms stagger between text groups | Run once; content visible if scripts fail |
| Section introduction | Subtle 12–16 px reveal over 400–500 ms when entering viewport | Run once, no repeated flashing while scrolling |
| Property image hover | Scale image to 1.025 over 220 ms; slightly deepen shadow | Clip inside card; no layout shifts; no tilt |
| Property CTA | Reveal “View Property” on hover and keyboard focus | Keep an obvious visible action on touch screens |
| Save button | Small 150 ms press response; update heart fill and accessible pressed state | Do not use colour alone to communicate state |
| Neighbourhood tile | Gentle image scale and overlay change, 250 ms | Title always visible |
| Filter results | Brief 120–180 ms fade when results change | No slow stagger across 15 cards; announce result count |
| FAQ | Smooth open/close around 200 ms | Real button with expanded state; content not clipped |
| Gallery | User-controlled 200 ms crossfade | No automatic slide rotation; keyboard arrows and labelled controls |
| Header | Short 180 ms background/text transition after leaving hero | No sudden size or position changes |
| Mobile menu / filter sheet | 180–220 ms fade and small movement | Escape, close button, focus trapping and return focus |

Respect reduced-motion preferences: remove transforms, smooth scrolling and animated transitions, while retaining all functionality. No scroll hijacking, custom cursor, endlessly moving logos, fake counters or autoplay audio. Keep browsing fast and predictable.

Lightbox requirements: close button, Escape, arrow controls, image count, focus management and no background scrolling. Mobile supports swipe plus buttons; swipe must not be the only way to navigate. Use supplied image captions where present.

## 17. Responsive behaviour and image delivery

- Desktop cards: three columns. Tablet: two. Mobile: one.
- About and Contact split layouts stack with a logical reading order.
- Photo hero has a sensible minimum height, not a forced full-screen height on every device.
- Headings wrap without clipping or awkward one-word fragments. Do not shrink them excessively just to retain desktop line breaks.
- Touch targets approximately 44 px or larger. Do not depend on hover.
- Use consistent 4:3 property card crops with per-image focal positions; full image remains available in detail gallery.
- Prioritise only the main hero image. Lazy-load below-fold images and galleries. Use responsive sizes and modern formats where supported, retaining originals.
- Reserve image dimensions to prevent content jumping. Avoid loading every full-resolution gallery image on the listing page.
- Load video metadata or posters initially, not full videos. Hide a video block with no actual source.
- If local fonts or media are absent, report the missing file and use a stable fallback. Do not display broken images.

## 18. Editing structure, verification and handover

Keep property records, guides, shared FAQs, navigation and WALKFLOW links in clearly named editable data/config files. Each property needs ID, slug, name, purpose, availability, type, neighbourhood, borough, numeric price, currency, rental period if applicable, beds, baths, interior area, amenities, headline, description, highlights, featured rank, cover, gallery and optional video. Do not expose file-management instructions in visitor-facing copy.

Start by producing a short reference-to-section implementation plan and an asset inventory, then implement the complete brief without stopping after only the homepage. Reuse existing project conventions where available. The finished deliverable is the local website, not just a plan.

Verify the meaningful behaviour:

1. Exactly 15 unique property IDs and detail routes; 10 sales and 5 rentals; all facts match between cards and details.
2. Unfiltered pagination shows 9 then 6; neighbourhood counts are Tribeca 3, SoHo 3, Upper East Side 3, Brooklyn Heights 2, Cobble Hill 2, West Village 2.
3. Rent + SoHo + Home office returns Sullivan Loft. Buy + Upper East Side + maximum $1m returns Parkside Apartment. Studio returns Franklin Studio.
4. An impossible filter combination shows the empty state; Clear All restores all records. Price controls never compare rent against purchase price.
5. Refresh, deep links and browser Back preserve listing filter state. Invalid slugs return 404.
6. Save/unsave works across listing, detail and Saved Homes pages; refresh retains the shortlist where storage is permitted.
7. Viewing and shortlist enquiries carry the correct property records into the form. Validation works and form submission makes no external request or fake booking.
8. Every internal link, gallery control, FAQ and mobile menu works with keyboard and touch. Missing optional media is handled cleanly.
9. Check 375, 390, 768 and 1440 px widths for overflow, overlapping text and sticky controls covering content. Check reduced motion.
10. Run the project’s production build and relevant lint/type checks. Inspect screenshots of the homepage, listing and detail pages against references. Fix concrete issues before handover.

SEO setup: unique page titles such as “The Hudson Residence | FORMERA Demo”, useful descriptions and meaningful headings. Mark this fictional demonstration `noindex` by default; do not generate real-estate offer, rating or licensed-business schema for fictional records. Keep technical instructions out of the visible copy.

Handover: explain how to run the local preview, where to edit properties and replace media, which features work, and which integrations remain unconnected. Identify any missing images or WALKFLOW destination links. Do not claim the website has been deployed unless deployment was separately requested and verified.
