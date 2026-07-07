import { ContentImageData } from './components/ContentImage';

interface AllSettingsQueryResult<T> {
    allSettingsJson: {
        settings: T[];
    };
}

interface ImageObject {
    alt: string | null;
    src: {
        childImageSharp: {
            gatsbyImageData: ContentImageData;
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
