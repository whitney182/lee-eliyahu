# Design Notes — leeeliyahu.com redesign mockups

Six standalone HTML files, three aesthetic directions, one content skeleton so the client can A/B on vibe not copy. Open each file directly in a browser — no build step, no server needed.

```
mockups/
├─ homepage-light.html   ·  editorial luxury, bone + gold
├─ homepage-dark.html    ·  cinematic, obsidian + gold, filmic grain
├─ homepage-wild.html    ·  brutalist, ivory + ink + red
├─ service-light.html    ·  Active Listings, matches homepage-light
├─ service-dark.html     ·  Active Listings, matches homepage-dark
└─ service-wild.html     ·  Active Listings, matches homepage-wild
```

All six are fully self-contained: fonts from Google, icons from Lucide (via CDN), everything else inline. No frameworks, no build.

---

## The three directions

### 1 · Light — *Editorial luxury*
Sotheby's / WSJ Mansion / Blackbird Spyplane. Bone-colored background with warm gold accents. Serif headlines (Fraunces, fluid 144 optical size) with italic accent words. Lots of air, big numbers, sharp hairlines. This is the "refined broker" direction — for clients who already know what a good apartment costs.

**Font pair:** Plus Jakarta Sans (body/UI) + **Fraunces** (display). Fraunces has an optical-size axis that gets narrower and more pronounced at display size, which is what gives the headlines their magazine quality. Italic weight is set to 300 so accent words feel like handwritten annotations.

**Palette:** `--bone:#F6F1E7` / `--ink:#1A1916` / `--gold:#A88657`. Warm, slightly desaturated. Gold stays earthy instead of metallic — this is not a Trump-branded building.

**Signature moves:**
- Display numerals set in Fraunces italic (e.g. `$420M` → the 420 is gold italic)
- Numbered section headers (01 — Services, 02 — About, 03 — Testimony)
- Pill CTAs with ink-fill on hover
- Stats band in full black with gold accent digits
- Testimonials in paper cards that lift on hover

### 2 · Dark — *Cinematic architecture firm*
Herzog & de Meuron meets Blackstone. Obsidian background with a barely-visible radial gold glow in the hero, an SVG-based filmic grain overlay at 6% opacity across the whole page, and squared-off (not pill) buttons. This is "private capital / discreet money" direction — for the off-market investor and the buyer who doesn't want their purchase in the MLS.

**Font pair:** Plus Jakarta Sans + **Instrument Serif**. Instrument Serif is a single-weight display serif with extreme contrast in the strokes — looks like Bodoni got a haircut. It's free, it's on Google Fonts, and it's what gives the hero its "publication of record" feel.

**Palette:** `--black:#0B0A08` / `--ivory:#EFEADB` / `--gold:#D4A94A`. Black has a warm bias (not slate), ivory has a cream bias (not clinical white), gold is properly metallic.

**Signature moves:**
- "Index — 001 / Home" meta line in the hero, like a page from an art book
- All borders are `rgba(239,234,219,0.09)` (ultra-faint ivory), not gray
- Service cards sit inside a strict grid with hairline dividers and a gold underline that sweeps in on hover
- Stats set in 180px italic numerals, no gradient, just color
- Filmic grain makes a solid black background feel like projected film, not an Apple product page

### 3 · Wild — *Brutalist swing*
Off-brand on purpose. Thick 2px ink borders, hard-offset shadows on hover (translate + box-shadow, no blur), a running top ticker, a rotated red "shout" badge pinned to the hero, and bold uppercase display type. This is the direction that gets remembered — whether or not the client wants to be remembered this way.

**Font pair:** Plus Jakarta Sans + **Bricolage Grotesque**. Bricolage is a variable grotesque with a wide optical-size axis (12→96). At 240px it tightens up into something between Ranchero and a Swiss poster; at 32px it's just a clean modern sans. One font, two jobs.

**Palette:** `--ivory:#EFE7D4` / `--ink:#0D0C0A` / `--red:#E5432A` / supporting `--gold:#C59A3D` and `--blue:#2E4CEF`. The red is the emergency. The blue is held in reserve (only used on the homepage shout badge accent).

**Signature moves:**
- Service cards in tricolor (ivory / ink / red) with push-and-shadow hover
- Running ticker at the very top with the stats and cities — feels like a trading screen or an election night lower-third
- "Shout badge" rotated 3–4° and anchored to the top-right of the hero
- Hatched diagonal pattern inside the video frame until the video loads
- Every form field has a red shadow on focus (`box-shadow: 3px 3px 0 var(--red)` + translate)

---

## Shared content across all six

All homepages carry the same content skeleton — the client can compare vibe without comparing copy. Same applies to all three service pages.

**Homepage sections (same in all 3 versions):**
1. Nav (Home / About / Real Estate dropdown / Financial / Contact + CTA)
2. Hero with headline, subhead, dual CTA
3. Three service cards (Residential Sales / Commercial Leasing / Investment Sales)
4. About Lee (bio + facts grid + licensing info)
5. Stats strip ($420M / 1,200+ / 5 of 5 boroughs)
6. Two testimonials (Maya R., West Village buyer; David K., Soho retail tenant)
7. **Video section — preserved** (see "Video" below)
8. Contact form (Name, Email, Phone, Interest, Message)
9. Footer (4 columns + social)

**Service page sections (same in all 3 versions):**
1. Same nav
2. Hero: page title "Active Listings" + inventory meta
3. Filter bar (All / Manhattan / Brooklyn / Queens / Bronx / Staten Island) + count
4. Grid of 6 listing cards (image, price, address, bed/bath/sqft or commercial specs, View Listing)
5. Off-market CTA row
6. Inline lead capture (Name / Email / Phone / Interested in / Note) + contact info
7. Same footer

Content varies where the vibe requires it (hero wording, CTA copy, ticker copy on wild) but facts, neighborhoods, stats, and testimonials are identical so the comparison is fair.

---

## Video preservation — non-negotiable

Per the audit, the existing hero background video at `https://leeeliyahu.com/wp-content/uploads/2026/02/7.mp4` (WP attachment ID 1682) must be preserved.

In each mockup the video section is a **styled labeled placeholder** — a framed block with a "Video Section — Preserved from Existing Site" badge, a play affordance, and copy that explicitly references the filename. Drop the existing `<video autoplay muted loop playsinline>` tag into this container when wiring up the real site and it slots in untouched.

In Elementor, this becomes either:
- The existing Section with `background_background: "video"` reused verbatim, OR
- An HTML/Video widget inside a standard container, using the same attachment URL

---

## Elementor reproducibility

The client flagged mid-build that the redesign should be reproducible in Elementor. All three directions are achievable with Elementor Pro + a small amount of custom CSS. Notes by concern:

### What maps cleanly to native Elementor controls
- **Layout:** every layout in all six files is flex or CSS Grid — both natively supported in Elementor containers (Container widget, not the legacy Section). Recommend using the Container + Flexbox layout and disabling the old Section/Column system for these pages.
- **Typography:** Plus Jakarta Sans + the paired serif load from Google. Set them in **Site Settings → Typography** as Primary Font (Plus Jakarta Sans) and Secondary Font (Fraunces / Instrument Serif / Bricolage Grotesque depending on version). Elementor Pro lets you set font-variation-settings via custom CSS if you want to use the optical-size axis on Fraunces or Bricolage — documented below.
- **Colors:** the 4–6 custom colors per version go into **Site Settings → Global Colors** so the client can tweak without touching CSS. Reuse the existing "Kit Styles: Realia" kit (ID 1032) to keep the infra, just overwrite values.
- **Buttons:** Elementor button widget handles pill radius (light), zero-radius (dark), and hard-shadow brutalist (wild). The push-and-shadow hover on wild needs a custom CSS block on the button — 3 lines, documented below.
- **Nav:** Nav Menu widget pointed at a single consolidated WP menu (see `nav-structure.md` for the recommended IA — collapse the three existing menus into one).
- **Forms:** the existing Metform plugin handles the contact/lead forms in all three versions. Field styling per version is 100% custom CSS on the form widget.
- **Stats/Cards/Testimonials:** stock Elementor widgets (Icon Box, Testimonial, Counter) or custom HTML widgets. The numbered section headers and index lines are just Heading widgets with Advanced → Attributes, no custom widgets needed.

### What needs a small custom CSS block per version
All three directions have 10–40 lines of custom CSS that make them feel specific. Keep them in **Site Settings → Custom CSS** or on the individual widget's Advanced → Custom CSS tab.

**Light version — custom CSS needed:**
```css
/* Fraunces optical size for display */
.display, .h2, .h3 { font-variation-settings: "opsz" 144; }
/* Italic accent color */
.display em, .h2 em { font-style: italic; color: var(--gold); font-weight: 300; }
/* Services grid hairlines */
.services-grid > :not(:last-child) { border-right: 1px solid var(--rule); }
```

**Dark version — custom CSS needed:**
```css
/* Filmic grain overlay */
body::before {
  content:""; position:fixed; inset:0; pointer-events:none; z-index:1;
  opacity:0.06; mix-blend-mode:overlay;
  background-image: url("data:image/svg+xml;utf8,...");
}
/* Radial gold glow in hero */
.hero::before { background: radial-gradient(ellipse 70% 60% at 80% 15%, rgba(212,169,74,0.08), transparent 70%); }
/* Gold underline sweep on service hover */
.service::after { ... transform: scaleX(0); transition: transform .6s; }
.service:hover::after { transform: scaleX(1); }
```
*The grain is the one thing Elementor can't do natively. Two options:*
1. Paste the SVG data URI as a background-image on the body (works fine, adds ~2KB to every page).
2. Save the grain as a 200×200 transparent PNG, upload to Media Library, set as body background with `repeat` + `mix-blend-mode: overlay`.

**Wild version — custom CSS needed:**
```css
/* Brutalist push-and-shadow hover */
.elementor-button:hover, .card:hover { transform: translate(-3px,-3px); box-shadow: 6px 6px 0 var(--ink); }
/* Bricolage optical size */
.display { font-variation-settings: "opsz" 96; }
/* Hatched video frame */
.video-frame { background: repeating-linear-gradient(45deg, var(--ink) 0 2px, transparent 2px 18px) var(--ivory-deep); }
/* Ticker animation */
@keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.ticker-track { animation: ticker 40s linear infinite; }
```
*The ticker needs an HTML widget with the keyframe and two copies of the content stacked. Elementor does have a "Blockquote Slider" but it animates the wrong way — custom is simpler.*

### What to avoid porting directly
- **The `-webkit-text-stroke` outline on the wild hero** works but doesn't print well and has slightly different rendering across browsers. Fine for web, not a real risk, just know it's there.
- **The `color-mix(in oklab, ...)` calls** in the light/dark versions need Chrome 111+ / Safari 16.4+ / Firefox 113+. If the client reports IE-era devices, swap for static hex values. Modern browsers are fine — this is 2026.
- **Sticky filter bar with `top:76px`** (matches nav height). If Elementor's header template changes height on scroll, the sticky math breaks. Set the nav to fixed-height or pass the nav height into a CSS variable.
- **IntersectionObserver reveal animations** — rewrite these as Elementor Motion Effects (Entrance Animation → Fade In Up with Delay). Same visual result without shipping custom JS.

### Content reuse with Elementor templates
Biggest Elementor-specific win is **Template-izing** the nav, footer, and the lead-capture form. Build each once as a Global Widget or an `elementor_library` template (the existing ID 57 header / ID 67 footer structure already uses this pattern). Then every page stays consistent and nav edits propagate automatically.

---

## What was fixed in these mockups that was broken on the live site

Cross-referenced with `redesign-notes.md`:

- **"Residential Sales" card link** — wired up in all six files (points to the service page).
- **"Home" menu item** — points to the actual homepage, not the legacy `/home/`.
- **Menu nesting** — the Antennas / Affiliate drag-and-drop accident is flattened into a cleaner IA (see nav structure in `nav-structure.md`).
- **"Our Services " trailing space** — fixed.
- **"we provide protect and grow"** grammar — rewritten as proper service copy.
- **"We also connects clients"** — rewritten.
- **Email address** — using `lee@leeeliyahu.com` (matching the surname and domain). The existing `leliyahu@signaturepremier.com` has a likely typo — should be confirmed with the client before launch.
- **Button hover === button base** (gold on gold with no feedback) — every button has a real hover state in all three versions.
- **Missing meta description** — every mockup has one.
- **Empty `<title>`** — every mockup has a proper title with positioning.
- **Duplicate service cards pointing to wrong destinations** — all three cards have real destinations.

Not fixed here (needs client decisions):
- `/financial/` and `/affiliate/` empty parent pages
- `/merchant-services/` vs `/merchant-processing/` duplicate
- Creativemox placeholder imagery on legacy subpages (listings, services, about-us)
- `/privacy-policy/` and `/terms-of-use/` empty pages

---

## Recommendation

If you're asking for a lean: **Dark**. It's the one that looks the least like "a broker website" and the most like the kind of firm that handles a $14M retail condo. Light is a close second for the residential side. Wild is real and well-executed but probably off-brand for a 10-year broker with an institutional book — keep it in the drawer for a landing page on a specific campaign, not the whole site.

Happy to iterate on whichever direction lands. Next step once you pick: a second service-page variant (Residential Sold, or Commercial Leasing) in the chosen direction, plus a About/Bio page and Contact page.
