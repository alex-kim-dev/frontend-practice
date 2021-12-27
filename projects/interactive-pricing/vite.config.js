import siteMeta from '@frontend/site-meta';
import { defineConfig } from 'vite';
import { minifyHtml, injectHtml } from 'vite-plugin-html';

export default defineConfig(({ mode }) => ({
  base: `${
    mode === 'production' ? siteMeta.baseurl.concat('/interactive-pricing') : ''
  }/`,

  root: 'src',

  publicDir: '../static',

  build: {
    outDir: '../public',
    emptyOutDir: true,
    sourcemap: true,
  },

  plugins: [
    minifyHtml(),
    injectHtml({
      data: siteMeta,
    }),
  ],
}));
