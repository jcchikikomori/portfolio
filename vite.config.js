import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    VitePWA({ registerType: 'autoUpdate' })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      thresholds: { lines: 95, branches: 95, functions: 95 },
      include: ['src/**/*.{js,vue}'],
      exclude: ['src/tests/**', 'src/registerServiceWorker.js']
    }
  }
})
