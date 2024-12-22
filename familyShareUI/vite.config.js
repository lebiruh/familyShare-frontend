import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   
  plugins: [react()],
  server: {
    host: true,
    port: 80,
    proxy: {
      "/api": {
        target: "http://ec2-18-217-122-189.us-east-2.compute.amazonaws.com:5000",
        // target: "http://localhost:5000",
        // target: "https://ec2-18-117-169-81.us-east-2.compute.amazonaws.com",
        changeOrigin: true
      }
    },
    
  }
})
