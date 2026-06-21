import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite para el frontend de la zapatería
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
