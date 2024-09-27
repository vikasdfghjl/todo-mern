import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'



// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
  },
  envPrefix: 'REACT_APP_',
  env: config().parsed,
  plugins: [react()],
})
