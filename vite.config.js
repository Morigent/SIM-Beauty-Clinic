import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectDir = resolve(fileURLToPath(new URL('.', import.meta.url)));
const sourceDir = resolve(projectDir, 'src');

export default defineConfig({
  root: sourceDir,
  build: {
    outDir: resolve(projectDir, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(sourceDir, 'index.html'),
        service: resolve(sourceDir, 'service.html'),
      },
    },
  },
});
