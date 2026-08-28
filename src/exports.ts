import type { Schedule } from './model';

function formatMoney(value: string, currency: string, locale: string): string {
  const amount = Number(value || 0);
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function displayDate(value: string, timeZone: string): string {
  if (!value) return 'Date not set';
  const date = zonedTimeToUtc(value, timeZone);
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(date);
}

export function zonedTimeToUtc(value: string, timeZone: string): Date {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!match) throw new Error('Enter a complete date and time.');
  const wanted = Date.UTC(+match[1], +match[2] - 1, +match[3], +match[4], +match[5]);
  let guess = wanted;
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });
  for (let i = 0; i < 3; i += 1) {
    const parts = Object.fromEntries(formatter.formatToParts(new Date(guess)).map((part) => [part.type, part.value]));
    const rendered = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
    guess += wanted - rendered;
  }
  return new Date(guess);
}

function icsDate(value: string, timeZone: string): string {
  return zonedTimeToUtc(value, timeZone).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
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
    `DTSTART:${icsDate(milestone.dueLocal, schedule.timeZone)}`,
    `DTEND:${icsDate(milestone.dueLocal, schedule.timeZone)}`,
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
    `Due: ${displayDate(schedule.deposit.dueLocal, schedule.timeZone)} (${schedule.timeZone})`,
    '',
    'PAYMENT 2 — FINAL BALANCE',
    `Amount: ${formatMoney(schedule.balance.amount, schedule.currency, schedule.locale)}`,
    `Due: ${displayDate(schedule.balance.dueLocal, schedule.timeZone)} (${schedule.timeZone})`,
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
      `This is a reminder that the ${label} of ${formatMoney(milestone.amount, schedule.currency, schedule.locale)} is due ${displayDate(milestone.dueLocal, schedule.timeZone)} (${schedule.timeZone}).`,
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
