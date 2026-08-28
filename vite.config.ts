import { defineConfig } from 'vite';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export default defineConfig({
  build: {
    target: 'es2022',
    sourcemap: true,
    manifest: true,
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  plugins: [{
    name: 'versioned-service-worker',
    apply: 'build',
    async closeBundle() {
      const output = join(process.cwd(), 'dist');
      const manifest = JSON.parse(await readFile(join(output, '.vite/manifest.json'), 'utf8')) as Record<string, { file: string; css?: string[] }>;
      const entry = manifest['index.html'];
      const appAssets = [entry.file, ...(entry.css ?? [])].map((asset) => `/${asset}`);
      const version = createHash('sha256').update(appAssets.join('|')).digest('hex').slice(0, 12);
      const worker = await readFile(join(output, 'sw.js'), 'utf8');
      await writeFile(
        join(output, 'sw.js'),
        worker
          .replace("const VERSION = 'deadline-bridge-build';", `const VERSION = 'deadline-bridge-${version}';`)
          .replace('const APP_ASSETS = [];', `const APP_ASSETS = ${JSON.stringify(appAssets)};`),
      );
    },
  }],
});
