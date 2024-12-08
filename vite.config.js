import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // eslint-disable-next-line no-undef
    'process.env': process.env,
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
  }
})
