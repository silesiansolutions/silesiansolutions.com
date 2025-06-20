import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { Article, BlogPosting, WithContext } from 'schema-dts';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useOrganizationData } from '../../hooks/useOrganizationData';
import { Page } from '../../components/Page';
import { Seo } from '../../components/Seo';
import { AuthorSnippet } from '../../components/AuthorSnippet';
import { ArticleTemplateData } from './data';
import { pluralize } from '../../utils/pluralize';
import { createOrganizationReference } from '../../utils/organizationHelpers';
import { createSeoTitle } from '../../utils/seoHelpers';
import * as classes from './style.module.css';

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
    const { siteUrl, author, titleTemplate } = useSiteMetadata();
    const organizationData = useOrganizationData();

    const schemaTitle = createSeoTitle(article.title, titleTemplate);

    const articleSchema: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: schemaTitle,
        description: article.description || undefined,
        author: {
            '@type': 'Person',
            name: author,
        },
        datePublished: article.date,
        dateModified: article.date,
        publisher: createOrganizationReference(siteUrl, organizationData),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteUrl}${props.pageContext.listingPagePath}/${article.slug}#article-content`,
        },
        image: article.banner?.src?.childImageSharp?.gatsbyImageData
            ? {
                  '@type': 'ImageObject',
                  url: `${siteUrl}${article.banner.src.childImageSharp.gatsbyImageData.images.fallback?.src}`,
              }
            : undefined,
        keywords: article.keywords?.join(', '),
        articleSection: article.categories.join(', '),
    };

    const blogPostingSchema: WithContext<BlogPosting> = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: schemaTitle,
        description: article.description || undefined,
        author: {
            '@type': 'Person',
            name: author,
        },
        datePublished: article.date,
        dateModified: article.date,
        publisher: createOrganizationReference(siteUrl, organizationData),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteUrl}${props.pageContext.listingPagePath}/${article.slug}#article-content`,
        },
        image: article.banner?.src?.childImageSharp?.gatsbyImageData
            ? {
                  '@type': 'ImageObject',
                  url: `${siteUrl}${article.banner.src.childImageSharp.gatsbyImageData.images.fallback?.src}`,
              }
            : undefined,
        keywords: article.keywords?.join(', '),
        articleSection: article.categories.join(', '),
        timeRequired: article.readingTime?.text,
    };

    return (
        <>
            <Seo title={article.title} description={article.description || undefined} useTitleTemplate={true} />
            <JsonLd<Article> item={articleSchema} />
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
                            <GatsbyImage
                                image={article.banner.src.childImageSharp.gatsbyImageData}
                                alt={article.banner.alt || `Zdjęcie artykułu ${article.title}`}
                                imgClassName={classes.BannerImage}
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
