import { IGatsbyImageData } from 'gatsby-plugin-image';

interface AllSettingsQueryResult<T> {
    allSettingsJson: {
        settings: T[];
    };
}

interface ImageObject {
    alt: string | null;
    src: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
        };
    } | null;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

interface PageSection {
    sectionId: string;
    heading?: string;
    headingLevel?: 'h1' | 'h2' | 'h3';
    id?: string;
}
