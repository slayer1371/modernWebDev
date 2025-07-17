import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      // This tells Vite to resolve 'events' imports to the 'events' package
      // you installed in node_modules. This effectively "polyfills" it.
      events: 'events',
    },
  },
})
