import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: "/revideox/",
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        serviceworker: 'coi-serviceworker.js',
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  assetsInclude: ['coi-serviceworker.js'],
})
