const { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat,
        AlignmentType, BorderStyle } = require('/Users/evantaylor/.npm-global/lib/node_modules/docx');
const fs = require('fs');

const ARIAL = "Arial";

const P = (text) => new Paragraph({
  spacing: { after: 120, line: 300 },
  children: [new TextRun({ text, font: ARIAL, size: 22 })],
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
  children: [new TextRun({ text, font: ARIAL, size: 44, bold: true })],
});

const Subtitle = (text) => new Paragraph({
  spacing: { after: 360 },
  children: [new TextRun({ text, font: ARIAL, size: 24, italics: true, color: "555555" })],
});

const children = [
  Title("If You Don\u2019t Have Access to Your Domain"),
  Subtitle("Don\u2019t worry. This is a common situation and there\u2019s a clear path forward."),

  H1("The situation"),
  P("Your website address (leeeliyahu.com, for example) is registered somewhere \u2014 at a company like Hostinger, GoDaddy, or Namecheap. Whoever has the login to that account controls where the site points. If you don\u2019t know where it\u2019s registered, or can\u2019t log in, we can\u2019t immediately move hosting to Cloudflare."),
  P("That\u2019s the only thing blocking a move. It\u2019s a login problem, not a technical one \u2014 and it\u2019s solvable."),

  Divider(),

  H1("What I\u2019ll do first"),
  P("Before you lift a finger, I handle the investigation. Here\u2019s what that looks like:"),
  NumRich([B("Look up where the domain is registered. "), T("Every domain has a public registration record. A free tool called WHOIS tells us which company holds it, what email is on file, and when it was last renewed. Takes about 30 seconds.")]),
  NumRich([B("Check the email on file. "), T("If the registration email is one you still have access to, you can reset the password and get in. Done.")]),
  NumRich([B("Check for billing clues. "), T("Recurring charges from a domain registrar on a company credit card will tell us exactly where it lives, even if the login has been lost.")]),
  NumRich([B("Check old invoices and emails. "), T("Most registrars send annual renewal notices. Searching your inbox for \u201Cdomain renewal\u201D or \u201Cleeeliyahu.com\u201D usually surfaces something.")]),

  P("Nine times out of ten, the domain is recoverable within a few minutes once we know where to look."),

  Divider(),

  H1("If the basic recovery doesn\u2019t work"),
  P("Registrars have formal recovery processes for exactly this situation. They\u2019re designed for people who lost access to an account they legitimately own."),

  H3("Identity-verified recovery"),
  Bullet("Most registrars (including Hostinger, GoDaddy, Namecheap) will restore account access if you send them a copy of your photo ID, proof of business ownership, and any old billing information you can find."),
  Bullet("Turnaround is usually 1-3 business days."),
  Bullet("I handle the paperwork side on your behalf \u2014 you just need to provide the ID."),

  H3("Transfer from an old agency or developer"),
  Bullet("If a previous web developer or agency registered the domain \u201Cfor\u201D you, they likely still hold the account. A simple email asking them to push the domain to your own account usually works."),
  Bullet("Registrars have a built-in \u201Caccount change\u201D or \u201Cpush\u201D feature that transfers a domain between two accounts in seconds, no fee."),
  Bullet("If the previous agency is unresponsive, ICANN (the organization that governs domains) has a formal dispute process."),

  Divider(),

  H1("If recovery genuinely isn\u2019t possible"),
  P("In the rare case we can\u2019t get you back into your domain \u2014 maybe the registrar is out of business, the domain was abandoned, or there\u2019s a legal dispute \u2014 you still have good options."),

  H2("Option 1: Launch on a Cloudflare URL while recovery continues"),
  P("Cloudflare gives every project a free built-in web address, something like leeeliyahu.pages.dev. We can launch the new site on that URL immediately. It\u2019s a live, real, shareable website. You can put it on business cards, in your email signature, and in ads."),
  Bullet("Upside: no waiting, site is live in days."),
  Bullet("Downside: the URL isn\u2019t as clean as leeeliyahu.com. It\u2019s a placeholder, not a long-term answer."),

  H2("Option 2: Register a brand-new domain"),
  P("For $10-$30 a year we can register a new domain in your name that you fully control from day one."),
  Bullet("Options: leeeliyahu.nyc, leeeliyahu.co, leeeliyahu.realtor, leeeliyahunyc.com, and dozens more."),
  Bullet("Upside: clean slate, full control, no waiting."),
  Bullet("Downside: you lose whatever brand recognition the old domain had, and you\u2019ll want to announce the change to existing contacts."),
  P("For a broker whose business runs on personal referrals, the cost of changing domains is usually low \u2014 most of your clients find you through people, not Google."),

  H2("Option 3: Keep Hostinger for the domain only"),
  P("If you can log into Hostinger at all, even just partially, you don\u2019t have to move the domain. You can keep the domain registered with Hostinger and just change a few settings inside their control panel to point at Cloudflare. The domain stays where it is. Hosting moves."),
  P("This works great for clients who have limited Hostinger access but don\u2019t want to deal with a full transfer."),

  Divider(),

  H1("What this means for the project timeline"),
  P("If the domain is recoverable quickly (most cases), the project stays on its normal timeline. No delay."),
  P("If it takes a few days of identity verification to get access, the design and build work continues in parallel. By the time the domain access is sorted, the new site is usually ready to launch \u2014 the cutover happens the same day access is restored."),
  P("If recovery isn\u2019t possible at all, we launch on the Cloudflare URL or a new domain, and your business stays in motion. The site is live either way."),

  Divider(),

  H1("Summary"),
  P("Domain access is almost always recoverable. When it\u2019s not, there are clean fallback options that still get you live on a fast, secure, modern website without waiting for paperwork."),
  P("You don\u2019t need to figure any of this out. Send me whatever login info or old receipts you can find, and I\u2019ll run down the rest."),
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
  const outPath = "/Users/evantaylor/Desktop 2/Claude Working Folder - Whiteny/Domain-Access-Recovery.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Wrote:", outPath);
});
