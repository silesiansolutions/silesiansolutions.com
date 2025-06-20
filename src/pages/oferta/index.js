import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { JsonLd } from 'react-schemaorg';
import { Page, Seo, ContactSection, Animation, Section, ProjectsSection } from '../../sections';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useOrganizationData, useJsonLdOptions } from '../../hooks/useOrganizationData';
import { createOrganizationReference, createSimpleBreadcrumb, createAreaServed } from '../../utils/organizationHelpers';
import * as classes from './style.module.css';

const useLocalDataSource = () => {
    const data = useStaticQuery(graphql`
        query {
            allOfferJson {
                nodes {
                    slug
                    heading
                    content
                    description
                }
            }
        }
    `);

    return data;
};

export default function OfferPage() {
    const { allOfferJson } = useLocalDataSource();
    const { siteUrl } = useSiteMetadata();
    const organizationData = useOrganizationData();
    const jsonLdOptions = useJsonLdOptions();

    const collectionPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Oferta - Usługi IT - Silesian Solutions',
        description:
            'Kompleksowe usługi IT od Silesian Solutions. Tworzenie stron internetowych, aplikacji webowych, konsultacje technologiczne i więcej.',
        url: `${siteUrl}/oferta`,
        mainContentOfPage: {
            '@id': '#offer-content',
        },
        breadcrumb: createSimpleBreadcrumb(siteUrl, 'Oferta', `${siteUrl}/oferta`, jsonLdOptions),
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: allOfferJson.nodes.map((offer, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Service',
                    '@id': `#offer-item-${index}`,
                    name: offer.heading,
                    description: offer.content,
                    url: offer.slug ? `${siteUrl}/oferta/${offer.slug}` : undefined,
                    provider: createOrganizationReference(siteUrl, organizationData),
                },
            })),
        },
    };

    const professionalServicesSchema = allOfferJson.nodes.map((offer, index) => ({
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `#offer-item-${index}`,
        name: offer.heading,
        description: offer.content,
        url: offer.slug ? `${siteUrl}/oferta/${offer.slug}` : `${siteUrl}/oferta`,
        provider: createOrganizationReference(siteUrl, organizationData),
        areaServed: createAreaServed(organizationData),
    }));

    return (
        <>
            <Seo title="Rozwiązania IT dostosowane do Twoich potrzeb" useTitleTemplate={true} />
            <JsonLd item={collectionPageSchema} />
            {professionalServicesSchema.map((schema, index) => (
                <JsonLd key={index} item={schema} />
            ))}
            <Page>
                <Animation type="fadeUp" delay={300}>
                    <Section heading="Rozwiązania IT, które wspierają Twój biznes" anchor="oferta" id="offer-content">
                        {allOfferJson.nodes.map((item, index) => (
                            <div key={index} id={`offer-item-${index}`}>
                                {item.slug ? (
                                    <Link
                                        to={`/oferta/${item.slug}`}
                                        className={classes.offerItem}
                                        aria-label={`Zobacz szczegóły oferty: ${item.heading}`}
                                    >
                                        <h3 className={classes.offerHeading}>{item.heading}</h3>
                                        <p className={classes.offerContent}>{item.content}</p>
                                    </Link>
                                ) : (
                                    <div className={classes.offerItem}>
                                        <h3 className={classes.offerHeading}>{item.heading}</h3>
                                        <p className={classes.offerContent}>{item.content}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </Section>
                </Animation>
                <ProjectsSection sectionId="realizacje" heading="Przykłady naszych wdrożeń" maxVisibleProjects={3} />
                <ContactSection sectionId="kontakt" heading="Zacznijmy współpracę" />
            </Page>
        </>
    );
}
