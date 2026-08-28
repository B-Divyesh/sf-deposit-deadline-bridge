# Copy audit — 2026-08-28

Tokenizer: split each trimmed visible sentence, heading, and control label on whitespace. Hyphenated words, URLs, and inline code count as one word. Repeated global navigation and footer labels appear once. Sample IDs, dates, amounts, and form values are data, not sentences.

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
| The attachment your invoice lacks | 5 | Pass |
| Two dates stay separate | 4 | Pass |
| Download two plain payment instructions to attach to an invoice. | 10 | Pass; `two-payment-export` |
| Add both deadlines to your calendar without typing them again. | 10 | Pass; `calendar-two-events` |
| How it works | 3 | Pass |
| Move both dates without retyping | 5 | Pass |
| Record the agreement | 3 | Pass |
| Add the deposit, final balance, local times, and exact time zone. | 11 | Pass |
| Export both payment deadlines | 4 | Pass |
| Download one calendar file and two plain payment instructions. | 9 | Pass; `calendar-two-events`, `two-payment-export` |
| Review each reminder | 3 | Pass |
| Check the email draft before your own email app opens it. | 11 | Pass; `confirm-reminder` |
| What the app does not do | 6 | Pass |
| It keeps dates, not money | 5 | Pass |
| No automatic email sending. | 4 | Pass; `confirm-reminder` |
| No late fees or local rules added for you. | 9 | Pass; `no-added-rules` |
| License checks never include schedule details. | 6 | Pass; `license-private` |
| One-time license | 2 | Pass |
| Keep every payment schedule | 4 | Pass |
| The free version keeps one current schedule. | 7 | Pass; `one-free-schedule` |
| Pay $24 once to save and reopen multiple schedules in this browser. | 12 | Pass; `one-free-schedule` |
| Buy the full library | 4 | Pass |
| Read payment and refund terms | 5 | Pass; route link |
| Keep two payment dates attached to one quote. | 8 | Pass |
| Built by Param Factory | 4 | Pass |
| Original generated ceramic artwork. | 4 | Pass; provenance in `assets/src/hero-ceramic.json` |

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
| Downloads one `.ics` calendar containing both deadlines and both reminder alarms. | 11 | Pass; `calendar-two-events` |
| Downloads or copies two payment instructions for an invoice or accounting system. | 12 | Pass; `two-payment-export`, `copy-payment-instructions` |
| Opens editable reminder email drafts only after confirmation. | 8 | Pass; `confirm-reminder` |
| Exports and imports a JSON backup. | 6 | Pass; `json-backup` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Keeps one current schedule for free. | 6 | Pass; `one-free-schedule` |
| The $24 one-time license lets you save and reopen multiple schedules in this browser. | 14 | Pass; `one-free-schedule` |
| Sociobot opens checkout and verifies a pasted license token. | 9 | Pass; `one-free-schedule` |
| Schedule data stays in the browser. | 6 | Pass; `local-schedules` |
| The app has no analytics, advertising scripts, remote fonts, or automatic email sending. | 13 | Pass; `private-runtime`, `confirm-reminder` |
| A license check sends only the saved license token to `api.sociobot.in`. | 11 | Pass; `license-private` |
| Choose the locale, currency, and time zone. | 8 | Pass; `schedule-settings` |
| Set your payment wording and reminder timing. | 7 | Pass; `schedule-settings` |
| The app does not invent late fees or local invoice rules. | 11 | Pass; `no-added-rules` |
| Open `http://localhost:5173`. | 2 | Pass for developers |
| The demo entry point is `http://localhost:5173/?demo=1`. | 6 | Pass for developers |
| `npm test` builds, serves, and checks the app in Chromium. | 9 | Pass for developers |
| Deploy `dist/` to Azure Static Web Apps. | 7 | Pass for developers |

No audited sentence exceeds 22 words. No banned marketing word occurs.

## Terminology table

| Concept | Product term |
| --- | --- |
| First payment | Deposit |
| Second payment | Final balance |
| Pair of dates and payment details | Payment schedule |
| Customer document identifier | Quote number |
| Test-only workspace | Demo |
| Saved browser collection | Schedule library |
