/**
 * The copy audit is deliberately data-driven. The Playwright regression test
 * checks these entries against the rendered landing page and README, while the
 * generator below writes the human-readable evidence file.
 */

export const auditSections = [
  {
    title: 'Landing page',
    source: 'rendered landing page, including the shared header and footer',
    entries: [
      ['Skip to main content', 'Pass; keyboard action'],
      ['Deadline Bridge', 'Pass; wordmark'],
      ['Demo', 'Pass; navigation'],
      ['Workspace', 'Pass; navigation'],
      ['Privacy', 'Pass; navigation'],
      ['Deposit Deadline Bridge', 'Pass; product label'],
      ['Keep deposit and final balance dates', 'Pass; h1'],
      ['For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice.', 'Pass; audience'],
      ['Try it with sample data', 'Pass; result-naming action'],
      ['Opens a complete two-payment schedule.', 'Pass; @claim:demo-ready'],
      ['Works offline after the first visit.', 'Pass; @claim:offline-reload'],
      ['Your schedules stay in this browser.', 'Pass; @claim:local-schedules'],
      ['One schedule is free.', 'Pass; @claim:one-free-schedule'],
      ['The full library costs $24 once.', 'Pass; @claim:one-free-schedule'],
      ['Create a blank schedule', 'Pass; result-naming action'],
      ['Payment schedule preview', 'Pass; h2'],
      ['Download two plain payment instructions to attach to an invoice.', 'Pass; @claim:two-payment-export'],
      ['Add both deadlines to your calendar without typing them again.', 'Pass; @claim:calendar-two-events'],
      ['How it works', 'Pass; section label'],
      ['How to record and export payment dates', 'Pass; h2'],
      ['Record the agreement', 'Pass; h3'],
      ['Add the deposit, final balance, local times, and exact time zone.', 'Pass'],
      ['Export both payment deadlines', 'Pass; h3'],
      ['Download one calendar file and two plain payment instructions.', 'Pass; export claims'],
      ['Review each reminder', 'Pass; h3'],
      ['Check the email draft before your own email app opens it.', 'Pass; @claim:confirm-reminder'],
      ['What this app records and does not handle', 'Pass; h2'],
      ['No automatic email sending.', 'Pass; @claim:confirm-reminder'],
      ['No late fees or local rules added for you.', 'Pass; @claim:no-added-rules'],
      ['License checks never include schedule details.', 'Pass; @claim:license-private'],
      ['One-time license', 'Pass; pricing label'],
      ['Keep multiple payment schedules', 'Pass; h2'],
      ['The free version keeps one current schedule.', 'Pass; @claim:one-free-schedule'],
      ['Pay $24 once to save and reopen multiple schedules in this browser.', 'Pass; @claim:one-free-schedule'],
      ['Buy the full library', 'Pass; result-naming action'],
      ['opens Sociobot checkout', 'Pass; accessible action qualifier'],
      ['Read refund policy and terms', 'Pass; result-naming action'],
      ['Keep two payment dates attached to one quote.', 'Pass; footer description'],
      ['Terms', 'Pass; footer navigation'],
      ['Built by Param Factory', 'Pass; footer attribution'],
      ['Original generated ceramic artwork.', 'Pass; provenance'],
    ],
  },
  {
    title: 'README',
    source: 'README.md rendered as Markdown',
    entries: [
      ['Deposit Deadline Bridge', 'Pass; title'],
      ['Keep deposit and final balance dates intact when a quote becomes an invoice.', 'Pass; opening'],
      ['Deposit Deadline Bridge is for event, catering, and project businesses.', 'Pass; audience'],
      ['Record the deposit and final balance in a named time zone.', 'Pass'],
      ['The app catches missing clock times and lets you choose when a clock time repeats.', 'Pass; @claim:dst-precision'],
      ['Then export one calendar file and two payment instructions.', 'Pass; export claims'],
      ['Every reminder opens as an editable draft before your email app opens.', 'Pass; @claim:confirm-reminder'],
      ['Live site: https://deposit-deadline-bridge.sociobot.in', 'Pass'],
      ['Try the isolated demo', 'Pass; h2'],
      ['Open https://deposit-deadline-bridge.sociobot.in/?demo=1 or run the site locally and visit `/?demo=1`.', 'Pass'],
      ['The sample is quote HT-084 for the Highland Glasshouse Supper.', 'Pass; @claim:demo-ready'],
      ['Demo changes are held in memory and are not saved to real schedules.', 'Pass; @claim:demo-isolation'],
      ['Select Reset demo to restore the sample.', 'Pass'],
      ['What v1 does', 'Pass; h2'],
      ['Stores real schedules in this browser.', 'Pass; @claim:local-schedules'],
      ['Keeps the deposit and final balance as separate dated payments.', 'Pass; export claims'],
      ['Downloads one calendar file with both deadlines and reminders.', 'Pass; @claim:calendar-two-events'],
      ['Downloads or copies two payment instructions for an invoice or accounting system.', 'Pass; export claims'],
      ['Opens editable reminder email drafts only after confirmation.', 'Pass; @claim:confirm-reminder'],
      ['Downloads a backup file and restores a schedule from one.', 'Pass; @claim:json-backup'],
      ['Works offline after the first visit.', 'Pass; @claim:offline-reload'],
      ['Keeps one current schedule for free.', 'Pass; @claim:one-free-schedule'],
      ['The $24 one-time license lets you save and reopen multiple schedules in this browser.', 'Pass; @claim:one-free-schedule'],
      ['Sociobot opens checkout and verifies returned or pasted license tokens.', 'Pass; @claim:one-free-schedule'],
      ['If a license becomes inactive, its schedule library closes.', 'Pass; @claim:license-revocation'],
      ['One free schedule and exports remain available.', 'Pass; @claim:license-revocation'],
      ['Privacy and scope', 'Pass; h2'],
      ['Schedule data stays in the browser.', 'Pass; @claim:local-schedules'],
      ['The app has no analytics, advertising scripts, remote fonts, or automatic email sending.', 'Pass; privacy and reminder claims'],
      ['A license check sends only the saved license token to `api.sociobot.in`.', 'Pass; @claim:license-private'],
      ['The browser stores a restored license token and its latest verification result.', 'Pass; @claim:license-local-storage'],
      ['Remove license clears those values without removing a schedule.', 'Pass; @claim:data-deletion'],
      ['Clearing this site’s browser data clears both.', 'Pass; @claim:data-deletion'],
      ['Choose the locale, currency, and time zone.', 'Pass; @claim:schedule-settings'],
      ['Set your payment wording and reminder timing.', 'Pass; @claim:schedule-settings'],
      ['The app does not invent late fees or local invoice rules.', 'Pass; @claim:no-added-rules'],
      ['See `/privacy` and `/terms`.', 'Pass'],
      ['The Terms page includes a 14-day refund request email link.', 'Pass; @claim:refund-request'],
      ['Develop', 'Pass; h2'],
      ['Requirements: Node.js 20 or newer and npm.', 'Pass; developer context'],
      ['Open `http://localhost:5173`.', 'Pass; developer context'],
      ['The demo entry point is `http://localhost:5173/?demo=1`.', 'Pass; developer context'],
      ['Calendar downloads use `.ics`; backup files use JSON.', 'Pass; developer context'],
      ['Test and build', 'Pass; h2'],
      ['`npm test` builds and serves the production app, then runs the claim and accessibility checks in Chromium.', 'Pass; developer context'],
      ['The exact production build command is `npm run build`.', 'Pass; developer context'],
      ['Static output lands in `dist/`, with `dist/index.html` at its root.', 'Pass; developer context'],
      ['After deployment, run `npm run test:live` to check routing, the product’s payment listing, and checkout.', 'Pass; developer context'],
      ['Claim definitions and their sandbox steps are in `.factory/claims.json`.', 'Pass; developer context'],
      ['The demo contract is in `.factory/demo.md`.', 'Pass; developer context'],
      ['Deploy', 'Pass; h2'],
      ['Deploy the contents of `dist/` to Azure Static Web Apps.', 'Pass; developer context'],
      ['The included configuration routes app pages correctly and applies browser security and caching settings.', 'Pass; developer context'],
      ['The factory owns DNS and billing registration.', 'Pass; developer context'],
      ['License', 'Pass; h2'],
      ['MIT.', 'Pass'],
      ['See LICENSE.', 'Pass'],
    ],
  },
];

export const catalogEntry = 'Keep deposit and final balance dates when quotes become invoices.';

export function wordCount(copy) {
  return copy.trim().split(/\s+/).filter(Boolean).length;
}

function markdownCell(copy) {
  return copy.replaceAll('|', '\\|');
}

export function renderCopyAudit() {
  const sections = auditSections.map(({ title, source, entries }) => {
    const rows = entries.map(([copy, result]) => `| ${markdownCell(copy)} | ${wordCount(copy)} | ${result} |`).join('\n');
    return `## ${title}\n\nSource: ${source}.\n\n| Copy | Words | Result |\n| --- | ---: | --- |\n${rows}`;
  }).join('\n\n');
  const maxWords = Math.max(...auditSections.flatMap((section) => section.entries.map(([copy]) => wordCount(copy))));

  return `# Copy audit\n\nThis file is generated by \`npm run audit:copy\`. The regression test runs the generator in check mode, compares every row and whitespace-delimited count with the committed file, then checks every landing row against rendered copy and every README row against rendered Markdown.\n\nInclusion rule: include every visible landing-page heading, sentence, navigation or footer label, and action label once. Include every README heading, paragraph sentence, list item, and developer instruction. Repeated shared navigation appears once. Sample IDs, form labels, field values, amounts, and dates are product data rather than audit copy. Inline-code spans and URLs count as one whitespace-delimited word.\n\n${sections}\n\n## Catalog\n\n| Copy | Words | Result |\n| --- | ---: | --- |\n| ${catalogEntry} | ${wordCount(catalogEntry)} | Pass; verb-first and under 120 characters |\n\n## Terminology table\n\n| Concept | Product term |\n| --- | --- |\n| First payment | Deposit |\n| Second payment | Final balance |\n| Pair of dates and payment details | Payment schedule |\n| Customer document identifier | Quote number |\n| Test-only workspace | Demo |\n| Saved browser collection | Schedule library |\n\nNo audited unit exceeds 22 words (maximum: ${maxWords}). No banned marketing word, metaphor/mood heading, inconsistent payment term, or non-result action appears in the audited visitor copy.\n`;
}
