// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiTarget = "http://localhost:3000";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
        secure: false, // Add this if you're dealing with HTTPS on the backend
        // Optional: Add logging for debugging
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            // console.log(
            //   `[Proxy] ${req.method} ${req.url} -> ${apiTarget}${req.url}`
            // );
          });
          proxy.on("error", (err, req, res) => {
            console.error(`[Proxy Error] ${err.message}`);
          });
        },
      },
    },
  },
});
