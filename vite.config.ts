import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// GitHub project pages are served from /<repo>/. Local dev and the temporary
// preview stay at the site root.
const base = process.env.GITHUB_PAGES === "true" ? "/diminished-value/" : "/"

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
    allowedHosts: true,
  },
})
