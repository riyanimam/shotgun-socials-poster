import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/shotgun-socials-poster/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
