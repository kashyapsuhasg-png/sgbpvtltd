import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Use "/" for Vercel/local. For GitHub Pages, set VITE_BASE_PATH env var to your repo name e.g. "/sgb-final/"
  base: process.env.VITE_BASE_PATH ?? "/",

  plugins: [
    react(),

    // Dev tools for chef.convex.dev (only in development)
    mode === "development"
      ? {
          name: "inject-chef-dev",
          transform(code: string, id: string) {
            if (id.includes("main.tsx")) {
              return {
                code: `${code}

/* Added by Vite plugin inject-chef-dev */
window.addEventListener('message', async (message) => {
  if (message.source !== window.parent) return;
  if (message.data.type !== 'chefPreviewRequest') return;

  const worker = await import('https://chef.convex.dev/scripts/worker.bundled.mjs');
  await worker.respondToMessage(message);
});
`,
                map: null,
              };
            }
            return null;
          },
        }
      : null,
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
