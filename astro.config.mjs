import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';

const compat = (name) => fileURLToPath(new URL(`./src/compat/${name}`, import.meta.url));

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
        resolve: {
            alias: {
                gatsby: compat('gatsby.tsx'),
                'gatsby-plugin-image': compat('gatsby-plugin-image.tsx'),
                'react-schemaorg': compat('react-schemaorg.tsx'),
            },
        },
    },
});
