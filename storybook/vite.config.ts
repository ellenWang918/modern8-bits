import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: mode === 'grid-prototype' ? {
    rollupOptions: {
      input: { main: 'index.html', gridPrototype: 'grid-prototype.html' },
    },
  } : undefined,
}))
