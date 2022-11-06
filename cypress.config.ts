import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL
  },
  defaultCommandTimeout: 10000,
  env: {
    USERNAME: process.env.TEST_USERNAME,
    PASSWORD: process.env.TEST_PASSWORD
  },
  chromeWebSecurity: false,
})