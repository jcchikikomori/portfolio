import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // process.env.GITHUB_ACTIONS is auto-set on GH Actions runners; safe here (Node config, not a browser src/ file).
  base: process.env.GITHUB_ACTIONS ? '/portfolio/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '@jcchikikomori',
        short_name: '@jcchikikomori',
        theme_color: '#209cee',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'img/icons/android-chrome-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'img/icons/android-chrome-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
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
      exclude: ['src/tests/**', 'src/registerServiceWorker.js'],
    },
  },
});
