import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { LegalSection, Page, Seo } from '../sections';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { useJsonLdOptions } from '../hooks/useOrganizationData';
import { createSimpleBreadcrumb } from '../utils/organizationHelpers';
import { getPageSeoData, createSeoTitle } from '../utils/seoHelpers';

export default function PrivacyPage() {
    const { siteUrl, titleTemplate } = useSiteMetadata();
    const jsonLdOptions = useJsonLdOptions();
    const seoData = getPageSeoData('privacy');

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: createSeoTitle(seoData.seoTitle, titleTemplate),
        description: seoData.description,
        url: `${siteUrl}/polityka-prywatnosci`,
        mainContentOfPage: {
            '@id': '#privacy-content',
        },
        breadcrumb: createSimpleBreadcrumb(siteUrl, seoData.title, `${siteUrl}/polityka-prywatnosci`, jsonLdOptions),
    };

    return (
        <>
            <Seo title={seoData.seoTitle} description={seoData.description} useTitleTemplate={true} noIndex={true} />
            <JsonLd item={webPageSchema} />
            <Page>
                <LegalSection sectionId="privacy-policy" heading="Polityka prywatności" id="privacy-content" />
            </Page>
        </>
    );
}
