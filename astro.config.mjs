// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Troque pelo domínio real quando publicar (usado em canonical/OG/sitemap)
  site: 'https://www.manusbarbearia.com.br',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
