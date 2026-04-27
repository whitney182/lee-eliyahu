const { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat,
        AlignmentType, BorderStyle, ShadingType } = require('/Users/evantaylor/.npm-global/lib/node_modules/docx');
const fs = require('fs');

const ARIAL = "Arial";
const MONO = "Consolas";

const P = (text) => new Paragraph({
  spacing: { after: 120, line: 300 },
  children: [new TextRun({ text, font: ARIAL, size: 22 })],
});

const B = (text) => new TextRun({ text, font: ARIAL, size: 22, bold: true });
const T = (text) => new TextRun({ text, font: ARIAL, size: 22 });
const Code = (text) => new TextRun({ text, font: MONO, size: 20 });

const Rich = (runs) => new Paragraph({
  spacing: { after: 120, line: 300 },
  children: runs,
});

const H1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 400, after: 180 },
  children: [new TextRun({ text, font: ARIAL, size: 36, bold: true })],
});

const H2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 320, after: 140 },
  children: [new TextRun({ text, font: ARIAL, size: 28, bold: true })],
});

const H3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 240, after: 100 },
  children: [new TextRun({ text, font: ARIAL, size: 24, bold: true })],
});

const H4 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_4,
  spacing: { before: 200, after: 80 },
  children: [new TextRun({ text, font: ARIAL, size: 22, bold: true, italics: true })],
});

const Bullet = (text, level = 0) => new Paragraph({
  numbering: { reference: "bullets", level },
  spacing: { after: 80, line: 300 },
  children: [new TextRun({ text, font: ARIAL, size: 22 })],
});

const BulletRich = (runs, level = 0) => new Paragraph({
  numbering: { reference: "bullets", level },
  spacing: { after: 80, line: 300 },
  children: runs,
});

const Num = (text) => new Paragraph({
  numbering: { reference: "numbers", level: 0 },
  spacing: { after: 100, line: 300 },
  children: [new TextRun({ text, font: ARIAL, size: 22 })],
});

const NumRich = (runs) => new Paragraph({
  numbering: { reference: "numbers", level: 0 },
  spacing: { after: 100, line: 300 },
  children: runs,
});

const Divider = () => new Paragraph({
  spacing: { before: 200, after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "999999", space: 1 } },
  children: [new TextRun({ text: "" })],
});

const Title = (text) => new Paragraph({
  spacing: { after: 120 },
  children: [new TextRun({ text, font: ARIAL, size: 48, bold: true })],
});

const Subtitle = (text) => new Paragraph({
  spacing: { after: 400 },
  children: [new TextRun({ text, font: ARIAL, size: 24, italics: true, color: "555555" })],
});

// Code block as paragraph with gray background
const CodeBlock = (text) => {
  const lines = text.split("\n");
  return lines.map((line, idx) => new Paragraph({
    spacing: { after: 0, line: 260, before: idx === 0 ? 120 : 0 },
    shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
    indent: { left: 240, right: 240 },
    children: [new TextRun({ text: line || " ", font: MONO, size: 18 })],
  }));
};

const PromptBlock = (text) => {
  const lines = text.split("\n");
  return lines.map((line, idx) => new Paragraph({
    spacing: { after: 0, line: 260, before: idx === 0 ? 120 : 0, after: idx === lines.length - 1 ? 200 : 0 },
    shading: { fill: "FFF7E6", type: ShadingType.CLEAR },
    indent: { left: 240, right: 240 },
    border: idx === 0 ? { left: { style: BorderStyle.SINGLE, size: 24, color: "D4A94A" } } : undefined,
    children: [new TextRun({ text: line || " ", font: MONO, size: 18 })],
  }));
};

const children = [
  Title("Handoff Guide"),
  Subtitle("How to continue building the leeeliyahu.com static site with Claude. Exact tools, exact prompts, exact process."),

  H1("Who this is for"),
  P("This document is written for someone taking over the Lee Eliyahu website project from Evan Taylor. It assumes you will use Claude (Anthropic\u2019s AI assistant, specifically Claude Code, the command-line version) to continue the work, and that you have basic comfort with a terminal."),
  P("Everything you need is here: tools to install, accounts to set up, the current state of the project, the prompts to copy and paste into Claude for each remaining task, and how to deploy and maintain the site."),

  Divider(),

  H1("Part 1: Project state as of handoff"),

  H2("What\u2019s been done"),
  Bullet("Audit of the existing WordPress + Elementor site at leeeliyahu.com. Full data export saved to the Desktop working folder."),
  Bullet("Three design directions built as live HTML mockups: light, dark, and brutalist. Client selected the dark direction."),
  Bullet("Two pages built in the dark style: homepage and service page (Active Listings). Live at leeeliyahu-mockups.pages.dev/homepage-dark and /service-dark."),
  Bullet("Cloudflare Pages project set up at project name \u201Cleeeliyahu-mockups.\u201D"),
  Bullet("Three client-facing documents produced: migration process, domain recovery, and this handoff guide."),
  Bullet("Domain registered at Hostinger (confirmed via WHOIS). Expires July 14, 2026."),

  H2("What\u2019s still to do"),
  Bullet("Build the remaining pages in the dark style: About, Commercial Leasing, Residential Sales, Property Management, Hard Money Lending, Broker Opinion of Value, Contact, Individual Listing Template."),
  Bullet("Extract all content from the WordPress export (listings, copy, images, video) and bake it into the new pages."),
  Bullet("Set up the contact form backend (Formspree or a Cloudflare Worker)."),
  Bullet("Move the repo from the local working folder to a private GitHub repository."),
  Bullet("Set up the production Cloudflare Pages project connected to the GitHub repo."),
  Bullet("Point leeeliyahu.com DNS at the new Cloudflare project."),
  Bullet("Decommission the old WordPress site after 30 days of stable operation."),

  H2("Where files live"),
  BulletRich([B("Working folder: "), Code("/Users/evantaylor/Desktop 2/Claude Working Folder - Whiteny/")]),
  BulletRich([B("Mockups: "), Code("/mockups/homepage-dark.html"), T(", "), Code("service-dark.html"), T(", and other variants in the same folder.")]),
  BulletRich([B("WordPress export data: "), Code("_*.json"), T(" and "), Code("_*.html"), T(" files in the working folder.")]),
  BulletRich([B("Client-facing docs: "), Code("Static-Site-Migration.docx"), T(", "), Code("Domain-Access-Recovery.docx"), T(", "), Code("Handoff-Guide.docx"), T(" (this file).")]),
  BulletRich([B("Live preview URLs: "), Code("https://leeeliyahu-mockups.pages.dev/homepage-dark"), T(" and related.")]),

  Divider(),

  H1("Part 2: Tools and accounts you need"),

  H2("Required installations"),
  P("Install these on your machine before starting. All are free."),
  H3("1. Claude Code"),
  BulletRich([T("The command-line version of Claude. Install with: ")]),
  ...CodeBlock("npm install -g @anthropic-ai/claude-code"),
  BulletRich([T("Run by typing "), Code("claude"), T(" in any terminal folder. Requires an Anthropic account and API key or Claude Max subscription.")]),
  BulletRich([T("Documentation: "), Code("https://docs.claude.com/en/docs/claude-code")]),

  H3("2. Node.js"),
  Bullet("Required for the Cloudflare deploy tool and for running utility scripts."),
  BulletRich([T("Install from "), Code("https://nodejs.org"), T(" (LTS version).")]),

  H3("3. Git"),
  Bullet("For version control and pushing to GitHub."),
  Bullet("On macOS, comes with Xcode Command Line Tools. Install by running: "),
  ...CodeBlock("xcode-select --install"),

  H3("4. Wrangler (Cloudflare CLI)"),
  Bullet("The deploy tool for Cloudflare Pages. Runs via npx so no permanent install needed."),
  BulletRich([T("Verify it works: ")]),
  ...CodeBlock("npx wrangler --version"),

  H2("Required accounts"),
  BulletRich([B("Anthropic account "), T("(for Claude Code). Sign up at "), Code("https://console.anthropic.com"), T(". You can either pay per-usage via API or subscribe to Claude Max.")]),
  BulletRich([B("Cloudflare account "), T("(free). Sign up at "), Code("https://dash.cloudflare.com"), T(".")]),
  BulletRich([B("GitHub account "), T("(free). Sign up at "), Code("https://github.com"), T(". Create a private repo for the project.")]),
  BulletRich([B("Hostinger account "), T("(for domain DNS access). Already exists, get credentials from Lee Eliyahu.")]),
  BulletRich([B("Formspree account "), T("(optional, for contact form). Sign up at "), Code("https://formspree.io"), T(". Free tier handles 50 submissions/month.")]),

  H2("Cloudflare API token"),
  P("You\u2019ll need a Cloudflare API token for Claude Code to deploy on your behalf."),
  Num("Go to https://dash.cloudflare.com/profile/api-tokens"),
  Num("Click \u201CCreate Token.\u201D"),
  Num("Pick the \u201CEdit Cloudflare Workers\u201D template."),
  Num("Under Zone Resources, change \u201CSpecific zone\u201D to \u201CAll zones.\u201D"),
  Num("Continue to summary, create the token, and copy it."),
  Num("In your terminal, before running deploys, set: "),
  ...CodeBlock("export CLOUDFLARE_API_TOKEN=paste-token-here"),
  P("This token stays active only in that terminal session. If you open a new window, set it again."),

  Divider(),

  H1("Part 3: Context to give Claude at the start of every session"),

  P("Before asking Claude to do any real work on this project, paste this briefing at the start of a new session. It gives Claude the context it needs to produce work that matches what\u2019s already been built."),

  ...PromptBlock(`You are continuing work on the leeeliyahu.com website redesign.

PROJECT CONTEXT:
- Client is Lee Eliyahu, a New York real estate broker (residential, commercial, investment). Licensed since 2014. Works all five boroughs.
- The old site is a slow WordPress/Elementor build on Hostinger.
- We are replacing it with a fast, hand-coded static site hosted on Cloudflare Pages.

DESIGN DIRECTION (APPROVED):
- Dark cinematic aesthetic based on /mockups/homepage-dark.html in the working folder.
- Primary font: Plus Jakarta Sans (body). Display: Instrument Serif (italic accents).
- Color tokens:
    --black: #0B0A08
    --obsidian: #131210
    --ivory: #EFEADB
    --gold: #D4A94A
- Signature moves: filmic grain overlay (SVG noise), gold underline sweep on hover, "Index \u2014 00X / Section" meta lines, oversized outlined serif italic accent words.
- Must preserve the hero video at https://leeeliyahu.com/wp-content/uploads/2026/02/7.mp4.

WORKING FOLDER:
/Users/evantaylor/Desktop 2/Claude Working Folder - Whiteny/

KEY FILES TO REFERENCE:
- /mockups/homepage-dark.html (hero, nav, service cards, about, stats, testimonial, video, contact, footer patterns)
- /mockups/service-dark.html (interior page pattern with crumbs, filter bar, grid of cards, lead-capture section)
- /redesign-notes.md (full design system and tokens)
- /nav-structure.md (site navigation)

EDITING RULES:
- Every page is fully self-contained: inline <style>, inline <script>, no external deps except Google Fonts and Lucide icon CDN.
- Preserve the exact token values and type scale.
- Never use pure black (#000) or pure white (#fff) \u2014 always use the tinted tokens.
- Every <img> must have width, height, loading="lazy", decoding="async".
- All scroll/resize listeners must use { passive: true }.
- Respect prefers-reduced-motion: heavy animations gate on this.

TONE FOR COPY:
- Direct, New York, confident. No corporate softball.
- Italic serif accent words in headlines. Short sentences.
- Never use banned filler: leverage, robust, dynamic, tapestry, landscape, foster, meticulous, vibrant.

Tell me you understand this context before proceeding.`),

  Divider(),

  H1("Part 4: Prompts for each remaining page"),

  P("Each prompt below is a complete, self-contained instruction. Copy it, paste it into Claude Code after the context briefing above, and Claude will produce the page. Review the output, ask for changes if needed, then deploy."),

  H2("Prompt 1: About page"),
  ...PromptBlock(`Build the About page for Lee Eliyahu at /mockups/about-dark.html.

STRUCTURE:
1. Same nav as homepage-dark.html (copy exactly).
2. Hero section: meta line "Index \u2014 01 / Principal", headline "The broker who answers." with "answers" in italic gold serif. One-sentence lead paragraph.
3. Bio section: two-column grid. Left column = portrait placeholder (aspect ratio 4/5, dark gradient background, small caption "Lee Eliyahu \u2014 NY"). Right column = three short paragraphs of bio copy. No corporate filler.
4. Career timeline: vertical list of 4-6 milestones from 2014 to 2026. Each entry = year on left, headline on right, one-sentence description.
5. Values section: three cards in a row. Headlines like "One Broker", "Every Borough", "No Handoffs" with italic serif accent words. Short description text each.
6. Press / recognition row: thin band with 4-6 publication names in muted ivory (placeholder names like "The Real Deal", "Curbed NY", "Commercial Observer").
7. CTA section: gold-bordered dark panel, headline "Pick up the phone.", phone number and email, same style as homepage-dark contact section.
8. Same footer as homepage-dark.html.

Use the same grain overlay, same type scale, same fonts.

Do not use stock photography. Use placeholder divs with dark gradient backgrounds and captions like [Portrait photograph].

Match the feel of homepage-dark.html exactly. Self-contained HTML with inline style and script.`),

  H2("Prompt 2: Commercial Leasing service page"),
  ...PromptBlock(`Build the Commercial Leasing service page at /mockups/commercial-leasing-dark.html.

Base it on the structure of /mockups/service-dark.html but adapt the content for commercial real estate.

STRUCTURE:
1. Same nav and footer as service-dark.html.
2. Hero: meta line "Index \u2014 002 / Commercial", crumbs "Home / Real Estate / Commercial Leasing", headline "Retail, office, mixed-use." with "mixed-use" as italic outline serif.
3. Intro paragraph: 2-3 sentences explaining what Lee does commercially. Tenant-side and landlord-side. Specific NYC neighborhoods.
4. Three-column "how it works" section: Market, Negotiate, Close. Each with a number, heading, and 2-sentence description.
5. Grid of 4 active commercial listings (placeholder cards) \u2014 same card pattern as service-dark.html but for commercial: asking rent per square foot, SF available, neighborhood, use type.
6. Credibility row: "Closed volume", "Tenant clients", "Landlord clients" stats with big numerals.
7. Lead-capture section specific to commercial: dropdown for "Tenant / Landlord / Investor", text fields for "Neighborhood", "Budget or rent range", "Use type", "Timeline".
8. Related services row (link cards): Residential Sales, Investment, Property Management.

Use the same grain overlay and tokens. Keep placeholder content realistic (example commercial neighborhoods: SoHo, Flatiron, Midtown South, Williamsburg).`),

  H2("Prompt 3: Residential Sales service page"),
  ...PromptBlock(`Build the Residential Sales service page at /mockups/residential-sales-dark.html.

Model it on /mockups/service-dark.html (which is the Active Listings page).

STRUCTURE:
1. Same nav and footer.
2. Hero: meta "Index \u2014 003 / Residential", crumbs "Home / Real Estate / Residential Sales", headline "Townhouses, condos, co-ops." with "co-ops" as italic outline serif.
3. Intro: 2-3 sentences about the residential practice. Mention buyer-side and seller-side representation.
4. "Process" section: three panels \u2014 Search & Tour, Offer & Negotiate, Close. Match homepage-dark.html service card style (squared, gold underline sweep on hover).
5. Featured listings grid: 6 active residential listings (reuse the card pattern from service-dark.html but with residential details: beds, baths, sqft, price).
6. Testimonial block: pick one of the existing testimonials from homepage-dark, styled the same way.
7. Lead-capture form: same obsidian-bg pattern as service-dark.html but fields adapted for residential buyers (neighborhoods, bedroom count, budget range, timeline, rent or buy).
8. Related services row: Active Listings, Commercial, Investment.

Keep every design element consistent with the dark mockup system.`),

  H2("Prompt 4: Property Management service page"),
  ...PromptBlock(`Build the Property Management service page at /mockups/property-management-dark.html.

STRUCTURE:
1. Nav, footer match other dark pages.
2. Hero: meta "Index \u2014 004 / Management", crumbs, headline "Hands-on management. For owners who don't want to be landlords." with "landlords" italic outline serif.
3. What's included section: 6-card grid of services (Tenant placement, Rent collection, Maintenance coordination, Financial reporting, Lease enforcement, Inspections). Each card has number, heading, short description.
4. "Fee structure" section: simple table or three-column grid showing typical percentage of monthly rent.
5. "Who this is for" section: 2-column with headline plus bullet list of ideal client types (out-of-state owners, small portfolio owners, estate trustees, etc).
6. Lead-capture form: same obsidian pattern, fields for property address, number of units, current occupancy, management needs.
7. Related services link row.

Match the dark aesthetic precisely.`),

  H2("Prompt 5: Hard Money Lending page"),
  ...PromptBlock(`Build the Hard Money Lending page at /mockups/hard-money-lending-dark.html.

This is a "financial services" page. Keep the tone different from residential \u2014 more direct about terms, faster.

STRUCTURE:
1. Nav, footer same as other dark pages.
2. Hero: meta "Index \u2014 005 / Capital", crumbs "Home / Financial / Hard Money Lending", headline "Bridge loans. Closed on terms that make sense." with "sense" italic outline serif.
3. Use cases row: 4 cards (Fix and flip, Bridge to permanent, Construction, Acquisition). Each with short description.
4. "Terms at a glance" section: horizontal band with stats \u2014 Typical LTV, Typical term, Typical rate range, Typical close time. Big numerals, ivory on obsidian.
5. "How it works" section: 4-step process (Submit deal, Underwrite in 48 hours, Term sheet, Close). Numbered timeline.
6. Disclaimer band: small-print ivory text noting "Loans subject to underwriting and collateral. Not an offer to lend."
7. Lead-capture form: dropdown for loan type, property address, requested amount, timeline to close.
8. Related services row.

Be careful with the copy \u2014 financial services are regulated. Use language like "loans arranged by", "subject to underwriting." Do not promise approval.`),

  H2("Prompt 6: Broker Opinion of Value page"),
  ...PromptBlock(`Build the Broker Opinion of Value (BOV) page at /mockups/bov-dark.html.

A BOV is a written professional estimate of a property's market value. It's used by estate attorneys, trustees, investors, and owners considering a sale.

STRUCTURE:
1. Nav, footer as usual.
2. Hero: meta "Index \u2014 006 / Valuation", headline "An honest read on what it's worth." with "worth" italic outline serif.
3. What's in a BOV: 4-column grid \u2014 Comparable sales, Market conditions, Property assessment, Value range.
4. Who uses them: short explainer with 4 client types as cards (Estate attorneys, Trustees, Investors, Owners pre-sale).
5. Turnaround and pricing: clear stat block \u2014 "Typical turnaround: 5-7 business days. Typical cost: $500-$1,500 depending on complexity."
6. Lead-capture form: property address, purpose of valuation, timeline needed.
7. Related services.

Keep the copy professional and restrained \u2014 this is a page that attorneys and trustees will read. Less swagger than the residential sales page.`),

  H2("Prompt 7: Contact page"),
  ...PromptBlock(`Build a dedicated Contact page at /mockups/contact-dark.html.

STRUCTURE:
1. Nav, footer as usual.
2. Hero: meta "Index \u2014 00 / Contact", headline "Start the conversation." with "conversation" italic outline serif.
3. Two-column layout: left = contact methods (phone, email, office by appointment, with big type and gold accent numerals), right = contact form (same obsidian-bg pattern as homepage, with name/email/phone/interest dropdown/message).
4. Below the two columns: "What to expect" row \u2014 three small panels explaining "First call", "Discovery", "Next steps" with one-sentence each.
5. Neighborhood served map placeholder: a styled SVG or CSS-only representation of the five boroughs (no Google Maps). Label each borough.

Do not use a real map library. Use CSS for the stylized borough diagram. Match the aesthetic.`),

  H2("Prompt 8: Individual Listing template"),
  ...PromptBlock(`Build a single-listing template at /mockups/listing-template-dark.html. This will be reused for every individual listing page.

STRUCTURE:
1. Nav, footer as usual.
2. Hero: large photo placeholder (aspect 16/9, dark gradient background) with listing address overlaid in ivory, price in gold italic serif, crumbs "Home / Active Listings / [Neighborhood] / [Address]".
3. Meta row directly under hero: Beds / Baths / SqFt / Price per sqft / Listing ID. Thin band, ivory on obsidian.
4. Gallery strip: 4-6 smaller photo placeholders in a scrollable row.
5. Description section: 2-column \u2014 left = 3-4 paragraph written description of the property, right = key features list (bullets with gold icons: flooring, appliances, outdoor space, etc).
6. Building / area info: two-column \u2014 left = building facts (year built, units, stories, amenities), right = neighborhood facts (transit, schools, nearby establishments).
7. Floor plan placeholder: styled div, caption "Floor plan on request."
8. Listing agent card: photo placeholder, name (Lee Eliyahu), phone, email, "Schedule a showing" button.
9. Related listings row: 3 cards linking to other active listings in the same borough.
10. Footer.

Use realistic placeholder content: addresses, square footages, prices. Example: "245 West 13th Street, #4B, West Village, Manhattan". $2,450,000. 2BR / 2BA. 1,280 sqft.

This file will be duplicated and filled in for each real listing. Build it to be easy to find-and-replace.`),

  Divider(),

  H1("Part 5: Infrastructure prompts"),

  H2("Prompt: Set up GitHub repo and Cloudflare Pages production project"),
  ...PromptBlock(`Set up the production Cloudflare Pages project for leeeliyahu.com.

STEPS TO EXECUTE:
1. Create a new private GitHub repository named "leeeliyahu-site" under my account.
2. Initialize the repo locally in the /mockups folder: git init, add all files, commit with message "Initial commit: dark design across all pages."
3. Push to the GitHub remote.
4. Using Wrangler, create a new Cloudflare Pages project named "leeeliyahu" connected to the GitHub repo, production branch = main, build command = (none, static site), output directory = /.
5. Verify the deployment by curling the leeeliyahu.pages.dev URL.
6. Report the production URL.

Use my Cloudflare API token which is already exported in this terminal as CLOUDFLARE_API_TOKEN. Use my GitHub credentials via the gh CLI.`),

  H2("Prompt: Set up the contact form"),
  ...PromptBlock(`Set up the contact form backend for the new site.

Pick one of these two options based on the client's preference:

OPTION A \u2014 FORMSPREE (quickest, $10/mo):
1. Sign up at formspree.io.
2. Create a new form endpoint.
3. In every contact form across the site, set the form action to the Formspree endpoint and method="POST".
4. Add hidden fields for _replyto (sender email) and _subject (e.g., "New inquiry from leeeliyahu.com").
5. Test a submission and confirm an email arrives at lee@leeeliyahu.com.

OPTION B \u2014 CLOUDFLARE WORKER (free):
1. Create a new Worker in the Cloudflare dashboard named "lee-contact-form".
2. Write a handler that accepts a POST from the form, validates the fields, and sends an email via MailChannels (free Cloudflare-integrated email service) to lee@leeeliyahu.com.
3. Bind the Worker to a route at forms.leeeliyahu.com/submit (requires adding the DNS record).
4. Update every contact form on the site to POST to that Worker URL.
5. Add honeypot field for spam protection.
6. Test end-to-end.

Either way, add a success state to the form (replace the form with a "Message sent. Lee will respond within the day." panel) and proper client-side validation.`),

  H2("Prompt: Connect the custom domain"),
  ...PromptBlock(`Connect leeeliyahu.com to the new Cloudflare Pages project.

STEPS:
1. In the Cloudflare Pages dashboard, open the "leeeliyahu" project. Go to Custom Domains. Add leeeliyahu.com.
2. Cloudflare will give you two DNS records to set (or instructions to change nameservers). If the client prefers to keep registration at Hostinger, use the DNS record path. If they're moving registration to Cloudflare, use the nameserver change path.
3. Log into Hostinger. Go to the DNS Zone Editor for leeeliyahu.com.
4. Remove the existing A record pointing at the WordPress hosting IP.
5. Add the records Cloudflare gave you.
6. Wait 5-60 minutes for propagation. Verify with: dig leeeliyahu.com.
7. Once DNS resolves to Cloudflare, test the site at https://leeeliyahu.com in an incognito window.
8. Cloudflare will auto-provision the SSL certificate within a few minutes.

IMPORTANT: Do NOT cancel Hostinger hosting yet. Keep it running for 30 days as backup in case something needs to be reverted.`),

  H2("Prompt: Post-launch verification checklist"),
  ...PromptBlock(`After the site goes live on leeeliyahu.com, run this verification checklist.

CHECKS:
1. Every page loads in under 2 seconds on 4G.
2. All internal links work (no 404s).
3. Contact form submits and email arrives.
4. Mobile rendering looks correct on iPhone SE, iPhone 15 Pro, and iPad.
5. All images have width, height, loading="lazy", decoding="async" attributes.
6. No console errors in Chrome DevTools.
7. Lighthouse Performance score is 90+, Accessibility 95+, Best Practices 95+, SEO 95+.
8. The hero video autoplays muted on desktop and mobile.
9. prefers-reduced-motion is respected (test with DevTools emulation).
10. robots.txt and sitemap.xml are present and correct.
11. Google Search Console property verification is set up.
12. Favicon renders on all browsers.

Report any failures with specific URLs and suggested fixes.`),

  Divider(),

  H1("Part 6: Maintenance prompts"),

  P("Use these prompts for ongoing work after the site is live."),

  H2("Prompt: Add a new listing"),
  ...PromptBlock(`Add a new active listing to leeeliyahu.com.

DETAILS PROVIDED:
[Paste the listing details here: address, neighborhood, price, beds, baths, sqft, description, features, gallery images.]

STEPS:
1. Copy /mockups/listing-template-dark.html to /mockups/listings/[slug].html where slug is a lowercase hyphenated version of the address (e.g., "245-w-13th-4b").
2. Find-and-replace the template content with the actual listing details.
3. Save the gallery images to /mockups/images/listings/[slug]/ with optimized webp versions.
4. Add a card for this listing on /mockups/service-dark.html (Active Listings page) in the appropriate borough section.
5. Update the homepage Featured Listings section if this listing should be featured.
6. Commit and push. Cloudflare will auto-deploy in about 30 seconds.
7. Confirm the listing is live at https://leeeliyahu.com/listings/[slug].`),

  H2("Prompt: Remove a listing (sold or withdrawn)"),
  ...PromptBlock(`Remove the listing at [listing URL or slug] from the site because it was [sold / withdrawn / under contract].

STEPS:
1. If sold: move the listing file from /mockups/listings/ to /mockups/sold/ and update the page to show "SOLD" banner with sale date.
2. If withdrawn: delete the listing file entirely.
3. Remove the card from /mockups/service-dark.html.
4. If the listing was featured on the homepage, replace it with another active listing.
5. Check sitemap.xml and remove the URL if the page was deleted.
6. Commit and push.`),

  H2("Prompt: Update page copy"),
  ...PromptBlock(`Update copy on [page name] at [URL].

CURRENT TEXT (copy from the live page):
[paste]

NEW TEXT:
[paste new version]

STEPS:
1. Open the HTML file for that page.
2. Find the current text and replace with the new text.
3. Preserve all inline formatting tags (<span class="accent">, <em>, etc).
4. If the change affects word count significantly, check that the surrounding layout still reads well (no orphan words, no broken line wraps on mobile).
5. Commit and push.`),

  H2("Prompt: Add a new testimonial"),
  ...PromptBlock(`Add a new client testimonial to the site.

DETAILS:
- Quote: [paste quote]
- Client name: [name]
- Client context: [Buyer / Seller / Tenant / Landlord + neighborhood]
- Deal closed year: [YYYY]

STEPS:
1. Open /mockups/homepage-dark.html.
2. Find the Testimonial section (labeled "Index \u2014 04 / Testimony").
3. Add a new <figure class="test"> block inside the .tests grid, matching the existing pattern.
4. If there are already two testimonials, either rotate one out or expand the grid to a 3-up layout.
5. Commit and push.`),

  Divider(),

  H1("Part 7: Anti-patterns \u2014 things Claude should not do"),

  P("Copy this warning into any session where you're about to ask Claude for design changes. It prevents common mistakes."),
  ...PromptBlock(`DO NOT use any of these when working on this project:

- Pure black (#000) or pure white (#fff). Use the tinted tokens: --black #0B0A08, --ivory #EFEADB.
- Inter or Roboto fonts. The approved fonts are Plus Jakarta Sans and Instrument Serif.
- Generic stock-photo placeholder sites. Use styled div placeholders with captions like [Portrait photograph].
- Gradient text on headlines. Keep it flat. Italic serif accent words carry the emphasis.
- Glassmorphism, frosted glass cards, or heavy shadows. This aesthetic is flat and editorial.
- Cards-inside-cards nesting. Flatten the hierarchy.
- Centered body copy. Default is left-aligned.
- Rounded corners above 8px. The dark design uses mostly squared edges with subtle 2px radius where needed.
- Icon-above-every-heading templating. Use icons sparingly, never decoratively.
- Bounce or elastic easing on animations. Use ease-out-quart or similar natural deceleration.
- Filler words: leverage, robust, dynamic, tapestry, landscape, foster, meticulous, vibrant, cutting-edge, transformative. None of these appear in the existing copy. Keep it out.
- em dashes. Use hyphens with spaces or rewrite.
- Semicolons. Use periods.

If you're about to do any of the above, stop and ask first.`),

  Divider(),

  H1("Part 8: If you get stuck"),

  Bullet("First, re-read the existing /mockups/homepage-dark.html. It's the source of truth for every design pattern."),
  Bullet("Use Claude Code's /reference command to re-load the project context if a session has drifted."),
  Bullet("The design notes file at /mockups/design-notes.md has the original rationale for every choice."),
  Bullet("For Cloudflare deploy issues: check the logs at ~/.wrangler/logs/."),
  Bullet("For GitHub or Git issues: the gh CLI has strong error messages. Run gh auth status to verify credentials."),
  Bullet("Evan Taylor built this project. Contact etaylor4391@gmail.com for background questions."),

  Divider(),

  H1("Summary"),
  P("This project has a clear design direction, a working deployment pipeline, and a partial build already live at leeeliyahu-mockups.pages.dev. The remaining work is page extension, content migration, form setup, and domain cutover \u2014 all of which can be driven by Claude with the prompts in this document."),
  P("Keep the aesthetic tight. Don\u2019t drift toward generic AI output. The dark design has a specific point of view and the new pages need to match it exactly. Every prompt in this document ends with an instruction to match homepage-dark.html \u2014 that instruction is load-bearing. Follow it."),
  P("Lee Eliyahu is a no-BS broker. The site should read the same way. Plain, confident, direct."),
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: ARIAL, size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: ARIAL },
        paragraph: { spacing: { before: 400, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: ARIAL },
        paragraph: { spacing: { before: 320, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: ARIAL },
        paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 2 } },
      { id: "Heading4", name: "Heading 4", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, italics: true, font: ARIAL },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 3 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "\u25E6", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
        ] },
      { reference: "numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        ] },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = "/Users/evantaylor/Desktop 2/Claude Working Folder - Whiteny/Handoff-Guide.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Wrote:", outPath);
});
