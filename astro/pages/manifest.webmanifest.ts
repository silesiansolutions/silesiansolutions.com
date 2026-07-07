import type { APIRoute } from 'astro';
import { content } from '../../src/data/content';

export const GET: APIRoute = () => {
    const icon = content.siteMetadata.thumbnail.childImageSharp.original.src;
    return new Response(
        JSON.stringify({
            name: 'Silesian Solutions',
            short_name: 'Silesian Solutions',
            start_url: '/',
            display: 'minimal-ui',
            background_color: '#ffffff',
            theme_color: '#121212',
            icons: [{ src: icon, sizes: '800x800', type: 'image/jpeg' }],
        }),
        { headers: { 'Content-Type': 'application/manifest+json' } },
    );
};
