import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { LegalSection, Page, Seo } from '../sections';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { createSimpleBreadcrumb } from '../constants/organizationData';

export default function PrivacyPage() {
    const { siteUrl } = useSiteMetadata();

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Polityka Prywatności - Silesian Solutions',
        description: 'Polityka prywatności i ochrony danych osobowych Silesian Solutions.',
        url: `${siteUrl}/polityka-prywatnosci`,
        breadcrumb: createSimpleBreadcrumb(siteUrl, 'Polityka prywatności', `${siteUrl}/polityka-prywatnosci`),
    };

    return (
        <>
            <Seo title="Polityka Prywatności" useTitleTemplate={true} noIndex={true} />
            <JsonLd item={webPageSchema} />
            <Page>
                <LegalSection sectionId="privacy-policy" heading="Polityka Prywatności" />
            </Page>
        </>
    );
}
