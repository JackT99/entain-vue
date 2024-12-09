import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    browser: {
      enabled: true,
      name: 'webkit',
      provider: 'playwright',
    },
    environment: "jsdom",
    css: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },  
})