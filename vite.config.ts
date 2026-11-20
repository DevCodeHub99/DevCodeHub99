import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const gaId = env.VITE_PUBLIC_GA_ID || '';

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-ga-transform',
        transformIndexHtml(html: string) {
          const gaScript = gaId && gaId.startsWith('G-') && gaId !== 'G-XXXXXXXXXX'
            ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>`
            : '';
          return html.replace('<!--__GA_SCRIPT__-->', gaScript);
        },
      },
    ],
  
  server: {
    host: '0.0.0.0', // Allow access from network (mobile testing)
    port: 5173,
  },

  // ============================================
  // Path Aliases
  // ============================================
  // Instead of: import { Button } from "../../../components/ui/button"
  // You can use: import { Button } from "@/components/ui/button"
  // 
  // Note: Also add this to tsconfig.json for TypeScript support:
  // "paths": { "@/*": ["./src/*"] }
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ============================================
  // Code Splitting (Manual Chunks)
  // ============================================
  // Splits bundle into separate cached files:
  // - react-vendor.js  → React core (rarely changes, stays cached)
  // - animation.js     → Framer Motion (rarely changes, stays cached)  
  // - index.js         → Your code (changes often, re-downloaded)
  //
  // Benefits:
  // - Returning visitors only download changed chunks
  // - Saves bandwidth on hosting (Vercel free tier friendly)
  // - Faster page loads on repeat visits
  //
  // Add more chunks for large libraries you use:
  // 'charts': ['recharts'],
  // 'forms': ['react-hook-form', 'zod'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation': ['framer-motion'],
        },
      },
    },
  },
};
});
