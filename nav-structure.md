# Navigation Structure — leeeliyahu.com

Three WordPress menus exist. Only one is wired to a menu location, but the visible site header is built inside an Elementor header template (`elementor_library` ID **57**, slug `realia-header`) — so the "visible" nav is likely a nav menu widget inside that template rather than a theme location assignment. All three menus are documented below so nothing is lost in translation.

## Menu locations

- `menu-1` (theme location: "Header") → Menu ID **9** ("Mobile menu")
- No other theme menu location is populated.

## Elementor header template

- `elementor_library` ID 57 — title: "Realia - Header" — controls the visible header across the site.
- `elementor_library` ID 67 — title: "Realia - Footer" — controls the visible footer.

These templates are delivered by the Header Footer Elementor plugin. If the redesign rebuilds the header outside Elementor, ID 57 becomes deprecated and the mobile-menu location (`menu-1`) becomes the authoritative source.

---

## Menu 7 — "Main Menu" (slug `main-menu`) — no location assigned

Tiny, 3 top-level items. Likely a legacy or placeholder menu.

- **Home** → https://leeeliyahu.com/
- **About Us** → https://leeeliyahu.com/about-us/
- **Contact Us** → https://leeeliyahu.com/contact-us/

---

## Menu 8 — "Main2" (slug `main2`) — no location assigned

This is the fullest menu and matches what the site actually surfaces as the primary services dropdown. It's very likely the one referenced inside the Elementor header template.

- **Real Estate** → `#` (no link — parent container only)
  - **Commercial** → https://leeeliyahu.com/commercial/
    - **Active Listing** → https://leeeliyahu.com/commercial-active-listing/
    - **Leasing** → https://leeeliyahu.com/commercial-leasing/
    - **Sales** → https://leeeliyahu.com/commercial-sales/
  - **Residential** → `#` (no link — parent container only)
    - **Active Listings** → https://leeeliyahu.com/active-listings/
    - **Sold** → https://leeeliyahu.com/residential-sold/
  - **Property Management** → https://leeeliyahu.com/property-management/
  - **Broker Opinion Value** → https://leeeliyahu.com/broker-opinion-value/
  - **Mortgages** → https://leeeliyahu.com/mortgages/
- **Financial** → https://leeeliyahu.com/financial/  *(page exists but has 0 Elementor sections — empty)*
  - **Merchant Processing** → https://leeeliyahu.com/merchant-processing/
  - **Business Funding** → https://leeeliyahu.com/business-funding/
  - **Hard Money For Real Estate** → https://leeeliyahu.com/hard-money-for-real-estate/
- **Affiliate** → https://leeeliyahu.com/affiliate/  *(page exists but has 0 Elementor sections — empty)*
  - **Billboards** → https://leeeliyahu.com/billboards/
  - **Antennas** → https://leeeliyahu.com/5g-antennas/
  - **Electrical Storage** → https://leeeliyahu.com/electrical-storage/
  - **Security and Surveillance** → https://leeeliyahu.com/security-and-surveillance/

Total: 3 top-level items, 3 second-level groupings, ~13 leaf pages.

---

## Menu 9 — "Mobile menu" (slug `mobile-menu`) — location: `menu-1`

Ordered differently from Main2 and contains Home/About/Contact that Main2 omits. The nesting is also sometimes malformed.

- **Home** → https://leeeliyahu.com/home/  *(links to the OLD /home/ page ID 13, not the current front page which is /)*
- **About Us** → https://leeeliyahu.com/about-us/
- **Real Estate** → `#`
  - **Commercial** → https://leeeliyahu.com/commercial/
    - **Leasing** → https://leeeliyahu.com/commercial-leasing/  *(only child — Active Listing and Sales are missing here)*
  - **Sold** → https://leeeliyahu.com/residential-sold/  *(no "Residential" parent in this menu — "Sold" sits directly under Real Estate)*
  - **Property Management** → https://leeeliyahu.com/property-management/
  - **Broker Opinion Value** → https://leeeliyahu.com/broker-opinion-value/
  - **Mortgages** → https://leeeliyahu.com/mortgages/
- **Financial** → https://leeeliyahu.com/financial/
  - **Business Funding** → https://leeeliyahu.com/business-funding/
  - **Hard Money For Real Estate** → https://leeeliyahu.com/hard-money-for-real-estate/
  - **Merchant Processing** → https://leeeliyahu.com/merchant-processing/
- **Antennas** → https://leeeliyahu.com/5g-antennas/  *(surfaced at top level instead of under Affiliate!)*
  - **Affiliate** → https://leeeliyahu.com/affiliate/  *("Affiliate" nested under its own child, clearly a drag-and-drop accident)*
  - **Billboards** → https://leeeliyahu.com/billboards/
  - **Security and Surveillance** → https://leeeliyahu.com/security-and-surveillance/
- **Contact Us** → https://leeeliyahu.com/contact-us/

---

## Recommended clean IA for the redesign

Based on page inventory + which pages actually have content, a sane consolidated structure would be:

- **Home** → /
- **About** → /about-us/
- **Real Estate**
  - Residential
    - Active Listings → /active-listings/
    - Sold → /residential-sold/
  - Commercial
    - Active Listings → /commercial-active-listing/
    - Leasing → /commercial-leasing/
    - Sales → /commercial-sales/
  - Property Management → /property-management/
  - Broker Opinion of Value → /broker-opinion-value/
  - Mortgages → /mortgages/
- **Financial**
  - Merchant Processing → /merchant-processing/
  - Business Funding → /business-funding/
  - Hard Money → /hard-money-for-real-estate/
- **Affiliate Services**
  - Billboards → /billboards/
  - Antennas → /5g-antennas/
  - Electrical Storage → /electrical-storage/
  - Security & Surveillance → /security-and-surveillance/
- **Contact** → /contact-us/

Parent labels that currently resolve to `#` (Real Estate, Residential) stay non-clickable. The `/financial/` and `/affiliate/` parent pages are empty shells — either populate them or keep them non-clickable too.

## Pages in the inventory but NOT in any menu

These exist in `site-audit.json` but are orphaned from navigation. The redesign needs a call on whether to link, merge, or archive them:

- Privacy Policy (`/privacy-policy/`) — typically footer-only; not currently linked
- Terms Of Use (`/terms-of-use/`) — same
- Life Insurance (`/life-insurance/`)
- Wholesale Merchandising (`/wholesale-merchandising/`)
- Merchant Services (`/merchant-services/`) — note there is ALSO `/merchant-processing/` in Main2; probable duplicate
- Payment Processing (`/payment-processing/`) — empty (0 Elementor sections)
- Listings (`/listings/`)
- Map (`/map/`) — empty
- Agent (`/agent/`)
- Services (`/services/`)
- Home (`/home/`) — the OLD homepage, still published, still linked from the Mobile menu
