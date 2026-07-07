import { content } from '../data/content';

export interface JsonLdOptions {
    contactPoint: {
        contactType: string;
        url: string;
    };
    offerCatalog: {
        name: string;
    };
    breadcrumb: {
        homePageName: string;
    };
}

export interface OrganizationData {
    name: string;
    legalName: string;
    email: string;
    description: string;
    location: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        addressCountry: string;
        postalCode: string;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
    areaServed: string;
    knowsAbout: string[];
    availableLanguage: string[];
    mainServices: Array<{
        name: string;
        description: string;
    }>;
}

export function useOrganizationData(): OrganizationData {
    return content.organizationData as OrganizationData;
}

export function useJsonLdOptions(): JsonLdOptions {
    return content.jsonLdOptions as JsonLdOptions;
}
