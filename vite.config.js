import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,png,svg,ico,json}']
      },
      manifest: {
        name: 'ANMI - Asistente Nutricional Materno Infantil',
        short_name: 'ANMI',
        description: 'Información nutricional para prevenir la anemia infantil en bebés de 6 a 12 meses',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#667eea',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
          ]
        }
      }
    )
  ]
  }
)

