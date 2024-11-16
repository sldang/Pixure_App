import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //everything after this point was added by Alexander to facilitate unit testing, remove if it causes problems. 
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./../tests/setup",
  },
  //
})
