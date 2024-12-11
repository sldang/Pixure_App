import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the testing environment
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // Treat .js files as .jsx
    include: /.*\.(js|jsx)$/, // Include .js and .jsx files
    exclude: /node_modules/, // Exclude node_modules
  },
});
