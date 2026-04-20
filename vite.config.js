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
  }
})
