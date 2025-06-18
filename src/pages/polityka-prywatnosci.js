import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { LegalSection, Page, Seo } from '../sections';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { useJsonLdOptions } from '../hooks/useOrganizationData';
import { createSimpleBreadcrumb } from '../utils/organizationHelpers';

export default function PrivacyPage() {
    const { siteUrl } = useSiteMetadata();
    const jsonLdOptions = useJsonLdOptions();

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Polityka prywatności - Silesian Solutions',
        description: 'Polityka prywatności i ochrony danych osobowych Silesian Solutions.',
        url: `${siteUrl}/polityka-prywatnosci`,
        breadcrumb: createSimpleBreadcrumb(
            siteUrl,
            'Polityka prywatności',
            `${siteUrl}/polityka-prywatnosci`,
            jsonLdOptions,
        ),
    };

    return (
        <>
            <Seo title="Polityka prywatności" useTitleTemplate={true} noIndex={true} />
            <JsonLd item={webPageSchema} />
            <Page>
                <LegalSection sectionId="privacy-policy" heading="Polityka prywatności" />
            </Page>
        </>
    );
}
