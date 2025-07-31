// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/calendario-vite/", // isso só afeta build
  plugins: [react()],
});
