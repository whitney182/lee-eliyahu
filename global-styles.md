# Global Styles — leeeliyahu.com

Pulled from the active Elementor kit (post `elementor_library` ID **1032**, slug `global-kit-styles-2`, title "Kit Styles: Realia — Template kit for Real Estate") and from the Elementor globals REST endpoints.

The site is built on:
- WordPress theme: **hello-elementor** (body class `wp-theme-hello-elementor`)
- Plugins: `elementor`, `elementor-pro`, `elementskit-lite`, `header-footer-elementor`, `metform`
- Active kit class on body: `elementor-kit-1032`
- The kit started life as the **Realia** template kit for real estate (Creativemox); the client has overlaid custom colors (yellow/gold) on top of the kit's original green palette. Several legacy green values still linger.

---

## Global colors

### System (built-in Elementor roles)

| Role | Title in Elementor | Hex |
|---|---|---|
| secondary | Heading | `#1D2021` (near-black) |
| primary | Basic Text | `#353738` (dark gray) |
| text | "Netral" | `#FFFFFF` (white) |
| accent | "Transparent 20%" | `#FFFFFF2B` (white 17% alpha) |

⚠️ These role names are mislabelled relative to what they actually hold. `text` is white because Elementor was configured for a dark-background site.

### Custom colors

| Token | Title | Hex | Where it shows up |
|---|---|---|---|
| d49ac81 | Button | `#F2CA50` | Hero heading, CTA icons, "CALL" button |
| 332724a | Button Hover | `#F2CA50` | Button hover state — same as base (no hover delta) |
| 4d462f5 | Line Color | `#3F6450` | Legacy Realia green, rare use |
| cfa1f76 | Light Background | `#E1ECE7` | Legacy Realia mint, form borders |
| 7fbea4f | Extra Light Background | `#F2F6F4` | Legacy Realia, form field bg |
| 044b931 | Dark Background | `#F2CA50` | Overridden to the gold — role name is legacy |
| 638d055 | Extra Dark Background | `#080D0A` | Deep near-black |
| a2c0d56 | Accent 1 | `#77BFA3` | Legacy Realia green (used in buttons) |
| ec3c7a7 | Accent 2 | `#5E9779` | Legacy Realia green (button gradient end) |
| 1d84241 | Accent 3 | `#1F2122` | Near-black (used for h1–h5 color) |
| 262c9c6 | Accent 4 | `#3F6450` | Legacy green |

### The de-facto brand palette (what's actually used visually)

- **Gold / primary accent:** `#F2CA50`
- **Black / base:** `#000000`
- **White:** `#FFFFFF`
- **Red (accent CTA):** `#FF0000` (Submit An Inquiry button only)
- **Near-black heading:** `#1F2122` (default h1–h5 color in kit)

The red, gold, and white feel brand-intentional; the green values (`#77BFA3`, `#5E9779`, `#3F6450`) are holdovers from the Realia kit and are not part of the current brand.

---

## Global typography

### System typography (kit roles)

| Role | Family | Weight | Desktop | Tablet | Mobile | Line height | Letter spacing |
|---|---|---|---|---|---|---|---|
| Primary | Mulish | 700 | 48px | 37px | 30px | 1.2em | -1px |
| Secondary | Mulish | 700 | 39px | 31px | 24px | 1.2em | -0.5px |
| Text | Inter | 400 | 20px | 15px | 14px | 1.4em | — |
| Accent | Mulish | 600 | 13px | 12px | 11px | 1em | uppercase |

### Custom typography presets

| Preset | Family | Weight | Desktop | Notes |
|---|---|---|---|---|
| Global Font | Inter | 400 | 16px | default body scale |
| Small Font | Inter | 400 | 14px | |
| Header | Mulish | 700 | 16px | |
| H1 | Mulish | 700 | 48px | -1px tracking |
| H2 | Mulish | 700 | 39px | -0.5px tracking |
| H3 | Mulish | 700 | 31px | |

### Body & heading defaults

```
body: Inter 400 / 16px / line-height 1.4 / color #353738
h1:  Mulish 600 / 48px / color #1F2122 / letter-spacing -1px
h2:  Mulish 600 / 39px / color #1F2122 / letter-spacing -0.5px
h3:  Mulish 600 / 31px / color #1F2122
h4:  Mulish 400 / 25px / color #1F2122
h5:  Mulish 500 / 20px / color #1F2122
h6:  Mulish 700 / 14px / color #77BFA3 / uppercase (legacy green)
```

### Homepage overrides

The homepage does NOT use these kit defaults for its visible headings. Every homepage heading inline-sets:
- Font family: **Archivo Black** (loaded directly from Google Fonts on top of Mulish/Inter)
- Color: `#F2CA50` (hero) or `#FFFFFF` (everything else)
- Custom font sizes (77px hero, 34/36px section headings)

So the homepage uses a THIRD display font (Archivo Black) that isn't in the kit's global typography. This is a significant inconsistency worth addressing in the redesign.

---

## Buttons (kit default)

```
background: gradient 135deg from #77BFA3 to #5E9779   (legacy Realia green)
text color: #FFFFFF, hover #FFFFFF
font: Mulish 600 25px (12px mobile, 13px tablet) — capitalize
padding: 20px all sides
border: none, radius 7px
box-shadow: 0 10px 30px 0 rgba(251,186,27,0.17)   (soft orange glow — odd combo with green button)
```

Homepage buttons override these with solid `#F2CA50` (CALL) and `#FF0000` (Submit An Inquiry), Archivo Black 22px, 20px/130px padding, no border.

---

## Forms (kit default — used by Metform plugin on contact page)

```
field bg:      #FAFCFB
field border:  #E1ECE7 (1px solid, radius 7px)
field text:    #1F2122, Inter 400 14px
focus border:  #77BFA3  (legacy green)
focus bg:      #FFFFFF
label:         Mulish 600 16px, color #353738
```

---

## Links

```
link:        color #353738, no underline
link hover:  color #77BFA3 (legacy green), underline
```

⚠️ Link hover is green — inconsistent with the gold/red brand used elsewhere on the homepage.

---

## Layout constants

```
container width:      100% (full width)
space between widgets: 20px column / 20px row (14px base unit)
breakpoint lg (desktop): 1025px
breakpoint md (tablet):  768px
default generic fonts: Sans-serif
```

---

## Site identity

```
site_name:  leeeliyahu.com
site_logo:  https://leeeliyahu.com/wp-content/uploads/2025/10/Group-11.png  (attachment id 1999)
favicon:    https://leeeliyahu.com/wp-content/uploads/2026/02/cropped-Logo-Lee-3-32x32.png
```

Same `Group-11.png` asset is used as the site logo AND as the "Our Company" circle image on the homepage.

---

## Google Fonts actually loaded on the homepage

Only **Archivo Black** is loaded via a `<link>` tag (every weight 100–900 requested even though the font only ships one weight — a minor bloat issue). Mulish and Inter come in via the Elementor kit (either inline CSS or plugin-injected stylesheets), not through a dedicated Google Fonts link in the current homepage HTML.

---

## Custom CSS

- Kit-level `custom_css`: **empty**
- Homepage page-level `custom_css`: **empty**
- Inline widget custom CSS on the homepage:
  - `.border-remove { border: none !important; }` (card 1.0)
  - `.mark { background-color: rgba(0,0,0,0.50); color: black; }` (hero tile chips — note `color: black` contradicts the `title_color: #FFFFFF` set on the same heading)
- There is a kit-style post named `global-kit-styles-2` (ID 1032) — the _active_ kit. An older `global-kit-styles` (ID 9) and the default `default-kit` (ID 6) also exist and can be ignored.

---

## WooCommerce

Kit references WooCommerce page IDs: cart=7, checkout=8, my-account=9. These pages are leftovers from the Realia template kit — WooCommerce isn't actually being used anywhere in the current nav or homepage. Safe to treat as inactive for the redesign.

---

## Key takeaways for the redesign

1. **Three display fonts in play** (Archivo Black, Mulish, Inter). The visible brand on the homepage is Archivo Black; Mulish/Inter live under the hood from the Realia kit.
2. **Two color systems coexist:** the real brand (gold `#F2CA50`, black, white, red) and the unused legacy Realia greens. The greens should be purged.
3. **Role names are misleading** — "Dark Background" is set to `#F2CA50`, "Line Color" is green, `text` is white. Rename in the new design system.
4. **H6 is uppercase green** (`#77BFA3`) — will leak if any editor uses an h6 in new copy.
5. **Link hover is green and underlined** — should match the new brand.
6. **No global custom CSS**, so the redesign only needs to contend with the two inline rules noted above.
