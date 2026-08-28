import './styles.css';
import { blankSchedule, isSchedule, sampleSchedule, timeZones, type Schedule } from './model';
import { analyzeLocalTime, calendarFile, displayDate, paymentInstructions, reminderDraft, safeFileName, zonedTimeToUtc } from './exports';
import { deleteSchedule, listSchedules, saveSchedule } from './storage';
import { cachedLicenseIsValid, captureLicense, checkoutUrl, removeLicense, storeLicense, verifyLicense } from './license';

const app = document.querySelector<HTMLDivElement>('#app')!;

const BUILD_ID = 'v1.0.3';
captureLicense();
let premium = cachedLicenseIsValid();
let schedule = blankSchedule();
let savedSchedules: Schedule[] = [];
let demoMode = false;
let licenseNotice = '';

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Deposit Deadline Bridge — preserve payment dates',
    description: 'Keep deposit and final-balance dates intact when a quote becomes an invoice.',
  },
  '/workspace': {
    title: 'Payment schedule — Deposit Deadline Bridge',
    description: 'Record, export, and remind clients about two agreed payment deadlines.',
  },
  '/demo': {
    title: 'Demo — Deposit Deadline Bridge',
    description: 'Try a complete sample deposit and final balance schedule without saving data.',
  },
  '/privacy': {
    title: 'Privacy — Deposit Deadline Bridge',
    description: 'How Deposit Deadline Bridge stores schedules and license details.',
  },
  '/terms': {
    title: 'Terms — Deposit Deadline Bridge',
    description: 'Terms for using Deposit Deadline Bridge and its one-time license.',
  },
  '/404': {
    title: 'Page not found — Deposit Deadline Bridge',
    description: 'The requested page was not found.',
  },
};

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function header(): string {
  return `
    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="site-header">
      <a class="wordmark" href="/" data-route aria-label="Deposit Deadline Bridge home">
        <svg aria-hidden="true" viewBox="0 0 54 30"><circle cx="10" cy="20" r="7"/><path d="M16 17c5-13 17-13 22 0"/><circle cx="44" cy="20" r="7"/></svg>
        <span>Deadline Bridge</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/demo" data-route>Demo</a>
        <a href="/workspace" data-route>Workspace</a>
        <a href="/privacy" data-route>Privacy</a>
      </nav>
    </header>`;
}

function footer(): string {
  return `
    <footer class="site-footer">
      <p>Keep two payment dates attached to one quote.</p>
      <div class="footer-links">
        <a href="/privacy" data-route>Privacy</a>
        <a href="/terms" data-route>Terms</a>
        <span>Built by Param Factory</span>
      </div>
      <p class="footer-note">${BUILD_ID} · Original generated ceramic artwork.</p>
    </footer>
    <div id="route-announcer" class="sr-only" aria-live="polite"></div>
    <div id="toast" class="toast" role="status" aria-live="polite" hidden></div>`;
}

function shell(content: string): string {
  return `${header()}${content}${footer()}`;
}

function landingPage(): string {
  return shell(`
    <main id="main">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Deposit Deadline Bridge</p>
          <h1 tabindex="-1">Keep deposit and final-balance dates</h1>
          <p class="hero-lede">For event and project businesses whose agreed payment dates disappear when a quote becomes an invoice.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="/demo" data-route>Try it with sample data</a>
            <span>Opens a complete two-payment schedule.</span>
          </div>
          <ul class="plain-facts" aria-label="Product facts">
            <li>Works offline after the first visit.</li>
            <li>Your schedules stay in this browser.</li>
            <li>One schedule is free. The full library costs $24 once.</li>
          </ul>
          <a class="text-action" href="/workspace" data-route>Create a blank schedule</a>
        </div>
        <picture class="hero-art">
          <source type="image/avif" srcset="/assets/hero-ceramic-768.avif 768w, /assets/hero-ceramic-1200.avif 1200w" sizes="(max-width: 760px) 100vw, 52vw" />
          <source type="image/webp" srcset="/assets/hero-ceramic-768.webp 768w, /assets/hero-ceramic-1200.webp 1200w" sizes="(max-width: 760px) 100vw, 52vw" />
          <img src="/assets/hero-ceramic-1200.jpg" width="1200" height="800" fetchpriority="high" decoding="async" alt="Two porcelain deadline markers joined by a cobalt ceramic bridge." />
        </picture>
      </section>

      <section class="live-preview" aria-labelledby="preview-title">
        <div class="section-heading">
          <p class="eyebrow">The attachment your invoice lacks</p>
          <h2 id="preview-title">Two dates stay separate</h2>
          <p>Download two plain payment instructions to attach to an invoice. Add both deadlines to your calendar without typing them again.</p>
        </div>
        <div class="preview-sheet" aria-label="Sample payment schedule preview">
          <div class="preview-head">
            <div><span>Quote</span><strong>HT-084</strong></div>
            <div><span>Project</span><strong>Highland Glasshouse Supper</strong></div>
            <div><span>Time zone</span><strong>America/New_York</strong></div>
          </div>
          <div class="milestone-pair">
            <article class="milestone-card">
              <p class="milestone-index">Payment 1</p>
              <h3>Deposit</h3>
              <p class="preview-amount">$2,400.00</p>
              <p>Due Sep 18, 2026 at 5:00 PM</p>
            </article>
            <div class="bridge-line" aria-hidden="true"><span></span></div>
            <article class="milestone-card">
              <p class="milestone-index">Payment 2</p>
              <h3>Final balance</h3>
              <p class="preview-amount">$5,600.00</p>
              <p>Due Oct 23, 2026 at 5:00 PM</p>
            </article>
          </div>
        </div>
      </section>

      <section class="steps" aria-labelledby="steps-title">
        <div class="section-heading"><p class="eyebrow">How it works</p><h2 id="steps-title">Move both dates without retyping</h2></div>
        <ol>
          <li><span>01</span><div><h3>Record the agreement</h3><p>Add the deposit, final balance, local times, and exact time zone.</p></div></li>
          <li><span>02</span><div><h3>Export both payment deadlines</h3><p>Download one calendar file and two plain payment instructions.</p></div></li>
          <li><span>03</span><div><h3>Review each reminder</h3><p>Check the email draft before your own email app opens it.</p></div></li>
        </ol>
      </section>

      <section class="boundaries" aria-labelledby="boundaries-title">
        <div><p class="eyebrow">Narrow on purpose</p><h2 id="boundaries-title">It keeps dates, not money</h2></div>
        <ul>
          <li>No automatic email sending.</li>
          <li>No late fees or local rules added for you.</li>
          <li>License checks never include schedule details.</li>
        </ul>
      </section>

      <section class="pricing" aria-labelledby="pricing-title">
        <div>
          <p class="eyebrow">One-time license</p>
          <h2 id="pricing-title">Keep every payment schedule</h2>
          <p>The free version keeps one current schedule. Pay $24 once to save and reopen multiple schedules in this browser.</p>
        </div>
        <div class="price-block">
          <p class="price"><span>$</span>24</p>
          <a class="button button-primary" href="${checkoutUrl()}">Buy the full library <span class="sr-only">(opens Sociobot checkout)</span></a>
          <p><a href="/terms" data-route>Read payment and refund terms</a></p>
        </div>
      </section>
    </main>`);
}

function field(name: string, label: string, value: string, type = 'text', attrs = ''): string {
  return `<div class="field"><label for="${name}">${label}</label><input id="${name}" name="${name}" type="${type}" value="${escapeHtml(value)}" ${attrs} /></div>`;
}

function occurrenceField(kind: 'deposit' | 'balance', occurrence: 0 | 1 | undefined): string {
  const selected = occurrence === 1 ? ' selected' : '';
  const label = kind === 'deposit' ? 'Deposit' : 'Final balance';
  return `<div class="field time-occurrence" id="${kind}-occurrence-field" hidden>
    <label for="${kind}Occurrence">${label} repeated-time occurrence</label>
    <select id="${kind}Occurrence" name="${kind}Occurrence" disabled>
      <option value="0">First occurrence</option>
      <option value="1"${selected}>Second occurrence</option>
    </select>
    <p class="field-help inline" id="${kind}-time-note" role="status"></p>
  </div>`;
}

function scheduleForm(): string {
  const s = schedule;
  const zoneOptions = Array.from(new Set([s.timeZone, ...timeZones])).map((zone) => `<option value="${escapeHtml(zone)}"></option>`).join('');
  const savedList = premium ? `
    <section class="saved-library" aria-labelledby="library-title">
      <div class="library-head"><div class="section-heading compact"><p class="eyebrow">Full library</p><h2 id="library-title">Saved schedules</h2></div><div><button class="button button-secondary" type="button" id="duplicate-schedule">Duplicate this schedule</button><button class="button button-primary" type="button" id="new-schedule">Create new schedule</button></div></div>
      ${savedSchedules.length ? `<ul>${savedSchedules.map((item) => `<li><button type="button" class="saved-item" data-load-id="${escapeHtml(item.id)}"><span>${escapeHtml(item.projectName || 'Untitled schedule')}</span><small>${escapeHtml(item.quoteNumber || 'No quote number')}</small></button><button type="button" class="icon-button" data-delete-id="${escapeHtml(item.id)}" aria-label="Delete ${escapeHtml(item.projectName || 'untitled schedule')}">Delete</button></li>`).join('')}</ul>` : '<p class="empty-library">Saved schedules will appear here after you save one.</p>'}
    </section>` : '';

  return `
    ${demoMode ? `<aside class="demo-banner" aria-label="Demo mode"><strong>Demo — sample data, nothing is saved</strong><div><button type="button" class="link-button" id="reset-demo">Reset demo</button><a href="/workspace" data-route>Start for real</a></div></aside>` : ''}
    <main id="main" class="workspace-main">
      <section class="workspace-intro">
        <div><p class="eyebrow">${demoMode ? 'Sample quote HT-084' : 'Local workspace'}</p><h1 tabindex="-1">Protect this quote’s payment dates</h1><p>Record each deadline once. Export files that carry both dates into your invoice, calendar, and email.</p></div>
        <div class="save-state" id="save-state" role="status">${demoMode ? 'Demo changes stay in this tab.' : 'Ready to edit.'}</div>
      </section>
      <div id="offline-note" class="offline-note" role="status" hidden>You are offline. Editing and exports still work.</div>
      <form id="schedule-form" novalidate>
        <section class="form-section" aria-labelledby="quote-title">
          <div class="form-section-heading"><span>01</span><div><h2 id="quote-title">Name the agreement</h2><p>Use the same names that appear on the accepted quote.</p></div></div>
          <div class="field-grid">
            ${field('quoteNumber', 'Quote number', s.quoteNumber, 'text', 'required autocomplete="off"')}
            ${field('projectName', 'Project or event', s.projectName, 'text', 'required autocomplete="organization-title"')}
            ${field('clientName', 'Client name', s.clientName, 'text', 'required autocomplete="name"')}
            ${field('clientEmail', 'Client email', s.clientEmail, 'email', 'autocomplete="email"')}
            ${field('eventDate', 'Event or delivery date (optional)', s.eventDate, 'date')}
            <div class="field"><label for="timeZone">Time zone for both deadlines</label><input id="timeZone" name="timeZone" value="${escapeHtml(s.timeZone)}" list="time-zones" required aria-describedby="time-zone-help" /><datalist id="time-zones">${zoneOptions}</datalist></div>
            ${field('locale', 'Number locale', s.locale, 'text', 'required inputmode="text" aria-describedby="locale-help"')}
            ${field('currency', 'Currency code', s.currency, 'text', 'required maxlength="3" pattern="[A-Za-z]{3}"')}
          </div>
          <p class="field-help" id="time-zone-help">Use a named time zone such as Europe/London. The app catches missing clock times and lets you choose either repeated time.</p>
          <p class="field-help" id="locale-help">Example: en-US. You choose the locale; the app adds no local invoice rules.</p>
        </section>

        <section class="form-section" aria-labelledby="payments-title">
          <div class="form-section-heading"><span>02</span><div><h2 id="payments-title">Keep the two payments separate</h2><p>Each date includes its local time and the time zone above.</p></div></div>
          <div class="editor-milestones">
            <fieldset class="milestone-editor">
              <legend><span>Payment 1</span> Deposit</legend>
              ${field('depositAmount', 'Deposit amount', s.deposit.amount, 'number', 'required min="0.01" step="0.01" inputmode="decimal"')}
              ${field('depositDue', 'Deposit due date and time', s.deposit.dueLocal, 'datetime-local', 'required aria-describedby="deposit-time-note"')}
              ${occurrenceField('deposit', s.deposit.occurrence)}
              ${field('depositReminder', 'Draft reminder this many days before', String(s.deposit.reminderDays), 'number', 'required min="0" max="90" step="1"')}
              <button class="button button-secondary draft-button" type="button" data-reminder="deposit">Review deposit email</button>
            </fieldset>
            <div class="editor-bridge" aria-hidden="true"><span></span></div>
            <fieldset class="milestone-editor">
              <legend><span>Payment 2</span> Final balance</legend>
              ${field('balanceAmount', 'Final balance amount', s.balance.amount, 'number', 'required min="0.01" step="0.01" inputmode="decimal"')}
              ${field('balanceDue', 'Final balance due date and time', s.balance.dueLocal, 'datetime-local', 'required aria-describedby="balance-time-note"')}
              ${occurrenceField('balance', s.balance.occurrence)}
              ${field('balanceReminder', 'Draft reminder this many days before', String(s.balance.reminderDays), 'number', 'required min="0" max="90" step="1"')}
              <button class="button button-secondary draft-button" type="button" data-reminder="balance">Review balance email</button>
            </fieldset>
          </div>
          <p id="date-error" class="form-error" role="alert" hidden>The final balance must be due after the deposit. Change one deadline.</p>
        </section>

        <section class="form-section" aria-labelledby="method-title">
          <div class="form-section-heading"><span>03</span><div><h2 id="method-title">Write the payment instructions</h2><p>These words appear in both exported payment sections.</p></div></div>
          <div class="field-grid one-column">
            <div class="field"><label for="paymentMethod">Payment method</label><textarea id="paymentMethod" name="paymentMethod" rows="2" required>${escapeHtml(s.paymentMethod)}</textarea></div>
            <div class="field"><label for="paymentReference">Payment reference or note</label><textarea id="paymentReference" name="paymentReference" rows="2" required>${escapeHtml(s.paymentReference)}</textarea></div>
          </div>
        </section>

        <section class="schedule-output" aria-labelledby="output-title">
          <div><p class="eyebrow">Ready for the next tool</p><h2 id="output-title">Export without retyping</h2><p id="summary-line">${summaryLine(s)}</p></div>
          <div class="export-actions">
            <button class="button button-primary" type="submit">${demoMode ? 'Check demo schedule' : 'Save schedule'}</button>
            <button class="button button-secondary" type="button" id="download-calendar">Download calendar</button>
            <button class="button button-secondary" type="button" id="download-instructions">Download payment instructions</button>
            <button class="button button-quiet" type="button" id="copy-instructions">Copy payment instructions</button>
            <button class="button button-quiet" type="button" id="export-backup">Export JSON backup</button>
            <label class="button button-quiet file-label" for="import-backup">Import JSON backup</label><input class="sr-only" type="file" id="import-backup" accept="application/json,.json" />
          </div>
        </section>
      </form>

      ${savedList}
      ${licensePanel()}
    </main>
    <dialog id="reminder-dialog" aria-labelledby="reminder-title">
      <form method="dialog" class="dialog-panel">
        <div class="dialog-head"><div><p class="eyebrow">Nothing sends automatically</p><h2 id="reminder-title">Review reminder email</h2></div><button class="icon-button" value="cancel" aria-label="Close email review">Close</button></div>
        <div class="field"><label for="email-subject">Subject</label><input id="email-subject" type="text" /></div>
        <div class="field"><label for="email-body">Message</label><textarea id="email-body" rows="11"></textarea></div>
        <p>Your email app opens only after you confirm.</p>
        <div class="dialog-actions"><button class="button button-secondary" value="cancel">Keep editing</button><button class="button button-primary" id="open-email" value="default">Open email app</button></div>
      </form>
    </dialog>`;
}

function licensePanel(): string {
  if (premium) return `
    <section class="license-panel" aria-labelledby="license-title"><div><p class="eyebrow">Full library active</p><h2 id="license-title">Your license is on this device</h2><p>You can save and reopen multiple schedules in this browser.</p></div><button class="button button-quiet" id="remove-license" type="button">Remove license</button></section>`;
  return `
    <section class="license-panel" aria-labelledby="license-title">
      <div><p class="eyebrow">One current schedule is free</p><h2 id="license-title">Keep every schedule for $24 once</h2><p>The license adds a library for multiple schedules in this browser. Core calendar, instructions, reminders, and backups stay free.</p></div>
      <div class="license-actions"><a class="button button-primary" href="${checkoutUrl()}">Buy the full library <span class="sr-only">(opens Sociobot checkout)</span></a><button class="button button-secondary" id="show-license" type="button">Paste a license</button></div>
      ${licenseNotice ? `<p class="license-notice" role="status">${escapeHtml(licenseNotice)}</p>` : ''}
      <form id="license-form" class="license-form" hidden><div class="field"><label for="license-token">License token</label><input id="license-token" autocomplete="off" spellcheck="false" /></div><button class="button button-primary" type="submit">Verify license</button><p id="license-message" role="status"></p></form>
    </section>`;
}

function summaryLine(s: Schedule): string {
  if (!s.deposit.dueLocal || !s.balance.dueLocal) return 'Add both deadlines to prepare the exports.';
  try {
    return `Deposit ${displayDate(s.deposit.dueLocal, s.timeZone, s.deposit.occurrence ?? 0)} · Final balance ${displayDate(s.balance.dueLocal, s.timeZone, s.balance.occurrence ?? 0)}`;
  } catch {
    return 'Check both dates before exporting.';
  }
}

function workspacePage(): string {
  return shell(scheduleForm());
}

function legalPage(kind: 'privacy' | 'terms'): string {
  const privacy = kind === 'privacy';
  return shell(`<main id="main" class="legal-page">
    <p class="eyebrow">Deposit Deadline Bridge</p>
    <h1 tabindex="-1">${privacy ? 'Your schedules stay with you' : 'Terms for using the bridge'}</h1>
    <p class="legal-lede">${privacy ? 'This page explains what is stored and when a network request happens.' : 'These terms keep a small local utility clear and fair.'}</p>
    ${privacy ? `
      <section><h2>Schedule data</h2><p>Real schedules are stored in this browser. Demo changes stay in memory and disappear when you leave or reset the demo.</p><p>The app does not send quote, client, payment, or date details to a server. JSON backup files are created only when you request them.</p></section>
      <section><h2>License data</h2><p>If you buy or restore a license, the license token and its latest verdict are stored in localStorage. The app sends only that token to the Sociobot license service.</p><p>Sociobot and Dodo process checkout details under their own policies.</p></section>
      <section><h2>Network and deletion</h2><p>App files load from this site and are cached for offline use. There are no analytics, advertising scripts, or third-party fonts.</p><p>Clear this site’s browser data to remove schedules and the license token. You can also remove the license inside the workspace.</p></section>` : `
      <section><h2>Use of the tool</h2><p>You remain responsible for checking every amount, date, time zone, reminder, and payment instruction before sharing it.</p><p>The app does not provide accounting, tax, legal, late-fee, or debt-collection advice.</p></section>
      <section><h2>One-time license</h2><p>The $24 license unlocks the full schedule library for this product. Sociobot and Dodo are the merchant of record and handle payment and refunds.</p><p>A refund or revoked license removes access to paid library features. Your free schedule and data exports remain available.</p></section>
      <section><h2>Availability</h2><p>The software is provided as-is under the MIT License. Keep JSON backups of records you cannot afford to lose.</p><p>These terms apply from August 28, 2026.</p></section>`}
  </main>`);
}

function notFoundPage(): string {
  return shell(`<main id="main" class="not-found"><div class="broken-bridge" aria-hidden="true"><span></span><i></i><span></span></div><p class="eyebrow">404</p><h1 tabindex="-1">This bridge ends here</h1><p>The page does not exist. Your saved schedules have not changed.</p><a class="button button-primary" href="/" data-route>Return home</a></main>`);
}

function readForm(): Schedule {
  const value = (id: string) => (document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`#${id}`)?.value ?? '').trim();
  return {
    ...schedule,
    quoteNumber: value('quoteNumber'),
    clientName: value('clientName'),
    clientEmail: value('clientEmail'),
    projectName: value('projectName'),
    eventDate: value('eventDate'),
    currency: value('currency').toUpperCase(),
    locale: value('locale'),
    timeZone: value('timeZone'),
    paymentMethod: value('paymentMethod'),
    paymentReference: value('paymentReference'),
    deposit: {
      amount: value('depositAmount'),
      dueLocal: value('depositDue'),
      occurrence: Number(value('depositOccurrence')) === 1 ? 1 : 0,
      reminderDays: Number(value('depositReminder')),
    },
    balance: {
      amount: value('balanceAmount'),
      dueLocal: value('balanceDue'),
      occurrence: Number(value('balanceOccurrence')) === 1 ? 1 : 0,
      reminderDays: Number(value('balanceReminder')),
    },
    updatedAt: new Date().toISOString(),
  };
}

function updateTimeDisambiguation(): boolean {
  const zone = document.querySelector<HTMLInputElement>('#timeZone')?.value.trim() ?? '';
  let allTimesExist = true;
  (['deposit', 'balance'] as const).forEach((kind) => {
    const due = document.querySelector<HTMLInputElement>(`#${kind === 'deposit' ? 'depositDue' : 'balanceDue'}`);
    const field = document.querySelector<HTMLElement>(`#${kind}-occurrence-field`);
    const choice = document.querySelector<HTMLSelectElement>(`#${kind}Occurrence`);
    const note = document.querySelector<HTMLElement>(`#${kind}-time-note`);
    if (!due || !field || !choice || !note || !due.value || !zone) {
      if (field) field.hidden = true;
      if (choice) choice.disabled = true;
      if (due) due.setCustomValidity('');
      return;
    }
    try {
      const analysis = analyzeLocalTime(due.value, zone);
      if (!analysis.candidates.length) {
        allTimesExist = false;
        field.hidden = true;
        choice.disabled = true;
        note.textContent = '';
        due.setCustomValidity(`This local time does not exist in ${zone}. Move it to a valid local time.`);
      } else if (analysis.candidates.length > 1) {
        field.hidden = false;
        choice.disabled = false;
        due.setCustomValidity('');
        note.textContent = `This clock time happens twice when daylight saving ends. Choose the occurrence you agreed (${analysis.offsetLabels.join(' or ')}).`;
      } else {
        field.hidden = true;
        choice.disabled = true;
        note.textContent = '';
        due.setCustomValidity('');
      }
    } catch {
      field.hidden = true;
      choice.disabled = true;
      note.textContent = '';
      due.setCustomValidity('');
    }
  });
  return allTimesExist;
}

function validSchedule(showErrors = true): boolean {
  const form = document.querySelector<HTMLFormElement>('#schedule-form');
  if (!form) return false;
  schedule = readForm();
  const zoneInput = document.querySelector<HTMLInputElement>('#timeZone');
  try {
    new Intl.DateTimeFormat('en', { timeZone: schedule.timeZone }).format();
    zoneInput?.setCustomValidity('');
  } catch {
    zoneInput?.setCustomValidity('Enter a valid named time zone, such as Europe/London.');
  }
  const allTimesExist = updateTimeDisambiguation();
  let dateOrder = false;
  try {
    dateOrder = zonedTimeToUtc(schedule.balance.dueLocal, schedule.timeZone, schedule.balance.occurrence ?? 0).getTime() > zonedTimeToUtc(schedule.deposit.dueLocal, schedule.timeZone, schedule.deposit.occurrence ?? 0).getTime();
  } catch { /* native form reports missing dates */ }
  const dateError = document.querySelector<HTMLElement>('#date-error');
  if (dateError) dateError.hidden = dateOrder || !schedule.deposit.dueLocal || !schedule.balance.dueLocal;
  const nativeValid = form.checkValidity();
  if (showErrors && !nativeValid) form.reportValidity();
  if (showErrors && nativeValid && !dateOrder) document.querySelector<HTMLInputElement>('#balanceDue')?.focus();
  return nativeValid && allTimesExist && dateOrder;
}

function toast(message: string): void {
  const element = document.querySelector<HTMLElement>('#toast');
  if (!element) return;
  element.textContent = message;
  element.hidden = false;
  window.setTimeout(() => { element.hidden = true; }, 3200);
}

function download(name: string, content: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function copyText(content: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(content);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = content;
  textarea.setAttribute('readonly', '');
  textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Clipboard unavailable');
}

function updateSummary(): void {
  schedule = readForm();
  const summary = document.querySelector<HTMLElement>('#summary-line');
  if (summary) summary.textContent = summaryLine(schedule);
  const saveState = document.querySelector<HTMLElement>('#save-state');
  if (saveState) saveState.textContent = demoMode ? 'Demo changed. Nothing is saved.' : 'Unsaved changes.';
  validSchedule(false);
}

function bindWorkspace(): void {
  const form = document.querySelector<HTMLFormElement>('#schedule-form');
  form?.addEventListener('input', updateSummary);

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validSchedule()) return;
    if (demoMode) {
      const status = document.querySelector<HTMLElement>('#save-state');
      if (status) status.textContent = 'Schedule checks passed. Demo data was not saved.';
      toast('Both demo deadlines are ready to export.');
      return;
    }
    try {
      if (!premium) {
        const existing = await listSchedules();
        await Promise.all(existing.filter((item) => item.id !== schedule.id).map((item) => deleteSchedule(item.id)));
      }
      await saveSchedule(schedule);
      savedSchedules = await listSchedules();
      const status = document.querySelector<HTMLElement>('#save-state');
      if (status) status.textContent = 'Saved in this browser.';
      toast('Schedule saved in this browser.');
      if (premium) await renderRoute(false);
    } catch {
      const status = document.querySelector<HTMLElement>('#save-state');
      if (status) status.textContent = 'The schedule could not be saved. Export a JSON backup, then try again.';
    }
  });

  document.querySelector('#download-calendar')?.addEventListener('click', () => {
    if (!validSchedule()) return;
    download(`${safeFileName(schedule.quoteNumber)}-deadlines.ics`, calendarFile(schedule), 'text/calendar;charset=utf-8');
    toast('Calendar downloaded with two payment events.');
  });
  document.querySelector('#download-instructions')?.addEventListener('click', () => {
    if (!validSchedule()) return;
    download(`${safeFileName(schedule.quoteNumber)}-payment-instructions.txt`, paymentInstructions(schedule), 'text/plain;charset=utf-8');
    toast('Two payment instructions downloaded.');
  });
  document.querySelector('#copy-instructions')?.addEventListener('click', async () => {
    if (!validSchedule()) return;
    try {
      await copyText(paymentInstructions(schedule));
      toast('Two payment instructions copied.');
    } catch {
      toast('The browser blocked copying. Download the text file instead.');
    }
  });
  document.querySelector('#export-backup')?.addEventListener('click', () => {
    schedule = readForm();
    download(`${safeFileName(schedule.quoteNumber)}-deadline-bridge.json`, JSON.stringify({ version: 1, schedule }, null, 2), 'application/json');
    toast('JSON backup downloaded.');
  });
  document.querySelector<HTMLInputElement>('#import-backup')?.addEventListener('change', async (event) => {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text()) as { schedule?: unknown };
      if (!isSchedule(data.schedule)) throw new Error('invalid');
      schedule = { ...data.schedule, id: demoMode ? sampleSchedule.id : data.schedule.id, updatedAt: new Date().toISOString() };
      await renderRoute(false);
      toast(demoMode ? 'Backup loaded into this demo tab.' : 'Backup loaded. Save it when ready.');
    } catch {
      toast('That file is not a Deposit Deadline Bridge backup. Choose another file.');
      input.value = '';
    }
  });

  document.querySelectorAll<HTMLButtonElement>('.draft-button').forEach((button) => {
    button.addEventListener('click', () => openReminder(button.dataset.reminder as 'deposit' | 'balance'));
  });
  document.querySelector('#reset-demo')?.addEventListener('click', async () => {
    schedule = structuredClone(sampleSchedule);
    await renderRoute(false);
    toast('Demo reset to the sample quote.');
  });
  document.querySelectorAll<HTMLButtonElement>('[data-load-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      const found = savedSchedules.find((item) => item.id === button.dataset.loadId);
      if (found) { schedule = structuredClone(found); await renderRoute(false); }
    });
  });
  document.querySelector('#new-schedule')?.addEventListener('click', async () => {
    schedule = blankSchedule();
    await renderRoute(false);
    document.querySelector<HTMLInputElement>('#quoteNumber')?.focus();
  });
  document.querySelector('#duplicate-schedule')?.addEventListener('click', async () => {
    schedule = { ...readForm(), id: crypto.randomUUID(), quoteNumber: `${readForm().quoteNumber}-copy`, updatedAt: new Date().toISOString() };
    await renderRoute(false);
    document.querySelector<HTMLInputElement>('#quoteNumber')?.focus();
    toast('Copy ready. Change the quote details, then save it.');
  });
  document.querySelectorAll<HTMLButtonElement>('[data-delete-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      const found = savedSchedules.find((item) => item.id === button.dataset.deleteId);
      if (!found || !confirm(`Delete the saved schedule for ${found.projectName || 'this quote'}?`)) return;
      await deleteSchedule(found.id);
      savedSchedules = await listSchedules();
      if (schedule.id === found.id) schedule = blankSchedule();
      await renderRoute(false);
      toast('Saved schedule deleted.');
    });
  });
  bindLicense();
  updateOnlineState();
  updateTimeDisambiguation();
}

function openReminder(kind: 'deposit' | 'balance'): void {
  if (!validSchedule()) return;
  const draft = reminderDraft(schedule, kind);
  const dialog = document.querySelector<HTMLDialogElement>('#reminder-dialog');
  const subject = document.querySelector<HTMLInputElement>('#email-subject');
  const body = document.querySelector<HTMLTextAreaElement>('#email-body');
  if (!dialog || !subject || !body) return;
  subject.value = draft.subject;
  body.value = draft.body;
  const openButton = document.querySelector<HTMLButtonElement>('#open-email');
  openButton?.addEventListener('click', (event) => {
    event.preventDefault();
    const params = new URLSearchParams({ subject: subject.value, body: body.value });
    openEmailApp(`mailto:${encodeURIComponent(schedule.clientEmail)}?${params.toString()}`);
    dialog.close();
  }, { once: true });
  dialog.showModal();
}

function openEmailApp(target: string): void {
  const link = document.createElement('a');
  link.href = target;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
}

function bindLicense(): void {
  document.querySelector('#show-license')?.addEventListener('click', () => {
    const form = document.querySelector<HTMLFormElement>('#license-form');
    if (form) { form.hidden = false; document.querySelector<HTMLInputElement>('#license-token')?.focus(); }
  });
  document.querySelector<HTMLFormElement>('#license-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const token = document.querySelector<HTMLInputElement>('#license-token')?.value.trim() ?? '';
    const message = document.querySelector<HTMLElement>('#license-message');
    if (!token) { if (message) message.textContent = 'Paste the license token from your receipt.'; return; }
    storeLicense(token);
    if (message) message.textContent = 'Checking the license…';
    try {
      premium = await verifyLicense(true);
      if (!premium) {
        licenseNotice = 'License no longer active. The free schedule and exports still work.';
        if (message) message.textContent = 'This license is not active. Check the token or buy a new license.';
        return;
      }
      licenseNotice = '';
      savedSchedules = await listSchedules();
      await renderRoute(false);
      toast('Full schedule library unlocked.');
    } catch {
      if (message) message.textContent = 'The license service could not be reached. Check your connection and try again.';
    }
  });
  document.querySelector('#remove-license')?.addEventListener('click', async () => {
    removeLicense();
    premium = false;
    await renderRoute(false);
    toast('License removed from this device.');
  });
}

function bindRoutes(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[data-route]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(link.pathname);
    });
  });
}

function navigate(path: string): void {
  if (demoMode && path !== '/demo') schedule = blankSchedule();
  history.pushState({}, '', path);
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  void renderRoute(true);
}

function updateOnlineState(): void {
  const note = document.querySelector<HTMLElement>('#offline-note');
  if (note) note.hidden = navigator.onLine;
}

async function renderRoute(focusHeading = true): Promise<void> {
  const known = ['/', '/workspace', '/demo', '/privacy', '/terms'];
  const path = known.includes(location.pathname) ? location.pathname : '/404';
  demoMode = path === '/demo';
  if (path === '/demo' && schedule.id !== sampleSchedule.id) schedule = structuredClone(sampleSchedule);
  if (path === '/workspace') {
    savedSchedules = await listSchedules().catch(() => []);
    if (!schedule.quoteNumber && savedSchedules.length) schedule = structuredClone(savedSchedules[0]);
  }
  const meta = pageMeta[path];
  document.title = meta.title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', meta.description);
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', `https://deposit-deadline-bridge.sociobot.in${path === '/' ? '/' : path}`);
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', meta.title);
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', meta.description);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', meta.title);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', meta.description);
  if (path === '/') app.innerHTML = landingPage();
  else if (path === '/workspace' || path === '/demo') app.innerHTML = workspacePage();
  else if (path === '/privacy' || path === '/terms') app.innerHTML = legalPage(path.slice(1) as 'privacy' | 'terms');
  else app.innerHTML = notFoundPage();
  bindRoutes();
  if (path === '/workspace' || path === '/demo') bindWorkspace();
  if (focusHeading) {
    const heading = document.querySelector<HTMLHeadingElement>('h1');
    heading?.focus();
    const announcer = document.querySelector<HTMLElement>('#route-announcer');
    if (announcer && heading) announcer.textContent = heading.textContent;
  }
}

function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker?.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) toast('An update is ready. Reload to use it.');
        });
      });
    } catch { /* The page remains usable without installation support. */ }
  });
}

window.addEventListener('popstate', () => void renderRoute(true));
window.addEventListener('online', updateOnlineState);
window.addEventListener('offline', updateOnlineState);
void renderRoute(false);
registerServiceWorker();

if (localStorage.getItem('sb_license:deposit-deadline-bridge')) {
  void verifyLicense().then(async (valid) => {
    if (!valid) licenseNotice = 'License no longer active. The free schedule and exports still work.';
    if (!valid || premium !== valid) { premium = valid; await renderRoute(false); }
  }).catch(() => { /* Keep the cached verdict while offline. */ });
}
