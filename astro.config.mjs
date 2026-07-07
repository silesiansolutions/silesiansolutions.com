import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

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
});
