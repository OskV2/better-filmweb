import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config.js'

export default defineConfig(({ command }) => ({
  plugins: [react(), crx({ manifest })],
  build: { outDir: command === 'serve' ? 'dist-dev' : 'dist', emptyOutDir: true },
  server: {
    host: '127.0.0.1', port: 5173, strictPort: true,
    cors: { origin: [/^chrome-extension:\/\//] },
  },
}))
