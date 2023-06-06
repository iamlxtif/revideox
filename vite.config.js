import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'coi-serviceworker.js'],
      manifest: {
        name: 'RevideoX',
        short_name: 'RevideoX',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/revideox/vite.svg',
            sizes: '128x128',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
  base: "/revideox/",
})
