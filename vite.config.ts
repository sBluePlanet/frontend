import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      '/game': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
