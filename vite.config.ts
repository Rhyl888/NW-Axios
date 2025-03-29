import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'ts-axios',
      fileName: 'ts-axios'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'lib')
    }
  }
});
