import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/chat": {
        target: "https://chat.ideahub.com.bd",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, "/chat"),
      },
    },
  },
  preview: {
    proxy: {
      "/api/chat": {
        target: "https://chat.ideahub.com.bd",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, "/chat"),
      },
    },
  },
})
