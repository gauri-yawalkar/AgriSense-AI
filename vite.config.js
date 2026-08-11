import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/agrisense-ai/',
  plugins: [react()],
  server: {
    proxy: {
      '/predict': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      }
    }
  }
})
