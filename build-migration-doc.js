const { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat,
        AlignmentType, BorderStyle, PageBreak } = require('/Users/evantaylor/.npm-global/lib/node_modules/docx');
const fs = require('fs');

const ARIAL = "Arial";

const P = (text, opts = {}) => new Paragraph({
  spacing: { after: 120, line: 300 },
  children: [new TextRun({ text, font: ARIAL, size: 22, ...opts })],
});

const B = (text) => new TextRun({ text, font: ARIAL, size: 22, bold: true });
const T = (text) => new TextRun({ text, font: ARIAL, size: 22 });

const Rich = (runs) => new Paragraph({
  spacing: { after: 120, line: 300 },
  children: runs,
});

const H1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 360, after: 180 },
  children: [new TextRun({ text, font: ARIAL, size: 32, bold: true })],
});

const H2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 280, after: 140 },
  children: [new TextRun({ text, font: ARIAL, size: 26, bold: true })],
});

const H3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 220, after: 100 },
  children: [new TextRun({ text, font: ARIAL, size: 22, bold: true })],
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
  alignment: AlignmentType.LEFT,
  children: [new TextRun({ text, font: ARIAL, size: 44, bold: true })],
});

const Subtitle = (text) => new Paragraph({
  spacing: { after: 360 },
  children: [new TextRun({ text, font: ARIAL, size: 24, italics: true, color: "555555" })],
});

const children = [
  Title("Migrating leeeliyahu.com to a Static Site"),
  Subtitle("Process overview, hosting recommendation, and what changes for the client."),

  H1("The short version"),
  P("The current site runs on WordPress with Elementor on Hostinger. The new site is a fast, modern, hand-coded static site hosted on Cloudflare Pages. This document explains what that means, how the transition works, what goes away, what replaces it, and what it costs."),

  Divider(),

  H1("Hostinger: keep it or move?"),
  P("You don't have to stay on Hostinger, and I'd recommend moving off it for hosting."),
  H3("Why"),
  Bullet("Hostinger is built for WordPress-style shared hosting. It charges for features a static site doesn't need."),
  Bullet("Cloudflare Pages hosts static sites for free, with a faster global network."),
  Bullet("You can keep the domain registered wherever you want. Domain registration and hosting are two separate things."),
  H3("Recommended setup"),
  Bullet("Domain registration: stays where it is (Hostinger is fine for this, or move to Cloudflare for simplicity — about $10/year)."),
  Bullet("Hosting: Cloudflare Pages (free)."),
  Bullet("Email, if any: unchanged. Email is tied to the domain, not the hosting."),

  Divider(),

  H1("What's a static site vs. WordPress on Elementor?"),
  P("Short answer: a static site is a collection of pre-built HTML files served directly to the browser. A WordPress site assembles every page on the fly from a database every time someone visits."),

  H2("How they compare"),

  H3("Speed"),
  BulletRich([B("Static: "), T("Very fast. The page is already built, just delivered. Typically loads in under a second.")]),
  BulletRich([B("WordPress/Elementor: "), T("Slower. Every visit triggers a database query, theme rendering, and plugin execution. Elementor in particular is known for heavy page sizes.")]),

  H3("Security"),
  BulletRich([B("Static: "), T("Very hard to hack. There's no database, no admin login, no PHP executing. Nothing for attackers to break into.")]),
  BulletRich([B("WordPress/Elementor: "), T("Requires regular security updates. Vulnerabilities in plugins and themes are one of the most common attack vectors on the web.")]),

  H3("Editing content"),
  BulletRich([B("Static: "), T("Content lives in code files. To edit, someone (you, or me on retainer) edits the file and commits the change. No admin panel.")]),
  BulletRich([B("WordPress/Elementor: "), T("Non-technical users can log in and edit via a visual builder. This is the main trade-off — you lose the live drag-and-drop editor.")]),

  H3("Maintenance"),
  BulletRich([B("Static: "), T("Almost none. No plugins to update, no PHP version to manage, no security patches. The site just runs.")]),
  BulletRich([B("WordPress/Elementor: "), T("Ongoing. WordPress core, theme, and every plugin needs regular updates. Updates occasionally break things and require fixing.")]),

  H3("Cost"),
  BulletRich([B("Static: "), T("Hosting is free on Cloudflare Pages. You pay only for the domain and optional add-ons (form handler, etc).")]),
  BulletRich([B("WordPress/Elementor: "), T("Monthly hosting, plus Elementor Pro license, plus whatever other paid plugins are installed.")]),

  H3("Design flexibility"),
  BulletRich([B("Static: "), T("Effectively unlimited. Any design that can be built on the web can be built as a static site.")]),
  BulletRich([B("WordPress/Elementor: "), T("Constrained by what Elementor's widget library supports. Custom design work often fights the builder.")]),

  H3("The honest downside of going static"),
  P("The client loses the ability to log in and edit pages themselves through a visual editor. For a site that's mostly static content (About, Services, Contact) with a few regularly-updated sections (new listings), this trade is usually worth it. The plan below accounts for how listings get updated."),

  Divider(),

  H1("Migration process, step by step"),

  NumRich([B("Audit and export. "), T("Pull every piece of content off the current site — all page copy, images, the hero video at /wp-content/uploads/2026/02/7.mp4, testimonial text, contact info, active listings. Save it all to a content folder.")]),
  NumRich([B("Build the new static site locally. "), T("Take the approved dark mockup and extend it to every page the site needs: About, Commercial Leasing, Residential Sales, Active Listings, individual listing template, Contact, any others. Code lives in a private GitHub repo.")]),
  NumRich([B("Replace the plugin-dependent pieces. "), T("Anything that currently runs via a WordPress plugin needs a new home. Details below.")]),
  NumRich([B("Set up Cloudflare Pages. "), T("Connect the private GitHub repo. Every push auto-deploys. You get a staging URL (like leeeliyahu.pages.dev) to preview the new site before it goes live.")]),
  NumRich([B("Test on staging. "), T("Client reviews the live-but-hidden new site. Approve each page. Fix anything that needs fixing.")]),
  NumRich([B("Point DNS. "), T("In the domain's DNS settings, change the records to point leeeliyahu.com at Cloudflare Pages instead of the WordPress server. Propagates in about 5 minutes to a few hours.")]),
  NumRich([B("Keep WordPress alive for 30 days as backup. "), T("Don't cancel Hostinger until the new site has been running cleanly. Then decommission WP. Domain registration stays.")]),

  Divider(),

  H1("What goes away, and what replaces it"),

  H2("Goes away"),
  Bullet("WordPress admin login (/wp-admin)"),
  Bullet("Elementor page builder"),
  Bullet("ElementsKit, Metform, Header/Footer Elementor, and all other plugins"),
  Bullet("Hostinger WordPress hosting (can be canceled after go-live)"),
  Bullet("Visual live-editing by the client"),

  H2("Gets replaced"),
  BulletRich([B("Contact form: "), T("Replaced by Formspree ($10/month) or a free Cloudflare Worker that emails Lee when someone submits. Same form, different plumbing.")]),
  BulletRich([B("New listings: "), T("Stored in a JSON file in the repo. Adding a listing = editing the JSON (or handing it to me on retainer).")]),
  BulletRich([B("Page copy changes: "), T("Edit the relevant HTML file in the repo. Commit. Cloudflare redeploys automatically in about 30 seconds.")]),
  BulletRich([B("Hero video: "), T("Downloaded from the current WP server and re-hosted with the static site. No dependency on the old WordPress install.")]),
  BulletRich([B("Analytics, tracking, SEO meta: "), T("Rebuilt directly into the page code. Same tags, same pixels, just hand-placed instead of plugin-placed.")]),

  Divider(),

  H1("Downtime during the switch"),
  P("Near zero, if done right. The new site is built, tested, and working on a staging URL before anything changes on the live domain. The only cutover moment is the DNS flip, which takes a few minutes. Both sites can coexist during testing — the old WP stays live on its own URL while the new site is being prepared."),

  Divider(),

  H1("Cost comparison"),

  H2("Current (approximate)"),
  Bullet("Hostinger hosting: $10-15/month"),
  Bullet("Elementor Pro license: ~$60/year"),
  Bullet("Domain registration: ~$15/year"),
  Bullet("Any other paid plugins"),

  H2("New setup"),
  Bullet("Cloudflare Pages: $0"),
  Bullet("Formspree (or equivalent) for contact form: $10/month, or $0 if using a Cloudflare Worker"),
  Bullet("Domain registration: ~$15/year (unchanged)"),
  Bullet("Retainer (optional, for ongoing updates): TBD"),

  P("Net: the new setup is cheaper on infrastructure. The cost of the retainer replaces the cost of the client managing WordPress themselves (plus eliminates the hidden cost of plugin updates, security incidents, and builder slowdowns)."),

  Divider(),

  H1("What ongoing management looks like"),

  H3("With a retainer"),
  Bullet("New listings, copy edits, new sections, image swaps — handed to me, turned around typically same-day."),
  Bullet("The client doesn't touch anything. Just sends listings and updates."),
  Bullet("Site stays fast, secure, and on-brand indefinitely."),

  H3("Without a retainer"),
  Bullet("Someone technical (you, or a freelancer) edits the repo when updates are needed."),
  Bullet("Works fine for low-frequency update sites. For a real estate site with regularly-changing listings, a retainer is the cleaner answer."),

  Divider(),

  H1("Timeline"),

  H3("Design and build"),
  Bullet("Approved homepage design: already done"),
  Bullet("Extending to remaining pages: 5-8 days of work"),
  Bullet("Content migration, form setup, testing: 2-3 days"),

  H3("Go-live"),
  Bullet("DNS cutover: less than an hour, scheduled with the client"),
  Bullet("Old WP kept as backup for 30 days, then decommissioned"),

  Divider(),

  H1("Summary"),
  P("The new site will be faster, more secure, cheaper to host, and harder to break. In exchange, the client loses direct visual editing access — which gets replaced with a retainer relationship for updates, or direct repo editing for anyone technical enough."),
  P("Hosting moves from Hostinger to Cloudflare Pages. Domain stays wherever the client wants it. The old WordPress install stays live as a backup for 30 days after cutover, then gets turned off."),
  P("Nothing about this is permanent — if the client ever wanted to go back to WordPress, the domain could be pointed back. The design, code, and content would all still exist and could be handed over."),
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: ARIAL, size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: ARIAL },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: ARIAL },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: ARIAL },
        paragraph: { spacing: { before: 220, after: 100 }, outlineLevel: 2 } },
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
  const outPath = "/Users/evantaylor/Desktop 2/Claude Working Folder - Whiteny/Static-Site-Migration.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Wrote:", outPath);
});
