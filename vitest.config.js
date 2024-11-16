// import{defineConfig} from 'vitest/config';

// export default defineConfig({
//     test: {
//         environment: 'node'
//     }
// })
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node', // or 'jsdom' if you're testing in a browser-like environment
    testTimeout: 90000,  // Global timeout set to 1.5 minutes (90 seconds)
  },
});
