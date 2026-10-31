// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jumavi.org',
  output: 'static',
  // Los enlaces internos no llevan barra final: la forma canónica del sitio
  // es /ruta (ver src/lib/sitio.ts).
  trailingSlash: 'ignore',
  // Precarga los recursos de los enlaces al pasar el cursor/foco: el sitio
  // ya usa ClientRouter, así que la navegación interna aprovecha el fetch.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      // Misma forma canónica que src/lib/sitio.ts: sin barra final,
      // para que el sitemap y los enlaces internos coincidan.
      serialize(item) {
        return { ...item, url: item.url.replace(/\/$/, '') };
      },
    }),
  ],
  // Compresión de imágenes (servicio Sharp): calidades por defecto afinadas
  // por formato (AVIF ~55 equivale visualmente a WebP ~72). Los `quality`
  // por componente tienen prioridad sobre esto, así que no se usan: cada
  // formato toma aquí su valor óptimo (ver <Picture formats> en componentes).
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        avif: { quality: 55, effort: 4 },
        webp: { quality: 72, effort: 5 },
        jpeg: { quality: 74, mozjpeg: true },
      },
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
