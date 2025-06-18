import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { JsonLd } from 'react-schemaorg';
import { CreativeWork, WebPage, WithContext } from 'schema-dts';
import { Page } from '../../components/Page';
import { Seo } from '../../components/Seo';
import { Icon } from '../../components/Icon';
import { Project } from '../../components/Project';
import { pluralize } from '../../utils/pluralize';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useOrganizationData } from '../../hooks/useOrganizationData';
import { createOrganizationReference, createBreadcrumb } from '../../utils/organizationHelpers';
import { getExternalLinkRel } from '../../utils/linkUtils';
import * as classes from './style.module.css';

interface ProjectTemplateProps {
    pageContext: {
        project: Project;
        listingPagePath: string;
        entityName?: string;
    };
}

export default function ProjectTemplate(props: ProjectTemplateProps): React.ReactElement {
    const project = props.pageContext.project;
    const { siteUrl } = useSiteMetadata();
    const organizationData = useOrganizationData();

    const creativeWorkSchema: WithContext<CreativeWork> = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: `${siteUrl}${props.pageContext.listingPagePath}/${project.slug}`,
        creator: createOrganizationReference(siteUrl, organizationData),
        publisher: createOrganizationReference(siteUrl, organizationData),
        image: project.image?.src
            ? {
                  '@type': 'ImageObject',
                  url: `${siteUrl}${project.image.src.childImageSharp.gatsbyImageData.images.fallback?.src}`,
                  caption: project.image.alt || project.title,
              }
            : undefined,
        keywords: project.tags?.join(', '),
        genre: project.category,
        about: project.tags?.map((tag) => ({
            '@type': 'Thing',
            name: tag,
        })),
    };

    const webPageSchema: WithContext<WebPage> = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${project.title} - Realizacja - Silesian Solutions`,
        description: project.description,
        url: `${siteUrl}${props.pageContext.listingPagePath}/${project.slug}`,
        breadcrumb: createBreadcrumb([
            { name: 'Strona główna', url: siteUrl },
            { name: 'Realizacje', url: `${siteUrl}/realizacje` },
            { name: project.title, url: `${siteUrl}${props.pageContext.listingPagePath}/${project.slug}` },
        ]),
    };

    return (
        <>
            <Seo title={project.title} description={project.description} useTitleTemplate={true} />
            <JsonLd<CreativeWork> item={creativeWorkSchema} />
            <JsonLd<WebPage> item={webPageSchema} />
            <Page>
                <article className={classes.Article}>
                    <div className={classes.Breadcrumb}>
                        <Link
                            to={props.pageContext.listingPagePath}
                            title={`Wróć do ${pluralize(props.pageContext.entityName) ?? 'realizacji'}`}
                        >
                            <span className={classes.BackArrow}>&#10094;</span>
                            Wszystkie {pluralize(props.pageContext.entityName) ?? 'realizacje'}
                        </Link>
                    </div>

                    <section className={classes.Header}>
                        {project.category && <span className={classes.Category}>{project.category}</span>}
                        <h1>{project.title}</h1>
                        {project.description && <div className={classes.Description}>{project.description}</div>}
                    </section>

                    {project.image?.src && (
                        <section className={classes.Banner}>
                            <GatsbyImage
                                image={project.image.src.childImageSharp.gatsbyImageData}
                                alt={project.image.alt || `Zdjęcie projektu ${project.title}`}
                                imgClassName={classes.BannerImage}
                            />
                        </section>
                    )}

                    <section className={classes.Body}>
                        {project.tags && project.tags.length > 0 && (
                            <div className={classes.Content}>
                                <h3>Wykorzystane technologie:</h3>
                                <div className={classes.TagsList}>
                                    {project.tags.map((tag, key) => (
                                        <span key={key} className={classes.Keyword}>
                                            <u>{tag}</u>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.links && project.links.length > 0 && (
                            <div className={classes.Content}>
                                <h3>Linki do projektu:</h3>
                                <div className={classes.LinksList}>
                                    {project.links.map((link, key) => (
                                        // eslint-disable-next-line react/jsx-no-target-blank
                                        <a
                                            key={key}
                                            href={link.url}
                                            target="_blank"
                                            rel={getExternalLinkRel(link.url)}
                                            className={classes.Link}
                                            aria-label={`Link do ${link.type === 'github' ? 'GitHub' : 'strony projektu'}`}
                                        >
                                            <Icon name={link.type} />
                                            <span>{link.type === 'github' ? 'Zobacz kod' : 'Odwiedź stronę'}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                </article>
            </Page>
        </>
    );
}
