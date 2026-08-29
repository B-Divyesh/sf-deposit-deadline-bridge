# Copy audit — 2026-08-29

Tokenizer: split each trimmed visible sentence, heading, and control label on whitespace. Hyphenated words, URLs, and inline code count as one word. Repeated global navigation and footer labels appear once. Sample IDs, dates, amounts, and form values are data, not sentences. The lists below were checked against the rendered landing, legal routes, and README.

## Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Deposit Deadline Bridge | 3 | Pass |
| Keep deposit and final balance dates | 6 | Pass |
| For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice. | 18 | Pass |
| Try it with sample data | 5 | Pass |
| Opens a complete two-payment schedule. | 5 | Pass; `demo-ready` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Your schedules stay in this browser. | 6 | Pass; `local-schedules` |
| One schedule is free. The full library costs $24 once. | 10 | Pass; `one-free-schedule` |
| Create a blank schedule | 4 | Pass |
| Payment schedule preview | 3 | Pass; literal h2 |
| Download two plain payment instructions to attach to an invoice. | 10 | Pass; `two-payment-export` |
| Add both deadlines to your calendar without typing them again. | 10 | Pass; `calendar-two-events` |
| How it works | 3 | Pass |
| How to record and export payment dates | 7 | Pass; literal h2 |
| Record the agreement | 3 | Pass |
| Add the deposit, final balance, local times, and exact time zone. | 11 | Pass |
| Export both payment deadlines | 4 | Pass |
| Download one calendar file and two plain payment instructions. | 9 | Pass; `calendar-two-events`, `two-payment-export` |
| Review each reminder | 3 | Pass |
| Check the email draft before your own email app opens it. | 11 | Pass; `confirm-reminder` |
| What this app records and does not handle | 8 | Pass; literal h2 |
| No automatic email sending. | 4 | Pass; `confirm-reminder` |
| No late fees or local rules added for you. | 9 | Pass; `no-added-rules` |
| License checks never include schedule details. | 6 | Pass; `license-private` |
| One-time license | 2 | Pass |
| Keep multiple payment schedules | 4 | Pass; `one-free-schedule` |
| The free version keeps one current schedule. | 7 | Pass; `one-free-schedule` |
| Pay $24 once to save and reopen multiple schedules in this browser. | 12 | Pass; `one-free-schedule` |
| Buy the full library | 4 | Pass |
| Read refund policy and terms | 5 | Pass |
| Keep two payment dates attached to one quote. | 8 | Pass |
| Built by Param Factory | 4 | Pass |
| Original generated ceramic artwork. | 4 | Pass; provenance is recorded |

## Legal routes

| Copy | Words | Result |
| --- | ---: | --- |
| How your schedules are stored | 5 | Pass |
| Real schedules are stored in this browser. | 7 | Pass; `local-schedules` |
| Demo changes stay in memory and disappear when you leave or reset the demo. | 13 | Pass; `demo-isolation` |
| The app does not send quote, client, payment, or date details to a server. | 14 | Pass; `local-schedules` |
| This browser stores the license token and its latest verification result. | 11 | Pass; `license-local-storage` |
| The app sends only that token to the Sociobot license service. | 11 | Pass; `license-private` |
| Clear this site’s browser data to remove schedules and the license token. | 12 | Pass; `data-deletion` |
| You can also remove the license inside the workspace. | 10 | Pass; `data-deletion` |
| Terms for Deposit Deadline Bridge | 5 | Pass |
| Calendar exports, payment instructions, reminder review, and backup files stay free. | 11 | Pass; `free-core-features` |
| When a license check reports an inactive license, the paid library closes. | 12 | Pass; `license-revocation` |
| One free schedule and exports remain available. | 7 | Pass; `license-revocation` |
| You can ask for a refund within 14 days of purchase. | 11 | Pass; `refund-request` |
| Request a refund by email | 5 | Pass; `refund-request` |
| Include the email address used at checkout and your receipt. | 10 | Pass |
| Page not found | 3 | Pass |
| The page does not exist. Your saved schedules have not changed. | 11 | Pass |

## README

| Copy | Words | Result |
| --- | ---: | --- |
| Keep deposit and final balance dates intact when a quote becomes an invoice. | 12 | Pass |
| Deposit Deadline Bridge is for event, catering, and project businesses. | 10 | Pass |
| Record the deposit and final balance in a named time zone. | 11 | Pass |
| The app catches missing clock times and lets you choose when a clock time repeats. | 15 | Pass; `dst-precision` |
| Then export one calendar file and two payment instructions. | 9 | Pass; `calendar-two-events`, `two-payment-export` |
| Every reminder opens as an editable draft before your email app opens. | 12 | Pass; `confirm-reminder` |
| Open the isolated demo. | 4 | Pass |
| The sample is quote HT-084 for the Highland Glasshouse Supper. | 10 | Pass; `demo-ready` |
| Demo changes are held in memory and are not saved to real schedules. | 13 | Pass; `demo-isolation` |
| Select Reset demo to restore the sample. | 7 | Pass |
| Stores real schedules in this browser. | 6 | Pass; `local-schedules` |
| Keeps the deposit and final balance as separate dated payments. | 10 | Pass; `calendar-two-events`, `two-payment-export` |
| Downloads one calendar file with both deadlines and reminders. | 9 | Pass; `calendar-two-events` |
| Downloads or copies two payment instructions for an invoice or accounting system. | 12 | Pass; `two-payment-export`, `copy-payment-instructions` |
| Opens editable reminder email drafts only after confirmation. | 8 | Pass; `confirm-reminder` |
| Downloads a backup file and restores a schedule from one. | 10 | Pass; `json-backup` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Keeps one current schedule for free. | 6 | Pass; `one-free-schedule` |
| The $24 one-time license lets you save and reopen multiple schedules in this browser. | 14 | Pass; `one-free-schedule` |
| Sociobot opens checkout and verifies returned or pasted license tokens. | 10 | Pass; `one-free-schedule` |
| If a license becomes inactive, its schedule library closes. | 9 | Pass; `license-revocation` |
| One free schedule and exports remain available. | 7 | Pass; `license-revocation` |
| Schedule data stays in the browser. | 6 | Pass; `local-schedules` |
| The app has no analytics, advertising scripts, remote fonts, or automatic email sending. | 13 | Pass; `private-runtime`, `confirm-reminder` |
| A license check sends only the saved license token to `api.sociobot.in`. | 11 | Pass; `license-private` |
| The browser stores a restored license token and its latest verification result. | 12 | Pass; `license-local-storage` |
| Remove license clears those values without removing a schedule. | 9 | Pass; `data-deletion` |
| Clearing this site’s browser data clears both. | 8 | Pass; `data-deletion` |
| Choose the locale, currency, and time zone. | 8 | Pass; `schedule-settings` |
| Set your payment wording and reminder timing. | 7 | Pass; `schedule-settings` |
| The app does not invent late fees or local invoice rules. | 11 | Pass; `no-added-rules` |
| The Terms page includes a 14-day refund request email link. | 10 | Pass; `refund-request` |
| Open `http://localhost:5173`. | 2 | Pass for developers |
| The demo entry point is `http://localhost:5173/?demo=1`. | 6 | Pass for developers |
| Calendar downloads use `.ics`; backup files use JSON. | 8 | Pass for developers |
| `npm test` builds, serves, and checks the app in Chromium. | 9 | Pass for developers |
| Deploy `dist/` to Azure Static Web Apps. | 7 | Pass for developers |

No audited sentence exceeds 22 words. No banned marketing word occurs.

## Catalog

| Copy | Words | Result |
| --- | ---: | --- |
| Keep deposit and final balance dates when a quote becomes an invoice. | 12 | Pass; verb-first and 69 characters |

## Terminology table

| Concept | Product term |
| --- | --- |
| First payment | Deposit |
| Second payment | Final balance |
| Pair of dates and payment details | Payment schedule |
| Customer document identifier | Quote number |
| Test-only workspace | Demo |
| Saved browser collection | Schedule library |
