import { Reporter, Actions, Node } from 'gatsby';
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

interface GatsbyNodeHelpers {
    actions: Actions;
    createContentDigest: (input: unknown) => string;
    createNodeId: (input: string) => string;
    createResolvers: (resolvers: unknown) => void;
    getNode: (id: string) => Node;
    node: Node;
    reporter: Reporter;
}
