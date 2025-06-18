import { graphql, useStaticQuery } from 'gatsby';
import { AllSettingsQueryResult } from '../types';

export interface JsonLdOptions {
    contactPoint: {
        contactType: string;
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
    const data: AllSettingsQueryResult<{ organizationData: OrganizationData }> = useStaticQuery(query);
    return data.allSettingsJson.settings[0].organizationData;
}

export function useJsonLdOptions(): JsonLdOptions {
    const data: AllSettingsQueryResult<{ jsonLdOptions: JsonLdOptions }> = useStaticQuery(query);
    return data.allSettingsJson.settings[0].jsonLdOptions;
}

export const query = graphql`
    query OrganizationData {
        allSettingsJson: allContentJson {
            settings: nodes {
                organizationData {
                    name
                    legalName
                    email
                    description
                    location {
                        addressLocality
                        addressRegion
                        addressCountry
                        postalCode
                    }
                    coordinates {
                        latitude
                        longitude
                    }
                    areaServed
                    knowsAbout
                    availableLanguage
                    mainServices {
                        name
                        description
                    }
                }
                jsonLdOptions {
                    contactPoint {
                        contactType
                    }
                    offerCatalog {
                        name
                    }
                    breadcrumb {
                        homePageName
                    }
                }
            }
        }
    }
`;
