import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    react(),
    vue(),
    svelte(),
  ],
  server: {
    port: 8080,
    open: false,
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        react: 'ReactPreview.html',
        vue: 'VuePreview.html',
        svelte: 'SveltePreview.html',
        html: 'HtmlPreview.html',
        snipet: 'SnipetTest.html',
      },
    },
  },
});
