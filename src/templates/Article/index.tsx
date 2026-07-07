import React from 'react';
import { BlogPosting, WithContext } from 'schema-dts';

import { ContentImage } from '../../components/ContentImage';
import { JsonLd } from '../../components/JsonLd';
import { Link } from '../../components/Link';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useOrganizationData } from '../../hooks/useOrganizationData';
import { Page } from '../../components/Page';
import { Seo } from '../../components/Seo';
import { AuthorSnippet } from '../../components/AuthorSnippet';
import { ArticleTemplateData } from './data';
import { pluralize } from '../../utils/pluralize';
import { createOrganizationReference } from '../../utils/organizationHelpers';
import classes from './style.module.css';

// Reference to the local prismjs theme (Modified)
import '../../globalStyles/prism.css';

interface ArticleTemplateProps {
    pageContext: {
        article: ArticleTemplateData;
        listingPagePath: string;
        entityName?: string;
    };
}

export default function ArticleTemplate(props: ArticleTemplateProps): React.ReactElement {
    const article = props.pageContext.article;
    const { siteUrl } = useSiteMetadata();
    const organizationData = useOrganizationData();
    const articleUrl = `${siteUrl}${article.slug}`;
    const readingTimeMinutes = Number.parseInt(article.readingTime?.text ?? '', 10);

    const blogPostingSchema: WithContext<BlogPosting> = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        url: articleUrl,
        headline: article.title,
        description: article.description || undefined,
        author: createOrganizationReference(siteUrl, organizationData),
        datePublished: article.publishedDate,
        publisher: createOrganizationReference(siteUrl, organizationData),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${articleUrl}#webpage`,
        },
        image: article.banner?.src?.childImageSharp?.gatsbyImageData
            ? {
                  '@type': 'ImageObject',
                  url: `${siteUrl}${article.banner.src.childImageSharp.gatsbyImageData.images.fallback?.src}`,
              }
            : undefined,
        keywords: article.keywords?.join(', '),
        articleSection: article.categories.join(', '),
        isPartOf: { '@type': 'Blog', '@id': `${siteUrl}/blog/#blog`, name: 'Blog Silesian Solutions' },
        timeRequired: Number.isFinite(readingTimeMinutes) ? `PT${readingTimeMinutes}M` : undefined,
    };

    return (
        <>
            <Seo title={article.title} description={article.description || undefined} useTitleTemplate={true} />
            <JsonLd<BlogPosting> item={blogPostingSchema} />
            <Page>
                <article className={classes.Article} id="article-content">
                    <div className={classes.Breadcrumb} id="article-breadcrumb">
                        <Link
                            to={props.pageContext.listingPagePath}
                            title={`Wróć do ${pluralize(props.pageContext.entityName) ?? 'Artykuły'}`}
                        >
                            <span className={classes.BackArrow}>&#10094;</span>
                            Wszystkie {pluralize(props.pageContext.entityName) ?? 'Artykuły'}
                        </Link>
                    </div>
                    <section className={classes.Header}>
                        <span className={classes.Category}>{article.categories.join(' / ')}</span>
                        <h1>{article.title}</h1>
                        <div className={classes.Details}>
                            {article.date}
                            <span className={classes.ReadingTime}>{article.readingTime.text}</span>
                        </div>
                    </section>
                    {article.banner && article.banner.src && (
                        <section className={classes.Banner}>
                            <ContentImage
                                image={article.banner.src.childImageSharp.gatsbyImageData}
                                alt={article.banner.alt || `Zdjęcie artykułu ${article.title}`}
                                imgClassName={classes.BannerImage}
                                fullWidth
                            />
                            {article.banner.caption && (
                                <span
                                    className={classes.BannerCaption}
                                    dangerouslySetInnerHTML={{ __html: article.banner.caption }}
                                />
                            )}
                        </section>
                    )}
                    <section className={classes.Body}>
                        <div className={classes.Content} dangerouslySetInnerHTML={{ __html: article.body }} />
                        {article.keywords &&
                            article.keywords.map((keyword, key) => {
                                return (
                                    <span key={key} className={classes.Keyword}>
                                        {keyword}
                                    </span>
                                );
                            })}
                    </section>
                    <section className={classes.Footer}>
                        <AuthorSnippet />
                    </section>
                </article>
            </Page>
        </>
    );
}
