import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enables global test functions like describe and it
    environment: 'node', // Backend testing runs in Node.js
    include: ['tests/**/*.test.js'], // Include test files in the /tests directory
    coverage: {
      reporter: ['text', 'lcov'], // Enable coverage reporting
    },
  },
});
