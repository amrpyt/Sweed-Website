import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

const htmlInputs = {
  index: path.resolve(__dirname, 'site/index.html'),
  about: path.resolve(__dirname, 'site/pages/about.html'),
  article: path.resolve(__dirname, 'site/pages/article.html'),
  blog: path.resolve(__dirname, 'site/pages/blog.html'),
  contact: path.resolve(__dirname, 'site/pages/contact.html'),
  faq: path.resolve(__dirname, 'site/pages/faq.html'),
  offers: path.resolve(__dirname, 'site/pages/offers.html'),
  portfolio: path.resolve(__dirname, 'site/pages/portfolio.html'),
  products: path.resolve(__dirname, 'site/pages/products.html'),
  serviceDetail: path.resolve(__dirname, 'site/pages/service-detail.html'),
  services: path.resolve(__dirname, 'site/pages/services.html'),
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  return {
    root: 'site',
    publicDir: '../public',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: htmlInputs,
      },
    },
  };
});
