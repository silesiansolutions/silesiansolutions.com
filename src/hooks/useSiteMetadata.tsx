import type { ContentImageData } from '../components/ContentImage';
import { SocialProfile } from '../components/SocialProfiles';
import { content } from '../data/content';

export interface SiteMetadata {
    language: string;
    siteUrl: string;
    thumbnail: { childImageSharp: { original: { src: string } } };
    title: string;
    titleTemplate: string;
    description: string;
    author: string;
    avatar?: { childImageSharp?: { gatsbyImageData?: ContentImageData } };
    bio: string;
    social: {
        [profile in SocialProfile]: string;
    };
}

export function useSiteMetadata(): SiteMetadata {
    return content.siteMetadata as unknown as SiteMetadata;
}
