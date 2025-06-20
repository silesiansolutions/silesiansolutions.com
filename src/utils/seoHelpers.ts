/**
 * SEO Helper utilities for consistent title and description management
 */

export interface PageSeoData {
    title: string; // Simple title for h1, breadcrumbs (e.g., "O nas")
    seoTitle: string; // SEO-optimized title for <title> and schema (e.g., "Tworzymy technologię, która wspiera rozwój biznesu")
    description: string; // SEO description for meta tags and schema
}

/**
 * Creates formatted SEO title with company suffix
 * @param seoTitle - The SEO-optimized title
 * @param titleTemplate - The title template from site metadata (e.g., "%s | Silesian Solutions")
 * @returns Formatted title for <title> tag and schema
 */
export function createSeoTitle(seoTitle: string, titleTemplate: string): string {
    return titleTemplate.replace('%s', seoTitle);
}

/**
 * Page SEO configurations for consistent metadata across the site
 */
export const pageSeoConfig: Record<string, PageSeoData> = {
    home: {
        title: 'Strona główna',
        seoTitle: 'Nowoczesne rozwiązania IT i AI',
        description:
            'Silesian Solutions tworzy systemy, aplikacje i rozwiązania oparte na sztucznej inteligencji, no-code/low-code oraz automatyzacji procesów - skutecznie i nowocześnie.',
    },
    about: {
        title: 'O nas',
        seoTitle: 'Tworzymy technologię, która wspiera rozwój biznesu',
        description:
            'Poznaj Silesian Solutions - zespół specjalistów IT i AI tworzących nowoczesne rozwiązania technologiczne dla biznesu. Zajmujemy się systemami, aplikacjami i automatyzacją.',
    },
    offer: {
        title: 'Oferta',
        seoTitle: 'Rozwiązania IT dostosowane do Twoich potrzeb',
        description:
            'Kompleksowe usługi IT od Silesian Solutions: AI i chatboty, no-code/low-code, strony internetowe, aplikacje webowe, sklepy online, systemy dedykowane i cyberbezpieczeństwo.',
    },
    projects: {
        title: 'Realizacje',
        seoTitle: 'Nasze wybrane realizacje i projekty IT',
        description:
            'Poznaj nasze wybrane realizacje i projekty IT. Portfolio Silesian Solutions z przykładami aplikacji webowych, stron internetowych i rozwiązań technologicznych.',
    },
    contact: {
        title: 'Kontakt',
        seoTitle: 'Skontaktuj się z nami - rozpocznijmy współpracę',
        description:
            'Skontaktuj się z Silesian Solutions z Bielska-Białej. Oferujemy profesjonalne usługi IT, rozwiązania AI i wsparcie technologiczne dla Twojego biznesu.',
    },
    blog: {
        title: 'Blog',
        seoTitle: 'Blog o technologiach IT, AI i automatyzacji',
        description:
            'Najnowsze artykuły o technologiach IT, sztucznej inteligencji, automatyzacji procesów i trendach w branży technologicznej od ekspertów Silesian Solutions.',
    },
    privacy: {
        title: 'Polityka prywatności',
        seoTitle: 'Polityka prywatności i ochrony danych osobowych',
        description:
            'Polityka prywatności i ochrony danych osobowych Silesian Solutions. Dowiedz się, jak chronimy Twoje dane zgodnie z RODO.',
    },
    terms: {
        title: 'Klauzula informacyjna',
        seoTitle: 'Klauzula informacyjna RODO',
        description:
            'Klauzula informacyjna o przetwarzaniu danych osobowych w Silesian Solutions zgodnie z rozporządzeniem RODO.',
    },
};

/**
 * Creates page-specific SEO data
 * @param pageKey - Key from pageSeoConfig
 * @param customData - Optional custom overrides
 * @returns Complete SEO data for the page
 */
export function getPageSeoData(pageKey: keyof typeof pageSeoConfig, customData?: Partial<PageSeoData>): PageSeoData {
    const baseData = pageSeoConfig[pageKey];
    return {
        ...baseData,
        ...customData,
    };
}
