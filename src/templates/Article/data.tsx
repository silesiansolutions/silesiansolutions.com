import type { ContentImageData } from '../../components/ContentImage';

export interface ArticleTemplateData {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    date: string;
    publishedDate: string;
    banner: {
        alt: string | null;
        src: {
            childImageSharp: {
                gatsbyImageData: ContentImageData;
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
