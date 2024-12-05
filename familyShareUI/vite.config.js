import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://ec2-18-217-122-189.us-east-2.compute.amazonaws.com:5000",
        // target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
})
