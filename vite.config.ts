import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({

  plugins: [

    react(),

    basicSsl(),

    VitePWA({

      registerType: 'autoUpdate',

      manifest: {

        name: 'Bike + Brew Passport',

        short_name: 'Bike + Brew',

        description:
          'A motorcycle café passport tracker.',

        theme_color: '#c96b2c',

        background_color: '#121212',

        display: 'standalone',

        icons: [

          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },

          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }

        ]

      }

    })

  ],


  server: {

    host: "0.0.0.0"

  }

})