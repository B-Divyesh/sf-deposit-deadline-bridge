import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderCopyAudit } from './copy-audit-data.mjs';

const destination = resolve(process.cwd(), '.factory/copy-audit.md');
const output = renderCopyAudit();

if (process.argv.includes('--check')) {
  const committed = await readFile(destination, 'utf8');
  if (committed !== output) {
    throw new Error('Copy audit is stale. Run npm run audit:copy and commit .factory/copy-audit.md.');
  }
} else {
  await writeFile(destination, output);
  process.stdout.write(`Wrote ${destination}\n`);
}
