import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // or 'node' if testing Node code
    coverage: {
      provider: 'v8', // For coverage reporting
    },
  },
});
