import { defineConfig, presets, profiles } from '@silesiansolutions/search-quality-kit';

const preset = presets.astro();

export default defineConfig({
    ...preset,
    ...profiles.companySite(),
    site: {
        baseUrl: 'https://silesiansolutions.com',
    },
    crawl: {
        ...preset.crawl,
        entrypoints: ['/'],
        maxPages: 100,
        exclude: [...(preset.crawl?.exclude ?? []), '/klauzula-informacyjna', '/polityka-prywatnosci'],
    },
    ci: {
        failOn: ['error'],
    },
});
