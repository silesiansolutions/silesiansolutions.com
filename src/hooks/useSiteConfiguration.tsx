import type { ContentImageData } from '../components/ContentImage';
import { content } from '../data/content';

export interface SiteConfiguration {
    featureToggles: {
        useCookieBar: boolean;
        useDarkModeAsDefault: boolean;
        useDarkModeBasedOnUsersPreference: boolean;
    };
    logo: {
        text: string;
        image?: {
            extension?: string;
            publicURL?: string;
            svg?: { originalContent?: string };
            childImageSharp?: { gatsbyImageData?: ContentImageData };
        };
        imageDark?: {
            extension?: string;
            publicURL?: string;
            svg?: { originalContent?: string };
            childImageSharp?: { gatsbyImageData?: ContentImageData };
        };
    };
    navigation: {
        ctaButton: {
            label: string;
            openNewTab: boolean;
            url: string;
        };
        footer: {
            label: string;
            url: string;
        }[];
        header: {
            label: string;
            url: string;
        }[];
    };
}

export function useSiteConfiguration(): SiteConfiguration {
    return content.siteConfiguration as SiteConfiguration;
}
