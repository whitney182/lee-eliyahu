# Redesign Notes — Problems & Flags

Findings from the read-only audit that will need a call before or during the redesign. Grouped by severity.

---

## 🚨 Must preserve (client-specified)

1. **Hero background video on the homepage.** File: `https://leeeliyahu.com/wp-content/uploads/2026/02/7.mp4` (attachment id 1682). Sits on Elementor section 0 of page ID 1754 with `background_background: "video"`. Must keep the same file, autoplay, muted, loop, and the full-viewport hero framing. Client emphasized this.

---

## 🔴 Broken / dead

1. **"Residential Sales" card on the homepage links nowhere.** Section 1.0 has `link.url: ""`. The other two cards (Commercial Leasing → `/commercial/`, Investment Sales → `/hard-money-for-real-estate/`) work. Need a destination.

2. **Mobile menu "Home" points to `/home/` (old page ID 13), not the real front page at `/`.** The old page is still published. Either redirect /home/ → / or repoint the menu item.

3. **Mobile menu has a broken nesting.** "Affiliate", "Billboards", "Security and Surveillance" are nested UNDER "Antennas" instead of next to it. Almost certainly a drag-and-drop mishap.

4. **Empty pages that still appear in the nav:**
   - `/financial/` (ID 335) — **0 Elementor sections**, but IS the parent link in Main2 menu.
   - `/affiliate/` (ID 337) — **0 Elementor sections**, also a parent link.
   - `/payment-processing/` (ID 500) — 0 sections, not in nav but still published.
   - `/map/` (ID 1000) — 0 sections.
   - `/privacy-policy/` (ID 424) and `/terms-of-use/` (ID 422) — 0 sections, no footer links confirmed.
   - `/commercial-leasing/` (ID 1166) — 0 sections, but linked from Main2.

5. **Duplicate / overlapping pages:**
   - `/merchant-services/` (ID 255) vs `/merchant-processing/` (ID 351) — different slugs, likely overlapping content. Pick one.
   - The old `/home/` (ID 13) and the live front page `/elementor-1754/` (ID 1754). Old `/home/` is still accessible and still has a video hero of its own.
   - Homepage "Commercial Leasing" card (section 1.1) links to `/commercial/`, not `/commercial-leasing/` — the label doesn't match the destination.

6. **Invalid CSS in the map widget.** Section 5.0 on the homepage has `padding-top: -23px`. Padding cannot be negative; browser ignores it. Probably meant to be negative margin (which it also has: `margin-top: -60px`).

7. **Typo in hero heading padding:** `_padding.top: "0100"` instead of `100`. Elementor appears to parse it as 100 but worth fixing.

---

## 🟡 Copy problems

1. **"Our Services" heading has a trailing space** (`"Our Services "`). Minor but sloppy.
2. **Broken grammar, section 2.1 body:** "we provide protect and grow your business" — should read "we help protect and grow your business" (or similar).
3. **Broken grammar, section 2.2 body:** "We also connects clients..." — should be "We also connect clients..."
4. **Contact email on homepage:** `leliyahu@signaturepremier.com` (single `l` at the start). Domain is fine; confirm this is the real address — the owner's surname and the site domain both use "Eliyahu" (no leading `l` repeat). Might be wrong.
5. **No meta description on the homepage.** `<meta name="description">` is absent. SEO gap.
6. **Homepage `<title>` is just "leeeliyahu.com".** No positioning copy or keyword.
7. **Site tagline is empty** (WordPress `description` setting is blank).

---

## 🟡 Placeholder / stock imagery still present

Several pages still reference the original Realia template-kit placeholder images. These are pointed at third-party CDN URLs (`theme.creativemox.com/realia/...`) that can disappear without notice and signal "unchanged demo site" to visitors:

| Page | Hits | Notes |
|---|---|---|
| `/listings/` (ID 128) | 15 creativemox / 15 realia | Heavy use of theme-kit demo content |
| `/home/` (ID 13) | 1 / 1 | Old homepage, still published |
| `/services/` (ID 91) | 1 / 1 | |
| `/about-us/` (ID 76) | 1 / 1 | |
| `/merchant-processing/` (ID 351) | 1 / 1 | |

Homepage itself (1754) is clean of Creativemox references — all its images are locally uploaded to `wp-content/uploads/2025/*` or `2026/*`. But the "Ellipse-4" circle images used for Our Services / Our Partners look like generic theme-kit shapes; confirm with the client whether those are intentional brand marks or placeholders.

Also:
- The site logo and the "Our Company" circle on the homepage are the **same file** (`Group-11.png`, id 1999). A logo being reused as a hero portrait is unusual — confirm that's intentional.

---

## 🟡 Design system inconsistencies

Read `global-styles.md` for full detail. Highlights:

1. **Three display fonts** on one page: Archivo Black (homepage headings), Mulish (kit headings), Inter (body). Archivo Black is not declared anywhere in the kit typography — it only appears inline on widgets.
2. **Two coexisting color systems:** the real brand (gold `#F2CA50`, black, white, red `#FF0000`) and the original Realia greens (`#77BFA3`, `#5E9779`, `#3F6450`, mint `#E1ECE7`) which still govern h6 color, link hover, form focus, and default button gradients.
3. **Elementor color role names are wrong.** `text` = white, `Dark Background` = gold, `Line Color` = green. Anyone editing in Elementor will assign values that do the opposite of what the label suggests.
4. **Button hover == button base** (`#F2CA50` both), so the CALL button has no hover feedback.
5. **Kit `custom_css` is empty**, but there are two inline widget CSS blocks on the homepage: `.mark` (semi-transparent chip background with a `color: black` that gets overridden anyway) and `.border-remove` (belt-and-suspenders border reset). Both disposable.
6. **Excess Google Font weights.** Archivo Black is loaded with every weight 100–900, but the font family only ships a single weight. Bloat, not a bug.

---

## 🟡 Elementor widgets that need special handling during a restructure

1. **Google My Maps iframe** (homepage section 5.0, HTML widget). It's a raw `<iframe>` with a hand-tuned negative top-margin of -60px that overlaps the "Where We've Transacted" heading above it. If the redesign changes the spacing of section 4, the overlap will break. Plan to rebuild this section with proper layout rather than porting the negative margin.

2. **Elementor background-video sections.** Appear on these pages:
   - Homepage (ID 1754) — local MP4 `7.mp4`
   - Commercial (ID 245) — YouTube `youtu.be/7IAvgtjd48w`
   - Residential Sold (ID 235) — YouTube `youtu.be/4jnzf1yj48M`
   - Property Management (ID 1277) — YouTube `youtu.be/l6EzZafb1Pk`
   - Commercial Active Listing (ID 1265) + Active Listings (ID 726) — YouTube `youtu.be/mJVuZiK9a6I`
   - Merchant Processing (ID 351), About Us (ID 76), Services (ID 91), old Home (ID 13) — same local `7.mp4` or legacy YouTube

   If the redesign moves off Elementor, each of these needs an equivalent autoplay-muted-loop wrapper. The native `<video>` tag treatment on the local MP4 is straightforward; YouTube background videos require either the YouTube embed with `autoplay=1&mute=1&loop=1&playlist=<id>` or a downloaded MP4.

3. **`.call-me-button` custom class** on the CALL button (3.0.2) — the rendered CSS pill relies on the specific 20/130/20/130 padding. If the redesign moves to a button component system, re-derive this shape manually.

4. **ElementsKit Megamenu** is installed (`elementskit-lite` plugin) but I did not find a Megamenu REST record in use — the visible header likely uses the standard Elementor Nav Menu widget pointing at WP menu ID 8 ("Main2"). If they ever turn megamenu on, a plain Nav Menu port will look wrong.

5. **Metform** plugin is installed (used on `/contact-us/`). Form field styling comes from kit `form_field_*` settings (green focus border). Form post targets and notification setup are stored on the form widget itself — confirm they're preserved before removing the plugin.

6. **Header Footer Elementor** plugin wires in `elementor_library` template IDs 57 (header) and 67 (footer). The header template almost certainly holds the nav, logo, phone CTA, and is the visible source of truth for the site chrome. When redesigning, treat these as two additional page-sized design artifacts.

7. **WooCommerce pages** (cart=7, checkout=8, my-account=9) are referenced in the kit but unused. Safe to leave off in the redesign.

---

## 🟡 IA recommendations (summary — full in `nav-structure.md`)

1. Collapse the three existing menus (Main Menu, Main2, Mobile menu) into one structured nav.
2. Remove the old `/home/` page once redirects are in place.
3. Decide whether `/financial/` and `/affiliate/` should become real landing pages or stay non-clickable parents.
4. Merge `/merchant-services/` with `/merchant-processing/`.
5. Wire `/privacy-policy/` and `/terms-of-use/` into the footer.

---

## 🟡 Other notes

1. Site is on Cloudflare in front of WordPress (rendered HTML shows Cloudflare asset behaviour). Any DNS/domain changes during launch need to consider that.
2. The `featured_media` field is `0` on every page — no WordPress featured images are set. The redesign shouldn't rely on them for OG / card previews; expect to set a site-wide OG image instead.
3. There are 4 published blog posts. None are linked from the homepage or any menu. If the redesign wants a blog surface, plan where to place it.

---

## Data provenance

- WP REST API: https://leeeliyahu.com/wp-json/wp/v2/
- Authenticated as user `admin` (Alan Borders, ID 5)
- Audit pulled 2026-04-20
- All raw JSON responses are in the `page-raw/` folder and in the `_*.json` sidecar files in this working directory.
- No writes were performed against the live site.
