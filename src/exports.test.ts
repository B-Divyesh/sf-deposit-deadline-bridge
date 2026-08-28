import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { analyzeLocalTime, calendarFile, zonedTimeToUtc } from './exports';
import { sampleSchedule } from './model';

describe('daylight-saving deadline resolution', () => {
  it('rejects a nonexistent spring-forward wall time', () => {
    const analysis = analyzeLocalTime('2026-03-08T02:30', 'America/New_York');
    expect(analysis.candidates).toHaveLength(0);
    expect(() => zonedTimeToUtc('2026-03-08T02:30', 'America/New_York')).toThrow('does not exist');
  });

  it('preserves either chosen occurrence during a fall-back repeated hour', () => {
    const analysis = analyzeLocalTime('2026-11-01T01:30', 'America/New_York');
    expect(analysis.candidates.map((item) => item.toISOString())).toEqual([
      '2026-11-01T05:30:00.000Z',
      '2026-11-01T06:30:00.000Z',
    ]);
    const schedule = structuredClone(sampleSchedule);
    schedule.deposit.dueLocal = '2026-11-01T01:30';
    schedule.deposit.occurrence = 1;
    expect(calendarFile(schedule)).toContain('DTSTART:20261101T063000Z');
  });
});

describe('static release configuration', () => {
  it('serves unknown paths as a real 404 and does not mark stable assets immutable', async () => {
    const config = JSON.parse(await readFile(resolve(process.cwd(), 'public/staticwebapp.config.json'), 'utf8')) as {
      responseOverrides: Record<string, { rewrite: string; statusCode: number }>;
      mimeTypes: Record<string, string>;
      routes: Array<{ route: string; headers?: Record<string, string> }>;
    };
    expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
    expect(config.mimeTypes['.avif']).toBe('image/avif');
    expect(config.routes.find((route) => route.route === '/assets/*')?.headers?.['Cache-Control']).not.toContain('immutable');
  });
});
