// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiTarget = "http://localhost:3000";

export default defineConfig({
  plugins: [react()],
  base: "./",
});
