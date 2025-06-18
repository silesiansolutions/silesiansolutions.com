import React from 'react';
import { Helmet } from 'react-helmet';
import { JsonLd } from 'react-schemaorg';
import { Organization, WebSite, WithContext } from 'schema-dts';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useOrganizationData, useJsonLdOptions } from '../../hooks/useOrganizationData';
import { createContactPoint, createServiceArea } from '../../utils/organizationHelpers';

interface SeoProps {
    title: string;
    useTitleTemplate?: boolean;
    noIndex?: boolean;
    description?: string;
    addOrganizationSchema?: boolean;
    addWebSiteSchema?: boolean;
    currentUrl?: string;
}

export function Seo(props: SeoProps): React.ReactElement {
    const siteMetadata = { ...useSiteMetadata(), ...props };
    const organizationData = useOrganizationData();
    const jsonLdOptions = useJsonLdOptions();

    const thumbnailUrl = siteMetadata.thumbnail
        ? (siteMetadata.siteUrl + siteMetadata.thumbnail.childImageSharp.original.src).replace(/([^:]\/)\/+/g, '$1')
        : undefined;

    const organizationSchema: WithContext<Organization> = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: organizationData.name,
        legalName: organizationData.legalName,
        url: siteMetadata.siteUrl,
        logo: thumbnailUrl
            ? {
                  '@type': 'ImageObject',
                  url: thumbnailUrl,
              }
            : undefined,
        description: organizationData.description,
        founder: {
            '@type': 'Person',
            name: siteMetadata.author,
        },
        foundingLocation: createServiceArea(organizationData),
        areaServed: organizationData.areaServed,
        knowsAbout: organizationData.knowsAbout,
        sameAs: [siteMetadata.social.linkedin, siteMetadata.social.github, siteMetadata.social.twitter].filter(Boolean),
        contactPoint: createContactPoint(organizationData, jsonLdOptions),
    };

    const webSiteSchema: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteMetadata.title,
        url: siteMetadata.siteUrl,
        description: siteMetadata.description,
        publisher: {
            '@type': 'Organization',
            name: organizationData.name,
            logo: thumbnailUrl
                ? {
                      '@type': 'ImageObject',
                      url: thumbnailUrl,
                  }
                : undefined,
        },
    };

    return (
        <>
            <Helmet
                title={siteMetadata.title}
                titleTemplate={props.useTitleTemplate ? siteMetadata.titleTemplate : undefined}
                htmlAttributes={{ lang: siteMetadata.language }}
            >
                {props.noIndex && <meta name="robots" content="noindex" />}
                <link rel="canonical" href={props.currentUrl || siteMetadata.siteUrl} />
                <meta name="description" content={siteMetadata.description} />
                <meta property="og:title" content={siteMetadata.title} />
                <meta property="og:site_name" content={siteMetadata.title} />
                <meta property="og:url" content={props.currentUrl || siteMetadata.siteUrl} />
                {thumbnailUrl && <meta property="og:image" content={thumbnailUrl} />}
                <meta property="og:description" content={siteMetadata.description} />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:creator" content={siteMetadata.author} />
                <meta property="twitter:title" content={siteMetadata.title} />
                <meta property="twitter:description" content={siteMetadata.description} />
            </Helmet>

            {props.addOrganizationSchema !== false && <JsonLd<Organization> item={organizationSchema} />}

            {props.addWebSiteSchema !== false && <JsonLd<WebSite> item={webSiteSchema} />}
        </>
    );
}
