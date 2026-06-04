import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // should be 'dist' (default)
  },
  server: {
    port: 3000,
    allowedHosts: [
      '6e27-2409-40f4-410e-635-79de-a0d8-fa8b-c34d.ngrok-free.app',
      'majestic-dango-b2a55a.netlify.app'
    ]
  }
})
