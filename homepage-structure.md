# Homepage Structure — leeeliyahu.com

**WordPress page ID:** 1754
**Slug:** `elementor-1754`
**Title:** "Home new"
**Public URL:** https://leeeliyahu.com/ (set as front page via Settings > Reading)
**Status:** publish
**Last modified:** see `site-audit.json`
**Featured image:** none
**Template:** default (Elementor full-width via Hello Elementor theme)

> Note: there is also an older page at `/home/` (ID 13, slug `home`) that still exists as published. It is NOT the live homepage. The live homepage is ID 1754.

---

## Page-level settings

```
hide_title: yes
background_background: classic
background_color: #000000
background_image: https://leeeliyahu.com/wp-content/uploads/2026/04/4.png  (id 1796)
```

This full-page background image sits behind every section except where a section declares its own background (sections 0 and 1 do).

---

## Section-by-section map

The homepage has 6 top-level Elementor containers (sections).

### Section 0 — HERO (VIDEO BACKGROUND) ⭐ PRESERVE

This is the section the client flagged as "the entire hero image is a video, it's literally playing."

| Setting | Value |
|---|---|
| elType | container |
| flex_direction | column |
| flex_justify_content | center |
| content_width | full |
| min_height (desktop) | 100vh |
| min_height (mobile) | 75vh |
| background_background | **video** |
| **background_video_link** | **https://leeeliyahu.com/wp-content/uploads/2026/02/7.mp4** |
| background_overlay_background | classic |
| background_overlay_color | #000000 |

**Children:**
- **0.0 — Heading widget** (only child of the hero)
  - Text: `All Real Estate & <br>Financial Services` (line break after "Estate &")
  - Font family: `Archivo Black`
  - Font size desktop: 77px
  - Font size mobile: 32px
  - Color: `#F2CA50` (yellow/gold)
  - Align: center
  - Padding-top: `0100` (looks like a typo in Elementor — behaves as 100px)

**Redesign instruction from client:** the video file (`/wp-content/uploads/2026/02/7.mp4`) must be preserved exactly as-is — same source URL, autoplay loop muted background video covering the whole hero. Keep the 1vh-100vh fill behaviour.

---

### Section 1 — 3-up service cards (linked image tiles)

Full-width row, padding `64px top / 64px bottom` (32px + side inset on mobile). Three child containers side by side, each 480px tall with a background image, a single centered heading in a semi-transparent black "chip", and a clickable card link.

| Card | Background image | Link | Heading |
|---|---|---|---|
| 1.0 | `/wp-content/uploads/2026/04/Untitled-design.png` (id 1780) | **(empty URL)** | Residential Sales |
| 1.1 | `/wp-content/uploads/2026/04/Untitled-design-2.png` (id 1925) | `/commercial/` | Commercial Leasing |
| 1.2 | `/wp-content/uploads/2026/04/Untitled-design-1-1.png` (id 1782) | `/hard-money-for-real-estate/` | Investment Sales |

Each heading:
- Archivo Black (inherited) / 34px
- Color: white (card 1 uses the global `text` color which is `#FFFFFF`)
- Wrapped in CSS class `.mark` with inline custom CSS:
  ```css
  .mark { background-color: rgba(0, 0, 0, 0.50); color: black; }
  ```
  (Note: the `color: black` rule is overridden by the per-heading `title_color` `#FFFFFF`.)
- Element custom width: 380px, self-align center

Card 1.0 uses custom class `border-remove` with inline CSS `border: none !important;`.

**Broken:** card 1.0 ("Residential Sales") has `link.url` set to empty string. It's clickable but goes nowhere. See `redesign-notes.md`.

---

### Section 2 — "Our Company / Our Services / Our Partners" (3-col feature row)

Full-width container, padding 32/0/32/0. Three child containers side by side. Each contains heading + circular image + paragraph.

**2.0 Our Company**
- Heading: `Our Company` — Archivo Black, 36px, white
- Image: `/wp-content/uploads/2025/10/Group-11.png` (id 1999)
- Text: "Lee Eliyahu brings over a decade of experience across financial services, banking, and real estate, specializing in the buying, selling, and leasing of residential and commercial properties."

**2.1 Our Services**  *(trailing space in the heading string)*
- Heading: `Our Services ` — Archivo Black, 36px, white
- Image: `/wp-content/uploads/2026/04/Ellipse-4.png` (id 1935)
- Text: "We've built and manage strong relationships with leading industry experts and are honored to share these trusted connections with our clients. By leveraging our network, we provide protect and grow your business."
  - ⚠️ Grammar: "we provide protect and grow your business" is broken.

**2.2 Our Partners**
- Heading: `Our Partners` — Archivo Black, 36px, white
- Image: `/wp-content/uploads/2026/04/Ellipse-4-1.png` (id 1936)
- Text: "We also connects clients to trusted partners in property management, contracting, development, merchandising, insurance and payment processing, ensuring every deal is executed efficiently while maximizing outcomes for each client's unique situation."
  - ⚠️ Grammar: "We also connects" (should be "connects" → "connect" or "We also connect").

All three images are likely placeholder circles from a theme kit (ellipse PNGs).

---

### Section 3 — "LET'S CONNECT" CTA split

Horizontal row, 2 columns.

**3.0 (left column)**
- Heading: `LET'S CONNECT` — Archivo Black, white (no explicit size, inherits)
- Icon list widget:
  - Phone icon + `+15165678715`
  - Mail icon + `leliyahu@signaturepremier.com`  *(note: single `l` at the start — `leliyahu` not `leeeliyahu`)*
  - Icon color: `#F2CA50` (gold) / text white / 20px
- Button "CALL" — Archivo Black 22px, white text on `#F2CA50` background, padding 20/130/20/130, `.call-me-button` class, `tel:+15165678715`
- Button "Submit An Inquiry" — Archivo Black 22px, white text on `#FF0000` background, padding `20/130/020/130` *(typo "020" but harmless)*, link `/contact-us/`

**3.1 (right column)**
- Image widget: `/wp-content/uploads/2026/04/Untitled-design-1.png` (id 1764) — likely a portrait/lifestyle photo.

---

### Section 4 — "WHERE WE'VE TRANSACTED" heading only

- Container, flex column
- Single heading widget: `WHERE WE'VE TRANSACTED` — Archivo Black, 36px, white, center

Acts as a title row for the map below.

---

### Section 5 — Google Map embed (iframe)

- Container, CSS class `listing-map`, zero padding, zero margin
- Single HTML widget:
  ```html
  <iframe src="https://www.google.com/maps/d/embed?mid=1PMThBZZDPJSOS8R2LFyQYhSDOSe1A94&ehbc=2E312F&noprof=1" width="640" height="480"></iframe>
  ```
- Widget margin: top `-60px` (overlaps the heading above)
- Widget padding: top `-23px` (invalid CSS — padding cannot be negative; ignored by browser)

This is a Google My Maps custom map, not a Google Maps Place map. It shows transaction locations plotted by the owner.

---

## Summary of everything on the homepage

### Images referenced (in order)
1. Full-page bg: `2026/04/4.png` (id 1796) — overall dark background
2. Card 1 bg: `2026/04/Untitled-design.png` (id 1780)
3. Card 2 bg: `2026/04/Untitled-design-2.png` (id 1925)
4. Card 3 bg: `2026/04/Untitled-design-1-1.png` (id 1782)
5. "Our Company" circle: `2025/10/Group-11.png` (id 1999)
6. "Our Services" circle: `2026/04/Ellipse-4.png` (id 1935)
7. "Our Partners" circle: `2026/04/Ellipse-4-1.png` (id 1936)
8. CTA column image: `2026/04/Untitled-design-1.png` (id 1764)

### The video
- **File:** https://leeeliyahu.com/wp-content/uploads/2026/02/7.mp4
- **Attachment id:** 1682 (same file is referenced on older home page ID 13 and on `/merchant-processing/`)
- **Usage on homepage:** section 0 `background_video_link` (native Elementor background video, auto-plays muted looped)
- **Redesign requirement:** keep this exact URL and keep autoplay-muted-loop behaviour.

### All copy (verbatim)
1. `All Real Estate & Financial Services` (with `<br>` after "Estate &")
2. `Residential Sales`
3. `Commercial Leasing`
4. `Investment Sales`
5. `Our Company` / "Lee Eliyahu brings over a decade of experience across financial services, banking, and real estate, specializing in the buying, selling, and leasing of residential and commercial properties."
6. `Our Services` / "We've built and manage strong relationships with leading industry experts and are honored to share these trusted connections with our clients. By leveraging our network, we provide protect and grow your business."
7. `Our Partners` / "We also connects clients to trusted partners in property management, contracting, development, merchandising, insurance and payment processing, ensuring every deal is executed efficiently while maximizing outcomes for each client's unique situation."
8. `LET'S CONNECT`
9. `+15165678715`
10. `leliyahu@signaturepremier.com`
11. Button text: `CALL`, `Submit An Inquiry`
12. `WHERE WE'VE TRANSACTED`

### Fonts referenced directly in homepage widgets
- Archivo Black (primary display font for all headings, buttons) — loaded via `fonts.googleapis.com/css?family=Archivo+Black`
- Inter and Mulish come in via the global kit (see `global-styles.md`) but are not explicitly set on any homepage widget.

### Colors referenced directly in homepage widgets
- `#F2CA50` — gold (hero heading, icons, CALL button background)
- `#FFFFFF` — white (section 2/3/4 headings, body copy, button text)
- `#FF0000` — red (Submit An Inquiry button background)
- `#000000` — black (page background, hero overlay, `.mark` 50% overlay)
- `rgba(0,0,0,0.50)` — 50% black overlay on the `.mark` chips

### Header / Footer
The homepage inherits header and footer from Elementor templates:
- Header template: elementor_library ID 57 "Realia - Header"
- Footer template: elementor_library ID 67 "Realia - Footer"
- Delivered via the Header Footer Elementor plugin (`ehf-header ehf-footer` body classes present).
