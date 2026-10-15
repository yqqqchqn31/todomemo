import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const GOOGLE_FONTS_ORIGINS = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com']

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,png,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => GOOGLE_FONTS_ORIGINS.includes(url.origin),
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts' },
          },
        ],
      },
    }),
  ],
  base: '/todomemo/',
})
