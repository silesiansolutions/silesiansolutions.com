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
        seoTitle: 'Software engineering, AI i automatyzacja dla firm',
        description:
            'Silesian Solutions pomaga firmom projektować i rozwijać oprogramowanie, rozwiązania AI i automatyzacje procesów - od architektury po bezpieczne wdrożenie.',
    },
    about: {
        title: 'O nas',
        seoTitle: 'Techniczne partnerstwo B2B dla rozwoju produktów',
        description:
            'Poznaj podejście Silesian Solutions do software engineering, architektury, automatyzacji, AI, DevOps i bezpiecznego rozwoju produktów cyfrowych.',
    },
    offer: {
        title: 'Oferta',
        seoTitle: 'Software engineering, AI, automatyzacje i DevOps',
        description:
            'Techniczne usługi B2B: oprogramowanie dedykowane, AI-assisted engineering, automatyzacja procesów, frontend architecture, DevOps, integracje i cyberbezpieczeństwo.',
    },
    projects: {
        title: 'Realizacje',
        seoTitle: 'Nasze wybrane realizacje i projekty IT',
        description:
            'Poznaj nasze wybrane realizacje i projekty IT. Portfolio Silesian Solutions z przykładami aplikacji webowych, stron internetowych i rozwiązań technologicznych.',
    },
    contact: {
        title: 'Kontakt',
        seoTitle: 'Porozmawiajmy o Twoim projekcie technologicznym',
        description:
            'Skontaktuj się z Silesian Solutions, aby omówić oprogramowanie, AI, automatyzację, frontend architecture, DevOps lub techniczne doradztwo B2B.',
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
