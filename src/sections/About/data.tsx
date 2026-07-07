import type { ContentImageData } from '../../components/ContentImage';
import { content } from '../../data/content';

interface AboutSectionQueryResult {
    allAboutMarkdown: {
        sections: {
            frontmatter: {
                imageAlt?: string;
                imageSrc?: {
                    childImageSharp: {
                        gatsbyImageData: ContentImageData;
                    };
                };
            };
            html: string;
        }[];
    };
}

export const useLocalDataSource = (): AboutSectionQueryResult => {
    return { allAboutMarkdown: { sections: [content.aboutSection] } } as AboutSectionQueryResult;
};
