import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface ArticleTemplateData {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    date: string;
    banner: {
        alt: string | null;
        src: {
            childImageSharp: {
                gatsbyImageData: IGatsbyImageData;
            };
        } | null;
        caption: string | null;
    };
    categories: string[];
    keywords: string[] | null;
    readingTime: {
        text: string;
    };
    body: string;
}
