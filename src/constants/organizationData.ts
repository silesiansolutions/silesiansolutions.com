import { OrganizationData, JsonLdOptions } from '../hooks/useOrganizationData';

export const createOrganizationReference = (siteUrl: string, organizationData: OrganizationData) => ({
    '@type': 'Organization' as const,
    '@id': `${siteUrl}#organization`,
    name: organizationData.name,
    url: siteUrl,
});

export const createPostalAddress = (organizationData: OrganizationData) => ({
    '@type': 'PostalAddress' as const,
    addressLocality: organizationData.location.addressLocality,
    addressRegion: organizationData.location.addressRegion,
    addressCountry: organizationData.location.addressCountry,
    postalCode: organizationData.location.postalCode,
});

export const createGeoCoordinates = (organizationData: OrganizationData) => ({
    '@type': 'GeoCoordinates' as const,
    latitude: organizationData.coordinates.latitude,
    longitude: organizationData.coordinates.longitude,
});

export const createContactPoint = (organizationData: OrganizationData, options: JsonLdOptions) => ({
    '@type': 'ContactPoint' as const,
    contactType: options.contactPoint.contactType,
    email: organizationData.email,
    availableLanguage: organizationData.availableLanguage,
});

export const createOfferCatalog = (organizationData: OrganizationData, options: JsonLdOptions) => ({
    '@type': 'OfferCatalog' as const,
    name: options.offerCatalog.name,
    itemListElement: organizationData.mainServices.map((service) => ({
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

export const createSimpleBreadcrumb = (siteUrl: string, pageName: string, pageUrl: string, options: JsonLdOptions) =>
    createBreadcrumb([
        { name: options.breadcrumb.homePageName, url: siteUrl },
        { name: pageName, url: pageUrl },
    ]);

export const createAreaServed = (organizationData: OrganizationData) => ({
    '@type': 'Country' as const,
    name: organizationData.areaServed,
});

export const createServiceArea = (organizationData: OrganizationData) => ({
    '@type': 'Place' as const,
    name: organizationData.areaServed,
});
