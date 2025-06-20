import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { JsonLd } from 'react-schemaorg';
import { Service, WebPage, WithContext } from 'schema-dts';
import { Page } from '../../components/Page';
import { Seo } from '../../components/Seo';
import { pluralize } from '../../utils/pluralize';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useOrganizationData } from '../../hooks/useOrganizationData';
import { ImageObject } from '../../types';
import { createOrganizationReference, createBreadcrumb } from '../../utils/organizationHelpers';
import { createSeoTitle } from '../../utils/seoHelpers';
import * as classes from './style.module.css';

interface Offer {
    heading: string;
    content: string;
    slug: string;
    description: string;
    detailedContent: string;
    technologies: string[];
    benefits: string[];
    examples: string[];
    image?: ImageObject;
}

interface OfferTemplateProps {
    pageContext: {
        offer: Offer;
        listingPagePath: string;
        entityName?: string;
    };
}

export default function OfferTemplate(props: OfferTemplateProps): React.ReactElement {
    const offer = props.pageContext.offer;
    const { siteUrl, titleTemplate } = useSiteMetadata();
    const organizationData = useOrganizationData();
    const title = offer.heading.split(' ').slice(1).join(' ');

    const serviceSchema: WithContext<Service> = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title,
        description: offer.description,
        url: `${siteUrl}${props.pageContext.listingPagePath}/${offer.slug}`,
        provider: createOrganizationReference(siteUrl, organizationData),
        areaServed: organizationData.areaServed,
        offers: {
            '@type': 'Offer',
            description: offer.detailedContent,
            seller: createOrganizationReference(siteUrl, organizationData),
        },
    };

    const webPageSchema: WithContext<WebPage> = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: createSeoTitle(title, titleTemplate),
        description: offer.description,
        url: `${siteUrl}${props.pageContext.listingPagePath}/${offer.slug}`,
        mainContentOfPage: {
            '@id': '#offer-content',
        },
        breadcrumb: createBreadcrumb([
            { name: 'Strona główna', url: siteUrl },
            { name: 'Oferta', url: `${siteUrl}/oferta` },
            { name: title, url: `${siteUrl}${props.pageContext.listingPagePath}/${offer.slug}` },
        ]),
    };

    return (
        <>
            <Seo title={title} description={offer.description} useTitleTemplate={true} />
            <JsonLd<Service> item={serviceSchema} />
            <JsonLd<WebPage> item={webPageSchema} />
            <Page>
                <article className={classes.Article} id="offer-content">
                    <div className={classes.Breadcrumb}>
                        <Link
                            to={props.pageContext.listingPagePath}
                            title={`Wróć do ${pluralize(props.pageContext.entityName) ?? 'oferty'}`}
                        >
                            <span className={classes.BackArrow}>&#10094;</span>
                            Wszystkie {pluralize(props.pageContext.entityName) ?? 'usługi'}
                        </Link>
                    </div>

                    <section className={classes.Header}>
                        <h1>{title}</h1>
                        {offer.description && <div className={classes.Description}>{offer.description}</div>}
                    </section>

                    {offer.image?.src?.childImageSharp?.gatsbyImageData && (
                        <section className={classes.Banner}>
                            <GatsbyImage
                                image={offer.image.src.childImageSharp.gatsbyImageData}
                                alt={offer.image.alt || title}
                                imgClassName={classes.BannerImage}
                            />
                        </section>
                    )}

                    <section className={classes.Body}>
                        <div className={classes.Content}>
                            {offer.detailedContent.split('\n\n').map((paragraph, index) => (
                                <p key={index} style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.5rem' }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {offer.technologies && offer.technologies.length > 0 && (
                            <div className={classes.Content}>
                                <h3>Wykorzystane technologie:</h3>
                                <div className={classes.TagsList}>
                                    {offer.technologies.map((tech, key) => (
                                        <span key={key} className={classes.Keyword}>
                                            <u>{tech}</u>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {offer.benefits && offer.benefits.length > 0 && (
                            <div className={classes.Content}>
                                <h3>Korzyści dla Twojej firmy:</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0 0' }}>
                                    {offer.benefits.map((benefit, key) => (
                                        <li
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                marginBottom: '0.5rem',
                                                fontSize: '1rem',
                                                lineHeight: '1.5rem',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: 'var(--primary-color)',
                                                    fontWeight: 'bold',
                                                    marginRight: '0.5rem',
                                                    marginTop: '0.125rem',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                ✓
                                            </span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {offer.examples && offer.examples.length > 0 && (
                            <div className={classes.Content}>
                                <h3>Przykłady zastosowań:</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0 0' }}>
                                    {offer.examples.map((example, key) => (
                                        <li
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                marginBottom: '0.5rem',
                                                fontSize: '1rem',
                                                lineHeight: '1.5rem',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginRight: '0.5rem',
                                                    marginTop: '0.125rem',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                💡
                                            </span>
                                            {example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                </article>
            </Page>
        </>
    );
}
