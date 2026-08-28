import type { Schedule } from './model';

function formatMoney(value: string, currency: string, locale: string): string {
  const amount = Number(value || 0);
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function displayDate(value: string, timeZone: string, occurrence = 0): string {
  if (!value) return 'Date not set';
  const date = zonedTimeToUtc(value, timeZone, occurrence);
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
    timeZoneName: 'short',
  }).format(date);
}

type LocalTimeAnalysis = { candidates: Date[]; offsetLabels: string[] };

function localParts(date: Date, timeZone: string): Record<string, string> {
  return Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date).map((part) => [part.type, part.value]));
}

function parseLocalTime(value: string): { wanted: number; parts: [string, string, string, string, string] } {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!match) throw new Error('Enter a complete date and time.');
  return {
    wanted: Date.UTC(+match[1], +match[2] - 1, +match[3], +match[4], +match[5]),
    parts: [match[1], match[2], match[3], match[4], match[5]],
  };
}

function offsetLabel(date: Date, timeZone: string): string {
  const name = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset',
  }).formatToParts(date).find((part) => part.type === 'timeZoneName')?.value;
  return name || 'UTC offset';
}

/**
 * Resolves all real instants matching a local date/time. A daylight-saving gap
 * has no candidates; a repeated clock hour has two. Sampling offsets around
 * the requested wall time handles zones with non-hour offsets too.
 */
export function analyzeLocalTime(value: string, timeZone: string): LocalTimeAnalysis {
  const { wanted, parts: target } = parseLocalTime(value);
  // This validates the IANA identifier before working out offsets.
  const offsets = new Set<number>();
  for (let timestamp = wanted - 36 * 3_600_000; timestamp <= wanted + 36 * 3_600_000; timestamp += 3_600_000) {
    const rendered = localParts(new Date(timestamp), timeZone);
    offsets.add(Date.UTC(+rendered.year, +rendered.month - 1, +rendered.day, +rendered.hour, +rendered.minute) - timestamp);
  }
  const candidates = [...offsets]
    .map((offset) => new Date(wanted - offset))
    .filter((date) => {
      const rendered = localParts(date, timeZone);
      return [rendered.year, rendered.month, rendered.day, rendered.hour, rendered.minute].every((part, index) => part === target[index]);
    })
    .sort((a, b) => a.getTime() - b.getTime());
  return { candidates, offsetLabels: candidates.map((candidate) => offsetLabel(candidate, timeZone)) };
}

export function zonedTimeToUtc(value: string, timeZone: string, occurrence = 0): Date {
  const analysis = analyzeLocalTime(value, timeZone);
  if (!analysis.candidates.length) throw new Error(`This local time does not exist in ${timeZone}. Choose a valid local time.`);
  if (occurrence < 0 || occurrence >= analysis.candidates.length) throw new Error('Choose one of the repeated local-time occurrences.');
  return analysis.candidates[occurrence];
}

function icsDate(value: string, timeZone: string, occurrence = 0): string {
  return zonedTimeToUtc(value, timeZone, occurrence).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function escapeIcs(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

function icsEvent(schedule: Schedule, kind: 'Deposit' | 'Final balance'): string {
  const milestone = kind === 'Deposit' ? schedule.deposit : schedule.balance;
  const amount = formatMoney(milestone.amount, schedule.currency, schedule.locale);
  const description = `${kind} of ${amount} for ${schedule.projectName}. ${schedule.paymentMethod}. ${schedule.paymentReference}`;
  return [
    'BEGIN:VEVENT',
    `UID:${schedule.id}-${kind === 'Deposit' ? 'deposit' : 'balance'}@deposit-deadline-bridge`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART:${icsDate(milestone.dueLocal, schedule.timeZone, milestone.occurrence ?? 0)}`,
    `DTEND:${icsDate(milestone.dueLocal, schedule.timeZone, milestone.occurrence ?? 0)}`,
    `SUMMARY:${escapeIcs(`${kind} due — ${schedule.projectName}`)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    'BEGIN:VALARM',
    `TRIGGER:-P${milestone.reminderDays}D`,
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(`${kind} reminder for ${schedule.projectName}`)}`,
    'END:VALARM',
    'END:VEVENT',
  ].join('\r\n');
}

export function calendarFile(schedule: Schedule): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Param Factory//Deposit Deadline Bridge//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeIcs(`${schedule.quoteNumber} payment deadlines`)}`,
    icsEvent(schedule, 'Deposit'),
    icsEvent(schedule, 'Final balance'),
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}

export function paymentInstructions(schedule: Schedule): string {
  const common = [
    `Quote: ${schedule.quoteNumber}`,
    `Project: ${schedule.projectName}`,
    `Client: ${schedule.clientName}`,
    `Time zone: ${schedule.timeZone}`,
  ].join('\n');
  return [
    common,
    '',
    'PAYMENT 1 — DEPOSIT',
    `Amount: ${formatMoney(schedule.deposit.amount, schedule.currency, schedule.locale)}`,
    `Due: ${displayDate(schedule.deposit.dueLocal, schedule.timeZone, schedule.deposit.occurrence ?? 0)} (${schedule.timeZone})`,
    '',
    'PAYMENT 2 — FINAL BALANCE',
    `Amount: ${formatMoney(schedule.balance.amount, schedule.currency, schedule.locale)}`,
    `Due: ${displayDate(schedule.balance.dueLocal, schedule.timeZone, schedule.balance.occurrence ?? 0)} (${schedule.timeZone})`,
    '',
    `Payment method: ${schedule.paymentMethod}`,
    `Reference: ${schedule.paymentReference}`,
    '',
    'These dates were agreed separately from the invoice payment terms.',
  ].join('\n');
}

export function reminderDraft(schedule: Schedule, kind: 'deposit' | 'balance'): { subject: string; body: string } {
  const label = kind === 'deposit' ? 'deposit' : 'final balance';
  const milestone = schedule[kind];
  return {
    subject: `${label === 'deposit' ? 'Deposit' : 'Final balance'} due for ${schedule.projectName}`,
    body: [
      `Hello ${schedule.clientName},`,
      '',
      `This is a reminder that the ${label} of ${formatMoney(milestone.amount, schedule.currency, schedule.locale)} is due ${displayDate(milestone.dueLocal, schedule.timeZone, milestone.occurrence ?? 0)} (${schedule.timeZone}).`,
      '',
      schedule.paymentMethod,
      schedule.paymentReference,
      '',
      'Thank you.',
    ].join('\n'),
  };
}

export function safeFileName(value: string): string {
  return (value || 'payment-schedule').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
