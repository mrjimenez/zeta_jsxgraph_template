import { defineConfig } from 'vite'

export default defineConfig({
  // Dev server config (replaces webpack-dev-server)
  server: {
    port: 9000,
    open: true,
  },
  // Build output goes to dist/ (same as webpack)
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
