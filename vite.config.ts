
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: true,
    },
    // Force the browser to not cache assets
    fs: {
      strict: true,
    }
  },
  build: {
    // Add timestamp to filenames for cache busting
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].[time].js`,
        chunkFileNames: `assets/[name].[hash].[time].js`,
        assetFileNames: `assets/[name].[hash].[time].[ext]`
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
