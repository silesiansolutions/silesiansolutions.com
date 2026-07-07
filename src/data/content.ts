import { marked } from 'marked';
import { parse as parseYaml } from 'yaml';

import settingsJson from '../../content/settings.json';
import offerJson from '../../content/offer.json';
import hoursJson from '../../content/hours.json';
import faqJson from '../../content/faq.json';
import aboutUsJson from '../../content/about-us.json';
import heroJson from '../../content/sections/hero/hero.json';
import interestsJson from '../../content/sections/interests/interests.json';
import projectsJson from '../../content/sections/projects/projects.json';
import contactJson from '../../content/sections/contact/contact.json';

const markdownFiles = import.meta.glob('/content/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
}) as Record<string, string>;

const imageAssets = import.meta.glob('/content/**/*.{avif,gif,jpeg,jpg,png,svg,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
}) as Record<string, string>;

interface FrontmatterDocument<T> {
    attributes: T;
    body: string;
}

export interface ImageData {
    layout: 'constrained';
    width: number;
    height: number;
    images: {
        fallback: { src: string };
        sources: never[];
    };
}

export interface ContentImage {
    alt: string | null;
    src: { childImageSharp: { gatsbyImageData: ImageData } } | null;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    linkTo?: string;
    caption: string | null;
}

export interface ArticleData {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    date: string;
    publishedDate: string;
    banner: ContentImage;
    categories: string[];
    keywords: string[] | null;
    readingTime: { text: string };
    body: string;
}

function parseFrontmatter<T>(raw: string): FrontmatterDocument<T> {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) throw new Error('Markdown file is missing valid YAML frontmatter.');
    return { attributes: parseYaml(match[1]) as T, body: match[2] };
}

function resolveContentPath(sourceFile: string, relativePath?: string): string | undefined {
    if (!relativePath) return undefined;
    const sourceUrl = new URL(sourceFile, 'https://content.local');
    return new URL(relativePath, sourceUrl).pathname;
}

function assetUrl(sourceFile: string, relativePath?: string): string | undefined {
    const key = resolveContentPath(sourceFile, relativePath);
    return key ? imageAssets[key] : undefined;
}

function imageData(url: string, width = 1, height = 1): ImageData {
    return {
        layout: 'constrained',
        width,
        height,
        images: { fallback: { src: url }, sources: [] },
    };
}

function contentImage(
    sourceFile: string,
    image?: { src?: string; alt?: string | null; objectFit?: ContentImage['objectFit']; linkTo?: string },
    width = 1,
    height = 1,
): ContentImage {
    const url = assetUrl(sourceFile, image?.src);
    return {
        alt: image?.alt ?? null,
        src: url ? { childImageSharp: { gatsbyImageData: imageData(url, width, height) } } : null,
        objectFit: image?.objectFit,
        linkTo: image?.linkTo,
        caption: null,
    };
}

function markdownToHtml(body: string, sourceFile: string): string {
    const withBundledImages = body.replace(/\]\((\.\/[^\s)]+)([^)]*)\)/g, (match, relativePath, suffix) => {
        const url = assetUrl(sourceFile, relativePath);
        return url ? `](${url}${suffix})` : match;
    });
    return marked.parse(withBundledImages, { gfm: true }) as string;
}

function formatArticleDate(value: string): string {
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(`${value}T00:00:00Z`));
}

function readingTimeText(body: string): string {
    const words = body.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function createArticles(): ArticleData[] {
    return Object.entries(markdownFiles)
        .filter(([file]) => file.startsWith('/content/articles/') && file.endsWith('/index.md'))
        .map(([file, raw]) => {
            const { attributes, body } = parseFrontmatter<{
                title: string;
                description?: string;
                date: string;
                banner?: { src?: string; alt?: string; caption?: string };
                categories?: string[];
                keywords?: string[];
            }>(raw);
            const directory = file.split('/').at(-2) ?? '';
            const slug = directory.replace(/^\d{4}-\d{2}-\d{2}--/, '');
            const banner = contentImage(file, attributes.banner, 660, 400);
            banner.caption = attributes.banner?.caption ?? null;
            return {
                id: directory,
                slug: `/blog/${slug}/`,
                title: attributes.title,
                description: attributes.description ?? null,
                date: formatArticleDate(attributes.date),
                publishedDate: attributes.date,
                banner,
                categories: attributes.categories ?? [],
                keywords: attributes.keywords ?? null,
                readingTime: { text: readingTimeText(body) },
                body: markdownToHtml(body, file),
            };
        })
        .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}

const articles = createArticles();

const siteMetadata = {
    ...settingsJson.siteMetadata,
    thumbnail: {
        childImageSharp: {
            original: {
                src: assetUrl('/content/settings.json', settingsJson.siteMetadata.thumbnail) ?? '',
            },
        },
    },
    avatar: {
        childImageSharp: {
            gatsbyImageData: imageData(
                assetUrl('/content/settings.json', settingsJson.siteMetadata.avatar) ?? '',
                100,
                100,
            ),
        },
    },
};

const hero = {
    ...heroJson,
    image: contentImage('/content/sections/hero/hero.json', heroJson.image, 48, 48),
};

const contact = {
    ...contactJson,
    image: contentImage('/content/sections/contact/contact.json', contactJson.image, 140, 140),
};

const interests = {
    ...interestsJson,
    interests: interestsJson.interests.map((interest) => ({
        ...interest,
        image: contentImage('/content/sections/interests/interests.json', interest.image, 20, 20),
    })),
};

const projects = {
    ...projectsJson,
    projects: projectsJson.projects.map((project) => ({
        ...project,
        links: project.links.map((link) => ({ ...link, type: link.type as 'external' | 'github' })),
        image: contentImage('/content/sections/projects/projects.json', project.image, 800),
    })),
};

const offers = offerJson.map((offer) => ({
    ...offer,
    image: contentImage('/content/offer.json', offer.image, 800),
}));

const aboutDocument = parseFrontmatter<{ imageSrc?: string; imageAlt?: string }>(
    markdownFiles['/content/sections/about/about.md'],
);

const legalDocuments = [
    '/content/sections/legal/privacy-policy.md',
    '/content/sections/legal/information-clause.md',
].map((file) => {
    const document = parseFrontmatter<{ sectionId: string }>(markdownFiles[file]);
    return {
        frontmatter: document.attributes,
        html: markdownToHtml(document.body, file),
    };
});

export const content = {
    siteMetadata,
    siteConfiguration: settingsJson.siteConfiguration,
    organizationData: settingsJson.organizationData,
    jsonLdOptions: settingsJson.jsonLdOptions,
    articles,
    offers,
    projects: projects.projects,
    hours: hoursJson,
    faq: faqJson,
};

export function getStaticQueryResult(query: string): any {
    if (query.includes('SiteMetadata')) {
        return { allSettingsJson: { settings: [{ siteMetadata }] } };
    }
    if (query.includes('SiteConfiguration')) {
        return { allSettingsJson: { settings: [{ siteConfiguration: settingsJson.siteConfiguration }] } };
    }
    if (query.includes('OrganizationData')) {
        return {
            allSettingsJson: {
                settings: [
                    {
                        organizationData: settingsJson.organizationData,
                        jsonLdOptions: settingsJson.jsonLdOptions,
                    },
                ],
            },
        };
    }
    if (query.includes('HeroSectionQuery')) return { allHeroJson: { sections: [hero] } };
    if (query.includes('AboutSectionQuery')) {
        return {
            allAboutMarkdown: {
                sections: [
                    {
                        frontmatter: {
                            imageAlt: aboutDocument.attributes.imageAlt,
                            imageSrc: contentImage(
                                '/content/sections/about/about.md',
                                {
                                    src: aboutDocument.attributes.imageSrc,
                                },
                                400,
                            ).src,
                        },
                        html: markdownToHtml(aboutDocument.body, '/content/sections/about/about.md'),
                    },
                ],
            },
        };
    }
    if (query.includes('InterestsSectionQuery')) return { allInterestsJson: { sections: [interests] } };
    if (query.includes('ProjectsSectionQuery')) {
        return {
            allProjectsJson: {
                sections: [
                    {
                        ...projects,
                        projects: projects.projects.map((project) => ({
                            ...project,
                            image: project.image.src
                                ? {
                                      ...project.image,
                                      src: {
                                          childImageSharp: {
                                              gatsbyImageData: {
                                                  ...project.image.src.childImageSharp.gatsbyImageData,
                                                  width: 400,
                                              },
                                          },
                                      },
                                  }
                                : project.image,
                        })),
                    },
                ],
            },
        };
    }
    if (query.includes('ArticlePreviewQuery')) {
        return {
            allArticle: {
                articles: articles.map((article) => ({
                    ...article,
                    date: `${article.publishedDate} 00:00:00`,
                })),
            },
        };
    }
    if (query.includes('ContactSectionQuery')) return { allContactJson: { sections: [contact] } };
    if (query.includes('LegalSectionQuery')) return { allLegalSection: { sections: legalDocuments } };
    if (query.includes('allAboutUsJson')) return { allAboutUsJson: { nodes: aboutUsJson } };
    if (query.includes('allOfferJson')) return { allOfferJson: { nodes: offers } };
    if (query.includes('allHoursJson') || query.includes('allFaqJson')) {
        return { allHoursJson: { nodes: hoursJson }, allFaqJson: { nodes: faqJson } };
    }
    throw new Error(`Unsupported static query: ${query.slice(0, 120)}`);
}
