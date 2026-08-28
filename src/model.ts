export type Milestone = {
  amount: string;
  dueLocal: string;
  reminderDays: number;
};

export type Schedule = {
  id: string;
  quoteNumber: string;
  clientName: string;
  clientEmail: string;
  projectName: string;
  eventDate: string;
  currency: string;
  locale: string;
  timeZone: string;
  paymentMethod: string;
  paymentReference: string;
  deposit: Milestone;
  balance: Milestone;
  updatedAt: string;
};

export const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

export function blankSchedule(): Schedule {
  return {
    id: crypto.randomUUID(),
    quoteNumber: '',
    clientName: '',
    clientEmail: '',
    projectName: '',
    eventDate: '',
    currency: 'USD',
    locale: 'en-US',
    timeZone: localTimeZone,
    paymentMethod: '',
    paymentReference: '',
    deposit: { amount: '', dueLocal: '', reminderDays: 3 },
    balance: { amount: '', dueLocal: '', reminderDays: 7 },
    updatedAt: new Date().toISOString(),
  };
}

export const sampleSchedule: Schedule = {
  id: 'demo-glasshouse-supper',
  quoteNumber: 'HT-084',
  clientName: 'Maya Chen',
  clientEmail: 'maya@example.com',
  projectName: 'Highland Glasshouse Supper',
  eventDate: '2026-11-06',
  currency: 'USD',
  locale: 'en-US',
  timeZone: 'America/New_York',
  paymentMethod: 'Bank transfer to Northline Events',
  paymentReference: 'Use HT-084 as the payment reference.',
  deposit: { amount: '2400', dueLocal: '2026-09-18T17:00', reminderDays: 3 },
  balance: { amount: '5600', dueLocal: '2026-10-23T17:00', reminderDays: 7 },
  updatedAt: '2026-08-28T09:00:00.000Z',
};

export const timeZones = [
  'UTC',
  'America/Los_Angeles',
  'America/Denver',
  'America/Chicago',
  'America/New_York',
  'America/Toronto',
  'Europe/London',
  'Europe/Paris',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
];

export function isSchedule(value: unknown): value is Schedule {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Schedule>;
  return Boolean(
    item.id &&
      typeof item.quoteNumber === 'string' &&
      typeof item.clientName === 'string' &&
      typeof item.projectName === 'string' &&
      typeof item.timeZone === 'string' &&
      item.deposit && typeof item.deposit.dueLocal === 'string' &&
      item.balance && typeof item.balance.dueLocal === 'string',
  );
}
