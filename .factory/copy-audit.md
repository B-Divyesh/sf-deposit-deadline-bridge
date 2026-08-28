# Copy audit — 2026-08-28

Tokenizer: split trimmed visible copy on whitespace. Hyphenated words, URLs, and inline code count as one word. Repeated navigation and footer labels are listed once. Sample field values are data, not sentences.

## Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Keep deposit and final-balance dates | 5 | Pass |
| For event and project businesses whose agreed payment dates disappear when a quote becomes an invoice. | 16 | Pass |
| Try it with sample data | 5 | Pass |
| Opens a complete two-payment schedule. | 5 | Pass; `demo-ready` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Your schedules stay in this browser. | 6 | Pass; `local-schedules` |
| One schedule is free. The full library costs $24 once. | 10 | Pass; `one-free-schedule` |
| Download two plain payment instructions to attach to an invoice. | 10 | Pass; `two-payment-export` |
| Add both deadlines to your calendar without typing them again. | 10 | Pass; `calendar-two-events` |
| Export both payment deadlines | 4 | Pass |
| Download one calendar file and two plain payment instructions. | 9 | Pass; `calendar-two-events`, `two-payment-export` |
| Check the email draft before your own email app opens it. | 11 | Pass; `confirm-reminder` |
| No automatic email sending. | 4 | Pass; `confirm-reminder` |
| No late fees or local rules added for you. | 9 | Pass; `no-added-rules` |
| License checks never include schedule details. | 6 | Pass; `license-private` |
| Keep every payment schedule | 4 | Pass |
| The free version keeps one current schedule. | 7 | Pass; `one-free-schedule` |
| Pay $24 once to save and reopen multiple schedules in this browser. | 12 | Pass; `one-free-schedule` |
| Read payment and refund terms | 5 | Pass; route link |

## README

| Copy | Words | Result |
| --- | ---: | --- |
| Keep deposit and final-balance dates intact when a quote becomes an invoice. | 11 | Pass |
| Deposit Deadline Bridge is for event, catering, and project businesses. | 10 | Pass |
| Record the deposit and final balance in a named time zone. | 11 | Pass |
| The app catches missing clock times and lets you choose when a clock time repeats. | 15 | Pass; `dst-precision` |
| Then export one calendar file and two payment instructions. | 9 | Pass; `calendar-two-events`, `two-payment-export` |
| Every reminder opens as an editable draft before your email app opens. | 12 | Pass; `confirm-reminder` |
| Demo changes are held in memory and are not saved to real schedules. | 13 | Pass; `demo-isolation` |
| Stores real schedules in this browser. | 6 | Pass; `local-schedules` |
| The $24 one-time license lets you save and reopen multiple schedules in this browser. | 14 | Pass; `one-free-schedule` |
| Sociobot handles checkout and license checks. | 6 | Pass |
| Schedule data stays in the browser. | 6 | Pass; `local-schedules` |
| The app has no analytics, advertising scripts, remote fonts, or automatic email sending. | 13 | Pass; `private-runtime`, `confirm-reminder` |
| A license check sends only the saved license token to `api.sociobot.in`. | 11 | Pass; `license-private` |
| After deployment, run `npm run test:live` to check routing, the product’s payment listing, and checkout. | 15 | Pass |
| Deploy the contents of `dist/` to Azure Static Web Apps. | 10 | Pass |
| The included configuration routes app pages correctly and applies browser security and caching settings. | 13 | Pass |

No audited sentence exceeds 22 words. No banned marketing words occur.

## Terminology table

| Concept | Product term |
| --- | --- |
| First payment | Deposit |
| Second payment | Final balance |
| Pair of dates and payment details | Payment schedule |
| Customer document identifier | Quote number |
| Test-only workspace | Demo |
| Saved browser collection | Schedule library |
