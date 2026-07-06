import React from 'react';
import { Helmet } from 'react-helmet';
import { JsonLd } from 'react-schemaorg';
import { Organization, WebSite, WithContext } from 'schema-dts';
import { useLocation } from '@reach/router';
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
}

export function Seo(props: SeoProps): React.ReactElement {
    const location = useLocation();
    const siteMetadata = { ...useSiteMetadata(), ...props };
    const organizationData = useOrganizationData();
    const jsonLdOptions = useJsonLdOptions();

    const currentUrl = siteMetadata.siteUrl + location.pathname;

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
        foundingLocation: createServiceArea(organizationData),
        areaServed: organizationData.areaServed,
        knowsAbout: organizationData.knowsAbout,
        sameAs: [siteMetadata.social.linkedin, siteMetadata.social.github, siteMetadata.social.twitter].filter(Boolean),
        contactPoint: createContactPoint(organizationData, jsonLdOptions),
    };

    const webSiteSchema: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: organizationData.name,
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
                <link rel="canonical" href={currentUrl} />
                <meta name="description" content={siteMetadata.description} />
                <meta property="og:title" content={siteMetadata.title} />
                <meta property="og:site_name" content={organizationData.name} />
                <meta property="og:url" content={currentUrl} />
                {thumbnailUrl && <meta property="og:image" content={thumbnailUrl} />}
                {thumbnailUrl && <meta property="og:image:alt" content={`Logo ${organizationData.name}`} />}
                <meta property="og:description" content={siteMetadata.description} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="pl_PL" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={siteMetadata.title} />
                <meta name="twitter:description" content={siteMetadata.description} />
                {thumbnailUrl && <meta name="twitter:image" content={thumbnailUrl} />}
            </Helmet>

            {props.addOrganizationSchema !== false && <JsonLd<Organization> item={organizationSchema} />}

            {props.addWebSiteSchema !== false && <JsonLd<WebSite> item={webSiteSchema} />}
        </>
    );
}
