import { defineConfig, policyPacks, presets, profiles } from '@silesiansolutions/search-quality-kit';

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
    },
    profiles: {
        default: 'company',
        routes: [
            { pattern: '/oferta/**', profile: 'servicePage' },
            { pattern: '/blog/**', profile: 'blogPost' },
        ],
    },
    plugins: [
        policyPacks.companySite({
            contactLinkText: ['Kontakt', 'Skontaktuj się', 'Porozmawiajmy', 'Napisz do nas'],
            contactHrefPatterns: ['/kontakt', 'mailto:'],
        }),
        policyPacks.aiVisibilitySafe({
            allowNoindexOn: ['/klauzula-informacyjna/**', '/polityka-prywatnosci/**'],
        }),
    ],
    suppressions: [
        {
            code: 'indexability.noindex',
            urlPattern: '/klauzula-informacyjna/**',
            reason: 'Legal information clause is intentionally noindexed; it stays reachable for users but is not a search landing page.',
            owner: 'dawidrylko',
        },
        {
            code: 'indexability.noindex',
            urlPattern: '/polityka-prywatnosci/**',
            reason: 'Privacy policy is intentionally noindexed; it stays reachable for users but is not a search landing page.',
            owner: 'dawidrylko',
        },
    ],
    ci: {
        failOn: ['error'],
    },
});
