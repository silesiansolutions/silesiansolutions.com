import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
    site: 'https://silesiansolutions.com',
    srcDir: './astro',
    publicDir: './static',
    trailingSlash: 'always',
    integrations: [
        react(),
        sitemap({
            filter: (page) => !page.endsWith('/polityka-prywatnosci/') && !page.endsWith('/klauzula-informacyjna/'),
        }),
    ],
    vite: {
        plugins: [imagetools()],
    },
});
