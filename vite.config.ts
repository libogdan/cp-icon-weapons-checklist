import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base: "./" makes the build work on GitHub Pages under any repo name
// (https://<user>.github.io/<repo>/) without extra config.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
