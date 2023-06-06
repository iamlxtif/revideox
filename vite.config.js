import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ffmpegapp",
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
        'coi-serviceworker': '/coi-serviceworker.js',
      },
    },
  },
})
