import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: { assetsInlineLimit: 5_000_000 }
})
