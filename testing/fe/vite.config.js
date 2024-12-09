import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the testing environment
export default defineConfig({
  plugins: [react()],
});
