import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    vue(),
    svelte(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@ratiokit': path.resolve(__dirname, './RatioKit/React/src/components/RatioKit'),
    },
  },
  server: {
    port: 8080,
    open: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    },
    exclude: [
      '@tailwindcss/oxide',
      'lightningcss',
      'fsevents'
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        react: 'ReactPreview.html',
        vue: 'VuePreview.html',
        svelte: 'SveltePreview.html',
        html: 'HtmlPreview.html',
      },
    },
  },
});
