import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { LegalSection, Page, Seo } from '../sections';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { useJsonLdOptions } from '../hooks/useOrganizationData';
import { createSimpleBreadcrumb } from '../utils/organizationHelpers';
import { getPageSeoData, createSeoTitle } from '../utils/seoHelpers';

export default function InformationClausePage() {
    const { siteUrl, titleTemplate } = useSiteMetadata();
    const jsonLdOptions = useJsonLdOptions();
    const seoData = getPageSeoData('terms');

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: createSeoTitle(seoData.seoTitle, titleTemplate),
        description: seoData.description,
        url: `${siteUrl}/klauzula-informacyjna`,
        mainContentOfPage: {
            '@id': '#information-clause-content',
        },
        breadcrumb: createSimpleBreadcrumb(siteUrl, seoData.title, `${siteUrl}/klauzula-informacyjna`, jsonLdOptions),
    };

    return (
        <>
            <Seo title={seoData.seoTitle} description={seoData.description} useTitleTemplate={true} noIndex={true} />
            <JsonLd item={webPageSchema} />
            <Page>
                <LegalSection
                    sectionId="information-clause"
                    heading="Klauzula informacyjna"
                    id="information-clause-content"
                />
            </Page>
        </>
    );
}
