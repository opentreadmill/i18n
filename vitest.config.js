import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // jsdom explizit als Testumgebung angeben
  }
})
