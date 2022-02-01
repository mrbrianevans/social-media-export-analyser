import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa'

const manifest: Partial<ManifestOptions> = {
  name: 'Data File Explorer',
  short_name: 'Data File Explorer',
  start_url: '.',
  display: 'standalone',
  background_color: '#fff',
  theme_color: '#5bbad5',
  description:
    'Analyse and explore data files exported from social media or other websites',
  orientation: 'landscape-primary',
  categories: [
    'data visualisation',
    'data analysis',
    'social media data',
    'data export',
    'gdpr'
  ],
  icons: [
    {
      src: 'icon/icon500.svg',
      type: 'image/xml+svg',
      sizes: '500x500'
    },
    {
      src: 'icon/icon500.png',
      type: 'image/png',
      sizes: '500x500'
    },
    {
      src: 'icon/icon500.webp',
      type: 'image/webp',
      sizes: '500x500'
    },
    {
      src: 'icon/pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: 'icon/pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    },
    {
      src: 'icon/pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable'
    }
  ]
}
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      includeAssets: [
        'icon/favicon.svg',
        'favicon.ico',
        'robots.txt',
        'icon/apple-touch-icon.png'
      ],
      includeManifestIcons: false,
      devOptions: { enabled: true },
      strategies: 'generateSW',
      manifest
    })
  ],
  build: { assetsInlineLimit: 1 }
})
