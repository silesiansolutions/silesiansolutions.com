export const ORGANIZATION_DATA = {
    name: 'Silesian Solutions',
    legalName: 'Silesian Solutions',
    email: 'biuro@silesiansolutions.com',
    description:
        'Silesian Solutions to ekspert w tworzeniu nowoczesnego oprogramowania, stron internetowych, aplikacji PWA, e‑commerce, systemów dedykowanych, rozwiązań chmurowych, integracji, cyberbezpieczeństwie, BI i doradztwie IT.',

    location: {
        addressLocality: 'Bielsko-Biała',
        addressRegion: 'Śląskie',
        addressCountry: 'PL',
        postalCode: '43-300',
    },

    coordinates: {
        latitude: 49.823108285582414,
        longitude: 19.049053319792204,
    },

    areaServed: 'Poland',

    knowsAbout: [
        'Web Development',
        'Mobile PWA',
        'E-commerce',
        'Custom Software',
        'Cloud Architectures',
        'DevOps',
        'System Integration',
        'Cybersecurity',
        'Data Analytics',
        'IT Consulting',
    ],

    availableLanguage: ['Polish', 'English'],

    mainServices: [
        { name: 'Tworzenie stron internetowych', description: 'Responsywne, SEO‑przyjazne strony i landing page’e' },
        { name: 'Aplikacje webowe i mobilne PWA', description: 'Skalowalne aplikacje biznesowe i PWA' },
        { name: 'Sklepy internetowe', description: 'Bezpieczne, headless B2B/B2C e‑commerce' },
        { name: 'Systemy dedykowane', description: 'Mikroserwisy, architektura chmurowa i integracje' },
        { name: 'Rozwiązania chmurowe i DevOps', description: 'Kubernetes, serverless, IaC, FinOps' },
        { name: 'Cyberbezpieczeństwo', description: 'Audyty, pen‑testy, RODO, ISO 27001' },
        { name: 'Analiza danych i BI', description: 'Dashboardy, ML Ops, data-driven insights' },
        { name: 'Konsultacje IT', description: 'Strategia, transformacja, Agile, RPA' },
    ],
} as const;

export const createOrganizationReference = (siteUrl: string) => ({
    '@type': 'Organization' as const,
    '@id': `${siteUrl}#organization`,
    name: ORGANIZATION_DATA.name,
    url: siteUrl,
});

export const createPostalAddress = () => ({
    '@type': 'PostalAddress' as const,
    addressLocality: ORGANIZATION_DATA.location.addressLocality,
    addressRegion: ORGANIZATION_DATA.location.addressRegion,
    addressCountry: ORGANIZATION_DATA.location.addressCountry,
    postalCode: ORGANIZATION_DATA.location.postalCode,
});

export const createGeoCoordinates = () => ({
    '@type': 'GeoCoordinates' as const,
    latitude: ORGANIZATION_DATA.coordinates.latitude,
    longitude: ORGANIZATION_DATA.coordinates.longitude,
});

export const createContactPoint = () => ({
    '@type': 'ContactPoint' as const,
    contactType: 'customer service',
    email: ORGANIZATION_DATA.email,
    availableLanguage: ORGANIZATION_DATA.availableLanguage,
});

export const createOfferCatalog = () => ({
    '@type': 'OfferCatalog' as const,
    name: 'Usługi IT',
    itemListElement: ORGANIZATION_DATA.mainServices.map((service) => ({
        '@type': 'Offer' as const,
        itemOffered: {
            '@type': 'Service' as const,
            name: service.name,
            description: service.description,
        },
    })),
});

export const createBreadcrumb = (items: Array<{ name: string; url: string }>) => ({
    '@type': 'BreadcrumbList' as const,
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem' as const,
        position: index + 1,
        name: item.name,
        item: item.url,
    })),
});

export const createSimpleBreadcrumb = (siteUrl: string, pageName: string, pageUrl: string) =>
    createBreadcrumb([
        { name: 'Strona główna', url: siteUrl },
        { name: pageName, url: pageUrl },
    ]);

export const createAreaServed = () => ({
    '@type': 'Country' as const,
    name: ORGANIZATION_DATA.areaServed,
});

export const createServiceArea = () => ({
    '@type': 'Place' as const,
    name: ORGANIZATION_DATA.areaServed,
});
